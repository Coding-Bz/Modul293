// Global JavaScript - Navigation, Animations, and Utilities

class SATApp {
  constructor() {
    this.init();
  }

  init() {
    this.setupNavigation();
    this.setupAnimations();
    this.setupScrollEffects();
    this.setupNewsletterForm();
  }

  // Navigation functionality
  setupNavigation() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

    // Mobile menu toggle
    if (mobileToggle && mobileNav) {
      mobileToggle.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        mobileToggle.textContent = mobileNav.classList.contains('active') ? '✕' : '☰';
      });
    }

    // Active link highlighting
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (mobileNav && !mobileNav.contains(e.target) && !mobileToggle.contains(e.target)) {
        mobileNav.classList.remove('active');
        mobileToggle.textContent = '☰';
      }
    });
  }

  // Scroll animations
  setupAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
  }

  // Header scroll effects
  setupScrollEffects() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;

      if (header) {
        if (currentScrollY > 100) {
          header.style.background = 'rgba(255, 255, 255, 0.98)';
          header.style.boxShadow = 'var(--shadow-base)';
        } else {
          header.style.background = 'rgba(255, 255, 255, 0.95)';
          header.style.boxShadow = 'none';
        }
      }

      lastScrollY = currentScrollY;
    });
  }

  // Newsletter form functionality
  setupNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        if (this.validateEmail(email)) {
          this.submitNewsletter(email);
        } else {
          this.showMessage('Please enter a valid email address.', 'error');
        }
      });
    }
  }

  // Email validation
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Newsletter submission
  async submitNewsletter(email) {
    try {
      // In a real app, this would send to a backend
      console.log('Newsletter signup:', email);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      this.showMessage('Thank you for subscribing to our newsletter!', 'success');
      document.querySelector('.newsletter-form').reset();
    } catch (error) {
      this.showMessage('Something went wrong. Please try again.', 'error');
    }
  }

  // Show message utility
  showMessage(message, type = 'info') {
    const messageEl = document.createElement('div');
    messageEl.className = `message message-${type}`;
    messageEl.textContent = message;
    
    messageEl.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      box-shadow: var(--shadow-lg);
      z-index: 10000;
      animation: slideInMessage 0.3s ease;
    `;
    
    document.body.appendChild(messageEl);
    
    setTimeout(() => {
      messageEl.style.animation = 'slideOutMessage 0.3s ease';
      setTimeout(() => messageEl.remove(), 300);
    }, 3000);
  }

  // Smooth scroll utility
  smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = element.offsetTop - headerHeight - 20;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }

  // Format number utility
  formatNumber(num) {
    return new Intl.NumberFormat().format(num);
  }

  // Debounce utility
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
}

// CSS for message animations
const messageStyles = document.createElement('style');
messageStyles.textContent = `
  @keyframes slideInMessage {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutMessage {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(messageStyles);

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.satApp = new SATApp();
});

// Utility functions for global use
window.SATUtils = {
  formatScore: (score) => {
    return score ? score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '0';
  },
  
  getScoreColor: (score) => {
    if (score >= 1400) return '#10b981'; // Green
    if (score >= 1200) return '#f59e0b'; // Orange
    if (score >= 1000) return '#3b82f6'; // Blue
    return '#ef4444'; // Red
  },
  
  validateForm: (form) => {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
      if (!input.value.trim()) {
        input.style.borderColor = '#ef4444';
        isValid = false;
      } else {
        input.style.borderColor = '#e5e7eb';
      }
    });
    
    return isValid;
  }
};
