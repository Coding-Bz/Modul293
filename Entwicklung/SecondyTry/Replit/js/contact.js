// Contact Page JavaScript

class ContactManager {
  constructor() {
    this.contactForm = document.getElementById('contactForm');
    this.feedbackForm = document.getElementById('feedbackForm');
    this.currentRating = 0;
    
    this.init();
  }

  init() {
    this.setupContactForm();
    this.setupFeedbackForm();
    this.setupFileUpload();
    this.setupStarRating();
  }

  setupContactForm() {
    if (!this.contactForm) return;

    this.contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      await this.handleContactSubmission();
    });

    // Real-time validation
    const inputs = this.contactForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearFieldError(input));
    });

    // Subject change handler
    const subjectSelect = document.getElementById('subject');
    if (subjectSelect) {
      subjectSelect.addEventListener('change', (e) => {
        this.handleSubjectChange(e.target.value);
      });
    }
  }

  setupFeedbackForm() {
    if (!this.feedbackForm) return;

    this.feedbackForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      await this.handleFeedbackSubmission();
    });

    // Real-time validation
    const inputs = this.feedbackForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearFieldError(input));
    });
  }

  setupFileUpload() {
    const fileInput = document.getElementById('attachment');
    const fileLabel = document.querySelector('.file-label');
    const fileStatus = document.getElementById('fileStatus');

    if (!fileInput || !fileLabel || !fileStatus) return;

    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      
      if (file) {
        // Validate file
        const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/jpg', 'image/png'];
        const maxSize = 10 * 1024 * 1024; // 10MB

        if (!validTypes.includes(file.type)) {
          fileStatus.textContent = 'Invalid file type. Please select PDF, DOC, DOCX, JPG, or PNG.';
          fileStatus.className = 'file-status error';
          fileInput.value = '';
          return;
        }

        if (file.size > maxSize) {
          fileStatus.textContent = 'File size too large. Maximum size is 10MB.';
          fileStatus.className = 'file-status error';
          fileInput.value = '';
          return;
        }

        // Update UI
        fileStatus.textContent = `Selected: ${file.name} (${this.formatFileSize(file.size)})`;
        fileStatus.className = 'file-status success';
        
        // Update label
        const fileInfo = fileLabel.querySelector('.file-info div:first-child');
        if (fileInfo) {
          fileInfo.textContent = file.name;
        }
      } else {
        fileStatus.textContent = '';
        fileStatus.className = 'file-status';
        
        // Reset label
        const fileInfo = fileLabel.querySelector('.file-info div:first-child');
        if (fileInfo) {
          fileInfo.textContent = 'Choose file or drag and drop';
        }
      }
    });

    // Drag and drop functionality
    fileLabel.addEventListener('dragover', (e) => {
      e.preventDefault();
      fileLabel.style.borderColor = 'var(--primary-blue)';
      fileLabel.style.background = 'rgba(37, 99, 235, 0.05)';
    });

    fileLabel.addEventListener('dragleave', (e) => {
      e.preventDefault();
      fileLabel.style.borderColor = 'var(--border-color)';
      fileLabel.style.background = 'var(--light-gray)';
    });

    fileLabel.addEventListener('drop', (e) => {
      e.preventDefault();
      fileLabel.style.borderColor = 'var(--border-color)';
      fileLabel.style.background = 'var(--light-gray)';
      
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        fileInput.files = files;
        fileInput.dispatchEvent(new Event('change'));
      }
    });
  }

  setupStarRating() {
    const stars = document.querySelectorAll('.rating-stars .star');
    const ratingLabel = document.getElementById('ratingLabel');

    if (!stars.length || !ratingLabel) return;

    const ratingLabels = {
      1: 'Poor - Needs significant improvement',
      2: 'Fair - Below expectations',
      3: 'Good - Meets expectations',
      4: 'Very Good - Exceeds expectations',
      5: 'Excellent - Outstanding experience'
    };

    stars.forEach((star, index) => {
      star.addEventListener('click', () => {
        this.currentRating = index + 1;
        this.updateStarDisplay();
        ratingLabel.textContent = ratingLabels[this.currentRating];
      });

      star.addEventListener('mouseenter', () => {
        this.updateStarDisplay(index + 1);
        ratingLabel.textContent = ratingLabels[index + 1];
      });
    });

    const starsContainer = document.querySelector('.rating-stars');
    if (starsContainer) {
      starsContainer.addEventListener('mouseleave', () => {
        this.updateStarDisplay();
        if (this.currentRating > 0) {
          ratingLabel.textContent = ratingLabels[this.currentRating];
        } else {
          ratingLabel.textContent = 'Click to rate';
        }
      });
    }
  }

  updateStarDisplay(hoverRating = null) {
    const stars = document.querySelectorAll('.rating-stars .star');
    const rating = hoverRating || this.currentRating;

    stars.forEach((star, index) => {
      if (index < rating) {
        star.classList.add('active');
      } else {
        star.classList.remove('active');
      }
    });
  }

  async handleContactSubmission() {
    if (!this.validateContactForm()) {
      return;
    }

    const submitButton = this.contactForm.querySelector('.form-submit');
    const originalText = submitButton.textContent;

    try {
      // Show loading state
      submitButton.classList.add('loading');
      submitButton.disabled = true;

      // Collect form data
      const formData = new FormData(this.contactForm);
      
      // Simulate API call
      await this.submitContactForm(formData);

      // Show success message
      this.showSuccessMessage('Thank you for your message! We\'ll get back to you within 24 hours.');
      
      // Reset form
      this.contactForm.reset();
      this.clearAllErrors();
      
      // Reset file upload
      const fileStatus = document.getElementById('fileStatus');
      if (fileStatus) {
        fileStatus.textContent = '';
        fileStatus.className = 'file-status';
      }

    } catch (error) {
      console.error('Contact form submission error:', error);
      this.showErrorMessage('Something went wrong. Please try again or contact us directly at support@satpreppro.com.');
    } finally {
      // Reset button state
      submitButton.classList.remove('loading');
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  }

  async handleFeedbackSubmission() {
    if (!this.validateFeedbackForm()) {
      return;
    }

    const submitButton = this.feedbackForm.querySelector('.form-submit');
    const originalText = submitButton.textContent;

    try {
      // Show loading state
      submitButton.classList.add('loading');
      submitButton.disabled = true;

      // Collect form data
      const formData = new FormData(this.feedbackForm);
      formData.append('rating', this.currentRating);

      // Simulate API call
      await this.submitFeedback(formData);

      // Show success message
      this.showSuccessMessage('Thank you for your feedback! Your input helps us improve our platform.');
      
      // Reset form
      this.feedbackForm.reset();
      this.currentRating = 0;
      this.updateStarDisplay();
      document.getElementById('ratingLabel').textContent = 'Click to rate';
      this.clearAllErrors();

    } catch (error) {
      console.error('Feedback submission error:', error);
      this.showErrorMessage('Something went wrong. Please try again later.');
    } finally {
      // Reset button state
      submitButton.classList.remove('loading');
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  }

  async submitContactForm(formData) {
    // In a real application, this would send data to your backend
    // For now, we'll simulate an API call
    
    const contactData = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      subject: formData.get('subject'),
      message: formData.get('message'),
      newsletter: formData.get('newsletter') === 'on',
      timestamp: new Date().toISOString(),
      hasAttachment: formData.get('attachment') && formData.get('attachment').size > 0
    };

    console.log('Contact form submitted:', contactData);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate potential errors (uncomment to test error handling)
    // if (Math.random() < 0.1) {
    //   throw new Error('Simulated API error');
    // }

    // Store in localStorage for demo purposes
    const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
    submissions.push(contactData);
    localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
  }

  async submitFeedback(formData) {
    // In a real application, this would send data to your backend
    
    const feedbackData = {
      rating: this.currentRating,
      category: formData.get('category'),
      message: formData.get('message'),
      email: formData.get('email'),
      followUp: formData.get('followUp') === 'on',
      timestamp: new Date().toISOString()
    };

    console.log('Feedback submitted:', feedbackData);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Store in localStorage for demo purposes
    const feedback = JSON.parse(localStorage.getItem('userFeedback') || '[]');
    feedback.push(feedbackData);
    localStorage.setItem('userFeedback', JSON.stringify(feedback));
  }

  validateContactForm() {
    const requiredFields = ['firstName', 'lastName', 'email', 'subject', 'message'];
    let isValid = true;

    requiredFields.forEach(fieldName => {
      const field = document.getElementById(fieldName);
      if (field && !this.validateField(field)) {
        isValid = false;
      }
    });

    // Validate privacy checkbox
    const privacyCheckbox = document.getElementById('privacy');
    if (privacyCheckbox && !privacyCheckbox.checked) {
      this.showFieldError(privacyCheckbox, 'You must agree to the privacy policy');
      isValid = false;
    }

    return isValid;
  }

  validateFeedbackForm() {
    let isValid = true;

    // Validate rating
    if (this.currentRating === 0) {
      this.showErrorMessage('Please provide a rating before submitting your feedback.');
      isValid = false;
    }

    // Validate message
    const messageField = document.getElementById('feedbackMessage');
    if (messageField && !this.validateField(messageField)) {
      isValid = false;
    }

    return isValid;
  }// Contact Page JavaScript
}
class ContactManager {
  constructor() {
    this.contactForm = document.getElementById('contactForm');
    this.feedbackForm = document.getElementById('feedbackForm');
    this.fileInput = document.getElementById('attachment');
    this.currentRating = 0;
    
    this.init();
  }

