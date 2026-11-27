
/* ---------- Leaderboard + anonymous play stats (QStats from quackers-stats.js, QName from name-check.js) ---------- */
const LBK="quackers-lbname";
const gameDucks=()=>[...S.found].filter(id=>DUCK[id]);
const worldsDone=()=>WORLDS.filter(w=>wFound(w)>=wTotal(w)).length;
function bestLevels(){ const o={}; MINI.forEach(m=>{ const st=S.mg[m.id]; let b=0; if(st) for(const [l,s] of Object.entries(st.stars||{})) if(s>0) b=Math.max(b,+l); o[m.id]=b; }); return o; }
if(window.QStats){
  QStats.snap=()=>({ducks:gameDucks().length,worlds:worldsDone(),world_max:S.unlocked,points:S.pts,games:bestLevels(),
    found:gameDucks().map(id=>[id,DUCK[id].name,DUCK[id].world])});
  /* Only ping when progress actually changes, not on every save (moving between areas saves too). */
  let sig="";
  const progSig=()=>[S.found.size,S.unlocked,S.pts,JSON.stringify(bestLevels())].join("|");
  const save0=save; save=function(){ save0(); try{ const s=progSig(); if(s!==sig){ sig=s; QStats.changed(); } }catch(e){} };
  sig=progSig();
  const where=(w,s)=>{ try{ QStats.screen(w,s); }catch(e){} };
  const show0=show; show=function(id,dir){ const r=show0(id,dir); where(S.world,id); return r; };
  const home0=goHome; goHome=function(){ const r=home0(); where("","home"); addBoardBtn(); return r; };
  const shop0=openShop; openShop=function(m){ const r=shop0(m); where(S.screen==="world"?S.world:"","shop"); return r; };
  const map0=openMap; openMap=function(){ const r=map0(); where(S.world,"map"); return r; };
  const log0=openLog; openLog=function(){ const r=log0(); where(S.world,"log"); return r; };
  const games0=openGames; openGames=function(){ const r=games0(); where("","games"); return r; };
  const spec0=openSpecial; openSpecial=function(){ const r=spec0(); where("","special"); return r; };
  const mini0=openMini; openMini=function(id){ const r=mini0(id); where("","game:"+id); return r; };
  const end0=endMini; endMini=function(){ const g=R.g, L=R.L; let s=0; try{ s=g.stars(); }catch(e){} const p0=S.pts;
    const r=end0(); try{ QStats.event("try",{g:g.id,l:L,win:s>0}); if(S.pts>p0) QStats.event("earn",{src:g.id,n:S.pts-p0}); QStats.changed(); }catch(e){} return r; };
  const buy0=buy; buy=function(id){ const p0=S.pts, i=SHOP.find(x=>x.id===id); const r=buy0(id);
    try{ if(i&&S.pts<p0) QStats.event("buy",{item:id,name:i.name||id,cost:p0-S.pts}); }catch(e){} return r; };
} else {
  const home0=goHome; goHome=function(){ const r=home0(); addBoardBtn(); return r; };
}

const TROPHY=`<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M18 8h28v14a14 14 0 0 1-28 0z" fill="#FFD84D" stroke="#173A5E" stroke-width="3" stroke-linejoin="round"/><path d="M18 12H9a9 9 0 0 0 10 11M46 12h9a9 9 0 0 1-10 11" fill="none" stroke="#173A5E" stroke-width="3" stroke-linecap="round"/><path d="M28 35h8l2 10H26z" fill="#F0A500" stroke="#173A5E" stroke-width="3" stroke-linejoin="round"/><rect x="18" y="45" width="28" height="9" rx="3" fill="#2387D9" stroke="#173A5E" stroke-width="3"/></svg>`;
const DICE=`<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="4" y="4" width="24" height="24" rx="6" fill="#fff" stroke="#173A5E" stroke-width="3"/><circle cx="11" cy="11" r="2.4" fill="#173A5E"/><circle cx="21" cy="21" r="2.4" fill="#173A5E"/><circle cx="16" cy="16" r="2.4" fill="#173A5E"/><circle cx="21" cy="11" r="2.4" fill="#173A5E"/><circle cx="11" cy="21" r="2.4" fill="#173A5E"/></svg>`;
function addBoardBtn(){ const box=$("scrHome").querySelector(".bigbtns"); if(!box||$("hBoard")) return;
  const b=document.createElement("button"); b.type="button"; b.className="bigbtn board"; b.id="hBoard";
  b.innerHTML=`${TROPHY}<span>Leaderboard<small class="ppsmall">Top duck finders</small></span>`;
  box.appendChild(b); b.addEventListener("click",openBoard); }
