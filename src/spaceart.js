/* ---------- Space world: things ducks wear, the Alien helper, its moon rocks and the space monster ---------- */
Object.assign(ACC,{
  helmet:()=>`<circle cx="15" cy="-17" r="23" fill="#dff4ff" fill-opacity=".38" stroke="${INK}" stroke-opacity=".45" stroke-width="2.2"/><path d="M2 -32 Q10 -39 20 -37" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".85"/><rect x="-6" y="2" width="38" height="6" rx="3" fill="${G("#dfe5ec")}" ${O2}/>`,
  eye3:()=>`<ellipse cx="8" cy="-27" rx="4.6" ry="5" fill="#fff" stroke="${INK}" stroke-opacity=".5" stroke-width="1.3"/><ellipse cx="9" cy="-26.5" rx="2.6" ry="3.2" fill="#1a1a1a"/><circle cx="9.8" cy="-28" r=".9" fill="#fff"/><path d="M4 -34 Q12 -38 16 -33" fill="none" stroke="${INK}" stroke-opacity=".5" stroke-width="1.6" stroke-linecap="round"/>`,
  slime:()=>`<path d="M-8 -30 Q2 -40 20 -34 Q24 -28 20 -22 Q18 -16 14 -20 Q12 -26 8 -22 Q4 -14 0 -22 Q-6 -28 -8 -30 Z" fill="${G("#7cf06a")}" fill-opacity=".9" ${O2}/><path d="M-20 6 Q-22 16 -18 18 Q-14 16 -16 8" fill="${G("#7cf06a")}" ${O2}/>`,
  sparks:()=>`${spark(-30,-24,1,"#9fe7ff")}${spark(34,-34,.8,"#ffe066")}${spark(-34,10,.7,"#9fe7ff")}<path d="M28 -6 l6 -4 l-2 6 l6 -2" fill="none" stroke="#ffe066" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`,
  comet:()=>`<path d="M-24 -2 Q-52 -16 -64 -6 Q-48 -6 -40 2 Q-52 6 -60 16 Q-42 14 -24 10 Z" fill="${G("#ffe066")}" fill-opacity=".75" ${O2}/>`,
});
function rockIcon(s=1){ return `<g transform="scale(${s})"><path d="M-12 4 Q-14 -8 -4 -12 Q8 -14 12 -4 Q15 8 4 12 Q-8 14 -12 4 Z" fill="${G("#b9a8e0")}" ${O2}/><circle cx="-4" cy="-3" r="3" fill="#8f7cc4"/><circle cx="5" cy="4" r="2.2" fill="#8f7cc4"/>${spark(9,-11,.45,"#fff6c9")}</g>`; }
function toyAlien(done){
  return `<path d="M-10 20 l-4 8 M10 20 l4 8" stroke="${INK}" stroke-opacity=".5" stroke-width="4" stroke-linecap="round"/>
  <path d="M-14 -2 Q-30 4 -32 16 M14 -2 Q30 4 32 16" fill="none" stroke="${G("#7fd04e")}" stroke-width="6" stroke-linecap="round"/>
  <path d="M-15 -4 Q-18 22 0 24 Q18 22 15 -4 Z" fill="${G("#7fd04e")}" ${O}/>
  <path d="M-6 -36 L-12 -50 M6 -36 L12 -50" stroke="#5aa832" stroke-width="2.6" stroke-linecap="round"/><circle cx="-12" cy="-51" r="4" fill="${G("#ff6fa6")}" ${O2}/><circle cx="12" cy="-51" r="4" fill="${G("#ff6fa6")}" ${O2}/>
  <ellipse cx="0" cy="-20" rx="22" ry="18" fill="${G("#8fe05a")}" ${O}/>
  <ellipse cx="-9" cy="-22" rx="7" ry="9" fill="#1a1a1a"/><ellipse cx="9" cy="-22" rx="7" ry="9" fill="#1a1a1a"/><circle cx="-7" cy="-26" r="2.6" fill="#fff"/><circle cx="11" cy="-26" r="2.6" fill="#fff"/>
  <path d="M-6 -9 Q0 -5 6 -9" fill="none" stroke="#2f6a1c" stroke-width="2.2" stroke-linecap="round"/>
  ${done?crownAt(0,-36):`<g transform="translate(18 12)">${rockIcon(.62)}</g>`}`;
}
/* The space monster: a silly one-eyed blob, more goofy than scary. */
function monsterArt(){
  return `<path d="M-30 18 Q-34 -30 0 -32 Q34 -30 30 18 Q24 12 18 20 Q12 12 6 20 Q0 12 -6 20 Q-12 12 -18 20 Q-24 12 -30 18 Z" fill="${G("#a066e0")}" ${O}/>
  <path d="M-30 14 Q-46 6 -44 -8 M30 14 Q46 6 44 -8" fill="none" stroke="${G("#a066e0")}" stroke-width="7" stroke-linecap="round"/>
  <circle cx="0" cy="-10" r="13" fill="#fff" stroke="${INK}" stroke-opacity=".4" stroke-width="1.6"/><circle cx="3" cy="-8" r="6.5" fill="#1a1a1a"/><circle cx="5" cy="-10" r="2.2" fill="#fff"/>
  <path d="M-12 6 Q0 14 12 6" fill="#5a1f7a" stroke="${INK}" stroke-opacity=".4" stroke-width="1.4"/><path d="M-2 9 Q2 18 6 9" fill="#ff6fa6"/>
  <circle cx="-18" cy="-20" r="3" fill="#c79bff"/><circle cx="20" cy="-18" r="2.4" fill="#c79bff"/>`;
}
toyAlien=soften(toyAlien); monsterArt=soften(monsterArt);
