const INK="#173A5E";
/* Scenery keeps a thin, light edge. Ducks and characters get none (see soften below), so hidden ducks blend in. */
const O=`stroke="${INK}" stroke-opacity=".3" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"`;
const O2=`stroke="${INK}" stroke-opacity=".26" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round"`;
const N='pointer-events="none"';

/* Shading: every shape gets a soft radial or vertical gradient, registered once in #defs */
const GR=new Map(); let dirty=false;
function mix(hex,t,to){const a=parseInt(hex.slice(1),16),b=parseInt(to.slice(1),16);
  const ch=(s)=>Math.round(((a>>s)&255)+((((b>>s)&255)-((a>>s)&255))*t));
  return "#"+[16,8,0].map(s=>ch(s).toString(16).padStart(2,"0")).join("");}
function G(hex){hex=hex.toLowerCase();const id="r"+hex.slice(1);
  if(!GR.has(id)){GR.set(id,`<radialGradient id="${id}" cx="34%" cy="28%" r="80%"><stop offset="0" stop-color="${mix(hex,.5,"#ffffff")}"/><stop offset=".55" stop-color="${hex}"/><stop offset="1" stop-color="${mix(hex,.34,"#173a5e")}"/></radialGradient>`);dirty=true;}
  return `url(#${id})`;}
function LG(top,bot){top=top.toLowerCase();bot=bot.toLowerCase();const id="l"+top.slice(1)+bot.slice(1);
  if(!GR.has(id)){GR.set(id,`<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset="1" stop-color="${bot}"/></linearGradient>`);dirty=true;}
  return `url(#${id})`;}
function RB(){ if(!GR.has("rainbow")){GR.set("rainbow",`<linearGradient id="rainbow" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff6f91"/><stop offset=".25" stop-color="#ffcb2f"/><stop offset=".5" stop-color="#7fd04e"/><stop offset=".75" stop-color="#4fb3ff"/><stop offset="1" stop-color="#b48cff"/></linearGradient>`);dirty=true;} return "url(#rainbow)"; }
function flush(){if(dirty){document.getElementById("defs").innerHTML="<defs>"+[...GR.values()].join("")+"</defs>";dirty=false;}}
const sv=(vb,inner,extra="")=>`<svg viewBox="${vb}" aria-hidden="true" ${extra}>${inner}</svg>`;

