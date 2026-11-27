/* ---------- Idea Box, friend link (Error Code Duck) and privacy (Settings) ---------- */
const BUDDY={id:"buddy",name:"Error Code Duck"};
const buddyArt=()=>errorDuck();
const BULB=`<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M32 6a19 19 0 0 0-11 34.5c2 1.6 3 3.6 3 6V49h16v-2.5c0-2.4 1-4.4 3-6A19 19 0 0 0 32 6z" fill="#FFE066" stroke="#173A5E" stroke-width="3" stroke-linejoin="round"/><path d="M25 54h14M27 59h10" stroke="#173A5E" stroke-width="3" stroke-linecap="round"/><path d="M24 22q2-7 9-8" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".8"/></svg>`;
const SHIELD=`<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3 27 7v8c0 7-5 12-11 14C10 27 5 22 5 15V7z" fill="#C9F2D6" stroke="#173A5E" stroke-width="3" stroke-linejoin="round"/><path d="m11 16 4 4 7-8" fill="none" stroke="#173A5E" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const HEART=`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-8-5.2-8-11a4.6 4.6 0 0 1 8-3 4.6 4.6 0 0 1 8 3c0 5.8-8 11-8 11z" stroke="#173A5E" stroke-width="2.4" stroke-linejoin="round"/></svg>`;
const ibEsc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const statsOn=()=>!!window.QStats&&QStats.sharing();
const OFFTXT="Game stats sharing is off on this device. Turn it on in Settings to use this.";
const MONTHS=["January","February","March","April","May","June","July","August","September","October","November","December"];
function monthEnd(){ const d=new Date(); const last=new Date(d.getFullYear(),d.getMonth()+1,0).getDate(); return `${MONTHS[d.getMonth()]} ${last}`; }

