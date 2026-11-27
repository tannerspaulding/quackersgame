/* ---------- Board Game Land: things ducks wear, the Raccoon helper and its dice ---------- */
Object.assign(ACC,{
  pips:()=>`${[[-14,0],[-4,-6],[6,12],[-16,14],[-4,4],[10,-30]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="2.6" fill="#2b2b45"/>`).join("")}`,
  puzzle:()=>`<path d="M-18 4 h6 a3.4 3.4 0 1 1 6 0 h6 v6 a3.4 3.4 0 1 0 0 6 v6 h-18 Z" fill="${G("#ffcb2f")}" ${O2}/><g transform="translate(12 -31) rotate(-10)"><path d="M-8 0 v-8 h5 a3 3 0 1 1 6 0 h5 v8 Z" fill="${G("#ff6fa6")}" ${O2}/></g>`,
  deerstalker:()=>`<g transform="translate(12 -28) rotate(-6)"><path d="M-15 2 Q-15 -16 0 -16 Q15 -16 15 2 Z" fill="${G("#b88a5a")}" ${O2}/><path d="M-14 -6 Q0 -10 14 -6 M-10 -13 L-12 2 M0 -16 V2 M10 -13 L12 2" fill="none" stroke="#8a6238" stroke-width="1.4"/><path d="M12 0 Q24 2 24 6 Q16 6 10 4 Z" fill="${G("#b88a5a")}" ${O2}/><circle cy="-16" r="2.4" fill="${G("#8a6238")}"/></g>`,
  magnify:()=>`<path d="M-22 14 L-36 30" stroke="#7a4b26" stroke-width="4.4" stroke-linecap="round"/><circle cx="-16" cy="6" r="10" fill="#d9f2ff" fill-opacity=".55" stroke="${G("#ffd45c")}" stroke-width="3.6"/><path d="M-21 2 Q-18 -1 -14 0" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"/>`,
  butler:()=>`<g transform="translate(12 -30) rotate(-6)"><path d="M-10 0 Q-10 -15 0 -15 Q10 -15 10 0 Z" fill="${G("#2b2b45")}" ${O2}/><rect x="-16" y="-2" width="32" height="5" rx="2.5" fill="${G("#2b2b45")}" ${O2}/></g><path d="M6 -2 L-4 -8 V4 Z M6 -2 L16 -8 V4 Z" fill="${G("#2b2b45")}" ${O2}/><circle cx="6" cy="-2" r="2.6" fill="${G("#2b2b45")}" ${O2}/>`,
  qmark:()=>`<g transform="translate(-30 -26) rotate(-12)"><text x="0" y="0" text-anchor="middle" font-family="Grandstander,sans-serif" font-weight="900" font-size="26" fill="${G("#ffe066")}" stroke="${INK}" stroke-width="1.6">?</text></g><path d="M5 -25 Q17 -31 29 -25 Q30 -18 22 -17 Q17 -21 12 -17 Q4 -18 5 -25 Z" fill="${G("#2b2b45")}" ${O2}/><ellipse cx="17" cy="-21" rx="3" ry="2.4" fill="#fff" opacity=".9"/>`,
  visor:()=>`<g transform="translate(12 -30)"><path d="M-14 2 Q0 -6 14 2 L13 5 Q0 -2 -13 5 Z" fill="${G("#3fb86a")}" ${O2}/><path d="M6 2 Q18 -2 28 6 Q18 8 8 6 Z" fill="#3fb86a" fill-opacity=".75" ${O2}/></g>`,
  money:()=>`<g transform="translate(-30 10) rotate(-14)">${[0,1,2].map(i=>`<rect x="-10" y="${-i*4}" width="20" height="10" rx="2" fill="${G(["#9be7a6","#ffe066","#9fdcff"][i])}" ${O2}/>`).join("")}<circle cx="0" cy="-3" r="2.6" fill="none" stroke="#3f9d3a" stroke-width="1.4"/></g>`,
  coinslot:()=>`<rect x="-10" y="-11" width="14" height="3.4" rx="1.7" fill="#c0567a"/><g transform="translate(-3 -19)"><circle r="6" fill="${G("#ffd45c")}" ${O2}/><circle r="3.4" fill="none" stroke="#e0a526" stroke-width="1.4"/></g>`,
  roadcap:()=>`<g transform="translate(12 -30) rotate(-8)"><path d="M-14 2 Q-14 -14 0 -14 Q14 -14 14 2 Z" fill="${G("#e8423a")}" ${O2}/><path d="M8 0 Q20 -2 28 4 Q18 6 8 4 Z" fill="${G("#e8423a")}" ${O2}/><circle cy="-14" r="2.2" fill="#fff"/></g>`,
  propeller:()=>`<g transform="translate(12 -30)"><path d="M-14 2 Q-14 -14 0 -14 Q14 -14 14 2 Z" fill="${G("#4fb3ff")}" ${O2}/><path d="M-14 -2 Q0 -6 14 -2" stroke="#ffe066" stroke-width="3" fill="none"/><path d="M0 -14 V-19" stroke="${INK}" stroke-width="2"/><path d="M0 -20 Q-12 -26 -16 -20 Q-10 -18 0 -20 Q12 -26 16 -20 Q10 -18 0 -20 Z" fill="${G("#ff6fa6")}" ${O2}/></g>`,
  whee:()=>`<path d="M-34 -6 H-50 M-32 6 H-52 M-34 18 H-46" stroke="#fff" stroke-width="3.4" stroke-linecap="round" opacity=".9"/><path d="M0 -6 Q12 -1 26 -6 L26 0 Q12 6 0 0 Z" fill="${G("#ffe066")}" ${O2}/><path d="M2 -2 Q-10 -6 -18 -2 L-16 4 Q-8 2 0 4 Z" fill="${G("#ffe066")}" ${O2}/>`,
  medal:()=>`<path d="M2 -6 L8 8 M18 -6 L12 8" stroke="#e8423a" stroke-width="4"/><circle cx="10" cy="13" r="6.4" fill="${G("#ffd45c")}" ${O2}/><path d="M10 9.6 L11 12 L13.4 12.2 L11.6 13.8 L12.2 16.2 L10 15 L7.8 16.2 L8.4 13.8 L6.6 12.2 L9 12 Z" fill="#fff6c9"/>`
});
/* The Raccoon lost its dice all over Board Game Land. Every duck you find gives one back. */
function diceIcon(s=1){ return `<g transform="scale(${s})"><rect x="-11" y="-11" width="22" height="22" rx="5" fill="${G("#ffffff")}" ${O2}/>${[[-5,-5],[5,5],[0,0],[5,-5],[-5,5]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="2.2" fill="#e8423a"/>`).join("")}</g>`; }
function toyRaccoon(done){
  const T="M-18 4 Q-34 2 -40 -12 Q-44 -24 -36 -32";
  return `<path d="${T}" fill="none" stroke="${G("#a7adb8")}" stroke-width="13" stroke-linecap="round"/><path d="${T}" fill="none" stroke="#3d4048" stroke-width="13.4" stroke-dasharray="5 7" stroke-dashoffset="-3"/><circle cx="-36" cy="-32" r="6.4" fill="#3d4048"/>
  ${[-14,-5,7,16].map(x=>`<rect x="${x-3.5}" y="10" width="7" height="15" rx="3.4" fill="${G("#5b6170")}" ${O2}/>`).join("")}
  <ellipse cx="0" cy="5" rx="23" ry="15" fill="${G("#a7adb8")}" ${O}/><ellipse cx="4" cy="10" rx="13" ry="8" fill="${G("#e7e9ee")}" ${O2}/><ellipse cx="-9" cy="-2" rx="7" ry="3" fill="#fff" opacity=".45"/>
  <path d="M8 -26 L6 -40 L18 -30 Z M26 -30 L34 -40 L34 -25 Z" fill="${G("#a7adb8")}" ${O2}/><path d="M9 -29 L8 -36 L14 -31 Z M28 -30 L32 -36 L32 -28 Z" fill="#5b6170"/>
  <ellipse cx="20" cy="-16" rx="16" ry="14" fill="${G("#a7adb8")}" ${O}/>
  <path d="M5 -20 Q12 -27 20 -21 Q28 -27 35 -19 Q33 -12 27 -13 Q21 -17 15 -13 Q8 -12 5 -20 Z" fill="${G("#3d4048")}"/>
  <path d="M7 -24 Q13 -28 19 -24 M22 -24 Q28 -28 33 -22" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"/>
  <circle cx="14" cy="-18" r="2.8" fill="#fff"/><circle cx="14.6" cy="-18.4" r="1.6" fill="#1a1a1a"/><circle cx="27" cy="-18" r="2.8" fill="#fff"/><circle cx="27.6" cy="-18.4" r="1.6" fill="#1a1a1a"/>
  <ellipse cx="28" cy="-8" rx="9" ry="6.4" fill="${G("#f4f5f8")}" ${O2}/><ellipse cx="35" cy="-10" rx="3.2" ry="2.4" fill="#1a1a1a"/><path d="M27 -5 Q30 -2 33 -4" stroke="#5b6170" stroke-width="1.4" fill="none" stroke-linecap="round"/><ellipse cx="18" cy="-8" rx="3" ry="1.8" fill="#ff8fb1" opacity=".6"/>
  ${done?crownAt(20,-31):`<g transform="translate(34 8) rotate(-12)">${diceIcon(.6)}</g>`}`;
}
toyRaccoon=soften(toyRaccoon);
/* Scenery pieces for Board Game Land. */
function spinWheel(r,n,cols,nums){ let s=""; for(let i=0;i<n;i++){ const a0=i*2*Math.PI/n-Math.PI/2, a1=(i+1)*2*Math.PI/n-Math.PI/2, am=(a0+a1)/2;
  s+=`<path d="M0 0 L${(r*Math.cos(a0)).toFixed(1)} ${(r*Math.sin(a0)).toFixed(1)} A${r} ${r} 0 0 1 ${(r*Math.cos(a1)).toFixed(1)} ${(r*Math.sin(a1)).toFixed(1)} Z" fill="${cols[i%cols.length]}" stroke="#fff" stroke-width="${r>20?1.6:1}"/>`;
  if(nums) s+=`<text x="${(r*.72*Math.cos(am)).toFixed(1)}" y="${(r*.72*Math.sin(am)+3.4).toFixed(1)}" text-anchor="middle" font-family="Grandstander,sans-serif" font-weight="900" font-size="10" fill="${INK}">${i+1}</text>`; }
  return s; }
const WHEELC=["#ff6fa6","#ffcb2f","#4fb3ff","#7fd04e","#b48cff","#ff8a3d"];
const ladderArt=(x1,y1,x2,y2,w=12,c="#c98a52")=>{ const dx=x2-x1, dy=y2-y1, L=Math.hypot(dx,dy), ux=-dy/L*w/2, uy=dx/L*w/2, n=Math.floor(L/12);
  let s=`<path d="M${(x1+ux).toFixed(1)} ${(y1+uy).toFixed(1)} L${(x2+ux).toFixed(1)} ${(y2+uy).toFixed(1)} M${(x1-ux).toFixed(1)} ${(y1-uy).toFixed(1)} L${(x2-ux).toFixed(1)} ${(y2-uy).toFixed(1)}" stroke="${c}" stroke-width="${w>20?6:3.4}" stroke-linecap="round"/>`;
  for(let i=1;i<n;i++){ const t=i/n, x=x1+dx*t, y=y1+dy*t; s+=`<path d="M${(x+ux).toFixed(1)} ${(y+uy).toFixed(1)} L${(x-ux).toFixed(1)} ${(y-uy).toFixed(1)}" stroke="${c}" stroke-width="${w>20?4.4:2.4}"/>`; }
  return s; };
const BOXICON={
  mystery:`<circle r="10" fill="#d9f2ff" stroke="#ffd45c" stroke-width="3.6"/><path d="M7 7 L15 15" stroke="#7a4b26" stroke-width="4.4" stroke-linecap="round"/><text y="5" text-anchor="middle" font-family="Grandstander,sans-serif" font-weight="900" font-size="14" fill="#5a3790">?</text>`,
  lucky:`<path d="M-13 1 L0 -12 L13 1 V13 H-13 Z" fill="#3fb86a" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/><rect x="-4" y="4" width="8" height="9" fill="#fff"/><circle cx="16" cy="8" r="6" fill="#ffd45c" stroke="#e0a526" stroke-width="1.4"/>`,
  spinner:`<g>${spinWheel(13,6,WHEELC)}</g><circle r="3" fill="#fff" stroke="${INK}" stroke-width="1.2"/><path d="M0 0 L8 -8" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/>`,
  ladders:`<path d="M-8 -13 V13 M8 -13 V13 M-8 -6 H8 M-8 1 H8 M-8 8 H8" stroke="#fff" stroke-width="3" stroke-linecap="round"/><path d="M12 -12 Q22 -2 12 6 Q4 12 14 14" stroke="#ffe066" stroke-width="4" fill="none" stroke-linecap="round"/>`};
/* A game box on the shelf. It's a door: tap it to jump into that game. */
const gameBox=(x,y,c,label,icon)=>`<g transform="translate(${x} ${y})"><rect x="3" y="4" width="100" height="62" rx="6" fill="#4a2a16" opacity=".5"/><rect width="100" height="62" rx="6" fill="${G(c)}" ${O}/><rect x="4" y="4" width="92" height="54" rx="4" fill="none" stroke="#fff" stroke-width="1.6" opacity=".55"/>
  <g transform="translate(50 25)">${icon}</g><text x="50" y="54" text-anchor="middle" font-family="Grandstander,sans-serif" font-weight="900" font-size="11.5" letter-spacing=".6" fill="#fff" stroke="${INK}" stroke-width="2.6" paint-order="stroke">${label}</text></g>`;
