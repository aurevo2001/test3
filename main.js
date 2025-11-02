/* ===== HERO 自動輪播（穩定版） ===== */
(function(){
  const hero=document.querySelector('.hero-showcase'); if(!hero) return;
  const track=hero.querySelector('.track'); if(!track) return;
  const slides=[...hero.querySelectorAll('.slide')]; if(!slides.length) return;
  const title=document.getElementById('heroTitle');
  const desc=document.getElementById('heroDesc');
  let index=0, delay=3500, timer=null;

  function showSlide(n){
    index=(n+slides.length)%slides.length;
    track.style.transform=`translateX(${-100*index}%)`;
    const s=slides[index];
    if(title) title.textContent=s.dataset.title||'';
    if(desc) desc.textContent=s.dataset.desc||'';
  }
  function start(){ if(timer) clearInterval(timer); timer=setInterval(()=>showSlide(index+1),delay); }

  // 初始
  showSlide(0); start();

  // 畫面可見性切換時自動恢復
  document.addEventListener('visibilitychange',()=>{ if(!document.hidden) start(); });
})();

/* ==== Portfolio 2.1：篩選 + Lightbox（與首頁共用 main.js） ==== */
(function(){
  const filterBtns=[...document.querySelectorAll('.filter-btn')];
  const items=[...document.querySelectorAll('.m-item')];
  if(filterBtns.length){
    function applyFilter(cat){
      items.forEach(i=>{
        const ok=(cat==='all'||i.dataset.category===cat);
        i.style.display=ok?'block':'none';
      });
    }
    filterBtns.forEach(btn=>{
      btn.addEventListener('click',()=>{
        filterBtns.forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        applyFilter(btn.dataset.filter);
      });
    });
    applyFilter('all');
  }
  // Lightbox
  const lightbox=document.getElementById('lightbox');
  const lbImg=document.getElementById('lightboxImg');
  const lbClose=document.getElementById('lightboxClose');
  if(lightbox&&lbImg){
    document.querySelectorAll('.m-item img').forEach(img=>{
      img.addEventListener('click',()=>{lightbox.classList.add('active');lbImg.src=img.src;lbImg.alt=img.alt||'';});
    });
    const close=()=>{lightbox.classList.remove('active');lbImg.src='';};
    if(lbClose) lbClose.addEventListener('click',close);
    lightbox.addEventListener('click',e=>{if(e.target===lightbox) close();});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&lightbox.classList.contains('active')) close();});
  }
})();

/* About page: reveal-on-scroll + optional count-up */
(function(){const els=[...document.querySelectorAll('.reveal')];if(els.length){const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}})},{threshold:.15});els.forEach(el=>io.observe(el));}
const nums=[...document.querySelectorAll('[data-count]')];if(nums.length){const tick=(el,to,dur=900)=>{const from=0;const t0=performance.now();function step(t){const p=Math.min(1,(t-t0)/dur);el.textContent=Math.floor(from+(to-from)*p)+(el.dataset.suffix||'');if(p<1)requestAnimationFrame(step);}requestAnimationFrame(step);}nums.forEach(n=>tick(n,parseInt(n.dataset.count,10)||0));}})();

/* Contact page form handler */
(function(){
  const form=document.getElementById('contactForm');
  const status=document.getElementById('formStatus');
  if(form){
    form.addEventListener('submit',e=>{
      e.preventDefault();
      status.textContent='傳送中...';
      setTimeout(()=>{
        status.textContent='✅ 已成功送出！感謝您的來信，我將於三日內回覆。';
        form.reset();
      },1200);
    });
  }
})();