/* ---- Idea Box ---- */
function openIdeas(){
  let kind="duck";
  openSheet(`<div class="ib">
   <div class="lbhello">${BULB}<div><b>Got an idea?</b><small>Tell us your idea for a new duck or world. The idea with the most votes on ${monthEnd()} goes to Mitchell!</small></div></div>
   <form class="lbcard ibform" id="ibForm" autocomplete="off" novalidate>
    <div class="ibkind" role="radiogroup" aria-label="What is your idea for?">
     <button type="button" role="radio" aria-checked="true" data-k="duck">A new duck</button>
     <button type="button" role="radio" aria-checked="false" data-k="world">A new world</button></div>
    <textarea id="ibText" rows="2" maxlength="80" aria-label="Your idea" placeholder="A duck that..." spellcheck="true" aria-describedby="ibMsg"></textarea>
    <div class="lbcount" id="ibCount">0 / 80</div>
    <div class="lbmsg" id="ibMsg" role="status" hidden></div>
    <button class="go" type="submit" id="ibSend">Send my idea</button>
    <small>A grown-up reads every idea before anyone else can see it. Don't put your name or anything about you.</small>
   </form>
   <h4 class="ibh">Vote for your favorites</h4>
   <div id="ibList" class="lbload">Loading ideas...</div>
   <div id="ibMine"></div></div>`,"Idea Box");
  const say=(ok,t)=>{ const m=$("ibMsg"); if(!m) return; m.hidden=false; m.className="lbmsg "+(ok?"yes":"no"); m.textContent=t; };
  $("ibForm").querySelectorAll("[data-k]").forEach(b=>b.addEventListener("click",()=>{ kind=b.dataset.k;
    $("ibForm").querySelectorAll("[data-k]").forEach(x=>x.setAttribute("aria-checked",String(x===b)));
    $("ibText").placeholder=kind==="duck"?"A duck that...":"A world where..."; blip(); }));
  $("ibText").addEventListener("input",()=>{ $("ibCount").textContent=`${$("ibText").value.length} / 80`; $("ibMsg").hidden=true; });
  if(!statsOn()) say(false,OFFTXT);
  $("ibForm").addEventListener("submit",async e=>{ e.preventDefault();
    if(!statsOn()){ say(false,OFFTXT); return; }
    const t=$("ibText").value; if(!t.trim()){ say(false,"Type your idea first!"); blip(); return; }
    const btn=$("ibSend"); btn.disabled=true;
    let r; try{ r=await QStats.suggestIdea(kind,t); }catch(err){ r={ok:false}; }
    if(!$("ibForm")) return; btn.disabled=false;
    if(!r||!r.ok){ say(false,(r&&r.msg)||"Can't reach the Idea Box right now. Try again soon."); const i=$("ibText"); i.classList.remove("shake"); void i.offsetWidth; i.classList.add("shake"); blip(); return; }
    $("ibText").value=""; $("ibCount").textContent="0 / 80"; quack();
    say(true,"Thanks! A grown-up will check your idea. Then everyone can vote on it.");
    loadIdeas();
  });
  loadIdeas();
}
const kindTag=k=>`<span class="ibk ${k==="world"?"w":"d"}">${k==="world"?"World":"Duck"}</span>`;
async function loadIdeas(){
  const el=$("ibList"); if(!el) return;
  const r=statsOn()?await QStats.ideas():{ok:false,off:true};
  if(!$("ibList")) return;
  if(!r||!r.ok){ el.className="lbload"; el.textContent=r&&r.off?OFFTXT:"Can't reach the Idea Box right now. Try again soon."; $("ibMine").innerHTML=""; return; }
  const rows=(r.rows||[]).slice().sort((a,b)=>b.votes-a.votes);
  el.className="";
  el.innerHTML=rows.length?`<ol class="iblist">${rows.map((x,i)=>`<li class="ibrow${i===0&&x.votes>0?" top":""}">${i===0&&x.votes>0?`<span class="ibcrown" aria-label="Most votes">${sv("-14 -18 28 22",ACC.crown().replace('translate(12 -31)','translate(0 0)'))}</span>`:""}${kindTag(x.kind)}<span class="ibt">${ibEsc(x.text)}${x.mine?` <i class="ibyou">(yours)</i>`:""}</span>
     <button type="button" class="ibvote${x.voted?" on":""}" data-id="${ibEsc(x.id)}" aria-pressed="${x.voted?"true":"false"}" aria-label="${x.voted?"Take back your vote":"Vote for this idea"}, ${x.votes} votes">${HEART}<b>${x.votes}</b></button></li>`).join("")}</ol>`
    :`<p class="lbload">No ideas on the board yet this month. Be the first!</p>`;
  el.querySelectorAll("button.ibvote").forEach(b=>b.addEventListener("click",async()=>{
    const on=b.getAttribute("aria-pressed")!=="true"; b.disabled=true;
    const v=await QStats.vote(b.dataset.id,on); if(!b.isConnected) return; b.disabled=false;
    if(!v||!v.ok){ blip(); toast((v&&v.msg)||"Can't reach the Idea Box right now. Try again soon."); return; }
    b.classList.toggle("on",!!v.voted); b.setAttribute("aria-pressed",String(!!v.voted)); b.querySelector("b").textContent=v.votes;
    b.setAttribute("aria-label",`${v.voted?"Take back your vote":"Vote for this idea"}, ${v.votes} votes`); if(v.voted) pop();
    const mv=$("ibMine")&&$("ibMine").querySelector(`[data-votes="${b.dataset.id}"]`); if(mv) mv.textContent=v.votes; }));
  const mine=r.mine||[], win=r.winner, st={waiting:"Waiting for a grown-up",approved:"On the board",declined:"Not this time"};
  $("ibMine").innerHTML=(mine.length?`<h4 class="ibh">Your ideas this month</h4><ul class="ibmine">${mine.map(x=>`<li>${kindTag(x.kind)}<span class="ibt">${x.text?ibEsc(x.text):"(idea removed)"}</span><em class="ibst ${ibEsc(x.status)}">${st[x.status]||""}${x.status==="approved"?` · <span data-votes="${ibEsc(x.id)}">${x.votes}</span> votes`:""}</em></li>`).join("")}</ul><small class="ibnote">You can send 3 ideas a month.</small>`:"")
    +(win?`<div class="ibwin"><b>Last month's winner</b>${kindTag(win.kind)}<span class="ibt">${ibEsc(win.text)}</span><small>${win.made?"Mitchell made it! Look for it in the game.":`${win.votes} votes. Mitchell is looking at it!`}</small></div>`:"");
}