/* ---------- Toy ducks and what they wear ---------- */
const YEL={body:"#ffcb2f",wing:"#f0a500",beak:"#ff8a3d"};
const spark=(x,y,s=1,c="#ffe066")=>`<path transform="translate(${x} ${y}) scale(${s})" d="M0 -8 L2 -2 L8 0 L2 2 L0 8 L-2 2 L-8 0 L-2 -2 Z" fill="${c}" stroke="${INK}" stroke-width="1.4" stroke-linejoin="round"/>`;
const ACC={
  mail:()=>`<g transform="translate(30 -10) rotate(-8)"><rect x="0" y="-6" width="17" height="12" rx="2" fill="#ffffff" ${O2}/><path d="M0 -6 L8.5 1 L17 -6" fill="none" ${O2}/><circle cx="13" cy="2" r="2" fill="#ff6fa6"/></g>`,
  leaf:()=>`<g transform="translate(9 -33) rotate(-20)"><path d="M0 0 Q-4 -16 8 -22 Q16 -8 0 0 Z" fill="${G("#7fd04e")}" ${O2}/><path d="M1 -2 Q4 -11 7 -18" stroke="${INK}" stroke-width="1.6" fill="none"/></g>`,
  rock:()=>`<circle cx="-14" cy="10" r="2.4" fill="#7d786e"/><circle cx="2" cy="16" r="2" fill="#7d786e"/><circle cx="-6" cy="-4" r="1.6" fill="#7d786e"/><circle cx="6" cy="-22" r="1.6" fill="#7d786e"/>`,
  bubble:()=>`<g fill="#ffffff" fill-opacity=".55" stroke="#2387d9" stroke-width="2"><circle cx="-26" cy="-22" r="6"/><circle cx="-14" cy="-36" r="4"/><circle cx="34" cy="-32" r="5"/></g><g fill="#fff"><circle cx="-28" cy="-24" r="1.6"/><circle cx="32" cy="-34" r="1.4"/></g><path d="M-2 -30 Q12 -42 26 -28 Q12 -32 -2 -30 Z" fill="${G("#ff9ec7")}" ${O2}/>`,
  scarf:()=>`<path d="M0 -6 Q12 -1 26 -6 L26 0 Q12 6 0 0 Z" fill="${G("#ff5c5c")}" ${O2}/><path d="M4 -2 L0 12 L6 13 L9 0 Z" fill="${G("#ff5c5c")}" ${O2}/><circle cx="-4" cy="4" r="2.2" fill="#2b2b2b"/><circle cx="-6" cy="13" r="2.2" fill="#2b2b2b"/><path d="M-22 2 L-36 -8 M-31 -4 L-35 -12" stroke="#7a4523" stroke-width="3" stroke-linecap="round"/><g transform="translate(13 -33)"><rect x="-9" y="-12" width="18" height="12" rx="2" fill="${G("#2b2b45")}" ${O2}/><rect x="-14" y="-2" width="28" height="5" rx="2.5" fill="${G("#2b2b45")}" ${O2}/></g>`,
  icecube:()=>`<g transform="translate(13 -36) rotate(8)"><rect x="-9" y="-9" width="18" height="18" rx="4" fill="${G("#cdefff")}" fill-opacity=".9" ${O2}/><path d="M-5 -5 h5" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/></g>${spark(-26,-18,.7,"#e6f7ff")}`,
  earmuff:()=>`<path d="M2 -30 Q12 -40 24 -30" fill="none" stroke="${INK}" stroke-width="3"/><circle cx="3" cy="-22" r="6" fill="${G("#4fb3ff")}" ${O2}/>`,
  tutu:()=>`<path d="M-26 10 Q-30 18 -22 20 Q-18 26 -10 22 Q-4 28 4 22 Q12 27 16 20 Q24 20 22 10 Q0 18 -26 10 Z" fill="${G("#ffa7cf")}" ${O2}/><g transform="translate(6 -32)"><path d="M0 0 L-9 -6 L-9 6 Z M0 0 L9 -6 L9 6 Z" fill="${G("#ff5c8a")}" ${O2}/><circle r="3" fill="${G("#ff5c8a")}" ${O2}/></g>`,
  tophat:(c="#2b2b45",band="#8e44ad")=>`<g transform="translate(12 -30) rotate(-8)"><rect x="-11" y="-20" width="22" height="20" rx="3" fill="${G(c)}" ${O2}/><rect x="-11" y="-8" width="22" height="5" fill="${band}" stroke="${INK}" stroke-width="1.6"/><rect x="-17" y="-2" width="34" height="6" rx="3" fill="${G(c)}" ${O2}/></g>`,
  magic:()=>ACC.tophat()+`<path d="M-10 8 L-36 -6" stroke="${INK}" stroke-width="6" stroke-linecap="round"/><path d="M-10 8 L-36 -6" stroke="#2b2b45" stroke-width="3" stroke-linecap="round"/><path d="M-32 -4 L-36 -6" stroke="#fff" stroke-width="3.5" stroke-linecap="round"/>${spark(-40,-14,.8)}${spark(-26,-26,.55)}`,
  spot:()=>`${spark(-28,-26,1)}${spark(34,-36,.7)}${spark(-36,6,.6)}<g transform="translate(13 -33)"><path d="M-10 0 L0 -14 L10 0 Z" fill="${G("#ffe066")}" ${O2}/><circle cy="-14" r="3" fill="#ff6fa6" stroke="${INK}" stroke-width="1.6"/></g>`,
  checker:()=>`<g transform="translate(12 -28) rotate(-6)"><path d="M-14 0 Q-14 -16 0 -16 Q14 -16 14 0 Z" fill="${G("#ffcb2f")}" ${O2}/><path d="M-14 -4 H14 V0 H-14 Z" fill="#fff" stroke="${INK}" stroke-width="1.6"/>${[-12,-6,0,6].map(x=>`<rect x="${x}" y="-4" width="3" height="4" fill="#2b2b2b"/>`).join("")}<path d="M10 0 H24 Q24 4 10 4 Z" fill="${G("#2b2b2b")}" ${O2}/></g>`,
  barista:()=>`<g transform="translate(12 -29)"><path d="M-13 0 Q-12 -12 0 -12 Q12 -12 13 0 Z" fill="${G("#3fb86a")}" ${O2}/><path d="M-14 0 H22" stroke="${INK}" stroke-width="3" stroke-linecap="round"/></g><g transform="translate(-30 -2)"><path d="M-7 -10 H7 L5 8 H-5 Z" fill="${G("#ffffff")}" ${O2}/><path d="M-7 -4 H7" stroke="#8a5a33" stroke-width="3"/><path d="M-2 -14 Q0 -18 2 -14 Q4 -20 0 -22" stroke="#9db7d2" stroke-width="1.6" fill="none"/></g>`,
  washer:()=>`<g transform="translate(12 -29)"><path d="M-13 0 Q-12 -12 0 -12 Q12 -12 13 0 Z" fill="${G("#4fb3ff")}" ${O2}/><path d="M8 0 H22" stroke="${INK}" stroke-width="3" stroke-linecap="round"/></g><g transform="translate(-30 -6) rotate(-20)"><rect x="-2" y="-4" width="4" height="22" rx="2" fill="${G("#ffcb2f")}" ${O2}/><rect x="-12" y="-10" width="24" height="7" rx="3" fill="${G("#5b6b80")}" ${O2}/></g>`,
  witch:()=>`<g transform="translate(12 -31) rotate(-10)"><path d="M-8 0 Q-4 -16 2 -28 Q6 -30 8 -26 Q4 -14 8 0 Z" fill="${G("#4a2a6a")}" ${O2}/><ellipse cx="0" cy="0" rx="20" ry="5" fill="${G("#4a2a6a")}" ${O2}/><rect x="-8" y="-7" width="16" height="5" fill="#ff9f43" stroke="${INK}" stroke-width="1.6"/></g>`,
  santa:()=>`<g transform="translate(12 -30) rotate(-6)"><path d="M-14 0 Q-10 -20 6 -22 Q20 -20 22 -6 L16 -8 Q10 -14 6 -6 Z" fill="${G("#e8423a")}" ${O2}/><circle cx="22" cy="-6" r="5" fill="${G("#ffffff")}" ${O2}/><rect x="-16" y="-4" width="30" height="8" rx="4" fill="${G("#ffffff")}" ${O2}/></g><path d="M24 -10 Q34 6 22 10 Q16 4 24 -10 Z" fill="${G("#ffffff")}" ${O2}/>`,
  cupid:()=>`<path d="M-14 -6 Q-30 -26 -40 -10 Q-30 -12 -26 -2 Q-36 0 -30 8 Q-22 2 -14 4 Z" fill="${G("#ffffff")}" ${O2}/><g transform="translate(13 -36)"><path d="M0 4 L-8 -4 A4.5 4.5 0 0 1 0 -8 A4.5 4.5 0 0 1 8 -4 Z" fill="${G("#ff4f7b")}" ${O2}/></g><path d="M8 -33 V-30" stroke="${INK}" stroke-width="2"/>`,
  lucky:()=>ACC.tophat("#3fb86a","#ffcb2f")+`<g transform="translate(-28 -20)">${[0,90,180,270].map(a=>`<circle cx="0" cy="-5" r="4.4" fill="${G("#3fb86a")}" stroke="${INK}" stroke-width="1.6" transform="rotate(${a})"/>`).join("")}<path d="M0 0 Q2 8 6 10" stroke="${INK}" stroke-width="2" fill="none"/></g>`,
  clown:()=>`<circle cx="0" cy="-28" r="7" fill="${G("#ff6f91")}" ${O2}/><circle cx="24" cy="-30" r="7" fill="${G("#4fb3ff")}" ${O2}/><circle cx="12" cy="-34" r="7" fill="${G("#7fd04e")}" ${O2}/><circle cx="38" cy="-12" r="5" fill="${G("#ff4040")}" ${O2}/><g transform="translate(16 -2)"><path d="M0 0 L-9 -6 L-9 6 Z M0 0 L9 -6 L9 6 Z" fill="${G("#ffcb2f")}" ${O2}/><circle r="3" fill="${G("#ff6f91")}" ${O2}/></g><circle cx="-10" cy="10" r="2.4" fill="#ff6f91"/><circle cx="-18" cy="2" r="2.4" fill="#4fb3ff"/>`,
  crown:()=>`<g transform="translate(12 -31)"><path d="M-11 0 L-12 -12 L-5 -6 L0 -15 L5 -6 L12 -12 L11 0 Z" fill="${G("#ffd45c")}" ${O2}/><circle cy="-4" r="2" fill="#ff6fa6"/></g>`,
  gold:()=>ACC.crown()+spark(-30,-22,.9,"#fff6c9")+spark(36,-34,.6,"#fff6c9"),
  shades:()=>`<path d="M10 -22 H30" stroke="${INK}" stroke-width="2.4"/><rect x="11" y="-25" width="9" height="7" rx="3" fill="#1a1a1a" stroke="${INK}" stroke-width="1.4"/><rect x="21" y="-25" width="9" height="7" rx="3" fill="#1a1a1a" stroke="${INK}" stroke-width="1.4"/>`
};
/* Things a duck wears behind its head (drawn first). */
const BACK={
  mane:()=>`<g>${Array.from({length:12},(_,i)=>{const an=i*Math.PI/6, x=12+Math.cos(an)*19, y=-17+Math.sin(an)*19; return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="8.5" fill="${G(i%2?"#e08a2e":"#f2a541")}" ${O2}/>`;}).join("")}</g>`};
function toyDuck(c,acc="",extra=""){
  const keys=acc?acc.split(" "):[], back=keys.map(k=>BACK[k]?BACK[k]():"").join("");
  const a=keys.map(k=>ACC[k]?ACC[k]():"").join("");
  const body=c.rainbow?RB():G(c.body), wing=c.rainbow?G("#ffffff"):G(c.wing);
  return `${back}<path d="M-20 0 Q-36 -10 -32 -22 Q-24 -12 -12 -10 Z" fill="${body}" ${O}/>
  <ellipse cx="-8" cy="22" rx="6" ry="3.4" fill="${G(c.beak)}" ${O2}/><ellipse cx="7" cy="22" rx="6" ry="3.4" fill="${G(c.beak)}" ${O2}/>
  <ellipse cx="-2" cy="6" rx="25" ry="17" fill="${body}" ${O}/>
  <path d="M-16 2 Q-6 -7 8 1 Q4 15 -8 13 Q-18 10 -16 2 Z" fill="${wing}" ${O2}/>
  <ellipse cx="-12" cy="0" rx="6" ry="2.4" fill="#fff" opacity=".45" transform="rotate(-18 -12 0)"/>
  <circle cx="12" cy="-17" r="15.5" fill="${body}" ${O}/>
  <ellipse cx="5" cy="-27" rx="5.5" ry="3" fill="#fff" opacity=".8" transform="rotate(-32 5 -27)"/>
  <ellipse cx="21" cy="-11" rx="3.8" ry="2.3" fill="#ff8fb1" opacity=".75"/>
  <ellipse cx="17" cy="-21" rx="3.8" ry="4.8" fill="#1a1a1a"/><circle cx="18.4" cy="-23" r="1.7" fill="#fff"/><circle cx="16.2" cy="-18.6" r=".8" fill="#fff"/>
  <path d="M25 -17 Q37 -17 38 -12 Q37 -7 25 -8 Q23 -12.5 25 -17 Z" fill="${G(c.beak)}" ${O2}/>
  ${a}${extra}`;
}
const GHOST={body:"#c9dcec",wing:"#b6cde2",beak:"#c9dcec"};

/* ---------- Helpers and other characters ---------- */
function toyPenguin(done){
  return `<path d="M-18 0 Q-28 10 -24 18 Q-16 12 -13 6 Z" fill="${G("#2b3a55")}" ${O2}/><path d="M18 0 Q28 10 24 18 Q16 12 13 6 Z" fill="${G("#2b3a55")}" ${O2}/>
  <ellipse cx="-7" cy="25" rx="7" ry="3.6" fill="${G("#ff9f43")}" ${O2}/><ellipse cx="7" cy="25" rx="7" ry="3.6" fill="${G("#ff9f43")}" ${O2}/>
  <path d="M0 -30 C20 -30 22 -4 20 10 C18 24 -18 24 -20 10 C-22 -4 -20 -30 0 -30 Z" fill="${G("#2b3a55")}" ${O}/>
  <path d="M0 -14 C12 -14 14 4 12 12 C10 20 -10 20 -12 12 C-14 4 -12 -14 0 -14 Z" fill="${G("#ffffff")}" ${O2}/>
  <ellipse cx="-6" cy="-24" rx="5" ry="3" fill="#fff" opacity=".55" transform="rotate(-30 -6 -24)"/>
  <ellipse cx="-6" cy="-14" rx="3.4" ry="4.4" fill="#1a1a1a"/><ellipse cx="6" cy="-14" rx="3.4" ry="4.4" fill="#1a1a1a"/><circle cx="-5" cy="-16" r="1.3" fill="#fff"/><circle cx="7" cy="-16" r="1.3" fill="#fff"/>
  <ellipse cx="-11" cy="-8" rx="3" ry="1.8" fill="#ff8fb1" opacity=".7"/><ellipse cx="11" cy="-8" rx="3" ry="1.8" fill="#ff8fb1" opacity=".7"/>
  <path d="M-5 -9 Q0 -11 5 -9 Q0 -2 -5 -9 Z" fill="${G("#ff9f43")}" ${O2}/>
  <path d="M-16 -2 Q0 6 16 -2 L16 4 Q0 12 -16 4 Z" fill="${G("#ff6f61")}" ${O2}/><path d="M8 4 L12 16 L18 14 L14 3 Z" fill="${G("#ff6f61")}" ${O2}/>
  ${done?`<g transform="translate(-12 -2)">${crownAt(12,-28)}</g>`:`<g transform="translate(22 6) rotate(-20)">${fishIcon(.7)}</g>`}`;
}
const crownAt=(x,y)=>`<g transform="translate(${x} ${y})"><path d="M-11 0 L-12 -12 L-5 -6 L0 -15 L5 -6 L12 -12 L11 0 Z" fill="${G("#ffd45c")}" ${O2}/><circle cy="-4" r="2" fill="#ff6fa6"/></g>`;
function toyOwl(done){
  return `<ellipse cx="-8" cy="26" rx="6" ry="3.2" fill="${G("#ff9f43")}" ${O2}/><ellipse cx="8" cy="26" rx="6" ry="3.2" fill="${G("#ff9f43")}" ${O2}/>
  <path d="M-16 -22 L-20 -36 L-6 -28 Z M16 -22 L20 -36 L6 -28 Z" fill="${G("#a0703f")}" ${O2}/>
  <ellipse cx="0" cy="0" rx="22" ry="27" fill="${G("#a0703f")}" ${O}/>
  <ellipse cx="0" cy="10" rx="13" ry="14" fill="${G("#f3dcb4")}" ${O2}/>
  <path d="M-6 6 q2 3 4 0 M2 6 q2 3 4 0 M-6 13 q2 3 4 0 M2 13 q2 3 4 0" stroke="#c49a66" stroke-width="1.6" fill="none"/>
  <circle cx="-9" cy="-12" r="9" fill="${G("#ffffff")}" ${O2}/><circle cx="9" cy="-12" r="9" fill="${G("#ffffff")}" ${O2}/>
  <circle cx="-8" cy="-12" r="4.4" fill="#1a1a1a"/><circle cx="10" cy="-12" r="4.4" fill="#1a1a1a"/><circle cx="-6.6" cy="-14" r="1.5" fill="#fff"/><circle cx="11.4" cy="-14" r="1.5" fill="#fff"/>
  <path d="M-3 -4 L3 -4 L0 2 Z" fill="${G("#ff9f43")}" ${O2}/>
  <ellipse cx="-17" cy="-2" rx="3" ry="1.8" fill="#ff8fb1" opacity=".7"/><ellipse cx="17" cy="-2" rx="3" ry="1.8" fill="#ff8fb1" opacity=".7"/>
  <g transform="translate(0 -27)"><rect x="-12" y="-8" width="24" height="9" rx="3" fill="${G("#d8344f")}" ${O2}/><rect x="-12" y="-2" width="24" height="3" fill="#ffd45c"/><path d="M8 1 H18" stroke="${INK}" stroke-width="3" stroke-linecap="round"/></g>
  ${done?crownAt(0,-36):`<g transform="translate(22 8) rotate(16)">${ticketIcon(.75)}</g>`}`;
}
function toyPigeon(done){
  return `<ellipse cx="-6" cy="22" rx="5" ry="3" fill="${G("#ff7a59")}" ${O2}/><ellipse cx="6" cy="22" rx="5" ry="3" fill="${G("#ff7a59")}" ${O2}/>
  <path d="M-20 2 L-34 10 L-20 12 Z" fill="${G("#6f7c92")}" ${O2}/>
  <ellipse cx="-2" cy="6" rx="22" ry="16" fill="${G("#9aa7bd")}" ${O}/>
  <path d="M-14 2 Q-4 -6 8 2 Q4 14 -6 12 Q-14 10 -14 2 Z" fill="${G("#7a879e")}" ${O2}/>
  <path d="M-10 4 h10 M-9 8 h9" stroke="#5e6a80" stroke-width="2" stroke-linecap="round"/>
  <circle cx="12" cy="-14" r="13" fill="${G("#8a97ae")}" ${O}/>
  <path d="M2 -4 Q12 4 22 -4 Q20 2 12 4 Q4 2 2 -4 Z" fill="${G("#5fc4a8")}" ${O2}/>
  <ellipse cx="6" cy="-22" rx="4" ry="2.2" fill="#fff" opacity=".6" transform="rotate(-30 6 -22)"/>
  <circle cx="16" cy="-17" r="4.2" fill="${G("#ff9f43")}" stroke="${INK}" stroke-width="1.6"/><circle cx="16.4" cy="-17" r="2" fill="#1a1a1a"/><circle cx="17.2" cy="-18" r=".8" fill="#fff"/>
  <path d="M23 -15 Q31 -13 32 -10 Q30 -8 23 -9 Z" fill="${G("#f3dcb4")}" ${O2}/>
  ${done?`${crownAt(12,-25)}<g transform="translate(-34 -18)">${detector(.8)}</g>`:`<g transform="translate(-30 -12)">${gearIcon(.7)}</g>`}`;
}
function toyTurkey(){
  const fan=["#d8442e","#ff9f43","#ffcb2f","#a0703f","#ff9f43","#d8442e","#ffcb2f"].map((c,i)=>{const d=-160+i*23,a=d*Math.PI/180,x=(-6+Math.cos(a)*22).toFixed(1),y=(-6+Math.sin(a)*22).toFixed(1);
    return `<ellipse cx="${x}" cy="${y}" rx="8" ry="17" fill="${G(c)}" stroke="${INK}" stroke-width="2" transform="rotate(${d+90} ${x} ${y})"/>`}).join("");
  return `${fan}<ellipse cx="-8" cy="22" rx="6" ry="3.4" fill="${G("#ff8a3d")}" ${O2}/><ellipse cx="7" cy="22" rx="6" ry="3.4" fill="${G("#ff8a3d")}" ${O2}/>
  <ellipse cx="-2" cy="6" rx="22" ry="16" fill="${G("#8a5a33")}" ${O}/>
  <path d="M-14 2 Q-4 -6 8 2 Q4 14 -6 12 Q-14 10 -14 2 Z" fill="${G("#6e4423")}" ${O2}/>
  <circle cx="12" cy="-17" r="14" fill="${G("#ffcb2f")}" ${O}/>
  <ellipse cx="5" cy="-26" rx="5" ry="2.8" fill="#fff" opacity=".8" transform="rotate(-32 5 -26)"/>
  <ellipse cx="17" cy="-21" rx="3.6" ry="4.6" fill="#1a1a1a"/><circle cx="18.4" cy="-23" r="1.6" fill="#fff"/>
  <path d="M24 -17 Q35 -17 36 -12 Q35 -8 24 -9 Z" fill="${G("#ff8a3d")}" ${O2}/>
  <path d="M26 -8 Q30 2 25 6 Q21 2 23 -8 Z" fill="${G("#e8423a")}" ${O2}/>
  <g transform="translate(10 -30) rotate(-6)"><rect x="-10" y="-12" width="20" height="12" rx="2" fill="${G("#2b2b2b")}" ${O2}/><rect x="-15" y="-2" width="30" height="5" rx="2.5" fill="${G("#2b2b2b")}" ${O2}/><rect x="-4" y="-8" width="8" height="6" rx="1" fill="none" stroke="#ffd45c" stroke-width="2"/></g>`;
}
function toySanta(){
  return `${toyDuck({body:"#e8423a",wing:"#c0283f",beak:"#ff8a3d"})}
  <path d="M-26 8 Q-2 16 22 8 L22 14 Q-2 22 -26 14 Z" fill="${G("#2b2b2b")}" ${O2}/>
  <rect x="-7" y="8.5" width="10" height="9" rx="2" fill="none" stroke="#ffd45c" stroke-width="2.4"/>
  <path d="M-24 18 Q-2 26 20 18" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"/>
  <path d="M12 -8 Q8 4 16 8 Q20 12 26 7 Q34 6 32 -2 Q36 -8 30 -10 Q20 -6 12 -8 Z" fill="#ffffff" ${O2}/>
  <path d="M-1 -27 Q-6 -52 -24 -46 Q-12 -40 -10 -30 Z" fill="${G("#e8423a")}" ${O2}/>
  <path d="M-2 -28 Q6 -46 22 -30 Z" fill="${G("#e8423a")}" ${O2}/>
  <ellipse cx="11" cy="-29" rx="16" ry="5" fill="#ffffff" ${O2}/>
  <circle cx="-25" cy="-46" r="5.5" fill="#ffffff" ${O2}/>`;
}
function presentIcon(s=1){ return `<g transform="scale(${s})"><rect x="-10" y="-6" width="20" height="17" rx="2" fill="${G("#e8423a")}" ${O2}/><rect x="-12" y="-11" width="24" height="6" rx="2" fill="${G("#e8423a")}" ${O2}/><path d="M0 -11 V11" stroke="#2f9e5a" stroke-width="4"/><path d="M0 -11 Q-9 -20 -8 -12 Q-7 -9 0 -11 Q7 -9 8 -12 Q9 -20 0 -11 Z" fill="${G("#3fbf6f")}" ${O2}/></g>`; }
function toyChicken(){
  return `<ellipse cx="-6" cy="24" rx="5" ry="3" fill="${G("#ff9f43")}" ${O2}/><ellipse cx="6" cy="24" rx="5" ry="3" fill="${G("#ff9f43")}" ${O2}/>
  <path d="M-20 0 L-32 -16 L-22 -18 L-30 -28 L-14 -10 Z" fill="${G("#ffffff")}" ${O2}/>
  <ellipse cx="-2" cy="6" rx="23" ry="17" fill="${G("#ffffff")}" ${O}/>
  <path d="M-14 2 Q-4 -6 8 2 Q4 14 -6 12 Q-14 10 -14 2 Z" fill="${G("#eef3f8")}" ${O2}/>
  <circle cx="12" cy="-15" r="13" fill="${G("#ffffff")}" ${O}/>
  <path d="M4 -26 q2 -8 6 -2 q3 -8 7 -1 q4 -6 6 2 Q12 -24 4 -26 Z" fill="${G("#e8423a")}" ${O2}/>
  <ellipse cx="17" cy="-18" rx="3.2" ry="4" fill="#1a1a1a"/><circle cx="18.2" cy="-19.6" r="1.4" fill="#fff"/>
  <path d="M24 -15 L33 -12 L24 -9 Z" fill="${G("#ffcb2f")}" ${O2}/><path d="M23 -8 Q26 -2 22 0 Q20 -4 21 -8 Z" fill="${G("#e8423a")}" ${O2}/>
  <ellipse cx="20" cy="-8" rx="3" ry="1.8" fill="#ff8fb1" opacity=".7"/>`;
}
function toyCrow(){
  return `<ellipse cx="-6" cy="22" rx="5" ry="3" fill="${G("#5b6b80")}" ${O2}/><ellipse cx="6" cy="22" rx="5" ry="3" fill="${G("#5b6b80")}" ${O2}/>
  <path d="M-20 2 L-36 8 L-20 12 Z" fill="${G("#2b2f3a")}" ${O2}/>
  <ellipse cx="-2" cy="6" rx="22" ry="16" fill="${G("#3a4050")}" ${O}/>
  <path d="M-14 2 Q-4 -6 8 2 Q4 14 -6 12 Q-14 10 -14 2 Z" fill="${G("#2b2f3a")}" ${O2}/>
  <circle cx="12" cy="-14" r="13" fill="${G("#3a4050")}" ${O}/>
  <ellipse cx="6" cy="-22" rx="4" ry="2" fill="#fff" opacity=".35" transform="rotate(-30 6 -22)"/>
  <circle cx="16" cy="-17" r="3.8" fill="${G("#ffcb2f")}" stroke="${INK}" stroke-width="1.6"/><circle cx="16.4" cy="-17" r="1.8" fill="#1a1a1a"/>
  <path d="M23 -16 L38 -12 L23 -8 Z" fill="${G("#7d8ea3")}" ${O2}/>
  <g transform="translate(10 -26) rotate(-8)"><rect x="-9" y="-14" width="18" height="14" rx="2" fill="${G("#2b2b45")}" ${O2}/><rect x="-9" y="-5" width="18" height="4" fill="#d8344f"/><rect x="-14" y="-2" width="28" height="5" rx="2.5" fill="${G("#2b2b45")}" ${O2}/></g>
  <g transform="translate(-30 -16)">${gearIcon(.6)}</g>`;
}
function toyGull(){
  return `<ellipse cx="-6" cy="22" rx="5" ry="3" fill="${G("#ffcb2f")}" ${O2}/><ellipse cx="6" cy="22" rx="5" ry="3" fill="${G("#ffcb2f")}" ${O2}/>
  <path d="M-6 0 Q-26 -26 -42 -10 Q-24 -10 -8 8 Z" fill="${G("#8a9bb2")}" ${O2}/>
  <ellipse cx="-2" cy="6" rx="23" ry="15" fill="${G("#ffffff")}" ${O}/>
  <circle cx="12" cy="-13" r="12.5" fill="${G("#ffffff")}" ${O}/>
  <path d="M22 -15 L36 -12 Q36 -8 32 -8 L22 -8 Z" fill="${G("#ffcb2f")}" ${O2}/><circle cx="33" cy="-9" r="1.6" fill="#e8423a"/>
  <path d="M6 -19 H24" stroke="${INK}" stroke-width="2.4"/><rect x="7" y="-22" width="8" height="6" rx="3" fill="#1a1a1a"/><rect x="16" y="-22" width="8" height="6" rx="3" fill="#1a1a1a"/>
  <g transform="translate(-26 18) rotate(-12)"><path d="M-12 -2 Q0 -10 12 -2 Z" fill="${G("#f3dcb4")}" ${O2}/><rect x="-12" y="-2" width="24" height="4" fill="#7fd04e" stroke="${INK}" stroke-width="1.4"/><path d="M-12 2 Q0 6 12 2 Z" fill="${G("#f3dcb4")}" ${O2}/></g>`;
}
function toyFox(){
  return `<path d="M-18 4 Q-40 0 -34 -20 Q-24 -8 -14 -2 Z" fill="${G("#ff8a3d")}" ${O2}/><path d="M-34 -20 Q-38 -12 -31 -9 Q-30 -15 -34 -20 Z" fill="#fff" stroke="${INK}" stroke-width="1.6"/>
  <ellipse cx="-2" cy="6" rx="19" ry="12" fill="${G("#ff8a3d")}" ${O}/>
  <ellipse cx="-9" cy="18" rx="4.5" ry="3" fill="${G("#5e3418")}" ${O2}/><ellipse cx="6" cy="18" rx="4.5" ry="3" fill="${G("#5e3418")}" ${O2}/>
  <path d="M6 -16 L8 -28 L15 -18 Z M14 -16 L22 -26 L24 -14 Z" fill="${G("#ff8a3d")}" ${O2}/>
  <path d="M2 -12 Q14 -24 26 -10 L34 -4 Q32 2 26 2 Q12 6 2 -2 Z" fill="${G("#ff8a3d")}" ${O}/>
  <path d="M18 -2 L34 -4 Q32 2 26 2 Q20 2 18 -2 Z" fill="#fff" stroke="${INK}" stroke-width="1.6"/>
  <circle cx="34" cy="-4" r="2.4" fill="#1a1a1a"/>
  <ellipse cx="16" cy="-9" rx="2.6" ry="3.2" fill="#1a1a1a"/><circle cx="17" cy="-10.4" r="1" fill="#fff"/>`;
}
function fishIcon(s=1){ return `<g transform="scale(${s})"><path d="M-12 0 Q-2 -10 10 0 Q-2 10 -12 0 Z" fill="${G("#4fb3ff")}" ${O2}/><path d="M10 0 L18 -7 L18 7 Z" fill="${G("#4fb3ff")}" ${O2}/><circle cx="-6" cy="-1" r="1.6" fill="#1a1a1a"/></g>`; }
function ticketIcon(s=1){ return `<g transform="scale(${s})"><path d="M-14 -8 H14 V-3 A3 3 0 0 0 14 3 V8 H-14 V3 A3 3 0 0 0 -14 -3 Z" fill="${G("#ffcb2f")}" ${O2}/><path d="M-6 -8 V8" stroke="${INK}" stroke-width="1.4" stroke-dasharray="2 2"/><circle cx="4" cy="0" r="2.4" fill="#d8344f"/></g>`; }
function gearIcon(s=1){ return `<g transform="scale(${s})"><path d="${Array.from({length:8},(_,i)=>{const a=i*Math.PI/4,b=a+.3,c=a+Math.PI/4-.3;return `${i?"L":"M"}${(Math.cos(a)*13).toFixed(1)} ${(Math.sin(a)*13).toFixed(1)} L${(Math.cos(b)*13).toFixed(1)} ${(Math.sin(b)*13).toFixed(1)} L${(Math.cos(b)*9).toFixed(1)} ${(Math.sin(b)*9).toFixed(1)} L${(Math.cos(c)*9).toFixed(1)} ${(Math.sin(c)*9).toFixed(1)}`}).join(" ")} Z" fill="${G("#b7c3d4")}" ${O2}/><circle r="4" fill="#fff" ${O2}/></g>`; }
function detector(s=1){ return `<g transform="scale(${s})"><rect x="-13" y="-10" width="26" height="20" rx="6" fill="${G("#2387d9")}" ${O2}/><circle cx="0" cy="0" r="6" fill="${G("#9fe7ff")}" ${O2}/><path d="M0 -10 V-18" stroke="${INK}" stroke-width="2.4"/><circle cx="0" cy="-20" r="3.4" fill="${G("#ff5c5c")}" ${O2}/></g>`; }
function acornIcon(s=1){ return `<g transform="scale(${s})"><path d="M-8 -2 Q-8 12 0 14 Q8 12 8 -2 Z" fill="${G("#c98a4f")}" ${O2}/><path d="M-10 -2 Q0 -12 10 -2 Z" fill="${G("#7a4523")}" ${O2}/><path d="M0 -8 V-12" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/></g>`; }
function eggIcon(s=1){ return `<g transform="scale(${s})"><ellipse cx="0" cy="0" rx="9" ry="12" fill="${G("#fff8ec")}" ${O2}/></g>`; }
const TOKEN_ICON={fish:fishIcon,ticket:ticketIcon,gear:gearIcon};

