/* ---------- Pond Points, the shop and special ducks ---------- */
/* Pond Points come only from mini games. Each mini game has 5 levels; beating level 5 wins its star character. */
const LV=10;
Object.assign(BACK,{cape:()=>`<path d="M-4 -14 Q-42 -6 -40 26 Q-22 30 -6 22 Z" fill="${G("#e8423a")}" ${O}/>`});
Object.assign(ACC,{mask:()=>`<path d="M4 -24 Q17 -28 30 -24 L30 -18 Q17 -16 4 -18 Z" fill="#1a1a2e" stroke="${INK}" stroke-width="1.4"/><circle cx="17" cy="-21" r="2.6" fill="#fff"/><path d="M4 -21 L-6 -26 M4 -20 L-6 -16" stroke="#1a1a2e" stroke-width="2.4" stroke-linecap="round"/>`,
 flame:()=>`<g transform="translate(12 -32)"><path d="M0 2 Q-12 -6 -4 -22 Q-2 -12 4 -14 Q2 -26 10 -32 Q10 -18 14 -12 Q18 -6 10 2 Z" fill="${G("#ffb627")}" ${O2}/><path d="M2 0 Q-4 -6 1 -14 Q3 -8 7 -8 Q10 -3 6 0 Z" fill="#fff2a8"/></g>${spark(-30,-20,.7,"#ffb627")}`});
const PP=`<svg width="20" height="20" viewBox="-11 -11 22 22" aria-hidden="true"><circle r="9.5" fill="#4FB3FF" stroke="#173A5E" stroke-width="2.2"/><path d="M-5 1 Q0 -6 5 1 Q0 6 -5 1 Z" fill="#fff"/><circle cx="0" cy="-5.6" r="1.6" fill="#fff"/></svg>`;
const ppText=n=>`${n} Pond Point${n===1?"":"s"}`;
const COLORS={yellow:YEL,blue:{body:"#6fc3ff",wing:"#3f9be0",beak:"#ff8a3d"},pink:{body:"#ff9ec7",wing:"#ff6fa6",beak:"#ff8a3d"},green:{body:"#8fe07a",wing:"#5fbf45",beak:"#ff8a3d"}};
const youDuck=()=>toyDuck(COLORS[S.color]||YEL,S.hat||"");
/* Kingsley runs the shop: a duck with a crown, a scepter and a royal red cape. Save up 1,000 Pond Points and he joins you. */
function toyKingsley(){ return `<path d="M-14 -24 Q-40 -6 -36 24 Q-14 30 4 22 Q-2 0 -2 -20 Z" fill="${G("#d8344f")}" ${O}/><path d="M-36 24 Q-14 30 4 22" fill="none" stroke="#fff" stroke-width="4"/>`
  +toyDuck({body:"#ffcb2f",wing:"#f0a500",beak:"#ff8a3d"},"crown")
  +`<g transform="translate(-24 6) rotate(-24)"><rect x="-2" y="-30" width="4" height="40" rx="2" fill="${G("#ffd45c")}" ${O2}/><circle cx="0" cy="-32" r="6" fill="${G("#ff6fa6")}" ${O2}/>${spark(0,-32,.5,"#fff6c9")}</g>`; }
const SHOP=[
 {id:"d_disco",kind:"duck",name:"Disco Duck",cost:100,tier:"Shop",c:{rainbow:true,beak:"#ff8a3d"},acc:"shades"},
 {id:"d_galaxy",kind:"duck",name:"Galaxy Duck",cost:100,tier:"Shop",c:{body:"#3b2a6b",wing:"#5a45a0",beak:"#ffcb2f"},acc:"glow"},
 {id:"d_hero",kind:"duck",name:"Super Duck",cost:100,tier:"Shop",c:{body:"#4f8fff",wing:"#2f6ad8",beak:"#ffcb2f"},acc:"cape mask"},
 {id:"d_lava",kind:"duck",name:"Lava Duck",cost:100,tier:"Shop",c:{body:"#ff7a3d",wing:"#d8344f",beak:"#ffcb2f"},acc:"flame"},
 {id:"d_kingsley",kind:"duck",name:"Kingsley",cost:1000,tier:"Shop",art:()=>toyKingsley(),boss:true},
 {id:"c_blue",kind:"color",name:"Blue duck",cost:40,color:"blue"},
 {id:"c_pink",kind:"color",name:"Pink duck",cost:40,color:"pink"},
 {id:"c_green",kind:"color",name:"Green duck",cost:40,color:"green"},
 {id:"h_bowtie",kind:"hat",name:"Bow tie",cost:20,acc:"bowtie"},
 {id:"h_earmuff",kind:"hat",name:"Earmuffs",cost:25,acc:"earmuff"},
 {id:"h_tophat",kind:"hat",name:"Top hat",cost:30,acc:"tophat"},
 {id:"h_shades",kind:"hat",name:"Sunglasses",cost:30,acc:"shades"},
 {id:"h_chef",kind:"hat",name:"Chef hat",cost:35,acc:"chef"},
 {id:"h_pirate",kind:"hat",name:"Pirate hat",cost:40,acc:"pirate"},
 {id:"h_crown",kind:"hat",name:"Crown",cost:60,acc:"crown"},
 {id:"x_sparkle",kind:"hint",name:"Duck Sparkle",cost:20}];