/* ---- Friend link and Error Code Duck ---- */
/* The friend code in ?f= is kept by quackers-stats.js and counted by the server when the new player finds a duck. */
let friendsChecked=false;
function checkFriends(force){ if(!statsOn()||(friendsChecked&&!force)) return Promise.resolve(null); friendsChecked=true;
  return QStats.friends().then(r=>{ if(!r||!r.ok) return null; const n=r.friends|0;
    if(n>=1&&!S.buddy){ S.buddy=1; save(); setTimeout(()=>toast("A friend found their first duck! Error Code Duck joined your Special ducks!",3600),400); refreshHome(); }
    return n; }).catch(()=>null); }
/* The link is fetched when the sheet opens, so a tap on Share opens the phone's own share sheet straight away
   (iPhone and Android only allow that right after a tap, not after waiting on the server). */
const SHARE_TXT="Come find hidden ducks with me in Quackers!";
const canShare=l=>{ try{ return !!navigator.share&&(!navigator.canShare||navigator.canShare({title:"Quackers",text:SHARE_TXT,url:l})); }catch(e){ return false; } };
function copyText(t){
  const old=()=>{ const i=document.createElement("textarea"); i.value=t; i.setAttribute("readonly",""); i.style.cssText="position:fixed;top:0;left:0;opacity:0;font-size:16px";
    document.body.appendChild(i); i.select(); i.setSelectionRange(0,t.length); let ok=false; try{ ok=document.execCommand("copy"); }catch(e){} i.remove(); return ok; };
  try{ if(navigator.clipboard&&window.isSecureContext!==false) return navigator.clipboard.writeText(t).then(()=>true,()=>old()); }catch(e){}
  return Promise.resolve(old()); }
