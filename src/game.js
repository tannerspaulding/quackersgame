/* ---------- Scene helpers ---------- */
const tagAt=(x,y,t,c="#ffffff")=>`<text x="${x}" y="${y}" text-anchor="middle" font-family="Grandstander,sans-serif" font-weight="900" font-size="${t.length>12?14:12}" letter-spacing=".5" fill="${c}"${c==="#ffffff"?` stroke="${INK}" stroke-width="3" paint-order="stroke"`:""} ${N}>${t}</text>`;
function seeded(n){ let s=n*9301+49297; return ()=>((s=(s*9301+49297)%233280)/233280); }
const stars=(n)=>{ const r=seeded(n); return `<g ${N}>${Array.from({length:n},()=>`<circle cx="${(r()*400).toFixed(0)}" cy="${(r()*150).toFixed(0)}" r="${(r()*1.4+.6).toFixed(1)}" fill="#fff" opacity="${(r()*.5+.4).toFixed(2)}"/>`).join("")}</g>`; };
const pumpkinAt=(x,y,s=1,face)=>`<g transform="translate(${x} ${y}) scale(${s})" ${N}><ellipse cx="-9" cy="0" rx="12" ry="15" fill="${G("#ff8c1a")}" ${O2}/><ellipse cx="9" cy="0" rx="12" ry="15" fill="${G("#ff8c1a")}" ${O2}/><ellipse cx="0" cy="0" rx="12" ry="16" fill="${G("#ffa030")}" ${O2}/>
  <path d="M0 -15 Q-2 -22 3 -25" stroke="#3f6b1f" stroke-width="3.4" fill="none" stroke-linecap="round"/>${face?`<path d="M-11 -4 L-6 -9 L-2 -4 Z M2 -4 L6 -9 L11 -4 Z" fill="#5a2a00"/><path d="M-10 4 Q0 12 10 4 L6 6 L3 3 L0 7 L-3 3 L-6 6 Z" fill="#5a2a00"/>`:""}</g>`;
const BOOKC=["#d8344f","#2387d9","#3fb86a","#ffcb2f","#8e44ad","#ff8a3d","#1aa3a3"];
const books=(y,x0,h,x1,gap)=>{ const r=seeded(y+x0); let x=x0+4, out=""; while(x<x1-8){ const w=10+Math.floor(r()*8), hh=h-Math.floor(r()*18);
    if(!(gap&&x+w>gap[0]&&x<gap[1])) out+=`<rect x="${x}" y="${y+h-hh}" width="${w}" height="${hh}" rx="2" fill="${G(BOOKC[Math.floor(r()*BOOKC.length)])}" ${O2}/>`;
    x+=w+2; } return `<g ${N}>${out}</g>`; };
const seaweed=(x,y,h,c="#3f9d3a")=>`<path d="M${x} ${y} Q${x-10} ${y-h*.3} ${x} ${y-h*.55} Q${x+10} ${y-h*.8} ${x} ${y-h}" stroke="${c}" stroke-width="8" fill="none" stroke-linecap="round" ${N}/>`;
const fish=(x,y,s=1,c="#ffcb2f")=>`<g transform="translate(${x} ${y}) scale(${s} ${Math.abs(s)})" ${N}><path d="M-14 0 Q0 -12 14 0 Q0 12 -14 0 Z" fill="${G(c)}" ${O2}/><path d="M-12 0 L-22 -8 L-22 8 Z" fill="${G(c)}" ${O2}/><circle cx="7" cy="-2" r="2" fill="#1a1a1a"/></g>`;
const bubbles=(x,y)=>`<g ${N} fill="#e6f7ff" fill-opacity=".35" stroke="#fff" stroke-opacity=".7" stroke-width="1.4"><circle cx="${x}" cy="${y}" r="5"/><circle cx="${x+8}" cy="${y-16}" r="3.4"/><circle cx="${x+2}" cy="${y-30}" r="4"/></g>`;
const coral=(x,y,c,s=1)=>`<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0 V-40 M0 -24 L-16 -40 V-56 M0 -30 L14 -46 V-60 M-16 -48 L-26 -56" stroke="${c}" stroke-width="10" fill="none" stroke-linecap="round"/></g>`;

/* ---------- State and saving ---------- */
const KEY="quackers-v3";
const NOW_MONTH=(()=>{ try{ const m=+new URLSearchParams(location.search).get("month"); if(m>=1&&m<=12) return m-1; }catch(e){} return new Date().getMonth(); })();
function load(){ try{ const j=JSON.parse(localStorage.getItem(KEY)||"null"); if(j&&typeof j==="object") return j; }catch(e){} return {}; }
const SV=load();
const S={screen:"home",world:null,area:null,found:new Set(SV.found||[]),flags:SV.flags||{},unlocked:SV.unlocked||1,sound:SV.sound!==false,tokens:SV.tokens||[],best:SV.best||0,last:SV.last||{},seen:new Set(),pts:SV.pts|0,mg:SV.mg||(SV.best?{egg:{lvl:2,stars:{1:SV.best}}}:{}),own:SV.own||[],hat:SV.hat||"",color:SV.color||"",spark:SV.spark|0,crowAt:0,
  get F(){ return this.flags[this.world]||(this.flags[this.world]={}); }};
function save(){ try{ localStorage.setItem(KEY,JSON.stringify({found:[...S.found],flags:S.flags,unlocked:S.unlocked,sound:S.sound,tokens:S.tokens,best:S.best,last:S.last,pts:S.pts,mg:S.mg,own:S.own,hat:S.hat,color:S.color,spark:S.spark})); }catch(e){} }

/* ---------- Sound ---------- */
let actx;
function ctx(){ try{ actx=actx||new (window.AudioContext||window.webkitAudioContext)(); if(actx.state==="suspended") actx.resume(); return actx; }catch(e){ return null; } }
function tone(f1,f2,dur,type="sine",vol=.18,when=0){ if(!S.sound) return; const c=ctx(); if(!c) return; const t=c.currentTime+when, o=c.createOscillator(), g=c.createGain();
  o.type=type; o.frequency.setValueAtTime(f1,t); o.frequency.exponentialRampToValueAtTime(Math.max(40,f2),t+dur);
  g.gain.setValueAtTime(vol,t); g.gain.exponentialRampToValueAtTime(.001,t+dur); o.connect(g); g.connect(c.destination); o.start(t); o.stop(t+dur+.02); }
const quack=()=>{ tone(560,260,.18,"sawtooth",.25); tone(520,250,.16,"sawtooth",.18,.2); };
const blip=(k)=>tone(k==="door"?300:420,k==="door"?200:520,.08,"triangle",.08);
const pop=()=>tone(300,700,.12,"sine",.15);
const fanfare=()=>[523,659,784,1046].forEach((f,i)=>tone(f,f*1.01,.22,"triangle",.16,i*.13));

