document.addEventListener("DOMContentLoaded", () => {
  // ===== Smooth Scroll =====
  const navbarCollapse = document.querySelector(".navbar-collapse");

  function scrollToSection(id) {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
    if (navbarCollapse && navbarCollapse.classList.contains("show")) {
      const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
      if (bsCollapse) bsCollapse.hide();
    }
  }

  const scrollLinks = [
    { selector: ".navbar-watch-reel", target: "watch-reel" },
    { selector: ".navbar-about-me", target: "about-me" },
    { selector: ".navbar-contact", target: "contact" },
  ];

  scrollLinks.forEach(({ selector, target }) => {
    const el = document.querySelector(selector);
    if (el)
      el.addEventListener("click", (e) => {
        e.preventDefault();
        scrollToSection(target);
      });
  });

  // ===== Video Controls =====
  const video = document.getElementById("remoteVideo");
  const videoSource = document.getElementById("videoSource");
  const videoLoader = document.getElementById("videoLoader");
  const videoOverlay = document.getElementById("videoOverlay");
  const qualitySelect = document.getElementById("videoQuality");
  const muteBtn = document.getElementById("muteBtn");

  const sources = {
    720: "REEL2025_720.mp4",
    1080: "Reel2025_HD.mp4",
  };

  function showLoader() {
    video.style.filter = "blur(12px)";
    videoLoader.style.display = "block";
  }
  function hideLoader() {
    video.style.filter = "none";
    videoLoader.style.display = "none";
  }

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

  qualitySelect.addEventListener("change", () =>
    loadVideoQuality(qualitySelect.value)
  );
  videoOverlay.addEventListener("click", () => video.play());
  video.addEventListener("play", () => {
    hideLoader();
    videoOverlay.style.display = "none";
  });
  video.addEventListener("pause", () => {
    video.style.filter = "blur(12px)";
    videoOverlay.style.display = "flex";
  });

  if (muteBtn) {
    muteBtn.addEventListener("click", () => {
      video.muted = !video.muted;
      muteBtn.innerHTML = video.muted
        ? "Unmute Icon HTML Here" // Replace with proper SVG
        : "Mute Icon HTML Here"; // Replace with proper SVG
    });
  }

  video.muted = true;
  videoSource.src = sources[720];
  video.load();
  hideLoader();

  // ===== Scroll Animations =====
  const scrollElements = document.querySelectorAll(".scroll-animate");
  const aboutMeCard = document.querySelector(".about-me.card");
  const isMobile = window.innerWidth < 800;

  if (isMobile) {
    scrollElements.forEach((el) => el.classList.add("scrolled-into-view"));
    if (aboutMeCard) aboutMeCard.classList.add("scrolled-into-view");
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting)
            entry.target.classList.add("scrolled-into-view");
        });
      },
      { threshold: 0.1 }
    );
    scrollElements.forEach((el) => observer.observe(el));
    if (aboutMeCard) observer.observe(aboutMeCard);
  }

  // ===== Illustration Gallery Overlay + Swipe Support =====
  const thumbnails = Array.from(
    document.querySelectorAll(".illustration-thumb")
  );
  const overlay = document.querySelector(".illustration-full-overlay");
  const fullImage = overlay?.querySelector(".full-image");
  const closeBtn = overlay?.querySelector(".close-overlay");
  const leftArrow = overlay?.querySelector(".left-arrow");
  const rightArrow = overlay?.querySelector(".right-arrow");

  let currentIndex = 0;
  let touchStartX = 0;
  let touchEndX = 0;

  function showOverlay(index) {
    currentIndex = index;
    if (!fullImage) return;
    fullImage.style.opacity = 0;
    fullImage.src = thumbnails[currentIndex].dataset.full;
    overlay?.classList.remove("d-none");
    fullImage.onload = () => (fullImage.style.opacity = 1);
  }

  function hideOverlay() {
    overlay?.classList.add("d-none");
  }
  function showNext() {
    showOverlay((currentIndex + 1) % thumbnails.length);
  }
  function showPrev() {
    showOverlay((currentIndex - 1 + thumbnails.length) % thumbnails.length);
  }

  thumbnails.forEach((thumb, index) =>
    thumb.addEventListener("click", () => showOverlay(index))
  );
  closeBtn?.addEventListener("click", hideOverlay);
  overlay?.addEventListener("click", (e) => {
    if (e.target === overlay) hideOverlay();
  });
  rightArrow?.addEventListener("click", (e) => {
    e.stopPropagation();
    showNext();
  });
  leftArrow?.addEventListener("click", (e) => {
    e.stopPropagation();
    showPrev();
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (overlay && !overlay.classList.contains("d-none")) {
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "Escape") hideOverlay();
    }
  });

  // Touch swipe support for mobile
  overlay?.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  overlay?.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const deltaX = touchEndX - touchStartX;
    if (Math.abs(deltaX) > 50) {
      // swipe threshold
      if (deltaX < 0) showNext(); // swipe left → next
      else showPrev(); // swipe right → prev
    }
  });
});
