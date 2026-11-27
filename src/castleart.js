/* ---------- Fairy Tale Kingdom: things ducks wear, the Unicorn helper and its rainbow gems ---------- */
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
  nightcap:()=>`<g transform="translate(12 -30) rotate(-12)"><path d="M-14 2 Q-10 -18 10 -20 Q22 -20 28 -8 Q16 -12 12 0 Z" fill="${G("#4fb3ff")}" ${O2}/><circle cx="-2" cy="-10" r="1.6" fill="#ffe066"/><circle cx="12" cy="-14" r="1.4" fill="#ffe066"/><path d="M-15 2 Q0 -4 14 2" stroke="#fff" stroke-width="4" stroke-linecap="round"/><circle cx="28" cy="-7" r="4" fill="${G("#ffffff")}" ${O2}/></g><g ${N}><text x="34" y="-34" font-family="Grandstander,sans-serif" font-weight="900" font-size="11" fill="#7a4fe0">z</text><text x="42" y="-44" font-family="Grandstander,sans-serif" font-weight="900" font-size="8" fill="#7a4fe0">z</text></g>`
});
Object.assign(BACK,{
  fwings:()=>`<path d="M-4 -6 Q-22 -50 -42 -34 Q-44 -12 -6 -2 Z" fill="#e6f7ff" fill-opacity=".72" stroke="#9fd8ff" stroke-width="1.6"/><path d="M-4 0 Q-34 4 -38 20 Q-20 26 -6 6 Z" fill="#ffe3f4" fill-opacity=".72" stroke="#ffb3dc" stroke-width="1.6"/><path d="M-8 -6 Q-22 -26 -32 -30 M-8 2 Q-22 8 -30 16" fill="none" stroke="#fff" stroke-width="1.4" opacity=".8"/>`,
  dwgreen:()=>`<path d="M-6 -6 L-24 -42 L-28 -26 L-42 -34 L-38 -16 L-52 -14 L-10 4 Z" fill="${G("#3fb86a")}" ${O2}/><path d="M-8 -4 L-24 -40 M-8 -2 L-38 -16" stroke="#2a8a4c" stroke-width="1.6" fill="none"/>`,
  dwred:()=>`<path d="M-6 -6 L-24 -42 L-28 -26 L-42 -34 L-38 -16 L-52 -14 L-10 4 Z" fill="${G("#e8423a")}" ${O2}/><path d="M-8 -4 L-24 -40 M-8 -2 L-38 -16" stroke="#b02a22" stroke-width="1.6" fill="none"/>`
});
/* The Unicorn lost its rainbow gems all over the kingdom. Every duck you find gives one back. */
function gemIcon(s=1){ return `<g transform="scale(${s})"><path d="M-12 -4 L-6 -12 H6 L12 -4 L0 13 Z" fill="${G("#ff7ac8")}" ${O2}/><path d="M-12 -4 H12 M-6 -12 L-3 -4 L0 13 M6 -12 L3 -4 L0 13" fill="none" stroke="#fff" stroke-width="1.3" opacity=".75"/><path d="M-6 -12 H6 L3 -4 H-3 Z" fill="#ffd0ec" opacity=".8"/>${spark(10,-12,.42,"#fff6c9")}</g>`; }
function toyUnicorn(done){
  return `<path d="M-20 -2 Q-36 -4 -38 10 Q-36 22 -26 20 Q-32 12 -28 6 Q-24 2 -20 4 Z" fill="${G("#ff8fd1")}" ${O2}/><path d="M-21 2 Q-32 4 -32 12" fill="none" stroke="#9fd8ff" stroke-width="3" stroke-linecap="round"/><path d="M-22 6 Q-28 10 -28 16" fill="none" stroke="#c79bff" stroke-width="2.6" stroke-linecap="round"/>
  ${[-15,-6,7,16].map(x=>`<rect x="${x-3.5}" y="8" width="7" height="18" rx="3" fill="${G("#ffffff")}" ${O2}/><rect x="${x-3.5}" y="22" width="7" height="5" rx="2" fill="${G("#b45cff")}" ${O2}/>`).join("")}
  <ellipse cx="0" cy="4" rx="23" ry="14" fill="${G("#ffffff")}" ${O}/><ellipse cx="-8" cy="-2" rx="7" ry="3" fill="#fff" opacity=".7"/>
  <path d="M8 -4 Q10 -18 16 -24 L26 -16 Q20 -8 18 2 Z" fill="${G("#ffffff")}" ${O}/>
  <ellipse cx="20" cy="-20" rx="13" ry="11" fill="${G("#ffffff")}" ${O}/><ellipse cx="30" cy="-14" rx="8" ry="6.4" fill="${G("#ffe3f4")}" ${O2}/><circle cx="33" cy="-15" r="1.2" fill="#c06a9a"/>
  <path d="M12 -27 L10 -38 L18 -30 Z" fill="${G("#ffffff")}" ${O2}/><path d="M13 -29 L12 -35 L16 -31 Z" fill="#ffc2e0"/>
  <g transform="translate(22 -29) rotate(18)"><path d="M-4 0 L0 -19 L4 0 Z" fill="${G("#ffe066")}" ${O2}/><path d="M-3 -4 L3 -6 M-2 -9 L2 -10 M-1 -14 L1 -15" stroke="#e0a526" stroke-width="1.2"/></g>
  <path d="M14 -30 Q2 -30 4 -18 Q-2 -14 2 -6 Q6 -12 10 -10 Q6 -18 12 -22 Z" fill="${G("#ff8fd1")}" ${O2}/><path d="M10 -28 Q4 -24 6 -16" fill="none" stroke="#9fd8ff" stroke-width="2.6" stroke-linecap="round"/><path d="M8 -12 Q4 -8 6 -4" fill="none" stroke="#c79bff" stroke-width="2.6" stroke-linecap="round"/>
  <ellipse cx="22" cy="-22" rx="3" ry="3.8" fill="#1a1a1a"/><circle cx="23" cy="-23.4" r="1.2" fill="#fff"/><ellipse cx="25" cy="-15" rx="3" ry="1.8" fill="#ff8fb1" opacity=".7"/>
  ${done?crownAt(6,-30):`<g transform="translate(-14 16)">${gemIcon(.62)}</g>`}`;
}
toyUnicorn=soften(toyUnicorn);