  init() {
    this.setupContactForm();
    this.setupFeedbackForm();
    this.setupFileUpload();
    this.setupStarRating();
    this.setupFormValidation();
  }

  setupContactForm() {
    if (this.contactForm) {
      this.contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleContactSubmission(e);
      });

      // Real-time validation
      this.contactForm.querySelectorAll('input, select, textarea').forEach(field => {
        field.addEventListener('blur', () => this.validateField(field));
        field.addEventListener('input', () => this.clearFieldError(field));
      });
    }
  }

  setupFeedbackForm() {
    if (this.feedbackForm) {
      this.feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleFeedbackSubmission(e);
      });
    }
  }

  setupFileUpload() {
    if (this.fileInput) {
      this.fileInput.addEventListener('change', (e) => {
        this.handleFileUpload(e);
      });

      // Drag and drop functionality
      const fileLabel = this.fileInput.nextElementSibling;
      if (fileLabel) {
        fileLabel.addEventListener('dragover', (e) => {
          e.preventDefault();
          fileLabel.style.borderColor = 'var(--primary-blue)';
          fileLabel.style.background = 'rgba(37, 99, 235, 0.05)';
        });

        fileLabel.addEventListener('dragleave', (e) => {
          e.preventDefault();
          fileLabel.style.borderColor = 'var(--border-color)';
          fileLabel.style.background = 'var(--light-gray)';
        });

        fileLabel.addEventListener('drop', (e) => {
          e.preventDefault();
          fileLabel.style.borderColor = 'var(--border-color)';
          fileLabel.style.background = 'var(--light-gray)';
          
          const files = e.dataTransfer.files;
          if (files.length > 0) {
            this.fileInput.files = files;
            this.handleFileUpload({ target: { files } });
          }
        });
      }
    }
  }

  setupStarRating() {
    const stars = document.querySelectorAll('.star');
    const ratingLabel = document.getElementById('ratingLabel');
    
    if (stars.length > 0) {
      stars.forEach((star, index) => {
        star.addEventListener('click', () => {
          this.currentRating = index + 1;
          this.updateStarDisplay();
          this.updateRatingLabel();
        });

        star.addEventListener('mouseover', () => {
          this.highlightStars(index + 1);
        });
      });

      const ratingContainer = document.getElementById('overallRating');
      if (ratingContainer) {
        ratingContainer.addEventListener('mouseleave', () => {
          this.updateStarDisplay();
        });
      }
    }
  }

  setupFormValidation() {
    // Add custom validation rules
    this.validationRules = {
      email: {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Please enter a valid email address'
      },
      phone: {
        pattern: /^[\+]?[1-9][\d]{0,15}$/,
        message: 'Please enter a valid phone number'
      },
      required: {
        test: (value) => value && value.trim().length > 0,
        message: 'This field is required'
      }
    };
  }

  async handleContactSubmission(e) {
    const form = e.target;
    const submitButton = form.querySelector('.form-submit');
    
    // Validate form
    if (!this.validateForm(form)) {
      this.showMessage('Please fix the errors below and try again.', 'error');
      return;
    }

    // Show loading state
    submitButton.classList.add('loading');
    submitButton.disabled = true;

    try {
      const formData = new FormData(form);
      
      // In a real application, this would send to a backend API
      await this.submitContactForm(formData);
      
      this.showSuccessMessage(form);
      form.reset();
      
      // Clear file status
      const fileStatus = document.getElementById('fileStatus');
      if (fileStatus) {
        fileStatus.textContent = '';
        fileStatus.className = 'file-status';
      }
      
    } catch (error) {
      console.error('Contact form submission error:', error);
      this.showMessage('Sorry, there was an error sending your message. Please try again.', 'error');
    } finally {
      submitButton.classList.remove('loading');
      submitButton.disabled = false;
    }
  }

  async handleFeedbackSubmission(e) {
    const form = e.target;
    const submitButton = form.querySelector('.form-submit');
    
    // Validate rating
    if (this.currentRating === 0) {
      this.showMessage('Please provide a rating before submitting.', 'error');
      return;
    }

    // Validate required fields
    if (!this.validateForm(form)) {
      this.showMessage('Please fill in all required fields.', 'error');
      return;
    }

    // Show loading state
    submitButton.classList.add('loading');
    submitButton.disabled = true;

    try {
      const formData = new FormData(form);
      formData.append('rating', this.currentRating);
      
      // In a real application, this would send to a backend API
      await this.submitFeedbackForm(formData);
      
      this.showFeedbackSuccessMessage(form);
      form.reset();
      this.resetStarRating();
      
    } catch (error) {
      console.error('Feedback form submission error:', error);
      this.showMessage('Sorry, there was an error submitting your feedback. Please try again.', 'error');
    } finally {
      submitButton.classList.remove('loading');
      submitButton.disabled = false;
    }
  }

  async submitContactForm(formData) {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Log form data for development
    console.log('Contact form submitted:', Object.fromEntries(formData));
    
    // In a real app, this would be:
    // const response = await fetch('/api/contact', {
    //   method: 'POST',
    //   body: formData
    // });
    // if (!response.ok) throw new Error('Failed to submit form');
    // return response.json();
  }

  async submitFeedbackForm(formData) {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Log form data for development
    console.log('Feedback form submitted:', Object.fromEntries(formData));
    
    // In a real app, this would be:
    // const response = await fetch('/api/feedback', {
    //   method: 'POST',
    //   body: formData
    // });
    // if (!response.ok) throw new Error('Failed to submit feedback');
    // return response.json();
  }

  handleFileUpload(e) {
    const files = e.target.files;
    const fileStatus = document.getElementById('fileStatus');
    
    if (!files.length || !fileStatus) return;
    
    const file = files[0];
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/jpg',
      'image/png'
    ];
    
    // Validate file size
    if (file.size > maxSize) {
      fileStatus.textContent = 'File size must be less than 10MB';
      fileStatus.className = 'file-status error';
      this.fileInput.value = '';
      return;
    }
    
    // Validate file type
    if (!allowedTypes.includes(file.type)) {
      fileStatus.textContent = 'Please select a PDF, DOC, DOCX, JPG, or PNG file';
      fileStatus.className = 'file-status error';
      this.fileInput.value = '';
      return;
    }
    
    // Show success message
    fileStatus.textContent = `✓ ${file.name} (${this.formatFileSize(file.size)})`;
    fileStatus.className = 'file-status success';
  }

  validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });
    
    return isValid;
  }

  validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    const isRequired = field.hasAttribute('required');
    
    // Clear previous errors
    this.clearFieldError(field);
    
    // Check required fields
    if (isRequired && !value) {
      this.showFieldError(field, 'This field is required');
      return false;
    }
    
    // Skip validation for empty optional fields
    if (!value && !isRequired) {
      return true;
    }
    
    // Email validation
    if (fieldType === 'email' && !this.validationRules.email.pattern.test(value)) {
      this.showFieldError(field, this.validationRules.email.message);
      return false;
    }
    
    // Phone validation
    if (fieldType === 'tel' && value && !this.validationRules.phone.pattern.test(value.replace(/\D/g, ''))) {
      this.showFieldError(field, this.validationRules.phone.message);
      return false;
    }
    
    // Message length validation
    if (field.tagName === 'TEXTAREA' && value.length < 10) {
      this.showFieldError(field, 'Please provide a more detailed message (at least 10 characters)');
      return false;
    }
    
    return true;
  }

  showFieldError(field, message) {
    field.classList.add('error');
    
    let errorElement = field.parentNode.querySelector('.field-error');
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.className = 'field-error';
      field.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
  }

  clearFieldError(field) {
    field.classList.remove('error');
    
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
      errorElement.remove();
    }
  }

  highlightStars(rating) {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
      if (index < rating) {
        star.classList.add('active');
      } else {
        star.classList.remove('active');
      }
    });
  }

  updateStarDisplay() {
    this.highlightStars(this.currentRating);
  }

  updateRatingLabel() {
    const ratingLabel = document.getElementById('ratingLabel');
    if (ratingLabel) {
      const labels = [
        'Click to rate',
        'Poor',
        'Fair', 
        'Good',
        'Very Good',
        'Excellent'
      ];
      ratingLabel.textContent = labels[this.currentRating] || labels[0];
    }
  }

  resetStarRating() {
    this.currentRating = 0;
    this.updateStarDisplay();
    this.updateRatingLabel();
  }

  showSuccessMessage(form) {
    // Remove any existing success/error messages
    const existingMessage = form.querySelector('.form-success, .form-error');
    if (existingMessage) {
      existingMessage.remove();
    }
    
    const successMessage = document.createElement('div');
    successMessage.className = 'form-success';
    successMessage.innerHTML = `
      <strong>Message sent successfully!</strong><br>
      Thank you for contacting us. We'll get back to you within 24 hours.
    `;
    
    form.insertBefore(successMessage, form.firstChild);
    
    // Scroll to message
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Show global success message
    this.showMessage('Your message has been sent successfully!', 'success');
  }

  showFeedbackSuccessMessage(form) {
    // Remove any existing success/error messages
    const existingMessage = form.querySelector('.form-success, .form-error');
    if (existingMessage) {
      existingMessage.remove();
    }
    
    const successMessage = document.createElement('div');
    successMessage.className = 'form-success';
    successMessage.innerHTML = `
      <strong>Thank you for your feedback!</strong><br>
      Your input helps us improve our platform and better serve students like you.
    `;
    
    form.insertBefore(successMessage, form.firstChild);
    
    // Scroll to message
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Show global success message
    this.showMessage('Thank you for your feedback!', 'success');
  }

  showMessage(message, type = 'info') {
    // Use the global message system if available
    if (window.satApp && window.satApp.showMessage) {
      window.satApp.showMessage(message, type);
    } else {
      // Fallback to alert
      alert(message);
    }
  }

  formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