/* ---------- Ducks in scenes ---------- */
let delay=0, THUMB=false;
const shadow=(rx=22)=>`<ellipse class="shadow" cx="0" cy="26" rx="${rx}" ry="4.5" fill="#173a5e" opacity=".2"/>`;
function place(id,x,y,s,o={}){
  if(S.found.has(id)&&!THUMB) return "";
  const d=DUCK[id]; if(!d) return ""; delay=(delay+0.47)%2.6;
  const art=d.art?d.art():toyDuck(d.c,d.acc);
  return `<g class="duck" data-duck="${id}" tabindex="0" role="button" aria-label="Something hiding" transform="translate(${x} ${y}) scale(${o.flip?-s:s} ${o.upside?-s:s})"${d.opacity?` opacity="${d.opacity}"`:""}>
    <circle cx="2" cy="-4" r="34" fill="transparent"/>${o.noShadow?"":shadow()}<g class="bob" style="animation-delay:-${delay.toFixed(2)}s">${art}</g></g>`;
}
const door=(to,label,inner,soon)=>`<g class="door" ${soon?`data-soon="${soon}"`:`data-door="${to}"`} tabindex="0" role="button" aria-label="${label}">${inner}</g>`;
const act=(name,label,inner)=>`<g class="act" data-act="${name}" tabindex="0" role="button" aria-label="${label}">${inner}</g>`;
const helperAt=(w,x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})" ${N}>${shadow(20)}<g class="bob">${w.helper.art(false)}</g></g>`;
/* Each new world has a helper. Every duck you find gives you one of its tokens; hand them all over and the helper becomes the last duck. */
const ICONS={fish:s=>fishIcon(s),ticket:s=>ticketIcon(s),gear:s=>gearIcon(s)};
const regDucks=w=>(w.ducks||[]).filter(d=>!d.helper);
const helperDuck=w=>(w.ducks||[]).find(d=>d.helper);
const tokensFor=w=>regDucks(w).filter(d=>S.found.has(d.id)).length;
function HELP(wid,x,y,s){ const w=WORLDS_REF(wid), hd=helperDuck(w);
  if(THUMB) return helperAt(w,x,y,s);
  if(S.found.has(hd.id)) return `<g transform="translate(${x} ${y}) scale(${s})" ${N}>${shadow(20)}<g class="bob">${w.helper.art(true)}</g></g>`;
  const got=tokensFor(w), need=regDucks(w).length;
  return act("helper",`${w.helper.name}: ${got} of ${need} ${w.helper.plural}`,`<g transform="translate(${x} ${y}) scale(${s})"><circle cx="0" cy="0" r="40" fill="transparent"/>${shadow(20)}<g class="bob">${w.helper.art(false)}</g>
    <g transform="translate(0 -52)"><rect x="-30" y="-13" width="60" height="26" rx="13" fill="${got>=need?"#4cd2a0":"#ffffff"}" stroke="${INK}" stroke-width="2.6"/><g transform="translate(-13 0)">${ICONS[w.helper.icon](.62)}</g><text x="11" y="5" text-anchor="middle" font-family="Grandstander,sans-serif" font-weight="900" font-size="13" fill="${INK}">${got}/${need}</text></g></g>`); }

/* ---------- Holiday ducks ---------- */
const HOL=[{id:"turkey",name:"Turkey Duck",holiday:"Thanksgiving",m:10,month:"November",world:"yard",area:"garden",tier:"Holiday",
  hint:"Gobble gobble",task:"Find 6 acorns in The Backyard, then search for the duck.",tokens:{a1:"yard",a2:"yard",a3:"garden",a4:"pond",a5:"treetop",a6:"house"},art:()=>toyTurkey()}];
const holOn=h=>!!h&&h.m===NOW_MONTH;
const holLive=h=>holOn(h)&&!S.found.has(h.id);
const holHere=()=>HOL.find(h=>h.world===S.world);
const tokAll=h=>Object.keys(h.tokens).length;
const tokGot=h=>S.tokens.filter(t=>t in h.tokens).length;
function T(id,x,y){ if(THUMB) return ""; const h=holHere(); if(!holLive(h)||!(id in h.tokens)||S.tokens.includes(id)) return "";
  return `<g class="token" data-token="${id}" tabindex="0" role="button" aria-label="Something small" transform="translate(${x} ${y})"><circle r="18" fill="transparent"/><g class="bob">${acornIcon(.9)}</g></g>`; }
function H(id,x,y,s){ const h=HOL.find(k=>k.id===id); if(THUMB||!holOn(h)||tokGot(h)<tokAll(h)) return ""; return place(id,x,y,s); }

/* ---------- Worlds ---------- */
const WORLDS=[/*WORLDS*/];
const SOON=[/*SOON*/];
function WORLDS_REF(id){ return WORLDS.concat(SOON).find(w=>w.id===id); }
const W=Object.fromEntries(WORLDS.map(w=>[w.id,w]));
const DUCK={}; WORLDS.concat(SOON).forEach(w=>(w.ducks||[]).forEach(d=>{d.world=w.id; DUCK[d.id]=d;}));
HOL.forEach(h=>{ DUCK[h.id]=h; });
const TOGGLE=new Set(["mail","can","birdhouse"]);

/* ---------- UI helpers ---------- */
const $=id=>document.getElementById(id);
const stage=$("stage");
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
const CHEV={left:"M16 5 L8 13 L16 21",right:"M10 5 L18 13 L10 21",up:"M5 16 L13 8 L21 16",down:"M5 10 L13 18 L21 10"};
const wDucks=w=>w.ducks||[];
const wTotal=w=>wDucks(w).length;
const wFound=w=>wDucks(w).filter(d=>S.found.has(d.id)).length;
const allDucks=()=>WORLDS.reduce((n,w)=>n+wTotal(w),0);
/* Open every world whose earlier world is finished, so progress saved before a new world was added still opens it. */
function syncUnlock(){ let u=Math.max(1,S.unlocked|0); for(const w of WORLDS){ const next=WORLDS[w.n]; if(next&&w.n<=u&&wFound(w)>=wTotal(w)) u=Math.max(u,next.n); } u=Math.min(u,WORLDS.length); if(u!==S.unlocked){ S.unlocked=u; save(); } }
syncUnlock();
let tt;
function toast(msg,ms=1900){ const t=$("toast"); t.textContent=msg; t.classList.add("on"); clearTimeout(tt); tt=setTimeout(()=>t.classList.remove("on"),ms); }
function burst(host,x,y){
  if(reduce) return;
  const r=host.getBoundingClientRect();
  for(let i=0;i<10;i++){
    const d=document.createElement("i"); d.className="confetti"; const a=i/10*Math.PI*2;
    d.style.cssText=`left:${x-r.left-5}px;top:${y-r.top-5}px;background:${["#FFCB2F","#FF6FA6","#3FB86A","#8FD0FF"][i%4]}`;
    host.appendChild(d);
    const an=d.animate?d.animate([{transform:"translate(0,0) scale(1)"},{transform:`translate(${Math.cos(a)*52}px,${Math.sin(a)*52}px) scale(.3)`,opacity:0}],{duration:600,easing:"cubic-bezier(.2,.8,.4,1)"}):null;
    if(an) an.onfinish=()=>d.remove(); else d.remove();
  }
}
const SND_ON=`<svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true"><path d="M3 8 H7 L12 4 V18 L7 14 H3 Z" fill="#fff" stroke="#173A5E" stroke-width="2.2" stroke-linejoin="round"/><path d="M15 8 Q17 11 15 14 M17 6 Q21 11 17 16" fill="none" stroke="#173A5E" stroke-width="2.2" stroke-linecap="round"/></svg>`;
const SND_OFF=`<svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true"><path d="M3 8 H7 L12 4 V18 L7 14 H3 Z" fill="#fff" stroke="#173A5E" stroke-width="2.2" stroke-linejoin="round"/><path d="M15 8 L20 14 M20 8 L15 14" stroke="#173A5E" stroke-width="2.2" stroke-linecap="round"/></svg>`;
function renderSound(){ const b=$("sndBtn"); b.innerHTML=S.sound?SND_ON:SND_OFF; b.setAttribute("aria-label",S.sound?"Sound on":"Sound off"); b.setAttribute("aria-pressed",S.sound?"true":"false"); }
function toggleSound(){ S.sound=!S.sound; save(); renderSound(); if(S.sound) blip(); }
$("sndBtn").addEventListener("click",toggleSound);