/* ---------- Scene pieces ---------- */
const sky=(a,b)=>`<rect width="400" height="300" fill="${LG(a,b)}"/>`;
const sun=(x,y)=>`<g ${N}><circle cx="${x}" cy="${y}" r="24" fill="${G("#ffe066")}" ${O}/><ellipse cx="${x-8}" cy="${y-8}" rx="7" ry="4" fill="#fff" opacity=".7" transform="rotate(-30 ${x-8} ${y-8})"/></g>`;
const cloud=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})" ${N}><path d="M0 0 H62 A13 13 0 0 0 54 -22 A17 17 0 0 0 24 -28 A14 14 0 0 0 2 -14 A8 8 0 0 0 0 0 Z" fill="#ffffff" ${O}/><path d="M10 -5 H52" stroke="#d6ecff" stroke-width="4" stroke-linecap="round"/></g>`;
const flower=(x,y,c)=>`<g transform="translate(${x} ${y})" ${N}><path d="M0 0 V12" stroke="#3f8a2e" stroke-width="3"/>${[0,72,144,216,288].map(a=>`<ellipse cx="0" cy="-6" rx="4" ry="6" fill="${G(c)}" stroke="${INK}" stroke-width="1.8" transform="rotate(${a})"/>`).join("")}<circle r="3.6" fill="${G("#ffcb2f")}" stroke="${INK}" stroke-width="1.8"/></g>`;
const bushBall=(x,y,r,c="#5fbf45")=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${G(c)}" ${O}/><ellipse cx="${x-r*.35}" cy="${y-r*.4}" rx="${r*.3}" ry="${r*.16}" fill="#fff" opacity=".4" transform="rotate(-25 ${x-r*.35} ${y-r*.4})"/>`;
const rock=(x,y,rx,ry)=>`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${G("#b7b2a6")}" ${O}/><ellipse cx="${x-rx*.35}" cy="${y-ry*.45}" rx="${rx*.28}" ry="${ry*.18}" fill="#fff" opacity=".5"/>`;
const snowman=(x,y,s,hat)=>`<g transform="translate(${x} ${y}) scale(${s})" ${N}><circle cx="0" cy="0" r="20" fill="${G("#ffffff")}" ${O}/><circle cx="0" cy="-30" r="14" fill="${G("#ffffff")}" ${O}/>
  <circle cx="-5" cy="-33" r="2" fill="#2b2b2b"/><circle cx="5" cy="-33" r="2" fill="#2b2b2b"/><path d="M0 -29 L12 -27 L0 -25 Z" fill="${G("#ff9f43")}" stroke="${INK}" stroke-width="1.4"/>
  <circle cy="-6" r="2.2" fill="#2b2b2b"/><circle cy="4" r="2.2" fill="#2b2b2b"/><path d="M-18 -6 L-32 -16 M18 -6 L32 -16" stroke="#7a4523" stroke-width="3" stroke-linecap="round"/>
  ${hat==="beanie"?`<path d="M-13 -38 Q0 -56 13 -38 Z" fill="${G("#4fb3ff")}" ${O2}/><circle cy="-52" r="4" fill="#fff" ${O2}/>`:`<rect x="-11" y="-52" width="22" height="10" rx="2" fill="${G("#ff5c5c")}" ${O2}/><rect x="-15" y="-43" width="30" height="5" rx="2.5" fill="${G("#ff5c5c")}" ${O2}/>`}</g>`;