const SHOPDUCK=Object.fromEntries(SHOP.filter(i=>i.kind==="duck").map(i=>[i.id,i]));
const own=id=>S.own.includes(id);
const mgOf=id=>S.mg[id]||(S.mg[id]={lvl:1,stars:{}});
const starWon=m=>(mgOf(m.id).stars[LV]|0)>0;
function shopArt(i){ return i.kind==="duck"?(i.art?i.art():toyDuck(i.c,i.acc)):i.kind==="color"?toyDuck(COLORS[i.color],S.hat||""):i.kind==="hat"?toyDuck(YEL,i.acc):`<g transform="translate(2 -4)">${toyDuck(YEL)}</g>${spark(-28,-30,1.1)}${spark(34,-38,.8)}${spark(-34,10,.7)}`; }
function openShop(msg){
  const sec=(k,title)=>`<h4 class="shoph">${title}</h4><div class="shopgrid">${SHOP.filter(i=>i.kind===k).map(i=>{
    const got=i.kind!=="hint"&&own(i.id), on=(i.kind==="hat"&&S.hat===i.acc)||(i.kind==="color"&&S.color===i.color), afford=S.pts>=i.cost;
    const lab=i.kind==="hint"?(afford?"Buy":"Need more"):got?(i.kind==="duck"?"Yours!":on?"Take off":"Wear"):afford?"Buy":"Need more";
    return `<div class="sitem${got?" got":""}${on?" on":""}"><svg viewBox="-42 -50 86 80" aria-hidden="true">${shopArt(i)}</svg><b>${i.name}</b>
      ${i.kind==="hint"?`<small>You have ${S.spark}</small>`:""}<button type="button" class="sbuy" data-shop="${i.id}"${(!got&&!afford)||(got&&i.kind==="duck")?" disabled":""}>${got?"":`${PP}${i.cost} `}${lab}</button></div>`;}).join("")}</div>`;
  openSheet(`<div class="shoptop"><svg viewBox="-40 -52 84 82" aria-hidden="true"><g class="bob">${youDuck()}</g></svg><div><span class="ppill">${PP}${S.pts}</span><small>Earn Pond Points in mini games.</small></div>
    <button type="button" class="go small" id="shGames">Play</button></div>${msg?`<p class="shopmsg">${msg}</p>`:""}
    <div class="king"><svg viewBox="-44 -54 88 86" aria-hidden="true"><g class="bob">${toyKingsley()}</g></svg><p><b>Kingsley:</b> ${own("d_kingsley")?"Thank you for choosing me! The shop is still open, of course.":"Welcome to my shop! Exclusive ducks are 100 Pond Points each. Save up 1,000 and I'll join you myself."}</p></div>
    ${sec("duck","Exclusive ducks")}${sec("color","Color your duck")}${sec("hat","Things for your duck")}${sec("hint","Hints")}`,"Kingsley's Pond Points shop");
  $("shGames").addEventListener("click",openGames);
  $("sheet").querySelectorAll("[data-shop]").forEach(b=>b.addEventListener("click",()=>buy(b.dataset.shop)));
}
function buy(id){ const i=SHOP.find(x=>x.id===id); if(!i) return;
  if(i.kind==="hat"&&own(id)){ S.hat=S.hat===i.acc?"":i.acc; save(); pop(); openShop(S.hat?`Your duck is wearing the ${i.name}.`:"Hat off!"); return; }
  if(i.kind==="color"&&own(id)){ S.color=S.color===i.color?"":i.color; save(); pop(); openShop(S.color?`Your duck is ${i.color} now.`:"Back to yellow!"); return; }
  if(i.kind==="duck"&&own(id)) return;
  if(S.pts<i.cost){ blip(); openShop(`You need ${i.cost-S.pts} more Pond Points for that.`); return; }
  S.pts-=i.cost;
  if(i.kind==="hint") S.spark++; else S.own.push(id);
  if(i.kind==="hat") S.hat=i.acc;
  if(i.kind==="color") S.color=i.color;
  save(); fanfare(); refreshHome();
  openShop(i.boss?"Kingsley joins your special ducks! Long live the king!":i.kind==="duck"?`The ${i.name} joins your special ducks!`:i.kind==="hat"?`Your duck is wearing the ${i.name}!`:i.kind==="color"?`Your duck is ${i.color} now!`:`You have ${S.spark} Duck Sparkle${S.spark>1?"s":""}. Use one with the light bulb in a world.`);
}
function openSpecial(){
  const cards=MINI.map(m=>{ const got=starWon(m);
    return `<div class="card${got?"":" miss"}"><svg viewBox="-42 -46 86 76" aria-hidden="true">${got?m.a():`<g opacity=".35">${m.a()}</g>`}</svg><span class="tier t-Legendary">Mini game</span>${got?`<b>${m.star}</b>`:`<small>Beat level ${LV} of ${m.n}</small>`}</div>`; })
   .concat(SHOP.filter(i=>i.kind==="duck").map(i=>{ const got=own(i.id);
    return `<div class="card${got?"":" miss"}"><svg viewBox="-44 -52 88 82" aria-hidden="true">${got?shopArt(i):`<g opacity=".35">${i.art?i.art():toyDuck(GHOST)}</g>`}</svg><span class="tier t-Rare">Shop</span>${got?`<b>${i.name}</b>`:`<small>${i.boss?"1,000 Pond Points":"In the shop"}</small>`}</div>`; })).join("");
  const n=MINI.filter(starWon).length+SHOP.filter(i=>i.kind==="duck"&&own(i.id)).length, t=MINI.length+Object.keys(SHOPDUCK).length;
  openSheet(`<div class="shoptop"><svg viewBox="-40 -52 84 82" aria-hidden="true"><g class="bob">${youDuck()}</g></svg><div><b>Your duck</b><small>Get hats and colors in the Pond Points shop.</small></div></div><div class="cards">${cards}</div>`,`Special ducks: ${n} of ${t}`);
}
function refreshHome(){ if(S.screen==="home") goHome(); }