/* ---------- Screens ---------- */
/* The swim-ring Q from the Quackers app icon: the duck sits in the ring and the handle makes the Q's tail. */
const QMARK=`<g class="logo-duck"><g transform="translate(57.6 66) scale(.62)"><path d="M27 58 Q10 52 7 34 Q21 39 34 46 Z" fill="#FFCB2F" stroke="#173A5E" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/><ellipse cx="55" cy="64" rx="37" ry="25" fill="#FFCB2F" stroke="#173A5E" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/><path d="M36 63 Q51 47 70 60 Q60 77 40 71 Z" fill="#F0A500" stroke="#173A5E" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/><circle cx="82" cy="39" r="21" fill="#FFCB2F" stroke="#173A5E" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/><ellipse cx="73" cy="28" rx="5.5" ry="2.6" fill="#fff" opacity=".6" transform="rotate(-28 73 28)"/><ellipse cx="33" cy="54" rx="9" ry="3" fill="#fff" opacity=".45" transform="rotate(-18 33 54)"/><path d="M100 40 Q115 37 117 44 Q111 52 100 50 Z" fill="#FF8A3D" stroke="#173A5E" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/><path d="M102 45.6 L113.5 45" fill="none" stroke="#173A5E" stroke-width="2" stroke-linecap="round"/><circle cx="91" cy="47.5" r="4.5" fill="#FF8FB1" opacity=".7"/><circle cx="89" cy="34" r="4.8" fill="#173A5E"/><circle cx="90.7" cy="32.3" r="1.7" fill="#fff"/><path d="M63 23 L81.5 2.5 L100 23 Z" fill="#fff" stroke="#173A5E" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/><rect x="61" y="19" width="41.5" height="7" rx="3.5" fill="#2387D9" stroke="#173A5E" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/></g></g><circle cx="96" cy="100" r="58" fill="none" stroke="#173A5E" stroke-width="34"/><circle cx="96" cy="100" r="58" fill="none" stroke="#fff" stroke-width="26"/><circle cx="96" cy="100" r="58" fill="none" stroke="#FF8A3D" stroke-width="26" stroke-dasharray="36 55.1" stroke-dashoffset="18" transform="rotate(-45 96 100)"/><path d="M136 140 Q152 166 190 172" fill="none" stroke="#173A5E" stroke-width="24" stroke-linecap="round"/><path d="M136 140 Q152 166 190 172" fill="none" stroke="#2387D9" stroke-width="15" stroke-linecap="round"/>`;
function setScreen(name){
  S.screen=name; closeSheet();
  $("scrHome").hidden=name!=="home"; $("scrWorld").hidden=name!=="world"; $("scrEgg").hidden=name!=="egg";
  $("homeBtn").disabled=name==="home";
  const play=name==="world"||name==="egg";
  $("app").classList.toggle("playing",play); document.documentElement.style.overflow=play?"hidden":"";
  $("done").hidden=true; if(name!=="world") $("intro").classList.add("off");
  if(name!=="egg") stopEgg();
}
const lockSvg=`<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><rect x="3" y="7" width="10" height="7" rx="2" fill="#FFCB2F" stroke="#173A5E" stroke-width="1.8"/><path d="M5.5 7 V5 A2.5 2.5 0 0 1 10.5 5 V7" fill="none" stroke="#173A5E" stroke-width="1.8"/></svg>`;
function goHome(){
  setScreen("home"); $("title").textContent="Quackers";
  const hol=HOL.find(h=>holOn(h));
  const got=WORLDS.reduce((n,w)=>n+wFound(w),0);
  let ev;
  if(hol&&!S.found.has(hol.id)) ev=`<b>A ${hol.holiday} visitor is here!</b><small>${hol.name}: ${tokGot(hol)<tokAll(hol)?`find ${tokAll(hol)} acorns in The Backyard (${tokGot(hol)} of ${tokAll(hol)}), then search for the duck.`:"all acorns found! Search The Backyard for the duck."}</small>`;
  else if(hol) ev=`<b>You found the ${hol.name}!</b><small>It's in your Backyard Duck Log. More holiday ducks are on the way.</small>`;
  else ev=`<b>Holiday ducks</b><small>Special ducks visit on holidays. Look out for them!</small>`;
  const heroH=HOL[0];
  $("scrHome").innerHTML=`
   <div class="logo" role="img" aria-label="Quackers"><svg class="qmark" viewBox="16 20 190 168" aria-hidden="true">${QMARK}</svg><b aria-hidden="true">uackers</b></div>
   <p class="total">${got} of ${allDucks()} ducks found</p>
   <button type="button" class="event" id="evt"><svg viewBox="-46 -48 92 76" aria-hidden="true"><g class="bob">${(hol||heroH).art()}</g></svg><span>${ev}</span></button>
   <div class="worlds">${WORLDS.map(w=>{ const f=wFound(w), t=wTotal(w), open=w.n<=S.unlocked, prev=WORLDS[w.n-2];
     return `<button type="button" class="wcard${open?"":" locked"}" data-world="${w.id}" aria-label="${w.name}${open?`, ${f} of ${t} found`:", locked"}">
      <span class="thumb">${sv("0 0 400 300",thumbOf(w),'style="pointer-events:none"')}${open?(f===t?`<span class="tag complete">Complete</span>`:""):`<span class="tag lock">${lockSvg}Locked</span>`}</span>
      <span class="meta"><span class="num">World ${w.n}</span><b>${w.name}</b>${open?`<small>${f} of ${t} found</small><span class="bar2"><i style="width:${t?f/t*100:0}%"></i></span>`:`<small>Find every duck in ${prev.name} to open</small>`}</span></button>`;}).join("")}
     ${SOON.map(w=>`<button type="button" class="wcard off" data-soon="${w.id}" aria-label="${w.name}, coming soon">
      <span class="thumb">${sv("0 0 400 300",thumbOf(w),'style="pointer-events:none"')}<span class="tag">Coming soon</span></span>
      <span class="meta"><span class="num">World ${w.n}</span><b>${w.name}</b><small>Coming soon</small></span></button>`).join("")}</div>
   <div class="bigbtns"><button type="button" class="bigbtn games" id="hGames">${IC.games}Mini games</button>
   <button type="button" class="bigbtn shop" id="hShop">${IC.shop}<span>Pond Points shop<small class="ppsmall">${PP}${S.pts}</small></span></button>
   <button type="button" class="bigbtn special" id="hSpecial"><svg viewBox="-40 -52 84 82" aria-hidden="true">${youDuck()}</svg>Special ducks<small class="soonlbl">${MINI.filter(starWon).length+SHOP.filter(i=>i.kind==="duck"&&own(i.id)).length} of ${MINI.length+Object.keys(SHOPDUCK).length}</small></button></div>
   <div class="homefoot"><button type="button" class="linkbtn" id="hReset">Start over</button></div>`;
  flush();
  $("evt").addEventListener("click",openHoliday);
  $("hShop").addEventListener("click",()=>openShop());
  $("hSpecial").addEventListener("click",openSpecial);
  $("hGames").addEventListener("click",openGames);
  $("hReset").addEventListener("click",askReset);
  $("scrHome").querySelectorAll("[data-world]").forEach(b=>b.addEventListener("click",()=>{ const w=W[b.dataset.world];
    if(w.n>S.unlocked){ homeToast(b,`Find every duck in ${WORLDS[w.n-2].name} first.`); blip(); return; } enterWorld(w.id); }));
  $("scrHome").querySelectorAll("[data-soon]").forEach(b=>b.addEventListener("click",()=>{ homeToast(b,"Mitchell is still building this one!"); blip(); }));
}
let resetT;
function askReset(){ const b=$("hReset");
  if(b.dataset.armed){ localStorage.removeItem(KEY); S.found=new Set(); S.flags={}; S.unlocked=1; S.tokens=[]; S.best=0; S.last={}; S.pts=0; S.mg={}; S.own=[]; S.hat=""; S.color=""; S.spark=0; doneShown.clear(); save(); goHome(); return; }
  b.dataset.armed="1"; b.textContent="Tap again to erase all your ducks"; b.classList.add("armed");
  clearTimeout(resetT); resetT=setTimeout(()=>{ if(b.isConnected){ delete b.dataset.armed; b.textContent="Start over"; b.classList.remove("armed"); } },3500);
}
function homeToast(b,msg){ const s=b.querySelector("small"); if(s){ const old=s.dataset.old||s.textContent; s.dataset.old=old; s.textContent=msg; clearTimeout(s._t); s._t=setTimeout(()=>{s.textContent=old;},1900);} }
function thumbOf(w){ THUMB=true; const svg=w.areas[w.start].draw({}).replace(/class="(duck|act|door|token)"/g,'class="x-$1"').replace(/tabindex="0" role="button"/g,""); THUMB=false; return svg; }

