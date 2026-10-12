/* Tracked-funnel motion graphic for the homepage hero.
   The scene is a pure function render(t) over a 14s loop.
   Every number shown comes from the US medical-aesthetics clinics case
   (/case-studies/medspa-lead-generation/), read off assets/clinic-meta-leadgen.webp:
   Meta Ads Manager, Premier Medical Aesthetics, "Last 30 days: Jul 12, 2026 - Aug 10, 2026",
     LeadGen | CBO | Ridgefield - CT: 20 Leads (Form), reach 3,019, $22.70 per lead, $453.99 spent
     LeadGen | CBO | Berlin - CT:     15 Leads (Form), reach 3,351, $30.21 per lead, $453.20 spent
   Totals shown are plain sums of those rows (35 leads, $907.19). Reach is NOT summed
   (people can overlap between campaigns). Impressions and clicks are not in the
   screenshot, so no impression/click numbers are shown: the dots are illustrative.
   Freeze a frame for testing: add ?motion_t=SECONDS to the page URL. */
(function(){
const cv=document.getElementById('motion-canvas');
if(!cv||!cv.getContext) return;
const ctx=cv.getContext('2d');
const LOOP=14;
const C={bg:'#FFFFFF',tint:'#EAF4EE',white:'#FFFFFF',ink:'#0E1F17',dim:'#6B7F74',
  green:'#17A05E',dgreen:'#0E7A45',gold:'#C79A2E',line:'#DCE8E0'};
const DISP="'Manrope', system-ui, sans-serif", MONO="'Manrope', system-ui, sans-serif", DW=700;
const REACH=[3019,3351], SPEND=453.99+453.20, LEADS=[20,15];
const CLINICS=[{name:'RIDGEFIELD, CT',cpl:22.70,leads:20},{name:'BERLIN, CT',cpl:30.21,leads:15}];
const CPL_MAX=30.21;

const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
const lerp=(a,b,t)=>a+(b-a)*t;
const seg=(t,a,b)=>clamp((t-a)/(b-a),0,1);
const eio=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
const eout=t=>1-Math.pow(1-t,3);
const esine=t=>-(Math.cos(Math.PI*t)-1)/2;
function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function hexRGB(h){return[parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)]}
function mix(h1,h2,p){const a=hexRGB(h1),b=hexRGB(h2);return `rgb(${Math.round(lerp(a[0],b[0],p))},${Math.round(lerp(a[1],b[1],p))},${Math.round(lerp(a[2],b[2],p))})`}

/* ---------- two layouts: wide (16:9) and narrow (4:5, bigger type) ---------- */
const LAYOUTS={
  wide:{W:1280,H:720,mouth:420,throat:700,gate:800,
    top:[[420,170],[700,335],[800,335]],bot:[[420,550],[700,385],[800,385]],
    y0:[190,400],ym:[200,520],cy0:360,gateY:[290,430],gateLbl:470,
    ox:[880,30],oy:160,ctrl:[900,250],cx:[960,200],cyR:[202,10],dot:1,
    card:[900,224,308,316],cLbl:[924,258],cVal:[924,304],cSub:[924,332],cGrow:[924,512],
    chart:[924,356,216,110],meter:[1170,300,20,200],cTextW:236,
    hud:[72,50],bars:{x:72,step:170,w:156,y:664,ly:690},
    stats:{x:[72,400,728],y:112,maxW:[300,300,460]},
    end:{tile:[592,214,96],lines:['Every lead and sale tracked to revenue.'],ly:[396],size:56,maxW:1120,url:446}},
  narrow:{W:720,H:900,mouth:150,throat:400,gate:480,
    top:[[150,260],[400,380],[480,380]],bot:[[150,540],[400,420],[480,420]],
    y0:[230,340],ym:[270,530],cy0:400,gateY:[340,460],gateLbl:500,
    ox:[560,40],oy:140,ctrl:[640,470],cx:[430,220],cyR:[592,14],dot:1.4,
    card:[40,580,640,220],cLbl:[68,620],cVal:[68,684],cSub:[68,718],cGrow:[68,772],
    chart:[360,620,230,130],meter:[630,612,22,164],cTextW:270,
    hud:[40,70],bars:{x:40,step:164,w:150,y:836,ly:870},
    stats:{x:[40],y:156,maxW:[640]},
    end:{tile:[300,220,120],lines:['Every lead and sale','tracked to revenue.'],ly:[470,546],size:62,maxW:640,url:612}}
};
let L=LAYOUTS.wide, narrow=false, fm=1;

/* ---------- dots: every property fixed at creation, position is a pure function of t ---------- */
const rnd=mulberry32(2026), N=360, dots=[];
for(let i=0;i<N;i++){
  const isClick=rnd()<.28, isConv=isClick&&rnd()<.27;
  dots.push({
    fate:isConv?'conv':isClick?'click':'drop',
    uy:rnd(), e:rnd()*2.0, tm:2.5+rnd()*1.0, tt:4.6+rnd()*1.2, tg:6.0+rnd()*1.5,
    ta:9.5+rnd()*2.0, r:2.2+rnd()*2.6, a0:.45+rnd()*.5, w:1.2+rnd()*1.6, ph:rnd()*6.283,
    ug:rnd()-.5, ut:rnd()-.5, f:.35+rnd()*.4, dw:rnd()*.8,
    ucx:rnd(), ucy:rnd(), uox:rnd(), uoy:rnd()-.5
  });
}

function dotState(d,t){
  if(t<d.e) return null;
  const y0=L.y0[0]+d.uy*L.y0[1], ym=clamp(y0,L.ym[0],L.ym[1]);
  const gy=L.cy0+d.ug*60, ty=L.cy0+d.ut*30;
  if(t<d.tm){
    const p=esine(seg(t,d.e,d.tm));
    return {x:lerp(-20,L.mouth,p), y:y0+Math.sin(t*d.w+d.ph)*7*(1-p)+(ym-y0)*p,
            a:d.a0*seg(t,d.e,d.e+.3), col:C.dim, ring:0};
  }
  if(d.fate==='drop'){
    const tw=d.tm+1.0+d.dw, p=esine(seg(t,d.tm,tw)), fr=d.f*p;
    const a=d.a0*(1-seg(t,tw,tw+.5)); if(a<=0) return null;
    return {x:lerp(L.mouth,L.throat,fr), y:lerp(ym,ty,fr), a, col:C.dim, ring:0};
  }
  if(t<d.tt){
    const p=esine(seg(t,d.tm,d.tt));
    return {x:lerp(L.mouth,L.throat,p), y:lerp(ym,ty,p), a:d.a0+(1-d.a0)*p, col:mix(C.dim,C.green,p), ring:0};
  }
  if(t<d.tg){
    const p=esine(seg(t,d.tt,d.tg));
    return {x:lerp(L.throat,L.gate,p), y:lerp(ty,gy,p), a:1, col:C.green, ring:0};
  }
  if(d.fate==='click'){
    const a=1-seg(t,d.tg+1.0,d.tg+1.8); if(a<=0) return null;
    const p=esine(seg(t,d.tg,d.tg+1.6));
    return {x:lerp(L.gate,L.ox[0]+d.uox*L.ox[1],p), y:lerp(gy,L.cy0+d.uoy*L.oy,p), a:a*.7, col:mix(C.green,C.dim,p), ring:0};
  }
  const p=esine(seg(t,d.tg+.3,d.ta)), q=1-p;
  const a=1-seg(t,d.ta,d.ta+.4); if(a<=0) return null;
  const x0=L.gate,yy0=gy,x1=L.ctrl[0],y1=L.ctrl[1],x2=L.cx[0]+d.ucx*L.cx[1],y2=L.cyR[0]+d.ucy*L.cyR[1];
  const ring=seg(t,d.tg,d.tg+.5);
  return {x:q*q*x0+2*q*p*x1+p*p*x2, y:q*q*yy0+2*q*p*y1+p*p*y2, a, col:C.gold,
          ring:(ring>0&&ring<1)?ring:0, rx:L.gate, ry:gy};
}

/* ---------- text helpers (auto-shrink to maxW so nothing clips) ---------- */
function text(str,x,y,size,fam,weight,color,align,alpha,ls,maxW){
  if(alpha<=0) return;
  ctx.globalAlpha=alpha; ctx.fillStyle=color;
  ctx.textAlign=align||'left'; ctx.textBaseline='alphabetic';
  const hasLS='letterSpacing' in ctx;
  if(hasLS) ctx.letterSpacing=ls||'0px';
  ctx.font=`${weight} ${size}px ${fam}`;
  if(maxW){const w=ctx.measureText(str).width; if(w>maxW) ctx.font=`${weight} ${size*maxW/w}px ${fam}`}
  ctx.fillText(str,x,y);
  if(hasLS) ctx.letterSpacing='0px';
}
const mono=(s,x,y,sz,col,al,a,ls,mw)=>text(s,x,y,sz,MONO,500,col,al,a,ls,mw);
const disp=(s,x,y,sz,col,al,a,mw)=>text(s,x,y,sz,DISP,DW,col,al,a,'0px',mw);
function rr(x,y,w,h,r){ctx.beginPath();ctx.roundRect?ctx.roundRect(x,y,w,h,r):ctx.rect(x,y,w,h)}
const fmt=n=>Math.round(n).toLocaleString('en-US');


function render(t){
  const k=cv.width/L.W, W=L.W, H=L.H;
  ctx.setTransform(k,0,0,k,0,0);
  ctx.globalAlpha=1; ctx.fillStyle=C.bg; ctx.fillRect(0,0,W,H);
  const fd=narrow?1:Math.min(fm,1.3);          // display-type boost on small wide canvases
  const fmo=narrow?1:fm;                        // mono-type boost
  const A5=1-seg(t,12,12.8);
  const dimLater=s=>t>s?.55:1;

  // grid
  ctx.globalAlpha=seg(t,0,1)*.55; ctx.strokeStyle=C.line; ctx.lineWidth=1; ctx.beginPath();
  for(let x=0;x<=W;x+=48){ctx.moveTo(x+.5,0);ctx.lineTo(x+.5,H)}
  for(let y=0;y<=H;y+=48){ctx.moveTo(0,y+.5);ctx.lineTo(W,y+.5)}
  ctx.stroke();

  // funnel outline
  const fp=eio(seg(t,2.5,4.0));
  if(fp>0){
    ctx.globalAlpha=A5*(t>6?.7:1); ctx.strokeStyle=C.ink; ctx.lineWidth=1.5; ctx.lineCap='round';
    for(const e of [L.top,L.bot]){
      const L1=Math.hypot(e[1][0]-e[0][0],e[1][1]-e[0][1]), Ln=L1+(e[2][0]-e[1][0]);
      ctx.setLineDash([Ln,Ln]); ctx.lineDashOffset=Ln*(1-fp);
      ctx.beginPath(); ctx.moveTo(...e[0]); ctx.lineTo(...e[1]); ctx.lineTo(...e[2]); ctx.stroke();
    }
    ctx.setLineDash([]);
  }

  // tracking gate
  const gp=seg(t,5.6,6.4), g0=L.gateY[0], g1=L.gateY[1];
  if(gp>0){
    ctx.globalAlpha=gp*A5*(t>9.5?.6:1); ctx.strokeStyle=C.ink; ctx.lineWidth=1.5;
    ctx.beginPath(); ctx.moveTo(L.gate,g0); ctx.lineTo(L.gate,g1); ctx.stroke();
    ctx.lineWidth=1; ctx.beginPath();
    for(let i=0;i<9;i++){const y=g0+i*(g1-g0)/8;ctx.moveTo(L.gate-6,y);ctx.lineTo(L.gate+6,y)}
    ctx.stroke();
    if(t>=6&&t<=9.8){
      const sy=L.cy0+(g1-g0)/2*Math.sin((t-6)*2.2), fa=seg(t,6,6.4)*(1-seg(t,9.4,9.8));
      ctx.globalAlpha=fa*A5; ctx.strokeStyle=C.green; ctx.lineWidth=2.5;
      ctx.beginPath(); ctx.moveTo(L.gate-16,sy); ctx.lineTo(L.gate+16,sy); ctx.stroke();
    }
    mono('LEAD FORMS',L.gate,L.gateLbl,(narrow?22:13*fmo),C.dim,'center',gp*A5*(t>9.5?.6:1),'1.5px',narrow?200:150);
  }

  // cost-per-lead card (real: Meta CPL per clinic location, see header note)
  const cp=seg(t,9.0,9.8), prog=eout(seg(t,9.5,12));
  if(cp>0){
    const [x,y,w,h]=L.card, a=cp*A5, tw=L.cTextW;
    ctx.save(); ctx.globalAlpha=a; ctx.shadowColor='rgba(14,31,23,.08)'; ctx.shadowBlur=30; ctx.shadowOffsetY=12;
    rr(x,y,w,h,18); ctx.fillStyle=C.white; ctx.fill(); ctx.restore();
    ctx.globalAlpha=a; ctx.strokeStyle=C.line; ctx.lineWidth=1; rr(x+.5,y+.5,w-1,h-1,18); ctx.stroke();
    mono('META · COST PER LEAD',L.cLbl[0],L.cLbl[1],narrow?24:12*fmo,C.dim,'left',a,'2px',narrow?560:tw);
    CLINICS.forEach((c,i)=>{
      const ai=a*seg(t,9.6+i*.5,10.2+i*.5);
      let vx,vy,bw;
      if(narrow){ vx=x+28+i*306; vy=y+104; bw=270; }
      else { vx=x+24; vy=y+92+i*120; bw=w-48; }
      disp('$'+c.cpl.toFixed(2),vx,vy,narrow?56:34*fd,C.ink,'left',ai,bw);
      mono(c.name+' · '+c.leads+' LEADS',vx,vy+(narrow?32:24),narrow?20:11*fmo,C.dim,'left',ai,'1.5px',bw);
      const by=vy+(narrow?50:38), bh=narrow?12:10, p=eout(seg(t,9.8+i*.5,11.6+i*.5));
      ctx.globalAlpha=ai; rr(vx,by,bw,bh,bh/2); ctx.fillStyle=C.tint; ctx.fill();
      const fw=bw*(c.cpl/CPL_MAX)*p; if(fw>1){rr(vx,by,fw,bh,bh/2); ctx.fillStyle=i?C.dgreen:C.green; ctx.fill()}
    });
    mono('LAST 30 DAYS · 2 LOCATIONS',narrow?x+28:x+24,y+h-(narrow?22:24),narrow?18:11*fmo,C.dgreen,'left',a*prog,'1.5px',narrow?560:tw);
  }

  // dots
  for(let i=0;i<N;i++){
    const d=dots[i], s=dotState(d,t); if(!s) continue;
    const a=s.a*A5; if(a<=0) continue;
    if(s.ring){
      ctx.globalAlpha=(1-s.ring)*A5; ctx.strokeStyle=C.gold; ctx.lineWidth=1.5;
      ctx.beginPath(); ctx.arc(s.rx,s.ry,lerp(4,18,eout(s.ring)),0,6.283); ctx.stroke();
    }
    ctx.globalAlpha=a; ctx.fillStyle=s.col; ctx.beginPath(); ctx.arc(s.x,s.y,d.r*L.dot,0,6.283); ctx.fill();
  }

  // stage stats (real figures only, see header note)
  const r0=eout(seg(t,0,2.5)), s1=eout(seg(t,3.5,6)), l2=eout(seg(t,6.5,9.5));
  const stats=[
    [fmt(REACH[0]*r0)+' · '+fmt(REACH[1]*r0),'PEOPLE REACHED, PER CLINIC',0,null],
    ['$'+(SPEND*s1).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2}),'META AD SPEND · 30 DAYS',3.5,null],
    [fmt((LEADS[0]+LEADS[1])*l2),'TRACKED LEADS (FORM)',6.5,'20 RIDGEFIELD · 15 BERLIN']];
  const nextStart=[3.5,6.5,99];
  const S=L.stats;
  stats.forEach(([big,label,start,extra],idx)=>{
    let al=seg(t,start,start+.5)*A5, x, mw;
    if(narrow){ al*=1-seg(t,nextStart[idx]-.4,nextStart[idx]); x=S.x[0]; mw=S.maxW[0]; }
    else { al*=dimLater(nextStart[idx]); x=S.x[idx]; mw=S.maxW[idx]; }
    if(al<=0) return;
    const ds=narrow?64:34*fd, ms=narrow?24:12*fmo;
    disp(big,x,S.y,ds,C.ink,'left',al,mw);
    const ly=S.y+(narrow?14:12)+ms;
    mono(label,x,ly,ms,C.dim,'left',al,'2px',mw);
    if(extra) mono(extra,x,ly+ms+(narrow?12:8),ms,C.dgreen,'left',al*seg(t,7,8),'2px',mw);
  });

  // HUD
  ctx.globalAlpha=1; ctx.fillStyle=C.green;
  const hs=narrow?14:10; ctx.fillRect(L.hud[0],L.hud[1]-hs,hs,hs);
  mono('TRIPLE S',L.hud[0]+hs+10,L.hud[1],narrow?24:13*fmo,C.ink,'left',1,'3px');
  const B=L.bars, wins=[[0,2.5,'REACH'],[2.5,6,'CLICKS'],[6,9.5,'LEADS'],[9.5,12,'COST / LEAD']];
  wins.forEach((w,i)=>{
    const x=B.x+i*B.step, p=seg(t,w[0],w[1]), cur=t>=w[0]&&t<w[1];
    ctx.globalAlpha=1; rr(x,B.y,B.w,4,2); ctx.fillStyle=C.line; ctx.fill();
    if(p>0){rr(x,B.y,B.w*p,4,2); ctx.fillStyle=cur?C.green:mix(C.green,C.bg,.35); ctx.fill()}
    mono(w[2],x,B.ly,narrow?18:11*fmo,cur?C.ink:C.dim,'left',1,'1.5px',B.w);
  });

  // end card
  const ep=seg(t,12.6,13.2);
  if(ep>0){
    const E=L.end, lift=(1-eout(ep))*14, [tx,ty,ts]=E.tile;
    ctx.globalAlpha=ep; rr(tx,ty+lift,ts,ts,ts*.23); ctx.fillStyle=C.green; ctx.fill();
    disp('S',tx+ts*.44,ty+ts*.77+lift,ts*.69,C.white,'center',ep);
    disp('3',tx+ts*.75,ty+ts*.4+lift,ts*.29,C.white,'center',ep);
    const hsz=narrow?E.size:E.size*fd;
    E.lines.forEach((ln,i)=>disp(ln,W/2,E.ly[i]+lift,hsz,C.ink,'center',ep,E.maxW));
    mono('triples.agency',W/2,E.url+lift,narrow?24:16*fmo,C.dim,'center',ep,'2px');
  }

  const fo=seg(t,13.5,14);
  if(fo>0){ctx.globalAlpha=fo;ctx.fillStyle=C.bg;ctx.fillRect(0,0,W,H)}
  ctx.globalAlpha=1;
}

