/* ---------- Fairy Tale Kingdom: things ducks wear, Mama Dragon and her gold coins ---------- */
Object.assign(ACC,{
  tiara:()=>`<g transform="translate(12 -31)"><path d="M-11 1 L-9 -6 L-5 -2 L0 -11 L5 -2 L9 -6 L11 1 Z" fill="${G("#f4f0ff")}" ${O2}/><circle cy="-5" r="2.6" fill="${G("#b45cff")}" ${O2}/><circle cx="-8" cy="-5" r="1.3" fill="#ff8fd1"/><circle cx="8" cy="-5" r="1.3" fill="#ff8fd1"/></g>`,
  gown:()=>`<path d="M-22 8 Q-34 24 -32 30 Q0 36 28 30 Q28 22 18 8 Q0 16 -22 8 Z" fill="${G("#b45cff")}" ${O2}/><path d="M-20 12 Q-24 22 -24 28 M-6 15 Q-6 24 -6 32 M8 14 Q10 22 12 31" fill="none" stroke="#e2c4ff" stroke-width="1.6" opacity=".8"/>${spark(-16,22,.45,"#fff6c9")}${spark(14,24,.4,"#fff6c9")}${spark(-36,-26,.7,"#fff6c9")}`,
  knight:()=>`<g transform="translate(12 -18)"><path d="M-17 4 Q-18 -18 0 -18 Q18 -18 17 4 Z" fill="${G("#c9d3df")}" ${O2}/><rect x="1" y="-6" width="15" height="4" rx="2" fill="#2b2b45"/><path d="M-17 4 H17" stroke="${INK}" stroke-opacity=".3" stroke-width="2"/><path d="M-2 -17 Q-6 -32 -18 -34 Q-8 -26 -6 -16 Z" fill="${G("#e8423a")}" ${O2}/></g>
   <g transform="translate(-8 9)"><path d="M-10 -10 H10 V0 Q10 10 0 14 Q-10 10 -10 0 Z" fill="${G("#4fb3ff")}" ${O2}/><path d="M0 -10 V14 M-10 -1 H10" stroke="#ffd45c" stroke-width="2.6"/></g>`,
  jester:()=>`<g transform="translate(12 -30)"><path d="M-12 2 Q-14 -6 -26 -6 Q-16 -12 -4 -6 Z" fill="${G("#b45cff")}" ${O2}/><path d="M-4 -6 Q-2 -20 2 -26 Q6 -16 6 -6 Z" fill="${G("#3fb86a")}" ${O2}/><path d="M6 -6 Q16 -12 26 -8 Q18 -4 12 2 Z" fill="${G("#ffcb2f")}" ${O2}/><path d="M-13 2 Q0 -4 13 2 L13 5 Q0 -1 -13 5 Z" fill="${G("#e8423a")}" ${O2}/>
   <circle cx="-27" cy="-6" r="3.2" fill="${G("#ffd45c")}" ${O2}/><circle cx="2" cy="-28" r="3.2" fill="${G("#ffd45c")}" ${O2}/><circle cx="27" cy="-8" r="3.2" fill="${G("#ffd45c")}" ${O2}/></g>
   <path d="M2 -4 L8 2 L14 -4 L20 2 L26 -4" fill="none" stroke="#b45cff" stroke-width="3" stroke-linejoin="round"/>`,
  flowers:()=>`<g transform="translate(12 -31)">${[[-11,3,"#ff8fd1"],[-4,-2,"#ffe066"],[4,-3,"#9fe7ff"],[11,2,"#ff8fd1"]].map(([x,y,c])=>`<g transform="translate(${x} ${y})">${[0,72,144,216,288].map(a=>`<circle cx="${(Math.cos(a*Math.PI/180)*3.2).toFixed(1)}" cy="${(Math.sin(a*Math.PI/180)*3.2).toFixed(1)}" r="2.4" fill="${c}"/>`).join("")}<circle r="1.7" fill="#fff6c9"/></g>`).join("")}</g>`,
  mushcap:()=>`<g transform="translate(12 -29)"><path d="M-16 3 Q-16 -15 0 -15 Q16 -15 16 3 Q0 -1 -16 3 Z" fill="${G("#ff5c5c")}" ${O2}/><circle cx="-7" cy="-6" r="2.8" fill="#fff"/><circle cx="4" cy="-10" r="2.4" fill="#fff"/><circle cx="9" cy="-3" r="2" fill="#fff"/></g>`,
  wand:()=>`<path d="M-16 6 L-32 -20" stroke="${INK}" stroke-opacity=".3" stroke-width="4.4" stroke-linecap="round"/><path d="M-16 6 L-32 -20" stroke="#fff" stroke-width="2.8" stroke-linecap="round"/>${spark(-34,-24,1.3,"#ffe066")}${spark(-44,-40,.5,"#fff6c9")}${spark(-20,-36,.45,"#fff6c9")}`,
  horns:()=>`<path d="M3 -30 Q-2 -40 -1 -44 Q5 -38 9 -32 Z M15 -32 Q16 -42 20 -45 Q22 -38 21 -31 Z" fill="${G("#fff4dc")}" ${O2}/>`,
  spikes:()=>`<path d="M-24 -6 l2 -9 l6 7 Z M-14 -10 l3 -9 l5 8 Z M-4 -22 l1 -9 l6 6 Z M-4 -11 l3 -8 l4 7 Z" fill="${G("#ff9f43")}" ${O2}/>`,
  fire:()=>`<path d="M38 -13 Q48 -26 60 -18 Q54 -14 64 -8 Q52 -4 56 4 Q44 -2 38 -9 Z" fill="${G("#ff9f43")}" ${O2}/><path d="M40 -12 Q48 -18 54 -14 Q50 -10 56 -6 Q48 -6 40 -10 Z" fill="#ffe066"/>`,
  horn:()=>`<g transform="translate(18 -31) rotate(20)"><path d="M-4 0 L0 -17 L4 0 Z" fill="${G("#ffe066")}" ${O2}/><path d="M-3 -4 L3 -6 M-2 -9 L2 -10 M-1 -13 L1 -14" stroke="#e0a526" stroke-width="1.2"/></g><path d="M-2 -28 Q-12 -22 -8 -10 Q-4 -18 2 -20 Q-4 -14 -2 -6 Q4 -16 4 -24 Z" fill="${G("#ff9ec7")}" ${O2}/>`
});
Object.assign(BACK,{
  fwings:()=>`<path d="M-4 -6 Q-22 -50 -42 -34 Q-44 -12 -6 -2 Z" fill="#e6f7ff" fill-opacity=".72" stroke="#9fd8ff" stroke-width="1.6"/><path d="M-4 0 Q-34 4 -38 20 Q-20 26 -6 6 Z" fill="#ffe3f4" fill-opacity=".72" stroke="#ffb3dc" stroke-width="1.6"/><path d="M-8 -6 Q-22 -26 -32 -30 M-8 2 Q-22 8 -30 16" fill="none" stroke="#fff" stroke-width="1.4" opacity=".8"/>`,
  dwgreen:()=>`<path d="M-6 -6 L-24 -42 L-28 -26 L-42 -34 L-38 -16 L-52 -14 L-10 4 Z" fill="${G("#3fb86a")}" ${O2}/><path d="M-8 -4 L-24 -40 M-8 -2 L-38 -16" stroke="#2a8a4c" stroke-width="1.6" fill="none"/>`,
  dwred:()=>`<path d="M-6 -6 L-24 -42 L-28 -26 L-42 -34 L-38 -16 L-52 -14 L-10 4 Z" fill="${G("#e8423a")}" ${O2}/><path d="M-8 -4 L-24 -40 M-8 -2 L-38 -16" stroke="#b02a22" stroke-width="1.6" fill="none"/>`,
  dwpurple:()=>`<path d="M-6 -6 L-24 -42 L-28 -26 L-42 -34 L-38 -16 L-52 -14 L-10 4 Z" fill="${G("#7a4fe0")}" ${O2}/><path d="M-8 -4 L-24 -40 M-8 -2 L-38 -16" stroke="#5a34b8" stroke-width="1.6" fill="none"/>`
});
/* Mama Dragon lost her gold coins all over the kingdom. Every duck you find gives one back. */
function coinIcon(s=1){ return `<g transform="scale(${s})"><circle r="12" fill="${G("#ffd45c")}" ${O2}/><circle r="8.4" fill="none" stroke="#e0a526" stroke-width="1.8"/><path d="M-5 3 L-5.5 -4 L-2.5 -1.5 L0 -6 L2.5 -1.5 L5.5 -4 L5 3 Z" fill="#e0a526"/>${spark(8,-9,.4,"#fff6c9")}</g>`; }
function toyDragon(done){
  return `<g transform="scale(1.08)">${toyDuck({body:"#9b6bff",wing:"#7a4fe0",beak:"#ffb066"},"dwpurple horns spikes")}</g>
  <path d="M-30 -20 Q-46 -30 -52 -18 Q-44 -22 -40 -14 Z" fill="${G("#ff9f43")}" ${O2}/>
  ${done?crownAt(13,-40):`<g transform="translate(-20 18)">${coinIcon(.62)}</g>`}`;
}
toyDragon=soften(toyDragon);
