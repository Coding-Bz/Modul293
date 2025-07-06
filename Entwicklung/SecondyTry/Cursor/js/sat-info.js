// SAT Info page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            question.addEventListener('click', function() {
                // Close other open items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('open');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('open');
                
                // Add smooth animation
                if (item.classList.contains('open')) {
                    answer.style.display = 'block';
                    answer.style.opacity = '0';
                    answer.style.transform = 'translateY(-10px)';
                    
                    setTimeout(() => {
                        answer.style.opacity = '1';
                        answer.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    answer.style.opacity = '0';
                    answer.style.transform = 'translateY(-10px)';
                    
                    setTimeout(() => {
                        answer.style.display = 'none';
                    }, 200);
                }
            });
        }
    });
    
    // Add CSS transitions for smooth animations
    const style = document.createElement('style');
    style.textContent = `
        .faq-answer {
            transition: opacity 0.2s ease, transform 0.2s ease;
        }
    `;
    document.head.appendChild(style);
    
    // Add keyboard navigation for accessibility
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
            
            // Make question focusable
            question.setAttribute('tabindex', '0');
            question.setAttribute('role', 'button');
            question.setAttribute('aria-expanded', 'false');
            
            // Update aria-expanded when toggled
            question.addEventListener('click', function() {
                const isOpen = item.classList.contains('open');
                this.setAttribute('aria-expanded', isOpen.toString());
            });
        }
    });
    
    // Add smooth scrolling for any anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe sections for animation
    document.querySelectorAll('.sat-overview, .sat-stats, .sat-prep, .sat-faq').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}); 