/* ---------- sizing ---------- */
let lastT=0;
function fit(){
  const cw=cv.parentNode.clientWidth||cv.clientWidth; if(!cw) return;
  narrow=cw<640; L=narrow?LAYOUTS.narrow:LAYOUTS.wide;
  cv.style.aspectRatio=L.W+' / '+L.H;
  const dpr=Math.min(window.devicePixelRatio||1,2), cssH=cw*L.H/L.W;
  cv.width=Math.round(cw*dpr); cv.height=Math.round(cssH*dpr);
  fm=clamp(0.85/(cw/L.W),1,1.7);
  render(lastT);
}

/* ---------- playback: pause off-screen, static end frame for reduced motion ---------- */
const q=new URLSearchParams(location.search), frozen=q.has('motion_t')?parseFloat(q.get('motion_t')):null;
const reduced=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
let playing=false, visible=false, base=0, startAt=0, raf=0;
function frame(now){ lastT=(base+(now-startAt)/1000)%LOOP; render(lastT); raf=requestAnimationFrame(frame); }
function play(){ if(playing||frozen!==null||reduced) return; playing=true; startAt=performance.now(); raf=requestAnimationFrame(frame); }
function pause(){ if(!playing) return; playing=false; cancelAnimationFrame(raf); base=lastT; }

const ready=Promise.race([
  Promise.all([document.fonts.load("700 64px 'Manrope'"),document.fonts.load("500 14px 'Manrope'")]),
  new Promise(r=>setTimeout(r,1500))
]).catch(()=>{});
ready.then(()=>{
  lastT=frozen!==null?frozen:(reduced?13.3:0);
  fit();
  if('ResizeObserver' in window) new ResizeObserver(()=>fit()).observe(cv.parentNode);
  else addEventListener('resize',fit);
  if(frozen!==null){ document.documentElement.setAttribute('data-motion-ready','1'); return; }
  if(reduced) return;
  if('IntersectionObserver' in window){
    new IntersectionObserver(es=>{ visible=es[0].isIntersecting; visible?play():pause(); },{threshold:0.15}).observe(cv);
  } else play();
});
})();
