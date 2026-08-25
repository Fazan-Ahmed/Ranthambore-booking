document.addEventListener("DOMContentLoaded", function () {

  /* ===== LOADER ===== */
  const loader = document.getElementById("loader");
  window.addEventListener("load", function () {
    if (loader) {
      loader.classList.add("hidden");
      setTimeout(() => loader.remove(), 700);
    }
  });

  /* ===== SCROLL REVEAL ===== */
  const revealEls = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  /* ===== MOBILE MENU TOGGLE ===== */
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const navMenu = document.getElementById("navMenu");
  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener("click", function () {
      const isOpen = navMenu.classList.toggle("open");
      mobileMenuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
      mobileMenuBtn.innerHTML = isOpen
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu after clicking a link
    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", function () {
        navMenu.classList.remove("open");
        mobileMenuBtn.setAttribute("aria-expanded", "false");
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      });
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

      formErrorMsg.classList.remove("visible");

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

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> SENDING...';

      emailjs
        .sendForm("service_zh4ejsa", "template_a8ago8p", form)
        .then(function () {
          bookingFormWrap.style.display = "none";
          successMsg.classList.add("visible");
          form.reset();
          form.classList.remove("was-validated");
        })
        .catch(function (error) {
          console.error("EmailJS error:", error);
          formErrorMsg.classList.add("visible");
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i class="fas fa-calendar-check me-2"></i> CHECK AVAILABILITY';
        });
    });

    // Remove invalid state as the user types/selects
    form.querySelectorAll(".form-control, .form-select").forEach((field) => {
      field.addEventListener("input", () => field.classList.remove("is-invalid"));
      field.addEventListener("change", () => field.classList.remove("is-invalid"));
    });
  }

});