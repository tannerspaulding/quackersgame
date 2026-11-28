/* ---------- Motion: loading splash, world unlocked, world complete, new world reveal ----------
   Everything is drawn from the game's own art. A tap skips ahead; reduce-motion phones get the finished look. */
const FX_GRADS={
  gold:null,
  rainbow:["#FFE27A,#FFCB2F,#F0A500","#FFC2DD,#FF6FA6,#E0457F","#B5F2C2,#3FB86A,#2A9A53","#BEE4FF,#4FB3FF,#2387D9","#FFD3A8,#FF9F43,#E07A1C","#E2D8FF,#A98BFF,#7E5BE0"],
  pink:["#FFE0EE,#FF9EC7,#FF6FA6,#D63E78"]
};
const fxEsc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
/* Glossy chunky word: three stacked layers per letter so each can bounce on its own */
function fxWord(text,g,cls=""){ const set=FX_GRADS[g]; let k=0;
  const inner=[...text].map((c,i)=>{ if(c===" ") return `<span class="ch sp" style="--i:${i}">&nbsp;</span>`;
    const st=set?`--g:linear-gradient(180deg,${set[k++%set.length].split(",").map((h,j,a)=>`${h} ${Math.round(j/(a.length-1)*100)}%`).join(",")});`:"";
    const e=fxEsc(c); return `<span class="ch" style="--i:${i};${st}"><i class="o" aria-hidden="true">${e}</i><i class="f">${e}</i><i class="s" aria-hidden="true">${e}</i></span>`; }).join("");
  return `<span class="fxg ${cls}" role="text" aria-label="${fxEsc(text)}">${inner}</span>`; }
const fxWait=ms=>new Promise(r=>setTimeout(r,reduce?0:ms));
function fxTween(ms,fn,ease=t=>t){ return new Promise(res=>{ if(reduce){fn(1);return res();} const t0=performance.now();
  const step=now=>{ const t=Math.min(1,(now-t0)/ms); fn(ease(t)); t<1?requestAnimationFrame(step):res(); }; requestAnimationFrame(step); }); }
const fxDuckArt=d=>d.art?d.art():toyDuck(d.c,d.acc);
const fxLily=()=>`<path d="M0 -14 C26 -14 44 -6 44 2 C44 12 22 16 0 16 C-22 16 -44 12 -44 2 C-44 -6 -26 -14 -8 -14 L0 2 Z" fill="${G("#3fb86a")}" ${O2}/><path d="M-30 0 Q-10 6 14 2 M-6 6 Q2 10 20 8" stroke="#2a9a53" stroke-width="2" fill="none" stroke-linecap="round"/><ellipse cx="-18" cy="-6" rx="10" ry="2.6" fill="#fff" opacity=".35"/><g transform="translate(28 -6)"><circle r="5" fill="${G("#ff9ec7")}" ${O2}/><circle r="2" fill="#ffe066"/></g>`;
const fxLock=()=>`<svg viewBox="-14 -18 28 32" aria-hidden="true"><path d="M-7 -4 V-9 A7 7 0 0 1 7 -9 V-4" fill="none" stroke="${INK}" stroke-width="5"/><path d="M-7 -4 V-9 A7 7 0 0 1 7 -9 V-4" fill="none" stroke="#c9d6e3" stroke-width="2.6"/><rect x="-11" y="-5" width="22" height="17" rx="4" fill="${G("#ffd45c")}" stroke="${INK}" stroke-width="2.4"/><circle cy="2" r="2.6" fill="${INK}"/></svg>`;

