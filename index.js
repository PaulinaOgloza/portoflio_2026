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

  const sources = {
    720: "REEL2025_720.mp4",
    1080: "/Reel2025_HD.mp4",
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

  qualitySelect.addEventListener("change", () => {
    loadVideoQuality(qualitySelect.value);
  });

  videoOverlay.addEventListener("click", () => {
    video.play();
  });

  video.addEventListener("play", () => {
    hideLoader();
    videoOverlay.style.display = "none";
  });

  video.addEventListener("pause", () => {
    video.style.filter = "blur(12px)";
    videoOverlay.style.display = "flex";
  });

  // Initialize video
  video.muted = true;
  videoSource.src = sources[720];
  video.load();
  hideLoader();

  // ===== Scroll animations =====
  const scrollElements = document.querySelectorAll(".scroll-animate");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("scrolled-into-view");
        }
      });
    },
    { threshold: 0.1 } // smaller threshold for mobile
  );

  scrollElements.forEach((el) => observer.observe(el));
});

document.addEventListener("DOMContentLoaded", () => {
  const aboutMeCard = document.querySelector(".about-me.card");

  if (aboutMeCard) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("scrolled-into-view");
          }
        });
      },
      { threshold: 0.3 } // trigger when 30% visible
    );

    observer.observe(aboutMeCard);
  }
});
