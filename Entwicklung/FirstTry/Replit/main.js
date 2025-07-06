// Main JavaScript for SATPrep Excellence
// Handles global functionality across all pages

(function() {
    'use strict';

    // Global variables
    let isMenuOpen = false;

    // Initialize the application
    function init() {
        setupMobileNavigation();
        setupScrollEffects();
        setupFormValidation();
        setupAccessibility();
        
        // Page-specific initialization
        if (typeof initPageSpecific === 'function') {
            initPageSpecific();
        }
    }

    // Mobile Navigation Setup
    function setupMobileNavigation() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (!navToggle || !navMenu) return;

        navToggle.addEventListener('click', toggleMobileMenu);
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && isMenuOpen) {
                closeMobileMenu();
            }
        });

        // Close menu when pressing escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isMenuOpen) {
                closeMobileMenu();
            }
        });

        // Close menu when clicking on nav links (mobile)
        const navLinks = navMenu.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth < 768) {
                    closeMobileMenu();
                }
            });
        });
    }

    function toggleMobileMenu() {
        if (isMenuOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }

    function openMobileMenu() {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        
        navMenu.classList.add('active');
        navToggle.setAttribute('aria-expanded', 'true');
        isMenuOpen = true;
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        isMenuOpen = false;
        
        // Restore body scroll
        document.body.style.overflow = '';
    }

    // Scroll Effects
    function setupScrollEffects() {
        let lastScrollTop = 0;
        const header = document.querySelector('.header');
        
        if (!header) return;

        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add shadow to header when scrolled
            if (scrollTop > 10) {
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.boxShadow = '';
            }
            
            // Hide header on scroll down, show on scroll up (optional)
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Form Validation Setup
    function setupFormValidation() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input, select, textarea');
            
            inputs.forEach(input => {
                input.addEventListener('blur', function() {
                    validateField(this);
                });
                
                input.addEventListener('input', function() {
                    if (this.classList.contains('error')) {
                        validateField(this);
                    }
                });
            });
        });
    }

    function validateField(field) {
        const formGroup = field.closest('.form__group');
        if (!formGroup) return;

        // Remove existing validation classes and messages
        formGroup.classList.remove('success', 'error');
        const existingMessage = formGroup.querySelector('.form__message');
        if (existingMessage) {
            existingMessage.remove();
        }

        let isValid = true;
        let message = '';

        // Required field validation
        if (field.hasAttribute('required') && !field.value.trim()) {
            isValid = false;
            message = 'This field is required.';
        }

        // Email validation
        if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                isValid = false;
                message = 'Please enter a valid email address.';
            }
        }

        // Number validation
        if (field.type === 'number' && field.value) {
            const min = field.getAttribute('min');
            const max = field.getAttribute('max');
            const value = parseInt(field.value);
            
            if (min && value < parseInt(min)) {
                isValid = false;
                message = `Value must be at least ${min}.`;
            } else if (max && value > parseInt(max)) {
                isValid = false;
                message = `Value must be no more than ${max}.`;
            }
        }

        // Add validation class and message
        if (field.value.trim()) {
            formGroup.classList.add(isValid ? 'success' : 'error');
            
            if (!isValid) {
                const messageElement = document.createElement('div');
                messageElement.className = 'form__message error';
                messageElement.textContent = message;
                formGroup.appendChild(messageElement);
            }
        }

        return isValid;
    }

    // Accessibility Setup
    function setupAccessibility() {
        // Add focus trap for modals
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                trapFocus(e);
            }
        });

        // Add skip link functionality
        const skipLink = document.querySelector('.skip-link');
        if (skipLink) {
            skipLink.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.focus();
                    target.scrollIntoView();
                }
            });
        }

        // Improve button accessibility
        document.querySelectorAll('button, .btn').forEach(button => {
            if (!button.hasAttribute('aria-label') && !button.textContent.trim()) {
                console.warn('Button without accessible text found:', button);
            }
        });
    }

    function trapFocus(e) {
        const modal = document.querySelector('.modal.active, .nav__menu.active');
        if (!modal) return;

        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
                lastFocusable.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastFocusable) {
                firstFocusable.focus();
                e.preventDefault();
            }
        }
    }

    // Utility Functions
    function debounce(func, wait) {
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

    function throttle(func, limit) {
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

    // Toast Notifications
    function showToast(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast toast--${type}`;
        toast.textContent = message;
        
        // Add styles if not already present
        if (!document.querySelector('#toast-styles')) {
            const styles = document.createElement('style');
            styles.id = 'toast-styles';
            styles.textContent = `
                .toast {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    padding: 12px 20px;
                    border-radius: 8px;
                    color: white;
                    font-weight: 500;
                    z-index: 1000;
                    animation: slideInRight 0.3s ease-out;
                }
                .toast--success { background-color: #10b981; }
                .toast--error { background-color: #ef4444; }
                .toast--warning { background-color: #f59e0b; }
                .toast--info { background-color: #3b82f6; }
                @keyframes slideInRight {
                    from { transform: translateX(100%); }
                    to { transform: translateX(0); }
                }
            `;
            document.head.appendChild(styles);
        }
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideInRight 0.3s ease-out reverse';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, duration);
    }

    // Loading States
    function setLoading(element, isLoading) {
        if (isLoading) {
            element.classList.add('loading');
            element.disabled = true;
            
            // Store original text
            if (!element.dataset.originalText) {
                element.dataset.originalText = element.textContent;
            }
            
            element.innerHTML = '<i data-feather="loader"></i> Loading...';
            if (typeof feather !== 'undefined') {
                feather.replace();
            }
        } else {
            element.classList.remove('loading');
            element.disabled = false;
            
            if (element.dataset.originalText) {
                element.textContent = element.dataset.originalText;
            }
        }
    }

    // Error Handling
    function handleError(error, context = '') {
        console.error(`Error ${context}:`, error);
        showToast(`An error occurred${context ? ` ${context}` : ''}. Please try again.`, 'error');
    }

    // Local Storage Utilities
    function saveToStorage(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            console.warn('Failed to save to localStorage:', error);
            return false;
        }
    }

    function getFromStorage(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.warn('Failed to read from localStorage:', error);
            return defaultValue;
        }
    }

    // Export utilities to global scope
    window.SATPrep = {
        showToast,
        setLoading,
        handleError,
        saveToStorage,
        getFromStorage,
        validateField,
        debounce,
        throttle
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