/* No heavy outlines on ducks and characters: edges come from the soft shading in each gradient,
   plus a faint hairline so small parts (beaks, hats) still read. */
const SOFT=`stroke="#173A5E" stroke-opacity=".1" stroke-width="1" stroke-linejoin="round" stroke-linecap="round"`;
const soften=f=>(...a)=>f(...a).split(O).join(SOFT).split(O2).join(SOFT).replace(/stroke="#173A5E"(?! stroke-opacity)/g,'stroke="#173A5E" stroke-opacity=".35"');
toyDuck=soften(toyDuck); toyPenguin=soften(toyPenguin); toyOwl=soften(toyOwl); toyPigeon=soften(toyPigeon); toyTurkey=soften(toyTurkey); toySanta=soften(toySanta);
toyChicken=soften(toyChicken); toyCrow=soften(toyCrow); toyGull=soften(toyGull); toyFox=soften(toyFox);


/* A scallop shell: a ridged fan with a bumpy top edge and two little ears at the hinge. Drawn with its hinge at 0,0. */
function scallop(c,c2){ const tops=[-30,-15,0,15,30];
  const edge=tops.map((x,i)=>`${i?"":`M-34 -26 `}Q${x-7.5} ${-50+Math.abs(x)*.28} ${x} ${-44+Math.abs(x)*.3}`).join(" ");
  const bumps=tops.map(x=>` Q${x+7.5} ${-50+Math.abs(x+15)*.28} ${x+15>34?34:x+15} ${x+15>34?-26:-44+Math.abs(x+15)*.3}`);
  return `<path d="M-8 0 L-12 6 H12 L8 0 Z" fill="${G(c2)}" ${O2}/><path d="M-6 -2 L-34 -26 Q-40 -38 -30 -44 ${tops.slice(1).map(x=>`Q${x-7.5} ${-54+Math.abs(x-7.5)*.25} ${x} ${-44-(15-Math.abs(x))*0}`).join(" ")} Q40 -38 34 -26 L6 -2 Z" fill="${G(c)}" ${O}/>
   ${tops.map(x=>`<path d="M0 -2 L${x} ${-42}" stroke="${c2}" stroke-width="3.4" stroke-linecap="round"/>`).join("")}
   <path d="M-14 -6 L-24 -2 L-22 4 L-8 2 Z M14 -6 L24 -2 L22 4 L8 2 Z" fill="${G(c2)}" ${O2}/>
   <ellipse cx="-14" cy="-34" rx="6" ry="3" fill="#fff" opacity=".6" transform="rotate(-30 -14 -34)"/>`; }