/* ---------- Mini games ---------- */
const R={g:null,L:1,run:false,left:0,last:0,raf:0,back:"home",score:0};
const field=$("field");
function stopMini(){ R.run=false; cancelAnimationFrame(R.raf); field.querySelectorAll(".mob").forEach(f=>f.remove()); }
const stopEgg=stopMini;
function mob(cls,vb,inner,label,onTap){ const b=document.createElement("button"); b.type="button"; b.className="mob "+cls; b.setAttribute("aria-label",label); b.innerHTML=sv(vb,inner); flush();
  b.addEventListener("pointerdown",e=>{ e.preventDefault(); onTap(); }); b.addEventListener("click",onTap); field.appendChild(b); return b; }
const place2=(b,x,y)=>{ b.style.left=x+"%"; b.style.top=y+"%"; };
function hud(a,b){ $("eEggs").innerHTML=a; const t=Math.max(0,Math.ceil(R.left)); $("eTime").textContent=`0:${String(t).padStart(2,"0")}`; $("eScared").innerHTML=b; flush(); }
const starsFor=(n,T)=>n>=T?3:n>=Math.ceil(T*.7)?2:n>=Math.ceil(T*.4)?1:0;
const starRow=(n,cls="")=>`<span class="lstars ${cls}" aria-label="${n} of 3 stars">${"★".repeat(n)}${"☆".repeat(3-n)}</span>`;

