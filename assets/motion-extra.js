/* Secondary motion graphics. Same rules as motion.js: every frame is a pure
   function of elapsed visible time (or scroll position), playback starts in
   view and pauses off-screen, reduced motion gets a still final frame.
   Freeze for testing: ?motion_t=SECONDS (time-based) / ?motion_p=0..1 (scroll). */
(function(){
const Q=new URLSearchParams(location.search);
const FT=Q.has('motion_t')?parseFloat(Q.get('motion_t')):null;
const FP=Q.has('motion_p')?parseFloat(Q.get('motion_p')):(FT!==null?1:null);
const RM=!!(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches);
const NARROW='(max-width:600px)';
const C={ink:'#0E1F17',dim:'#6B7F74',green:'#17A05E',dgreen:'#0E7A45',gold:'#C79A2E',line:'#DCE8E0',tint:'#EAF4EE'};
const DISP="'Manrope', system-ui, sans-serif", MONO="'Manrope', system-ui, sans-serif", DW=700;
const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
const lerp=(a,b,t)=>a+(b-a)*t;
const seg=(t,a,b)=>clamp((t-a)/(b-a),0,1);
const eio=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
const eout=t=>1-Math.pow(1-t,3);
const hash=n=>{let x=Math.imul(n^0x9E3779B9,0x85EBCA6B);x^=x>>>13;x=Math.imul(x,0xC2B2AE35);x^=x>>>16;return (x>>>0)/4294967296};
function rr(ctx,x,y,w,h,r){ctx.beginPath();ctx.roundRect?ctx.roundRect(x,y,w,h,r):ctx.rect(x,y,w,h)}
function text(ctx,s,x,y,size,fam,weight,color,align,alpha,ls,maxW){
  if(alpha<=0) return;
  ctx.globalAlpha=alpha; ctx.fillStyle=color; ctx.textAlign=align||'left'; ctx.textBaseline='alphabetic';
  const hasLS='letterSpacing' in ctx; if(hasLS) ctx.letterSpacing='0px';
  ctx.font=`${weight} ${size}px ${fam}`;
  if(maxW){const w=ctx.measureText(s).width+(hasLS?parseFloat(ls||0)*s.length:0); if(w>maxW) ctx.font=`${weight} ${size*maxW/w}px ${fam}`}
  if(hasLS) ctx.letterSpacing=ls||'0px';
  ctx.fillText(s,x,y); if(hasLS) ctx.letterSpacing='0px'; ctx.globalAlpha=1;
}
const mono=(ctx,s,x,y,sz,col,al,a,ls,mw)=>text(ctx,s,x,y,sz,MONO,500,col,al,a,ls,mw);
const fontsReady=Promise.race([
  Promise.all([document.fonts.load("700 64px 'Manrope'"),document.fonts.load("500 14px 'Manrope'")]),
  new Promise(r=>setTimeout(r,1500))
]).catch(()=>{});

/* Time-driven canvas stage.
   opt.layout(cssW,cssH) -> {W,H} logical size; opt.fill: canvas sized by CSS (no aspect);
   opt.draw(ctx,t,L); opt.loop (seconds) or opt.dur (plays once); opt.still: reduced-motion frame. */
function stage(cv,opt){
  const ctx=cv.getContext&&cv.getContext('2d'); if(!ctx) return null;
  let L=null,t=0,base=0,t0=0,raf=0,playing=false,done=false;
  function draw(){
    if(!L) return;
    const k=cv.width/L.W; ctx.setTransform(k,0,0,k,0,0); ctx.clearRect(0,0,L.W,L.H); ctx.globalAlpha=1;
    opt.draw(ctx,t,L);
  }
  function fit(){
    const cw=cv.clientWidth; if(!cw) return;
    L=opt.layout(cw,cv.clientHeight);
    if(!opt.fill) cv.style.aspectRatio=L.W+' / '+L.H;
    const ch=opt.fill?cv.clientHeight:cw*L.H/L.W, dpr=Math.min(window.devicePixelRatio||1,2);
    cv.width=Math.round(cw*dpr); cv.height=Math.round(ch*dpr); draw();
  }
  function frame(now){
    let tt=base+(now-t0)/1000;
    if(opt.loop) tt%=opt.loop;
    else if(opt.dur&&tt>=opt.dur){t=opt.dur;draw();playing=false;done=true;return}
    t=tt; draw(); raf=requestAnimationFrame(frame);
  }
  function play(){if(playing||done)return;playing=true;t0=performance.now();raf=requestAnimationFrame(frame)}
  function pause(){if(!playing)return;playing=false;cancelAnimationFrame(raf);base=t}
  fontsReady.then(()=>{
    t=FT!==null?(opt.loop?FT%opt.loop:Math.min(FT,opt.dur||FT)):(RM?opt.still:0);
    fit();
    if('ResizeObserver' in window) new ResizeObserver(fit).observe(opt.fill?cv:cv.parentNode); else addEventListener('resize',fit);
    if(FT!==null||RM) return;
    if('IntersectionObserver' in window) new IntersectionObserver(es=>{es[0].isIntersecting?play():pause()},{threshold:.2}).observe(cv);
    else play();
  });
  return {redraw:draw};
}

/* ---------- 1. Audit scan: mock account table, scan line flags wasted rows (illustrative) ---------- */
(function(){
  const cv=document.getElementById('audit-scan'); if(!cv) return;
  const ROWS=[['Search – brand',.82,0],['Search – generic',.64,1],['Display',.47,1],['PMax',.71,0],['YouTube',.36,0]];
  const D={label:'#E6EEE9',dim:'#8FA69A',track:'rgba(255,255,255,.07)',bar:'rgba(255,255,255,.30)',grey:'rgba(255,255,255,.13)'};
  stage(cv,{loop:9,still:6.5,
    layout(cw){
      return matchMedia(NARROW).matches
        ?{W:600,H:470,n:1,top:66,rh:64,lx:0,bx:252,bw:200,sx:472,fs:24,hs:18,lw:236}
        :(f=>({W:1000,H:352,n:0,top:62,rh:46,lx:0,bx:300,bw:480,sx:820,fs:15*f,hs:12*f,lw:280}))(clamp(880/cw,1,1.45));
    },
    draw(ctx,t,L){
      const A=seg(t,0,.5)*(1-seg(t,8.4,9));
      mono(ctx,'CAMPAIGN',L.lx,28,L.hs,D.dim,'left',A,'2px');
      mono(ctx,'SPEND',L.bx,28,L.hs,D.dim,'left',A,'2px');
      mono(ctx,'STATUS',L.sx,28,L.hs,D.dim,'left',A,'2px');
      ctx.globalAlpha=A; ctx.strokeStyle='rgba(255,255,255,.12)'; ctx.lineWidth=1;
      ctx.beginPath(); ctx.moveTo(0,42.5); ctx.lineTo(L.W,42.5); ctx.stroke();
      const y0=L.top-14, y1=L.top+ROWS.length*L.rh-10, sp=seg(t,1.2,4.8), scanY=lerp(y0,y1,sp);
      ROWS.forEach(([name,w,bad],i)=>{
        const cy=L.top+i*L.rh+L.rh*.42, bh=L.n?12:10;
        const grow=eout(seg(t,.2+i*.08,1+i*.08));
        const r=sp>0?seg(scanY,cy-4,cy+18):0;            // row resolved as the scan passes it
        mono(ctx,name,L.lx,cy+L.fs*.36,L.fs,bad&&r?mix(D.label,D.dim,r):D.label,'left',A,'0px',L.lw);
        rr(ctx,L.bx,cy-bh/2,L.bw,bh,bh/2); ctx.globalAlpha=A; ctx.fillStyle=D.track; ctx.fill();
        const bwid=L.bw*w*grow;
        if(bwid>1){
          rr(ctx,L.bx,cy-bh/2,bwid,bh,bh/2); ctx.globalAlpha=A;
          ctx.fillStyle=bad?(r?D.grey:D.bar):(r?C.green:D.bar); ctx.fill();
          if(bad&&r){
            ctx.globalAlpha=A*r; ctx.strokeStyle=C.gold; ctx.lineWidth=2;
            ctx.beginPath(); ctx.moveTo(L.bx-4,cy); ctx.lineTo(L.bx-4+(bwid+8)*eout(r),cy); ctx.stroke();
          }
        }
        if(r>0){
          const a=A*eout(r), x=L.sx;
          if(bad){
            ctx.globalAlpha=a; ctx.strokeStyle=C.gold; ctx.fillStyle=C.gold; ctx.lineWidth=2;
            const fh=L.n?22:16;
            ctx.beginPath(); ctx.moveTo(x+1,cy+fh/2); ctx.lineTo(x+1,cy-fh/2); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(x+2,cy-fh/2); ctx.lineTo(x+2+fh*.8,cy-fh/4); ctx.lineTo(x+2,cy); ctx.closePath(); ctx.fill();
            mono(ctx,'WASTE',x+fh+8,cy+L.fs*.36,L.fs,C.gold,'left',a,'1.5px',L.W-x-fh-8);
          } else {
            ctx.globalAlpha=a; ctx.strokeStyle=C.green; ctx.lineWidth=2.5; ctx.lineCap='round'; ctx.lineJoin='round';
            const s=L.n?9:7;
            ctx.beginPath(); ctx.moveTo(x,cy); ctx.lineTo(x+s*.8,cy+s*.8); ctx.lineTo(x+s*2.2,cy-s*.8); ctx.stroke();
            mono(ctx,'OK',x+s*2.2+10,cy+L.fs*.36,L.fs,'#7FC9A2','left',a,'1.5px');
          }
        }
      });
      if(sp>0&&sp<1){
        const a=A*Math.min(1,seg(sp,0,.05)*1)*(1-seg(sp,.95,1));
        ctx.globalAlpha=a*.10; ctx.fillStyle=C.green; ctx.fillRect(0,scanY-26,L.W,26);
        ctx.globalAlpha=a; ctx.fillStyle=C.green; ctx.fillRect(0,scanY-1,L.W,2);
      }
      const ca=A*seg(t,5.0,5.6), cy=L.H-16;
      ctx.globalAlpha=A; ctx.strokeStyle='rgba(255,255,255,.12)'; ctx.lineWidth=1;
      const dy=Math.round(L.top+ROWS.length*L.rh-8)+.5;
      ctx.beginPath(); ctx.moveTo(0,dy); ctx.lineTo(L.W,dy); ctx.stroke();
      mono(ctx,'WASTED SPEND FLAGGED',0,cy,L.fs,C.gold,'left',ca,'2px',L.W*.62);
      mono(ctx,'ILLUSTRATIVE',L.W,cy,L.hs,D.dim,'right',A,'1.5px');
    }
  });
  function mix(a,b,p){const h=s=>[1,3,5].map(i=>parseInt(s.slice(i,i+2),16)),x=h(a),y=h(b);return `rgb(${x.map((v,i)=>Math.round(lerp(v,y[i],p))).join(',')})`}
})();


/* ---------- 2. Leaking pipe next to the wasted-spend calculator (illustrative) ----------
   Reads the calculator's "share not bringing customers" slider each frame;
   that share of the flow drips out of the pipe. The calculator itself is untouched. */
(function(){
  const cv=document.getElementById('leak-canvas'); if(!cv) return;
  const wr=document.getElementById('waste-range');
  const share=()=>{const v=wr?parseFloat(wr.value):20;return isFinite(v)?clamp(v,0,100):20};
  const st=stage(cv,{still:8,
    layout(cw){
      if(matchMedia(NARROW).matches) return {W:600,H:300,n:1,x0:0,x1:600,py:100,hh:24,holes:[150,250,350,450],fs:22,hs:17};
      const f=clamp(880/cw,1,1.45);
      return {W:1000,H:190,n:0,x0:170,x1:770,py:62,hh:15,holes:[310,420,530,640],fs:14*f,hs:11*f};
    },
    draw(ctx,t,L){
      const w=share()/100, A=seg(t,0,.4), py=L.py, hh=L.hh, hy=py+hh, dt=.035, v=(L.x1-L.x0)/3.2;
      // pipe body
      ctx.globalAlpha=A; ctx.fillStyle=C.tint; ctx.fillRect(L.x0,py-hh,L.x1-L.x0,hh*2);
      ctx.strokeStyle=C.ink; ctx.lineWidth=1.5; ctx.lineCap='butt';
      ctx.beginPath(); ctx.moveTo(L.x0,py-hh+.75); ctx.lineTo(L.x1,py-hh+.75);
      let x=L.x0; for(const h of L.holes){ctx.moveTo(x,hy-.75);ctx.lineTo(h-6,hy-.75);x=h+6} ctx.moveTo(x,hy-.75); ctx.lineTo(L.x1,hy-.75);
      ctx.stroke();
      ctx.strokeStyle=C.gold; ctx.lineWidth=2;
      for(const h of L.holes){ctx.beginPath();ctx.moveTo(h-6,hy-4);ctx.lineTo(h-6,hy+2);ctx.moveTo(h+6,hy-4);ctx.lineTo(h+6,hy+2);ctx.stroke()}
      // flow: dot j enters at j*dt; a fixed share of dots leaves through a hole
      const jmax=Math.floor(t/dt), jmin=Math.max(0,Math.floor((t-5)/dt));
      for(let j=jmin;j<=jmax;j++){
        const age=t-j*dt; let dx=L.x0+v*age, dy=py+(hash(j*3+1)-.5)*hh*1.3, col=C.green, a=1;
        if(hash(j*3+2)<w){
          const hx=L.holes[Math.floor(hash(j*3+3)*L.holes.length)], ta=(hx-L.x0)/v;
          if(age>ta){
            const fa=age-ta; dx=hx+(hash(j*3+4)-.5)*24*fa; dy=hy+3+18*fa+(L.n?150:90)*fa*fa; col=C.gold;
            a=1-seg(dy,hy+(L.n?80:56),hy+(L.n?118:84));
          }
        } else if(dx>L.x1){ a=1-seg(dx,L.x1,L.x1+(L.n?0:26)); }
        if(a<=0||dx<L.x0) continue;
        const r=(L.n?4.5:3)*(col===C.gold?1.2:1);
        if(col===C.gold){ctx.globalAlpha=A*a*.5; ctx.strokeStyle=C.gold; ctx.lineWidth=r*.8; ctx.beginPath(); ctx.moveTo(dx,Math.max(hy,dy-r*4)); ctx.lineTo(dx,dy); ctx.stroke()}
        ctx.globalAlpha=A*a; ctx.fillStyle=col; ctx.beginPath(); ctx.arc(dx,dy,r,0,6.283); ctx.fill();
      }
      const pct=Math.round(share())+'%';
      if(L.n){
        mono(ctx,'AD SPEND',0,44,L.fs,C.ink,'left',A,'2px');
        mono(ctx,'REACHES CUSTOMERS',600,44,L.fs,C.dgreen,'right',A,'2px',330);
        mono(ctx,pct+' NOT BRINGING CUSTOMERS',300,248,L.fs,C.gold,'center',A,'1.5px',580);
        mono(ctx,'ILLUSTRATIVE',300,288,L.hs,C.dim,'center',A,'1.5px');
      } else {
        mono(ctx,'AD SPEND',L.x0-16,py+L.fs*.36,L.fs,C.ink,'right',A,'2px',L.x0-20);
        mono(ctx,'REACHES CUSTOMERS',L.x1+34,py+L.fs*.36,L.fs,C.dgreen,'left',A,'2px',L.W-L.x1-34);
        mono(ctx,pct+' NOT BRINGING CUSTOMERS',(L.holes[0]+L.holes[L.holes.length-1])/2,178,L.fs,C.gold,'center',A,'1.5px',520);
        mono(ctx,'ILLUSTRATIVE',L.W,178,L.hs,C.dim,'right',A,'1.5px');
      }
    }
  });
  if(st&&wr) wr.addEventListener('input',()=>st.redraw());
})();


/* ---------- 3. Process stepper: progress line + node ring + check, driven by scroll position ---------- */
(function(){
  const sp=document.querySelector('#process .stepper'); if(!sp) return;
  const nodes=[...sp.querySelectorAll('.step-no')], steps=nodes.map(n=>n.closest('.step'));
  if(nodes.length<2) return;
  sp.classList.add('is-live');
  const track=document.createElement('span'), bar=document.createElement('span');
  track.className='stepper-track'; bar.className='stepper-bar';
  track.setAttribute('aria-hidden','true'); bar.setAttribute('aria-hidden','true');
  sp.append(track,bar);
  let geo=null, raf=0;
  function measure(){
    const r=sp.getBoundingClientRect();
    const c=nodes.map(n=>{const b=n.getBoundingClientRect();return [b.left+b.width/2-r.left,b.top+b.height/2-r.top]});
    const f=c[0], l=c[c.length-1];
    const mode=Math.abs(l[1]-f[1])<2?'h':Math.abs(l[0]-f[0])<2?'v':'grid';
    geo={c,mode};
    const show=mode!=='grid';
    track.style.display=bar.style.display=show?'':'none';
    if(mode==='h'){
      const y=parseFloat(getComputedStyle(sp,'::before').top)||f[1];
      for(const e of [track,bar]) Object.assign(e.style,{left:f[0]+'px',top:y+'px',width:(l[0]-f[0])+'px',height:'2px'});
      track.style.visibility='hidden';                 // the section already draws this track
    } else if(mode==='v'){
      for(const e of [track,bar]) Object.assign(e.style,{left:(f[0]-1)+'px',top:f[1]+'px',width:'2px',height:(l[1]-f[1])+'px'});
      track.style.visibility='';
    }
  }
  function apply(){
    raf=0; if(!geo) return;
    const r=sp.getBoundingClientRect(), vh=innerHeight||800, n=nodes.length;
    let p, done;
    if(FP!==null||RM){ p=FP!==null?clamp(FP,0,1):1; done=i=>p>0&&p>=i/(n-1)-1e-6; }
    else if(geo.mode==='h'){ p=clamp((vh*.85-r.top)/(vh*.4),0,1); done=i=>p>0&&p>=i/(n-1)-1e-6; }
    else {
      const line=vh*.75, y0=r.top+geo.c[0][1], len=geo.c[n-1][1]-geo.c[0][1]||1;
      p=clamp((line-y0)/len,0,1); done=i=>r.top+geo.c[i][1]<=line;
    }
    bar.style.transform=geo.mode==='v'?`scaleY(${p})`:`scaleX(${p})`;
    steps.forEach((s,i)=>s.classList.toggle('is-done',done(i)));
  }
  const req=()=>{if(!raf) raf=requestAnimationFrame(apply)};
  let watching=false;
  fontsReady.then(()=>{
    measure(); apply();
    if('ResizeObserver' in window) new ResizeObserver(()=>{measure();req()}).observe(sp); else addEventListener('resize',()=>{measure();req()});
    if(FP!==null||RM) return;
    const onScroll=()=>req();
    if('IntersectionObserver' in window){
      new IntersectionObserver(es=>{
        const v=es[0].isIntersecting;
        if(v&&!watching){addEventListener('scroll',onScroll,{passive:true});watching=true;req()}
        else if(!v&&watching){removeEventListener('scroll',onScroll);watching=false;req()}
      },{rootMargin:'20% 0px'}).observe(sp);
    } else addEventListener('scroll',onScroll,{passive:true});
  });
})();


/* ---------- 4. Contact band: the outlined S³ watermark draws itself once on entry ----------
   Replaces the CSS ::after watermark with a canvas copy at the exact same size and spot
   (read from the pseudo-element's computed style), so the settled frame is unchanged. */
(function(){
  const band=document.querySelector('.cta-band'); if(!band||!document.createElement('canvas').getContext) return;
  const cv=document.createElement('canvas'); cv.className='cta-mark'; cv.setAttribute('aria-hidden','true');
  band.insertBefore(cv,band.firstChild);
  const DUR=2.6;
  stage(cv,{fill:true,dur:DUR,still:DUR,
    layout(cw,ch){
      const cs=getComputedStyle(band,'::after'), fs=parseFloat(cs.fontSize)||400;
      let lh=parseFloat(cs.lineHeight); if(!(lh>fs*.2)) lh=fs*.8;
      const pct=(v,ref)=>/%$/.test(v)?parseFloat(v)/100*ref:parseFloat(v)||0;
      return {W:cw,H:ch,fs,lh,right:pct(cs.right,cw),bottom:pct(cs.bottom,ch),op:parseFloat(cs.opacity)||.85};
    },
    draw(ctx,t,L){
      const p=eio(seg(t,0,DUR)); if(p<=0) return;
      ctx.font=`${DW} ${L.fs}px ${DISP}`; ctx.textAlign='left'; ctx.textBaseline='alphabetic';
      if('letterSpacing' in ctx) ctx.letterSpacing='0px';
      const m=ctx.measureText('S³'), A=m.fontBoundingBoxAscent||L.fs*.9, D=m.fontBoundingBoxDescent||L.fs*.25;
      const x=L.W+(-L.right)-m.width, top=L.H+(-L.bottom)-L.lh, base=top+(L.lh-(A+D))/2+A;
      ctx.globalAlpha=L.op; ctx.strokeStyle='rgba(23,160,94,.22)'; ctx.lineWidth=1.5; ctx.lineJoin='round';
      if(p<1) ctx.setLineDash([p*L.fs*4,L.fs*8]);
      ctx.strokeText('S³',x,base); ctx.setLineDash([]); ctx.globalAlpha=1;
    }
  });
  fontsReady.then(()=>band.classList.add('mark-live'));
})();

})();