function enterWorld(id){
  const w=W[id]; S.world=id; setScreen("world"); lockW=0; $("title").textContent=w.name;
  stage.querySelectorAll(".layer").forEach(l=>l.remove());
  const start=(S.last[id]&&w.areas[S.last[id]])?S.last[id]:w.start;
  show(start);
  if(!S.seen.has(id)){ S.seen.add(id); intro(w); }
  questIntro(w);
  const h=holHere();
  if(holLive(h)&&tokGot(h)===0) setTimeout(()=>{ if(S.world===id&&S.screen==="world") toast(`A ${h.holiday} visitor is in ${w.name}! Find ${tokAll(h)} hidden acorns.`,3400); },2700);
}
let introT;
function intro(w){ const el=$("intro");
  el.innerHTML=`<b>${w.name}</b><span>Tap the arrows to move around</span><svg class="swipe" viewBox="0 0 26 26" aria-hidden="true"><path d="M10 5 L18 13 L10 21" fill="none" stroke="#173A5E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  el.classList.remove("off"); clearTimeout(introT); introT=setTimeout(()=>el.classList.add("off"),2600);
}
function sceneSVG(id){ const w=W[S.world]; const svg=`<svg viewBox="0 0 400 300" preserveAspectRatio="none" role="img" aria-label="${w.areas[id].name}">${w.areas[id].draw(S.F)}</svg>`; flush(); return svg; }
function gridOf(w){ const ps=Object.values(w.areas).map(a=>a.pos); return {cols:Math.max(...ps.map(p=>p[0]))+1, rows:Math.max(...ps.map(p=>p[1]))+1}; }
function miniMap(){
  const w=W[S.world]; const {cols,rows}=gridOf(w);
  return `<svg width="${cols*11+2}" height="${rows*11+2}" viewBox="0 0 ${cols*11+2} ${rows*11+2}" aria-hidden="true">${Object.entries(w.areas).map(([k,a])=>`<rect x="${a.pos[0]*11+1}" y="${a.pos[1]*11+1}" width="10" height="10" rx="3" fill="${k===S.area?"#FFCB2F":"#C9F2D6"}" stroke="#173A5E" stroke-width="1.8"/>`).join("")}</svg>`;
}
/* ---------- Side quests ---------- */
/* A world's side quests: its helper (every duck you find gives you a token to bring to it) and this month's holiday duck task. */
function quests(w){ const out=[], hd=helperDuck(w);
  if(w.helper&&hd&&!S.found.has(hd.id)){ const h=w.helper, got=tokensFor(w), need=regDucks(w).length;
    out.push({kind:"helper",title:`Help the ${h.name}`,art:h.art(false),icon:`<g transform="scale(.62)">${ICONS[h.icon](1)}</g>`,got,need,plural:h.plural,ready:got>=need,
      how:`Every duck you find gives you a ${h.token}. Bring all ${need} ${h.plural} to the ${h.name} in the ${w.areas[hd.area].name} and tap it. Then the ${h.name} joins your Duck Log as the last duck!`,
      now:got>=need?`You have all ${need}! Go to the ${w.areas[hd.area].name} and tap the ${h.name}.`:`You have ${got} of ${need} ${h.plural}. Keep finding ducks!`}); }
  const hol=HOL.find(x=>x.world===w.id);
  if(holLive(hol)){ const got=tokGot(hol), need=tokAll(hol);
    out.push({kind:"holiday",title:`${hol.holiday}: find the ${hol.name}`,art:hol.art(),icon:`<g transform="translate(0 -1) scale(.72)">${acornIcon(1)}</g>`,got,need,plural:"acorns",ready:got>=need,
      how:`For ${hol.holiday}, ${need} acorns are hidden around ${w.name}. Tap each one to pick it up. Once you have them all, the ${hol.name} comes out to play somewhere in this world.`,
      now:got>=need?`You have all ${need} acorns! Now search for the ${hol.name}.`:`You have ${got} of ${need} acorns.`}); }
  return out; }
function openQuests(first){ const w=W[S.world], qs=quests(w);
  if(!qs.length){ openSheet(`<p class="note">No side quests left in ${w.name}. Nice work!</p>`,"Side quests"); return; }
  openSheet(`${first?`<p class="note qintro">New side quest! These are extra jobs you can do while you hunt for ducks.</p>`:""}<div class="qlist">${qs.map(q=>`<div class="qcard${q.ready?" ready":""}">
    <svg class="qart" viewBox="-46 -60 92 92" aria-hidden="true">${q.art}</svg>
    <div class="qtxt"><b>${q.title}</b><small>${q.how}</small>
    <span class="qbar"><i style="width:${q.need?q.got/q.need*100:0}%"></i></span><span class="qnow">${q.now}</span></div></div>`).join("")}</div>
    <div class="menu" style="margin-top:12px"><button type="button" class="mbtn leave" id="qGo">${first?"Let's go!":"Back to the hunt"}</button></div>`,"Side quests");
  $("qGo").addEventListener("click",closeSheet); }
function questPulse(){ const q=$("questPill"); if(q.hidden) return; q.classList.remove("pop"); void q.offsetWidth; q.classList.add("pop"); }
function questIntro(w){ const f=S.flags[w.id]=S.flags[w.id]||{}; if(f._quest||!quests(w).length) return;
  setTimeout(()=>{ if(S.screen!=="world"||S.world!==w.id||!$("sheet").hidden||!$("done").hidden) return; f._quest=true; save(); openQuests(true); },2900); }
function renderHud(pop){
  const w=W[S.world];
  const p=$("areaPill"); p.innerHTML=miniMap()+w.areas[S.area].name;
  if(pop){p.classList.remove("pop");void p.offsetWidth;p.classList.add("pop");}
  const n=wFound(w), t=wTotal(w), b=$("countPill"), h=holHere();
  b.setAttribute("aria-label",`Duck Log: ${n} of ${t} found`);
  b.innerHTML=`<svg width="26" height="22" viewBox="-36 -44 78 70" aria-hidden="true">${toyDuck(YEL)}</svg>${n}/${t}`;
  const q=$("questPill"), qs=quests(w);
  q.hidden=!qs.length; q.classList.toggle("ready",qs.some(x=>x.ready));
  q.innerHTML=`<span class="qlab">Quest</span>`+qs.map(x=>`<svg width="18" height="18" viewBox="-12 -12 24 24" aria-hidden="true">${x.icon}</svg>${x.got}/${x.need}`).join(`<i class="sep"></i>`);
  q.setAttribute("aria-label","Side quests: "+qs.map(x=>`${x.got} of ${x.need} ${x.plural}`).join(", "));
  flush();
}
function bumpBadge(){ const b=$("countPill"); b.classList.remove("pop"); void b.offsetWidth; b.classList.add("pop"); }
const DIRS=["left","right","up","down"];
/* How the arrows look and sit: a (small see-through arrows at the screen edges), b (a d-pad), c (a row of named buttons). */
const PREVIEW=/*PREVIEW*/false;
let NAV=(new URLSearchParams(location.search).get("nav")||"a").toLowerCase(); if(!"abc".includes(NAV)||NAV.length!==1) NAV="a";
function setNav(n){ NAV=n; document.body.classList.remove("nav-a","nav-b","nav-c"); document.body.classList.add("nav-"+n);
  document.querySelectorAll("#navPick button").forEach(b=>b.setAttribute("aria-pressed",b.dataset.nav===n?"true":"false"));
  if(S.screen==="world"){ aim(); renderEdges(); } }
function renderEdges(peek){
  stage.querySelectorAll(".edge,.navbar").forEach(a=>a.remove());
  const w=W[S.world], a=w.areas[S.area];
  const bar=NAV==="c"?document.createElement("div"):null; if(bar){ bar.className="navbar"; stage.insertBefore(bar,$("toast")); }
  for(const dir of (NAV==="c"?["left","up","down","right"]:DIRS)){
    const to=a.exits[dir];
    if(!to){ if(NAV==="b"){ const g=document.createElement("span"); g.className=`edge off e-${dir}`; g.setAttribute("aria-hidden","true"); stage.insertBefore(g,$("toast")); } continue; }
    const name=w.areas[to].name;
    const b=document.createElement("button"); b.type="button"; b.className=`edge e-${dir}`;
    b.dataset.go=to; b.setAttribute("aria-label",`Go to the ${name}`);
    const ch=`<svg viewBox="0 0 26 26" aria-hidden="true"><path d="${CHEV[dir]}" fill="none" stroke="#173A5E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    b.innerHTML=`${ch}<span>${name}</span>`;
    if(bar) bar.appendChild(b); else stage.insertBefore(b,$("toast"));
  }
}
function layer(){ const ls=stage.querySelectorAll(".layer"); return ls[ls.length-1]; }
const OPP={left:"right",right:"left",up:"down",down:"up"};
const CAM={s:1,W:400,H:300,x:0,y:0,minX:0,maxX:0,minY:0,maxY:0};
function vp(){ return {w:stage.clientWidth||innerWidth||400, h:stage.clientHeight||innerHeight||300}; }
let lockW=0;
/* The whole scene always fits on screen, centered. No scrolling and no zoom: the arrows move you. */
function fit(){
  const {w,h}=vp(); const s=Math.min(w/400,h/300); CAM.s=s; CAM.W=400*s; CAM.H=300*s;
  CAM.minX=CAM.maxX=(w-CAM.W)/2; CAM.minY=CAM.maxY=(h-CAM.H)/2;
  /* Side arrows sit in the open ground under the picture when the screen has room, so they cover nothing. */
  const sb=CAM.minY+CAM.H, room=h-80-sb; stage.style.setProperty("--ey",room>=70?Math.round(sb+room/2)+"px":"50%");
}
const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
/* The svg fills the stage. Its viewBox shows the whole 400 x 300 scene and simply opens up past the edges,
   so trees and sky that run off the picture keep going instead of stopping at a hard line. */
