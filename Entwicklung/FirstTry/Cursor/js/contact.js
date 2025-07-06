document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    alert('Thank you for contacting us! We will respond soon.');
    contactForm.reset();
  });

  const feedbackForm = document.getElementById('feedback-form');
  feedbackForm.addEventListener('submit', e => {
    e.preventDefault();
    alert('Thank you for your feedback!');
    feedbackForm.reset();
  });
}); 