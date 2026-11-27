/* Quackers stats + leaderboard client. Drop-in for quackersgame.com (load name-check.js first).
   Sends only: a random device id, game progress (ducks found and which ones, worlds, Pond Points,
   best level per mini game), the last world and screen, mini game tries, shop buys and points earned,
   play time for this visit (under its own random id), phone/tablet/computer, and app or browser.
   No names unless the player types one for the leaderboard. Respects Do Not Track.
   To tell real players from bots (Nov 27): how many real taps or key presses this visit (a number only, never which keys),
   whether the browser says it is remote-controlled, and how this visit arrived: "friend" for a friend link, or just the
   name of the website that sent it (like www.google.com), never the full web address. The server keeps only a category.
   Fails quietly when offline or the API is down: the game never waits on it.
   Free-plan safeguards: every call gives up after 6 seconds; after a failure the client waits (1, 2, 4... up to 60 minutes,
   or until the daily limit resets when the server says it's over its limit) before trying again, keeping its events in the
   queue meanwhile; pings are batched and only sent when something changed. No daily cap: every stat goes out (Tanner, Nov 27).

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
     QStats.vote(id, true|false)              // {ok, votes, voted} or {ok:false,msg}
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
  const IDK = "quackers-pid", QK = "quackers-stats-q", RK = "quackers-ref", OFFK = "quackers-stats-off", BK = "quackers-stats-wait", DK = "quackers-stats-day";
  const TIMEOUT = 6000, EVERY = 300000;   // give up after 6s; a background ping at most every 5 minutes
  const GAME = "https://quackersgame.com/";
  const get = k => { try{ return localStorage.getItem(k); }catch(e){ return null; } };
  const set = (k, v) => { try{ v == null ? localStorage.removeItem(k) : localStorage.setItem(k, v); }catch(e){} };
  const off = () => navigator.doNotTrack === "1" || window.doNotTrack === "1" || get(OFFK) === "1";
  const OFF_MSG = { ok:false, off:true, msg:"Stats sharing is turned off. Turn it on in settings to use this." };
  // How this visit arrived, worked out once at load: a friend link, another website's name, or "" (typed, texted, a bookmark).
  let ref = "";
  try{ const u = new URL(location.href), f = (u.searchParams.get("f") || "").toLowerCase();
    if(/^[a-z2-9]{8}$/.test(f)) ref = "friend";
    else if(document.referrer){ const h = new URL(document.referrer).hostname.toLowerCase(); if(h && h !== location.hostname) ref = h.slice(0, 100); } }catch(e){}
  // Friend link: keep the code from ?f=<code> until the server says it counted (or can't), and take it out of the address bar.
  try{ const u = new URL(location.href), f = (u.searchParams.get("f") || "").toLowerCase();
    if(/^[a-z2-9]{8}$/.test(f) && !get(IDK)) set(RK, f);
    if(u.searchParams.has("f")){ u.searchParams.delete("f"); history.replaceState(history.state, "", u.pathname + (u.search || "") + u.hash); } }catch(e){}
  // Real taps and key presses (made by a person, not by a script). Only the count goes out.
  let inputs = 0;
  const tap = e => { if(e && e.isTrusted && inputs < 999) inputs++; };
  try{ addEventListener("pointerdown", tap, { capture:true, passive:true }); addEventListener("keydown", tap, { capture:true, passive:true }); }catch(e){}
  const human = () => ({ in:inputs, wd:navigator.webdriver ? 1 : 0, ref });
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
  /* Back-off: after a failure, wait before trying again so a struggling or over-limit backend isn't hammered. */
  const waitInfo = () => { try{ return JSON.parse(get(BK) || "null") || { until:0, n:0 }; }catch(e){ return { until:0, n:0 }; } };
  const resting = () => Date.now() < waitInfo().until;
  function failed(limit){ const w = waitInfo(), n = Math.min((w.n || 0) + 1, 7);
    let ms = Math.min(60000 * Math.pow(2, n - 1), 3600000);                    // 1, 2, 4, 8, 16, 32, 60 minutes
    if(limit){ const d = new Date(); ms = Math.max(ms, Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + 1) - d.getTime() + 60000 * (5 + Math.random() * 25)); }  // daily limits reset at midnight UTC
    set(BK, JSON.stringify({ until:Date.now() + ms, n })); }
  function worked(){ if(get(BK)) set(BK, null); }
  /* One place for every request: a 6 second timeout, and any failure (offline, 5xx, over the limit, bad reply) is thrown. */
  async function req(path, data){
    if(resting()) throw new Error("resting");
    const ctl = typeof AbortController !== "undefined" ? new AbortController() : null;
    const tm = ctl ? setTimeout(() => ctl.abort(), TIMEOUT) : null;
    try{
      const r = await fetch(API + path, data === undefined ? (ctl ? { signal:ctl.signal } : undefined)
        : Object.assign({ method:"POST", headers:{ "Content-Type":"application/json" }, body:JSON.stringify(data), keepalive:true }, ctl ? { signal:ctl.signal } : {}));
      if(r && r.status && (r.status === 429 || r.status >= 500)){ failed(r.status === 429 || r.status === 503); throw new Error("http " + r.status); }
      const j = await r.json();
      if(j && j.limit){ failed(true); throw new Error("limit"); }
      worked(); return j;
    }catch(e){ if(e && e.message !== "resting" && !/^http|^limit/.test(e.message || "")) failed(false); throw e; }
    finally{ if(tm) clearTimeout(tm); }
  }
  const post = (path, data) => req(path, data || {});
  const getj = path => req(path);
  /* Counts background pings per device per day, for health() only. There is no cap. */
  function count(){ const today = new Date().toISOString().slice(0,10); let d; try{ d = JSON.parse(get(DK) || "null"); }catch(e){}
    if(!d || d.day !== today) d = { day:today, n:0 }; d.n++; set(DK, JSON.stringify(d)); }
  let lastSig = "", lastAt = 0, readySig = "", readyAt = 0;
  const Q = {
    snap: () => ({}),
    send(){
      const id = pid(); if(!id || off() || busy || resting()) return;
      tick(); let s = {}; try{ s = Q.snap() || {}; }catch(e){}
      const ev = queue().slice(0, 60);
      const sig = JSON.stringify([s.ducks, s.worlds, s.world_max, s.points, s.games, ev.length, get(RK) ? 1 : 0, inputs >= 5 ? 1 : 0]), secs = Math.round(active / 1000);
      if(sig === lastSig && secs - lastAt < 60) return;      // nothing new worth a request
      count();
      busy = true;
      post("/v1/ping", Object.assign({ pid:id, device:device(), mode:mode(), where,
        sess:Object.assign({ secs:Math.round(active / 1000) }, sess), ev }, human(), s))
        .then(r => { if(r && r.ok){ lastSig = sig; lastAt = secs; } if(r && r.ok && !r.slow) keep(queue().slice(ev.length));
          const code = get(RK); if(code && r && r.ok && (s.ducks || (s.found || []).length))
            return post("/v1/friend/claim", { pid:id, code }).then(c => { if(c && !c.retry) set(RK, null); }); })
        .catch(()=>{}).finally(() => { busy = false; });
    },
    start(){
      if(off()) return;
      Q.send();
      setInterval(tick, 1000);
      setInterval(() => { if(document.visibilityState === "visible") Q.send(); }, EVERY);
      document.addEventListener("visibilitychange", () => { tick(); if(document.visibilityState === "hidden") Q.send(); });
    },
    wait:20000,
    changed(){ clearTimeout(t); t = setTimeout(Q.send, Q.wait); },   // finds close together go out as one ping
    screen(world, screenName){ where = { world:String(world || "").toLowerCase().slice(0,30), screen:String(screenName || "").slice(0,30) }; },
    event(type, data){ if(off()) return; const q = queue(); q.push(Object.assign({ t:type }, data || {})); keep(q); if(q.length >= 40) Q.changed(); },
    async board(){ try{ return await getj("/v1/board?pid=" + encodeURIComponent(pid() || "")); }catch(e){ return { ok:false, rows:[], offline:true }; } },
    async setName(name){ const c = window.QName ? QName.check(name) : { ok:true, name };
      if(!c.ok) return c;
      const id = pid(); if(!id) return { ok:false, msg:"Can't reach the leaderboard right now. Try again soon." };
      let snap = {}; try{ snap = Q.snap() || {}; }catch(e){}
      try{ await Q.ready(); }catch(e){}
      try{ return await post("/v1/board", { pid:pid(), name:c.name }); }catch(e){ return { ok:false, msg:"Can't reach the leaderboard right now. Try again soon." }; } },
    async ready(){ let snap = {}; try{ snap = Q.snap() || {}; }catch(e){}
      const sig = "r" + JSON.stringify([snap.ducks, snap.worlds, snap.points]);   // the server already has this progress: skip the extra request
      if(sig === readySig && Date.now() - readyAt < 300000) return;
      try{ const r = await post("/v1/ping", Object.assign({ pid:pid(), device:device(), mode:mode(), where }, human(), snap)); if(r && r.ok){ readySig = sig; readyAt = Date.now(); } }catch(e){} },
    async ideas(){ const id = off() ? "" : (pid() || "");
      try{ return await getj("/v1/ideas?pid=" + encodeURIComponent(id)); }catch(e){ return { ok:false, ideas:[], offline:true }; } },
    async suggestIdea(kind, text){ if(off()) return OFF_MSG;
      const c = window.QName && QName.checkText ? QName.checkText(text) : { ok:true, text };
      if(!c.ok) return c;
      await Q.ready();
      try{ return await post("/v1/ideas", { pid:pid(), kind, text:c.text }); }catch(e){ return { ok:false, msg:"Can't reach the idea box right now. Try again soon." }; } },
    async vote(id, on){ if(off()) return OFF_MSG;
      try{ return await post("/v1/ideas/vote", { pid:pid(), id:Number(id), on:on !== false }); }catch(e){ return { ok:false, msg:"Can't reach the idea box right now. Try again soon." }; } },
    async friend(){ if(off()) return OFF_MSG;
      await Q.ready();
      try{ const c = await post("/v1/friend/code", { pid:pid() }); if(!c || !c.ok) return c || { ok:false };
        const st = await getj("/v1/friend/status?pid=" + encodeURIComponent(pid() || ""));
        return { ok:true, code:c.code, friends:(st && st.friends) || 0, link:GAME + "?f=" + c.code }; }catch(e){ return { ok:false, offline:true }; } },
    async friends(){ if(off()) return { ok:false, friends:0, off:true };
      try{ return await getj("/v1/friend/status?pid=" + encodeURIComponent(pid() || "")); }catch(e){ return { ok:false, friends:0, offline:true }; } },
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
    health(){ const w = waitInfo(); let d = null; try{ d = JSON.parse(get(DK) || "null"); }catch(e){} return { resting:resting(), until:w.until || 0, fails:w.n || 0, pingsToday:d && d.day === new Date().toISOString().slice(0,10) ? d.n : 0, queued:queue().length }; },
  };
  window.QStats = Q;
})();
