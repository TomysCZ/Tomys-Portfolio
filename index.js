// Basic interactions, smooth nav, CTA behaviors, small animations

// Mobile nav toggle
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.getElementById('mobile-nav');
if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!isOpen));
    if (mobileNav.hasAttribute('hidden')) mobileNav.removeAttribute('hidden');
    mobileNav.style.display = isOpen ? 'none' : 'flex';
  });
}

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    if (!targetId || targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Portfolio CTAs (placeholder actions)
document.querySelectorAll('[data-open-demo]').forEach((btn) => {
  btn.addEventListener('click', () => {
    btn.classList.add('wiggle');
    setTimeout(() => btn.classList.remove('wiggle'), 600);
    alert('Demo: zde může být odkaz na živou ukázku projektu.');
  });
});

// End portfolio CTAs

// Download button animation
const downloadBtn = document.querySelector('.download-btn');
if (downloadBtn) {
  downloadBtn.addEventListener('click', function(e) {
    this.classList.add('clicked');
    setTimeout(() => {
      this.classList.remove('clicked');
    }, 2000);
  });
}

// Parallax hero subtle movement
const hero = document.querySelector('.hero');
if (hero) {
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    hero.style.backgroundPosition = `${50 + x * 2}% ${50 + y * 2}%`;
  });
}

// Animated counters in stats
const counters = document.querySelectorAll('.counter[data-target]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    if (el.classList.contains('counted')) return; // Skip if already counted
    el.classList.add('counted');
    const target = Number(el.getAttribute('data-target')) || 0;
    const duration = 2500;
    const start = performance.now();
    const step = (t) => {
      const p = Math.min(1, (t - start) / duration);
      const value = Math.floor(p * target);
      el.textContent = value.toString();
      
      // Handle plus sign animations when counter finishes
      if (p === 1) {
        // For followers counter
        const followersCounter = el.closest('.followers-counter');
        if (followersCounter) {
          const plusEl = followersCounter.querySelector('.front-plus');
          if (plusEl) {
            setTimeout(() => {
              plusEl.classList.add('visible');
            }, 400);
          }
        }
        
        // For stat cards
        const statCard = el.closest('.stat-card');
        if (statCard) {
          const plusEl = statCard.querySelector('.stat-plus');
          if (plusEl) {
            setTimeout(() => {
              plusEl.style.opacity = '1';
            }, 200);
          }
        }
      }
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}, { 
  threshold: 0.5, // Element must be 50% visible
  rootMargin: '-50px' // Adds a bit of offset to prevent too early triggering
});

counters.forEach((c) => {
  c.textContent = "0"; // Reset to 0 initially
  counterObserver.observe(c);
});

// Intersection animation for section cards
const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal');
      
      // Add reveal class to stat cards when stats section comes into view
      if (entry.target.classList.contains('stats')) {
        entry.target.querySelectorAll('.stat-card').forEach((card, index) => {
          setTimeout(() => {
            card.classList.add('reveal');
          }, index * 150); // Stagger the animation
        });
      }
    }
  }
}, { threshold: 0.12 });

document.querySelectorAll('.section-card, .project-card, .video-card, .card, .stats').forEach((el) => {
  el.classList.add('will-reveal');
  observer.observe(el);
});

// Tilt hover effect for cards
const tiltTargets = document.querySelectorAll('.project-card, .video-card, .card');
tiltTargets.forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// Scroll progress bar and back-to-top
const progressBar = document.getElementById('scroll-progress');
const backToTop = document.getElementById('backToTop');
const onScroll = () => {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const pct = Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100));
  if (progressBar) progressBar.style.width = pct + '%';
  if (backToTop) backToTop.style.display = scrollTop > 400 ? 'block' : 'none';
};
window.addEventListener('scroll', onScroll, { passive: true });
if (backToTop) backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Contact form toast
const contactForm = document.getElementById('contact-form');
const toast = document.getElementById('toast');
if (contactForm && toast) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(20px)';
    }, 2200);
    contactForm.reset();
  });
}


