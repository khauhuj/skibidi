// Defensive helpers
function safeGet(id) { return document.getElementById(id) || null; }

// Auto-fill year
const yearEl = safeGet('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Mobile menu toggle (works if elements exist)
const mobileBtn = safeGet('mobile-menu');
const navLinks = safeGet('nav-links');
if (mobileBtn && navLinks) {
  mobileBtn.addEventListener('click', () => {
    const isOpen = mobileBtn.getAttribute('aria-expanded') === 'true';
    mobileBtn.setAttribute('aria-expanded', String(!isOpen));
    // toggle visual display
    navLinks.style.display = (navLinks.style.display === 'flex') ? '' : 'flex';
    // for mobile vertical layout, use column
    if (getComputedStyle(navLinks).flexDirection === 'column') {
      navLinks.style.flexDirection = 'column';
    }
  });

  // close menu when clicking a link (mobile)
  navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      navLinks.style.display = '';
      mobileBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

// Contact form validation (if present)
const form = safeGet('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = safeGet('name');
    const email = safeGet('email');
    const message = safeGet('message');

    let valid = true;
    // reset errors
    const errName = safeGet('error-name');
    const errEmail = safeGet('error-email');
    const errMessage = safeGet('error-message');
    if (errName) errName.textContent = '';
    if (errEmail) errEmail.textContent = '';
    if (errMessage) errMessage.textContent = '';

    if (!name || !name.value.trim() || name.value.trim().length < 2) {
      if (errName) errName.textContent = 'Please enter your name (2+ characters).';
      valid = false;
    }
    const emailPattern = /^\S+@\S+\.\S+$/;
    if (!email || !email.value.trim() || !emailPattern.test(email.value.trim())) {
      if (errEmail) errEmail.textContent = 'Please enter a valid email address.';
      valid = false;
    }
    if (!message || !message.value.trim() || message.value.trim().length < 10) {
      if (errMessage) errMessage.textContent = 'Message must be at least 10 characters.';
      valid = false;
    }

    if (!valid) return;

    // Demo success (no backend)
    const success = safeGet('form-success');
    if (success) {
      success.style.color = 'green';
      success.textContent = 'Thank you — your message was sent (demo).';
      setTimeout(() => success.textContent = '', 6000);
    }
    form.reset();
  });
}


