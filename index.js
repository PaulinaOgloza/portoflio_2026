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
  // NOTE: Do NOT handle muteBtn here because the inline script is already doing it

  const sources = {
    720: "reel_2025_720.mp4",
    1080: "reel_2025_1080.mp4",
  };

  // ===== Loader Functions =====
  function showLoader() {
    video.style.filter = "blur(12px)";
    videoLoader.style.display = "block";
  }

  function hideLoader() {
    video.style.filter = "none";
    videoLoader.style.display = "none";
  }

  // ===== Load Video Quality =====
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

  // ===== Overlay Play =====
  videoOverlay.addEventListener("click", () => {
    video.play();
  });

  // ===== Play/Pause Events =====
  video.addEventListener("play", () => {
    hideLoader();
    videoOverlay.style.display = "none";
  });

  video.addEventListener("pause", () => {
    video.style.filter = "blur(12px)";
    videoOverlay.style.display = "flex";
  });

  // ===== Initialize Video =====
  video.muted = true; // start muted
  videoSource.src = sources[720]; // default quality
  video.load();
  hideLoader();
});

// Card movement on mobile

document.addEventListener("DOMContentLoaded", () => {
  const scrollElements = document.querySelectorAll(".scroll-animate");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("scrolled-into-view");
        }
      });
    },
    { threshold: 0.3 }
  );

  scrollElements.forEach((el) => observer.observe(el));
});

// ===== Swap Carousel Slide 2 Video on Mobile =====
document.addEventListener("DOMContentLoaded", () => {
  const carouselSlide2 = document.querySelectorAll(
    "#carouselExampleCaptions .carousel-item"
  )[1];
  const slide2Video = carouselSlide2.querySelector("video");

  function updateSlide2Video() {
    if (!slide2Video) return;

    if (window.innerWidth < 768) {
      slide2Video.src = "Ptak_Banner_HB2_mobile.mp4"; // mobile version
    } else {
      slide2Video.src = "Ptak_Banner_HB2.mp4"; // desktop version
    }
    slide2Video.load();
  }

  // Initial check
  updateSlide2Video();

  // Update on resize
  window.addEventListener("resize", updateSlide2Video);
});
