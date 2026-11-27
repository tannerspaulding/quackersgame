{id:"castle",n:9,name:"Fairy Tale Kingdom",start:"courtyard",
 idea:"Mitchell's world: a fairy tale kingdom with a castle throne room, a princess tower, a fairy garden and a dragon's cave. Look for dragon ducks, a purple princess duck and fairy ducks. The Unicorn lost its rainbow gems all over the kingdom, and every duck you find gives one back.",
 helper:{name:"Unicorn",token:"rainbow gem",plural:"rainbow gems",icon:"gem",art:toyUnicorn,reward:"It gallops a rainbow right over the castle!"},
 hide:{k_frog:"well",k_princess:"curtain",k_knight:"armor",k_sleepy:"pillow",k_jester:"toybox",k_flower:"flower",k_mush:"mushroom",k_sparkle:"stump",k_baby:"egg",k_fire:"gold"},
 ducks:[
  {id:"k_plain",name:"Yellow Duck",tier:"Easy",area:"courtyard",c:YEL,hint:"Sitting by the hedge"},
  {id:"k_frog",name:"Frog Prince Duck",tier:"Sneaky",area:"courtyard",c:{body:"#7fd04e",wing:"#4f9f2e",beak:"#ff8a3d"},acc:"crown",hint:"Make a wish"},
  {id:"k_knight",name:"Knight Duck",tier:"Sneaky",area:"throne",c:YEL,acc:"knight",hint:"Guarding the throne room"},
  {id:"k_princess",name:"Purple Princess Duck",tier:"Rare",area:"throne",c:{body:"#c79bff",wing:"#a06be8",beak:"#ff8a3d"},acc:"gown tiara",hint:"Sitting where a royal should"},
  {id:"k_sleepy",name:"Sleepy Duck",tier:"Rare",area:"tower",c:{body:"#ffe3f4",wing:"#ffc2e0",beak:"#ff8a3d"},acc:"nightcap",hint:"Napping in the royal bed"},
  {id:"k_jester",name:"Jester Duck",tier:"Tricky",area:"tower",c:{body:"#ffb3dc",wing:"#ff8fc4",beak:"#ff8a3d"},acc:"jester",hint:"Ready to pop out and surprise you"},
  {id:"k_flower",name:"Flower Fairy Duck",tier:"Sneaky",area:"garden",c:{body:"#ffc2e0",wing:"#ff9ec7",beak:"#ff8a3d"},acc:"fwings flowers",hint:"Waiting for a flower to bloom"},
  {id:"k_mush",name:"Mushroom Fairy Duck",tier:"Tricky",area:"garden",c:{body:"#fff4dc",wing:"#f0dfbf",beak:"#ff8a3d"},acc:"fwings mushcap",hint:"Under a spotty umbrella"},
  {id:"k_sparkle",name:"Sparkle Fairy Duck",tier:"Rare",area:"garden",c:{body:"#bff6ff",wing:"#7fd6ff",beak:"#ff8a3d"},acc:"fwings wand glow",hint:"Home sweet tiny home"},
  {id:"k_baby",name:"Baby Dragon Duck",tier:"Tricky",area:"cave",c:{body:"#8fe7c8",wing:"#4fc0a0",beak:"#ffb066"},acc:"dwgreen horns spikes",hint:"Not hatched yet"},
  {id:"k_fire",name:"Fire Dragon Duck",tier:"Rare",area:"cave",c:{body:"#ff8a6a",wing:"#e8423a",beak:"#ffb066"},acc:"dwred horns spikes fire",hint:"Guarding the treasure"},
  {id:"k_unicorn",name:"Unicorn",tier:"Legendary",area:"courtyard",helper:true,art:()=>toyUnicorn(true),hint:"Bring the rainbow gems back to the Unicorn"}],
 areas:{
 courtyard:{name:"Castle Courtyard",pos:[1,1],bg:["#ffd6ec","#5fbf45"],exits:{up:"throne",left:"garden",right:"cave"},doors:{throne:"up"},draw:F=>`
  <rect width="400" height="300" fill="${LG("#ffd6ec","#d9ecff")}"/>
  <g ${N}><ellipse cx="70" cy="34" rx="34" ry="11" fill="#fff" opacity=".85"/><ellipse cx="92" cy="28" rx="20" ry="10" fill="#fff" opacity=".85"/><ellipse cx="330" cy="22" rx="30" ry="9" fill="#fff" opacity=".8"/>
  ${[[52,"#b45cff"],[348,"#ff6fa6"]].map(([x,c])=>`<rect x="${x-26}" y="62" width="52" height="150" fill="${G("#efe8fb")}" ${O}/><path d="M${x-32} 64 L${x} 6 L${x+32} 64 Z" fill="${G(c)}" ${O}/><path d="M${x} 6 V-8" stroke="${INK}" stroke-opacity=".5" stroke-width="2.4"/><path d="M${x} -8 L${x+18} -3 L${x} 2 Z" fill="${c==="#b45cff"?"#ff6fa6":"#b45cff"}"/><rect x="${x-8}" y="96" width="16" height="24" rx="8" fill="#5a3790"/>`).join("")}
  <rect x="78" y="80" width="244" height="132" fill="${G("#e6def5")}" ${O}/>
  ${[0,1,2,3,4,5,6,7,8,9,10].map(i=>`<rect x="${80+i*22}" y="68" width="14" height="14" fill="${G("#e6def5")}" ${O2}/>`).join("")}
  ${[[110,100],[280,100]].map(([x,y])=>`<path d="M${x-10} ${y+26} V${y+8} Q${x-10} ${y-2} ${x} ${y-2} Q${x+10} ${y-2} ${x+10} ${y+8} V${y+26} Z" fill="#5a3790"/>`).join("")}
  ${[[100,150],[150,170],[250,160],[300,180],[130,110],[270,130]].map(([x,y])=>`<path d="M${x} ${y} h18 M${x+6} ${y+10} h16" stroke="${INK}" stroke-opacity=".14" stroke-width="2"/>`).join("")}
  <path d="M158 80 Q200 50 242 80" fill="none" stroke="#ffd45c" stroke-width="5"/>${crownAt(200,74)}</g>
  ${door("throne","Go into the castle",`<g transform="translate(200 212)"><path d="M-36 0 V-56 Q-36 -84 0 -84 Q36 -84 36 -56 V0 Z" fill="${G("#a0703f")}" ${O}/><path d="M0 -84 V0 M-36 -44 H36 M-36 -18 H36" stroke="#7a4b26" stroke-width="2.4"/><circle cx="-8" cy="-34" r="3.4" fill="#ffd45c"/><circle cx="8" cy="-34" r="3.4" fill="#ffd45c"/><path d="M-42 0 V-58 Q-42 -92 0 -92 Q42 -92 42 -58 V0" fill="none" stroke="${G("#cfc3e6")}" stroke-width="8"/></g>`)}
  <rect y="208" width="400" height="100" fill="${LG("#8fe07a","#5fbf45")}" ${O} ${N}/>
  <g ${N}><path d="M164 212 L236 212 L280 300 L120 300 Z" fill="${G("#d9cfe6")}" ${O}/>${[232,256,282].map((y,i)=>`<path d="M${170-i*16} ${y} H${230+i*16}" stroke="${INK}" stroke-opacity=".16" stroke-width="2"/>`).join("")}
  ${[[262,224,22],[300,230,26],[372,222,30],[24,216,24]].map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${G("#4fae3f")}" ${O2}/>`).join("")}
  ${[[270,214,"#ff6fa6"],[296,222,"#ffe066"],[366,210,"#b45cff"],[380,232,"#ff6fa6"],[20,210,"#ffe066"]].map(([x,y,c])=>`<circle cx="${x}" cy="${y}" r="4" fill="${c}"/>`).join("")}</g>
  ${act("well","Wishing well",`<g transform="translate(84 236)"><path d="M-34 -64 V-2 M34 -64 V-2" stroke="${G("#a0703f")}" stroke-width="7" stroke-linecap="round"/><path d="M-44 -62 L0 -88 L44 -62 Z" fill="${G("#e8423a")}" ${O}/><path d="M-30 -56 H30" stroke="#7a4b26" stroke-width="4"/>
   ${F.well?`<path d="M18 -56 V-36" stroke="#7a4b26" stroke-width="2"/><path d="M10 -36 H26 L24 -22 H12 Z" fill="${G("#a0703f")}" ${O2}/><ellipse cx="18" cy="-36" rx="8" ry="2" fill="#7fd6ff"/>`:`<path d="M0 -56 V-40" stroke="#7a4b26" stroke-width="2"/><path d="M-8 -40 H8 L6 -26 H-6 Z" fill="${G("#a0703f")}" ${O2}/>`}
   <path d="M-40 -10 Q0 -20 40 -10 V24 Q0 34 -40 24 Z" fill="${G("#cfc3e6")}" ${O}/><ellipse cx="0" cy="-12" rx="40" ry="9" fill="${G("#2387d9")}" ${O2}/>${[-26,-6,14,30].map((x,i)=>`<path d="M${x} ${i%2?2:12} h12" stroke="${INK}" stroke-opacity=".2" stroke-width="2"/>`).join("")}</g>`)}
  ${F.well?place("k_frog",76,214,.42,{noShadow:true}):""}
  ${place("k_plain",330,268,.42)}
  ${HELP("castle",258,264,.72)}`},
 throne:{name:"Throne Room",pos:[1,0],bg:["#7b4fb8","#cfc3e6"],stretchTop:false,exits:{down:"courtyard",right:"tower"},doors:{tower:"right"},draw:F=>`
  <rect width="400" height="300" fill="${LG("#8a5ccc","#5a3790")}"/>
  <g ${N}><path d="M166 104 V52 Q166 18 200 18 Q234 18 234 52 V104 Z" fill="${G("#ffd45c")}" ${O}/><path d="M174 98 V54 Q174 28 200 28 Q226 28 226 54 V98 Z" fill="#2a1f50"/>
  ${[["M174 98 V54 Q174 28 200 28 V98 Z","#ff6fa6"],["M200 28 Q226 28 226 54 V98 H200 Z","#4fb3ff"],["M174 74 H226 V98 H174 Z","#ffe066"]].map(([d,c])=>`<path d="${d}" fill="${c}" opacity=".75"/>`).join("")}<path d="M200 28 V98 M174 74 H226" stroke="#2a1f50" stroke-width="3"/>
  ${[64,336].map(x=>`<path d="M${x-22} 0 V96 L${x} 82 L${x+22} 96 V0 Z" fill="${G("#e8423a")}" ${O}/>${crownAt(x,52)}`).join("")}
  ${[118,282].map(x=>`<rect x="${x-4}" y="104" width="8" height="22" fill="${G("#ffd45c")}" ${O2}/><path d="M${x} 104 q-6 -10 0 -18 q6 8 0 18 Z" fill="#ffb84a"/>`).join("")}</g>
  <rect y="222" width="400" height="90" fill="${LG("#e9e2f5","#cfc3e6")}" ${O} ${N}/>
  <g ${N}>${[0,1,2,3,4,5,6,7,8,9].map(i=>`<rect x="${i*40+(Math.floor(i/1)%2?0:0)}" y="${i%2?222:261}" width="40" height="39" fill="#bfb1db" opacity=".55"/>`).join("")}
  <path d="M176 222 H224 L262 300 H138 Z" fill="${G("#d8344f")}" ${O}/><path d="M182 222 L148 300 M218 222 L252 300" stroke="#ffd45c" stroke-width="3" opacity=".8"/>
  <path d="M146 222 V214 H254 V222 Z" fill="${G("#cfc3e6")}" ${O2}/>
  <path d="M166 214 V128 Q166 104 200 100 Q234 104 234 128 V214 Z" fill="${G("#ffd45c")}" ${O}/><path d="M176 196 V134 Q176 116 200 114 Q224 116 224 134 V196 Z" fill="${G("#b45cff")}" ${O2}/>${crownAt(200,100)}
  <rect x="164" y="190" width="72" height="20" rx="8" fill="${G("#9b6bff")}" ${O2}/></g>
  ${F.curtain?place("k_princess",200,176,.5,{noShadow:true}):""}
  ${act("curtain","Royal curtains",`<g><rect x="140" y="104" width="120" height="8" rx="4" fill="${G("#ffd45c")}" ${O2}/>${F.curtain?`<path d="M140 110 Q148 160 136 214 H156 Q160 160 156 110 Z M260 110 Q252 160 264 214 H244 Q240 160 244 110 Z" fill="${G("#7a4fe0")}" ${O2}/>`:`<path d="M140 110 H200 Q196 160 202 214 H136 Q146 160 140 110 Z" fill="${G("#7a4fe0")}" ${O2}/><path d="M200 110 H260 Q254 160 264 214 H198 Q204 160 200 110 Z" fill="${G("#7a4fe0")}" ${O2}/><path d="M160 116 Q156 160 158 210 M176 116 Q174 160 178 210 M222 116 Q226 160 222 210 M240 116 Q244 160 242 210" stroke="#5a34b8" stroke-width="2" fill="none"/><path d="M196 150 Q200 156 204 150" stroke="#ffd45c" stroke-width="4" fill="none" stroke-linecap="round"/>`}</g>`)}
  ${F.armor?place("k_knight",84,208,.46):""}
  ${act("armor","Suit of armor",`<g transform="translate(${F.armor?36:84} 222)"><rect x="-24" y="-6" width="48" height="8" rx="3" fill="${G("#8597b8")}" ${O2}/><rect x="-14" y="-46" width="11" height="42" rx="4" fill="${G("#c9d3df")}" ${O2}/><rect x="3" y="-46" width="11" height="42" rx="4" fill="${G("#c9d3df")}" ${O2}/>
   <path d="M-20 -96 H20 L16 -44 H-16 Z" fill="${G("#c9d3df")}" ${O}/><path d="M0 -96 V-44" stroke="${INK}" stroke-opacity=".25" stroke-width="2"/><rect x="-26" y="-94" width="10" height="40" rx="5" fill="${G("#b7c3d4")}" ${O2}/><rect x="16" y="-94" width="10" height="40" rx="5" fill="${G("#b7c3d4")}" ${O2}/>
   <circle cy="-112" r="17" fill="${G("#c9d3df")}" ${O}/><rect x="-11" y="-116" width="22" height="5" rx="2" fill="#2b2b45"/><path d="M0 -129 Q-6 -144 -18 -146 Q-8 -138 -6 -128 Z" fill="${G("#e8423a")}" ${O2}/>
   <path d="M30 -2 V-150" stroke="#7a4b26" stroke-width="4" stroke-linecap="round"/><path d="M30 -150 L24 -136 H36 Z" fill="${G("#dfe5ec")}" ${O2}/></g>`)}
  ${door("tower","Climb the tower stairs",`<g transform="translate(350 222)"><path d="M-30 0 V-80 Q-30 -112 0 -112 Q30 -112 30 -80 V0 Z" fill="#2a1f50" ${O}/>${[0,1,2,3].map(i=>`<rect x="${-26+i*6}" y="${-18-i*18}" width="${52-i*6}" height="16" fill="${G("#cfc3e6")}" ${O2}/>`).join("")}<path d="M-34 0 V-82 Q-34 -118 0 -118 Q34 -118 34 -82 V0" fill="none" stroke="${G("#ffd45c")}" stroke-width="6"/></g>`)}`},
 tower:{name:"Princess Tower",pos:[2,0],bg:["#fde7f3","#b07a4a"],stretchTop:false,exits:{left:"throne"},draw:F=>`
  <rect width="400" height="300" fill="${LG("#fde7f3","#efc9de")}"/>
  <g ${N}>${[40,90,140,190].map((y,i)=>`<path d="M0 ${y} H400" stroke="#d9a8c4" stroke-width="2" opacity=".5"/>${[0,1,2,3,4,5,6,7].map(j=>`<path d="M${j*56+(i%2?28:0)} ${y-50} V${y}" stroke="#d9a8c4" stroke-width="2" opacity=".5"/>`).join("")}`).join("")}
  <path d="M232 132 V70 Q232 36 266 36 Q300 36 300 70 V132 Z" fill="${LG("#9fdcff","#e6f7ff")}" stroke="${G("#cfc3e6")}" stroke-width="8"/><circle cx="286" cy="62" r="9" fill="#ffe066"/><path d="M236 128 Q256 104 276 116 Q290 106 298 116 V132 H236 Z" fill="#7fd04e"/><path d="M266 36 V132 M232 88 H300" stroke="${G("#cfc3e6")}" stroke-width="4"/>
  <rect x="224" y="132" width="84" height="10" rx="4" fill="${G("#cfc3e6")}" ${O2}/>
  <path d="M26 54 Q100 34 174 54 V64 H26 Z" fill="${G("#ff6fa6")}" ${O}/>${[30,170].map(x=>`<rect x="${x-4}" y="56" width="8" height="182" rx="3" fill="${G("#ffd45c")}" ${O2}/>`).join("")}
  <path d="M30 62 Q20 140 36 220 H50 Q44 140 44 62 Z M170 62 Q180 140 164 220 H150 Q156 140 156 62 Z" fill="${G("#ffb3dc")}" ${O2}/>
  <path d="M34 150 Q34 128 60 128 H140 Q166 128 166 150 V164 H34 Z" fill="${G("#b45cff")}" ${O}/></g>
  <rect y="236" width="400" height="76" fill="${LG("#d9a07a","#b07a4a")}" ${O} ${N}/>
  <g ${N}>${[0,1,2,3,4,5].map(i=>`<path d="M0 ${246+i*12} H400" stroke="#8a5a33" stroke-width="1.6" opacity=".35"/>`).join("")}<ellipse cx="236" cy="270" rx="70" ry="16" fill="${G("#ff9ec7")}" ${O2}/><ellipse cx="236" cy="270" rx="50" ry="10" fill="none" stroke="#fff" stroke-width="3" opacity=".7"/>
  <rect x="30" y="196" width="140" height="44" rx="10" fill="${G("#ffe3f4")}" ${O}/><path d="M30 200 Q100 186 170 200 V230 Q100 220 30 230 Z" fill="${G("#ff9ec7")}" ${O2}/>${[60,100,140].map(x=>`<circle cx="${x}" cy="212" r="3" fill="#fff" opacity=".8"/>`).join("")}</g>
  ${F.pillow?place("k_sleepy",76,176,.44,{noShadow:true}):""}
  ${act("pillow","Big fluffy pillow",`<g transform="translate(${F.pillow?134:76} ${F.pillow?268:184}) rotate(${F.pillow?-14:0})"><path d="M-40 -4 Q-42 -26 -20 -24 H20 Q42 -26 40 -4 Q42 18 20 16 H-20 Q-42 18 -40 -4 Z" fill="${G("#fff6fb")}" ${O}/><path d="M-30 -6 Q0 -14 30 -6" stroke="#ffc2e0" stroke-width="2" fill="none"/></g>`)}
  ${act("toybox","Royal toy box",`<g transform="translate(330 238)"><rect x="-38" y="-38" width="76" height="40" rx="6" fill="${G("#4fb3ff")}" ${O}/><path d="M-38 -20 H38" stroke="#ffd45c" stroke-width="4"/>${crownAt(0,-22)}
   ${F.toybox?`<path d="M-38 -38 L-30 -62 H38 L38 -38" fill="${G("#2387d9")}" ${O2}/><path d="M0 -38 Q-8 -46 0 -54 Q8 -62 0 -70" fill="none" stroke="#b7c3d4" stroke-width="3"/>`:`<rect x="-42" y="-48" width="84" height="14" rx="5" fill="${G("#2387d9")}" ${O2}/>`}</g>`)}
  ${F.toybox?place("k_jester",330,152,.44,{noShadow:true}):""}`},
 garden:{name:"Fairy Garden",pos:[0,1],bg:["#6a58b0","#3f9d3a"],exits:{right:"courtyard"},draw:F=>`
  <rect width="400" height="300" fill="${LG("#6a58b0","#4fa58c")}"/>
  <g ${N}><circle cx="70" cy="50" r="22" fill="#fff6c9" opacity=".9"/><circle cx="80" cy="44" r="20" fill="#6a58b0"/>
  ${[[40,90],[130,40],[210,70],[300,30],[360,90],[170,120],[250,140],[330,150],[100,140]].map(([x,y],i)=>`<circle cx="${x}" cy="${y}" r="${i%3?3:4.4}" fill="#fff6a0" opacity=".9"/><circle cx="${x}" cy="${y}" r="9" fill="#fff6a0" opacity=".2"/>`).join("")}
  <path d="M290 230 V120 Q270 112 262 86 Q290 100 300 116 Q300 80 320 66 Q316 100 312 120 Q330 100 360 98 Q336 112 322 130 V230 Z" fill="${G("#7a5a3a")}" ${O}/>
  <ellipse cx="310" cy="70" rx="80" ry="52" fill="${G("#3fa86a")}" ${O}/><ellipse cx="250" cy="96" rx="40" ry="28" fill="${G("#4fbf7a")}" ${O2}/><ellipse cx="370" cy="100" rx="40" ry="28" fill="${G("#4fbf7a")}" ${O2}/>${spark(290,60,.6,"#fff6c9")}${spark(350,80,.5,"#fff6c9")}</g>
  <rect y="222" width="400" height="90" fill="${LG("#7fd04e","#3f9d3a")}" ${O} ${N}/>
  <g ${N}>${[[30,240,"#ff8fd1"],[150,250,"#ffe066"],[240,236,"#9fe7ff"],[380,250,"#ff8fd1"],[220,282,"#c79bff"],[30,284,"#ffe066"]].map(([x,y,c])=>`<path d="M${x} ${y} v14" stroke="#3f9d3a" stroke-width="3"/>${[0,72,144,216,288].map(a=>`<circle cx="${(x+Math.cos(a*Math.PI/180)*5).toFixed(1)}" cy="${(y+Math.sin(a*Math.PI/180)*5).toFixed(1)}" r="4" fill="${c}"/>`).join("")}<circle cx="${x}" cy="${y}" r="3" fill="#fff6c9"/>`).join("")}
  ${[[130,270,.5],[160,276,.4],[360,272,.45]].map(([x,y,s])=>`<g transform="translate(${x} ${y}) scale(${s})"><rect x="-8" y="-6" width="16" height="22" rx="6" fill="${G("#fff4dc")}" ${O2}/><path d="M-26 -2 Q-26 -26 0 -26 Q26 -26 26 -2 Q0 -8 -26 -2 Z" fill="${G("#ff5c5c")}" ${O2}/><circle cx="-10" cy="-14" r="4" fill="#fff"/><circle cx="8" cy="-18" r="3.4" fill="#fff"/></g>`).join("")}</g>
  ${act("stump","Tiny fairy house",`<g transform="translate(306 230)"><path d="M-40 0 V-46 Q-40 -56 -30 -56 H30 Q40 -56 40 -46 V0 Z" fill="${G("#a0703f")}" ${O}/><ellipse cx="0" cy="-56" rx="40" ry="9" fill="${G("#e9c49a")}" ${O2}/><ellipse cx="0" cy="-56" rx="24" ry="5" fill="none" stroke="#a0703f" stroke-width="2"/>
   <path d="M-14 0 V-26 Q-14 -40 0 -40 Q14 -40 14 -26 V0 Z" fill="#3a2a1a"/>${F.stump?`<path d="M14 0 V-26 Q14 -40 22 -38 V-2 Z" fill="${G("#ff6fa6")}" ${O2}/>`:`<path d="M-14 0 V-26 Q-14 -40 0 -40 Q14 -40 14 -26 V0 Z" fill="${G("#ff6fa6")}" ${O2}/><circle cx="8" cy="-18" r="2.4" fill="#ffd45c"/>`}
   <circle cx="-28" cy="-34" r="6" fill="#fff6a0" stroke="#7a4b26" stroke-width="2"/><path d="M40 -20 Q54 -18 52 -4" fill="none" stroke="#3fa86a" stroke-width="4" stroke-linecap="round"/></g>`)}
  ${F.stump?place("k_sparkle",306,204,.4,{noShadow:true}):""}
  ${act("flower","Giant flower bud",`<g transform="translate(186 230)"><path d="M0 0 Q-6 -40 0 -80" stroke="${G("#3f9d3a")}" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M-2 -30 Q-30 -40 -36 -22 Q-18 -18 -2 -26 Z M2 -46 Q28 -60 36 -42 Q20 -36 2 -42 Z" fill="${G("#5fbf45")}" ${O2}/>
   ${F.flower?`<path d="M-6 -82 Q-44 -96 -40 -72 Q-24 -66 -6 -76 Z M6 -82 Q44 -96 40 -72 Q24 -66 6 -76 Z M-18 -80 Q-30 -110 -10 -108 Q0 -94 -4 -80 Z M18 -80 Q30 -110 10 -108 Q0 -94 4 -80 Z" fill="${G("#ff8fd1")}" ${O2}/><ellipse cx="0" cy="-80" rx="20" ry="6" fill="${G("#ffe066")}" ${O2}/>`:`<path d="M0 -80 Q-26 -84 -20 -112 Q-10 -128 0 -136 Q10 -128 20 -112 Q26 -84 0 -80 Z" fill="${G("#ff8fd1")}" ${O}/><path d="M0 -82 Q-8 -106 0 -134 M0 -82 Q10 -106 6 -128" stroke="#e85aa8" stroke-width="2" fill="none"/>`}</g>`)}
  ${F.flower?place("k_flower",186,138,.4,{noShadow:true}):""}
  ${F.mushroom?place("k_mush",74,236,.4):""}
  ${act("mushroom","Big spotty mushroom",`<g transform="translate(74 ${F.mushroom?194:246})"><rect x="-12" y="-18" width="24" height="${F.mushroom?14:30}" rx="8" fill="${G("#fff4dc")}" ${O2}/><path d="M-46 -12 Q-46 -58 0 -58 Q46 -58 46 -12 Q0 -24 -46 -12 Z" fill="${G("#ff5c5c")}" ${O}/><circle cx="-20" cy="-36" r="7" fill="#fff"/><circle cx="12" cy="-44" r="6" fill="#fff"/><circle cx="26" cy="-24" r="5" fill="#fff"/><circle cx="-4" cy="-22" r="4" fill="#fff"/></g>`)}`},
 cave:{name:"Dragon's Cave",pos:[2,1],bg:["#5a4a6e","#3a2e48"],exits:{left:"courtyard"},draw:F=>`
  <rect width="400" height="300" fill="${LG("#4a3a62","#241a30")}"/>
  <g ${N}><path d="M0 0 H400 V40 L380 70 L364 36 L340 58 L320 30 L300 80 L280 34 L250 54 L226 28 L200 66 L176 30 L150 56 L128 26 L104 74 L80 34 L58 56 L36 30 L16 62 L0 40 Z" fill="${G("#5a4a6e")}" ${O}/>
  ${[[60,150,"#c79bff"],[86,160,"#9fe7ff"],[340,140,"#c79bff"],[362,152,"#ff9ec7"]].map(([x,y,c])=>`<path d="M${x-8} ${y+20} L${x} ${y-14} L${x+8} ${y+20} Z" fill="${G(c)}" ${O2}/><circle cx="${x}" cy="${y}" r="16" fill="${c}" opacity=".18"/>`).join("")}
  <rect x="196" y="96" width="8" height="26" fill="${G("#7a4b26")}" ${O2}/><path d="M200 96 q-9 -14 0 -26 q9 12 0 26 Z" fill="#ffb84a"/><circle cx="200" cy="86" r="20" fill="#ffb84a" opacity=".18"/>
  <path d="M0 120 Q30 110 40 140 Q30 200 0 210 Z M400 110 Q370 120 362 150 Q372 200 400 214 Z" fill="${G("#3a2e48")}" ${O2}/></g>
  <rect y="226" width="400" height="86" fill="${LG("#6a5a7e","#3a2e48")}" ${O} ${N}/>
  <g ${N}>${[[40,252,14,8],[150,280,18,9],[250,290,14,7],[380,262,18,10]].map(([x,y,rx,ry])=>`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${G("#7d6a92")}" ${O2}/>`).join("")}</g>
  ${F.gold?place("k_fire",292,212,.46):""}
  ${act("gold","Pile of gold",`<g transform="translate(${F.gold?366:318} 248)"><path d="M-52 10 Q-44 -30 0 -38 Q44 -30 52 10 Z" fill="${G("#ffd45c")}" ${O}/>${[[-30,-4],[-14,-18],[4,-26],[20,-14],[34,0],[-2,-6],[-20,6],[14,4]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="7" ry="4" fill="${G("#ffcf4a")}" stroke="#e0a526" stroke-width="1.4"/>`).join("")}<path d="M-46 -6 L-40 -30 L-30 -8 Z" fill="${G("#ff5c8a")}" ${O2}/>${spark(24,-32,.7,"#fff6c9")}</g>`)}
  ${F.egg?place("k_baby",96,226,.42,{noShadow:true}):""}
  ${act("egg","Spotty dragon egg",`<g transform="translate(96 252)"><path d="M-40 0 Q-30 -16 0 -14 Q30 -16 40 0 Q20 14 0 12 Q-20 14 -40 0 Z" fill="${G("#a0703f")}" ${O}/>${[-30,-18,-6,6,18,30].map(x=>`<path d="M${x} -8 l4 12" stroke="#7a4b26" stroke-width="2"/>`).join("")}
   ${F.egg?`<path d="M-30 -6 Q-32 -24 -20 -26 L-14 -18 L-8 -24 L-6 -6 Z" fill="${G("#c8f0e0")}" ${O2}/><path d="M30 -6 Q32 -22 22 -26 L16 -18 L10 -24 L6 -6 Z" fill="${G("#c8f0e0")}" ${O2}/>`:`<path d="M0 -6 Q-22 -6 -22 -30 Q-22 -60 0 -62 Q22 -60 22 -30 Q22 -6 0 -6 Z" fill="${G("#c8f0e0")}" ${O}/><circle cx="-8" cy="-40" r="5" fill="#7fd6b0"/><circle cx="8" cy="-26" r="6" fill="#7fd6b0"/><circle cx="10" cy="-48" r="3.4" fill="#7fd6b0"/>`}</g>`)}
  <g ${N}><path d="M168 262 Q164 236 186 228 Q206 220 226 232 Q244 244 236 264 Z" fill="${G("#7d6a92")}" ${O}/><path d="M220 262 Q222 248 240 246 Q256 248 256 264 Z" fill="${G("#6a5a7e")}" ${O2}/>${[[178,232,"#9fe7ff"],[196,222,"#c79bff"],[212,230,"#ff9ec7"]].map(([x,y,c])=>`<path d="M${x-6} ${y+10} L${x} ${y-14} L${x+6} ${y+10} Z" fill="${G(c)}" ${O2}/>`).join("")}</g>`}},
 msg:{well:"Splash! You make a wish and the bucket comes up.",curtain:"Swish! The royal curtains open.",armor:"Clank clank! The suit of armor steps aside.",pillow:"Flump! The big pillow slides off the bed.",toybox:"Boing! The toy box lid pops open.",stump:"Creak! The tiny fairy door swings open.",flower:"Ta-da! The giant flower blooms.",mushroom:"Boing! The mushroom bounces up.",egg:"Crack crack! The dragon egg hatches.",gold:"Clink clink! The gold coins slide away."}}