function paint(el=layer()){ if(!el) return; const svg=el.querySelector("svg"); if(!svg) return;
  const {w,h}=vp(), s=CAM.s||Math.min(w/400,h/300), vw=w/s, vh=h/s;
  svg.setAttribute("viewBox",`${((400-vw)/2).toFixed(2)} ${((300-vh)/2).toFixed(2)} ${vw.toFixed(2)} ${vh.toFixed(2)}`);
  svg.style.width=w+"px"; svg.style.height=h+"px"; svg.style.transform="none"; }
function aim(){ fit(); CAM.x=CAM.minX; CAM.y=CAM.minY; }
addEventListener("resize",()=>{ if(S.screen!=="world") return; aim(); paint(); });
function show(id,dir){
  const old=layer(); S.area=id; S.last[S.world]=id; save(); const a=W[S.world].areas[id];
  const el=document.createElement("div"); el.className="layer";
  if(a.bg) el.style.background=`linear-gradient(${a.bg[0]} 50%,${a.bg[1]} 50%)`;
  stage.insertBefore(el,stage.querySelector(".hud"));
  aim(dir); fillLayer(el,id);
  renderHud(!!dir); renderEdges(true); closeSheet();
  if(dir) blip("door");
  if(old){
    if(dir && !reduce && el.animate){
      const off={left:"translateX(-100%)",right:"translateX(100%)",up:"translateY(-100%)",down:"translateY(100%)"};
      el.animate([{transform:off[dir]},{transform:"none"}],{duration:380,easing:"cubic-bezier(.25,.8,.35,1)"});
      old.style.pointerEvents="none";
      const an=old.animate([{transform:"none"},{transform:off[OPP[dir]]}],{duration:380,easing:"cubic-bezier(.25,.8,.35,1)"}); an.onfinish=()=>old.remove();
    } else old.remove();
  }
}
function go(dir){ const a=W[S.world].areas[S.area]; if(a.exits[dir]){ show(a.exits[dir],dir); return true; } return false; }
function dirTo(to){ const a=W[S.world].areas[S.area]; if(a.doors&&a.doors[to]) return a.doors[to];
  const e=Object.entries(a.exits).find(([,v])=>v===to); if(e) return e[0];
  const p=a.pos, q=W[S.world].areas[to].pos, dx=q[0]-p[0], dy=q[1]-p[1]; return Math.abs(dx)>=Math.abs(dy)?(dx>0?"right":"left"):(dy>0?"down":"up"); }
