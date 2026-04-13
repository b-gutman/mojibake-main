// ===========================
// Scroll Animation Observer
// ===========================

function initScrollAnimations() {
  const sections = document.querySelectorAll('.content-section');

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });
}

// ===========================
// Initialize
// ===========================

document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
});
