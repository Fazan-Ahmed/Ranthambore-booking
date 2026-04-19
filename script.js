// <!-- Bootstrap JS -->
src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js">


/* ============ LOADER ============ */
window.addEventListener('load', function() {
  setTimeout(function() {
    document.getElementById('loader').classList.add('hidden');
  }, 2000);
});

/* ============ SCROLL REVEAL ============ */
function revealOnScroll() {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  els.forEach(function(el) {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      el.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

/* ============ SET MIN DATE FOR BOOKING ============ */
(function() {
  const dateInput = document.getElementById('fdate');
  if (dateInput) {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth()+1).padStart(2,'0');
    const dd = String(today.getDate()).padStart(2,'0');
    dateInput.min = yyyy + '-' + mm + '-' + dd;
  }
})();

/* ============ FORM VALIDATION & SUBMISSION ============ */
document.getElementById('bookingForm').addEventListener('submit', function(e) {
  e.preventDefault();
  let valid = true;

  // Name
  const name = document.getElementById('fname');
  if (!name.value.trim() || name.value.trim().length < 3) {
    name.classList.add('is-invalid'); valid = false;
  } else { name.classList.remove('is-invalid'); }

  // Phone
  const phone = document.getElementById('fphone');
  const phoneVal = phone.value.replace(/\s|\+/g, '');
  if (!/^\d{10,12}$/.test(phoneVal)) {
    phone.classList.add('is-invalid'); valid = false;
  } else { phone.classList.remove('is-invalid'); }

  // Email (optional but validate if filled)
  const email = document.getElementById('femail');
  if (email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    email.classList.add('is-invalid'); valid = false;
  } else { email.classList.remove('is-invalid'); }

  // Date
  const date = document.getElementById('fdate');
  if (!date.value) {
    date.classList.add('is-invalid'); valid = false;
  } else { date.classList.remove('is-invalid'); }

  // Safari type
  const safari = document.getElementById('fsafari');
  if (!safari.value) {
    safari.classList.add('is-invalid'); valid = false;
  } else { safari.classList.remove('is-invalid'); }

  // Zone
  const zone = document.getElementById('fzone');
  if (!zone.value) {
    zone.classList.add('is-invalid'); valid = false;
  } else { zone.classList.remove('is-invalid'); }

  // Shift
  const shift = document.getElementById('fshift');
  if (!shift.value) {
    shift.classList.add('is-invalid'); valid = false;
  } else { shift.classList.remove('is-invalid'); }

  // Persons
  const persons = document.getElementById('fpersons');
  if (!persons.value) {
    persons.classList.add('is-invalid'); valid = false;
  } else { persons.classList.remove('is-invalid'); }

  if (!valid) return;

  // Simulate submission (replace with actual backend/API call)
  const submitBtn = this.querySelector('.btn-submit');
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Processing...';
  submitBtn.disabled = true;

  setTimeout(function() {
    document.getElementById('bookingFormWrap').style.display = 'none';
    const success = document.getElementById('successMsg');
    success.style.display = 'block';
    success.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 1800);
});

/* ============ REAL-TIME FIELD CLEAR ON INPUT ============ */
['fname','fphone','femail','fdate','fsafari','fzone','fshift','fpersons'].forEach(function(id) {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener('input', function() { this.classList.remove('is-invalid'); });
    el.addEventListener('change', function() { this.classList.remove('is-invalid'); });
  }
});

/* ============ NAVBAR SHADOW ON SCROLL ============ */
window.addEventListener('scroll', function() {
  const nav = document.getElementById('mainNav');
  if (window.scrollY > 50) {
    nav.style.boxShadow = '0 4px 30px rgba(0,0,0,0.3)';
  } else {
    nav.style.boxShadow = 'none';
  }
});
