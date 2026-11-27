/* ---------- Space monster (Colton's idea, only in worlds with a monster map, like The Spaceship) ----------
   Every so often a silly monster sneaks into another room. Find it and tap it before the timer runs out,
   or it gobbles up the last duck you found there, which goes back to its hiding spot. Guesses for Mitchell to check:
   MON_SECS (time to find it), MON_GAP (how long between monsters), one duck eaten, +5 Pond Points for a zap. */
const MON_SECS=30, MON_GAP=[60,90], MON_PTS=5;
const MON={room:null,left:0,next:0,warned:false};
const monW=()=>{ const w=S.screen==="world"&&W[S.world]; return w&&w.monster?w:null; };
const monArmed=w=>{ const r=regDucks(w), n=r.filter(d=>S.found.has(d.id)).length; return n>=2&&n<r.length; };
const monPaused=()=>document.visibilityState==="hidden"||!$("sheet").hidden||!$("done").hidden;
const monGap=()=>MON_GAP[0]+Math.floor(Math.random()*(MON_GAP[1]-MON_GAP[0]+1));
function monPill(){ const w=W[S.world]; let p=$("monPill");
  if(!MON.room||!w||!w.monster){ if(p) p.remove(); return; }
  if(!p){ p=document.createElement("div"); p.id="monPill"; p.className="monpill"; p.setAttribute("role","status"); stage.insertBefore(p,$("toast")); }
  p.classList.toggle("here",MON.room===S.area); p.classList.toggle("hurry",MON.left<=10);
  p.innerHTML=`<svg width="26" height="22" viewBox="-48 -36 96 60" aria-hidden="true">${monsterArt()}</svg><span>${MON.room===S.area?"It's in here! Tap it!":`Monster in the ${w.areas[MON.room].name}!`}</span><b>${MON.left}</b>`; }
function monClear(){ const was=MON.room; MON.room=null; monPill(); if(was&&S.screen==="world"&&S.area===was) rerender(); }
function monSpawn(w){ const rooms=Object.keys(w.monster).filter(k=>k!==S.area&&w.areas[k]); if(!rooms.length) return;
  MON.room=rooms[Math.floor(Math.random()*rooms.length)]; MON.left=MON_SECS; monPill();
  tone(880,660,.16,"square",.06); tone(880,660,.16,"square",.06,.22);
  toast(`Uh oh! A space monster sneaked into the ${w.areas[MON.room].name}. Find it and tap it before it eats a duck!`,3600); }
function monEat(w){ const got=[...S.found].filter(id=>regDucks(w).some(d=>d.id===id)), id=got[got.length-1];
  MON.room=null; MON.next=monGap(); monPill();
  if(!id){ rerender(); return; }
  const d=DUCK[id]; S.found.delete(id); const f=(w.hide||{})[id]; if(f) delete S.F[f]; save();
  tone(300,120,.35,"sawtooth",.12);
  toast(`Oh no! The monster gobbled up the ${d.name}! It's back in its hiding spot in the ${w.areas[d.area].name}. Find it again!`,4200);
  renderHud(false); bumpBadge(); rerender(); }
function monZap(a){ const w=W[S.world]; if(!MON.room) return;
  const b=a.getBoundingClientRect(); burst(stage,b.left+b.width/2,b.top+b.height/2);
  S.pts+=MON_PTS; save(); try{ QStats.event("earn",{src:"monster",n:MON_PTS}); }catch(e){}
  MON.next=monGap(); pop(); toast(`Zapped! The monster zoomed back to its spaceship. +${MON_PTS} Pond Points`,2600); monClear(); }
function monTick(){ const w=monW();
  if(!w){ if(MON.room) monClear(); MON.next=0; return; }
  if(monPaused()) return;
  if(!MON.warned&&!(S.flags[w.id]||{})._mon&&monArmed(w)){ MON.warned=true; (S.flags[w.id]=S.flags[w.id]||{})._mon=1; save();
    toast("Watch out! Space monsters sneak around this ship. If one shows up, find it and tap it fast!",3600); return; }
  if(MON.room){ MON.left--; if(MON.left<=0) monEat(w); else monPill(); return; }
  if(!monArmed(w)){ MON.next=0; return; }
  if(!MON.next) MON.next=monGap();
  if(--MON.next<=0) monSpawn(w); }
setInterval(()=>{ if(!window.QNOMON) monTick(); },1000); /* tests set QNOMON and call monTick themselves */
/* Draw the monster in its room, and send a tap on it to monZap. */
const monScene0=sceneSVG;
sceneSVG=function(id){ const s=monScene0(id), w=W[S.world];
  if(THUMB||!w||!w.monster||MON.room!==id) return s; const [x,y,k]=w.monster[id];
  return s.replace(/<\/svg>$/,act("monster","Space monster! Tap it!",`<g transform="translate(${x} ${y}) scale(${k})"><circle r="52" fill="transparent"/><g class="monwig">${monsterArt()}</g></g>`)+"</svg>"); };
const monAct0=doAct;
doAct=function(k,a){ if(k==="monster"){ monZap(a); return; } return monAct0(k,a); };
const monShow0=show;
show=function(id,dir){ monShow0(id,dir); monPill(); };