/* Confetti: ribbons and paper squares that flutter as they fall */
const FX_COLORS=["#FFCB2F","#FF6FA6","#3FB86A","#8FD0FF","#FF9F43","#A98BFF","#ffffff"];
function fxConfetti(cv,bursts){
  if(reduce||!cv||!cv.isConnected) return;
  const r=cv.getBoundingClientRect(), dpr=Math.min(2,devicePixelRatio||1); cv.width=r.width*dpr; cv.height=r.height*dpr;
  const ctx=cv.getContext("2d"); if(!ctx) return; ctx.setTransform(dpr,0,0,dpr,0,0); const W=r.width,H=r.height, P=[];
  for(const b of bursts) for(let i=0;i<b.n;i++){ const a=b.angle+(Math.random()-.5)*b.spread, v=b.speed*(.55+Math.random()*.6);
    P.push({x:b.x*W,y:b.y*H,vx:Math.cos(a)*v,vy:Math.sin(a)*v,rot:Math.random()*6,vr:(Math.random()-.5)*.4,w:4+Math.random()*5,h:7+Math.random()*7,c:FX_COLORS[(Math.random()*FX_COLORS.length)|0],ph:Math.random()*6,curl:Math.random()<.3,life:0,delay:b.delay||0}); }
  let last=performance.now();
  (function frame(now){ if(!cv.isConnected) return; const dt=Math.min(32,now-last)/16.7; last=now; ctx.clearRect(0,0,W,H); let alive=0;
    for(const p of P){ if(p.delay>0){p.delay-=dt*16.7;alive++;continue;} p.life+=dt; p.vy+=.18*dt; p.vx*=.985; p.vy*=.985; p.x+=p.vx*dt+Math.sin(p.ph+p.life*.12)*.6; p.y+=p.vy*dt; p.rot+=p.vr*dt;
      if(p.y<H+20){ alive++; ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.rot); const sq=Math.abs(Math.cos(p.ph+p.life*.2)); ctx.fillStyle=p.c;
        if(p.curl){ ctx.strokeStyle=p.c; ctx.lineWidth=3; ctx.lineCap="round"; ctx.beginPath(); ctx.arc(0,0,p.h*.6,0,Math.PI*.9); ctx.stroke(); }
        else ctx.fillRect(-p.w/2,-p.h/2*sq,p.w,p.h*sq+.5); ctx.restore(); } }
    if(alive) requestAnimationFrame(frame); else ctx.clearRect(0,0,W,H); })(last);
}
const fxPuff=(cv,x,y)=>fxConfetti(cv,[{x,y,n:46,angle:-Math.PI/2,spread:Math.PI*1.9,speed:6.5}]);
/* The #done layer turns into a full-screen scene; popCard puts it back to a plain card */
let fxTok=0;
function fxScene(html){ const el=$("done"); fxTok++; el.classList.add("fx"); el.innerHTML=html; flush(); el.hidden=false; const t=fxTok; return ()=>fxTok===t&&!el.hidden; }
function fxClose(){ const el=$("done"); fxTok++; el.hidden=true; el.classList.remove("fx"); el.innerHTML=""; }
const fxFocus=id=>{ const b=$(id); if(b) b.focus({preventScroll:true}); };

/* ---------- A. Loading splash: once each time the game opens ---------- */
const FX_TIPS=["Some ducks hide in plain sight.","Find two thirds of a world's ducks to open the next one.","Tap anything that looks a little ducky.","Helpers trade a secret duck for the things you collect."];
async function fxSplash(){
  const el=document.createElement("div"); el.className="fxsplash"; el.setAttribute("role","img"); el.setAttribute("aria-label","Quackers is loading");
  const tip=FX_TIPS[(Math.random()*FX_TIPS.length)|0];
  el.innerHTML=`<section class="fxw"><div class="cloud c1"></div><div class="cloud c2"></div><div class="fxrays"></div><div class="halo"></div>
    <div class="fxlogo"><svg class="q" viewBox="16 20 190 168" aria-hidden="true">${QMARK}</svg>${fxWord("uackers")}<span class="shine"></span></div>
    <div class="load"><div class="fxbar"><div class="fill"></div><span class="n">0%</span></div><div class="walk">${sv("-44 -54 88 86",toyDuck(YEL))}</div></div>
    <span class="ripple" style="left:22%;top:82%"></span><span class="ripple" style="left:72%;top:90%;animation-delay:-1.4s"></span>
    <p class="tip">${tip}</p></section>`;
  flush(); el.style.setProperty("--p",0); document.body.appendChild(el);
  let gone=false; const n=el.querySelector(".n");
  const out=()=>{ if(gone) return; gone=true; el.classList.add("out"); setTimeout(()=>el.remove(),reduce?0:480); };
  el.addEventListener("click",()=>{ el.classList.add("skip"); out(); });
  setTimeout(out,8000); /* never stays up, even if fonts never load */
  const fonts=document.fonts&&document.fonts.ready?document.fonts.ready.catch(()=>{}):Promise.resolve();
  if(reduce){ el.style.setProperty("--p",1); n.textContent="100%"; await Promise.race([fonts,fxWait(900)]); await new Promise(r=>setTimeout(r,700)); return out(); }
  await fxWait(1150); if(gone) return; el.classList.add("walking");
  const legs=[[0,.45,500],[.45,.55,250],[.55,.9,450],[.9,1,300]];
  for(const [a,b,ms] of legs){ if(b===1) await Promise.race([fonts,fxWait(1500)]);
    await fxTween(ms,t=>{ const p=a+(b-a)*t; el.style.setProperty("--p",p); n.textContent=Math.round(p*100)+"%"; },t=>1-Math.pow(1-t,2)); if(gone) return; }
  el.classList.remove("walking"); el.classList.add("hop"); await fxWait(600); out();
}

