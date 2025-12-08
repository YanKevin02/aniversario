document.addEventListener('DOMContentLoaded', function () {
      // Fullscreen welcome logic
      const welcomeFullscreen = document.getElementById('welcomeFullscreen');
      const enterFullscreenBtn = document.getElementById('enterFullscreenBtn');
      const matrixHearts = document.getElementById('matrixHearts');
      const card = document.querySelector('.card');
      const letterModal = document.getElementById('letterModal');

      function showMainContent() {
         welcomeFullscreen.style.display = 'none';
         matrixHearts.style.display = '';
         card.style.display = '';
         setInterval(createMatrixHearts, 400);
      }

      function enterFullscreen() {
         const el = document.documentElement;
         if (el.requestFullscreen) {
            el.requestFullscreen();
         } else if (el.webkitRequestFullscreen) {
            el.webkitRequestFullscreen();
         } else if (el.msRequestFullscreen) {
            el.msRequestFullscreen();
         }
         showMainContent();
      }

      enterFullscreenBtn.addEventListener('click', enterFullscreen);

      // If already in fullscreen, show main content
      document.addEventListener('fullscreenchange', function () {
         if (document.fullscreenElement) {
            showMainContent();
         }
      });

      // --- Original logic below (only runs after fullscreen) ---
      const heartSymbols = ['❤', '♥', '💖', '💘', '💓',''];

      function createMatrixHearts() {
         const heart = document.createElement('div');
         heart.className = 'heart-matrix';
         heart.innerHTML = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
         heart.style.left = Math.random() * 100 + 'vw';
         heart.style.top = '-10vh';
         heart.style.animationDuration = 6 + Math.random() * 3 + 's';
         heart.style.opacity = Math.random() * 0.5 + 0.3;
         heart.style.fontSize = (10 + Math.random() * 15) + 'px';
         heart.style.zIndex = 0.1;

         matrixHearts.appendChild(heart);

         setTimeout(() => {
            heart.remove();
         }, 50000);
      }
      
      

      const heartBtn = document.getElementById('heartBtn');
      const closeBtn = document.getElementById('closeBtn');

      heartBtn.addEventListener('click', function () {
         letterModal.style.display = 'flex';
         document.body.style.overflow = 'hidden';
         for (let i = 0; i < 30; i++) {
            setTimeout(() => {
               createHeartExplosion();
            }, i * 50);
         }
      });

      closeBtn.addEventListener('click', function () {
         letterModal.style.display = 'none';
         document.body.style.overflow = 'auto';
      });

      window.addEventListener('click', function (event) {
         if (event.target === letterModal) {
            letterModal.style.display = 'none';
            document.body.style.overflow = 'auto';
         }
      });

      const audio = new Audio('./Laços - Tiago IORC.mp3');
      let isPlaying = false;
      audio.loop = true;
      audio.volume = 0.2;

      function toggleAudio() {
         if (isPlaying) {
            audio.pause();
            musicBtn.textContent = '♪';
            isPlaying = false;
         } else {
            audio.play().catch(e => console.log("A reprodução automática foi interrompida."));
            musicBtn.textContent = '❚❚';
            isPlaying = true;
         }
      }

      const musicBtn = document.getElementById('musicBtn');
      musicBtn.addEventListener('click', toggleAudio);

      window.addEventListener('mousemove', function autoPlayOnce() {
         if (!isPlaying) {
            audio.play().then(() => {
               musicBtn.textContent = '❚❚';
               isPlaying = true;
               window.removeEventListener('mousemove', autoPlayOnce);
            }).catch(e => console.log("Reprodução automática bloqueada pelo navegador."));
         }
      });

      function createHeartExplosion() {
         const explosion = document.createElement('div');
         explosion.innerHTML = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
         explosion.style.position = 'fixed';
         explosion.style.left = Math.random() * 100 + 'vw';
         explosion.style.top = Math.random() * 100 + 'vh';
         explosion.style.color = `hsl(${Math.random() * 30 + 200}, 80%, 60%)`;
         explosion.style.fontSize = '25px';
         explosion.style.zIndex = '100';
         explosion.style.transform = 'scale(2)';
         explosion.style.animation = `pop 1s forwards, fadeOut 1s 1s forwards`;

         document.body.appendChild(explosion);

         setTimeout(() => {
            explosion.remove();
         }, 1000);
      }

      document.addEventListener('dblclick', function (e) {
         e.preventDefault();
      }, { passive: false });
      const style = document.createElement('style');
      style.textContent = `
         @keyframes pop {
               to { transform: scale(1); }
         }
         @keyframes fadeOut {
               to { opacity: 0; transform: scale(0.5); }
         }
      `;
      document.head.appendChild(style);
   });