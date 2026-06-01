document.addEventListener("DOMContentLoaded", () => {
    // ==========================================================================
    // Preloader Logic (1.5 seconds)
    // ==========================================================================
    const preloader = document.getElementById("preloader");
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add("fade-out");
            setTimeout(() => {
                preloader.style.display = "none";
            }, 600); // Wait for transition to finish
        }, 1500);
    }
    // ==========================================================================
    // Mobile Menu Toggle
    // ==========================================================================
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // ==========================================================================
    // Running Counters / Milestones Animation
    // ==========================================================================
    const animateCounters = (selector, targetAttr) => {
        const counters = document.querySelectorAll(selector);
        counters.forEach(counter => {
            const target = +counter.getAttribute(targetAttr);
            const suffix = counter.getAttribute('data-suffix') || '';
            const divisor = +counter.getAttribute('data-divisor') || 1;
            
            let count = 0;
            const duration = 2000; // 2 seconds animation
            const startTime = performance.now();
            
            const updateCount = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Ease out cubic
                const easeProgress = 1 - Math.pow(1 - progress, 3);
                const currentCount = Math.floor(easeProgress * target);
                
                const displayVal = divisor > 1 ? (currentCount / divisor) : currentCount;
                counter.innerText = displayVal + suffix;
                
                if (progress < 1) {
                    requestAnimationFrame(updateCount);
                } else {
                    const finalVal = divisor > 1 ? (target / divisor) : target;
                    counter.innerText = finalVal + suffix;
                }
            };
            requestAnimationFrame(updateCount);
        });
    };

    // IntersectionObserver to trigger counters for old about-stats
    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters('.counter', 'data-target');
                    observer.unobserve(entry.target); // trigger only once
                }
            });
        }, { threshold: 0.2 });
        observer.observe(statsSection);
    }

    // IntersectionObserver to trigger counters for new about-milestones
    const milestonesSection = document.querySelector('.about-milestones');
    if (milestonesSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters('.milestone-num', 'data-count');
                    observer.unobserve(entry.target); // trigger only once
                }
            });
        }, { threshold: 0.1 });
        observer.observe(milestonesSection);
    }

    // ==========================================================================
    // Scroll-Triggered Animations for [data-animate]
    // ==========================================================================
    const animatedElements = document.querySelectorAll('[data-animate]');
    if ('IntersectionObserver' in window) {
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    animationObserver.unobserve(entry.target); // trigger animation once
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });
        
        animatedElements.forEach(el => {
            animationObserver.observe(el);
        });
    } else {
        // Fallback for browsers that do not support IntersectionObserver
        animatedElements.forEach(el => {
            el.classList.add('is-visible');
        });
    }

});

// Hero image carousel
const heroImages = document.querySelectorAll('.hero-img.hero-slide');
let currentIndex = 0;
if (heroImages.length > 0) {
    const totalImages = heroImages.length;
    function showNextImage() {
        heroImages[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % totalImages;
        heroImages[currentIndex].classList.add('active');
    }
    // Initialize carousel: show first image as active
    heroImages.forEach((img, idx) => {
        if (idx === 0) img.classList.add('active');
        else img.classList.remove('active');
    });
    setInterval(showNextImage, 2000); // change every 2 seconds
}

// FAQ accordion and scroll animations
const faqSection = document.querySelector('#faq');
if (faqSection) {
  // IntersectionObserver to add visible class for fade‑in
  const faqObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        faqSection.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  faqObserver.observe(faqSection);

  // Toggle open/close functionality
  const faqItems = faqSection.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question');
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Close all items first
      faqItems.forEach(i => i.classList.remove('open'));
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });
} 

// How It Works scroll animation
const howSection = document.querySelector('#how-it-works');
if (howSection) {
    const howObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                howSection.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    howObserver.observe(howSection);
}

