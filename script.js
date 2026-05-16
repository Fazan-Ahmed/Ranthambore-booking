window.addEventListener('load', () => {
  const loader = document.getElementById('loader');

  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 2000);
  }
});

/* =========================
   SCROLL REVEAL
========================= */
function revealOnScroll() {
  const elements = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right'
  );

  elements.forEach((el) => {
    const rect = el.getBoundingClientRect();

    if (rect.top < window.innerHeight - 60) {
      el.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

/* =========================
   SET MIN DATE FOR BOOKING
========================= */
(function setMinBookingDate() {
  const dateInput = document.getElementById('fdate');

  if (!dateInput) return;

  const today = new Date();
  today.setDate(today.getDate() + 1);

  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');

  dateInput.min = `${yyyy}-${mm}-${dd}`;
})();

/* =========================
   FORM VALIDATION & SUBMISSION
========================= */

const bookingFormMain = document.getElementById('bookingForm');

if (bookingFormMain) {
  bookingFormMain.addEventListener('submit', function (e) {
    e.preventDefault();

    let valid = true;

    // Inputs
    const name = document.getElementById('fname');
    const phone = document.getElementById('fphone');
    const email = document.getElementById('femail');
    const date = document.getElementById('fdate');
    const safari = document.getElementById('fsafari');
    const zone = document.getElementById('fzone');
    const shift = document.getElementById('fshift');
    const persons = document.getElementById('fpersons');

    /* ===== NAME ===== */
    if (!name.value.trim() || name.value.trim().length < 3) {
      name.classList.add('is-invalid');
      valid = false;
    } else {
      name.classList.remove('is-invalid');
    }

    /* ===== PHONE ===== */
    const phoneVal = phone.value.replace(/\s|\+/g, '');

    if (!/^\d{10,12}$/.test(phoneVal)) {
      phone.classList.add('is-invalid');
      valid = false;
    } else {
      phone.classList.remove('is-invalid');
    }

    /* ===== EMAIL ===== */
    if (
      email.value.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())
    ) {
      email.classList.add('is-invalid');
      valid = false;
    } else {
      email.classList.remove('is-invalid');
    }

    /* ===== DATE ===== */
    if (!date.value) {
      date.classList.add('is-invalid');
      valid = false;
    } else {
      date.classList.remove('is-invalid');
    }

    /* ===== SAFARI ===== */
    if (!safari.value) {
      safari.classList.add('is-invalid');
      valid = false;
    } else {
      safari.classList.remove('is-invalid');
    }

    /* ===== ZONE ===== */
    if (!zone.value) {
      zone.classList.add('is-invalid');
      valid = false;
    } else {
      zone.classList.remove('is-invalid');
    }

    /* ===== SHIFT ===== */
    if (!shift.value) {
      shift.classList.add('is-invalid');
      valid = false;
    } else {
      shift.classList.remove('is-invalid');
    }

    /* ===== PERSONS ===== */
    if (!persons.value || Number(persons.value) <= 0) {
      persons.classList.add('is-invalid');
      valid = false;
    } else {
      persons.classList.remove('is-invalid');
    }

    // Stop if invalid
    if (!valid) return;

    /* =========================
       SUBMIT PROCESS
    ========================= */

    const submitBtn = this.querySelector('.btn-submit');

    if (submitBtn) {
      submitBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin me-2"></i> Processing...';

      submitBtn.disabled = true;
    }

    // Simulate API submission
    setTimeout(() => {
      const formWrap = document.getElementById('bookingFormWrap');
      const successMsg = document.getElementById('successMsg');

      if (formWrap) {
        formWrap.style.display = 'none';
      }

      if (successMsg) {
        successMsg.style.display = 'block';

        successMsg.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }

      // Reset button
      if (submitBtn) {
        submitBtn.innerHTML = 'Book Now';
        submitBtn.disabled = false;
      }

      bookingFormMain.reset();
    }, 1800);
  });
}

/* =========================
   REAL-TIME VALIDATION CLEAR
========================= */

[
  'fname',
  'fphone',
  'femail',
  'fdate',
  'fsafari',
  'fzone',
  'fshift',
  'fpersons',
].forEach((id) => {
  const el = document.getElementById(id);

  if (!el) return;

  el.addEventListener('input', function () {
    this.classList.remove('is-invalid');
  });

  el.addEventListener('change', function () {
    this.classList.remove('is-invalid');
  });
});

/* =========================
   NAVBAR SHADOW ON SCROLL
========================= */

window.addEventListener('scroll', () => {
  const nav = document.getElementById('mainNav');

  if (!nav) return;

  nav.style.boxShadow =
    window.scrollY > 50
      ? '0 4px 30px rgba(0,0,0,0.3)'
      : 'none';
});