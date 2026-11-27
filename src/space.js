{id:"space",n:8,name:"The Spaceship",start:"bridge",
 idea:"Colton's idea for Mitchell's game: ten mutant and astronaut ducks hiding all over a spaceship. The Alien lost its moon rocks, and every duck you find gives one back. Watch out: sometimes a space monster sneaks into a room. Find it and tap it before it gobbles up one of your ducks!",
 helper:{name:"Alien",token:"moon rock",plural:"moon rocks",icon:"rock",art:toyAlien,reward:"It beams you a big alien thumbs-up!"},
 monster:{bridge:[146,262,.6],engine:[214,198,.6],lab:[304,80,.52],outside:[204,200,.6]},
 hide:{sp_astro:"chair",sp_pilot:"panel",sp_spark:"reactor",sp_grav:"crate",sp_eye3:"tube",sp_slime:"vat",sp_glow:"locker",sp_moon:"asteroid",sp_comet:"satellite"},
 ducks:[
  {id:"sp_plain",name:"Yellow Duck",tier:"Easy",area:"bridge",c:YEL,hint:"Floating by the controls"},
  {id:"sp_astro",name:"Astronaut Duck",tier:"Sneaky",area:"bridge",c:{body:"#f4f7fb",wing:"#d6dee8",beak:"#ff8a3d"},acc:"helmet",hint:"The captain's seat"},
  {id:"sp_pilot",name:"Pilot Duck",tier:"Tricky",area:"bridge",c:YEL,acc:"shades",hint:"Under the buttons"},
  {id:"sp_spark",name:"Spark Duck",tier:"Sneaky",area:"engine",c:{body:"#9fe7ff",wing:"#4fb3ff",beak:"#ff8a3d"},acc:"sparks",hint:"Powering the ship"},
  {id:"sp_grav",name:"Gravity Duck",tier:"Tricky",area:"engine",c:{body:"#ff9ec7",wing:"#ff6fa6",beak:"#ff8a3d"},hint:"Which way is up?"},
  {id:"sp_eye3",name:"Three-Eyed Duck",tier:"Sneaky",area:"lab",c:{body:"#b6f07a",wing:"#7fd04e",beak:"#ff8a3d"},acc:"eye3",hint:"Sees everything"},
  {id:"sp_slime",name:"Slime Duck",tier:"Tricky",area:"lab",c:{body:"#c8b6ff",wing:"#a48cf0",beak:"#ff8a3d"},acc:"slime",hint:"Gooey"},
  {id:"sp_glow",name:"Glow Duck",tier:"Rare",area:"lab",c:{body:"#9bffea",wing:"#5fd6c8",beak:"#ff8a3d"},acc:"glow",hint:"Locked away for testing"},
  {id:"sp_moon",name:"Moon Duck",tier:"Rare",area:"outside",c:{body:"#d3d8e2",wing:"#a3abbb",beak:"#ffb066"},hint:"Riding a space rock"},
  {id:"sp_comet",name:"Comet Duck",tier:"Rare",area:"outside",c:{body:"#ffe066",wing:"#ff9f43",beak:"#ff8a3d"},acc:"comet",hint:"Zooming past the dish"},
  {id:"sp_alien",name:"Alien",tier:"Legendary",area:"bridge",helper:true,art:()=>toyAlien(true),hint:"Bring the moon rocks back to the Alien"}],
 areas:{
 bridge:{name:"Bridge",pos:[1,1],bg:["#26325c","#5d6880"],exits:{left:"engine",right:"lab",up:"outside"},doors:{outside:"up"},draw:F=>`
  <rect width="400" height="300" fill="${LG("#2f3d6e","#1f2a52")}"/>
  <g ${N}><rect x="84" y="18" width="232" height="118" rx="26" fill="${G("#8597b8")}" ${O}/><rect x="96" y="28" width="208" height="98" rx="18" fill="${LG("#0c1230","#1d1050")}"/>
  ${[[112,44],[150,96],[178,52],[236,40],[284,70],[262,110],[130,72],[210,88],[296,44]].map(([x,y],i)=>`<circle cx="${x}" cy="${y}" r="${i%3?1.4:2.2}" fill="#fff" opacity=".9"/>`).join("")}
  <circle cx="246" cy="92" r="22" fill="${G("#ff9f43")}"/><ellipse cx="246" cy="92" rx="36" ry="7" fill="none" stroke="#ffe066" stroke-width="3" opacity=".85"/><circle cx="148" cy="54" r="8" fill="#9fe7ff" opacity=".9"/>
  <path d="M200 28 V126 M96 77 H304" stroke="${INK}" stroke-opacity=".25" stroke-width="3"/>
  ${[24,376].map(x=>`<g>${[160,176,192].map(y=>`<circle cx="${x}" cy="${y-120}" r="4" fill="${y===176?"#ff6fa6":"#7fd04e"}" opacity=".85"/>`).join("")}</g>`).join("")}</g>
  ${door("outside","Go out the airlock for a space walk",`<g transform="translate(352 158)"><circle r="36" fill="${G("#b7c3d4")}" ${O}/><circle r="26" fill="${G("#5b6b80")}" ${O2}/><path d="M-26 0 H26 M0 -26 V26" stroke="#ffe066" stroke-width="4"/><circle r="7" fill="${G("#ffcb2f")}" ${O2}/></g><rect x="312" y="118" width="80" height="80" fill="transparent"/>`)}
  <rect y="222" width="400" height="90" fill="${LG("#8a96ab","#5d6880")}" ${O} ${N}/>
  <g ${N}>${[0,1,2,3,4,5,6].map(i=>`<path d="M${i*66-6} 222 V310" stroke="#4a556b" stroke-width="2" opacity=".6"/>`).join("")}<path d="M0 260 H400" stroke="#4a556b" stroke-width="2" opacity=".6"/></g>
  <g ${N}><path d="M14 222 V174 Q14 154 34 150 L130 136 Q150 136 150 156 V222 Z" fill="${G("#5b6b80")}" ${O}/><path d="M22 168 L140 150" stroke="${INK}" stroke-opacity=".3" stroke-width="2"/>
  ${[[34,166,"#ff6fa6"],[56,163,"#ffe066"],[78,160,"#7fd04e"],[100,157,"#4fb3ff"],[122,154,"#ff9f43"]].map(([x,y,c])=>`<circle cx="${x}" cy="${y}" r="6" fill="${c}" stroke="${INK}" stroke-opacity=".35" stroke-width="1.4"/>`).join("")}
  <rect x="40" y="176" width="70" height="20" rx="4" fill="#0c1230"/><path d="M46 186 h10 l4 -6 l6 12 l4 -6 h30" fill="none" stroke="#7fd04e" stroke-width="2"/></g>
  ${F.panel?place("sp_pilot",80,220,.42,{noShadow:true}):""}
  ${act("panel","Hatch under the control panel",`<g transform="translate(80 212)">${F.panel?`<rect x="-34" y="-12" width="68" height="20" rx="3" fill="#232c40"/><rect x="-36" y="8" width="72" height="8" rx="3" fill="${G("#8597b8")}" ${O2}/>`:`<rect x="-36" y="-12" width="72" height="24" rx="3" fill="${G("#8597b8")}" ${O2}/>${[-24,-8,8,24].map(x=>`<path d="M${x} -6 v12" stroke="${INK}" stroke-opacity=".35" stroke-width="2"/>`).join("")}`}</g>`)}
  ${F.chair?place("sp_astro",200,186,.46,{noShadow:true}):""}
  ${act("chair","Captain's chair",`<g transform="translate(200 226)"><path d="M-6 8 V30 M-24 34 H24" stroke="${INK}" stroke-opacity=".5" stroke-width="5" stroke-linecap="round"/>${F.chair?`<rect x="-34" y="-18" width="68" height="22" rx="8" fill="${G("#e8423a")}" ${O}/><rect x="-38" y="-4" width="10" height="20" rx="4" fill="${G("#b7c3d4")}" ${O2}/><rect x="28" y="-4" width="10" height="20" rx="4" fill="${G("#b7c3d4")}" ${O2}/>`:`<rect x="-34" y="-70" width="68" height="78" rx="14" fill="${G("#e8423a")}" ${O}/><rect x="-24" y="-60" width="48" height="10" rx="5" fill="#ff7a6e"/><rect x="-38" y="-20" width="10" height="34" rx="4" fill="${G("#b7c3d4")}" ${O2}/><rect x="28" y="-20" width="10" height="34" rx="4" fill="${G("#b7c3d4")}" ${O2}/>`}</g>`)}
  ${place("sp_plain",44,268,.42)}
  ${HELP("space",286,254,.74)}`},
 engine:{name:"Engine Room",pos:[0,1],bg:["#2a2140","#4a4a5e"],stretchTop:false,exits:{right:"bridge"},draw:F=>`
  <rect width="400" height="300" fill="${LG("#352a52","#221a38")}"/>
  <g ${N}>${[30,70].map(y=>`<path d="M0 ${y} H400" stroke="${G("#8597b8")}" stroke-width="12"/><path d="M0 ${y} H400" stroke="${INK}" stroke-opacity=".25" stroke-width="2"/>`).join("")}
  ${[60,180,300].map(x=>`<rect x="${x}" y="22" width="20" height="56" rx="4" fill="${G("#5b6b80")}" ${O2}/>`).join("")}
  <text x="300" y="120" text-anchor="middle" font-family="Grandstander,sans-serif" font-weight="900" font-size="14" fill="#ffe066">ENGINE</text>
  <path d="M276 128 h48" stroke="#ffe066" stroke-width="3"/></g>
  <rect y="230" width="400" height="80" fill="${LG("#5a5a70","#3c3c50")}" ${O} ${N}/>
  <g ${N}>${[0,1,2,3,4,5,6,7].map(i=>`<path d="M${i*56} 230 l28 80" stroke="#ffcb2f" stroke-width="7" opacity=".35"/>`).join("")}</g>
  ${act("reactor","Glowing reactor",`<g transform="translate(118 160)"><rect x="-56" y="66" width="112" height="16" rx="5" fill="${G("#5b6b80")}" ${O2}/><rect x="-46" y="-86" width="92" height="16" rx="5" fill="${G("#5b6b80")}" ${O2}/>
   <rect x="-38" y="-72" width="76" height="140" rx="30" fill="${LG("#bff6ff","#4fb3ff")}" fill-opacity=".85" ${O}/>${F.reactor?`<path d="M-38 -40 V40" stroke="#5b6b80" stroke-width="0"/>`:`<path d="M-30 -60 Q0 -50 30 -60 M-30 0 Q0 10 30 0 M-30 50 Q0 60 30 50" fill="none" stroke="#fff" stroke-width="3" opacity=".6"/>`}
   ${F.reactor?"":`<rect x="-40" y="-36" width="80" height="72" rx="10" fill="${G("#8597b8")}" ${O2}/><circle r="12" fill="${G("#ffe066")}" ${O2}/><path d="M-4 -6 l8 0 l-6 8 l8 0 l-12 12 l3 -9 l-7 0 Z" fill="#ff9f43"/>`}</g>`)}
  ${F.reactor?place("sp_spark",118,170,.46,{noShadow:true}):""}
  ${F.crate?place("sp_grav",302,150,.44,{noShadow:true,upside:true}):""}
  ${act("crate","Floating crate",`<g transform="translate(302 ${F.crate?186:160}) rotate(${F.crate?-24:-8})">${F.crate?`<rect x="-36" y="0" width="72" height="34" rx="4" fill="${G("#c89260")}" ${O}/><path d="M-36 16 H36" stroke="#a0703f" stroke-width="3"/><rect x="-44" y="-30" width="56" height="10" rx="3" fill="${G("#c89260")}" ${O2} transform="rotate(-30 -16 -25)"/>`:`<rect x="-36" y="-34" width="72" height="68" rx="4" fill="${G("#c89260")}" ${O}/><path d="M-36 -34 L36 34 M36 -34 L-36 34" stroke="#a0703f" stroke-width="4"/><rect x="-36" y="-34" width="72" height="68" rx="4" fill="none" stroke="#a0703f" stroke-width="4"/>`}</g>
   <g ${N}><path d="M${F.crate?264:262} 222 q4 -6 0 -12 M${F.crate?340:344} 222 q4 -6 0 -12" fill="none" stroke="#9fe7ff" stroke-width="2.4" stroke-linecap="round" opacity=".7"/></g>`)}
  <g ${N}><g transform="translate(220 250) rotate(14)"><rect x="-16" y="-12" width="32" height="24" rx="3" fill="${G("#c89260")}" ${O2}/><path d="M-16 0 H16" stroke="#a0703f" stroke-width="2"/></g></g>`},
 lab:{name:"Space Lab",pos:[2,1],bg:["#e9f8ff","#b9c2ce"],stretchTop:false,exits:{left:"bridge"},draw:F=>`
  <rect width="400" height="300" fill="${LG("#f2fbff","#d6e6f2")}"/>
  <g ${N}><rect x="0" y="0" width="400" height="22" fill="${G("#5b6b80")}"/><text x="200" y="16" text-anchor="middle" font-family="Grandstander,sans-serif" font-weight="900" font-size="12" fill="#b6f07a">SPACE LAB</text>
  <rect x="150" y="44" width="110" height="66" rx="8" fill="#0c1230" stroke="${G("#8597b8")}" stroke-width="5"/>
  <path d="M162 92 q10 -24 20 0 t20 0 t20 0 t20 0" fill="none" stroke="#7cf06a" stroke-width="2.6"/><text x="205" y="62" text-anchor="middle" font-family="Grandstander,sans-serif" font-weight="900" font-size="9" fill="#9fe7ff">DUCK SCAN</text>
  <rect x="20" y="138" width="130" height="8" rx="3" fill="${G("#8597b8")}" ${O2}/>
  ${[[34,"#ff6fa6"],[56,"#ffe066"],[78,"#9fe7ff"],[100,"#c8b6ff"]].map(([x,c])=>`<rect x="${x-6}" y="112" width="12" height="26" rx="6" fill="${c}" fill-opacity=".85" stroke="${INK}" stroke-opacity=".35" stroke-width="1.4"/>`).join("")}</g>
  <rect y="230" width="400" height="80" fill="${LG("#cfd8e3","#aab6c4")}" ${O} ${N}/>
  ${act("tube","Giant test tube",`<g transform="translate(70 196)"><rect x="-30" y="34" width="60" height="12" rx="4" fill="${G("#8597b8")}" ${O2}/><rect x="-24" y="-56" width="48" height="94" rx="24" fill="${LG("#f6fcff","#cfeaff")}" fill-opacity=".55" ${O}/>${F.tube?"":`<rect x="-20" y="-30" width="40" height="64" rx="20" fill="${G("#b6f07a")}" fill-opacity=".9"/><circle cx="-6" cy="-18" r="4" fill="#e8ffd6"/><circle cx="7" cy="-4" r="3" fill="#e8ffd6"/>`}<rect x="-28" y="-62" width="56" height="12" rx="4" fill="${G("#5b6b80")}" ${O2}${F.tube?` transform="translate(34 -18) rotate(28)"`:""}/></g>`)}
  ${F.tube?place("sp_eye3",70,214,.42,{noShadow:true}):""}
  ${act("vat","Bubbling slime vat",`<g transform="translate(206 236)"><path d="M-56 -40 L-48 22 Q-46 30 -38 30 H38 Q46 30 48 22 L56 -40 Z" fill="${G("#8597b8")}" ${O}/>${F.vat?`<ellipse cx="0" cy="-40" rx="56" ry="9" fill="#3c4a60"/>`:`<ellipse cx="0" cy="-40" rx="56" ry="9" fill="${G("#7cf06a")}" ${O2}/><circle cx="-18" cy="-44" r="6" fill="#a6ff8e" stroke="${INK}" stroke-opacity=".3" stroke-width="1"/><circle cx="16" cy="-46" r="4.5" fill="#a6ff8e"/><path d="M-40 -34 q4 14 0 18 M30 -34 q4 10 0 14" fill="none" stroke="#7cf06a" stroke-width="5" stroke-linecap="round"/>`}</g>`)}
  ${F.vat?place("sp_slime",206,186,.44,{noShadow:true}):""}
  ${F.locker?place("sp_glow",336,180,.44,{noShadow:true}):""}
  ${act("locker","Test locker",`<g transform="translate(336 180)">${F.locker?`<rect x="-42" y="-58" width="84" height="116" rx="6" fill="#232c40" ${O}/><rect x="40" y="-58" width="18" height="116" rx="4" fill="${G("#b7c3d4")}" ${O2} transform="skewY(14)"/>`:`<rect x="-42" y="-58" width="84" height="116" rx="6" fill="${G("#b7c3d4")}" ${O}/><path d="M0 -58 V58" stroke="${INK}" stroke-opacity=".35" stroke-width="2"/>${[-40,-30,-20].map(y=>`<path d="M-30 ${y} h20 M10 ${y} h20" stroke="${INK}" stroke-opacity=".35" stroke-width="2.4"/>`).join("")}<rect x="-8" y="-4" width="16" height="12" rx="3" fill="${G("#ffcb2f")}" ${O2}/><text x="0" y="36" text-anchor="middle" font-family="Grandstander,sans-serif" font-weight="900" font-size="10" fill="#e8423a">TEST</text>`}</g>`)}`},
 outside:{name:"Space Walk",pos:[1,0],bg:["#0c1230","#5b6b80"],exits:{down:"bridge"},draw:F=>`
  <rect width="400" height="300" fill="${LG("#0c1230","#241452")}"/>
  <g ${N}>${[[30,40],[80,120],[120,30],[160,90],[220,24],[260,140],[300,60],[350,110],[370,30],[40,180],[190,170],[330,190],[110,200],[60,90],[240,90]].map(([x,y],i)=>`<circle cx="${x}" cy="${y}" r="${i%4?1.3:2.3}" fill="#fff" opacity="${i%3?.7:1}"/>`).join("")}
  ${spark(96,64,.6,"#fff6c9")}${spark(282,32,.5,"#fff6c9")}
  <circle cx="200" cy="420" r="210" fill="${G("#4fb3ff")}" ${O}/><path d="M40 300 Q90 240 140 270 Q200 230 260 262 Q310 236 360 300" fill="#7fd04e" opacity=".8"/>
  <path d="M0 254 Q200 236 400 254 V300 H0 Z" fill="${G("#b7c3d4")}" ${O}/>${[60,140,220,300,370].map(x=>`<circle cx="${x}" cy="${266+(x%3)}" r="3" fill="#8597b8"/>`).join("")}</g>
  ${F.asteroid?place("sp_moon",96,134,.46,{noShadow:true}):""}
  ${act("asteroid","Floating space rock",`<g transform="translate(96 ${F.asteroid?176:150}) rotate(${F.asteroid?40:0})"><path d="M-46 4 Q-50 -26 -20 -38 Q14 -46 38 -24 Q54 0 40 24 Q18 44 -12 40 Q-42 34 -46 4 Z" fill="${G("#9aa3b2")}" ${O}/><circle cx="-14" cy="-10" r="9" fill="#7d8697"/><circle cx="18" cy="12" r="6" fill="#7d8697"/><circle cx="20" cy="-18" r="4" fill="#7d8697"/></g>`)}
  ${F.satellite?place("sp_comet",318,104,.44,{noShadow:true}):""}
  ${act("satellite","Satellite dish",`<g transform="translate(306 150)"><rect x="-56" y="-8" width="36" height="22" fill="${G("#4fb3ff")}" ${O2}/><rect x="20" y="-8" width="36" height="22" fill="${G("#4fb3ff")}" ${O2}/><path d="M-56 3 H56" stroke="${INK}" stroke-opacity=".35" stroke-width="2"/>
   <rect x="-14" y="-16" width="28" height="38" rx="6" fill="${G("#dfe5ec")}" ${O}/><g transform="rotate(${F.satellite?50:0} 0 -16)"><path d="M-26 -30 Q0 -6 26 -30 Z" fill="${G("#dfe5ec")}" ${O}/><path d="M0 -22 V-40" stroke="${INK}" stroke-opacity=".5" stroke-width="2.4"/><circle cy="-42" r="3.4" fill="#ff6fa6"/></g></g>`)}`}},
 msg:{chair:"Whee! The captain's chair spins around.",panel:"The hatch under the controls pops open.",reactor:"The reactor's cover slides away. Bzzt!",crate:"The floating crate's lid drifts open.",tube:"Pop! The test tube's cap flies off.",vat:"Glug glug. The slime drains out of the vat.",locker:"Beep! The test locker unlocks.",asteroid:"The space rock tumbles around.",satellite:"The satellite dish swings around."}}
