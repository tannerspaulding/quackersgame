{id:"sea",n:3,name:"Under the Sea",start:"beach",
 ducks:[
  {id:"snorkel",name:"Snorkel Duck",tier:"Easy",area:"shallows",c:YEL,acc:"snorkel",hint:"Out for a swim"},
  {id:"sand",name:"Sandcastle Duck",tier:"Sneaky",area:"beach",c:{body:"#e8c98a",wing:"#d6b06e",beak:"#f08a2b"},hint:"Lives in a castle"},
  {id:"coral",name:"Coral Duck",tier:"Sneaky",area:"reef",c:{body:"#ff7aa8",wing:"#e0558a",beak:"#ffd43b"},hint:"Pink like the reef"},
  {id:"clam",name:"Clam Duck",tier:"Tricky",area:"reef",c:{body:"#fff4dc",wing:"#f0dfbf",beak:"#ff8a1f"},hint:"Shy, hides in a shell"},
  {id:"pirate",name:"Pirate Duck",tier:"Tricky",area:"cabin",c:YEL,acc:"pirate",hint:"Arr! Behind the barrel"},
  {id:"glow",name:"Glow Duck",tier:"Tricky",area:"trench",c:{body:"#9bffea",wing:"#5fe0c8",beak:"#ffd43b"},acc:"glow",hint:"Only seen with a light"},
  {id:"golden",name:"Golden Duck",tier:"Legendary",area:"cabin",c:{body:"#ffcf33",wing:"#e0a800",beak:"#ff8a1f"},acc:"gold",hint:"Locked away"}],
 areas:{
 beach:{name:"Sunny Beach",pos:[1,0],bg:["#8fd3ff","#e8c57e"],exits:{down:"shallows"},draw:F=>`
  ${sky("#8fd3ff","#e3f6ff")}${sun(330,46)}${cloud(40,62,.9)}${cloud(196,44,.65)}
  <path d="M-10 150 Q200 136 410 150 V210 H-10 Z" fill="${LG("#5cc4f0","#2a9fd6")}" ${O} ${N}/>
  <g ${N} stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".7"><path d="M30 166 q10 -6 20 0"/><path d="M150 176 q10 -6 20 0"/><path d="M300 168 q10 -6 20 0"/></g>
  <path d="M-10 196 Q120 180 210 192 Q320 178 410 196 V310 H-10 Z" fill="${LG("#ffe6a8","#e6c27a")}" ${O} ${N}/>
  <g ${N}><rect x="64" y="96" width="10" height="112" rx="5" fill="${LG("#c8925a","#9a6a3a")}" ${O2} transform="rotate(8 69 208)"/>
  ${[[-50,-8],[-24,-26],[8,-26],[34,-6]].map(([dx,dy])=>`<path d="M84 96 q${dx/2} ${dy-10} ${dx} ${dy+18}" stroke="${G("#3f9d3a")}" stroke-width="12" fill="none" stroke-linecap="round"/>`).join("")}
  <circle cx="80" cy="102" r="6" fill="${G("#8a5a33")}" ${O2}/><circle cx="90" cy="104" r="6" fill="${G("#8a5a33")}" ${O2}/></g>
  <g ${N}><path d="M250 268 V214 H268 V200 H282 V214 H298 V200 H312 V214 H330 V268 Z" fill="${LG("#f6dca0","#d9b46c")}" ${O}/><path d="M268 200 V188 h4 v4 h6 v-4 h4 V200" fill="${G("#f6dca0")}" ${O2}/>
  <path d="M276 188 V172 L290 178 L276 184" fill="${G("#ff6f61")}" ${O2}/></g>
  ${place("sand",290,250,.55)}
  <g ${N}><path d="M276 268 V244 Q290 228 304 244 V268 Z" fill="${G("#c79a55")}" opacity=".0"/></g>
  <g ${N}><path d="M150 236 L188 236 L182 276 L156 276 Z" fill="${G("#4fb3ff")}" ${O}/><path d="M152 236 Q169 214 186 236" fill="none" stroke="${INK}" stroke-opacity=".4" stroke-width="2"/><rect x="186" y="246" width="30" height="6" rx="3" fill="${G("#ffcb2f")}" ${O2} transform="rotate(-24 186 246)"/>
  <path d="M352 236 l6 -10 l6 10 l10 2 l-8 7 l2 10 l-10 -5 l-10 5 l2 -10 l-8 -7 z" fill="${G("#ff9f43")}" ${O2}/>
  <ellipse cx="40" cy="262" rx="30" ry="10" fill="${LG("#ff6f91","#e0477a")}" ${O2}/><path d="M14 262 H66" stroke="#fff" stroke-width="3" opacity=".7"/></g>`},
 shallows:{name:"Shallow Water",pos:[1,1],bg:["#5cc4f0","#dab675"],exits:{up:"beach",left:"reef",right:"wreck",down:"trench"},draw:F=>`
  <rect width="400" height="300" fill="${LG("#5cc4f0","#1f8ac4")}"/>
  <g ${N} opacity=".35">${[[60,0],[170,0],[300,0]].map(([x])=>`<path d="M${x} 0 L${x+40} 0 L${x+90} 300 L${x+30} 300 Z" fill="#ffffff" opacity=".35"/>`).join("")}</g>
  <path d="M-10 250 Q100 232 200 244 Q300 230 410 248 V310 H-10 Z" fill="${LG("#f3dca0","#d6b06e")}" ${O} ${N}/>
  ${seaweed(36,252,70)}${seaweed(58,256,48)}${seaweed(346,250,80)}${seaweed(370,254,54)}
  ${fish(110,96,1,"#ffcb2f")}${fish(290,70,-.8,"#ff7a7a")}${fish(250,150,.7,"#7fd04e")}
  ${bubbles(170,150)}${bubbles(320,200)}
  ${place("snorkel",200,136,.72,{noShadow:true})}
  <g ${N}><ellipse cx="130" cy="252" rx="22" ry="8" fill="${G("#b7b2a6")}" ${O2}/><path d="M270 248 l6 -10 l6 10 l10 2 l-8 7 l2 10 l-10 -5 l-10 5 l2 -10 l-8 -7 z" fill="${G("#ff6f61")}" ${O2}/></g>`},
 reef:{name:"Coral Reef",pos:[0,1],bg:["#48b4e8","#dab675"],exits:{right:"shallows"},draw:F=>`
  <rect width="400" height="300" fill="${LG("#48b4e8","#1d7fb8")}"/>
  <path d="M-10 246 Q120 230 220 242 Q320 230 410 246 V310 H-10 Z" fill="${LG("#f3dca0","#d6b06e")}" ${O} ${N}/>
  <g ${N}>${coral(60,250,"#ff7aa8",1.1)}${coral(150,248,"#ff9f43",.8)}${coral(212,252,"#ff7aa8",.95)}${coral(330,250,"#b48cff",1)}
  ${bushBall(110,236,20,"#ff6f91")}${bushBall(270,240,16,"#ffb35c")}</g>
  ${place("coral",196,206,.6)}
  ${fish(120,90,.9,"#4fb3ff")}${fish(310,120,-.9,"#ffcb2f")}${bubbles(60,140)}
  ${F.clam?`<g ${N}><g transform="translate(314 250) scale(1 .9)">${scallop("#ffc9d6","#ff9fb6")}</g></g>${place("clam",312,246,.5,{noShadow:true})}<g ${N}><path d="M278 252 Q314 274 350 252 Q314 262 278 252 Z" fill="${G("#ffb3c6")}" ${O}/><circle cx="332" cy="254" r="5" fill="${G("#ffffff")}" ${O2}/></g>`
   :act("clam","Big shell",`<g transform="translate(314 256)">${scallop("#ffc9d6","#ff9fb6")}</g>`)}`},
 wreck:{name:"Shipwreck",pos:[2,1],bg:["#2f8fc8","#b69861"],exits:{left:"shallows",down:"cabin"},doors:{cabin:"down"},draw:F=>`
  <rect width="400" height="300" fill="${LG("#2f8fc8","#155d8a")}"/>
  <path d="M-10 250 Q120 236 220 246 Q320 234 410 250 V310 H-10 Z" fill="${LG("#d9c08a","#b0925a")}" ${O} ${N}/>
  <g ${N}><path d="M60 250 L90 150 L330 140 L360 250 Z" fill="${LG("#8a5a3a","#5a3420")}" ${O} transform="rotate(-6 210 200)"/>
  <path d="M96 170 H326 M90 198 H340 M84 226 H348" stroke="#3a2414" stroke-width="3" opacity=".6" transform="rotate(-6 210 200)"/>
  <rect x="196" y="40" width="10" height="118" rx="4" fill="${LG("#a06a40","#6a4024")}" ${O2} transform="rotate(14 200 158)"/>
  <path d="M206 54 Q262 70 246 120 L210 112 Z" fill="${G("#e8e0c8")}" opacity=".7" ${O2} transform="rotate(14 200 158)"/>
  ${[130,280].map(x=>`<circle cx="${x}" cy="182" r="9" fill="${G("#2a1f1a")}" ${O2}/>`).join("")}</g>
  ${door("cabin","Hatch down into the cabin",`<rect x="180" y="176" width="56" height="34" rx="6" fill="${LG("#3a2414","#1a0f06")}" ${O}/><path d="M184 186 H232 M184 198 H232" stroke="#6a4024" stroke-width="3"/>`)}
  ${tagAt(208,168,"HATCH")}
  ${fish(330,80,-.8,"#ffcb2f")}${bubbles(90,110)}${seaweed(30,252,60)}${seaweed(376,254,46)}`},
 cabin:{stretchTop:false,name:"Captain's Cabin",pos:[2,2],bg:["#6a4430","#412917"],exits:{up:"wreck"},doors:{wreck:"up"},draw:F=>`
  <rect width="400" height="300" fill="${LG("#6a4430","#3e2618")}"/>
  <g ${N}>${Array.from({length:9},(_,i)=>`<path d="M0 ${i*34+10} H400" stroke="#2a190c" stroke-width="2" opacity=".5"/>`).join("")}
  <circle cx="84" cy="96" r="30" fill="${G("#c8963a")}" ${O}/><circle cx="84" cy="96" r="22" fill="${LG("#5cc4f0","#1f8ac4")}" ${O2}/>${fish(84,98,.5,"#ffcb2f")}</g>
  <rect y="236" width="400" height="80" fill="${LG("#5a3a24","#3a2414")}" ${O} ${N}/>
  ${door("wreck","Ladder back up to the ship",`<rect x="196" y="0" width="44" height="150" fill="transparent"/><path d="M200 0 V146 M236 0 V146" stroke="${G("#a06a40")}" stroke-width="6"/><path d="M200 20 H236 M200 50 H236 M200 80 H236 M200 110 H236 M200 140 H236" stroke="${G("#a06a40")}" stroke-width="5"/>`)}
  ${tagAt(218,164,"UP")}
  ${place("pirate",112,204,.58)}
  <g ${N}><rect x="36" y="186" width="72" height="62" rx="18" fill="${LG("#b07a48","#7a4a24")}" ${O}/><path d="M36 204 H108 M36 230 H108" stroke="#4a2a14" stroke-width="4"/></g>
  ${F.chest?`<g ${N}><rect x="290" y="208" width="84" height="40" rx="6" fill="${LG("#a06a40","#6a4024")}" ${O}/><path d="M290 208 Q332 168 374 208" fill="${G("#8a5a3a")}" ${O} transform="rotate(-24 290 208)"/><circle cx="332" cy="214" r="18" fill="#ffe066" opacity=".35"/></g>${place("golden",332,206,.5,{noShadow:true})}`
   :act("chest",F.key?"Treasure chest, you have the key":"Treasure chest",`<rect x="290" y="208" width="84" height="40" rx="6" fill="${LG("#a06a40","#6a4024")}" ${O}/><path d="M290 210 Q332 176 374 210 Z" fill="${G("#8a5a3a")}" ${O}/><rect x="324" y="204" width="16" height="18" rx="4" fill="${G("#ffcb2f")}" ${O2}/><circle cx="332" cy="212" r="2.4" fill="${INK}"/>`)}
  <g ${N}><rect x="150" y="196" width="70" height="44" rx="6" fill="${G("#8a5a3a")}" ${O}/><rect x="160" y="182" width="12" height="16" rx="4" fill="${G("#e8e0c8")}" ${O2}/><path d="M166 182 q-4 -8 0 -12 q4 4 0 12" fill="${G("#ffcb2f")}"/></g>`},
 trench:{name:"Deep Trench",pos:[1,2],bg:["#0a2a4d","#0c121a"],exits:{up:"shallows"},draw:F=>`
  <rect width="400" height="300" fill="${LG(F.lamp?"#0e3a66":"#0a2a4d","#030c1a")}"/>
  ${F.lamp?`<circle cx="230" cy="150" r="150" fill="#9bffea" opacity=".08" ${N}/><circle cx="230" cy="150" r="90" fill="#9bffea" opacity=".08" ${N}/>`:""}
  <path d="M-10 262 Q100 248 200 256 Q300 246 410 262 V310 H-10 Z" fill="${LG(F.lamp?"#3a4a5a":"#141c26","#0a1018")}" ${O} ${N}/>
  <g ${N}><path d="M-10 0 L40 0 L60 120 L20 300 L-10 300 Z" fill="${F.lamp?"#22344a":"#0b1626"}"/><path d="M410 0 L350 0 L330 140 L372 300 L410 300 Z" fill="${F.lamp?"#22344a":"#0b1626"}"/></g>
  ${act("lamp",F.lamp?"Glowing fish, light on":"Sleepy fish with a light",`<g transform="translate(120 140)"><path d="M-30 0 Q-6 -26 26 0 Q-6 26 -30 0 Z" fill="${G("#3a4a7a")}" ${O}/><path d="M26 0 L42 -12 L42 12 Z" fill="${G("#3a4a7a")}" ${O2}/><circle cx="-16" cy="-3" r="3" fill="#fff"/><path d="M-22 -14 Q-30 -40 -12 -46" fill="none" stroke="${INK}" stroke-opacity=".5" stroke-width="2"/><circle cx="-12" cy="-46" r="${F.lamp?8:5}" fill="${F.lamp?G("#e9fffa"):"#5b6a99"}" ${O2}/>${F.lamp?`<circle cx="-12" cy="-46" r="18" fill="#9bffea" opacity=".35"/>`:""}</g>`)}
  ${F.lamp?place("glow",250,196,.6,{noShadow:true}):""}
  ${F.lamp&&!F.key?act("key","Shiny key",`<g transform="translate(320 250) rotate(-20)"><circle r="8" fill="none" stroke="${G("#ffcb2f")}" stroke-width="4"/><path d="M8 0 H28 M22 0 V7 M28 0 V6" stroke="#ffcb2f" stroke-width="4" stroke-linecap="round"/></g>`):""}
  ${F.lamp?"":tagAt(250,214,"So dark down here...","#5b7ab0")}
  ${F.lamp?`${seaweed(170,262,40,"#2f7a6a")}${seaweed(360,264,30,"#2f7a6a")}`:""}`}
 },
 msg:{clam:"The clam opens up!",lamp:["The fish's light glows bright!","Back to the dark..."],key:"You found a key! It must open something."}},