// Live Chat functionality
function openLiveChat() {
  // In a real application, this would open a chat widget
  // For now, we'll show a placeholder message
  if (window.satApp && window.satApp.showMessage) {
    window.satApp.showMessage('Live chat will be available soon! Please use the contact form for now.', 'info');
  } else {
    alert('Live chat will be available soon! Please use the contact form for now.');
  }
}

// Team member contact functionality
class TeamMemberManager {
  constructor() {
    this.setupTeamMemberContacts();
  }

  setupTeamMemberContacts() {
    document.addEventListener('click', (e) => {
      if (e.target.matches('.member-contact a[href^="mailto:"]')) {
        this.trackEmailClick(e.target);
      } else if (e.target.matches('.member-contact a[title="Calendar"]')) {
        e.preventDefault();
        this.openCalendarBooking(e.target);
      } else if (e.target.matches('.member-contact a[title="Consultation"]')) {
        e.preventDefault();
        this.openConsultationBooking(e.target);
      }
    });
  }

  trackEmailClick(emailLink) {
    const memberName = emailLink.closest('.team-member').querySelector('.member-name').textContent;
    console.log(`Email click tracked: ${memberName}`);
    
    // In a real app, this would track the interaction
    // analytics.track('team_member_email_click', { member: memberName });
  }

