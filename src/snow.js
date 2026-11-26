{id:"snow",n:4,name:"Snowy Peaks",start:"igloo",
 idea:"Mitchell's world: every duck you find gives you a fish. Bring all the fish to the Penguin and the Penguin becomes your last duck.",
 helper:{name:"Penguin",token:"fish",plural:"fish",icon:"fish",art:toyPenguin},
 ducks:[
  {id:"s_plain",name:"Yellow Duck",tier:"Easy",area:"igloo",c:YEL,hint:"By the igloo"},
  {id:"s_snowman",name:"Snowman Duck",tier:"Sneaky",area:"igloo",c:{body:"#ffffff",wing:"#e3edf7",beak:"#ff8a3d"},acc:"scarf",hint:"Blends in with friends"},
  {id:"s_ice",name:"Ice Cube Duck",tier:"Tricky",area:"igloo",c:{body:"#bfe8ff",wing:"#8fd0ff",beak:"#ff8a3d"},acc:"icecube",hint:"Frozen solid"},
  {id:"s_skater",name:"Skater Duck",tier:"Sneaky",area:"rink",c:{body:"#ffb8d6",wing:"#ff8fbf",beak:"#ff8a3d"},acc:"earmuff",hint:"Going round and round"},
  {id:"s_crystal",name:"Crystal Duck",tier:"Tricky",area:"cave",c:{body:"#c9f3ff",wing:"#8fe0ff",beak:"#ffb066"},acc:"glow",hint:"Shiny rocks"},
  {id:"s_polar",name:"Polar Duck",tier:"Rare",area:"peak",c:{body:"#fdfeff",wing:"#e8eef5",beak:"#f5c9a0"},acc:"scarf",hint:"White on white"},
  {id:"s_penguin",name:"Penguin",tier:"Legendary",area:"igloo",helper:true,art:()=>toyPenguin(true),hint:"Bring fish to the fishing hole"}],
 areas:{
 igloo:{name:"Igloo Village",pos:[0,1],bg:["#a9dcff","#e2eefa"],exits:{up:"peak",right:"rink"},draw:F=>`
  ${sky("#a9dcff","#eaf7ff")}${sun(342,44)}
  <g ${N}><path d="M-20 176 L70 70 L150 176 Z" fill="${LG("#ffffff","#c9dcee")}" ${O}/><path d="M100 176 L196 52 L300 176 Z" fill="${LG("#ffffff","#d6e6f4")}" ${O}/><path d="M240 176 L330 88 L420 176 Z" fill="${LG("#f4f9ff","#c9dcee")}" ${O}/>
  <path d="M174 80 L196 52 L218 80 L206 76 L196 86 L186 76 Z" fill="#fff" ${O2}/></g>
  <path d="M-10 182 Q200 158 410 182 V310 H-10Z" fill="${LG("#ffffff","#e2eefa")}" ${O}/>
  <g ${N}><path d="M56 216 A62 54 0 0 1 180 216 Z" fill="${G("#ffffff")}" ${O}/>
  <path d="M68 196 H168 M60 208 H176 M84 180 H152 M100 168 H136" stroke="#c9dcee" stroke-width="2.4"/>
  <path d="M100 216 A18 22 0 0 1 136 216 Z" fill="${LG("#3d5a80","#22385a")}" ${O2}/></g>
  ${place("s_plain",176,232,.68)}
  ${snowman(226,214,.9,"top")}${place("s_snowman",270,214,.62)}${snowman(318,218,.85,"beanie")}
  ${!F.crack?act("crack","Ice block",`<rect x="24" y="228" width="76" height="58" rx="10" fill="${LG("#d7f3ff","#7cc8ff")}" ${O}/><g transform="translate(62 262) scale(.55)" opacity=".35">${toyDuck(GHOST)}</g><path d="M34 238 h12 M84 236 l-6 10" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`)
    :`${place("s_ice",62,262,.6)}<g ${N}><path d="M28 286 l10 -10 l8 10 Z M84 288 l8 -14 l8 14 Z M54 290 l6 -8 l6 8 Z" fill="${G("#bfe8ff")}" ${O2}/></g>`}
  <ellipse cx="352" cy="276" rx="40" ry="12" fill="${LG("#3f7fb6","#1f4f80")}" ${O} ${N}/>
  ${HELP("snow",352,244,.82)}
  <g fill="#fff" ${N} opacity=".9">${[[40,40],[120,30],[260,30],[300,120],[20,120],[380,150]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="3"/>`).join("")}</g>`},
 rink:{stretchBottom:false,name:"Ice Rink",pos:[1,1],bg:["#9fd6ff","#e2eefa"],exits:{left:"igloo",down:"cave"},doors:{cave:"down"},draw:F=>`
  ${sky("#9fd6ff","#e6f5ff")}${cloud(90,46,.8)}${cloud(300,34,.6)}
  <g ${N}>${[[20,150],[56,140],[300,146],[338,136],[378,150]].map(([x,y])=>`<path d="M${x} ${y-62} L${x-22} ${y} H${x+22} Z" fill="${LG("#3f8f5a","#2a6a40")}" ${O2}/><path d="M${x} ${y-62} L${x-9} ${y-36} L${x} ${y-42} L${x+9} ${y-36} Z" fill="#fff" ${O2}/><rect x="${x-3}" y="${y}" width="6" height="10" fill="#7a4523"/>`).join("")}</g>
  <path d="M-10 150 Q200 132 410 150 V310 H-10Z" fill="${LG("#ffffff","#e2eefa")}" ${O} ${N}/>
  <g ${N}><ellipse cx="200" cy="212" rx="178" ry="54" fill="${LG("#d9f4ff","#9fd6ff")}" ${O}/>
  <path d="M90 206 Q140 186 196 204 T300 214 M120 228 Q170 244 230 226" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".9"/>
  ${[0,1,2,3,4,5,6,7,8].map(i=>`<rect x="${26+i*40}" y="${i%2?150:152}" width="6" height="22" rx="2" fill="${G("#a0703f")}" ${O2}/>`).join("")}<path d="M26 156 H352" stroke="#a0703f" stroke-width="4"/></g>
  ${place("s_skater",292,206,.42)}
  <g ${N}><path d="M286 226 l-10 4 M300 226 l10 4" stroke="${INK}" stroke-width="2" stroke-linecap="round"/></g>
  ${act("cocoa","Hot cocoa stand",`<g transform="translate(60 214)"><rect x="-38" y="-30" width="76" height="46" rx="6" fill="${G("#c0283f")}" ${O}/><path d="M-44 -30 L-38 -50 H38 L44 -30 Z" fill="${G("#ffffff")}" ${O2}/>${[-30,-14,2,18].map(x=>`<path d="M${x} -50 L${x+8} -30" stroke="#d8344f" stroke-width="5"/>`).join("")}<rect x="-16" y="-24" width="32" height="24" rx="5" fill="${G("#7a4523")}" ${O2}/>${F.cocoa?`<path d="M-6 -30 q4 -8 0 -14 M6 -30 q4 -8 0 -14" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/>`:""}</g>`)}
  <g ${N}><rect x="300" y="250" width="84" height="10" rx="4" fill="${G("#a0703f")}" ${O2}/><path d="M308 260 V280 M376 260 V280" stroke="${INK}" stroke-width="4"/></g>
  ${door("cave","Ice cave below",`<g transform="translate(200 284)"><path d="M-46 16 Q-40 -22 0 -24 Q40 -22 46 16 Z" fill="${G("#ffffff")}" ${O}/><path d="M-26 16 Q-22 -8 0 -10 Q22 -8 26 16 Z" fill="${LG("#2a4f80","#13284a")}" ${O2}/></g>`)}
  ${tagAt(200,300-28,"Ice Cave")}`},
 cave:{stretchTop:false,name:"Ice Cave",pos:[1,2],bg:["#1c3d6b","#0f2240"],exits:{up:"rink"},draw:F=>`
  <rect width="400" height="300" fill="${LG("#1c3d6b","#0f2240")}"/>
  <g ${N}>${[[10,40],[40,28],[78,52],[120,30],[160,46],[210,26],[252,50],[290,34],[330,56],[370,30],[396,44]].map(([x,h])=>`<path d="M${x-14} -2 L${x} ${h} L${x+14} -2 Z" fill="${LG("#d9f4ff","#7cc8ff")}" ${O2}/>`).join("")}</g>
  <g ${N}><path d="M150 30 Q170 120 160 230 H240 Q230 120 250 30 Z" fill="${LG("#bfe8ff","#7cc8ff")}" ${O} opacity=".9"/>
  <path d="M175 60 Q182 140 176 220 M200 50 V226 M224 64 Q218 140 226 220" stroke="#fff" stroke-width="3" fill="none" opacity=".7"/></g>
  <path d="M-10 226 Q200 210 410 226 V310 H-10Z" fill="${LG("#5a86b8","#2c4f80")}" ${O} ${N}/>
  ${place("s_crystal",318,220,.6,{noShadow:true})}
  ${!F.crystals?act("crystals","Blue crystals",`<g transform="translate(318 236)">${[[-34,0,26],[-14,-10,40],[8,-4,34],[28,2,24],[-2,6,22]].map(([x,y,h])=>`<path d="M${x-10} ${y+12} L${x} ${y-h} L${x+10} ${y+12} Z" fill="${LG("#a8ecff","#3fa7e8")}" ${O2}/>`).join("")}</g>`)
    :`<g transform="translate(318 236)" ${N}>${[[-44,0,22],[40,2,20]].map(([x,y,h])=>`<path d="M${x-10} ${y+12} L${x} ${y-h} L${x+10} ${y+12} Z" fill="${LG("#a8ecff","#3fa7e8")}" ${O2}/>`).join("")}</g>`}
  <g transform="translate(70 238)" ${N}>${[[-20,0,30],[0,-6,44],[20,2,28]].map(([x,y,h])=>`<path d="M${x-10} ${y+12} L${x} ${y-h} L${x+10} ${y+12} Z" fill="${LG("#d7b8ff","#9b6bd8")}" ${O2}/>`).join("")}</g>
  ${fish(116,262,.8,"#4fb3ff")}
  ${spark(300,150,.7,"#e9fffa")}${spark(90,120,.5,"#e9fffa")}${spark(360,190,.5,"#e9fffa")}`},
 peak:{name:"Mountain Top",pos:[0,0],bg:["#6fb7f2","#ffffff"],exits:{down:"igloo"},draw:F=>`
  ${sky("#6fb7f2","#d6eeff")}${cloud(60,60,.7)}${cloud(330,90,.9)}
  <g ${N}><path d="M-20 300 L170 52 L250 120 L300 90 L420 300 Z" fill="${LG("#ffffff","#d6e6f4")}" ${O}/>
  <path d="M150 78 L170 52 L190 80 L178 74 L170 86 L162 74 Z" fill="#c9dcee"/>
  <path d="M170 52 V20" stroke="${INK}" stroke-width="3"/><path d="M170 22 L196 30 L170 38 Z" fill="${G("#ff5c5c")}" ${O2}/></g>
  <path d="M-10 236 Q120 210 230 230 Q330 246 410 226 V310 H-10Z" fill="${G("#ffffff")}" ${O} ${N}/>
  ${place("s_polar",112,214,.6,{noShadow:true})}
  <g ${N}><path d="M74 236 Q96 214 122 222 Q146 212 160 236 Z" fill="${G("#ffffff")}" ${O2}/></g>
  ${act("sled","Red sled",`<g transform="translate(290 244)"><path d="M-44 0 H40 Q52 0 50 -10" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round"/><rect x="-40" y="-18" width="78" height="12" rx="5" fill="${G("#e8423a")}" ${O2}/><path d="M-30 -6 V0 M28 -6 V0" stroke="${INK}" stroke-width="3"/></g>`)}
  <g ${N}><path d="M220 212 L232 176 M232 212 L240 178" stroke="#5b6b80" stroke-width="3" stroke-linecap="round"/><circle cx="230" cy="208" r="4" fill="#5b6b80"/><circle cx="238" cy="208" r="4" fill="#5b6b80"/></g>
  <g fill="#fff" ${N} opacity=".9">${[[30,30],[110,24],[250,20],[370,40],[320,150],[40,160]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="3"/>`).join("")}</g>`}},
 msg:{crack:"Crack! Something was frozen inside.",cocoa:"Hot cocoa! It warms your wings.",crystals:"Clink! The crystals slide apart.",sled:"Wheee! The sled zooms a little and stops."}},
