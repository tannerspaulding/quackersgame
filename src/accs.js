/* ---------- More things ducks wear (for Spooky Manor and Under the Sea) ---------- */
Object.assign(ACC,{
  antenna:()=>`<path d="M12 -32 V-44" stroke="${INK}" stroke-width="2.6"/><circle cx="12" cy="-46" r="4.6" fill="${G("#ff5c5c")}" ${O2}/><rect x="6" y="-24" width="16" height="6" rx="3" fill="#9fe7ff" stroke="${INK}" stroke-width="1.6"/>`,
  bowtie:()=>`<path d="M4 -3 L-6 -9 V3 Z M4 -3 L14 -9 V3 Z" fill="${G("#d8344f")}" ${O2}/><circle cx="4" cy="-3" r="2.6" fill="${G("#d8344f")}" ${O2}/>`,
  chef:()=>`<g transform="translate(12 -31)"><rect x="-9" y="-4" width="18" height="8" rx="2" fill="${G("#ffffff")}" ${O2}/><circle cx="-6" cy="-8" r="6" fill="${G("#ffffff")}" ${O2}/><circle cx="1" cy="-12" r="7" fill="${G("#ffffff")}" ${O2}/><circle cx="7" cy="-7" r="6" fill="${G("#ffffff")}" ${O2}/></g>`,
  bat:()=>`<path d="M-6 -4 L-30 -26 L-24 -12 L-38 -12 L-26 -2 L-36 4 L-8 6 Z" fill="${G("#3a2a55")}" ${O2}/><path d="M18 -30 L14 -42 L24 -34 Z M8 -30 L4 -42 L12 -32 Z" fill="${G("#3a2a55")}" ${O2}/>`,
  pirate:()=>`<g transform="translate(12 -30) rotate(-6)"><path d="M-18 0 Q-12 -16 0 -16 Q12 -16 18 0 Q0 -6 -18 0 Z" fill="${G("#2b2b2b")}" ${O2}/><circle cx="0" cy="-8" r="3" fill="#fff"/><path d="M-2 -5 L2 -3 M2 -5 L-2 -3" stroke="#fff" stroke-width="1.2"/></g><path d="M8 -22 L28 -22" stroke="#1a1a1a" stroke-width="2"/><ellipse cx="18" cy="-21" rx="5" ry="5.4" fill="#1a1a1a"/>`,
  snorkel:()=>`<rect x="9" y="-27" width="18" height="12" rx="5" fill="${G("#9fe7ff")}" fill-opacity=".8" ${O2}/><path d="M4 -20 H9 M27 -20 H30" stroke="#ff6f61" stroke-width="3"/><path d="M-2 -18 V-44 Q-2 -48 3 -48" fill="none" stroke="#ff9f43" stroke-width="4.5" stroke-linecap="round"/>`,
  glow:()=>`<circle cx="0" cy="-4" r="40" fill="#9bffea" opacity=".16"/><circle cx="0" cy="-4" r="30" fill="#9bffea" opacity=".2"/>${spark(-30,-28,.7,"#e9fffa")}${spark(34,-34,.55,"#e9fffa")}`,
  specs:()=>`<circle cx="17" cy="-21" r="6.4" fill="none" stroke="#d4ac0d" stroke-width="2"/><path d="M23 -21 H27 M11 -21 L4 -24" stroke="#d4ac0d" stroke-width="2"/>`,
  web:()=>`<path d="M14 -33 V-90" stroke="#e8e8f0" stroke-width="1.4" opacity=".8"/>`,
  pumpkin:()=>`<g transform="translate(12 -32)"><path d="M0 0 Q-2 -6 2 -9" stroke="#3f6b1f" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M2 -6 Q8 -10 10 -4 Q5 -3 2 -6 Z" fill="${G("#5fbf45")}" ${O2}/></g>`,
  sandpail:()=>`<g transform="translate(13 -33)"><path d="M-10 -10 H10 L8 2 H-8 Z" fill="${G("#ff6f61")}" ${O2}/><path d="M-9 -10 Q0 -20 9 -10" fill="none" stroke="${INK}" stroke-opacity=".4" stroke-width="1.6"/></g>`
});

