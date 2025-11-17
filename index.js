document.addEventListener("DOMContentLoaded", () => {
  // ===== Smooth Scroll =====
  function scrollToSection(id) {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  }

  const links = [
    { selector: ".navbar-watch-reel", target: "watch-reel" },
    { selector: ".navbar-about-me", target: "about-me" },
    { selector: ".navbar-contact", target: "contact" },
  ];

  const navbarCollapse = document.querySelector(".navbar-collapse");

  links.forEach((link) => {
    const el = document.querySelector(link.selector);
    if (el) {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        scrollToSection(link.target);
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse && navbarCollapse.classList.contains("show"))
          bsCollapse.hide();
      });
    }
  });

  // ===== Video Controls =====
  const video = document.getElementById("remoteVideo");
  const videoSource = document.getElementById("videoSource");
  const videoLoader = document.getElementById("videoLoader");
  const qualitySelect = document.getElementById("videoQuality");
  const videoOverlay = document.getElementById("videoOverlay");
  const muteBtn = document.getElementById("muteBtn");

  const sources = {
    720: "reel_2025_720.mp4",
    1080: "reel_2025_1080.mp4",
  };

  // Show loader
  function showLoader() {
    video.style.filter = "blur(12px)";
    videoLoader.style.display = "block";
  }

  // Hide loader
  function hideLoader() {
    video.style.filter = "none";
    videoLoader.style.display = "none";
  }

  // Load video quality without autoplay
  function loadVideoQuality(resolution) {
    const currentTime = video.currentTime || 0;
    const wasPaused = video.paused;

    showLoader();

    videoSource.src = sources[resolution];
    video.load();

    video.addEventListener(
      "canplay",
      () => {
        video.currentTime = currentTime;
        if (!wasPaused) video.play();
      },
      { once: true }
    );
  }

  qualitySelect.addEventListener("change", () => {
    loadVideoQuality(qualitySelect.value);
  });

  // Overlay click to play
  videoOverlay.addEventListener("click", () => {
    video.play();
  });

  // Play/pause events
  video.addEventListener("play", () => {
    hideLoader();
    videoOverlay.style.display = "none";
  });

  video.addEventListener("pause", () => {
    video.style.filter = "blur(12px)";
    videoOverlay.style.display = "flex";
  });

  // Mute/unmute button
  muteBtn.addEventListener("click", () => {
    video.muted = !video.muted;
    muteBtn.innerHTML = video.muted
      ? '<i class="fa-solid fa-volume-xmark"></i> Unmute'
      : '<i class="fa-solid fa-volume-high"></i> Mute';
  });

  // Set default quality without autoplay
  videoSource.src = sources[720];
  video.load();
  hideLoader();
});