async function openFriend(){
  openSheet(`<div class="fr">
   <div class="frtop"><svg viewBox="-44 -52 88 82" aria-hidden="true">${S.buddy?`<g class="bob">${buddyArt()}</g>`:`<g opacity=".4">${buddyArt()}</g>`}</svg>
    <div><b>${S.buddy?"You got Error Code Duck!":"Win Error Code Duck"}</b><small>Send your link to a friend. When they find their first duck in Quackers, Error Code Duck joins your Special ducks.</small></div></div>
   <div class="frlink"><input id="frUrl" type="text" readonly value="Making your link..." aria-label="Your friend link"></div>
   <div class="frbtns"><button type="button" class="go" id="frShare" disabled>${SHAREIC}Share</button><button type="button" class="go ghost" id="frCopy" disabled>${COPYIC}Copy link</button></div>
   <div class="lbmsg" id="frMsg" role="status" hidden></div>
   <p class="frcount">Friends who found a duck: <b id="frN">...</b></p>
   <small class="ibnote">Your link only opens Quackers. It doesn't say who you are. Ask a grown-up before you send it.</small></div>`,"Invite a friend");
  const say=(ok,t)=>{ const m=$("frMsg"); if(!m) return; m.hidden=false; m.className="lbmsg "+(ok?"yes":"no"); m.innerHTML=t; };
  const u=$("frUrl"), sb=$("frShare"), cb=$("frCopy");
  if(!statsOn()){ say(false,OFFTXT); $("frN").textContent="0"; u.value="Turn on stats sharing to get a link"; return; }
  checkFriends(true).then(n=>{ if($("frN")) $("frN").textContent=n==null?"0":n; });
  let link="";
  const r=await QStats.friend(); if(!u.isConnected) return;
  if(!r||!r.ok||!r.link){ u.value="No link yet"; say(false,(r&&r.off)?OFFTXT:"Can't make your link right now. Close this and try again soon."); return; }
  link=r.link; u.value=link; cb.disabled=false;
  if(canShare(link)) sb.disabled=false; else sb.hidden=true;
  const copy=()=>copyText(link).then(ok=>{ if(!cb.isConnected) return;
    if(ok){ say(true,"Link copied! Paste it in a message to your friend."); cb.innerHTML=`${CHECKIC}Copied!`; setTimeout(()=>{ if(cb.isConnected) cb.innerHTML=`${COPYIC}Copy link`; },2200); pop(); }
    else { u.focus(); u.select(); say(false,"Press and hold the link above, then tap Copy."); } });
  u.addEventListener("click",()=>{ u.select(); u.setSelectionRange(0,link.length); });
  cb.addEventListener("click",copy);
  sb.addEventListener("click",()=>{
    navigator.share({title:"Quackers",text:SHARE_TXT,url:link})
      .then(()=>{ if(sb.isConnected) say(true,"Link sent! Error Code Duck comes when your friend finds a duck."); })
      .catch(e=>{ if(!sb.isConnected||(e&&e.name==="AbortError")) return; say(false,"The share menu didn't open. Tap Copy link instead."); });
  });
}
const SHAREIC=`<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 V15 M7 8 L12 3 L17 8" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 12 H5 V20 H19 V12 H18" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const COPYIC=`<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="12" height="13" rx="3" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M5 16 V6 Q5 4 7 4 H15" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>`;
const CHECKIC=`<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12 L10 17 L19 7" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

/* ---- Privacy and Delete my data (Settings) ---- */
let forgetT;
function askForget(){ const b=$("hForget"), m=$("setMsg");
  if(!b.dataset.armed){ b.dataset.armed="1"; b.textContent="Tap again to delete everything"; b.classList.add("armed");
    clearTimeout(forgetT); forgetT=setTimeout(()=>{ if(b.isConnected){ delete b.dataset.armed; b.textContent="Delete my data"; b.classList.remove("armed"); } },3500); return; }
  clearTimeout(forgetT); b.disabled=true; friendsChecked=true; b.textContent="Deleting...";
  const go=window.QStats?QStats.forget():Promise.resolve({ok:true});
  go.then(r=>{ if(!b.isConnected) return;
    if(!r||!r.ok){ b.disabled=false; delete b.dataset.armed; b.classList.remove("armed"); b.textContent="Delete my data";
      m.hidden=false; m.className="lbmsg no"; m.textContent=(r&&r.msg)||"Couldn't reach the game server, so nothing was deleted. Try again soon."; return; }
    [LBK].forEach(k=>{ try{ localStorage.removeItem(k); }catch(e){} });
    localStorage.removeItem(KEY); S.found=new Set(); S.flags={}; S.unlocked=1; S.tokens=[]; S.best=0; S.last={}; S.pts=0; S.mg={}; S.own=[]; S.hat=""; S.color=""; S.spark=0; S.buddy=0; doneShown.clear();
    m.hidden=false; m.className="lbmsg yes"; m.textContent="Done. Your ducks and game data are deleted from this device and the game server."; b.textContent="Deleted";
    setTimeout(goHome,2600); });
}
{ const home1=goHome; goHome=function(){ const r=home1(); setTimeout(()=>checkFriends(false),800); return r; }; }
function shareLabel(){ return `${SHIELD}<span>Share game stats: ${window.QStats&&QStats.sharing()?"on":"off"}</span>`; }
function toggleSharing(){ if(!window.QStats) return; const b=$("hShare");
  if(navigator.doNotTrack==="1"||window.doNotTrack==="1"){ const m=$("setMsg"); m.hidden=false; m.className="lbmsg no"; m.textContent="Do Not Track is on in this browser, so stats stay off."; return; }
  QStats.setSharing(!QStats.sharing()); b.innerHTML=shareLabel(); blip(); }