/* No pinch or double-tap zoom anywhere, in a tab or the home-screen app: iOS ignores user-scalable=no, so stop the gestures themselves. */
["gesturestart","gesturechange","gestureend"].forEach(t=>document.addEventListener(t,e=>e.preventDefault(),{passive:false}));
document.addEventListener("touchmove",e=>{ if((e.touches&&e.touches.length>1)||(e.scale&&e.scale!==1)) e.preventDefault(); },{passive:false});
document.addEventListener("touchstart",e=>{ if(e.touches&&e.touches.length>1) e.preventDefault(); },{passive:false});
document.addEventListener("dblclick",e=>e.preventDefault(),{passive:false});
addEventListener("wheel",e=>{ if(e.ctrlKey) e.preventDefault(); },{passive:false});
/* No dragging: a finger tap only opens things. */
stage.addEventListener("pointerdown",()=>{ if(S.screen==="world") $("intro").classList.add("off"); });
document.addEventListener("keydown",e=>{
  if(S.screen!=="world"||!$("sheet").hidden||!$("done").hidden) return;
  const k={ArrowLeft:"left",ArrowRight:"right",ArrowUp:"up",ArrowDown:"down"}[e.key];
  if(k&&!(e.target.closest&&e.target.closest("input,textarea"))){ e.preventDefault(); go(k); }
});
/* Fill a layer with the scene. Past the picture's edges, a row of pixels just inside each edge is stretched
   out to the screen's edges, so sky, walls, water and ground simply carry on with no seam. */
function fillLayer(el,id){ el.innerHTML=sceneSVG(id);
  const a=W[S.world].areas[id], svg=el.querySelector("svg");
  if(svg){ const k=S.world+"-"+id, inner=svg.innerHTML;
    const strip=(cid,x,y,w,h,tf)=>`<use href="#sc-${k}" clip-path="url(#${cid}-${k})" transform="${tf}"/>`;
    const clips=`<clipPath id="cT-${k}"><rect x="-1" y="3" width="402" height="1"/></clipPath><clipPath id="cB-${k}"><rect x="-1" y="296" width="402" height="1"/></clipPath><clipPath id="cL-${k}"><rect x="3" y="-1" width="1" height="302"/></clipPath><clipPath id="cR-${k}"><rect x="396" y="-1" width="1" height="302"/></clipPath>`;
    const ext=(a.stretchTop===false?"":strip("cT",0,0,0,0,"translate(0 4) scale(1 800) translate(0 -4)"))
      +(a.stretchBottom===false?"":strip("cB",0,0,0,0,"translate(0 296) scale(1 800) translate(0 -296)"))
      +strip("cL",0,0,0,0,"translate(4 0) scale(800 1) translate(-4 0)")
      +strip("cR",0,0,0,0,"translate(396 0) scale(800 1) translate(-396 0)");
    svg.innerHTML=`<defs>${clips}</defs><g id="sc-${k}">${inner}</g><g pointer-events="none" aria-hidden="true">${ext}</g>`; }
  paint(el); }
function rerender(){ const l=layer(); if(l) fillLayer(l,S.area); }
function catchDuck(g){
  const id=g.dataset.duck, d=DUCK[id], w=W[S.world]; if(S.found.has(id)) return;
  const b=g.getBoundingClientRect(); burst(stage,b.left+b.width/2,b.top+b.height/2);
  S.found.add(id); save(); quack(); g.style.pointerEvents="none";
  if(g.animate && !reduce){ const inner=g.querySelector(".bob"); if(inner){ inner.style.animation="none"; inner.animate([{transform:"none",opacity:1},{transform:"translateY(-18px)",opacity:0}],{duration:420,fill:"forwards",easing:"ease-out"}); } }
  const every=wDucks(w).every(x=>S.found.has(x.id));
  let msg=`${d.name} found!`;
  if(w.helper&&!d.helper){ const n=tokensFor(w), need=regDucks(w).length, h=w.helper;
    msg=n<need?`${d.name} found! Side quest: +1 ${h.token} for the ${h.name} (${n} of ${need}).`:`${d.name} found! Side quest: that's all ${need} ${h.plural}. Bring them to the ${h.name}!`; setTimeout(questPulse,60); }
  if(d.tier==="Holiday") msg=`You found the ${d.name}! Happy ${d.holiday}!`;
  else if(every) msg=`Every ${w.name} duck found!`;
  toast(msg,every||d.tier==="Holiday"||w.helper?2800:1900);
  renderHud(false); bumpBadge(); setTimeout(rerender,430); if(d.tier!=="Holiday") checkDone();
}
function tapToken(tk){
  const h=holHere(); const id=tk.dataset.token; if(!h||S.tokens.includes(id)) return;
  const b=tk.getBoundingClientRect(); burst(stage,b.left+b.width/2,b.top+b.height/2);
  S.tokens.push(id); save(); pop();
  const n=tokGot(h), t=tokAll(h);
  toast(n<t?`Acorn ${n} of ${t}!`:`All ${t} acorns! The ${h.name} is hiding somewhere in ${W[S.world].name}. Go find it!`,n<t?1800:3400);
  rerender(); renderHud(false); bumpBadge();
}
const doneShown=new Set();
function checkDone(){ const w=W[S.world]; if(doneShown.has(w.id)||wFound(w)<wTotal(w)) return; doneShown.add(w.id);
  const next=WORLDS[w.n]; if(next&&S.unlocked<next.n){ S.unlocked=next.n; save(); }
  setTimeout(()=>{ if(S.screen!=="world"||S.world!==w.id) return; const el=$("done"); fanfare();
    const last=!next;
    el.innerHTML=`<div><svg viewBox="-44 -54 88 86" aria-hidden="true">${shadow()}<g class="bob">${toyDuck(YEL,"crown")}</g></svg><span class="big">World complete!</span>
      <span>${last?`You found all ${allDucks()} ducks in every world! Mitchell is dreaming up more.`:`Every duck in ${w.name} is in your Duck Log. ${next.name} is open!`}</span>
      <span class="row">${last?`<button class="go" type="button" id="doneHome">Back to worlds</button>`:`<button class="go" type="button" id="doneNext">Go to ${next.name}</button>`}<button class="go ghost" type="button" id="doneStay">Keep exploring</button></span></div>`;
    flush(); el.hidden=false; if(el.animate&&!reduce) el.firstElementChild.animate([{transform:"translateY(24px)",opacity:0},{transform:"none",opacity:1}],{duration:380,easing:"ease-out"});
    if(last) $("doneHome").addEventListener("click",goHome); else $("doneNext").addEventListener("click",()=>enterWorld(next.id));
    $("doneStay").addEventListener("click",()=>{el.hidden=true;}); el.querySelector(".go").focus({preventScroll:true});
  },1400);
}
function giveHelper(a){
  const w=W[S.world], h=w.helper, hd=helperDuck(w); if(!hd||S.found.has(hd.id)) return;
  const got=tokensFor(w), need=regDucks(w).length;
  if(got<need){ toast(`The ${h.name} needs ${need} ${h.plural}. You have ${got}. Find more ducks!`,2600); blip(); return; }
  const b=a.getBoundingClientRect(); burst(stage,b.left+b.width/2,b.top+b.height/2);
  S.found.add(hd.id); save(); quack();
  toast(`You gave the ${h.name} all ${need} ${h.plural}! The ${hd.name} joins your Duck Log.${h.reward?" "+h.reward:""}`,4200);
  renderHud(false); bumpBadge(); setTimeout(rerender,300); checkDone();
}
function doAct(k,a){
  if(k==="helper"){ giveHelper(a); return; }
  const w=W[S.world], F=S.F, m=(w.msg||{})[k];
  if(k==="chest"){ if(!F.key){ toast("Locked tight. A key must be hiding somewhere dark."); blip(); return; } F.chest=1; toast("The key fits. The chest pops open!"); }
  else if(Array.isArray(m)){ F[k]=!F[k]; toast(F[k]?m[0]:m[1]); }
  else if(TOGGLE.has(k)){ F[k]=!F[k]; toast(F[k]?m:"Closed."); }
  else { if(F[k]) return; F[k]=1; if(m) toast(m); }
  pop(); save(); rerender();
}
function onTap(e){
  if(!$("done").hidden) return;
  const eg=e.target.closest(".edge"); if(eg){ show(eg.dataset.go,dirTo(eg.dataset.go)); return; }
  const tk=e.target.closest(".token"); if(tk){ tapToken(tk); return; }
  const d=e.target.closest(".duck"); if(d){ catchDuck(d); return; }
  const dr=e.target.closest(".door"); if(dr){ if(dr.dataset.door) show(dr.dataset.door,dirTo(dr.dataset.door)); return; }
  const a=e.target.closest(".act"); if(a) doAct(a.dataset.act,a);
}
stage.addEventListener("click",onTap);
stage.addEventListener("keydown",e=>{ if((e.key==="Enter"||e.key===" ")&&e.target.closest(".duck,.act,.door,.token")){ e.preventDefault(); onTap(e);} });

