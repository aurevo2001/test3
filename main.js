/* ===== HERO 自動輪播（固定正方形框；圖片填滿；每張獨立標題） ===== */
(function(){
  const hero=document.querySelector('.hero-showcase'); if(!hero)return;
  const track=hero.querySelector('.track');
  const slides=[...hero.querySelectorAll('.slide')];
  const title=document.getElementById('heroTitle');
  const desc=document.getElementById('heroDesc');
  let index=0; const delay=3500; let timer=null;

  // 切換到指定張
  function showSlide(n){
    index=(n+slides.length)%slides.length;
    track.style.transform=`translateX(${-100*index}%)`;
    const s=slides[index];
    if(title) title.textContent=s.dataset.title||'';
    if(desc) desc.textContent=s.dataset.desc||'';
  }

  // 自動播放
  function next(){showSlide(index+1);}
  function start(){if(timer) return; timer=setInterval(next,delay);}
  function stop(){if(!timer)return; clearInterval(timer); timer=null;}

  // 初始化
  showSlide(0);
  start();

  // 可選：滑鼠懸停暫停播放（若不想啟用可刪除）
  hero.addEventListener('mouseenter',stop);
  hero.addEventListener('mouseleave',start);
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
