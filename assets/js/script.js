const menuToggle = document.getElementById("menu-toggle");
const siteNav = document.getElementById("site-nav");
const navLinks = document.querySelectorAll(".site-nav a");
const milestoneFilter = document.getElementById("milestone-filter");
const milestoneCards = document.querySelectorAll(".milestone-card");
const contactForm = document.getElementById("contact-form");
const formNote = document.getElementById("form-note");
const sendMessageButton = document.getElementById("send-message-button");
const yearElement = document.getElementById("year");

/* ── Mobile Nav Toggle ── */
if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    siteNav.classList.toggle("is-open");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      siteNav.classList.remove("is-open");
    });
  });
}

/* ── Milestone Filter ── */
if (milestoneFilter) {
  milestoneFilter.addEventListener("change", (event) => {
    const selectedValue = event.target.value;
    milestoneCards.forEach((card) => {
      const shouldShow =
        selectedValue === "all" || card.dataset.milestone === selectedValue;
      card.classList.toggle("is-hidden", !shouldShow);
    });
  });
}

/* ── Contact Form ── */
if (contactForm && formNote && sendMessageButton) {
  const sendContactMessage = async () => {
    if (!contactForm.reportValidity()) return;

    const endpoint = contactForm.dataset.endpoint;
    const originalText = sendMessageButton.textContent;
    const formData = new FormData(contactForm);

    try {
      sendMessageButton.disabled = true;
      sendMessageButton.textContent = "Sending...";

      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error("Request failed");

      contactForm.reset();
      formNote.textContent = "Your message has been sent successfully. Thank you!";
    } catch (error) {
      formNote.textContent = "Something went wrong. Please try again or email us directly.";
    } finally {
      sendMessageButton.disabled = false;
      sendMessageButton.textContent = originalText;
    }
  };

  contactForm.addEventListener("submit", (event) => event.preventDefault());
  sendMessageButton.addEventListener("click", sendContactMessage);
}

/* ── Footer Year ── */
if (yearElement) {
  yearElement.textContent = String(new Date().getFullYear());
}

/* ── Smooth active nav highlight on scroll ── */
const sections = document.querySelectorAll("section[id]");
const allNavLinks = document.querySelectorAll(".site-nav a");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        allNavLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + entry.target.id) {
            link.classList.add("active");
          }
        });
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);

sections.forEach((sec) => observer.observe(sec));
