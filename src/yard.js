{id:"yard",n:1,name:"The Backyard",start:"yard",
 idea:"Mitchell's game: move between areas, tap things to open them, and fill the Duck Log. In this test you swipe to move, or tap the gate, the flower arch, the tree or a small edge label.",
 ducks:[
  {id:"normal",name:"Normal Duck",tier:"Easy",area:"yard",c:YEL,hint:"Out in the open"},
  {id:"mail",name:"Mail Duck",tier:"Sneaky",area:"yard",c:{body:"#ffd9a0",wing:"#f2b866",beak:"#ff8a3d"},acc:"mail",hint:"Got a letter?"},
  {id:"leaf",name:"Leaf Duck",tier:"Sneaky",area:"garden",c:{body:"#8fc94f",wing:"#5e9330",beak:"#e0b43a"},acc:"leaf",hint:"Likes bushes"},
  {id:"rock",name:"Rock Duck",tier:"Sneaky",area:"pond",c:{body:"#aaa59a",wing:"#8a857b",beak:"#e07b2f"},acc:"rock",hint:"Hides by the water"},
  {id:"tiny",name:"Tiny Duck",tier:"Tricky",area:"treetop",c:YEL,hint:"Way up high"},
  {id:"bubble",name:"Bubble Duck",tier:"Tricky",area:"house",c:{body:"#ff9ec7",wing:"#f57ab0",beak:"#ff8a3d"},acc:"bubble",hint:"Loves bath time"}],
 areas:{
 yard:{name:"Front Yard",pos:[1,1],bg:["#8fd3ff","#4fa83a"],exits:{left:"garden",right:"pond",up:"treetop"},doors:{house:"down"},draw:F=>`
  ${sky("#8fd3ff","#dff4ff")}${sun(262,42)}${cloud(40,74,1)}${cloud(190,52,.75)}
  <path d="M-10 196 Q80 128 190 178 Q290 136 410 184 V300 H-10Z" fill="${LG("#b0e586","#6cc24a")}" ${O}/>
  <g ${N}><rect x="196" y="182" width="56" height="9" rx="4.5" fill="#e3edf7" ${O2}/><rect x="298" y="182" width="112" height="9" rx="4.5" fill="#e3edf7" ${O2}/>${[202,226].map(x=>`<path d="M${x} 206 V184 Q${x+8} 172 ${x+16} 184 V206 Z" fill="${LG("#ffffff","#dde8f3")}" ${O2}/>`).join("")}</g>
  ${door("treetop","Climb the tree to the Treetop",`<rect x="330" y="66" width="80" height="150" fill="transparent"/><g ${N}><rect x="372" y="120" width="18" height="90" rx="6" fill="${LG("#b5835a","#8a5a33")}" ${O}/><path d="M376 196 h10 M376 180 h10 M376 164 h10 M376 148 h10" stroke="${INK}" stroke-width="2" opacity=".55"/>${bushBall(378,104,34,"#55b33e")}${bushBall(350,128,22,"#55b33e")}</g>`)}
  <g ${N}><rect x="38" y="128" width="116" height="86" rx="12" fill="${LG("#ff8f7f","#e0503f")}" ${O}/>
  <path d="M26 136 L96 80 L166 136 Q96 126 26 136 Z" fill="${LG("#9a7ae0","#5a3a8a")}" ${O}/>
  <rect x="52" y="146" width="32" height="28" rx="7" fill="${LG("#d8f2ff","#8fd0ff")}" ${O}/><path d="M68 146 V174 M52 160 H84" stroke="${INK}" stroke-width="2.4"/><path d="M57 151 h6" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
  </g>${door("house","Front door into the house",`<rect x="102" y="160" width="34" height="54" rx="13" fill="${LG("#8a62c4","#5a3a8a")}" ${O}/><circle cx="127" cy="190" r="3.4" fill="${G("#ffcb2f")}" stroke="${INK}" stroke-width="2"/>`)}
  <path d="M-10 214 Q100 198 200 214 Q300 228 410 208 V310 H-10 Z" fill="${LG("#97dc6e","#4fa83a")}" ${O}/>
  <g ${N}>${[[120,228,13,5],[138,244,14,5.5],[160,262,16,6]].map(([x,y,a,b])=>`<ellipse cx="${x}" cy="${y}" rx="${a}" ry="${b}" fill="${G("#efe8da")}" ${O2}/>`).join("")}
  ${flower(60,262,"#ffffff")}${flower(270,276,"#ff9f43")}${flower(380,252,"#ff6fa6")}</g>
  ${door("garden","Flower arch to the Garden",`<rect x="0" y="140" width="38" height="96" fill="transparent"/><g ${N}><path d="M6 236 V176 Q6 146 22 146 Q38 146 38 176 V236" fill="none" stroke="#3f8a2e" stroke-width="5" stroke-linecap="round"/>${[[6,214],[6,190],[10,164],[22,148],[34,164],[38,190],[38,214]].map(([x,y],i)=>flower(x,y,["#ff6fa6","#ffffff","#ff9f43","#ff6fa6","#b48cff","#ffffff","#ff6fa6"][i])).join("")}</g>`)}
  ${door("pond","Fence gate to the Duck Pond",`<rect x="250" y="160" width="50" height="52" fill="transparent"/><g ${N}><rect x="250" y="170" width="6" height="40" rx="3" fill="${G("#c89260")}" ${O2}/><rect x="292" y="170" width="6" height="40" rx="3" fill="${G("#c89260")}" ${O2}/>
   <path d="M256 186 L272 178 V206 L256 210 Z" fill="${LG("#ffffff","#dde8f3")}" ${O2}/><path d="M292 186 L280 180 V206 L292 210 Z" fill="${LG("#ffffff","#dde8f3")}" ${O2}/>
   <path d="M248 172 Q274 154 300 172" fill="none" stroke="#c89260" stroke-width="5" stroke-linecap="round"/><ellipse cx="274" cy="214" rx="20" ry="4" fill="${G("#efe8da")}" ${O2}/></g>`)}
  ${place("normal",218,244,.95)}${T("a1",72,236)}${T("a2",360,268)}
  <rect x="320" y="196" width="11" height="58" rx="4" fill="${LG("#b5835a","#8a5a33")}" ${O} ${N}/>
  ${F.mail ? place("mail",300,184,.58,{flip:true,noShadow:true}) : ""}
  ${act("mail","Mailbox",`<path d="M300 198 V178 Q300 162 316 162 H334 Q350 162 350 178 V198 Z" fill="${LG("#7cc0ff","#2387d9")}" ${O}/>
   <ellipse cx="312" cy="170" rx="6" ry="3" fill="#fff" opacity=".6"/>
   ${F.mail ? `<path d="M300 198 L282 206 L282 186 L300 178 Z" fill="${LG("#7cc0ff","#2387d9")}" ${O}/>` : `<path d="M300 198 V178 Q300 166 308 163" fill="none" ${O2}/>`}
   <path d="M350 186 h8 v-18 h14 v9 h-14" fill="${G("#ff5c5c")}" ${O2}/>`)}`},
 garden:{name:"Garden",pos:[0,1],bg:["#8fd3ff","#4fa83a"],exits:{right:"yard"},draw:F=>`
  ${sky("#8fd3ff","#e6f7ff")}${cloud(250,60,.9)}
  <path d="M-10 170 Q200 140 410 168 V300 H-10Z" fill="${LG("#a5de7c","#5fb244")}" ${O}/>
  <g ${N}>${[[30,150],[70,140],[110,148]].map(([x,y])=>`<path d="M${x} 260 V${y+20}" stroke="#3f8a2e" stroke-width="5"/><g transform="translate(${x} ${y})">${Array.from({length:10},(_,k)=>`<ellipse cx="0" cy="-14" rx="5" ry="10" fill="${G("#ffcb2f")}" stroke="${INK}" stroke-width="1.8" transform="rotate(${k*36})"/>`).join("")}<circle r="10" fill="${G("#8a5a33")}" ${O2}/></g>`).join("")}</g>
  <path d="M-10 236 Q200 222 410 238 V310 H-10Z" fill="${LG("#97dc6e","#4fa83a")}" ${O}/>
  <g ${N}><rect x="196" y="214" width="190" height="34" rx="10" fill="${LG("#a4673a","#7a4523")}" ${O}/>${[218,256,294,332,366].map((x,i)=>flower(x,208,["#ff6fa6","#ffffff","#ff9f43","#b48cff","#ff6fa6"][i])).join("")}</g>
  ${H("turkey",168,226,.8)}${place("leaf",104,206,.9)}
  <g ${N}>${bushBall(70,236,30)}${bushBall(118,230,34)}${bushBall(160,244,24)}</g>
  ${T("a3",330,278)}${act("can","Watering can",`<g transform="translate(250 268)"><path d="M-22 -18 H14 V12 Q14 18 8 18 H-16 Q-22 18 -22 12 Z" fill="${G("#6fb7ff")}" ${O}/><path d="M14 -10 L36 -26 L40 -22 L16 0" fill="${G("#6fb7ff")}" ${O2}/><path d="M-16 -18 Q-4 -34 8 -18" fill="none" ${O}/>${F.can?`<g fill="#8fd0ff" stroke="${INK}" stroke-width="1.6"><ellipse cx="44" cy="-14" rx="2.6" ry="4"/><ellipse cx="50" cy="-4" rx="2.6" ry="4"/><ellipse cx="42" cy="2" rx="2.6" ry="4"/></g>`:""}</g>`)}
  ${door("yard","Path back to the Front Yard",`<rect x="352" y="250" width="48" height="50" fill="transparent"/><g ${N}>${[[366,288,12,5],[382,270,11,4.5],[394,256,9,4]].map(([x,y,a,b])=>`<ellipse cx="${x}" cy="${y}" rx="${a}" ry="${b}" fill="${G("#efe8da")}" ${O2}/>`).join("")}</g>`)}`},
 pond:{name:"Duck Pond",pos:[2,1],bg:["#8fd3ff","#6cc24a"],exits:{left:"yard"},draw:F=>`
  ${sky("#8fd3ff","#e6f7ff")}${sun(60,50)}${cloud(220,64,.85)}
  <path d="M-10 160 Q120 120 250 150 Q330 166 410 140 V300 H-10Z" fill="${LG("#b0e586","#6cc24a")}" ${O}/>
  <ellipse cx="196" cy="236" rx="168" ry="50" fill="${LG("#7cc8ff","#2387d9")}" ${O}/>
  <g ${N}><path d="M90 226 q16 -6 32 0 M230 252 q16 -6 32 0 M160 270 q12 -4 24 0" stroke="#fff" stroke-width="3" stroke-linecap="round" fill="none" opacity=".7"/>
  <path d="M94 250 a16 9 0 1 1 18 6 L102 250 Z" fill="${G("#5fbf45")}" ${O2}/><path d="M270 222 a14 8 0 1 1 16 6 L278 222 Z" fill="${G("#5fbf45")}" ${O2}/></g>
  <g ${N}>${[[24,140],[38,130],[50,146]].map(([x,y])=>`<path d="M${x} 240 V${y+14}" stroke="#3f8a2e" stroke-width="4"/><rect x="${x-5}" y="${y}" width="10" height="24" rx="5" fill="${G("#8a5a33")}" ${O2}/>`).join("")}</g>
  <g ${N}>${rock(340,210,26,16)}</g>${place("rock",332,196,.78)}<g ${N}>${rock(312,226,22,14)}${rock(360,232,24,15)}</g>${T("a4",118,272)}
  ${door("yard","Stepping stones back to the Front Yard",`<rect x="0" y="262" width="56" height="38" fill="transparent"/><g ${N}>${[[12,290,11,4.5],[30,280,10,4],[46,292,9,4]].map(([x,y,a,b])=>`<ellipse cx="${x}" cy="${y}" rx="${a}" ry="${b}" fill="${G("#d9d3c7")}" ${O2}/>`).join("")}</g>`)}`},
 treetop:{name:"Treetop",pos:[1,0],bg:["#a6dcff","#7a4523"],exits:{down:"yard"},draw:F=>`
  ${sky("#a6dcff","#e9f8ff")}${cloud(250,70,1)}${cloud(40,110,.7)}
  <g ${N}>${bushBall(-10,40,60,"#55b33e")}${bushBall(60,10,44,"#55b33e")}${bushBall(400,30,64,"#4fa83a")}</g>
  <path d="M-10 230 Q140 196 290 214 Q350 220 410 196 L410 222 Q350 246 290 240 Q140 226 -10 262 Z" fill="${LG("#b5835a","#7a4523")}" ${O} ${N}/>
  <g ${N}>${bushBall(340,190,26,"#5fbf45")}${bushBall(380,200,22,"#5fbf45")}</g>
  ${place("tiny",206,200,.5,{noShadow:true})}${T("a5",36,238)}
  <g ${N}><path d="M174 206 Q206 232 238 206 Q236 222 206 226 Q176 222 174 206 Z" fill="${G("#c89260")}" ${O}/><path d="M180 212 l10 4 M196 218 l12 -2 M214 216 l14 -6" stroke="${INK}" stroke-width="1.8"/></g>
  ${act("birdhouse","Birdhouse",`<g transform="translate(96 150)"><path d="M0 -60 V-34" stroke="${INK}" stroke-width="2.4"/><path d="M-26 -14 L0 -36 L26 -14 Z" fill="${G("#ff6f61")}" ${O}/><rect x="-20" y="-16" width="40" height="38" rx="6" fill="${G("#ffe6a8")}" ${O}/><circle cx="0" cy="2" r="7" fill="#173a5e"/>${F.birdhouse?`<text x="0" y="-44" text-anchor="middle" font-family="Grandstander,sans-serif" font-weight="900" font-size="14" fill="${INK}">tweet!</text>`:""}</g>`)}
  ${door("yard","Rope ladder down to the Front Yard",`<rect x="282" y="226" width="40" height="74" fill="transparent"/><g ${N}><path d="M290 232 Q288 266 292 300 M314 230 Q316 266 312 300" stroke="#c89260" stroke-width="4" fill="none" stroke-linecap="round"/>${[246,262,278,294].map(y=>`<path d="M290 ${y} H314" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><path d="M290 ${y} H314" stroke="#e0b07a" stroke-width="3" stroke-linecap="round"/>`).join("")}</g>`)}`},
 house:{name:"Inside the House",pos:[1,2],bg:["#ffe9c2","#c98d5a"],exits:{up:"yard"},doors:{yard:"up"},draw:F=>`
  <rect width="400" height="300" fill="${LG("#fff1d2","#ffd99a")}"/>
  <g ${N} opacity=".5">${[0,1,2,3,4,5,6,7,8,9].map(i=>`<path d="M${i*44+10} 0 V232" stroke="#ffe6b0" stroke-width="10"/>`).join("")}</g>
  <rect y="226" width="400" height="80" fill="${LG("#d9a06a","#a8693a")}" ${O} ${N}/>
  <g ${N}>${[0,1,2,3,4,5,6,7].map(i=>`<path d="M${i*56-10} 226 L${i*56-40} 300" stroke="#9a5e32" stroke-opacity=".5" stroke-width="2"/>`).join("")}</g>
  <g ${N}><rect x="148" y="52" width="76" height="60" rx="8" fill="${LG("#bfe8ff","#8fd0ff")}" ${O}/><path d="M186 52 V112 M148 82 H224" stroke="#fff" stroke-width="5"/><rect x="142" y="110" width="88" height="8" rx="4" fill="${G("#c89260")}" ${O2}/>
  <path d="M144 50 Q150 90 140 118 L154 118 Q160 86 156 50 Z M228 50 Q222 90 232 118 L218 118 Q212 86 216 50 Z" fill="${G("#ff6fa6")}" ${O2}/>
  <rect x="268" y="56" width="44" height="36" rx="5" fill="${G("#ffffff")}" ${O}/><path d="M274 86 L286 70 L296 80 L302 74 L308 86 Z" fill="${G("#7fd04e")}" ${O2}/><circle cx="300" cy="66" r="4" fill="${G("#ffe066")}" ${O2}/></g>
  ${door("yard","Front door back out to the yard",`<rect x="20" y="116" width="58" height="112" rx="16" fill="${LG("#8a62c4","#5a3a8a")}" ${O}/><circle cx="66" cy="176" r="4.4" fill="${G("#ffcb2f")}" stroke="${INK}" stroke-width="2"/><rect x="30" y="128" width="38" height="30" rx="8" fill="${LG("#d8f2ff","#8fd0ff")}" ${O2}/>`)}
  ${tagAt(49,108,"OUTSIDE")}
  <g ${N}><rect x="296" y="230" width="12" height="20" rx="4" fill="${G("#b7c3d4")}" ${O2}/><rect x="356" y="230" width="12" height="20" rx="4" fill="${G("#b7c3d4")}" ${O2}/>
  <path d="M368 150 V136 Q368 126 356 126 H350" fill="none" stroke="#b7c3d4" stroke-width="6" stroke-linecap="round"/><circle cx="350" cy="132" r="4" fill="${G("#b7c3d4")}" ${O2}/></g>
  ${F.tap?`<g ${N}><path d="M350 136 Q348 156 346 176" stroke="#8fd0ff" stroke-width="5" stroke-linecap="round" opacity=".85"/></g>`:""}
  ${place("bubble",300,186,.72,{noShadow:true})}
  <g ${N}>${[[214,184,15],[236,176,13],[258,184,12],[338,182,14],[360,176,12],[382,186,13],[280,190,10],[226,196,11]].concat(F.tap?[[248,164,12],[332,164,13],[372,160,10],[300,168,9],[216,166,9],[262,170,8]]:[]).map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${G("#ffffff")}" ${O2}/>`).join("")}</g>
  <path d="M200 190 H394 V214 Q394 236 368 236 H226 Q200 236 200 214 Z" fill="${LG("#ffffff","#dde8f3")}" ${O} ${N}/>
  ${act("tap","Bath tap",`<rect x="340" y="140" width="34" height="22" fill="transparent"/><path d="M344 150 h18" stroke="${INK}" stroke-opacity=".5" stroke-width="5" stroke-linecap="round"/><circle cx="353" cy="146" r="5" fill="${G(F.tap?"#4cd2a0":"#ff7a7a")}" ${O2}/>`)}
  <g ${N}><rect x="100" y="208" width="70" height="22" rx="8" fill="${G("#3fb86a")}" ${O}/><path d="M108 214 h54 M108 222 h54" stroke="#fff" stroke-opacity=".5" stroke-width="2"/></g>
  ${T("a6",134,196)}`}
 },
 msg:{tap:["Splish! The bath fills with bubbles.","Tap off."],mail:"The mailbox flips open!",can:"Splish splash!",birdhouse:"Nobody home but a tweet."}},