/* ---------- Sheets ---------- */
let lastFocus=null;
function openSheet(html,label){ const s=$("sheet"); lastFocus=document.activeElement;
  s.innerHTML=`<div class="grab"></div><header><h3>${label}</h3><button class="x" type="button" id="closeSheet" aria-label="Close"><svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 3 L13 13 M13 3 L3 13" stroke="#173A5E" stroke-width="3" stroke-linecap="round"/></svg></button></header>${html}`;
  s.setAttribute("aria-label",label); s.hidden=false; $("scrim").hidden=false; flush();
  if(s.animate&&!reduce) s.animate([{transform:"translateY(100%)"},{transform:"none"}],{duration:300,easing:"cubic-bezier(.25,.8,.35,1)"});
  $("closeSheet").addEventListener("click",closeSheet); $("closeSheet").focus({preventScroll:true});
}
function closeSheet(){ if($("sheet").hidden) return; $("sheet").hidden=true; $("scrim").hidden=true; if(lastFocus&&lastFocus.focus&&lastFocus.isConnected) lastFocus.focus({preventScroll:true}); }
$("scrim").addEventListener("click",closeSheet);
document.addEventListener("keydown",e=>{ if(e.key==="Escape") closeSheet(); });

function duckCard(d,got){
  return `<div class="card ${got?"":"miss"}"><svg viewBox="-40 -48 82 78" aria-hidden="true">${d.art?(got?d.art():`<g opacity=".35">${d.art()}</g>`):got?toyDuck(d.c,d.acc):`<g opacity=".35">${toyDuck(GHOST)}</g>`}</svg>
    <span class="tier t-${d.tier}">${d.tier}</span>${got?`<b>${d.name}</b>`:`<small>${d.hint}</small>`}</div>`;
}
function holCard(h){ const got=S.found.has(h.id), on=holOn(h), n=tokGot(h), t=tokAll(h);
  const note=got?"":!on?`Comes back in ${h.month}`:n<t?`Find ${t} acorns: ${n} of ${t}`:"All acorns found. Search the Backyard!";
  return `<div class="card hol ${got?"":"miss"}"><svg viewBox="-46 -52 92 82" aria-hidden="true">${got?h.art():`<g opacity=".35">${h.art()}</g>`}</svg><span class="tier t-Holiday">Holiday</span>${got?`<b>${h.name}</b>`:`<small>${note}</small>`}</div>`; }
