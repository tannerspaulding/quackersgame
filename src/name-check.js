/* Quackers leaderboard name check. Same file runs in the game (instant feedback)
   and in the Worker (the real gate). Returns {ok:true,name} or {ok:false,why,msg}. */
(function(root){
  const MAX=14, MIN=2;
  // Blocked anywhere inside the squashed name (long, unambiguous roots).
  const ROOTS=["fuck","fuk","fck","shit","sht","bitch","btch","cunt","dick","cock","pussy","penis","vagina","boob","tits",
    "porn","sex","nude","naked","horny","whore","slut","bastard","asshole","butthole","dildo","jizz","orgasm",
    "nigg","nigr","niga","negro","fag","dyke","tranny","retard","chink","kike","wetback","beaner",
    "nazi","hitler","kkk","rape","rapist","pedo","molest","murder","suicide","terror","weed","cocaine","drug",
    "damn","crap","piss","wtf","stfu","milf","thot","poop","fart","stupid","idiot","dumb","loser","ugly"];
  // Blocked only as a whole word (short ones that hide inside nice words: grass, bass, hello, shell).
  const WORDS=["ass","arse","hell","gay","kys","fat","butt","butts","pee","poo","cum","hoe","hoes","coon","spic","paki","gook","meth","kill","killer","bomb","gun","hate","simp","sus","from","age"];
  // Personal info and contact handles.
  const INFO=["school","elementary","street","road","avenue","lane","drive","grade","yearsold","myname","iam","imfrom",
    "phone","address","email","gmail","insta","tiktok","snap","discord","youtube","roblox","twitch","whatsapp","facebook","http","www","dotcom"];
  const LEET={"0":"o","1":"i","!":"i","|":"i","3":"e","4":"a","@":"a","5":"s","$":"s","7":"t","+":"t","8":"b","9":"g","2":"z","6":"g"};
  function tidy(s){ return String(s||"").normalize("NFKC").replace(/\s+/g," ").trim(); }
  function squash(s){ return s.toLowerCase().split("").map(c=>LEET[c]||c).join("").replace(/[^a-z]/g,"").replace(/(.)\1+/g,"$1"); }
  function leet(s){ return s.toLowerCase().split("").map(c=>LEET[c]||c).join("").replace(/[^a-z]/g,""); }
  function words(s){ return s.split(/\s+/).filter(Boolean).map(w=>leet(w)); }
  function check(raw){
    const name=tidy(raw);
    if(/[@:/\\]|\.(com|net|org|io|co|gg|me|tv)\b/i.test(name)) return {ok:false,why:"info",msg:"No emails or websites. Try a fun nickname!"};
    if(/\d(st|nd|rd|th)\b/i.test(name)) return {ok:false,why:"info",msg:"Keep it secret! No grades, schools or places. Try a duck nickname."};
    if(name.length<MIN) return {ok:false,why:"short",msg:"Your name needs at least 2 letters."};
    if(name.length>MAX) return {ok:false,why:"long",msg:`Keep it to ${MAX} letters or less.`};
    if(/\d.*\d.*\d/.test(name)) return {ok:false,why:"info",msg:"Too many numbers. Use 2 numbers at most."};
    const flat=squash(name), lt=leet(name), ws=words(name);
    const hit=r=>lt.includes(r)||((squash(r).length>=4||(squash(r)===r&&r.length>=3))&&flat.includes(squash(r)));
    const bad=ROOTS.some(hit)||ws.some(w=>WORDS.includes(w)||WORDS.includes(squash(w)));
    if(bad) return {ok:false,why:"word",msg:"That name isn't allowed. Pick a different one!"};
    if(!/^[A-Za-z0-9 ]+$/.test(name)) return {ok:false,why:"chars",msg:"Use letters, numbers and spaces only."};
    if(name.split(" ").length>3) return {ok:false,why:"long",msg:"Use 3 words or less."};
    if(false)
      return {ok:false,why:"word",msg:"That name isn't allowed. Pick a different one!"};
    if(INFO.some(hit))
      return {ok:false,why:"info",msg:"Keep it secret! No real names, schools or places. Try a duck nickname."};
    return {ok:true,name};
  }

  /* Ideas for new ducks and worlds: longer free text, checked word by word so nice words like peacock or scrap pass. */
  const IMAX=80, IMIN=4;
  const SAFE=["peacock","peacocks","cockatoo","cockatiel","scrap","scraps","scrappy","scrape","scraper","skyscraper","skyscrapers","grape","grapes","drape","drapes","trapeze","therapist","essex","sussex","dickens","hancock","shitake","assassin","cocktail"];
  const IINFO=["gmail","email","insta","instagram","tiktok","snapchat","discord","youtube","roblox","twitch","whatsapp","facebook","phone","address","http","https","www","dotcom"];
  const IPHRASE=/\b(my name is|my names|i am \d|i'?m \d|i live|i go to|my school|my teacher|years old|yrs old|my address|my phone|call me at|text me)\b/i;
  function checkIdea(raw){
    const text=tidy(raw).slice(0,200);
    if(text.length<IMIN) return {ok:false,why:"short",msg:"Tell us a little more about your idea."};
    if(text.length>IMAX) return {ok:false,why:"long",msg:`Keep it to ${IMAX} letters or less.`};
    if(/[@\\<>{}]|https?:|www\.|\.(com|net|org|io|co|gg|me|tv)\b/i.test(text)) return {ok:false,why:"info",msg:"No emails or websites. Just tell us your idea!"};
    if(/\d[\d\s().-]{5,}\d/.test(text)||/\d(st|nd|rd|th)\s*grade/i.test(text)) return {ok:false,why:"info",msg:"Keep it secret! No numbers about you, like phone numbers or grades."};
    if(IPHRASE.test(text)) return {ok:false,why:"info",msg:"Keep it secret! No names, ages, schools or places. Just your idea."};
    if(!/^[A-Za-z0-9 .,!?'"&()-]+$/.test(text)) return {ok:false,why:"chars",msg:"Use letters, numbers and simple punctuation only."};
    if(!/[a-z]{2}/i.test(text)) return {ok:false,why:"short",msg:"Tell us a little more about your idea."};
    const ws=text.split(/[\s.,!?'"&()-]+/).filter(Boolean).map(w=>leet(w)).filter(Boolean);
    const spaced=text.replace(/\b([a-z0-9@$!|])[ .-]+(?=[a-z0-9@$!|]\b)/gi,"$1");   // f u c k, f.u.c.k -> fuck
    const all=[...ws,...spaced.split(/[\s.,!?'"&()-]+/).filter(Boolean).map(w=>leet(w))];
    const badWord=w=>{ if(SAFE.includes(w)||w==='from'||w==='age') return false; const q=squash(w);
      return WORDS.includes(w)||WORDS.includes(q)||ROOTS.some(r=>w.includes(r)||((squash(r).length>=4||(squash(r)===r&&r.length>=3))&&q.includes(squash(r)))); };
    if(all.some(badWord)) return {ok:false,why:"word",msg:"Let's keep it friendly! Try different words."};
    if(all.some(w=>IINFO.includes(w))) return {ok:false,why:"info",msg:"Keep it secret! No usernames or apps. Just your idea."};
    return {ok:true,text};
  }
  /* Random duck names: a fun word, a duck word and a number, like "Zippy Beak 27". Short words keep every name within 14 letters,
     and the number makes repeats rare. The server still turns away a name someone already has, and the game then rolls again. */
  const A=["Zippy","Sunny","Lucky","Tiny","Turbo","Royal","Jolly","Fuzzy","Happy","Brave","Swift","Bold","Cool","Witty","Peppy","Perky","Dizzy","Silly",
    "Goofy","Snowy","Misty","Mossy","Sandy","Minty","Comet","Pixel","Disco","Ninja","Neon","Cozy","Spicy","Sparky","Bubbly","Lemon","Mango","Cocoa","Star","Moon","Noble","Rusty"];
  const B=["Quack","Beak","Wing","Egg","Pond","Drake","Ducky","Diver","Fluff","Flap","Honk","Tail","Bean","Feet","Paddle","Ripple","Splash","Puddle","Webs","Plume"];
  function suggest(rnd=Math.random){ const pick=l=>l[Math.floor(rnd()*l.length)];
    for(let i=0;i<40;i++){ const num=10+Math.floor(rnd()*90); if(num===69) continue; const n=`${pick(A)} ${pick(B)} ${num}`; if(n.length<=MAX&&check(n).ok) return n; }
    return "Lucky Duck "+(10+Math.floor(rnd()*89)); }
  const api={check,checkIdea,checkText:checkIdea,suggest,MAX,IMAX,TMAX:IMAX};
  if(typeof module!=="undefined"&&module.exports) module.exports=api; else root.QName=api;
})(typeof globalThis!=="undefined"?globalThis:this);