/* ---------- B. World unlocked: the duck that opens the next world flies into the Up next bar ---------- */
function fxUnlock(w,next,d,f){
  const need=needFor(w), left=wTotal(w)-f;
  const badge=next.helper?sv("-48 -54 96 90",next.helper.art(false)):sv("-44 -54 88 86",toyDuck(YEL));
  const live=fxScene(`<section class="fxw fxnext" aria-live="polite"><div class="fxdim"></div><div class="fxcol">
    <div class="heads"><div class="lbl">${fxWord("Duck found!")}<small>${fxEsc(d.name)}, ${f} of ${wTotal(w)}</small></div><div class="opened">${fxWord("World unlocked!","pink")}</div></div>
    <div class="hero"><div class="ring"></div><div class="found">${sv("-50 -60 100 92",fxDuckArt(d)+spark(-38,-34,1.1,"#fff6c9")+spark(40,-46,.8,"#fff6c9")+spark(-42,18,.7,"#fff6c9"))}</div></div>
    <div class="fxpanel"><h3>Up next: ${fxEsc(next.name)}</h3>
      <div class="track"><div class="fxbar" style="--p:${(need-1)/need}"><div class="fill"></div><span class="n">${need-1} / ${need}</span></div><div class="fxbadge locked">${badge}<span class="lock">${fxLock()}</span></div></div>
      <p style="margin:calc(var(--u)*3) 0 0">${left===1?"The last duck is":`The last ${left} ducks are`} still hiding here.</p>
      <div class="fxbtns"><button class="fxgo" type="button" id="openNext">Go to ${fxEsc(next.name)}</button><button class="fxgo ghost" type="button" id="openStay">Keep looking here</button></div></div>
  </div><canvas></canvas></section>`);
  const st=$("done").querySelector(".fxnext"), bar=st.querySelector(".fxbar"), n=st.querySelector(".n"), found=st.querySelector(".found"), bdg=st.querySelector(".fxbadge"), lock=st.querySelector(".lock");
  $("openNext").addEventListener("click",()=>{ fxClose(); enterWorld(next.id); }); $("openStay").addEventListener("click",fxClose);
  let ended=false;
  const fill=()=>{ bar.style.setProperty("--p",1); n.textContent=`${need} / ${need}`; };
  const finish=(quiet)=>{ if(ended||!live()) return; ended=true; fill(); bdg.classList.remove("locked"); st.classList.remove("shake"); st.classList.add("unlocked");
    if(lock.animate&&!reduce&&!quiet){ const u=bdg.getBoundingClientRect().width; lock.animate([{transform:"none"},{transform:`translate(${u*.5}px,${-u*.8}px) rotate(40deg)`,offset:.35},{transform:`translate(${u*1.1}px,${u*1.6}px) rotate(160deg)`,opacity:0}],{duration:900,easing:"cubic-bezier(.3,.1,.6,1)",fill:"forwards"}); }
    else lock.style.opacity="0";
    const sr=st.getBoundingClientRect(), br=bdg.getBoundingClientRect(); fxPuff(st.querySelector("canvas"),(br.left-sr.left+br.width/2)/sr.width,(br.top-sr.top+br.height/2)/sr.height);
    fxFocus("openNext"); };
  st.addEventListener("click",e=>{ if(!ended&&!e.target.closest("button")){ st.classList.add("skip"); found.getAnimations&&found.getAnimations().forEach(a=>a.finish()); finish(true); } });
  (async()=>{
    await fxWait(1400); if(ended||!live()) return;
    const sr=st.getBoundingClientRect(), fr=found.getBoundingClientRect(), br=bdg.getBoundingClientRect();
    const dx=(br.left+br.width/2)-(fr.left+fr.width/2), dy=(br.top+br.height/2)-(fr.top+fr.height/2);
    if(found.animate&&!reduce){ const a=found.animate([{transform:"translate(0,0) scale(1) rotate(0deg)"},{transform:`translate(${dx*.25}px,${dy*.05-sr.height*.08}px) scale(.85) rotate(-20deg)`,offset:.35},{transform:`translate(${dx}px,${dy}px) scale(.22) rotate(25deg)`,opacity:.9}],{duration:700,easing:"cubic-bezier(.5,0,.75,.6)",fill:"forwards"}); await a.finished.catch(()=>{}); }
    if(ended||!live()) return; found.style.opacity="0"; fill(); n.classList.remove("bump"); void n.offsetWidth; n.classList.add("bump");
    await fxWait(600); if(ended||!live()) return; st.classList.add("shake");
    await fxWait(480); finish();
  })();
}

