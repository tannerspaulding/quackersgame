{id:"theater",n:5,name:"The Theater",start:"stage",
 idea:"Mitchell's world: a main stage, seats and backstage, with ducks dressed like show characters we make up. Every duck you find gives you a ticket for the Usher Owl.",
 helper:{name:"Usher Owl",token:"ticket",plural:"tickets",icon:"ticket",art:toyOwl},
 ducks:[
  {id:"t_plain",name:"Yellow Duck",tier:"Easy",area:"seats",c:YEL,hint:"Waiting for the show"},
  {id:"t_ballet",name:"Ballet Duck",tier:"Sneaky",area:"stage",c:{body:"#ffe1ef",wing:"#ffc2dc",beak:"#ff8a3d"},acc:"tutu",hint:"Behind the curtain"},
  {id:"t_pirate",name:"Pirate Captain Duck",tier:"Sneaky",area:"backstage",c:{body:"#ffe27a",wing:"#f5c400",beak:"#ff8a3d"},acc:"pirate",hint:"Hiding in the prop box"},
  {id:"t_magic",name:"Magician Duck",tier:"Tricky",area:"stage",c:YEL,acc:"magic",hint:"Abracadabra"},
  {id:"t_lion",name:"Lion Duck",tier:"Tricky",area:"backstage",c:{body:"#ffc44d",wing:"#f0a020",beak:"#ff8a3d"},acc:"mane",hint:"In with the costumes"},
  {id:"t_spot",name:"Spotlight Duck",tier:"Rare",area:"stage",c:{body:"#ffe27a",wing:"#f5c400",beak:"#ff8a3d"},acc:"spot",hint:"Only in the light"},
  {id:"t_owl",name:"Usher Owl",tier:"Legendary",area:"seats",helper:true,art:()=>toyOwl(true),hint:"Bring tickets to the aisle"}],
 areas:{
 stage:{stretchBottom:false,name:"Main Stage",pos:[1,0],bg:["#3a1446","#1a0a14"],exits:{down:"seats",right:"backstage"},draw:F=>`
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
  ${act("light","Spotlight switch",`<rect x="372" y="110" width="26" height="50" rx="6" fill="${G("#5b6b80")}" ${O2}/><rect x="379" y="${F.light?118:140}" width="12" height="14" rx="3" fill="${G(F.light?"#4cd2a0":"#ff7a7a")}" stroke="${INK}" stroke-width="1.6"/>`)}
  ${!F.hat?act("hat","Magic hat",`<g transform="translate(92 214)"><rect x="-17" y="-24" width="34" height="24" rx="4" fill="${G("#2b2b45")}" ${O}/><rect x="-17" y="-10" width="34" height="6" fill="#8e44ad" stroke="${INK}" stroke-width="1.6"/><rect x="-24" y="-3" width="48" height="8" rx="4" fill="${G("#2b2b45")}" ${O}/>${spark(18,-32,.8)}</g>`)
    :`<g transform="translate(92 214)" ${N}><rect x="-17" y="-24" width="34" height="24" rx="4" fill="${G("#2b2b45")}" ${O}/><rect x="-24" y="-3" width="48" height="8" rx="4" fill="${G("#2b2b45")}" ${O}/></g>${place("t_magic",96,174,.68)}`}
  <rect y="228" width="400" height="72" fill="${LG("#2a0e1e","#1a0a14")}" ${N}/>
  <g ${N}>${[0,1,2,3,4,5,6,7].map(i=>`<rect x="${6+i*50}" y="244" width="42" height="34" rx="10" fill="${G("#c0283f")}" ${O2}/>`).join("")}</g>
  <g ${N}>${[0,1,2,3,4,5,6,7].map(i=>`<rect x="${-20+i*50}" y="268" width="48" height="36" rx="10" fill="${G("#a51c34")}" ${O2}/>`).join("")}</g>`},
 seats:{stretchBottom:false,name:"The Seats",pos:[1,1],bg:["#2a0e1e","#3a1a14"],exits:{up:"stage"},draw:F=>`
  <rect width="400" height="300" fill="${LG("#2a0e1e","#3a1a14")}"/>
  <g ${N}><rect x="70" y="10" width="260" height="70" rx="6" fill="${LG("#2a1238","#1a0b20")}" ${O}/><path d="M72 12 H160 Q130 46 150 78 H72 Z" fill="${G("#d8344f")}" ${O2}/><path d="M328 12 H240 Q270 46 250 78 H328 Z" fill="${G("#d8344f")}" ${O2}/>
  <rect x="62" y="76" width="276" height="12" rx="4" fill="${G("#c08050")}" ${O2}/>
  ${[[20,40],[380,40]].map(([x,y])=>`<rect x="${x-8}" y="${y-16}" width="16" height="30" rx="4" fill="${G("#ffd45c")}" ${O2}/><circle cx="${x}" cy="${y-6}" r="5" fill="#fff3a0"/>`).join("")}</g>
  <path d="M180 300 L192 96 H208 L220 300 Z" fill="${LG("#6a1a2a","#8a2a3a")}" ${N}/>
  <g ${N}>${[[110,6,40],[150,6,52],[196,6,64],[246,6,76]].map(([y,n,w],r)=>[0,1,2].map(i=>`<rect x="${174-(i+1)*(w+6)}" y="${y}" width="${w}" height="${w*.7}" rx="10" fill="${G(r%2?"#a51c34":"#c0283f")}" ${O2}/><rect x="${226+i*(w+6)}" y="${y}" width="${w}" height="${w*.7}" rx="10" fill="${G(r%2?"#a51c34":"#c0283f")}" ${O2}/>`).join("")).join("")}</g>
  ${place("t_plain",300,150,.5,{noShadow:true})}
  <g ${N}><rect x="226" y="196" width="64" height="45" rx="10" fill="${G("#c0283f")}" ${O2}/><rect x="296" y="196" width="64" height="45" rx="10" fill="${G("#c0283f")}" ${O2}/></g>
  ${act("popcorn","Popcorn",`<g transform="translate(88 236)"><path d="M-20 -24 H20 L14 18 H-14 Z" fill="${G("#ffffff")}" ${O}/>${[-12,-2,8].map(x=>`<path d="M${x} -24 L${x+3} 18" stroke="#e8423a" stroke-width="5"/>`).join("")}${(F.popcorn?[[-14,-30],[-4,-34],[8,-31],[16,-28],[0,-28],[-10,-38],[6,-40]]:[[-12,-28],[0,-30],[12,-27]]).map(([x,y])=>`<circle cx="${x}" cy="${y}" r="7" fill="${G("#fff6c8")}" ${O2}/>`).join("")}</g>`)}
  ${HELP("theater",200,250,.9)}`},
 backstage:{name:"Backstage",pos:[2,0],bg:["#4a3a5a","#5a3f2a"],exits:{left:"stage"},draw:F=>`
  <rect width="400" height="300" fill="${LG("#4a3a5a","#2e2338")}"/>
  <g ${N}>${[60,150,250,340].map(x=>`<path d="M${x} 0 V${x%100?120:90}" stroke="#c9b48a" stroke-width="3"/><rect x="${x-12}" y="${x%100?120:90}" width="24" height="30" rx="8" fill="${G("#a0703f")}" ${O2}/>`).join("")}
  <rect x="264" y="40" width="112" height="130" rx="8" fill="${G("#7a4523")}" ${O}/><rect x="276" y="52" width="88" height="96" rx="4" fill="${LG("#e6f4ff","#9fb6d0")}" ${O2}/>
  ${[0,1,2,3,4,5].map(i=>`<circle cx="${270+i*20}" cy="46" r="5" fill="#fff3a0" stroke="${INK}" stroke-width="1.4"/><circle cx="${270+i*20}" cy="164" r="5" fill="#fff3a0" stroke="${INK}" stroke-width="1.4"/>`).join("")}
  <path d="M296 70 L316 60 M330 120 L350 108" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".8"/></g>
  <rect y="210" width="400" height="100" fill="${LG("#8a5a33","#5a3f2a")}" ${O} ${N}/>
  <g ${N}><path d="M0 238 H400 M0 270 H400" stroke="#6a4428" stroke-width="2"/></g>
  <g ${N}><path d="M24 58 H220" stroke="${INK}" stroke-width="4" stroke-linecap="round"/><path d="M34 58 V222 M210 58 V222" stroke="${INK}" stroke-width="4"/><circle cx="34" cy="226" r="6" fill="#333"/><circle cx="210" cy="226" r="6" fill="#333"/></g>
  ${F.rack?place("t_lion",122,178,.72):""}
  ${!F.rack?act("rack","Costume rack",`${[["#2387d9",50],["#8e44ad",82],["#e8423a",114],["#3fb46a",146],["#ff8fbf",178]].map(([c,x])=>`<path d="M${x} 60 L${x-16} 74 L${x-12} 194 H${x+12} L${x+16} 74 Z" fill="${G(c)}" ${O2}/>`).join("")}<circle cx="138" cy="174" r="10" fill="#ffc44d" opacity=".0"/>`)
    :`<g ${N}>${[["#2387d9",50],["#8e44ad",70],["#e8423a",174],["#3fb46a",192]].map(([c,x])=>`<path d="M${x} 60 L${x-12} 74 L${x-9} 194 H${x+9} L${x+12} 74 Z" fill="${G(c)}" ${O2}/>`).join("")}</g>`}
  ${F.box?place("t_pirate",318,214,.62):""}
  ${act("box","Prop box",`<g transform="translate(318 254)"><rect x="-50" y="-26" width="100" height="44" rx="6" fill="${G("#a0703f")}" ${O}/><path d="M-50 -10 H50" stroke="${INK}" stroke-width="2"/><rect x="-10" y="-14" width="20" height="12" rx="3" fill="${G("#ffd45c")}" ${O2}/>${F.box?`<path d="M-50 -26 L-44 -54 H56 L50 -26 Z" fill="${G("#8a5a33")}" ${O2}/>`:`<rect x="-54" y="-34" width="108" height="12" rx="5" fill="${G("#8a5a33")}" ${O2}/>`}<text x="0" y="14" text-anchor="middle" font-family="Grandstander,sans-serif" font-weight="900" font-size="10" fill="#fff">PROPS</text></g>`)}`}},
 msg:{curtain:"The curtain opens!",hat:"Poof! Something popped out of the hat.",light:["The spotlight is on!","Lights off."],popcorn:"Crunch! Fresh popcorn.",rack:"You push the costumes aside.",box:"The prop box creaks open."}},
