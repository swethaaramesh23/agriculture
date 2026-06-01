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
    
    // Only initialize and hide elements if on desktop & IntersectionObserver is supported.
    // Otherwise, they stay visible by default to prevent "missing" sections in headless/static testers or mobile.
    if (window.innerWidth > 768 && 'IntersectionObserver' in window) {
        document.body.classList.add('animations-active');
        
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
    // Initialize AOS (allow repeat animations)
    if (window.AOS) {
        AOS.init({duration: 1200, once: false, offset: 120, easing: 'ease-out'});
    }
    // Initialize ScrollReveal (fallback for non-GSAP elements)
    if (window.ScrollReveal) {
        const sr = ScrollReveal();
        sr.reveal('[data-animate]', {
            distance: '30px',
            opacity: 0,
            duration: 800,
            easing: 'ease-out',
            interval: 150,
            reset: false,
            origin: 'bottom'
        });
    }
    // Initialize GSAP ScrollTrigger animations for service and crop cards
    if (window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
        // Service cards
        gsap.utils.toArray('.core-service-card').forEach(card => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                y: 40,
                opacity: 0,
                duration: 0.9,
                ease: 'power2.out'
            });
        });
        // Crop cards
        gsap.utils.toArray('.crop-card').forEach(card => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out'
            });
        });
    }
    // Initialize GSAP animations for hero section
    if (window.gsap) {
        gsap.from('.hero', {duration: 1.2, opacity: 0, y: -50, ease: 'power2.out'});
        // GSAP scroll-reveal for other major sections
        const sections = document.querySelectorAll('.stats-banner, .why-choose-us, .cta-banner, footer');
        sections.forEach(sec => {
            gsap.from(sec, {
                scrollTrigger: {
                    trigger: sec,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                y: 40,
                opacity: 0,
                duration: 0.9,
                ease: 'power2.out'
            });
        });
    }    }

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
    setInterval(showNextImage, 5000); // change every 5 seconds
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
                // GSAP sequential reveal for each step card
                if (window.gsap) {
                    gsap.from('.how-it-works .step-card', {
                        opacity: 0,
                        y: 30,
                        scale: 0.9,
                        duration: 0.8,
                        ease: 'power2.out',
                        stagger: 0.25
                    });
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    howObserver.observe(howSection);
}

// Innovation Section Animations
const innovationSection = document.querySelector('#innovation');
if (innovationSection) {
    const innovObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                innovationSection.classList.add('visible');
                // GSAP staggered reveal for feature items
                if (window.gsap) {
                    gsap.from('.innovation-feature-item', {
                        opacity: 0,
                        x: -30,
                        scale: 0.95,
                        duration: 0.7,
                        ease: 'back.out(1.4)',
                        stagger: 0.2
                    });
                    gsap.from('.btn-story', {
                        opacity: 0,
                        y: 20,
                        scale: 0.9,
                        duration: 0.8,
                        delay: 0.8,
                        ease: 'elastic.out(1, 0.5)'
                    });
                    gsap.from('.innovation-float-badge', {
                        opacity: 0,
                        scale: 0,
                        duration: 0.6,
                        delay: 0.5,
                        ease: 'back.out(2)'
                    });
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    innovObserver.observe(innovationSection);
}
