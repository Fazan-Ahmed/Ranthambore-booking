// Global scope loader fix
// FIXED: was window.addEventListener("load", ...) which waits for EVERY
// resource (hero image, logo, Google Maps iframe, etc.) to finish before
// hiding the loader. On a slow connection that can take several seconds,
// which is exactly what was inflating Speed Index. DOMContentLoaded fires
// as soon as the HTML is parsed and deferred scripts have run — the page
// is already usable at that point, so the loader can go away immediately.
const loader = document.getElementById("loader");
if (loader) {
  document.addEventListener("DOMContentLoaded", function () {
    loader.classList.add("hidden");
    setTimeout(() => loader.remove(), 400);
  }, { once: true });
}

document.addEventListener("DOMContentLoaded", function () {

  /* ===== SCROLL REVEAL ===== */
  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  }

  /* ===== MOBILE MENU TOGGLE ===== */
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const navMenu = document.getElementById("navMenu");
  if (mobileMenuBtn && navMenu) {
    const menuIcon = mobileMenuBtn.querySelector("i") || mobileMenuBtn;

    mobileMenuBtn.addEventListener("click", function () {
      const isOpen = navMenu.classList.toggle("open");
      mobileMenuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
      if (menuIcon.tagName === "I") {
        menuIcon.className = isOpen ? "fas fa-times" : "fas fa-bars";
      }
    });

    // Delegated event handling (single listener instead of one per link)
    navMenu.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        navMenu.classList.remove("open");
        mobileMenuBtn.setAttribute("aria-expanded", "false");
        if (menuIcon.tagName === "I") menuIcon.className = "fas fa-bars";
      }
    });
  }

  /* ===== BACK TO TOP ===== */
  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ===== BOOKING DATE MIN = TODAY ===== */
  const dateInput = document.getElementById("fdate");
  if (dateInput) {
    const today = new Date().toISOString().split("T")[0];
    dateInput.setAttribute("min", today);
  }

  /* ===== EMAILJS BOOKING FORM ===== */
  if (window.emailjs) {
    emailjs.init({ publicKey: "YXJrgRUG35llPAtYN" });
  }

  const form = document.getElementById("bookingForm");
  const bookingFormWrap = document.getElementById("bookingFormWrap");
  const successMsg = document.getElementById("successMsg");
  const submitBtn = document.getElementById("submitBtn");
  const formErrorMsg = document.getElementById("formErrorMsg");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (formErrorMsg) formErrorMsg.classList.remove("visible");

      // Browser validation
      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        Array.from(form.elements).forEach((el) => {
          if (el.willValidate) {
            el.classList.toggle("is-invalid", !el.checkValidity());
          }
        });
        form.reportValidity();
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "SENDING...";
      }

      emailjs
        .sendForm("service_zh4ejsa", "template_a8ago8p", form)
        .then(function () {
          if (bookingFormWrap) bookingFormWrap.style.display = "none";
          if (successMsg) successMsg.classList.add("visible");
          form.reset();
          form.classList.remove("was-validated");
        })
        .catch(function (error) {
          console.error("EmailJS error:", error);
          if (formErrorMsg) formErrorMsg.classList.add("visible");
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = "CHECK AVAILABILITY";
          }
        });
    });

    // Form input reset invalid class using delegation
    form.addEventListener("input", (e) => e.target.classList.remove("is-invalid"));
    form.addEventListener("change", (e) => e.target.classList.remove("is-invalid"));
  }

});