const MINI=[
/* Egg Guard: tap the foxes before they reach the chicken's nest. Stars are the eggs you keep. */
{id:"egg",n:"Egg Guard",star:"The Chicken",d:"Tap the foxes before they reach the nest.",a:()=>toyChicken(),
 how:"Foxes are sneaking up on the chicken's eggs. Tap each fox to scare it away before time runs out.",
 goal:L=>"Keep all 3 eggs safe",
 art(){ return `${sky("#9fdcff","#e6f7ff")}${sun(60,46)}${cloud(250,58,.9)}
  <path d="M-10 150 Q200 120 410 150 V310 H-10 Z" fill="${LG("#b0e586","#5fb244")}" ${O}/>
  <g ${N}>${[0,1,2,3,4,5,6,7,8].map(i=>`<rect x="${6+i*46}" y="128" width="12" height="40" rx="4" fill="${G("#f3dcb4")}" ${O2}/>`).join("")}<rect x="0" y="138" width="400" height="8" rx="4" fill="${G("#f3dcb4")}" ${O2}/></g>
  <g ${N} transform="translate(320 120)"><rect x="-30" y="-30" width="60" height="44" rx="6" fill="${LG("#ff8f7f","#e0503f")}" ${O}/><path d="M-38 -26 L0 -54 L38 -26 Z" fill="${LG("#9a7ae0","#5a3a8a")}" ${O}/><rect x="-10" y="-14" width="20" height="28" rx="8" fill="${G("#7a4523")}" ${O2}/></g>
  <g transform="translate(200 236)" ${N}><ellipse cx="0" cy="16" rx="60" ry="16" fill="${G("#c89260")}" ${O}/><path d="M-54 10 Q0 32 54 10" stroke="${INK}" stroke-width="2" fill="none"/>
  ${[[-22,4],[0,0],[22,4]].slice(0,R.eggs??3).map(([x,y])=>`<g transform="translate(${x} ${y})">${eggIcon(1)}</g>`).join("")}
  <g transform="translate(0 -22) scale(.85)"><g class="bob">${toyChicken()}</g></g></g>`; },
 setup(L){ Object.assign(R,{eggs:3,left:25,spawn:.4,foxes:[]}); },
 hud(){ hud(`<svg width="18" height="22" viewBox="-11 -14 22 28" aria-hidden="true">${eggIcon(1)}</svg>${R.eggs}`,`Scared ${R.score}`); },
 tick(dt){ const L=R.L, el=25-R.left; R.spawn-=dt;
  if(R.spawn<=0){ this.spawn(); R.spawn=Math.max(1-(L-1)*.04,1.9-(L-1)*.07-el*.03); }
  for(const f of R.foxes){ if(f.gone) continue;
    const dx=50-f.x, dy=78-f.y, d=Math.hypot(dx,dy);
    if(d<7){ f.gone=true; f.b.remove(); R.eggs--; blip("door"); drawField(); if(R.eggs<=0){ R.over=true; break; } continue; }
    f.x+=dx/d*f.sp*dt; f.y+=dy/d*f.sp*dt; place2(f.b,f.x,f.y); }
  R.foxes=R.foxes.filter(f=>!f.gone); },
 spawn(){ const fromLeft=Math.random()<.5, f={x:fromLeft?-8:108,y:52+Math.random()*24,dir:fromLeft?1:-1,sp:6.5+(R.L-1)*.95+(25-R.left)*.3};
  f.b=mob("fox","-40 -30 80 54",toyFox(),"Fox, tap to scare it",()=>{ if(!R.run||f.gone) return; f.gone=true; R.score++; pop();
    f.b.querySelector("svg").style.transform=f.dir>0?"scaleX(-1)":""; f.b.classList.add("run"); f.b.style.left=(f.dir>0?-20:120)+"%"; setTimeout(()=>f.b.remove(),500); });
  f.b.querySelector("svg").style.transform=fromLeft?"":"scaleX(-1)"; place2(f.b,f.x,f.y); R.foxes.push(f); },
 stars(){ return Math.max(0,R.eggs); },
 result(s){ return s?`You saved ${s} egg${s>1?"s":""} and scared off ${R.score} fox${R.score===1?"":"es"}.`:"The foxes got the eggs! Try again."; }},

/* Scrap Hunt: tap the falling scrap for Mr. Crow and skip the junk. */
{id:"scrap",n:"Scrap Hunt",star:"Mr. Crow",d:"Catch scrap so Mr. Crow can build his duck-finding robot.",a:()=>toyCrow(),
 how:"Mr. Crow is building a huge robot that finds ducks! Tap the gears, bolts, springs and caps as they fall. Skip the junk: tapping it costs a part.",
 goal:L=>`Catch ${scrapGoal(L)} parts`,
 art(){   return `${sky("#a9c4dc","#e6eef5")}${cloud(70,50,.8)}${cloud(260,36,.7)}
  <path d="M-10 230 Q120 200 250 222 Q330 236 410 214 V310 H-10 Z" fill="${LG("#a6957c","#7c6c56")}" ${O}/>
  <g ${N}><circle cx="40" cy="236" r="18" fill="none" stroke="#2b2b2b" stroke-width="10"/><rect x="110" y="222" width="40" height="24" rx="4" fill="${G("#d8344f")}" ${O2}/></g>
  <g transform="translate(338 250)" ${N}><ellipse cx="0" cy="10" rx="54" ry="14" fill="${G("#8a5a33")}" ${O}/>
   <g transform="translate(-14 4)">${crowBot(Math.min(1,R.score/scrapGoal(R.L)))}</g>
   <g transform="translate(34 -22) scale(.8)"><g class="bob">${toyCrow()}</g></g></g>`; },
 setup(L){ Object.assign(R,{left:30,spawn:.3,items:[]}); },
 hud(){ hud(`<svg width="20" height="20" viewBox="-14 -14 28 28" aria-hidden="true">${gearIcon(1)}</svg>${R.score}`,`Goal ${scrapGoal(R.L)}`); },
 tick(dt){ const L=R.L; R.spawn-=dt;
  if(R.spawn<=0){ this.spawn(); R.spawn=Math.max(.42,.82-(L-1)*.04)*(0.8+Math.random()*.4); }
  for(const it of R.items){ if(it.gone) continue; it.y+=it.sp*dt; it.r+=it.spin*dt; it.b.style.transform=`translate(-50%,-50%) rotate(${it.r}deg)`; place2(it.b,it.x,it.y);
    if(it.y>104){ it.gone=true; it.b.remove(); } }
  R.items=R.items.filter(i=>!i.gone); },
 spawn(){ const junk=Math.random()<.25+(R.L-1)*.025, k=junk?JUNK[Math.floor(Math.random()*JUNK.length)]:SCRAP[Math.floor(Math.random()*SCRAP.length)];
  const it={x:8+Math.random()*68,y:-8,sp:(21+(R.L-1)*1.6)*(0.85+Math.random()*.3),r:0,spin:(Math.random()-.5)*120,junk};
  it.b=mob("fall"+(junk?" junk":""),"-18 -18 36 36",k.art(),junk?`${k.n}, junk`:`${k.n}, scrap`,()=>{ if(!R.run||it.gone) return; it.gone=true;
    if(junk){ R.score=Math.max(0,R.score-1); blip("door"); it.b.classList.add("yuck"); setTimeout(()=>it.b.remove(),450); floatText(it.x,it.y,"Yuck!"); }
    else { R.score++; pop(); it.b.classList.add("got"); place2(it.b,80,76); setTimeout(()=>it.b.remove(),420); drawField(); } });
  place2(it.b,it.x,it.y); R.items.push(it); },
 stars(){ return starsFor(R.score,scrapGoal(R.L)); },
 result(s){ return `You caught ${R.score} part${R.score===1?"":"s"} for Mr. Crow's robot.${s<3?` Catch ${scrapGoal(R.L)} for 3 stars.`:""}`; },
 reward:"Mr. Crow's robot, the Crow Bot, now helps you find ducks. In any world, tap the light bulb twice and it makes a hidden duck sparkle. It needs a minute to recharge."},

/* Sandwich Snatch: grab sandwiches when the picnic bears doze off, not while they're watching. */
{id:"sand",n:"Sandwich Snatch",star:"Mr. Seagull",d:"Swoop in when the picnic bears doze off. Watch out for flying baskets!",a:()=>toyGull(),
 how:"Mr. Seagull wants sandwiches! Tap a sandwich when its bear dozes off. The bears wake up and throw things at him, so wait for them to doze again. If you grab while a bear is watching, it hides the sandwich for a bit.",
 goal:L=>`Snatch ${sandGoal(L)} sandwiches`,
 art(){ return `${sky("#8fd0ff","#dff3ff")}${sun(340,44)}${cloud(90,46,.8)}
  <path d="M-10 92 H410 V130 H-10 Z" fill="${LG("#4fb3ff","#2387d9")}" ${O}/><path d="M0 104 Q20 98 40 104 T80 104 T120 104 T160 104 T200 104 T240 104 T280 104 T320 104 T360 104 T400 104" fill="none" stroke="#fff" stroke-width="3" opacity=".6"/>
  <path d="M-10 124 Q200 114 410 124 V310 H-10 Z" fill="${LG("#ffe6a8","#f3cf7e")}" ${O}/>
  <g ${N} transform="translate(46 150)"><path d="M0 0 V-40" stroke="${INK}" stroke-width="3"/><path d="M-30 -36 Q0 -60 30 -36 Z" fill="${G("#ff6f91")}" ${O}/></g>`; },
 setup(L){ Object.assign(R,{left:30,spots:[0,1,2].map(i=>({i,mode:"watch",t:.6+Math.random()*1.8+i*.4,has:true,re:0,hey:0}))}); field.querySelectorAll(".spot,.gull").forEach(x=>x.remove());
  R.gull=document.createElement("div"); R.gull.className="mob gull"; R.gull.innerHTML=sv("-44 -40 88 70",toyGull()); field.appendChild(R.gull); place2(R.gull,14,24);
  R.spots.forEach(s=>{ s.b=mob("spot","-60 -64 120 100","",`Picnic ${s.i+1}`,()=>snatch(s)); place2(s.b,[20,50,80][s.i],[70,82,70][s.i]); drawSpot(s); }); flush(); },
 hud(){ hud(`<svg width="22" height="18" viewBox="-14 -10 28 20" aria-hidden="true">${sandIcon()}</svg>${R.score}`,`Goal ${sandGoal(R.L)}`); },
 tick(dt){ const L=R.L;
  for(const s of R.spots){ let ch=false; s.t-=dt;
    if(s.hey>0){ s.hey-=dt; if(s.hey<=0) ch=true; }
    if(!s.has){ s.re-=dt; if(s.re<=0){ s.has=true; ch=true; } }
    if(s.t<=0){ ch=true;
      if(s.mode==="watch"){ s.mode="doze"; s.t=Math.max(1.1,2.9-(L-1)*.17)*(0.8+Math.random()*.4); }
      else if(s.mode==="doze"){ s.mode="stir"; s.t=.55; }
      else { s.mode="watch"; s.t=(1.3+Math.random()*2.2)*(1+(L-1)*.035); } }
    if(ch) drawSpot(s); } },
 stars(){ return starsFor(R.score,sandGoal(R.L)); },
 result(s){ return `Mr. Seagull snatched ${R.score} sandwich${R.score===1?"":"es"}.${s<3?` Get ${sandGoal(R.L)} for 3 stars.`:""}`; }}
];
const MG_BY=Object.fromEntries(MINI.map(m=>[m.id,m]));
const scrapGoal=L=>14+Math.round(L*1.2);
const sandGoal=L=>12+Math.round(L*.9);

const SCRAP=[{n:"Gear",art:()=>gearIcon(1.05)},
 {n:"Bolt",art:()=>`<g transform="rotate(30)"><rect x="-3.5" y="-4" width="7" height="18" rx="2" fill="${G("#b7c3d4")}" ${O2}/><path d="M-3.5 1 H3.5 M-3.5 6 H3.5 M-3.5 11 H3.5" stroke="${INK}" stroke-opacity=".4" stroke-width="1.4"/><path d="M-9 -12 L-4.5 -16 H4.5 L9 -12 L4.5 -6 H-4.5 Z" fill="${G("#9aa8ba")}" ${O2}/></g>`},
 {n:"Spring",art:()=>`<path d="M-9 -12 Q9 -10 -9 -6 Q9 -4 -9 0 Q9 2 -9 6 Q9 8 -9 12" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><path d="M-9 -12 Q9 -10 -9 -6 Q9 -4 -9 0 Q9 2 -9 6 Q9 8 -9 12" fill="none" stroke="#c9d3df" stroke-width="3" stroke-linecap="round"/>`},
 {n:"Bottle cap",art:()=>`<circle r="12" fill="${G("#ff5c5c")}" ${O2}/>${Array.from({length:12},(_,i)=>{const a=i*Math.PI/6;return `<circle cx="${(Math.cos(a)*12).toFixed(1)}" cy="${(Math.sin(a)*12).toFixed(1)}" r="2.2" fill="#ff5c5c" stroke="${INK}" stroke-opacity=".3" stroke-width="1"/>`;}).join("")}<circle r="6" fill="#fff" opacity=".5"/>`}];
const JUNK=[{n:"Banana peel",art:()=>`<path d="M0 -4 Q-14 -2 -14 12 Q-6 4 0 4 Q6 4 14 12 Q14 -2 0 -4 Z" fill="${G("#ffe066")}" ${O2}/><path d="M-4 -4 Q0 -14 4 -4 Z" fill="${G("#ffe066")}" ${O2}/><path d="M-1 -12 Q0 -16 2 -15" stroke="#5e3418" stroke-width="2.4" stroke-linecap="round"/>`},
 {n:"Old sock",art:()=>`<path d="M-6 -14 H6 V2 Q6 6 10 8 Q16 12 12 15 Q8 17 -2 12 Q-6 10 -6 4 Z" fill="${G("#c8b89a")}" ${O2}/><path d="M-6 -10 H6 M-6 -6 H6" stroke="#8fae54" stroke-width="2.4"/><circle cx="2" cy="8" r="2" fill="#8a7a5c"/>`},
 {n:"Fish bone",art:()=>`<circle cx="-10" cy="0" r="5" fill="${G("#f4f4f4")}" ${O2}/><path d="M-5 0 H12 M0 -6 V6 M5 -5 V5 M10 -4 V4" stroke="#e8e8e8" stroke-width="3" stroke-linecap="round"/><path d="M-5 0 H12 M0 -6 V6 M5 -5 V5 M10 -4 V4" stroke="${INK}" stroke-opacity=".35" stroke-width="1" stroke-linecap="round"/><path d="M12 0 L17 -5 V5 Z" fill="#f4f4f4" ${O2}/>`}];
/* Mr. Crow's robot, built up as you catch parts (0 to 1). */
function crowBot(f){ const parts=[
  `<rect x="-22" y="-8" width="16" height="22" rx="4" fill="${G("#9aa8ba")}" ${O2}/><rect x="6" y="-8" width="16" height="22" rx="4" fill="${G("#9aa8ba")}" ${O2}/>`,
  `<rect x="-28" y="-58" width="56" height="52" rx="10" fill="${G("#c9d3df")}" ${O}/><circle cx="0" cy="-32" r="10" fill="${G("#ffcb2f")}" ${O2}/><g transform="translate(0 -32)">${gearIcon(.55)}</g>`,
  `<rect x="-44" y="-52" width="14" height="36" rx="6" fill="${G("#9aa8ba")}" ${O2}/><rect x="30" y="-52" width="14" height="36" rx="6" fill="${G("#9aa8ba")}" ${O2}/>`,
  `<rect x="-20" y="-92" width="40" height="32" rx="8" fill="${G("#c9d3df")}" ${O}/><circle cx="-8" cy="-77" r="5.5" fill="#4fe0ff" stroke="${INK}" stroke-width="1.6"/><circle cx="8" cy="-77" r="5.5" fill="#4fe0ff" stroke="${INK}" stroke-width="1.6"/><path d="M-8 -66 H8" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/>`,
  `<path d="M0 -92 V-106" stroke="${INK}" stroke-width="2.6"/><circle cx="0" cy="-109" r="5" fill="${G("#ff5c5c")}" ${O2}/><path d="M-12 -100 Q0 -96 12 -100" fill="none" stroke="#ffe066" stroke-width="2" opacity=".9"/>`];
  const n=Math.floor(f*parts.length+1e-9);
  return `<g transform="scale(.62)">${parts.slice(0,n).join("")}${n<parts.length?`<g opacity=".25">${parts[n]}</g>`:spark(-30,-98,.9)+spark(34,-84,.7)}</g>`; }
function floatText(x,y,t){ const d=document.createElement("div"); d.className="mob ftext"; d.textContent=t; place2(d,x,y); field.appendChild(d); setTimeout(()=>d.remove(),700); }

function sandIcon(s=1){ return `<g transform="scale(${s})"><path d="M-13 2 L0 -9 L13 2 Z" fill="${G("#f3dcb4")}" ${O2}/><path d="M-13 2 H13" stroke="#7fd04e" stroke-width="3"/><path d="M-12 4.5 H12" stroke="#ff6f61" stroke-width="2.4"/><path d="M-13 7 H13 L0 7 Z" fill="${G("#f3dcb4")}" ${O2}/><rect x="-13" y="6" width="26" height="3" rx="1.5" fill="${G("#f3dcb4")}" ${O2}/></g>`; }
function bear(mode,hat){
  const eyes=mode==="watch"?`<ellipse cx="-7" cy="-26" rx="2.6" ry="3.2" fill="#1a1a1a"/><ellipse cx="7" cy="-26" rx="2.6" ry="3.2" fill="#1a1a1a"/><circle cx="-6.2" cy="-27.2" r="1" fill="#fff"/><circle cx="7.8" cy="-27.2" r="1" fill="#fff"/>`
   :mode==="stir"?`<path d="M-10 -26 H-4 M4 -26 H10" stroke="#1a1a1a" stroke-width="2.6" stroke-linecap="round"/><path d="M-10 -28 Q-7 -24 -4 -28 M4 -28 Q7 -24 10 -28" fill="none" stroke="#1a1a1a" stroke-width="1.6"/>`
   :`<path d="M-10 -26 Q-7 -23 -4 -26 M4 -26 Q7 -23 10 -26" fill="none" stroke="#1a1a1a" stroke-width="2.4" stroke-linecap="round"/>`;
  const zz=mode==="doze"?`<text x="18" y="-46" font-family="Grandstander,sans-serif" font-weight="900" font-size="13" fill="${INK}">z</text><text x="26" y="-56" font-family="Grandstander,sans-serif" font-weight="900" font-size="10" fill="${INK}">z</text>`:"";
  return `<g transform="translate(-26 -8)"><ellipse cx="0" cy="8" rx="20" ry="15" fill="${G("#a8743f")}" ${O}/><ellipse cx="0" cy="12" rx="11" ry="8" fill="#e0b98a"/>
   <circle cx="-13" cy="-38" r="6" fill="${G("#a8743f")}" ${O2}/><circle cx="13" cy="-38" r="6" fill="${G("#a8743f")}" ${O2}/>
   <circle cx="0" cy="-24" r="16" fill="${G("#a8743f")}" ${O}/><ellipse cx="0" cy="-18" rx="7" ry="5" fill="#e0b98a"/><ellipse cx="0" cy="-20" rx="2.6" ry="1.8" fill="#1a1a1a"/>
   ${eyes}<g transform="translate(0 -38)"><ellipse cx="0" cy="0" rx="20" ry="4.5" fill="${G(hat)}" ${O2}/><path d="M-10 0 Q-10 -12 0 -12 Q10 -12 10 0 Z" fill="${G(hat)}" ${O2}/></g>${zz}</g>`; }
function drawSpot(s){ const hat=["#ff6f91","#4fb3ff","#7fd04e"][s.i];
  s.b.classList.toggle("doze",s.mode!=="watch");
  s.b.querySelector("svg").innerHTML=`<ellipse cx="4" cy="14" rx="54" ry="15" fill="${G(["#ff9ec7","#9fd8ff","#b8ec8e"][s.i])}" ${O}/><path d="M-40 6 L48 22 M-30 24 L30 4" stroke="#fff" stroke-width="3" opacity=".6"/>
   ${bear(s.mode,hat)}${s.has&&s.hey<=0?`<g transform="translate(20 8) scale(1.3)">${sandIcon()}</g>`:`<g transform="translate(20 6)"><rect x="-12" y="-8" width="24" height="16" rx="4" fill="${G("#c89260")}" ${O2}/><path d="M-12 -2 H12" stroke="${INK}" stroke-opacity=".4" stroke-width="1.6"/></g>`}
   ${s.hey>0?`<g transform="translate(-8 -58)"><rect x="-18" y="-12" width="36" height="20" rx="10" fill="#fff" stroke="${INK}" stroke-width="2"/><text x="0" y="3" text-anchor="middle" font-family="Grandstander,sans-serif" font-weight="900" font-size="12" fill="${INK}">Hey!</text></g>`:""}`;
  flush(); }
/* The picnic bear jumps up and throws a basket or some trash after Mr. Seagull. It always misses. */
function throwAt(s,miss){ const things=[`<g transform="scale(1.2)"><path d="M-12 -2 H12 L9 10 H-9 Z" fill="${G("#c89260")}" ${O2}/><path d="M-12 -2 Q0 -14 12 -2" fill="none" stroke="#8a5a33" stroke-width="2.4"/><path d="M-11 2 H11" stroke="#d8344f" stroke-width="2"/></g>`,
  `<g transform="rotate(20)"><path d="M-6 -12 H6 L8 12 H-8 Z" fill="${G("#7fd04e")}" ${O2}/><rect x="-4" y="-16" width="8" height="5" rx="1" fill="#e8e8e8" stroke="${INK}" stroke-width="1"/></g>`,
  JUNK[0].art(),`<path d="M-9 -6 Q0 -12 9 -6 L7 8 Q0 11 -7 8 Z" fill="${G("#e0e6ee")}" ${O2}/>`];
  const x0=[20,50,80][s.i], y0=[64,76,64][s.i], o=mob("throw","-18 -18 36 36",things[Math.floor(Math.random()*things.length)],"",()=>{}); o.tabIndex=-1; o.setAttribute("aria-hidden","true");
  place2(o,x0,y0); void o.offsetWidth; o.classList.add("fly"); setTimeout(()=>place2(o,miss?x0+(Math.random()<.5?-14:14):14+Math.random()*10,miss?y0-30:18),20); setTimeout(()=>o.remove(),700);
  if(miss) floatText(x0,y0-22,"Bonk!"); }