const lbEsc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const lbDuck=(crown)=>`<svg viewBox="-44 -54 88 86" aria-hidden="true">${toyDuck(YEL,crown?"crown":"")}</svg>`;
function myName(){ try{ return localStorage.getItem(LBK)||""; }catch(e){ return ""; } }
function openBoard(){
  const mine=gameDucks().length, nm=myName();
  openSheet(`<div class="lb">
   <div class="lbhello">${TROPHY}<div><b>Top Duck Finders</b><small>Most ducks found wins. Ties go to whoever finished more worlds.</small></div></div>
   <div id="lbBoard" class="lbload">Loading the board...</div>
   <form class="lbcard" id="lbForm" autocomplete="off" novalidate>
    <b id="lbTitle">${nm?"Change your name":"Put your name on the board"}</b>
    <small>Pick a fun nickname. Don't use your real name, school or anything about where you live.</small>
    <div class="lbfield"><input id="lbName" name="lbName" aria-label="Leaderboard name" maxlength="14" placeholder="Captain Quack" spellcheck="false" value="${lbEsc(nm)}" aria-describedby="lbMsg">
     <button class="lbdice" type="button" id="lbDice" aria-label="Make me a duck name">${DICE}</button></div>
    <div class="lbcount" id="lbCount">${nm.length} / 14</div>
    <div class="lbmsg" id="lbMsg" role="status" hidden></div>
    <button class="go" type="submit" id="lbSave">Save my name</button>
   </form></div>`,"Leaderboard");
  const say=(ok,t)=>{ const m=$("lbMsg"); if(!m) return; m.hidden=false; m.className="lbmsg "+(ok?"yes":"no"); m.textContent=t; };
  if(!mine) say(false,"Find a duck first, then add your name.");
  $("lbName").addEventListener("input",()=>{ $("lbCount").textContent=`${$("lbName").value.length} / 14`; $("lbMsg").hidden=true; });
  $("lbDice").addEventListener("click",()=>{ if(!window.QName) return; $("lbName").value=QName.suggest(); $("lbName").dispatchEvent(new Event("input")); blip(); });
  $("lbForm").addEventListener("submit",async e=>{ e.preventDefault();
    if(!gameDucks().length){ say(false,"Find a duck first, then add your name."); blip(); return; }
    if(!window.QStats){ say(false,"Can't reach the leaderboard right now. Try again soon."); return; }
    const btn=$("lbSave"); btn.disabled=true;
    let r; try{ r=await QStats.setName($("lbName").value); }catch(err){ r={ok:false,msg:"Can't reach the leaderboard right now. Try again soon."}; }
    if(!$("lbForm")) return; btn.disabled=false;
    if(!r||!r.ok){ say(false,(r&&r.msg)||"That name didn't work. Try another!"); const i=$("lbName"); i.classList.remove("shake"); void i.offsetWidth; i.classList.add("shake"); blip(); return; }
    try{ localStorage.setItem(LBK,r.name); }catch(err){}
    $("lbTitle").textContent="Change your name"; quack();
    const b=await loadBoard(); const me=b&&b.mine;
    say(true,`You're on the board as ${r.name}!${me&&me.rank?` You're number ${me.rank}.`:""} Find more ducks to climb.`);
  });
  loadBoard();
}
async function loadBoard(){
  const el=$("lbBoard"); if(!el) return null;
  const b=window.QStats?await QStats.board():{ok:false};
  if(!$("lbBoard")) return null;
  if(!b||!b.ok){ el.className="lbload"; el.textContent="Can't reach the leaderboard right now. Try again soon."; return null; }
  const rows=b.rows||[], mine=rows.find(r=>r.me)||b.me||null;
  if(!rows.length){ el.className="lbload"; el.textContent="Nobody is on the board yet. Be the first!"; return {mine}; }
  const top=rows.slice(0,3), order=[[top[1],"p2",2],[top[0],"p1",1],[top[2],"p3",3]];
  const row=(p)=>`<li class="lbrow${p.me?" me":""}"><span class="n">${p.rank}</span>${lbDuck(false)}<b>${lbEsc(p.name)}${p.me?" <i>(you)</i>":""}</b><span class="ct">${p.ducks}<small>ducks</small></span></li>`;
  let list=rows.slice(3,10).map(row);
  if(mine&&mine.rank>10) list.push(`<li class="lbgap" aria-hidden="true">...</li>`,row(mine));
  if(!mine) list.push(`<li class="lbgap" aria-hidden="true">...</li>`,`<li class="lbrow me"><span class="n">?</span>${lbDuck(false)}<b>Your spot</b><span class="ct">${gameDucks().length}<small>ducks</small></span></li>`);
  el.className="";
  el.innerHTML=`<div class="podium">${order.map(([p,c,n])=>p?`<div class="step ${c}">${lbDuck(n===1)}<span class="who">${lbEsc(p.name)}${p.me?" (you)":""}</span><span class="dk">${p.ducks} ducks</span><div class="block">${n}</div></div>`:`<div class="step ${c}"></div>`).join("")}<div class="pbase"></div></div><ol class="lblist">${list.join("")}</ol>`;
  return {mine};
}
/* Stats only go out from the real site, so previews and tests never send anything. */
if(window.QStats&&/(^|\.)quackersgame\.com$/.test(location.hostname)) try{ QStats.start(); }catch(e){}
