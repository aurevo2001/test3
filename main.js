
/* Reveal：有 IO 用滑入，沒有就直接顯示，避免內容消失 */
(function(){
  const els=[...document.querySelectorAll('.reveal')];
  if(!els.length) return;

  function showAll(){ els.forEach(el=>el.classList.add('in')); }

  if('IntersectionObserver' in window){
    const io=new IntersectionObserver(entries=>{
      entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }});
    },{threshold:.12, rootMargin:'0px 0px -10% 0px'});
    els.forEach(el=>io.observe(el));

    // 保底：2 秒後仍未顯示者，強制顯示
    setTimeout(()=>{ els.forEach(el=>{ if(!el.classList.contains('in')) el.classList.add('in'); }); }, 2000);
  }else{
    showAll();
  }
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
