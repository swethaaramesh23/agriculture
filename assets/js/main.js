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
    // Running Counters Animation
    // ==========================================================================
    const counters = document.querySelectorAll('.counter');
    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const suffix = counter.getAttribute('data-suffix') || '';
            const divisor = +counter.getAttribute('data-divisor') || 1;
            
            const updateCount = () => {
                const current = +counter.innerText.replace(/[^0-9]/g, '') || 0;
                const increment = Math.ceil(target / 40);
                
                if (current < target) {
                    const nextVal = current + increment;
                    if (nextVal >= target) {
                        counter.innerText = divisor > 1 ? (target / divisor) + suffix : target + suffix;
                    } else {
                        counter.innerText = divisor > 1 ? Math.floor(nextVal / divisor) + suffix : nextVal + suffix;
                        setTimeout(updateCount, 30);
                    }
                } else {
                    counter.innerText = divisor > 1 ? (target / divisor) + suffix : target + suffix;
                }
            };
            updateCount();
        });
    };

    // IntersectionObserver to trigger counters when visible
    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target); // trigger only once
                }
            });
        }, { threshold: 0.2 });
        observer.observe(statsSection);
    }

});
// Hero image carousel
    const heroImages = document.querySelectorAll('.hero-img.hero-slide');
    let currentIndex = 0;
    const totalImages = heroImages.length;
    function showNextImage() {
        heroImages[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % totalImages;
        heroImages[currentIndex].classList.add('active');
    }
    // Initialize carousel: show first image as active
    if (heroImages.length > 0) {
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

