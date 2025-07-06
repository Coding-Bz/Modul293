// Newsletter Form Submission
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        // Here you would typically send the email to your backend
        alert('Thank you for subscribing! We will keep you updated.');
        this.reset();
    });
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Feature Filter Functionality (to be expanded)
const filterFeatures = () => {
    const filters = document.querySelectorAll('.feature-filter');
    const featureCards = document.querySelectorAll('.feature-card');
    
    filters.forEach(filter => {
        filter.addEventListener('click', () => {
            const category = filter.dataset.category;
            featureCards.forEach(card => {
                if (card.dataset.category === category || category === 'all') {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
};

// Initialize Feature Filter
filterFeatures();

// Score Calculator (to be implemented in a separate page)
const calculateScore = () => {
    const readingScore = document.getElementById('reading-score').value;
    const writingScore = document.getElementById('writing-score').value;
    const mathScore = document.getElementById('math-score').value;
    
    const totalScore = (readingScore + writingScore + mathScore);
    return totalScore;
};

// University Filter Functionality
const filterUniversities = () => {
    const filters = document.querySelectorAll('.university-filter');
    const universityCards = document.querySelectorAll('.university-card');
    
    filters.forEach(filter => {
        filter.addEventListener('click', () => {
            const category = filter.dataset.category;
            universityCards.forEach(card => {
                if (card.dataset.category === category || category === 'all') {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
};

// Contact Form Validation
const validateContactForm = () => {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !subject || !message) {
                e.preventDefault();
                alert('Please fill in all required fields!');
            }
        });
    }
};

// Initialize all functions
validateContactForm();
