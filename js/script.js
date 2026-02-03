document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const episodes = document.querySelectorAll(".episode");
  const nextBtns = document.querySelectorAll(".next-btn");
  const noBtn = document.getElementById("no-btn");
  const yesBtn = document.getElementById("yes-btn");
  const celebration = document.getElementById("celebration");
  const musicBtn = document.getElementById("music-toggle");
  const bgMusic = document.getElementById("bg-music");

  let currentEpisode = 0;

  // Initialize
  updateEpisodes();

  // Navigation Logic
  nextBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (currentEpisode < episodes.length - 1) {
        currentEpisode++;
        updateEpisodes();
      }
    });
  });

  function updateEpisodes() {
    episodes.forEach((episode, index) => {
      episode.classList.remove("active", "prev");

      if (index === currentEpisode) {
        episode.classList.add("active");
      } else if (index < currentEpisode) {
        episode.classList.add("prev");
      }
    });
  }

  // "No" Button Escape Logic
  const moveNoButton = (e) => {
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth - 50);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight - 50);

    noBtn.style.position = "fixed";
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
  };

  noBtn.addEventListener("mouseover", moveNoButton);
  noBtn.addEventListener("touchstart", moveNoButton); // For mobile
  noBtn.addEventListener("click", (e) => {
    e.preventDefault();
    moveNoButton();
  });

  // Celebration Logic
  yesBtn.addEventListener("click", () => {
    celebration.classList.add("active");
    triggerConfetti();

    // Optional: Play cheer sound if added
  });

  // Confetti Effect using canvas-confetti (will be loaded via CDN)
  function triggerConfetti() {
    if (typeof confetti === "function") {
      const duration = 15 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min, max) => Math.random() * (max - min) + min;

      const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        // since particles fall down, start a bit higher than random
        confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          }),
        );
        confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          }),
        );
      }, 250);
    }
  }

  // Music Controls
  let isPlaying = false;
  musicBtn.addEventListener("click", () => {
    if (isPlaying) {
      bgMusic.pause();
      musicBtn.textContent = "🔇";
    } else {
      bgMusic.play().catch((e) => {
        console.log("Audio playback failed:", e);
        alert(
          "Music file not found! Please add 'bgm.mp3' to the 'assets/music' folder. 🎶",
        );
        musicBtn.textContent = "🔇";
        isPlaying = false;
      });
      musicBtn.textContent = "🎵";
    }
    isPlaying = !isPlaying;
  });

  // Keyboard navigation (optional)
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" && currentEpisode < episodes.length - 1) {
      currentEpisode++;
      updateEpisodes();
    }
  });
});
