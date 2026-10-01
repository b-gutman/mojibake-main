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

// ===========================
// Live stats (added 2026-09-30)
// ===========================
//
// Bruce: "perhaps connect to real data". The counts on this page used to be
// typed in, which is how a company site ends up advertising 200 sources when
// there are 1,682 of them. This site is static Eleventy on GitHub Pages and has
// no access to the catalog at build time, so the numbers are filled in at
// runtime from the same feed pipeworx.io reads.
//
// FAILS SILENT AND LEAVES THE FALLBACK. The markup ships round, stale-safe
// numbers ("1,600+", "70M+") that are true whether or not this fetch lands. A
// blank where a number should be reads as a broken page; a slightly conservative
// number reads as a number. Never let this throw its way to an empty element.
function initLiveStats() {
  const slots = document.querySelectorAll('[data-stat]');
  if (!slots.length) return;

  const round = (n, unit) => {
    if (!Number.isFinite(n) || n <= 0) return null;
    if (unit === 'M') return `${Math.floor(n / 1e6)}M+`;
    // Sources: round DOWN to the nearest hundred so the claim is never ahead
    // of the catalog, then add the +.
    return `${(Math.floor(n / 100) * 100).toLocaleString()}+`;
  };

  fetch('https://registry.pipeworx.io/stats.json')
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`stats ${r.status}`))))
    .then((d) => {
      const values = {
        sources: round(d.tracked_sources_total),
        requests: round(d.requests_30d, 'M'),
      };
      slots.forEach((el) => {
        const v = values[el.dataset.stat];
        if (v) el.textContent = v;
      });
    })
    .catch(() => {
      /* Keep the fallback already in the markup. */
    });
}

document.addEventListener('DOMContentLoaded', initLiveStats);
