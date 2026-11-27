/* Quackers stats + leaderboard client. Drop-in for quackersgame.com (load name-check.js first).
   Sends only: a random device id, game progress (ducks found and which ones, worlds, Pond Points,
   best level per mini game), the last world and screen, mini game tries, shop buys and points earned,
   play time for this visit (under its own random id), phone/tablet/computer, and app or browser.
   No names unless the player types one for the leaderboard. Respects Do Not Track.
   Fails quietly when offline or the API is down: the game never waits on it.

   Wiring in game.js (for the thread that owns quackersgame):
     QStats.snap = () => ({ ducks:S.found.size, worlds:<worlds finished>, world_max:S.unlocked,
                            points:<Pond Points>, games:{egg:<best lvl>,scrap:..,sand:..,jump:..},
                            found:[...S.found].map(id => [id, <duck name>, <world id>]) });
     QStats.start();                          // once at boot
     QStats.changed();                        // after save() when a duck, world or level changes
     QStats.screen(worldId, areaOrScreen);    // on every move: "garden", "shop", "map", "game:egg"
     QStats.event("try", {g:"egg", l:3, win:false});         // end of every mini game level attempt
     QStats.event("buy", {item:"crown", name:"Crown", cost:200});  // shop purchase
     QStats.event("earn", {src:"egg", n:15});                // Pond Points earned (src: duck, quest, egg, scrap, sand, jump)
     QStats.board().then(...)                 // leaderboard sheet
     QStats.setName(name).then(...)           // {ok,name} or {ok:false,msg}

   Idea box:
     QStats.ideas().then(r => ...)            // {ok, month, ends, rows:[{id,kind,text,votes,voted,mine}], mine:[{id,kind,text,status,votes}], winner}
     QStats.suggestIdea("duck"|"world", text) // {ok,id,status:"waiting",msg} or {ok:false,msg,why}; checked here first, then on the server
     QStats.vote(id, true|false)              // {ok, votes, voted} or {ok:false,msg,why:"own"}
   Friend link (load this file before the game reads the URL; it keeps ?f=<code> on a new device, tidies the
   address bar, and claims the friend credit by itself after the first duck is found):
     QStats.friend().then(r => ...)           // {ok, code, friends, link}; unlock the bonus duck when friends >= 1
     QStats.shareFriend()                     // opens the share sheet with the player's link (falls back to copying it)
   Privacy:
     QStats.forget()                          // deletes this device's data on the server and starts fresh
     QStats.sharing() / QStats.setSharing(on) // turn sending stats off or on (off also hides leaderboard, ideas, friends)
*/
(function(){
  const API = "https://quackers-api.tannerspaulding81.workers.dev";
  const IDK = "quackers-pid", QK = "quackers-stats-q", RK = "quackers-ref", OFFK = "quackers-stats-off";
  const GAME = "https://quackersgame.com/";
  const get = k => { try{ return localStorage.getItem(k); }catch(e){ return null; } };
  const set = (k, v) => { try{ v == null ? localStorage.removeItem(k) : localStorage.setItem(k, v); }catch(e){} };
  const off = () => navigator.doNotTrack === "1" || window.doNotTrack === "1" || get(OFFK) === "1";
  const OFF_MSG = { ok:false, off:true, msg:"Stats sharing is turned off. Turn it on in settings to use this." };
  // Friend link: keep the code from ?f=<code> until the server says it counted (or can't), and take it out of the address bar.
  try{ const u = new URL(location.href), f = (u.searchParams.get("f") || "").toLowerCase();
    if(/^[a-z2-9]{8}$/.test(f) && !get(IDK)) set(RK, f);
    if(u.searchParams.has("f")){ u.searchParams.delete("f"); history.replaceState(history.state, "", u.pathname + (u.search || "") + u.hash); } }catch(e){}
  const rid = n => { const a = new Uint8Array(n); crypto.getRandomValues(a); return Array.from(a, b => b.toString(36).padStart(2,"0")).join("").slice(0, n * 2); };
  let t = null, busy = false, where = {}, active = 0, last = Date.now();
  const sess = { id: rid(8), hour: new Date().getHours(), dow: new Date().getDay() };
  function pid(){
    try{ let id = localStorage.getItem(IDK); if(!id){ id = rid(12).slice(0,24); localStorage.setItem(IDK, id); } return id; }catch(e){ return null; }
  }
  function queue(){ try{ return JSON.parse(localStorage.getItem(QK) || "[]"); }catch(e){ return []; } }
  function keep(q){ try{ localStorage.setItem(QK, JSON.stringify(q.slice(-120))); }catch(e){} }
  function device(){ const w = Math.min(screen.width, screen.height); return /Mobi|Android|iPhone/i.test(navigator.userAgent) ? (w >= 600 ? "tablet" : "phone") : (navigator.maxTouchPoints > 1 && w >= 600 ? "tablet" : "computer"); }
  function mode(){ return (window.matchMedia && matchMedia("(display-mode: standalone)").matches) || navigator.standalone ? "app" : "browser"; }
  function tick(){ const n = Date.now(); if(document.visibilityState === "visible") active += Math.min(n - last, 5000); last = n; }
  async function post(path, data){ const r = await fetch(API + path, { method:"POST", headers:{ "Content-Type":"application/json" }, body:JSON.stringify(data), keepalive:true }); return r.json(); }
  const Q = {
    snap: () => ({}),
    send(){
      const id = pid(); if(!id || off() || busy) return;
      tick(); let s = {}; try{ s = Q.snap() || {}; }catch(e){}
      const ev = queue().slice(0, 60);
      busy = true;
      post("/v1/ping", Object.assign({ pid:id, device:device(), mode:mode(), where,
        sess:Object.assign({ secs:Math.round(active / 1000) }, sess), ev }, s))
        .then(r => { if(r && r.ok && !r.slow) keep(queue().slice(ev.length));
          const code = get(RK); if(code && r && r.ok && (s.ducks || (s.found || []).length))
            return post("/v1/friend/claim", { pid:id, code }).then(c => { if(c && !c.retry) set(RK, null); }); })
        .catch(()=>{}).finally(() => { busy = false; });
    },
    start(){
      if(off()) return;
      Q.send();
      setInterval(tick, 1000);
      setInterval(() => { if(document.visibilityState === "visible") Q.send(); }, 120000);
      document.addEventListener("visibilitychange", () => { tick(); if(document.visibilityState === "hidden") Q.send(); });
    },
    changed(){ clearTimeout(t); t = setTimeout(Q.send, 4000); },
    screen(world, screenName){ where = { world:String(world || "").toLowerCase().slice(0,30), screen:String(screenName || "").slice(0,30) }; },
    event(type, data){ if(off()) return; const q = queue(); q.push(Object.assign({ t:type }, data || {})); keep(q); if(q.length >= 40) Q.changed(); },
    async board(){ try{ const r = await fetch(API + "/v1/board?pid=" + encodeURIComponent(pid() || "")); return await r.json(); }catch(e){ return { ok:false, rows:[], offline:true }; } },
    async setName(name){ const c = window.QName ? QName.check(name) : { ok:true, name };
      if(!c.ok) return c;
      const id = pid(); if(!id) return { ok:false, msg:"Can't reach the leaderboard right now. Try again soon." };
      let snap = {}; try{ snap = Q.snap() || {}; }catch(e){}
      try{ await post("/v1/ping", Object.assign({ pid:id, device:device(), mode:mode(), where }, snap)); }catch(e){}
      try{ return await post("/v1/board", { pid:pid(), name:c.name }); }catch(e){ return { ok:false, msg:"Can't reach the leaderboard right now. Try again soon." }; } },
    async ready(){ let snap = {}; try{ snap = Q.snap() || {}; }catch(e){}
      try{ await post("/v1/ping", Object.assign({ pid:pid(), device:device(), mode:mode(), where }, snap)); }catch(e){} },
    async ideas(){ const id = off() ? "" : (pid() || "");
      try{ const r = await fetch(API + "/v1/ideas?pid=" + encodeURIComponent(id)); return await r.json(); }catch(e){ return { ok:false, ideas:[], offline:true }; } },
    async suggestIdea(kind, text){ if(off()) return OFF_MSG;
      const c = window.QName && QName.checkText ? QName.checkText(text) : { ok:true, text };
      if(!c.ok) return c;
      await Q.ready();
      try{ return await post("/v1/ideas", { pid:pid(), kind, text:c.text }); }catch(e){ return { ok:false, msg:"Can't reach the idea box right now. Try again soon." }; } },
    async vote(id, on){ if(off()) return OFF_MSG;
      try{ return await post("/v1/ideas/vote", { pid:pid(), id, on:on !== false }); }catch(e){ return { ok:false, msg:"Can't reach the idea box right now. Try again soon." }; } },
    async friend(){ if(off()) return OFF_MSG;
      await Q.ready();
      try{ const c = await post("/v1/friend/code", { pid:pid() }); if(!c || !c.ok) return c || { ok:false };
        const st = await (await fetch(API + "/v1/friend/status?pid=" + encodeURIComponent(pid() || ""))).json();
        return { ok:true, code:c.code, friends:(st && st.friends) || 0, link:GAME + "?f=" + c.code }; }catch(e){ return { ok:false, offline:true }; } },
    async friends(){ if(off()) return { ok:false, friends:0, off:true };
      try{ return await (await fetch(API + "/v1/friend/status?pid=" + encodeURIComponent(pid() || ""))).json(); }catch(e){ return { ok:false, friends:0, offline:true }; } },
    async shareFriend(){ const r = await Q.friend(); if(!r.ok) return r;
      const data = { title:"Quackers", text:"Come find hidden ducks with me in Quackers!", url:r.link };
      try{ if(navigator.share){ await navigator.share(data); return { ok:true, shared:true }; } }catch(e){ if(e && e.name === "AbortError") return { ok:false, cancelled:true }; }
      try{ await navigator.clipboard.writeText(r.link); return { ok:true, copied:true, link:r.link }; }catch(e){ return { ok:true, link:r.link }; } },
    async forget(){ const id = get(IDK); let r = { ok:true };
      if(id){ try{ r = await post("/v1/forget", { pid:id }); }catch(e){ return { ok:false, msg:"Can't reach the server right now, so nothing was deleted. Try again soon." }; } }
      if(r && r.ok){ set(IDK, null); set(QK, null); set(RK, null); }
      return r && r.ok ? { ok:true } : { ok:false, msg:(r && r.msg) || "That didn't work. Try again soon." }; },
    sharing(){ return !off(); },
    setSharing(on){ set(OFFK, on ? null : "1"); if(on) Q.send(); },
  };
  window.QStats = Q;
})();