/* ---------- The Mall: new things ducks wear ---------- */
Object.assign(ACC,{
  phone:()=>`<g transform="translate(-24 4) rotate(-14)"><path d="M6 6 L0 0" stroke="${INK}" stroke-width="2"/><rect x="-7" y="-14" width="14" height="23" rx="3.4" fill="${G("#2b2b45")}" ${O2}/><rect x="-5" y="-11" width="10" height="15" rx="1.6" fill="#9fe7ff"/><circle cx="0" cy="6.5" r="1.2" fill="#9fe7ff"/></g>`,
  headphones:()=>`<path d="M-1 -18 Q10 -44 26 -24" fill="none" stroke="${INK}" stroke-opacity=".3" stroke-width="6.5" stroke-linecap="round"/><path d="M-1 -18 Q10 -44 26 -24" fill="none" stroke="#ff5c8a" stroke-width="4.4" stroke-linecap="round"/><rect x="-7" y="-25" width="10" height="15" rx="4" fill="${G("#ff5c8a")}" ${O2}/><rect x="-5" y="-22" width="4" height="9" rx="2" fill="#2b2b45"/><g ${N}><path d="M30 -40 v8 M30 -40 l5 -1.5 v8" stroke="${INK}" stroke-width="1.8" fill="none"/><circle cx="28.6" cy="-31.6" r="2" fill="${INK}"/><circle cx="33.6" cy="-33" r="2" fill="${INK}"/></g>`,
  lollipop:()=>`<path d="M-16 6 L-26 -30" stroke="${INK}" stroke-opacity=".3" stroke-width="4.4" stroke-linecap="round"/><path d="M-16 6 L-26 -30" stroke="#fff" stroke-width="2.8" stroke-linecap="round"/><g transform="translate(-27 -38)"><circle r="11" fill="${G("#ff6fa6")}" ${O2}/><path d="M0 0 m-7 0 a7 7 0 1 1 7 7 a4.6 4.6 0 1 1 -4.6 -4.6 a2.4 2.4 0 1 1 2.4 2.4" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/></g>`,
  pizza:()=>`<g transform="translate(11 -32) rotate(-8)"><path d="M-14 -1 L14 -1 L0 -27 Z" fill="${G("#ffd45c")}" ${O2}/><path d="M-15 -3 Q0 3 15 -3 L15 1 Q0 7 -15 1 Z" fill="${G("#d9954a")}" ${O2}/><circle cx="-4" cy="-8" r="3" fill="#e8423a"/><circle cx="4" cy="-13" r="2.6" fill="#e8423a"/><circle cx="0" cy="-19" r="2" fill="#e8423a"/><path d="M6 -4 q1 5 -1 8" stroke="#ffd45c" stroke-width="2.6" fill="none" stroke-linecap="round"/></g>`,
  bow:()=>`<g transform="translate(6 -31) rotate(-14)"><path d="M0 0 L-10 -6 V6 Z M0 0 L10 -6 V6 Z" fill="${G("#ff5c8a")}" ${O2}/><circle r="3" fill="${G("#ff5c8a")}" ${O2}/></g>`,
  teddy:()=>`<circle cx="2" cy="-30" r="5.4" fill="${G("#b07a4a")}" ${O2}/><circle cx="21" cy="-30" r="5.4" fill="${G("#b07a4a")}" ${O2}/><circle cx="2" cy="-30" r="2.4" fill="#e9c49a"/><circle cx="21" cy="-30" r="2.4" fill="#e9c49a"/>`
});
/* The Eagle lost its golden feathers all over the mall. Every duck you find gives you one back. */
function featherIcon(s=1){ return `<g transform="scale(${s}) rotate(25)"><path d="M0 -14 Q9 -6 6 6 Q3 12 0 14 Q-3 12 -6 6 Q-9 -6 0 -14 Z" fill="${G("#ffcf4a")}" ${O2}/><path d="M0 -11 V16" stroke="#c98a14" stroke-width="1.6" stroke-linecap="round"/><path d="M0 -4 L-5 -8 M0 1 L-5 -3 M0 6 L-4 3 M0 -4 L5 -8 M0 1 L5 -3 M0 6 L4 3" stroke="#e0a526" stroke-width="1.1" stroke-linecap="round"/></g>`; }
function toyEagle(done){
  return `<path d="M-8 22 l-4 6 M-8 22 l0 7 M-8 22 l4 6 M8 22 l-4 6 M8 22 l0 7 M8 22 l4 6" stroke="#e0a526" stroke-width="2.4" stroke-linecap="round"/>
  <path d="M-12 -2 Q-34 -14 -40 4 Q-30 6 -26 14 Q-18 10 -12 14 Z" fill="${G("#7a4b26")}" ${O}/><path d="M12 -2 Q34 -14 40 4 Q30 6 26 14 Q18 10 12 14 Z" fill="${G("#7a4b26")}" ${O}/>
  <path d="M-34 0 l6 6 M-28 -4 l4 8 M34 0 l-6 6 M28 -4 l-4 8" stroke="#5a3519" stroke-width="1.4" stroke-linecap="round" opacity=".7"/>
  <path d="M0 -6 C16 -6 19 8 16 16 C13 26 -13 26 -16 16 C-19 8 -16 -6 0 -6 Z" fill="${G("#8a5a2e")}" ${O}/>
  <path d="M-6 26 l6 -6 l6 6 Z" fill="${G("#f4f0e6")}" ${O2}/>
  <circle cx="0" cy="-16" r="14" fill="${G("#f8f6ef")}" ${O}/>
  <ellipse cx="-6" cy="-24" rx="5" ry="2.6" fill="#fff" opacity=".6" transform="rotate(-25 -6 -24)"/>
  <path d="M-11 -22 Q-6 -25 -2 -21 M11 -22 Q6 -25 2 -21" stroke="#5a4a3a" stroke-width="2" fill="none" stroke-linecap="round"/>
  <ellipse cx="-6" cy="-16" rx="2.8" ry="3.4" fill="#1a1a1a"/><ellipse cx="6" cy="-16" rx="2.8" ry="3.4" fill="#1a1a1a"/><circle cx="-5" cy="-17.4" r="1.1" fill="#fff"/><circle cx="7" cy="-17.4" r="1.1" fill="#fff"/>
  <path d="M-5 -11 Q0 -14 5 -11 Q4 -4 0 -2 Q-1 -5 -5 -11 Z" fill="${G("#ffc93c")}" ${O2}/>
  <ellipse cx="-9" cy="-9" rx="2.8" ry="1.6" fill="#ff8fb1" opacity=".55"/><ellipse cx="9" cy="-9" rx="2.8" ry="1.6" fill="#ff8fb1" opacity=".55"/>
  ${done?crownAt(0,-28):`<g transform="translate(14 10)">${featherIcon(.7)}</g>`}`;
}
/* Mr. Platypus, the star of Platypus Jump. */
function toyPlatypus(){
  return `<path d="M-22 4 Q-40 0 -44 12 Q-38 22 -20 16 Z" fill="${G("#8a5a33")}" ${O}/><path d="M-40 8 L-24 14 M-38 14 L-26 8" stroke="#6b4426" stroke-width="1.6" opacity=".7"/>
  <path d="M-14 18 l-6 6 h10 z M8 18 l-4 6 h10 z" fill="${G("#ff9f43")}" ${O2}/>
  <ellipse cx="-4" cy="8" rx="23" ry="14" fill="${G("#b07a4a")}" ${O}/>
  <path d="M-12 12 Q-2 20 10 12" fill="none" stroke="#e9c49a" stroke-width="5" stroke-linecap="round" opacity=".8"/>
  <circle cx="14" cy="-6" r="13" fill="${G("#b07a4a")}" ${O}/>
  <ellipse cx="8" cy="-14" rx="4.5" ry="2.6" fill="#fff" opacity=".5" transform="rotate(-30 8 -14)"/>
  <path d="M22 -9 Q42 -12 44 -3 Q42 5 22 2 Q19 -3 22 -9 Z" fill="${G("#4a5568")}" ${O2}/><path d="M28 -4 H40" stroke="#2d3646" stroke-width="1.4" stroke-linecap="round"/>
  <ellipse cx="17" cy="-10" rx="3.2" ry="4" fill="#1a1a1a"/><circle cx="18.2" cy="-11.6" r="1.3" fill="#fff"/>
  <ellipse cx="16" cy="-2" rx="3" ry="1.8" fill="#ff8fb1" opacity=".7"/>
  <path d="M4 -17 Q14 -24 24 -16 L22 -13 Q14 -18 6 -13 Z" fill="${G("#ff5c5c")}" ${O2}/><path d="M4 -17 L-4 -12 L2 -10 Z" fill="${G("#ff5c5c")}" ${O2}/>`;
}
/* A beach crab. It runs sideways, of course. */
function toyCrab(){
  return `<path d="M-12 6 l-10 8 M-10 10 l-8 10 M12 6 l10 8 M10 10 l8 10" stroke="${INK}" stroke-opacity=".5" stroke-width="3" stroke-linecap="round"/><path d="M-12 6 l-10 8 M-10 10 l-8 10 M12 6 l10 8 M10 10 l8 10" stroke="#e8423a" stroke-width="1.8" stroke-linecap="round"/>
  <path d="M-12 -2 Q-20 -8 -22 -14 M12 -2 Q20 -8 22 -14" stroke="#e8423a" stroke-width="3.4" fill="none" stroke-linecap="round"/>
  <path d="M-22 -14 q-9 -2 -8 -10 q6 2 6 6 q2 -6 8 -6 q2 8 -6 10 Z" fill="${G("#ff5c4a")}" ${O2}/><path d="M22 -14 q9 -2 8 -10 q-6 2 -6 6 q-2 -6 -8 -6 q-2 8 6 10 Z" fill="${G("#ff5c4a")}" ${O2}/>
  <ellipse cx="0" cy="4" rx="17" ry="11" fill="${G("#ff5c4a")}" ${O}/><ellipse cx="-6" cy="-1" rx="5" ry="2.4" fill="#fff" opacity=".45"/>
  <path d="M-5 -6 V-15 M5 -6 V-15" stroke="${INK}" stroke-width="2"/><circle cx="-5" cy="-16" r="3.4" fill="#fff" stroke="${INK}" stroke-width="1.4"/><circle cx="5" cy="-16" r="3.4" fill="#fff" stroke="${INK}" stroke-width="1.4"/><circle cx="-4.4" cy="-16" r="1.6" fill="#1a1a1a"/><circle cx="4.4" cy="-16" r="1.6" fill="#1a1a1a"/>
  <path d="M-4 6 Q0 9 4 6" stroke="${INK}" stroke-width="1.6" fill="none" stroke-linecap="round"/>`;
}
toyEagle=soften(toyEagle); toyPlatypus=soften(toyPlatypus); toyCrab=soften(toyCrab);
