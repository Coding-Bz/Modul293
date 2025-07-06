// Form handling for contact, feedback, and newsletter forms
// Includes validation, submission, and user feedback

(function() {
    'use strict';

    let forms = {};

    function initForms() {
        // Initialize all forms on the page
        forms = {
            contact: document.getElementById('contact-form'),
            feedback: document.getElementById('feedback-form'),
            newsletter: document.getElementById('newsletter-form')
        };

        Object.entries(forms).forEach(([type, form]) => {
            if (form) {
                setupForm(form, type);
            }
        });

        setupNewsletterForms();
    }

    function setupForm(form, type) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(form, type);
        });

        // Real-time validation
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

        // Auto-save form data
        setupAutoSave(form, type);
    }

    function setupNewsletterForms() {
        // Handle newsletter forms that might be on multiple pages
        const newsletterForms = document.querySelectorAll('form[id*="newsletter"], .newsletter__form');
        
        newsletterForms.forEach(form => {
            if (!form.id) {
                form.addEventListener('submit', function(e) {
                    e.preventDefault();
                    handleNewsletterSubmission(form);
                });
            }
        });
    }

    async function handleFormSubmission(form, type) {
        if (!validateForm(form)) {
            window.SATPrep.showToast('Please correct the errors before submitting.', 'error');
            return;
        }

        const submitButton = form.querySelector('button[type="submit"]');
        const formData = new FormData(form);
        
        // Convert FormData to object
        const data = {};
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }

        // Add timestamp and form type
        data.timestamp = new Date().toISOString();
        data.formType = type;

        window.SATPrep.setLoading(submitButton, true);

        try {
            await simulateFormSubmission(data, type);
            handleFormSuccess(form, type);
            clearAutoSavedData(type);
        } catch (error) {
            handleFormError(form, error);
        } finally {
            window.SATPrep.setLoading(submitButton, false);
        }
    }

    async function handleNewsletterSubmission(form) {
        const emailInput = form.querySelector('input[type="email"]');
        const submitButton = form.querySelector('button[type="submit"]');
        
        if (!emailInput || !emailInput.value.trim()) {
            window.SATPrep.showToast('Please enter a valid email address.', 'error');
            return;
        }

        if (!isValidEmail(emailInput.value)) {
            window.SATPrep.showToast('Please enter a valid email address.', 'error');
            return;
        }

        const data = {
            email: emailInput.value.trim(),
            source: window.location.pathname,
            timestamp: new Date().toISOString()
        };

        window.SATPrep.setLoading(submitButton, true);

        try {
            await simulateNewsletterSubmission(data);
            
            // Success feedback
            emailInput.value = '';
            window.SATPrep.showToast('Successfully subscribed to newsletter!', 'success');
            
            // Save subscription status
            window.SATPrep.saveToStorage('newsletter_subscribed', true);
            
        } catch (error) {
            window.SATPrep.showToast('Failed to subscribe. Please try again.', 'error');
        } finally {
            window.SATPrep.setLoading(submitButton, false);
        }
    }

    function validateForm(form) {
        const inputs = form.querySelectorAll('input, select, textarea');
        let isValid = true;

        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    function validateField(field) {
        const formGroup = field.closest('.form__group');
        if (!formGroup) return true;

        // Remove existing validation
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
            if (!isValidEmail(field.value)) {
                isValid = false;
                message = 'Please enter a valid email address.';
            }
        }

        // Phone validation (if present)
        if (field.type === 'tel' && field.value) {
            if (!isValidPhone(field.value)) {
                isValid = false;
                message = 'Please enter a valid phone number.';
            }
        }

        // Message length validation
        if (field.tagName === 'TEXTAREA' && field.value) {
            if (field.value.length < 10) {
                isValid = false;
                message = 'Please provide a more detailed message (at least 10 characters).';
            }
        }

        // Custom validation for specific fields
        if (field.name === 'firstName' || field.name === 'lastName') {
            if (field.value && field.value.length < 2) {
                isValid = false;
                message = 'Name must be at least 2 characters long.';
            }
        }

        // Update UI
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

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidPhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
    }

    // Simulate form submission (replace with actual API calls)
    async function simulateFormSubmission(data, type) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate random success/failure for demo
                if (Math.random() > 0.1) { // 90% success rate
                    console.log(`${type} form submitted:`, data);
                    
                    // Save to localStorage for demo purposes
                    const submissions = window.SATPrep.getFromStorage('form_submissions', []);
                    submissions.push(data);
                    window.SATPrep.saveToStorage('form_submissions', submissions);
                    
                    resolve();
                } else {
                    reject(new Error('Network error. Please try again.'));
                }
            }, 1000 + Math.random() * 2000); // 1-3 second delay
        });
    }

    async function simulateNewsletterSubmission(data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.05) { // 95% success rate
                    console.log('Newsletter subscription:', data);
                    
                    const subscriptions = window.SATPrep.getFromStorage('newsletter_subscriptions', []);
                    subscriptions.push(data);
                    window.SATPrep.saveToStorage('newsletter_subscriptions', subscriptions);
                    
                    resolve();
                } else {
                    reject(new Error('Subscription failed'));
                }
            }, 800 + Math.random() * 1200); // 0.8-2 second delay
        });
    }

    function handleFormSuccess(form, type) {
        // Show success message
        const successMessages = {
            contact: 'Thank you for your message! We\'ll get back to you within 24 hours.',
            feedback: 'Thank you for your feedback! We appreciate your input.',
            newsletter: 'Successfully subscribed to our newsletter!'
        };

        window.SATPrep.showToast(successMessages[type], 'success', 5000);

        // Reset form
        form.reset();
        
        // Remove any validation classes
        const formGroups = form.querySelectorAll('.form__group');
        formGroups.forEach(group => {
            group.classList.remove('success', 'error');
            const message = group.querySelector('.form__message');
            if (message) {
                message.remove();
            }
        });

        // Special handling for different form types
        if (type === 'contact') {
            // Could redirect to a thank you page
            // window.location.href = '/thank-you.html';
        }

        if (type === 'feedback') {
            // Reset star rating
            const stars = form.querySelectorAll('.star');
            stars.forEach(star => star.classList.remove('active'));
            const ratingInput = form.querySelector('#rating');
            if (ratingInput) ratingInput.value = '';
        }
    }

    function handleFormError(form, error) {
        console.error('Form submission error:', error);
        window.SATPrep.showToast(error.message || 'An error occurred. Please try again.', 'error');
    }

    // Auto-save functionality
    function setupAutoSave(form, type) {
        const inputs = form.querySelectorAll('input:not([type="submit"]), select, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('input', window.SATPrep.debounce(() => {
                saveFormData(form, type);
            }, 1000));
        });

        // Load saved data on page load
        loadFormData(form, type);
    }

    function saveFormData(form, type) {
        const formData = new FormData(form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            if (value.trim()) { // Only save non-empty values
                data[key] = value;
            }
        }

        if (Object.keys(data).length > 0) {
            window.SATPrep.saveToStorage(`form_draft_${type}`, {
                data,
                timestamp: new Date().toISOString()
            });
        }
    }

    function loadFormData(form, type) {
        const saved = window.SATPrep.getFromStorage(`form_draft_${type}`);
        
        if (saved && saved.data) {
            // Only load if saved within last 24 hours
            const saveTime = new Date(saved.timestamp);
            const now = new Date();
            const hoursDiff = (now - saveTime) / (1000 * 60 * 60);
            
            if (hoursDiff < 24) {
                Object.entries(saved.data).forEach(([key, value]) => {
                    const input = form.querySelector(`[name="${key}"]`);
                    if (input && !input.value) {
                        input.value = value;
                    }
                });
                
                // Show notification about restored data
                setTimeout(() => {
                    window.SATPrep.showToast('Draft restored from previous session', 'info');
                }, 1000);
            }
        }
    }

    function clearAutoSavedData(type) {
        window.SATPrep.saveToStorage(`form_draft_${type}`, null);
    }

    // Character counter for textarea fields
    function setupCharacterCounters() {
        const textareas = document.querySelectorAll('textarea');
        
        textareas.forEach(textarea => {
            const maxLength = textarea.getAttribute('maxlength');
            if (!maxLength) return;

            const counter = document.createElement('div');
            counter.className = 'character-counter';
            counter.textContent = `0 / ${maxLength}`;
            
            textarea.parentNode.appendChild(counter);
            
            textarea.addEventListener('input', function() {
                const current = this.value.length;
                counter.textContent = `${current} / ${maxLength}`;
                
                if (current > maxLength * 0.9) {
                    counter.style.color = 'var(--color-warning)';
                } else {
                    counter.style.color = 'var(--color-text-light)';
                }
            });
        });
    }

    // Add character counter styles
    function addFormStyles() {
        const styles = document.createElement('style');
        styles.textContent = `
            .character-counter {
                font-size: var(--font-size-xs);
                color: var(--color-text-light);
                text-align: right;
                margin-top: var(--spacing-1);
            }
            
            .form__group.success input,
            .form__group.success select,
            .form__group.success textarea {
                border-color: var(--color-success);
            }
            
            .form__group.error input,
            .form__group.error select,
            .form__group.error textarea {
                border-color: var(--color-error);
            }
            
            .form__message {
                margin-top: var(--spacing-2);
                font-size: var(--font-size-sm);
                font-weight: 500;
            }
            
            .form__message.success {
                color: var(--color-success);
            }
            
            .form__message.error {
                color: var(--color-error);
            }
            
            .search-clear {
                position: absolute;
                right: 10px;
                top: 50%;
                transform: translateY(-50%);
                background: none;
                border: none;
                font-size: 1.5rem;
                color: var(--color-text-light);
                cursor: pointer;
                padding: 0;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .search-clear:hover {
                color: var(--color-text);
            }
        `;
        document.head.appendChild(styles);
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initForms();
            setupCharacterCounters();
            addFormStyles();
        });
    } else {
        initForms();
        setupCharacterCounters();
        addFormStyles();
    }

})();