/* ---------- C. World complete ---------- */
function fxComplete(w,next,wasOpen){
  const last=!next, ducks=wDucks(w), cols=ducks.length>12?7:Math.min(6,ducks.length);
  const msg=last?`You found all ${allDucks()} ducks in every world! Mitchell is dreaming up more.`:`Every duck here is in your Duck Log.${wasOpen?"":` ${next.name} is open!`}`;
  const tw=[[12,30,0],[84,26,-.6],[20,56,-1.1],[78,52,-.3],[60,18,-1.4]].map(([x,y,dl])=>`<span class="tw" style="left:${x}%;top:${y}%;animation-delay:${dl}s"></span>`).join("");
  const live=fxScene(`<section class="fxw fxdone" aria-live="polite"><div class="fxdim"></div>${tw}<div class="fxcol">
    <div class="word">${fxWord("QUACKTASTIC!","rainbow")}</div>
    <div class="hero"><div class="glow"></div><div class="fxrays"></div><div class="shad"></div><div class="pad">${sv("-46 -18 92 36",fxLily())}</div><div class="fxjump">${sv("-46 -58 92 90",toyDuck(YEL,"crown"))}</div></div>
    <div class="fxpanel"><h3>${fxEsc(w.name)} complete!</h3><p>${fxEsc(msg)}</p>
      <div class="fxpips" style="--cols:${cols}">${ducks.map((d,i)=>`<span class="pip" style="--i:${i}">${sv("-46 -58 92 90",fxDuckArt(d))}</span>`).join("")}</div>
      <div class="fxbtns">${last?`<button class="fxgo" type="button" id="doneHome">Back to worlds</button>`:`<button class="fxgo" type="button" id="doneNext">Go to ${fxEsc(next.name)}</button>`}<button class="fxgo ghost" type="button" id="doneStay">Keep exploring</button></div></div>
  </div><canvas></canvas></section>`);
  const st=$("done").querySelector(".fxdone");
  if(last) $("doneHome").addEventListener("click",()=>{ fxClose(); goHome(); }); else $("doneNext").addEventListener("click",()=>{ fxClose(); enterWorld(next.id); });
  $("doneStay").addEventListener("click",fxClose);
  st.addEventListener("click",e=>{ if(!e.target.closest("button")) st.classList.add("skip","idle"); });
  (async()=>{
    await fxWait(1100); if(!live()) return;
    fxConfetti(st.querySelector("canvas"),[{x:-.02,y:.62,n:70,angle:-Math.PI/3,spread:.7,speed:13},{x:1.02,y:.62,n:70,angle:-Math.PI*2/3,spread:.7,speed:13},{x:.5,y:-.05,n:50,angle:Math.PI/2,spread:1.4,speed:3,delay:600}]);
    await fxWait(2200); if(!live()) return; st.classList.add("idle"); fxFocus(last?"doneHome":"doneNext");
  })();
}

