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
*/
(function(){
  const API = "https://quackers-api.tannerspaulding81.workers.dev";
  const IDK = "quackers-pid", QK = "quackers-stats-q";
  const off = () => navigator.doNotTrack === "1" || window.doNotTrack === "1";
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
        .then(r => { if(r && r.ok && !r.slow) keep(queue().slice(ev.length)); })
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
  };
  window.QStats = Q;
})();
