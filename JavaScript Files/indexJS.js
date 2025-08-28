document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById('popupAd');
  const closeBtn = document.getElementById('closePopup');
  const POPUP_DELAY = 10000; // 10 seconds before showing popup
  const REAPPEAR_DELAY = 30 * 60 * 1000; // 30 minutes in ms

  function shouldShowPopup() {
    const lastClosed = localStorage.getItem('popupLastClosed');
    if (!lastClosed) return true; // never closed before, show it
    const elapsed = Date.now() - parseInt(lastClosed, 10);
    return elapsed > REAPPEAR_DELAY; // true if more than 30 mins passed
  }

  function showPopup() {
    if (popup) popup.style.display = 'flex';
  }

  // Schedule popup showing if allowed
  if (shouldShowPopup()) {
    setTimeout(showPopup, POPUP_DELAY);
  }

  // Close button hides popup and saves current time
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      if (popup) popup.style.display = 'none';
      localStorage.setItem('popupLastClosed', Date.now().toString());
    });
  }

  // Menu icon toggle (your existing code)
  const menuIcon = document.getElementById('menu-icon');
  const nav = document.getElementById('main-nav');
  if (menuIcon && nav) {
    menuIcon.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
  }
});



// Simple testimonial slider
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll('.testimonial-slide');
  const loading = document.querySelector('.testimonial-loading');
  let currentIndex = 0;
  let loadingDuration = 1500; // how long to show loading (ms)
  let displayDuration = 4500; // how long to show the testimonial (ms)

  function showLoading() {
    loading.style.display = 'block';
    loading.style.opacity = '1';
  }

  function hideLoading() {
    // Fade out loading text smoothly
    loading.style.opacity = '0';
    setTimeout(() => {
      loading.style.display = 'none';
    }, 500);
  }

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  }

  async function nextSlide() {
    // Show loading
    showLoading();

    // Hide testimonial while loading
    slides.forEach(slide => slide.classList.remove('active'));

    // Wait loading duration
    await new Promise(resolve => setTimeout(resolve, loadingDuration));

    // Hide loading and show testimonial
    hideLoading();
    showSlide(currentIndex);

    // Wait display duration
    await new Promise(resolve => setTimeout(resolve, displayDuration));

    // Update index for next slide
    currentIndex = (currentIndex + 1) % slides.length;

    // Repeat cycle
    nextSlide();
  }

  // Start slider cycle
  nextSlide();
});
