{id:"snow",n:4,name:"Snowy Peaks",start:"igloo",
 idea:"Mitchell's idea: 7 ducks, a fish for every duck, and the penguin becomes the final duck. This test shows one area with 4 of them.",
 helper:{name:"Penguin",token:"fish",plural:"fish",icon:"fish",art:toyPenguin},
 ducks:[
  {id:"s_plain",name:"Yellow Duck",tier:"Easy",area:"igloo",c:YEL,hint:"By the igloo"},
  {id:"s_snowman",name:"Snowman Duck",tier:"Sneaky",area:"igloo",c:{body:"#ffffff",wing:"#e3edf7",beak:"#ff8a3d"},acc:"scarf",hint:"Blends in with friends"},
  {id:"s_ice",name:"Ice Cube Duck",tier:"Tricky",area:"igloo",c:{body:"#bfe8ff",wing:"#8fd0ff",beak:"#ff8a3d"},acc:"icecube",hint:"Frozen solid"},
  {id:"s_polar",name:"Polar Duck",tier:"Rare",area:"igloo",c:{body:"#fdfeff",wing:"#e8eef5",beak:"#f5c9a0"},acc:"earmuff",hint:"White on white"}],
 areas:{igloo:{name:"Igloo Village",pos:[0,0],bg:["#a9dcff","#d9e9f7"],exits:{},soon:{right:"Ice Rink"},draw:F=>`
  ${sky("#a9dcff","#eaf7ff")}${sun(342,44)}
  <g ${N}><path d="M-20 176 L70 70 L150 176 Z" fill="${LG("#ffffff","#c9dcee")}" ${O}/><path d="M100 176 L196 52 L300 176 Z" fill="${LG("#ffffff","#d6e6f4")}" ${O}/><path d="M240 176 L330 88 L420 176 Z" fill="${LG("#f4f9ff","#c9dcee")}" ${O}/>
  <path d="M174 80 L196 52 L218 80 L206 76 L196 86 L186 76 Z" fill="#fff" ${O2}/></g>
  <path d="M-10 182 Q200 158 410 182 V310 H-10Z" fill="${LG("#ffffff","#d9e9f7")}" ${O}/>
  <g ${N}><path d="M56 216 A62 54 0 0 1 180 216 Z" fill="${G("#ffffff")}" ${O}/>
  <path d="M68 196 H168 M60 208 H176 M84 180 H152 M100 168 H136" stroke="#c9dcee" stroke-width="2.4"/>
  <path d="M100 216 A18 22 0 0 1 136 216 Z" fill="${LG("#3d5a80","#22385a")}" ${O2}/></g>
  ${place("s_plain",176,232,.68)}
  ${snowman(226,214,.9,"top")}${place("s_snowman",270,214,.62)}${snowman(318,218,.85,"beanie")}
  ${place("s_polar",206,272,.58,{noShadow:true})}
  <g ${N}><path d="M150 300 Q166 272 200 278 Q236 270 254 300 Z" fill="${G("#ffffff")}" ${O}/></g>
  ${!F.crack?act("crack","Ice block",`<rect x="24" y="228" width="76" height="58" rx="10" fill="${LG("#d7f3ff","#7cc8ff")}" ${O}/><g transform="translate(62 262) scale(.55)" opacity=".35">${toyDuck(GHOST)}</g><path d="M34 238 h12 M84 236 l-6 10" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`)
    :`${place("s_ice",62,262,.6)}<g ${N}><path d="M28 286 l10 -10 l8 10 Z M84 288 l8 -14 l8 14 Z M54 290 l6 -8 l6 8 Z" fill="${G("#bfe8ff")}" ${O2}/></g>`}
  <ellipse cx="352" cy="276" rx="40" ry="12" fill="${LG("#3f7fb6","#1f4f80")}" ${O} ${N}/>
  ${helperAt(WORLDS_REF("snow"),352,244,.82)}
  <g fill="#fff" ${N} opacity=".9">${[[40,40],[120,30],[260,30],[300,120],[20,120],[380,150]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="3"/>`).join("")}</g>`}},
 plan:[{name:"Ice Rink",pos:[1,0]},{name:"Fishing Hut",pos:[2,0]}],
 msg:{crack:"Crack! Something was frozen inside."}},

{id:"theater",n:5,name:"The Theater",start:"stage",
 idea:"Mitchell's idea: a main stage, seats and backstage, with ducks dressed like show characters we make up. The usher owl collects a ticket for each duck.",
 helper:{name:"Usher Owl",token:"ticket",plural:"tickets",icon:"ticket",art:toyOwl},
 ducks:[
  {id:"t_plain",name:"Yellow Duck",tier:"Easy",area:"stage",c:YEL,hint:"Watching the show"},
  {id:"t_ballet",name:"Ballet Duck",tier:"Sneaky",area:"stage",c:{body:"#ffe1ef",wing:"#ffc2dc",beak:"#ff8a3d"},acc:"tutu",hint:"Behind the curtain"},
  {id:"t_magic",name:"Magician Duck",tier:"Tricky",area:"stage",c:YEL,acc:"magic",hint:"Abracadabra"},
  {id:"t_spot",name:"Spotlight Duck",tier:"Rare",area:"stage",c:{body:"#ffe27a",wing:"#f5c400",beak:"#ff8a3d"},acc:"spot",hint:"Only in the light"}],
 areas:{stage:{name:"Main Stage",pos:[1,0],bg:["#3a1446","#1a0a14"],exits:{},soon:{down:"Seats",right:"Backstage"},draw:F=>`
  <rect width="400" height="300" fill="${LG("#3a1446","#1d0a24")}"/>
  <rect x="40" y="30" width="320" height="172" fill="${F.light?LG("#7a5a9e","#4a2a6a"):LG("#2a1238","#1a0b20")}" ${O}/>
  <g ${N}><rect x="28" y="18" width="344" height="16" rx="6" fill="${G("#ffd45c")}" ${O}/><rect x="26" y="26" width="16" height="200" rx="6" fill="${G("#ffd45c")}" ${O}/><rect x="358" y="26" width="16" height="200" rx="6" fill="${G("#ffd45c")}" ${O}/>
  <path d="M42 34 H358 V50 Q330 64 302 50 Q274 64 246 50 Q218 64 190 50 Q162 64 134 50 Q106 64 78 50 Q60 62 42 50 Z" fill="${G("#d8344f")}" ${O2}/></g>
  <rect x="42" y="196" width="316" height="32" fill="${LG("#c08050","#7a4523")}" ${O} ${N}/>
  ${F.curtain?place("t_ballet",200,176,.85):""}
  ${F.light?`<polygon points="350,40 232,198 306,198" fill="#fff3a0" opacity=".38" ${N}/>`:""}
  ${F.light?place("t_spot",268,180,.7):""}
  ${!F.curtain?act("curtain","Big red curtain",`<path d="M44 52 H200 V196 H44 Z" fill="${LG("#e04460","#a51c34")}" ${O}/><path d="M200 52 H356 V196 H200 Z" fill="${LG("#d8344f","#8e1b2a")}" ${O}/>${[72,102,132,162,238,268,298,328].map(x=>`<path d="M${x} 58 V192" stroke="#7d1426" stroke-width="3" stroke-linecap="round"/>`).join("")}<circle cx="200" cy="124" r="10" fill="${G("#ffd45c")}" ${O2}/>`)
    :`<g ${N}><path d="M44 52 H94 Q70 124 94 196 H44 Z" fill="${LG("#e04460","#a51c34")}" ${O}/><path d="M356 52 H306 Q330 124 306 196 H356 Z" fill="${LG("#d8344f","#8e1b2a")}" ${O}/></g>`}
  ${act("light","Spotlight switch",`<rect x="374" y="114" width="22" height="44" rx="6" fill="${G("#5b6b80")}" ${O2}/><rect x="379" y="${F.light?120:140}" width="12" height="14" rx="3" fill="${G(F.light?"#4cd2a0":"#ff7a7a")}" stroke="${INK}" stroke-width="1.6"/>`)}
  ${!F.hat?act("hat","Magic hat",`<g transform="translate(92 214)"><rect x="-17" y="-24" width="34" height="24" rx="4" fill="${G("#2b2b45")}" ${O}/><rect x="-17" y="-10" width="34" height="6" fill="#8e44ad" stroke="${INK}" stroke-width="1.6"/><rect x="-24" y="-3" width="48" height="8" rx="4" fill="${G("#2b2b45")}" ${O}/>${spark(18,-32,.8)}</g>`)
    :`<g transform="translate(92 214)" ${N}><rect x="-17" y="-24" width="34" height="24" rx="4" fill="${G("#2b2b45")}" ${O}/><rect x="-24" y="-3" width="48" height="8" rx="4" fill="${G("#2b2b45")}" ${O}/></g>${place("t_magic",96,174,.68)}`}
  <rect y="228" width="400" height="72" fill="${LG("#2a0e1e","#1a0a14")}" ${N}/>
  <g ${N}>${[0,1,2,3,4,5,6,7].map(i=>`<rect x="${6+i*50}" y="244" width="42" height="34" rx="10" fill="${G("#c0283f")}" ${O2}/>`).join("")}</g>
  ${place("t_plain",178,250,.5,{noShadow:true})}
  <g ${N}>${[0,1,2,3,4,5,6].map(i=>`<rect x="${2+i*50}" y="268" width="48" height="36" rx="10" fill="${G("#a51c34")}" ${O2}/>`).join("")}</g>
  ${helperAt(WORLDS_REF("theater"),360,256,.74)}`}},
 plan:[{name:"Seats",pos:[1,1]},{name:"Backstage",pos:[2,0]}],
 msg:{curtain:"The curtain opens!",hat:"Poof! Something popped out of the hat."}},

{id:"city",n:6,name:"The City",start:"street",
 idea:"Mitchell's idea: nine ducks, a scrap part for every duck, and the pigeon builds a device that unlocks limited edition ducks. This test shows one area with 4 of them.",
 helper:{name:"Pigeon",token:"scrap part",plural:"scrap parts",icon:"gear",art:toyPigeon},
 ducks:[
  {id:"c_plain",name:"Yellow Duck",tier:"Easy",area:"street",c:YEL,hint:"Waiting for the bus"},
  {id:"c_barista",name:"Barista Duck",tier:"Sneaky",area:"street",c:YEL,acc:"barista",hint:"Smells like coffee"},
  {id:"c_taxi",name:"Taxi Duck",tier:"Tricky",area:"street",c:YEL,acc:"checker",hint:"Honk honk"},
  {id:"c_washer",name:"Window Washer Duck",tier:"Rare",area:"street",c:{body:"#ffd9a0",wing:"#f2b866",beak:"#ff8a3d"},acc:"washer",hint:"High up on a building"}],
 areas:{street:{name:"City Street",pos:[0,1],bg:["#8fd3ff","#3e434d"],exits:{},soon:{up:"Skyscraper",right:"Garbage Dump"},draw:F=>`
  ${sky("#8fd3ff","#e3f4ff")}${cloud(300,40,.7)}
  <g ${N}><rect x="150" y="50" width="76" height="180" rx="6" fill="${LG("#b7c3d4","#8597b8")}" ${O}/><rect x="306" y="84" width="86" height="146" rx="6" fill="${LG("#a4b3cc","#7085a8")}" ${O}/>
  <rect x="218" y="12" width="94" height="220" rx="6" fill="${LG("#8597b8","#5b6b90")}" ${O}/>
  ${Array.from({length:8},(_,r)=>Array.from({length:4},(_,c)=>`<rect x="${228+c*20}" y="${24+r*24}" width="13" height="15" rx="3" fill="${LG("#e6f4ff","#9fd0ff")}" stroke="${INK}" stroke-width="1.6"/>`).join("")).join("")}
  <path d="M232 112 V92 M298 112 V92" stroke="${INK}" stroke-width="2"/></g>
  ${door("","Skyscraper door, coming later",`<g ${N}><rect x="250" y="200" width="30" height="28" rx="4" fill="${LG("#d8f2ff","#8fd0ff")}" ${O2}/><path d="M265 200 V228" stroke="${INK}" stroke-width="2"/><rect x="244" y="194" width="42" height="7" rx="3" fill="${G("#2387d9")}" ${O2}/></g><rect x="244" y="190" width="42" height="40" fill="transparent"/>`,"Skyscraper")}
  ${place("c_washer",262,104,.48,{noShadow:true})}
  <rect x="226" y="112" width="78" height="7" rx="3" fill="${G("#5b6b80")}" ${O2} ${N}/>
  <g ${N}><rect x="10" y="108" width="142" height="122" rx="8" fill="${LG("#f3dcb4","#d8b47a")}" ${O}/><rect x="6" y="100" width="150" height="12" rx="5" fill="${G("#a0703f")}" ${O2}/></g>
  ${helperAt(WORLDS_REF("city"),70,84,.72)}
  <g ${N}><path d="M14 126 H148 L140 148 H22 Z" fill="${G("#e8423a")}" ${O2}/>${[36,60,84,108,132].map(x=>`<path d="M${x} 128 L${x-2} 146" stroke="#fff" stroke-width="7"/>`).join("")}
  <rect x="22" y="158" width="72" height="54" rx="6" fill="${G("#7a4523")}" ${O2}/><rect x="27" y="163" width="62" height="44" rx="4" fill="${LG("#fff3d6","#ffd9a0")}" stroke="${INK}" stroke-width="1.6"/></g>
  ${place("c_barista",58,194,.52,{noShadow:true})}
  <g ${N}><rect x="104" y="166" width="34" height="62" rx="8" fill="${G("#8a5a33")}" ${O2}/><circle cx="130" cy="198" r="2.6" fill="#ffcb2f"/></g>
  <rect y="226" width="400" height="14" fill="${LG("#dfe5ec","#b9c2ce")}" ${O} ${N}/><rect y="240" width="400" height="70" fill="${LG("#5a606c","#3e434d")}" ${N}/>
  <path d="M0 274 H400" stroke="#ffcb2f" stroke-width="5" stroke-dasharray="24 16" ${N}/>
  ${act("taxi","Taxi",`<g transform="translate(200 254)"><rect x="-54" y="-8" width="108" height="28" rx="10" fill="${G("#ffcb2f")}" ${O}/><path d="M-34 -8 L-24 -28 H24 L34 -8 Z" fill="${G("#ffcb2f")}" ${O}/><path d="M-27 -10 L-20 -24 H-3 V-10 Z" fill="${LG("#e6f4ff","#9fd0ff")}" stroke="${INK}" stroke-width="1.8"/><path d="M3 -10 V-24 H20 L27 -10 Z" fill="${LG("#e6f4ff","#9fd0ff")}" stroke="${INK}" stroke-width="1.8"/><rect x="-12" y="-36" width="24" height="9" rx="3" fill="${G("#2b2b2b")}" ${O2}/><text x="0" y="-29.4" text-anchor="middle" font-family="Grandstander,sans-serif" font-weight="900" font-size="7" fill="#ffcb2f">TAXI</text><circle cx="-30" cy="20" r="10" fill="${G("#2b2b2b")}" ${O2}/><circle cx="30" cy="20" r="10" fill="${G("#2b2b2b")}" ${O2}/><circle cx="-30" cy="20" r="3.6" fill="#b7c3d4"/><circle cx="30" cy="20" r="3.6" fill="#b7c3d4"/></g>`)}
  ${F.taxi?place("c_taxi",212,236,.34,{noShadow:true}):""}
  <g ${N}><rect x="328" y="158" width="5" height="70" fill="${G("#5b6b80")}" ${O2}/><rect x="312" y="146" width="74" height="14" rx="5" fill="${G("#2387d9")}" ${O2}/><text x="349" y="156.5" text-anchor="middle" font-family="Grandstander,sans-serif" font-size="9" font-weight="900" fill="#fff">BUS</text><rect x="338" y="204" width="48" height="8" rx="3" fill="${G("#a0703f")}" ${O2}/><path d="M344 212 V226 M380 212 V226" stroke="${INK}" stroke-width="3"/></g>
  ${place("c_plain",362,192,.48)}`}},
 plan:[{name:"Skyscraper",pos:[1,0]},{name:"Garbage Dump",pos:[2,1]}],
 msg:{taxi:"Honk honk! Someone waved from the taxi."}}
