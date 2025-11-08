// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const body = document.querySelector("body");

// Function to toggle mobile menu
function toggleMobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
  body.style.overflow = navMenu.classList.contains("active") ? "hidden" : "";
}

// Hamburger click event
hamburger.addEventListener("click", toggleMobileMenu);

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    // Remove active class from all links
    document.querySelectorAll(".nav-link").forEach((navLink) => {
      navLink.classList.remove("active");
    });

    // Add active class to clicked link
    link.classList.add("active");

    // Close mobile menu if open
    if (navMenu.classList.contains("active")) {
      toggleMobileMenu();
    }

    // Smooth scroll to section
    const targetId = link.getAttribute("href");
    if (targetId.startsWith("#")) {
      e.preventDefault();
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    }
  });
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (
    !e.target.closest(".nav-container") &&
    navMenu.classList.contains("active")
  ) {
    toggleMobileMenu();
  }
});

// Close menu on escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navMenu.classList.contains("active")) {
    toggleMobileMenu();
  }
});

// Smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target && this.getAttribute("href") !== "#") {
      e.preventDefault();
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Active navigation link based on scroll position
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  let current = "";
  const scrollPos = window.scrollY + 100;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    const href = link.getAttribute("href");
    if (href === `#${current}`) {
      link.classList.add("active");
    }
  });
}

// Update active link on scroll
window.addEventListener("scroll", updateActiveNavLink);

// Initialize active link on page load
document.addEventListener("DOMContentLoaded", () => {
  updateActiveNavLink();

  // Add loading animation to elements
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(
      ".skill-card, .tool-card, .project-card"
    );

    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < window.innerHeight - elementVisible) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  };

  // Set initial state for animation
  const animatedElements = document.querySelectorAll(
    ".skill-card, .tool-card, .project-card"
  );
  animatedElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  });

  // Trigger animation on scroll
  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll(); // Run once on load
});

// Handle window resize
window.addEventListener("resize", () => {
  if (window.innerWidth > 768 && navMenu.classList.contains("active")) {
    toggleMobileMenu();
  }
});