/* Mitchell, the game's designer, as a cartoon quest-giver. Drawn from scratch in the game's toy style: spiky brown hair, silver glasses, braces smile, green tee, black pants and a black watch. wave=true raises his hand. */
function toyMitchell(wave=true,talk=false){ const skin=G("#f7d3bb"), tee=G("#2f9e5b"), hair=G("#5a3825");
  const arm=(d)=>`<path d="${d}" fill="none" stroke="${INK}" stroke-opacity=".3" stroke-width="12.6" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="#f2c7ab" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>`;
  return `<ellipse cx="0" cy="60" rx="30" ry="6" fill="#173A5E" opacity=".16"/>
  <path d="M-15 18 L-16 52 H-3 L-1 26 L1 26 L3 52 H16 L15 18 Z" fill="${G("#2a2f3a")}" ${O}/>
  <path d="M-19 52 Q-19 46 -10 46 H-2 Q0 52 -4 56 H-17 Q-20 56 -19 52 Z M19 52 Q19 46 10 46 H2 Q0 52 4 56 H17 Q20 56 19 52 Z" fill="${G("#3b4252")}" ${O2}/>
  ${wave?arm("M-20 -12 Q-34 -22 -36 -44"):arm("M-20 -12 Q-30 4 -22 16")}
  ${wave?`<g transform="translate(-37 -50) rotate(-12)"><ellipse rx="8" ry="9" fill="#f2c7ab" ${O2}/><path d="M-6 -6 V-13 M-2 -8 V-16 M2 -8 V-16 M6 -6 V-12" stroke="#f2c7ab" stroke-width="3.4" stroke-linecap="round"/><path d="M-6 -6 V-13 M-2 -8 V-16 M2 -8 V-16 M6 -6 V-12" fill="none" ${O2}/></g>`:`<circle cx="-22" cy="17" r="5.6" fill="#f2c7ab" ${O2}/>`}
  ${arm("M20 -12 Q32 2 22 14")}<circle cx="21" cy="15" r="5.6" fill="#f2c7ab" ${O2}/>
  <rect x="22" y="2" width="9" height="8" rx="2.4" fill="${G("#22262e")}" transform="rotate(30 26 6)"/>
  <path d="M-22 -16 Q-22 -22 -12 -24 H12 Q22 -22 22 -16 L26 -6 L19 -2 L18 22 Q0 26 -18 22 L-19 -2 L-26 -6 Z" fill="${tee}" ${O}/>
  <path d="M-8 -24 Q0 -18 8 -24" fill="none" stroke="#1e7a44" stroke-width="2.4" stroke-linecap="round"/>
  <rect x="-5" y="-30" width="10" height="9" fill="#f2c7ab"/>
  <ellipse cx="-24" cy="-50" rx="5" ry="6.5" fill="#f2c7ab" ${O2}/><ellipse cx="24" cy="-50" rx="5" ry="6.5" fill="#f2c7ab" ${O2}/>
  <ellipse cx="0" cy="-50" rx="24" ry="25" fill="${skin}" ${O}/>
  <path d="M-25 -46 Q-31 -76 -10 -78 L-12 -90 L0 -79 L4 -94 L10 -78 Q25 -80 27 -64 L31 -70 Q32 -55 25 -45 Q25 -57 19 -61 L15 -55 L10 -62 L4 -56 L-2 -63 L-8 -57 L-13 -63 Q-22 -58 -25 -46 Z" fill="${hair}" ${O}/>
  <path d="M-6 -86 Q-2 -82 0 -79" fill="none" stroke="#7a5038" stroke-width="2" stroke-linecap="round"/>
  <g fill="#ffffff" fill-opacity=".35" stroke="#a9b4c0" stroke-width="2.4"><rect x="-19" y="-55" width="15" height="11" rx="3.4"/><rect x="4" y="-55" width="15" height="11" rx="3.4"/></g>
  <path d="M-4 -50 H4 M-19 -51 L-23 -52 M19 -51 L23 -52" stroke="#a9b4c0" stroke-width="2.2" stroke-linecap="round"/>
  <ellipse cx="-11.5" cy="-49.5" rx="2.4" ry="3" fill="#2a2f3a"/><ellipse cx="11.5" cy="-49.5" rx="2.4" ry="3" fill="#2a2f3a"/><circle cx="-10.6" cy="-50.6" r=".9" fill="#fff"/><circle cx="12.4" cy="-50.6" r=".9" fill="#fff"/>
  <ellipse cx="-15" cy="-38" rx="4" ry="2.4" fill="#ff8fb1" opacity=".55"/><ellipse cx="15" cy="-38" rx="4" ry="2.4" fill="#ff8fb1" opacity=".55"/>
  <path d="M0 -44 Q2 -41 0 -40" fill="none" stroke="#c98f72" stroke-width="1.6" stroke-linecap="round"/>
  <g class="${talk?"mouth talk":"mouth"}"><path d="M-10 -35 Q0 ${talk?-22:-26} 10 -35 Q0 -33 -10 -35 Z" fill="${G("#c0465a")}" ${O2}/>
  <path d="M-8.4 -34.4 Q0 -32.2 8.4 -34.4 L8 -31.6 Q0 -29.4 -8 -31.6 Z" fill="#ffffff"/>
  <path d="M-7.6 -33 H7.6" stroke="#9aa6b2" stroke-width="1.2"/>${[-6,-3,0,3,6].map(x=>`<rect x="${x-.9}" y="-33.9" width="1.8" height="1.8" fill="#8f9aa6"/>`).join("")}</g>`;
}
/* Error Code Duck (Mitchell's friend-link duck): 8-bit pixel duck, a blue error screen for a face and a body made of error messages. */
function errorDuck(){
  const I="#173A5E", body="M-32 -12 H16 V-8 H24 V16 H20 V20 H12 V24 H-24 V20 H-32 V16 H-36 V-8 H-32 Z";
  const lines=[["ERROR 0x0DUCK","#D93A3A"],["QUACK.EXE STOPPED",I],["!! DUCK NOT FOUND","#D93A3A"],["ERR ERR ERR ERR",I],["FATAL: TOO QUACKY","#D93A3A"],["RETRY? RETRY?",I]];
  return `<g shape-rendering="crispEdges">
  <path d="M-44 -30 H-36 V-22 H-28 V-12 H-36 V-18 H-44 Z" fill="#E6ECF3" stroke="${I}" stroke-width="2.4"/>
  <rect x="-16" y="24" width="8" height="5" fill="#FF9F43" stroke="${I}" stroke-width="2"/><rect x="0" y="24" width="8" height="5" fill="#FF9F43" stroke="${I}" stroke-width="2"/>
  <clipPath id="errBody"><path d="${body}"/></clipPath>
  <path d="${body}" fill="#F4F7FB"/>
  <g clip-path="url(#errBody)" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="3.7" font-weight="700">
   ${lines.map(([t,c],i)=>`<text x="${-33+(i%2)*3}" y="${-6.5+i*4.6}" fill="${c}">${t}</text>`).join("")}
   <rect x="-36" y="20" width="64" height="6" fill="#D5DEE8"/>
  </g>
  <path d="${body}" fill="none" stroke="${I}" stroke-width="2.6" stroke-linejoin="miter"/>
  <rect x="32" y="-30" width="10" height="8" fill="#FF9F43" stroke="${I}" stroke-width="2.4"/><rect x="32" y="-23" width="7" height="5" fill="#F07F1E" stroke="${I}" stroke-width="2"/>
  <rect x="0" y="-46" width="34" height="34" fill="#1F5FD6" stroke="${I}" stroke-width="3"/>
  <rect x="3" y="-43" width="28" height="3" fill="#4D86F0"/>
  <rect x="8" y="-38" width="5" height="5" fill="#fff"/><rect x="21" y="-38" width="5" height="5" fill="#fff"/>
  <rect x="6" y="-28" width="22" height="2.4" fill="#fff"/><rect x="6" y="-24" width="16" height="2.4" fill="#fff" opacity=".85"/><rect x="6" y="-20" width="19" height="2.4" fill="#fff" opacity=".7"/>
  <rect x="6" y="-16" width="9" height="2.4" fill="#fff" opacity=".55"/>
  </g>`;
}