function snatch(s){ if(!R.run) return;
  if(!s.has||s.hey>0){ blip(); return; }
  if(s.mode==="watch"){ s.hey=1.6; s.has=true; s.t=Math.max(s.t,1.6); blip("door"); drawSpot(s); throwAt(s,true); return; }
  s.has=false; s.re=.7; R.score++; pop(); s.mode="watch"; s.t=(1.5+Math.random()*1.2)*(1+(R.L-1)*.04); s.hey=.9; drawSpot(s); throwAt(s);
  const g=R.gull; g.classList.add("swoop"); place2(g,[20,50,80][s.i],[64,76,64][s.i]); clearTimeout(g._t); g._t=setTimeout(()=>{ g.classList.remove("swoop"); place2(g,14,24); },260); }

/* The shared mini game screen. */
function drawField(){ $("fieldArt").innerHTML=R.g.art(); flush(); }
function openGames(){
  openSheet(`<p class="note">${PP} You have ${ppText(S.pts)}. Earn more with stars, and beat level ${LV} to win the star character.</p><div class="mgrid">${MINI.map(m=>{ const st=mgOf(m.id), won=starWon(m);
    return `<div class="mg"><svg viewBox="-44 -40 88 70" aria-hidden="true"><g class="bob">${m.a()}</g></svg><div><b>${m.n}</b><small>${m.d}</small>
      <small class="lv">${won?`${m.star} is yours!`:`Level ${Math.min(st.lvl,LV)} of ${LV}. Win ${m.star} at level ${LV}.`}</small></div>
    <button type="button" class="play" data-mini="${m.id}">Play</button></div>`;}).join("")}</div>`,"Mini games");
  $("sheet").querySelectorAll("[data-mini]").forEach(b=>b.addEventListener("click",()=>openMini(b.dataset.mini)));
}
function openEgg(){ openMini("egg"); }
function openMini(id){ const g=MG_BY[id]; if(!g) return;
  if(S.screen!=="egg") R.back=S.screen==="world"?"world":"home";
  setScreen("egg"); $("title").textContent=g.n; R.g=g; R.score=0; R.over=false; R.L=Math.min(mgOf(id).lvl,LV); g.setup(R.L); drawField(); g.hud();
  $("eExit").setAttribute("aria-label",`Leave ${g.n}`); levelPick(); }
