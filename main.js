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
