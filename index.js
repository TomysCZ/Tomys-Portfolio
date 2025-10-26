// Basic interactions, smooth nav, CTA behaviors, small animations

// Language switcher functionality
function updatePageLanguage(lang) {
  // Update HTML lang attribute
  document.documentElement.lang = lang;
  
  // Update all elements with data-lang attribute
  document.querySelectorAll('[data-lang]').forEach(element => {
    const key = element.getAttribute('data-lang');
    if (translations[lang] && translations[lang][key]) {
      if (element.tagName.toLowerCase() === 'input' || 
          element.tagName.toLowerCase() === 'textarea') {
        element.placeholder = translations[lang][key];
      } else {
        element.textContent = translations[lang][key];
      }
    }
  });
  
  // Update placeholders for elements with data-lang-placeholder
  document.querySelectorAll('[data-lang-placeholder]').forEach(element => {
    const key = element.getAttribute('data-lang-placeholder');
    if (translations[lang] && translations[lang][key]) {
      element.placeholder = translations[lang][key];
    }
  });
  
  // Update metadata
  document.title = lang === 'en' ? 'Tomy - Portfolio' : 'Tomy - Portfólio';
}

const langSwitch = document.getElementById('langSwitch');
if (langSwitch) {
  langSwitch.addEventListener('click', () => {
    const currentLang = langSwitch.classList.contains('en') ? 'en' : 'cz';
    const newLang = currentLang === 'en' ? 'cz' : 'en';
    
    // Toggle the class for styling
    langSwitch.classList.toggle('en');
    
    // Store the preference
    localStorage.setItem('preferredLanguage', newLang);
    
    // Update language toggle states without swapping text
    const czSpan = langSwitch.querySelector('.current-lang'); // CZ is always first
    const enSpan = langSwitch.querySelector('.other-lang');   // EN is always second
    
    // Add gradient text class to active language
    if (newLang === 'en') {
      enSpan.classList.add('gradient-text', 'active');
      czSpan.classList.remove('gradient-text', 'active');
    } else {
      czSpan.classList.add('gradient-text', 'active');
      enSpan.classList.remove('gradient-text', 'active');
    }
    
    // Update all page content
    updatePageLanguage(newLang);
  });
  
  // Check for stored preference on load and apply it
  const storedLang = localStorage.getItem('preferredLanguage');
  if (storedLang) {
    const czSpan = langSwitch.querySelector('.current-lang');
    const enSpan = langSwitch.querySelector('.other-lang');
    
    if (storedLang === 'en') {
      langSwitch.classList.add('en');
      enSpan.classList.add('gradient-text', 'active');
      czSpan.classList.remove('gradient-text', 'active');
    }
    updatePageLanguage(storedLang);
  }
}

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

// Smooth scroll for nav links with improved performance
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    if (!targetId || targetId === '#') return;
    
    const target = document.querySelector(targetId);
    if (!target) return;

    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 800; // ms
    let start = null;

    function animation(currentTime) {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);
      
      // Easing function for smoother acceleration/deceleration
      const ease = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      
      window.scrollTo(0, startPosition + distance * ease(progress));
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    }

    requestAnimationFrame(animation);
  });
});

// Portfolio CTAs and Modal handling
document.querySelectorAll('[data-open-demo]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const modalId = btn.getAttribute('data-open-demo');
    if (modalId === 'project1') {
      const modal = document.getElementById('project1Modal');
      const overlay = document.getElementById('project1Overlay');
      requestAnimationFrame(() => {
        modal.style.display = 'block';
        overlay.classList.add('active');
        document.body.classList.add('modal-open');
        requestAnimationFrame(() => {
          modal.classList.add('active');
        });
      });
    } else {
      btn.classList.add('wiggle');
      setTimeout(() => btn.classList.remove('wiggle'), 600);
      const lang = document.documentElement.lang;
      const message = lang === 'en' ? 
        'Demo: here could be a link to a live project demo.' : 
        'Demo: zde může být odkaz na živou ukázku projektu.';
      alert(message);
    }
  });
});

// Modal close button
document.querySelectorAll('.modal-close').forEach(closeBtn => {
  closeBtn.addEventListener('click', () => {
    const modal = closeBtn.closest('.modal');
    const overlay = document.getElementById('project1Overlay');
    modal.classList.remove('active');
    overlay.classList.remove('active');
    document.body.classList.remove('modal-open');
  });
});

// Close modal when clicking outside
document.querySelectorAll('.modal').forEach(modal => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
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

// Email copy functionality
const emailLink = document.getElementById('copy-email');
const copyFeedback = document.getElementById('copy-feedback');

if (emailLink && copyFeedback) {
  emailLink.addEventListener('click', async (e) => {
    e.preventDefault();
    const email = emailLink.getAttribute('data-clipboard');
    
    try {
      await navigator.clipboard.writeText(email);
      
      // Show feedback
      copyFeedback.style.opacity = '1';
      copyFeedback.style.transform = 'translateY(0)';
      
      // Hide feedback after 2 seconds
      setTimeout(() => {
        copyFeedback.style.opacity = '0';
        copyFeedback.style.transform = 'translateY(10px)';
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  });
}

