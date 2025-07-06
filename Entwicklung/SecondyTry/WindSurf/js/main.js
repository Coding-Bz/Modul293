document.addEventListener('DOMContentLoaded', () => {

    // --- FAQ Accordion --- //
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // --- Star Rating for Feedback Form --- //
    const stars = document.querySelectorAll('.star-rating .star');
    const ratingValueInput = document.getElementById('rating-value');

    stars.forEach(star => {
        star.addEventListener('click', () => {
            const rating = star.dataset.value;
            if (ratingValueInput) {
                ratingValueInput.value = rating;
            }
            // Update star visual state
            stars.forEach(s => {
                if (s.dataset.value <= rating) {
                    s.classList.add('selected');
                } else {
                    s.classList.remove('selected');
                }
            });
        });
    });

    // --- Contact Form Submission --- //
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Here you would typically send the form data to a server
            // For this demo, we'll just show a confirmation message.
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

});