function openLog(){
  const w=W[S.world];
  let cards=wDucks(w).map(d=>duckCard(d,S.found.has(d.id))).join("");
  HOL.filter(h=>h.world===w.id&&(holOn(h)||S.found.has(h.id))).forEach(h=>cards+=holCard(h));
  openSheet(`<div class="cards">${cards}</div>`, `${w.name} Duck Log: ${wFound(w)} of ${wTotal(w)}`);
}
function openMap(){
  const w=W[S.world]; const {cols,rows}=gridOf(w); const cells=[];
  for(let r=0;r<rows;r++) for(let c=0;c<cols;c++){
    const k=Object.keys(w.areas).find(k=>w.areas[k].pos[0]===c&&w.areas[k].pos[1]===r);
    if(k){ const left=wDucks(w).filter(d=>d.area===k&&!S.found.has(d.id)).length;
      cells.push(`<button type="button" class="mtile ${k===S.area?"here":""}" data-map="${k}">${w.areas[k].name}<small>${k===S.area?"You are here":left?`${left} duck${left>1?"s":""} left`:"All found"}</small></button>`); }
    else cells.push(`<div class="mtile mempty"></div>`);
  }
  openSheet(`<p class="note maphead">You're in <b>World ${w.n}: ${w.name}</b>. These are the places in this world.</p><div class="mapgrid" style="grid-template-columns:repeat(${cols},minmax(0,1fr))">${cells.join("")}</div><div class="menu" style="margin-top:12px"><button type="button" class="mbtn leave" id="mapWorlds">See all worlds</button></div>`,`${w.name} map`);
  $("mapWorlds").addEventListener("click",goHome);
  $("sheet").querySelectorAll("[data-map]").forEach(b=>b.addEventListener("click",()=>{ const k=b.dataset.map; if(k===S.area){closeSheet();return;} show(k,dirTo(k)); }));
}
function hint(){
  closeSheet(); const w=W[S.world], h=holHere();
  const left=wDucks(w).filter(d=>!S.found.has(d.id));
  let area=null;
  if(left.length){
    const here=left.find(d=>d.area===S.area);
    if(here){ useSparkle(here); return; }
    area=left[0].area; toast(`Psst... try the ${w.areas[area].name}.`,2600);
  } else if(holLive(h)){
    const miss=Object.entries(h.tokens).find(([id])=>!S.tokens.includes(id)); area=miss?miss[1]:h.area;
    if(area===S.area){ toast(miss?"An acorn is somewhere right here!":`The ${h.name} is right here somewhere!`,2600); return; }
    toast(miss?`Psst... an acorn is in the ${w.areas[area].name}.`:`The ${h.name} is hiding in the ${w.areas[area].name}.`,2600);
  } else { toast("Every duck here is found!"); return; }
  const dir=dirTo(area); const arr=stage.querySelector(`.e-${dir}`)||stage.querySelector(".edge");
  if(arr){ arr.classList.add("lookhere"); setTimeout(()=>arr.classList.remove("lookhere"),2600); }
}
/* A Duck Sparkle from the shop: tap the light bulb again while it says a duck is here, and that duck sparkles. */
let sparkArm=0;
function useSparkle(d){
  const el=layer()&&layer().querySelector(`[data-duck="${d.id}"]`);
  const bot=starWon(MG_BY.scrap), botReady=bot&&Date.now()-S.crowAt>60000;
  if((!S.spark&&!botReady)||!el){ sparkArm=0; toast(`A duck is right here. ${d.hint}...`+(S.spark&&!el?" It's hiding inside something. Try tapping things!":""),2600); return; }
  if(Date.now()-sparkArm>4000){ sparkArm=Date.now(); toast(`A duck is right here. ${d.hint}... `+(botReady?"Tap the light again and the Crow Bot will find it.":`Tap the light again to use a Duck Sparkle (${S.spark} left).`),3600); return; }
  sparkArm=0; if(botReady) S.crowAt=Date.now(); else S.spark--; save();
  const m=/translate\(([-\d.]+)[ ,]+([-\d.]+)\)/.exec(el.getAttribute("transform")||""); const svg=el.ownerSVGElement;
  if(m&&svg){ const g=document.createElementNS("http://www.w3.org/2000/svg","g"); g.setAttribute("class","sparkle"); g.setAttribute("pointer-events","none"); g.setAttribute("transform",`translate(${m[1]} ${m[2]})`);
    g.innerHTML=`<circle r="30" fill="#fff6a8" opacity=".55"/><circle r="30" fill="none" stroke="#ffcb2f" stroke-width="4"/>${spark(-30,-26,1.1)}${spark(32,-22,.9)}${spark(0,36,.8)}${spark(-34,20,.7)}`;
    svg.appendChild(g); setTimeout(()=>g.remove(),5000); }
  pop(); toast(botReady?"Beep boop! The Crow Bot found a duck.":`Sparkle! ${S.spark} Duck Sparkle${S.spark===1?"":"s"} left.`,2200);
}
$("tabHint").addEventListener("click",hint);
$("countPill").addEventListener("click",openLog); $("questPill").addEventListener("click",()=>openQuests(false));
$("exitBtn").addEventListener("click",goHome);
$("homeBtn").addEventListener("click",goHome);
const IC={
 log:`<svg viewBox="-36 -44 78 70" aria-hidden="true">${toyDuck(YEL)}</svg>`,
 quest:`<svg viewBox="0 0 26 26" aria-hidden="true"><path d="M6 4 H19 Q22 4 22 7 V21 Q22 23 20 23 H7 Q4 23 4 20 V6 Q4 4 6 4 Z" fill="#FFF3C4" stroke="#173A5E" stroke-width="2.2" stroke-linejoin="round"/><path d="M8 10 L10 12 L13 8 M8 17 L10 19 L13 15 M15 11 H19 M15 18 H19" fill="none" stroke="#173A5E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
 map:`<svg viewBox="0 0 26 26" aria-hidden="true"><path d="M3 6 L9 4 L17 7 L23 5 V20 L17 22 L9 19 L3 21 Z" fill="#C9F2D6" stroke="#173A5E" stroke-width="2.2" stroke-linejoin="round"/><path d="M9 4 V19 M17 7 V22" stroke="#173A5E" stroke-width="2"/></svg>`,
 shop:`<svg viewBox="0 0 26 26" aria-hidden="true"><path d="M5 9 H21 L20 22 H6 Z" fill="#3FB86A" stroke="#173A5E" stroke-width="2.4" stroke-linejoin="round"/><path d="M9 11 V8 A4 4 0 0 1 17 8 V11" fill="none" stroke="#173A5E" stroke-width="2.4"/></svg>`,
 games:`<svg viewBox="0 0 26 26" aria-hidden="true"><rect x="3" y="8" width="20" height="12" rx="6" fill="#B48CFF" stroke="#173A5E" stroke-width="2.4"/><path d="M8 12 V16 M6 14 H10" stroke="#173A5E" stroke-width="2.2" stroke-linecap="round"/></svg>`};
function openMenu(){ const w=W[S.world];
  openSheet(`<div class="menu"><button type="button" class="mbtn" id="mLog">${IC.log}Duck Log<span class="count">${wFound(w)}/${wTotal(w)}</span></button>
   <button type="button" class="mbtn" id="mMap">${IC.map}Map</button>
   ${quests(w).length?`<button type="button" class="mbtn" id="mQuest">${IC.quest}Side quests</button>`:""}
   <button type="button" class="mbtn games" id="mGames">${IC.games}Mini games</button>
   <button type="button" class="mbtn" id="mSound">${S.sound?SND_ON:SND_OFF}Sound: ${S.sound?"on":"off"}</button>
   <button type="button" class="mbtn leave" id="mLeave">Leave ${w.name}</button></div>`,"Paused");
  $("mLog").addEventListener("click",openLog); $("mMap").addEventListener("click",openMap); if($("mQuest")) $("mQuest").addEventListener("click",()=>openQuests(false));
  $("mGames").addEventListener("click",openGames); $("mLeave").addEventListener("click",goHome);
  $("mSound").addEventListener("click",()=>{ toggleSound(); openMenu(); });
}
$("tabMenu").addEventListener("click",openMenu);

function openHoliday(){
  openSheet(`<p class="note">Holiday ducks only visit in their month, after a special task.</p><div class="hgrid">${HOL.map(h=>`<div class="hcard${holOn(h)?" now":""}"><svg viewBox="-48 -56 96 84" aria-hidden="true">${h.art()}</svg>
    <span class="mon">${S.found.has(h.id)?"Found!":holOn(h)?"Here this month":h.month}</span><b>${h.name}</b><small>${h.holiday}: ${h.task}${holLive(h)?` You have ${tokGot(h)} of ${tokAll(h)} acorns.`:""}</small></div>`).join("")}
    <div class="hcard more"><b>More on the way</b><small>More holiday ducks are coming soon.</small></div></div>`,"Holiday ducks");
}
/*MINI*/

renderSound(); goHome();
setNav(NAV);
if(PREVIEW){ const pk=document.createElement("div"); pk.id="navPick"; pk.setAttribute("role","group"); pk.setAttribute("aria-label","Arrow style");
  pk.innerHTML=`<b>Arrows</b>${["a","b","c"].map(n=>`<button type="button" data-nav="${n}">${n.toUpperCase()}</button>`).join("")}`;
  document.body.appendChild(pk); pk.addEventListener("click",e=>{ const b=e.target.closest("button"); if(b) setNav(b.dataset.nav); }); setNav(NAV);
  if(S.screen!=="world") enterWorld("yard"); }
window.QUACKERS={WORLDS,HOL,DUCK,S,month:NOW_MONTH,enterWorld,show,goHome,doAct,setNav,R,MINI,SHOP,openMini,startMini,endMini,openShop,openSpecial,buy,openGames,hint};