  openCalendarBooking(calendarLink) {
    const memberName = calendarLink.closest('.team-member').querySelector('.member-name').textContent;
    
    // In a real app, this would open a calendar booking system
    if (window.satApp && window.satApp.showMessage) {
      window.satApp.showMessage(`Calendar booking with ${memberName} will be available soon!`, 'info');
    } else {
      alert(`Calendar booking with ${memberName} will be available soon!`);
    }
  }

  openConsultationBooking(consultationLink) {
    const memberName = consultationLink.closest('.team-member').querySelector('.member-name').textContent;
    
    // In a real app, this would open a consultation booking form
    if (window.satApp && window.satApp.showMessage) {
      window.satApp.showMessage(`Consultation booking with ${memberName} will be available soon!`, 'info');
    } else {
      alert(`Consultation booking with ${memberName} will be available soon!`);
    }
  }
}

// Contact Analytics
class ContactAnalytics {
  constructor() {
    this.trackingData = {
      formViews: 0,
      formStarts: 0,
      formSubmissions: 0,
      feedbackSubmissions: 0,
      teamMemberClicks: {}
    };
    
    this.init();
  }

  init() {
    this.trackPageView();
    this.setupFormTracking();
    this.setupTeamMemberTracking();
  }

  trackPageView() {
    this.trackingData.formViews++;
    console.log('Contact page viewed:', this.trackingData);
  }