function levelPick(){ const g=R.g, st=mgOf(g.id), c=$("eCover");
  c.innerHTML=`<div><div class="big">${g.n}</div><p>${g.how}</p>
   <div class="lvls">${Array.from({length:LV},(_,i)=>{ const L=i+1, open=L<=st.lvl, s=st.stars[L]|0;
     return `<button type="button" class="lvl${open?"":" lock"}${L===LV?" fin":""}" data-lvl="${L}"${open?"":" disabled"} aria-label="Level ${L}${open?`, ${s} stars`:", locked"}"><b>${L}</b>${open?starRow(s):lockSvg}</button>`;}).join("")}</div>
   <small class="prize">${starWon(g)?`You won ${g.star}!`:`Beat level ${LV} to win ${g.star}.`}</small>
   <span class="row"><button class="go" id="ePlay" type="button">Play level ${Math.min(st.lvl,LV)}</button><button class="go ghost" id="eLeave" type="button">Back</button></span></div>`;
  c.hidden=false;
  $("ePlay").addEventListener("click",()=>startMini(Math.min(st.lvl,LV)));
  $("eLeave").addEventListener("click",leaveEgg);
  c.querySelectorAll("[data-lvl]").forEach(b=>b.addEventListener("click",()=>startMini(+b.dataset.lvl))); }