/* ---------- D. New world reveal: the first time a world is ever opened ---------- */
const FX_SEEN="quackers-seen-v1";
function fxSeen(){ try{ return new Set(JSON.parse(localStorage.getItem(FX_SEEN)||"[]")); }catch(e){ return new Set(); } }
function fxMarkSeen(id){ const s=fxSeen(); s.add(id); try{ localStorage.setItem(FX_SEEN,JSON.stringify([...s])); }catch(e){} }
/* Show it only for a world nobody has played yet, so worlds you already know don't replay it */
const fxNewWorld=w=>!fxSeen().has(w.id)&&wFound(w)===0;
function fxReveal(w,after){
  fxMarkSeen(w.id);
  const h=w.helper, pal=["#FFE27A","#FF9EC7","#8FD0FF","#B5F2C2","#FFD3A8"];
  const tossArt=h&&ICONS[h.icon]?ICONS[h.icon](1):spark(0,0,1.4,"#ffe066");
  const toss=[[8,24,-40,-30,200,1.9],[78,46,40,-20,-160,2.05],[12,54,-30,20,120,2.2]].map(([x,y,fx,fy,r,dl])=>
    `<div class="toss" style="left:${x}%;top:${y}%;--fx:${fx}cqw;--fy:${fy}cqw;--r:${r}deg;--d:${dl}s">${sv("-14 -14 28 28",tossArt)}</div>`).join("");
  const live=fxScene(`<div class="fxreveal"><section class="fxw" aria-live="polite"><div class="bg"></div>${w.id==="gameland"?`<div class="board"></div>`:""}${toss}<div class="fxcol">
    <div class="ribbon">New world · World ${w.n}</div>
    <div class="tilebox"><div class="fxrays"></div><div class="tile"><div class="face front">${sv("0 0 400 300",thumbOf(w),'preserveAspectRatio="xMidYMid slice"')}</div><div class="face back">?</div></div>
      <div class="helper">${h?sv("-48 -54 96 90",h.art(false)):sv("-44 -54 88 86",toyDuck(YEL))}</div></div>
    <div class="name">${fxWord(w.name)}<small>${h?`Your helper is the ${fxEsc(h.name)}!`:"Ducks are hiding everywhere!"}</small></div>
    <button class="fxgo" type="button" id="revealGo">Let's go!</button>
  </div><canvas></canvas></section></div>`);
  const rv=$("done").querySelector(".fxreveal"), st=rv.querySelector(".fxw");
  let closed=false, idle=false;
  const close=()=>{ if(closed) return; closed=true; rv.classList.add("closing"); setTimeout(()=>{ if(live()) fxClose(); if(S.screen==="world"&&S.world===w.id&&after) after(); },reduce?0:600); };
  const toIdle=()=>{ if(idle||!live()) return; idle=true; rv.classList.add("idle"); fxFocus("revealGo"); };
  $("revealGo").addEventListener("click",e=>{ e.stopPropagation(); close(); });
  rv.addEventListener("click",()=>{ if(idle) close(); else { st.classList.add("skip"); toIdle(); } });
  (async()=>{
    await fxWait(1950); if(!live()||closed) return; if(typeof pop==="function"&&!st.classList.contains("skip")) pop();
    fxPuff(st.querySelector("canvas"),.5,.42);
    await fxWait(1800); toIdle();
  })();
}