  setupFormTracking() {
    // Track form starts
    const forms = document.querySelectorAll('#contactForm, #feedbackForm');
    forms.forEach(form => {
      const inputs = form.querySelectorAll('input, textarea, select');
      inputs.forEach(input => {
        input.addEventListener('focus', () => {
          if (!form.dataset.started) {
            form.dataset.started = 'true';
            this.trackingData.formStarts++;
            console.log('Form started:', form.id, this.trackingData);
          }
        }, { once: true });
      });
    });

    // Track form submissions
    document.addEventListener('submit', (e) => {
      if (e.target.id === 'contactForm') {
        this.trackingData.formSubmissions++;
        console.log('Contact form submitted:', this.trackingData);
      } else if (e.target.id === 'feedbackForm') {
        this.trackingData.feedbackSubmissions++;
        console.log('Feedback form submitted:', this.trackingData);
      }
    });
  }

  setupTeamMemberTracking() {
    document.addEventListener('click', (e) => {
      if (e.target.closest('.team-member')) {
        const memberName = e.target.closest('.team-member').querySelector('.member-name').textContent;
        this.trackingData.teamMemberClicks[memberName] = 
          (this.trackingData.teamMemberClicks[memberName] || 0) + 1;
        console.log('Team member clicked:', memberName, this.trackingData);
      }
    });
  }