function startMini(L){ const g=R.g; stopMini();
  Object.assign(R,{L,score:0,over:false,run:true,last:performance.now()}); g.setup(L); drawField(); g.hud();
  $("eCover").innerHTML=`<div><div class="big">Level ${L}</div><p>${g.goal(L)}</p></div>`; $("eCover").classList.add("brief");
  blip(); setTimeout(()=>{ if(R.run&&R.g===g&&R.L===L){ $("eCover").hidden=true; $("eCover").classList.remove("brief"); R.last=performance.now(); R.raf=requestAnimationFrame(mLoop); } },900); }
function mLoop(now){ if(!R.run) return;
  const dt=Math.min(.05,(now-R.last)/1000); R.last=now; R.left-=dt; R.g.tick(dt); R.g.hud();
  if(R.over||R.left<=0){ endMini(); return; }
  R.raf=requestAnimationFrame(mLoop); }
function leaveEgg(){ if(R.back==="world"&&S.world) enterWorld(S.world); else goHome(); }
$("eExit").addEventListener("click",leaveEgg);
/* Points: each star is worth more on higher levels, with a bonus the first time you beat a level and a big one for the last level. */
function endMini(){ const g=R.g, L=R.L, st=mgOf(g.id); stopMini();
  const s=g.stars(), old=st.stars[L]|0, first=s>0&&old===0, wonNow=first&&L===LV;
  let pts=s*(4+L)+(first?10:0)+(wonNow?25:0);
  if(s>old) st.stars[L]=s;
  if(s>0&&L>=st.lvl&&L<LV) st.lvl=L+1;
  S.pts+=pts; save(); if(s) fanfare(); else blip("door");
  const c=$("eCover"), next=s>0&&L<LV;
  c.innerHTML=`<div><div class="big">${wonNow?`You won ${g.star}!`:s?`Level ${L} done!`:"So close!"}</div>
   ${wonNow?`<svg class="prizeart" viewBox="-44 -46 88 76" aria-hidden="true"><g class="bob">${g.a()}</g></svg>`:""}
   <div class="stars">${starRow(s)}</div>
   <p>${g.result(s)}${wonNow?` ${g.star} joins your special ducks.${g.reward?" "+g.reward:""}`:""}</p>
   ${pts?`<span class="ppill big">${PP}+${pts}</span>`:""}
   <span class="row">${next?`<button class="go" id="eNext" type="button">Level ${L+1}</button>`:""}<button class="go${next?" ghost":""}" id="eAgain" type="button">Play again</button><button class="go ghost" id="eBack" type="button">Done</button></span>
   <button type="button" class="linkbtn" id="eLevels">All levels</button></div>`;
  c.hidden=false;
  if(next) $("eNext").addEventListener("click",()=>startMini(L+1));
  $("eAgain").addEventListener("click",()=>startMini(L));
  $("eBack").addEventListener("click",leaveEgg);
  $("eLevels").addEventListener("click",levelPick); }
