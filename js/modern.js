/* CIRPAN Software Development - Modern Interactions */

class ModernWebsite {
  constructor() {
    this.init();
  }

  init() {
    this.setupNavigation();
    this.setupAnimations();
    this.setupScrollEffects();
    this.setupMobileMenu();
    this.setupParallax();
    this.setupTypingEffect();
    this.setupSmoothScrolling();
    this.setupLazyLoading();
    this.setupPerformanceOptimizations();
  }

  // Enhanced Navigation
  setupNavigation() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateNavbar = () => {
      const scrollY = window.scrollY;
      
      if (scrollY > 100) {
        navbar.classList.add('scrolled');
        if (scrollY > lastScrollY) {
          navbar.style.transform = 'translateY(-100%)';
        } else {
          navbar.style.transform = 'translateY(0)';
        }
      } else {
        navbar.classList.remove('scrolled');
        navbar.style.transform = 'translateY(0)';
      }
      
      lastScrollY = scrollY;
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick, { passive: true });

    // Active navigation highlighting
    this.highlightActiveNavItem();
  }

  highlightActiveNavItem() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const activeId = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activeId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }, { threshold: 0.5 });

    sections.forEach(section => observer.observe(section));
  }

  // Enhanced Mobile Menu
  setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const body = document.body;

    if (!mobileMenuBtn || !mobileNav) return;

    mobileMenuBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = mobileNav.classList.contains('active');
      
      if (isOpen) {
        this.closeMobileMenu();
      } else {
        this.openMobileMenu();
      }
    });

    // Close on link click
    mobileNav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        this.closeMobileMenu();
      });
    });

    // Close on outside click
    mobileNav.addEventListener('click', (e) => {
      if (e.target === mobileNav) {
        this.closeMobileMenu();
      }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
        this.closeMobileMenu();
      }
    });
  }

  openMobileMenu() {
    const mobileNav = document.getElementById('mobile-nav');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    
    mobileNav.style.display = 'flex';
    setTimeout(() => {
      mobileNav.classList.add('active');
    }, 10);
    document.body.style.overflow = 'hidden';
    mobileMenuBtn.classList.add('active');
    
    // Animate menu items
    const menuItems = mobileNav.querySelectorAll('.nav-link');
    menuItems.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';
      setTimeout(() => {
        item.style.transition = 'all 0.3s ease';
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }

  closeMobileMenu() {
    const mobileNav = document.getElementById('mobile-nav');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    
    mobileNav.classList.remove('active');
    document.body.style.overflow = 'auto';
    mobileMenuBtn.classList.remove('active');
    
    setTimeout(() => {
      mobileNav.style.display = 'none';
    }, 300); // Wait for transition to complete
  }

  // Advanced Scroll Animations
  setupAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateElement(entry.target);
        }
      });
    }, observerOptions);

    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll(`
      .animate-fade-in-up,
      .animate-fade-in-down,
      .animate-slide-in-left,
      .animate-slide-in-right,
      .animate-scale-in,
      .card,
      .service-card,
      .project-card
    `);

    animatedElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = this.getInitialTransform(el);
      observer.observe(el);
    });
  }

  getInitialTransform(element) {
    if (element.classList.contains('animate-fade-in-up')) return 'translateY(30px)';
    if (element.classList.contains('animate-fade-in-down')) return 'translateY(-30px)';
    if (element.classList.contains('animate-slide-in-left')) return 'translateX(-30px)';
    if (element.classList.contains('animate-slide-in-right')) return 'translateX(30px)';
    if (element.classList.contains('animate-scale-in')) return 'scale(0.9)';
    return 'translateY(30px)';
  }

  animateElement(element) {
    const delay = parseInt(element.dataset.delay) || 0;
    
    setTimeout(() => {
      element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
      element.style.opacity = '1';
      element.style.transform = 'translateY(0) translateX(0) scale(1)';
    }, delay);
  }

  // Parallax Effects
  setupParallax() {
    const parallaxElements = document.querySelectorAll('.floating-element, .hero::before');
    
    if (parallaxElements.length === 0) return;

    let ticking = false;
    
    const updateParallax = () => {
      const scrollY = window.scrollY;
      
      parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrollY * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
      
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick, { passive: true });
  }

  // Typing Effect for Hero Text
  setupTypingEffect() {
    const typingElements = document.querySelectorAll('[data-typing]');
    
    typingElements.forEach(element => {
      const text = element.textContent;
      const speed = parseInt(element.dataset.typingSpeed) || 50;
      
      element.textContent = '';
      
      let i = 0;
      const typeWriter = () => {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
          setTimeout(typeWriter, speed);
        }
      };
      
      // Start typing when element comes into view
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            typeWriter();
            observer.unobserve(entry.target);
          }
        });
      });
      
      observer.observe(element);
    });
  }

  // Enhanced Smooth Scrolling
  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        
        const target = document.querySelector(anchor.getAttribute('href'));
        if (!target) return;
        
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = target.offsetTop - navbarHeight - 20;
        
        this.smoothScrollTo(targetPosition, 800);
      });
    });
  }

  smoothScrollTo(targetPosition, duration) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = this.easeInOutQuad(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  }

  easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  // Lazy Loading for Images
  setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if (images.length === 0) return;

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add('fade-in');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }

  // Scroll Effects
  setupScrollEffects() {
    let ticking = false;
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Update CSS custom property for scroll-based animations
      document.documentElement.style.setProperty('--scroll', scrollY / windowHeight);
      
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick, { passive: true });
  }

  // Performance Optimizations
  setupPerformanceOptimizations() {
    // Preload critical resources
    this.preloadCriticalResources();
    
    // Optimize animations for mobile
    this.optimizeForMobile();
    
    // Setup intersection observer for performance
    this.setupIntersectionObserver();
  }

  preloadCriticalResources() {
    const criticalImages = [
      'image/ich.png',
      'image/webbild.png'
    ];

    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }

  optimizeForMobile() {
    if (window.innerWidth <= 768) {
      // Reduce animation complexity on mobile
      document.documentElement.style.setProperty('--animation-duration', '0.4s');
      
      // Disable parallax on mobile for better performance
      const parallaxElements = document.querySelectorAll('.floating-element');
      parallaxElements.forEach(el => {
        el.style.transform = 'none';
      });
    }
  }

  setupIntersectionObserver() {
    // Generic intersection observer for any element with data-observe
    const observedElements = document.querySelectorAll('[data-observe]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const action = entry.target.dataset.observe;
        
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          
          // Custom actions based on data-observe value
          switch (action) {
            case 'counter':
              this.animateCounter(entry.target);
              break;
            case 'fade-in':
              this.fadeInElement(entry.target);
              break;
            case 'slide-up':
              this.slideUpElement(entry.target);
              break;
          }
        } else {
          entry.target.classList.remove('in-view');
        }
      });
    }, { threshold: 0.2 });

    observedElements.forEach(el => observer.observe(el));
  }

  // Animation helpers
  animateCounter(element) {
    const target = parseInt(element.dataset.count);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current);
    }, 16);
  }

  fadeInElement(element) {
    element.style.opacity = '1';
  }

  slideUpElement(element) {
    element.style.transform = 'translateY(0)';
    element.style.opacity = '1';
  }

  // Utility Methods
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
}

// Enhanced CSS for animations (inject if needed)
const enhancedCSS = `
  .navbar {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .navbar.scrolled {
    background: rgba(15, 15, 35, 0.98);
    backdrop-filter: blur(20px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
  
  .mobile-menu-btn {
    transition: all 0.3s ease;
  }
  
  .mobile-menu-btn span {
    transition: all 0.3s ease;
  }
  
  .mobile-menu-btn.active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }
  
  .mobile-menu-btn.active span:nth-child(2) {
    opacity: 0;
  }
  
  .mobile-menu-btn.active span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -6px);
  }
  
  [data-observe] {
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  [data-observe="fade-in"] {
    opacity: 0;
  }
  
  [data-observe="slide-up"] {
    opacity: 0;
    transform: translateY(30px);
  }
  
  .fade-in {
    animation: fadeIn 0.6s ease-out;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  /* Smooth performance optimizations */
  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  .will-change-transform {
    will-change: transform;
  }
  
  .gpu-accelerated {
    transform: translateZ(0);
  }
`;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Inject enhanced CSS
  const style = document.createElement('style');
  style.textContent = enhancedCSS;
  document.head.appendChild(style);
  
  // Initialize the modern website
  new ModernWebsite();
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ModernWebsite;
}