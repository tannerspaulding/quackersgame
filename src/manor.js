{id:"manor",n:2,name:"Spooky Manor",start:"gate",
 ducks:[
  {id:"pumpkin",name:"Pumpkin Duck",tier:"Easy",area:"gate",c:{body:"#ff8c1a",wing:"#e06f00",beak:"#ffd43b"},acc:"pumpkin",hint:"Sits with the pumpkins"},
  {id:"ghost",name:"Ghost Duck",tier:"Sneaky",area:"hall",c:{body:"#ffffff",wing:"#dfe6ff",beak:"#c9d3f5"},opacity:.3,hint:"Almost see-through"},
  {id:"book",name:"Book Duck",tier:"Sneaky",area:"library",c:{body:"#8e44ad",wing:"#6c3483",beak:"#d4ac0d"},acc:"specs",hint:"Reads a lot"},
  {id:"soup",name:"Soup Duck",tier:"Tricky",area:"kitchen",c:YEL,acc:"chef",hint:"Something's cooking"},
  {id:"bat",name:"Bat Duck",tier:"Tricky",area:"attic",c:{body:"#4b3a6b",wing:"#3a2a55",beak:"#b07a3a"},acc:"bat",hint:"Hangs upside down"},
  {id:"spider",name:"Spider Duck",tier:"Legendary",area:"basement",c:{body:"#7a7a85",wing:"#5f5f6a",beak:"#e07b2f"},acc:"web",hint:"Needs the lights on"}],
 areas:{
 gate:{name:"Front Gate",pos:[1,2],bg:["#2b2350","#2f3d24"],exits:{up:"hall"},doors:{hall:"up"},draw:F=>`
  ${sky("#211a42","#5a4690")}${stars(34)}
  <g ${N}><circle cx="332" cy="52" r="26" fill="${G("#fff6c9")}" ${O}/><circle cx="322" cy="46" r="5" fill="#ece3b0"/><circle cx="340" cy="62" r="3.4" fill="#ece3b0"/></g>
  <path d="M-10 214 Q120 196 200 206 Q300 196 410 214 V310 H-10 Z" fill="${LG("#3f5a32","#24361c")}" ${O} ${N}/>
  <g ${N}><path d="M104 76 L200 22 L296 76 Z" fill="${LG("#4a3a6a","#2b2045")}" ${O}/>
  <rect x="116" y="72" width="168" height="140" rx="6" fill="${LG("#6a5a94","#463a6a")}" ${O}/>
  <path d="M262 40 V18 H278 V50" fill="${G("#463a6a")}" ${O2}/>
  ${[[138,92,1],[240,92,0],[138,146,0],[240,146,1]].map(([x,y,l])=>`<rect x="${x}" y="${y}" width="24" height="30" rx="7" fill="${l?LG("#fff3a0","#ffcb2f"):LG("#3a2f5a","#241c3c")}" ${O2}/><path d="M${x+12} ${y} V${y+30}" stroke="${INK}" stroke-opacity=".35" stroke-width="2"/>`).join("")}</g>
  ${door("hall","Front door of the manor",`<path d="M178 212 V166 Q200 140 222 166 V212 Z" fill="${LG("#8a5a3a","#5a3420")}" ${O}/><circle cx="214" cy="190" r="3.4" fill="${G("#ffcb2f")}" stroke="${INK}" stroke-width="1.6"/>`)}
  ${tagAt(200,134,"DOOR")}
  <path d="M182 212 L218 212 L248 300 L152 300 Z" fill="${LG("#8a7a6a","#5a4a3a")}" ${O} ${N}/>
  <g ${N}>${Array.from({length:22},(_,i)=>{const x=i*19+4; return (x>150&&x<250)?"":`<rect x="${x}" y="194" width="5" height="46" rx="2" fill="${G("#2b2b33")}" ${O2}/><path d="M${x-2} 196 L${x+2.5} 184 L${x+7} 196 Z" fill="${G("#2b2b33")}" ${O2}/>`;}).join("")}
  <rect x="0" y="204" width="156" height="5" rx="2" fill="#2b2b33"/><rect x="246" y="204" width="160" height="5" rx="2" fill="#2b2b33"/></g>
  ${pumpkinAt(58,264,1)}${place("pumpkin",100,258,.62)}${pumpkinAt(122,274,.8)}
  ${pumpkinAt(330,262,1.05,1)}${pumpkinAt(372,276,.7)}
  <g ${N} opacity=".55">${[[60,230],[300,240],[360,226]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="24" ry="5" fill="#cfc6ff"/>`).join("")}</g>`},
 hall:{name:"Grand Hall",pos:[1,1],bg:["#4a3566","#5a3b28"],exits:{left:"library",right:"kitchen",up:"attic",down:"gate"},doors:{gate:"down",basement:"down"},draw:F=>`
  <rect width="400" height="300" fill="${LG("#5a4280","#3f2c5c")}"/>
  <g ${N}>${Array.from({length:14},(_,i)=>`<rect x="${i*30+6}" y="0" width="12" height="232" fill="#6a5090" opacity=".45"/>`).join("")}</g>
  <rect y="228" width="400" height="80" fill="${LG("#7a5236","#4a2e1c")}" ${O} ${N}/>
  <g ${N}><rect x="164" y="34" width="72" height="84" rx="8" fill="${G("#c8963a")}" ${O}/><rect x="173" y="43" width="54" height="66" rx="5" fill="${LG("#3a4a6a","#1f2a40")}" ${O2}/>
  <circle cx="200" cy="70" r="14" fill="${G("#e8d7b0")}" ${O2}/><path d="M184 108 Q200 86 216 108" fill="${G("#8a3a4a")}" ${O2}/><circle cx="195" cy="68" r="1.8" fill="#1a1a1a"/><circle cx="205" cy="68" r="1.8" fill="#1a1a1a"/></g>
  <g ${N}><path d="M200 0 V18" stroke="${INK}" stroke-opacity=".5" stroke-width="2"/></g>
  ${door("gate","Front door back outside",`<rect x="84" y="138" width="54" height="92" rx="16" fill="${LG("#8a5a3a","#5a3420")}" ${O}/><circle cx="128" cy="186" r="3.4" fill="${G("#ffcb2f")}" stroke="${INK}" stroke-width="1.6"/>`)}
  ${tagAt(111,128,"OUTSIDE")}
  ${door("basement","Stairs down to the basement",`<path d="M168 300 L178 238 L222 238 L232 300 Z" fill="${LG("#2a1f3a","#120c1c")}" ${O}/><path d="M178 252 h44 M175 268 h50 M172 284 h56" stroke="#4a3a5a" stroke-width="3"/>`)}
  ${tagAt(200,230,"STAIRS")}
  <g ${N}><rect x="296" y="96" width="40" height="134" rx="8" fill="${LG("#6a4024","#3a2414")}" ${O}/><circle cx="316" cy="126" r="14" fill="${G("#f3e6c4")}" ${O2}/>
  <path d="M316 126 V116 M316 126 L323 130" stroke="${INK}" stroke-width="2" stroke-linecap="round"/><rect x="308" y="152" width="16" height="56" rx="6" fill="${LG("#2a190c","#1a0f06")}" ${O2}/><circle cx="316" cy="196" r="5" fill="${G("#ffcb2f")}" ${O2}/></g>
  ${place("ghost",254,206,.82)}
  <g ${N}><rect x="20" y="232" width="56" height="10" rx="5" fill="#8a3a4a" opacity=".6"/><rect x="350" y="150" width="8" height="80" rx="3" fill="${G("#c8963a")}" ${O2}/><path d="M354 150 Q344 134 354 122 Q364 134 354 150" fill="${G("#ffe066")}" ${O2}/></g>`},
 library:{name:"Library",pos:[0,1],bg:["#3d2b1f","#3d2b1f"],exits:{right:"hall"},draw:F=>`
  <rect width="400" height="300" fill="${LG("#4a3424","#2e2016")}"/>
  <rect x="58" y="26" width="300" height="262" rx="8" fill="${LG("#7a5236","#5a3a24")}" ${O} ${N}/>
  ${books(38,64,68,348)}${books(124,64,68,348,[220,270])}${books(210,64,68,348)}
  <g ${N}>${[104,190,276].map(y=>`<rect x="58" y="${y}" width="300" height="10" rx="4" fill="${G("#a06a40")}" ${O2}/>`).join("")}</g>
  ${place("book",246,176,.56)}
  <g ${N}><rect x="14" y="36" width="7" height="252" rx="3" fill="${G("#a06a40")}" ${O2}/><rect x="40" y="36" width="7" height="252" rx="3" fill="${G("#a06a40")}" ${O2}/>${[66,106,146,186,226,266].map(y=>`<rect x="14" y="${y}" width="33" height="6" rx="3" fill="${G("#c8925a")}" ${O2}/>`).join("")}
  <rect x="332" y="230" width="60" height="60" rx="16" fill="${G("#8a3a4a")}" ${O}/><rect x="326" y="252" width="72" height="36" rx="12" fill="${G("#a04a5a")}" ${O}/></g>`},
 kitchen:{name:"Kitchen",pos:[2,1],bg:["#5b4a6e","#6b4a35"],exits:{left:"hall"},draw:F=>`
  <rect width="400" height="300" fill="${LG("#6a5880","#4e3e62")}"/>
  <g ${N} opacity=".5">${Array.from({length:40},(_,i)=>`<rect x="${(i%10)*40+3}" y="${Math.floor(i/10)*30+34}" width="34" height="24" rx="5" fill="#7a68920"/>`).join("").replace(/#7a68920/g,"#7a6892")}</g>
  <rect y="190" width="400" height="120" fill="${LG("#7a5236","#4a2e1c")}" ${O} ${N}/>
  <g ${N}><rect x="164" y="156" width="152" height="40" rx="8" fill="${G("#3a3a46")}" ${O}/><circle cx="196" cy="176" r="8" fill="${G("#e8423a")}" ${O2}/><circle cx="284" cy="176" r="8" fill="${G("#55555f")}" ${O2}/>
  <rect x="170" y="196" width="140" height="70" rx="6" fill="${LG("#4a4a56","#2b2b33")}" ${O}/><rect x="190" y="212" width="100" height="40" rx="8" fill="${LG("#ffb35c","#e06f00")}" fill-opacity=".55" ${O2}/></g>
  ${F.lid?place("soup",238,118,.55,{noShadow:true}):""}
  <g ${N}><path d="M200 120 H276 V150 Q276 160 266 160 H210 Q200 160 200 150 Z" fill="${G("#6a6a78")}" ${O}/><rect x="190" y="126" width="12" height="7" rx="3" fill="${G("#6a6a78")}" ${O2}/><rect x="274" y="126" width="12" height="7" rx="3" fill="${G("#6a6a78")}" ${O2}/></g>
  ${F.lid?`<g ${N} opacity=".6"><path d="M220 110 q-6 -10 0 -20 q6 -10 0 -20" stroke="#fff" stroke-width="3" fill="none"/><path d="M256 110 q-6 -10 0 -20 q6 -10 0 -20" stroke="#fff" stroke-width="3" fill="none"/></g>
   <g ${N}><ellipse cx="338" cy="184" rx="30" ry="7" fill="${G("#8a8a96")}" ${O}/><rect x="332" y="172" width="12" height="8" rx="3" fill="${G("#b7c3d4")}" ${O2}/></g>`
   :act("lid","Pot lid",`<ellipse cx="238" cy="120" rx="40" ry="8" fill="${G("#8a8a96")}" ${O}/><rect x="231" y="106" width="14" height="9" rx="3" fill="${G("#b7c3d4")}" ${O2}/>`)}
  <g ${N}><rect x="36" y="112" width="68" height="80" rx="8" fill="${LG("#5a3a24","#3a2414")}" ${O}/><circle cx="70" cy="132" r="9" fill="${G("#e8d7b0")}" ${O2}/><path d="M48 160 h44 M48 174 h44" stroke="#2a190c" stroke-width="3"/>
  <path d="M400 0 L344 0 Q372 18 400 60 Z" fill="none" stroke="#e8e8f0" stroke-opacity=".5" stroke-width="1.4"/><path d="M400 0 L364 40 M400 0 L380 52 M400 0 L352 22" stroke="#e8e8f0" stroke-opacity=".5" stroke-width="1.2"/></g>`},
 attic:{name:"Attic",pos:[1,0],bg:["#2a2030","#3a2a22"],exits:{down:"hall"},draw:F=>`
  <rect width="400" height="300" fill="${LG("#3a2c48","#241a30")}"/>
  <g ${N}><path d="M0 0 L200 -40 L400 0 V30 L200 -8 L0 30 Z" fill="${G("#5a3e2a")}" ${O}/><rect y="36" width="400" height="16" rx="4" fill="${G("#6a4a30")}" ${O2}/>
  <circle cx="90" cy="130" r="30" fill="${G("#5a3e2a")}" ${O}/><circle cx="90" cy="130" r="22" fill="${LG("#3a4a7a","#1f2a50")}" ${O2}/><circle cx="98" cy="122" r="7" fill="${G("#fff6c9")}"/><path d="M68 130 H112 M90 108 V152" stroke="#5a3e2a" stroke-width="4"/></g>
  <g ${N}>${[150,214,350].map((x,i)=>`<g transform="translate(${x} 54) scale(${i===1?.9:1})"><path d="M0 0 V8" stroke="${INK}" stroke-opacity=".4" stroke-width="1.6"/><path d="M0 8 q-12 6 -18 0 q4 12 18 10 q14 2 18 -10 q-6 6 -18 0z" fill="${G("#3a2a55")}" ${O2}/><ellipse cx="0" cy="14" rx="6" ry="9" fill="${G("#3a2a55")}" ${O2}/></g>`).join("")}</g>
  ${place("bat",290,90,.6,{upside:true,noShadow:true})}
  <rect y="228" width="400" height="80" fill="${LG("#5a3e2a","#3a2818")}" ${O} ${N}/>
  <g ${N}><rect x="30" y="184" width="70" height="50" rx="6" fill="${G("#c8925a")}" ${O}/><path d="M30 200 H100" stroke="${INK}" stroke-opacity=".35" stroke-width="2"/><rect x="86" y="198" width="50" height="36" rx="6" fill="${G("#b07a48")}" ${O}/>
  <rect x="282" y="170" width="84" height="64" rx="8" fill="${G("#8a5a3a")}" ${O}/><path d="M282 186 H366" stroke="${G("#ffcb2f")}" stroke-width="4"/>
  <path d="M190 234 L200 170 L214 170 L224 234" fill="none" stroke="#dcdce6" stroke-opacity=".6" stroke-width="3"/><ellipse cx="207" cy="166" rx="16" ry="10" fill="#e6e6ef" opacity=".6"/></g>`},
 basement:{name:"Basement",pos:[2,2],bg:["#07070d","#07070d"],exits:{up:"hall"},doors:{hall:"up"},draw:F=>{
  const back=door("hall","Stairs back up to the hall",`<path d="M10 300 V214 H64 V300 Z" fill="${F.light?LG("#4a3a5a","#2a1f3a"):"#141020"}" ${F.light?O:""}/><path d="M14 236 h46 M14 258 h46 M14 280 h46" stroke="${F.light?"#6a5a7a":"#222034"}" stroke-width="3"/>`)+tagAt(37,206,"UP",F.light?"#ffffff":"#5b6a99");
  const sw=act("light",F.light?"Light switch, on":"Light switch",`<rect x="88" y="120" width="28" height="40" rx="7" fill="${G(F.light?"#e3edf7":"#9da8b8")}" ${O}/><rect x="96" y="${F.light?126:142}" width="12" height="13" rx="3" fill="${G(F.light?"#4cd2a0":"#ff7a7a")}" ${O2}/>${F.light?"":`<circle cx="102" cy="140" r="30" fill="#ffd43b" opacity=".14"/>`}`);
  return F.light?`
  <rect width="400" height="300" fill="${LG("#6a6a76","#4a4a56")}"/>
  <g ${N} opacity=".6">${Array.from({length:40},(_,i)=>`<rect x="${(i%8)*52+((Math.floor(i/8))%2?26:0)-10}" y="${Math.floor(i/8)*40+18}" width="48" height="34" rx="6" fill="#7a7a86"/>`).join("")}</g>
  <rect y="238" width="400" height="70" fill="${LG("#4a4a56","#2e2e36")}" ${O} ${N}/>
  <g ${N}><path d="M200 0 V36" stroke="${INK}" stroke-opacity=".6" stroke-width="2"/><circle cx="200" cy="46" r="30" fill="#ffe066" opacity=".22"/><circle cx="200" cy="46" r="12" fill="${G("#ffe066")}" ${O2}/></g>
  ${back}${sw}
  <g ${N}><rect x="128" y="196" width="64" height="46" rx="6" fill="${G("#b07a48")}" ${O}/><path d="M128 212 H192 M160 196 V242" stroke="${INK}" stroke-opacity=".3" stroke-width="2"/><rect x="236" y="206" width="84" height="36" rx="6" fill="${G("#8a5a3a")}" ${O}/></g>
  <g ${N} stroke="#f0f0f6" stroke-width="1.2" fill="none" opacity=".85"><path d="M400 24 L296 132"/><path d="M400 24 L286 70"/><path d="M400 24 L348 152"/><path d="M400 24 L396 152"/>
  <path d="M332 102 Q346 86 352 66"/><path d="M314 116 Q340 106 372 72 Q378 110 366 128"/><path d="M300 130 Q330 118 350 152"/><path d="M322 120 Q354 112 380 140"/></g>
  ${place("spider",334,112,.48,{noShadow:true})}
  <g ${N}><path d="M372 30 V54" stroke="${INK}" stroke-width="1.2"/><circle cx="372" cy="58" r="5" fill="${G("#2b2b33")}"/></g>`
  :`<rect width="400" height="300" fill="#07070d"/>${back}${sw}${tagAt(232,150,"It's too dark to see anything...","#7d86b8")}`; }}
 },
 msg:{lid:"You lift the lid... something smells good!",light:["Click! The light is on.","Lights off. Spooky!"]}},
