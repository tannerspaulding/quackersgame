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
