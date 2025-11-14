// ===== SMOOTH SCROLL TO SECTIONS =====
function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  // --- Smooth scroll for nav links ---
  const links = [
    { selector: ".navbar-watch-reel", target: "watch-reel" },
    { selector: ".navbar-about-me", target: "about-me" },
    { selector: ".navbar-contact", target: "contact" },
  ];

  links.forEach((link) => {
    const el = document.querySelector(link.selector);
    if (el) {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        scrollToSection(link.target);

        // If mobile menu is open, close it smoothly
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse && navbarCollapse.classList.contains("show")) {
          bsCollapse.hide();
        }
      });
    }
  });

  // ===== LEARN MORE BUTTON =====
  const learnMoreBtn = document.getElementById("learnMoreBtn");
  const moreText = document.getElementById("moreText");

  if (learnMoreBtn && moreText) {
    moreText.addEventListener("show.bs.collapse", () => {
      learnMoreBtn.textContent = "See less";
    });

    moreText.addEventListener("hide.bs.collapse", () => {
      learnMoreBtn.textContent = "Learn More";
    });
  }

  // ===== NAVBAR SCROLL EFFECT =====
  window.addEventListener("scroll", () => {
    if (navbar) {
      navbar.classList.toggle("scrolled", window.scrollY > 50);
    }
  });
});

const video = document.getElementById("remoteVideo");

video.addEventListener("play", () => {
  video.style.filter = "none";
});
