// Contact page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    const feedbackForm = document.getElementById('feedback-form');
    
    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateContactForm()) {
                // Simulate form submission
                showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
                contactForm.reset();
            }
        });
    }
    
    // Feedback form submission
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateFeedbackForm()) {
                // Simulate form submission
                showNotification('Thank you for your feedback!', 'success');
                feedbackForm.reset();
                resetStarRating();
            }
        });
    }
    
    // Star rating functionality
    const starInputs = document.querySelectorAll('.star-rating input');
    const starLabels = document.querySelectorAll('.star-rating label');
    
    starLabels.forEach((label, index) => {
        label.addEventListener('click', function() {
            // Update radio button
            starInputs[index].checked = true;
            
            // Update visual stars
            updateStarDisplay(index + 1);
        });
        
        // Hover effects
        label.addEventListener('mouseenter', function() {
            updateStarDisplay(index + 1, true);
        });
        
        label.addEventListener('mouseleave', function() {
            const selectedRating = getSelectedRating();
            updateStarDisplay(selectedRating, false);
        });
    });
    
    // Contact form validation
    function validateContactForm() {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value.trim();
        
        if (!name) {
            showNotification('Please enter your name.', 'error');
            return false;
        }
        
        if (!email || !isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return false;
        }
        
        if (!subject) {
            showNotification('Please select a subject.', 'error');
            return false;
        }
        
        if (!message || message.length < 10) {
            showNotification('Please enter a message (at least 10 characters).', 'error');
            return false;
        }
        
        return true;
    }
    
    // Feedback form validation
    function validateFeedbackForm() {
        const feedback = document.getElementById('feedback-text').value.trim();
        const rating = getSelectedRating();
        
        if (!feedback || feedback.length < 10) {
            showNotification('Please enter your feedback (at least 10 characters).', 'error');
            return false;
        }
        
        if (!rating) {
            showNotification('Please select a rating.', 'error');
            return false;
        }
        
        return true;
    }
    
    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Star rating helpers
    function getSelectedRating() {
        const checkedInput = document.querySelector('.star-rating input:checked');
        return checkedInput ? parseInt(checkedInput.value) : 0;
    }
    
    function updateStarDisplay(rating, isHover = false) {
        starLabels.forEach((label, index) => {
            if (index < rating) {
                label.style.color = 'var(--accent)';
            } else {
                label.style.color = '#ddd';
            }
        });
    }
    
    function resetStarRating() {
        starInputs.forEach(input => input.checked = false);
        updateStarDisplay(0);
    }
    
    // Notification system
    function showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            color: white;
            font-weight: 600;
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            ${type === 'success' ? 'background: #10b981;' : 'background: #ef4444;'}
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    // File upload preview (optional enhancement)
    const fileInput = document.getElementById('attachment');
    if (fileInput) {
        fileInput.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                // Show file name or create preview
                const fileName = file.name;
                const fileSize = (file.size / 1024 / 1024).toFixed(2); // MB
                
                // Create file info display
                let fileInfo = document.querySelector('.file-info');
                if (!fileInfo) {
                    fileInfo = document.createElement('div');
                    fileInfo.className = 'file-info';
                    fileInfo.style.cssText = `
                        margin-top: 0.5rem;
                        padding: 0.5rem;
                        background: var(--primary-gray);
                        border-radius: 0.5rem;
                        font-size: 0.9rem;
                        color: #666;
                    `;
                    fileInput.parentNode.appendChild(fileInfo);
                }
                
                fileInfo.textContent = `Selected: ${fileName} (${fileSize} MB)`;
            }
        });
    }
    
    // Form field focus effects
    const formInputs = document.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentNode.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.parentNode.style.transform = 'scale(1)';
        });
    });
}); 