  getAnalytics() {
    return this.trackingData;
  }
}

// Form auto-save functionality
class FormAutoSave {
  constructor() {
    this.saveKey = 'contact_form_autosave';
    this.saveInterval = 5000; // 5 seconds
    this.setupAutoSave();
  }

  setupAutoSave() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      // Load saved data
      this.loadSavedData(contactForm);
      
      // Setup auto-save
      let saveTimeout;
      contactForm.addEventListener('input', () => {
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(() => {
          this.saveFormData(contactForm);
        }, this.saveInterval);
      });
      
      // Clear saved data on successful submission
      contactForm.addEventListener('submit', () => {
        setTimeout(() => {
          this.clearSavedData();
        }, 1000);
      });
    }
  }

  saveFormData(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Don't save sensitive data
    delete data.attachment;
    
    localStorage.setItem(this.saveKey, JSON.stringify({
      data,
      timestamp: Date.now()
    }));
    
    console.log('Form data auto-saved');
  }

  loadSavedData(form) {
    try {
      const saved = localStorage.getItem(this.saveKey);
      if (!saved) return;
      
      const { data, timestamp } = JSON.parse(saved);
      
      // Only restore data from the last 24 hours
      if (Date.now() - timestamp > 24 * 60 * 60 * 1000) {
        this.clearSavedData();
        return;
      }
      
      // Restore form data
      Object.entries(data).forEach(([name, value]) => {
        const field = form.querySelector(`[name="${name}"]`);
        if (field && field.type !== 'file') {
          field.value = value;
        }
      });
      
      // Show notification
      if (Object.keys(data).length > 0) {
        setTimeout(() => {
          if (window.satApp && window.satApp.showMessage) {
            window.satApp.showMessage('Your previously entered information has been restored.', 'info');
          }
        }, 1000);
      }
      
    } catch (error) {
      console.error('Error loading saved form data:', error);
      this.clearSavedData();
    }
  }

  clearSavedData() {
    localStorage.removeItem(this.saveKey);
  }
}

// Initialize all contact functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.contactManager = new ContactManager();
  window.teamMemberManager = new TeamMemberManager();
  window.contactAnalytics = new ContactAnalytics();
  window.formAutoSave = new FormAutoSave();
});

// Add custom styles for form validation
const contactStyles = document.createElement('style');
contactStyles.textContent = `
  .field-error {
    color: #ef4444;
    font-size: 0.75rem;
    margin-top: 0.25rem;
  }
  
  .form-input.error,
  .form-select.error,
  .form-textarea.error {
    border-color: #ef4444;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
  }
  
  .star:hover {
    transform: scale(1.1);
    cursor: pointer;
  }
  
  .star.active {
    color: var(--accent-orange);
  }
  
  .form-submit.loading {
    position: relative;
    color: transparent;
  }
  
  .form-submit.loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    border: 2px solid transparent;
    border-top: 2px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: translate(-50%, -50%) rotate(0deg); }
    100% { transform: translate(-50%, -50%) rotate(360deg); }
  }
`;
document.head.appendChild(contactStyles);
