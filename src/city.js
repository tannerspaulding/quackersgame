{id:"city",n:6,name:"The City",start:"street",
 idea:"Mitchell's world: nine ducks, a scrap part for every duck, and the Pigeon builds a gadget that will unlock limited edition ducks.",
 helper:{name:"Pigeon",token:"scrap part",plural:"scrap parts",icon:"gear",art:toyPigeon,reward:"The Pigeon built you a Duck Detector! It will help you find special ducks when you finish special tasks."},
 ducks:[
  {id:"c_plain",name:"Yellow Duck",tier:"Easy",area:"street",c:YEL,hint:"Waiting for the bus"},
  {id:"c_barista",name:"Barista Duck",tier:"Sneaky",area:"cafe",c:YEL,acc:"barista",hint:"Smells like coffee"},
  {id:"c_chef",name:"Chef Duck",tier:"Sneaky",area:"tower",c:{body:"#fff4dc",wing:"#f0dfbf",beak:"#ff8a3d"},acc:"chef",hint:"Cooking up high"},
  {id:"c_taxi",name:"Taxi Duck",tier:"Tricky",area:"street",c:YEL,acc:"checker",hint:"Honk honk"},
  {id:"c_cool",name:"Cool Duck",tier:"Tricky",area:"tower",c:{body:"#7fd6ff",wing:"#4fb3ff",beak:"#ff8a3d"},acc:"shades",hint:"Too cool to come out"},
  {id:"c_book",name:"Bookworm Duck",tier:"Tricky",area:"tower",c:{body:"#c8b6ff",wing:"#a48cf0",beak:"#ff8a3d"},acc:"specs",hint:"Reading by the window"},
  {id:"c_washer",name:"Window Washer Duck",tier:"Rare",area:"tower",c:{body:"#ffd9a0",wing:"#f2b866",beak:"#ff8a3d"},acc:"washer",hint:"High up on a building"},
  {id:"c_robot",name:"Robot Duck",tier:"Rare",area:"dump",c:{body:"#c9d3df",wing:"#9aa8ba",beak:"#ffb066"},acc:"antenna",hint:"Made of spare parts"},
  {id:"c_pigeon",name:"Pigeon",tier:"Legendary",area:"dump",helper:true,art:()=>toyPigeon(true),hint:"Bring scrap parts to the dump"}],
 areas:{
 street:{name:"City Street",pos:[1,1],bg:["#8fd3ff","#3e434d"],exits:{left:"cafe",up:"tower",right:"dump"},doors:{cafe:"left",tower:"up"},draw:F=>`
  ${sky("#8fd3ff","#e3f4ff")}${cloud(320,40,.7)}${cloud(70,30,.5)}
  <g ${N}><rect x="150" y="50" width="76" height="180" rx="6" fill="${LG("#b7c3d4","#8597b8")}" ${O}/><rect x="306" y="84" width="86" height="146" rx="6" fill="${LG("#a4b3cc","#7085a8")}" ${O}/>
  <rect x="218" y="12" width="94" height="220" rx="6" fill="${LG("#8597b8","#5b6b90")}" ${O}/>
  ${Array.from({length:7},(_,r)=>Array.from({length:4},(_,c)=>`<rect x="${228+c*20}" y="${24+r*24}" width="13" height="15" rx="3" fill="${LG("#e6f4ff","#9fd0ff")}" stroke="${INK}" stroke-width="1.6"/>`).join("")).join("")}
  ${[0,1,2,3,4].map(r=>`<rect x="162" y="${64+r*30}" width="52" height="14" rx="3" fill="${LG("#e6f4ff","#9fd0ff")}" stroke="${INK}" stroke-width="1.6"/>`).join("")}</g>
  ${door("tower","Go in the skyscraper",`<g><rect x="250" y="196" width="30" height="32" rx="4" fill="${LG("#d8f2ff","#8fd0ff")}" ${O2}/><path d="M265 196 V228" stroke="${INK}" stroke-width="2"/><rect x="244" y="190" width="42" height="7" rx="3" fill="${G("#2387d9")}" ${O2}/></g><rect x="240" y="184" width="50" height="46" fill="transparent"/>`)}
  <g ${N}><rect x="10" y="108" width="142" height="122" rx="8" fill="${LG("#f3dcb4","#d8b47a")}" ${O}/><rect x="6" y="100" width="150" height="12" rx="5" fill="${G("#a0703f")}" ${O2}/>
  <path d="M14 126 H148 L140 148 H22 Z" fill="${G("#e8423a")}" ${O2}/>${[36,60,84,108,132].map(x=>`<path d="M${x} 128 L${x-2} 146" stroke="#fff" stroke-width="7"/>`).join("")}
  <rect x="22" y="158" width="72" height="54" rx="6" fill="${G("#7a4523")}" ${O2}/><rect x="27" y="163" width="62" height="44" rx="4" fill="${LG("#fff3d6","#ffd9a0")}" stroke="${INK}" stroke-width="1.6"/>
  <g transform="translate(58 186)"><path d="M-10 -8 H10 L8 10 H-8 Z" fill="#fff" stroke="${INK}" stroke-width="2"/><path d="M10 -3 Q17 -2 10 5" fill="none" stroke="${INK}" stroke-width="2"/><path d="M-3 -12 q3 -5 0 -9 M4 -12 q3 -5 0 -9" stroke="#a0703f" stroke-width="2" fill="none"/></g></g>
  ${door("cafe","Go in the cafe",`<g><rect x="104" y="166" width="34" height="62" rx="8" fill="${G("#8a5a33")}" ${O2}/><circle cx="130" cy="198" r="2.6" fill="#ffcb2f"/></g><rect x="98" y="160" width="46" height="70" fill="transparent"/>`)}
  <rect y="226" width="400" height="14" fill="${LG("#dfe5ec","#b9c2ce")}" ${O} ${N}/><rect y="240" width="400" height="70" fill="${LG("#5a606c","#3e434d")}" ${N}/>
  <path d="M0 274 H400" stroke="#ffcb2f" stroke-width="5" stroke-dasharray="24 16" ${N}/>
  ${act("taxi","Taxi",`<g transform="translate(200 254)"><rect x="-54" y="-8" width="108" height="28" rx="10" fill="${G("#ffcb2f")}" ${O}/><path d="M-34 -8 L-24 -28 H24 L34 -8 Z" fill="${G("#ffcb2f")}" ${O}/><path d="M-27 -10 L-20 -24 H-3 V-10 Z" fill="${LG("#e6f4ff","#9fd0ff")}" stroke="${INK}" stroke-width="1.8"/><path d="M3 -10 V-24 H20 L27 -10 Z" fill="${LG("#e6f4ff","#9fd0ff")}" stroke="${INK}" stroke-width="1.8"/><rect x="-12" y="-36" width="24" height="9" rx="3" fill="${G("#2b2b2b")}" ${O2}/><text x="0" y="-29.4" text-anchor="middle" font-family="Grandstander,sans-serif" font-weight="900" font-size="7" fill="#ffcb2f">TAXI</text><circle cx="-30" cy="20" r="10" fill="${G("#2b2b2b")}" ${O2}/><circle cx="30" cy="20" r="10" fill="${G("#2b2b2b")}" ${O2}/><circle cx="-30" cy="20" r="3.6" fill="#b7c3d4"/><circle cx="30" cy="20" r="3.6" fill="#b7c3d4"/></g>`)}
  ${F.taxi?place("c_taxi",212,236,.34,{noShadow:true}):""}
  <g ${N}><rect x="328" y="158" width="5" height="70" fill="${G("#5b6b80")}" ${O2}/><rect x="312" y="146" width="74" height="14" rx="5" fill="${G("#2387d9")}" ${O2}/><text x="349" y="156.5" text-anchor="middle" font-family="Grandstander,sans-serif" font-size="9" font-weight="900" fill="#fff">BUS</text><rect x="338" y="204" width="48" height="8" rx="3" fill="${G("#a0703f")}" ${O2}/><path d="M344 212 V226 M380 212 V226" stroke="${INK}" stroke-width="3"/></g>
  ${place("c_plain",362,192,.48)}`},
 cafe:{stretchTop:false,stretchBottom:false,name:"The Cafe",pos:[0,1],bg:["#f7e6c6","#6a4428"],exits:{right:"street"},draw:F=>`
  <rect width="400" height="300" fill="${LG("#f7e6c6","#e8cc9a")}"/>
  <g ${N}><path d="M0 0 H400 V20 H0 Z" fill="${G("#e8423a")}"/>${[20,60,100,140,180,220,260,300,340,380].map(x=>`<path d="M${x} 0 V20" stroke="#fff" stroke-width="14"/>`).join("")}
  <rect x="40" y="40" width="150" height="86" rx="8" fill="${G("#2f3a2f")}" ${O}/><text x="115" y="64" text-anchor="middle" font-family="Grandstander,sans-serif" font-weight="900" font-size="15" fill="#fff">MENU</text>
  ${["Quack Latte","Pond Cocoa","Bread Muffin"].map((t,i)=>`<text x="56" y="${86+i*16}" font-family="Grandstander,sans-serif" font-size="11" fill="#e8f5e0">${t}</text>`).join("")}
  <rect x="236" y="42" width="130" height="90" rx="8" fill="${LG("#d9f4ff","#9fd0ff")}" ${O}/><path d="M301 42 V132 M236 87 H366" stroke="${INK}" stroke-width="3"/>
  ${[[60,150],[150,150],[260,150],[340,150]].map(([x,y])=>`<path d="M${x} ${y-10} V${y+6}" stroke="${INK}" stroke-width="2"/><path d="M${x-12} ${y+6} H${x+12} L${x+6} ${y+18} H${x-6} Z" fill="${G("#ffcb2f")}" ${O2}/>`).join("")}</g>
  ${F.steam?place("c_barista",270,184,.6):""}
  <g ${N}><rect x="0" y="196" width="400" height="104" fill="${LG("#8a5a33","#6a4428")}" ${O}/><rect x="-4" y="188" width="408" height="14" rx="5" fill="${G("#c08050")}" ${O2}/>
  ${[30,130,230,330].map(x=>`<rect x="${x}" y="214" width="60" height="70" rx="6" fill="none" stroke="#5a3a1e" stroke-width="3"/>`).join("")}</g>
  ${act("steam","Coffee machine",`<g transform="translate(110 168)"><rect x="-44" y="-40" width="88" height="62" rx="10" fill="${G("#c9d3df")}" ${O}/><rect x="-34" y="-30" width="68" height="16" rx="4" fill="${G("#5b6b80")}" ${O2}/><circle cx="-18" cy="-22" r="4" fill="#4cd2a0"/><circle cx="0" cy="-22" r="4" fill="#ffcb2f"/><circle cx="18" cy="-22" r="4" fill="#ff7a7a"/><path d="M-6 -12 V0 M6 -12 V0" stroke="${INK}" stroke-width="3"/><path d="M-10 2 H10 L8 18 H-8 Z" fill="#fff" ${O2}/>${F.steam?`<path d="M-30 -46 q6 -10 0 -20 M0 -46 q6 -10 0 -20 M30 -46 q6 -10 0 -20" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/>`:""}</g>`)}
  <g ${N}>${[[318,186],[348,184]].map(([x,y])=>`<path d="M${x-12} ${y-14} H${x+12} L${x+9} ${y} H${x-9} Z" fill="${G("#ffffff")}" ${O2}/>`).join("")}</g>`},
 tower:{name:"The Skyscraper",pos:[1,0],bg:["#7fc6f5","#b9c2ce"],stretchBottom:false,exits:{down:"street"},draw:F=>`
  ${sky("#7fc6f5","#d6eeff")}${cloud(40,40,.6)}${cloud(370,70,.6)}
  <rect x="70" y="-10" width="260" height="320" fill="${LG("#8fa1c0","#6a7ca0")}" ${O} ${N}/>
  <g ${N}>${[0,1,2,3,4].map(r=>[0,1,2,3,4,5].map(c=>`<rect x="${86+c*40}" y="${8+r*46}" width="28" height="32" rx="3" fill="${LG("#e6f4ff","#9fd0ff")}" stroke="${INK}" stroke-width="1.6"/>`).join("")).join("")}</g>
  ${[["win1",126,"c_chef","#ffd45c"],["win2",206,"c_cool","#7fd6ff"],["win3",286,"c_book","#c8b6ff"]].map(([k,x,id,c])=>`<g ${N}><rect x="${x-34}" y="146" width="68" height="70" rx="6" fill="${LG("#fff3d6","#ffd9a0")}" ${O}/></g>
   ${F[k]?`${place(id,x,196,.56,{noShadow:true})}<g ${N}><path d="M${x-34} 146 H${x-20} Q${x-28} 180 ${x-20} 216 H${x-34} Z" fill="${G(c)}" ${O2}/><path d="M${x+34} 146 H${x+20} Q${x+28} 180 ${x+20} 216 H${x+34} Z" fill="${G(c)}" ${O2}/></g>`
     :act(k,"Apartment window",`<rect x="${x-34}" y="146" width="68" height="70" rx="6" fill="${G(c)}" ${O}/><path d="M${x} 146 V216" stroke="${INK}" stroke-width="2"/>${[-24,-12,12,24].map(d=>`<path d="M${x+d} 150 V212" stroke="${INK}" stroke-opacity=".25" stroke-width="2"/>`).join("")}`)}
   <rect x="${x-40}" y="214" width="80" height="8" rx="3" fill="${G("#5b6b80")}" ${O2} ${N}/>`).join("")}
  <g ${N}><path d="M110 0 V94 M290 0 V94" stroke="${INK}" stroke-width="2"/></g>
  ${place("c_washer",236,88,.5,{noShadow:true})}
  <rect x="100" y="94" width="200" height="8" rx="3" fill="${G("#5b6b80")}" ${O2} ${N}/>
  <rect y="246" width="400" height="60" fill="${LG("#dfe5ec","#b9c2ce")}" ${O} ${N}/>
  <g ${N}><rect x="170" y="228" width="60" height="22" rx="3" fill="${LG("#d8f2ff","#8fd0ff")}" ${O2}/><rect x="164" y="224" width="72" height="7" rx="3" fill="${G("#2387d9")}" ${O2}/></g>`},
 dump:{name:"Garbage Dump",pos:[2,1],bg:["#c9d9c0","#8a7a5a"],exits:{left:"street"},draw:F=>`
  ${sky("#cfe3ff","#eef4e0")}${cloud(120,40,.6)}
  <g ${N}><path d="M-10 230 Q30 120 110 150 Q160 110 210 160 Q270 100 330 150 Q380 130 410 180 V240 H-10 Z" fill="${LG("#9aa088","#6e7460")}" ${O}/>
  ${[[60,170,"#e8423a"],[150,150,"#2387d9"],[250,140,"#ffcb2f"],[330,170,"#3fb46a"],[200,190,"#8e44ad"]].map(([x,y,c])=>`<rect x="${x-10}" y="${y-8}" width="20" height="14" rx="3" fill="${G(c)}" ${O2} transform="rotate(${(x%30)-15} ${x} ${y})"/>`).join("")}
  ${[[40,206],[96,196],[300,200]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="16" fill="none" stroke="#2b2b2b" stroke-width="9"/>`).join("")}</g>
  <path d="M-10 236 Q200 222 410 236 V310 H-10Z" fill="${LG("#a08a60","#7a6a48")}" ${O} ${N}/>
  ${act("fridge","Old fridge",`<g transform="translate(112 214)">${F.fridge?`<rect x="-34" y="-74" width="56" height="96" rx="8" fill="${G("#e8eef5")}" ${O}/><rect x="-28" y="-68" width="44" height="84" rx="5" fill="#6f8096"/><path d="M-28 -40 H16 M-28 -12 H16" stroke="#d7e0ea" stroke-width="3"/><rect x="-62" y="-74" width="28" height="96" rx="6" fill="${G("#dfe5ec")}" ${O}/>`:`<rect x="-34" y="-74" width="68" height="96" rx="8" fill="${G("#e8eef5")}" ${O}/><path d="M-34 -36 H34" stroke="${INK}" stroke-width="2"/><rect x="22" y="-66" width="5" height="22" rx="2" fill="#5b6b80"/><rect x="22" y="-28" width="5" height="30" rx="2" fill="#5b6b80"/>`}</g>`)}
  ${F.fridge?place("c_robot",104,214,.74):""}
  ${act("can","Trash can",`<g transform="translate(220 252)"><path d="M-22 -30 H22 L18 22 H-18 Z" fill="${G("#8597b8")}" ${O}/>${[-10,0,10].map(x=>`<path d="M${x} -24 V16" stroke="${INK}" stroke-opacity=".3" stroke-width="2"/>`).join("")}${F.can?`<ellipse cx="-30" cy="18" rx="22" ry="6" fill="${G("#a4b3cc")}" ${O2}/>`:`<ellipse cx="0" cy="-32" rx="26" ry="7" fill="${G("#a4b3cc")}" ${O2}/>`}</g>`)}
  ${HELP("city",322,232,.9)}`}},
 msg:{taxi:"Honk honk! Someone waved from the taxi.",steam:"Psssh! The coffee is ready.",win1:"The curtains open!",win2:"The curtains open!",win3:"The curtains open!",fridge:"The old fridge door swings open.",can:"Rattle rattle! Just old cans in there."}}
