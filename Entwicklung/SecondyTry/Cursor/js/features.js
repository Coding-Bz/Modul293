// Features page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Feature data
    const features = [
        {
            id: 'practice-tests',
            title: 'Practice Tests',
            description: 'Full-length SAT practice tests with real questions and timed conditions.',
            category: 'practice',
            link: 'feature-detail.html?id=practice-tests'
        },
        {
            id: 'question-bank',
            title: 'Question Bank',
            description: 'Thousands of practice questions organized by topic and difficulty level.',
            category: 'practice',
            link: 'feature-detail.html?id=question-bank'
        },
        {
            id: 'progress-tracking',
            title: 'Progress Tracking',
            description: 'Detailed analytics showing your improvement over time.',
            category: 'analytics',
            link: 'feature-detail.html?id=progress-tracking'
        },
        {
            id: 'performance-insights',
            title: 'Performance Insights',
            description: 'AI-powered analysis of your strengths and areas for improvement.',
            category: 'analytics',
            link: 'feature-detail.html?id=performance-insights'
        },
        {
            id: 'university-finder',
            title: 'University Finder',
            description: 'Find universities that match your SAT score and academic interests.',
            category: 'universities',
            link: 'feature-detail.html?id=university-finder'
        },
        {
            id: 'admission-chances',
            title: 'Admission Chances',
            description: 'Calculate your chances of admission to top universities.',
            category: 'universities',
            link: 'feature-detail.html?id=admission-chances'
        },
        {
            id: 'score-calculator',
            title: 'Score Calculator',
            description: 'Calculate your estimated SAT score from practice test results.',
            category: 'tools',
            link: 'calculator.html'
        },
        {
            id: 'study-planner',
            title: 'Study Planner',
            description: 'Personalized study schedules based on your target score and timeline.',
            category: 'tools',
            link: 'feature-detail.html?id=study-planner'
        }
    ];
    
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const featuresGrid = document.getElementById('features-grid');
    
    // Initialize with all features
    renderFeatures(features);
    
    // Add event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter features
            const category = this.dataset.category;
            const filteredFeatures = category === 'all' 
                ? features 
                : features.filter(feature => feature.category === category);
            
            renderFeatures(filteredFeatures);
        });
    });
    
    // Render features function
    function renderFeatures(featuresToRender) {
        if (!featuresGrid) return;
        
        featuresGrid.innerHTML = '';
        
        featuresToRender.forEach(feature => {
            const featureCard = document.createElement('div');
            featureCard.className = 'feature-card';
            featureCard.innerHTML = `
                <div class="feature-category">${getCategoryDisplayName(feature.category)}</div>
                <h2>${feature.title}</h2>
                <p>${feature.description}</p>
                <a href="${feature.link}" class="feature-link">Learn More</a>
            `;
            
            featuresGrid.appendChild(featureCard);
        });
    }
    
    // Helper function to get display names for categories
    function getCategoryDisplayName(category) {
        const displayNames = {
            'practice': 'Practice',
            'analytics': 'Analytics',
            'universities': 'Universities',
            'tools': 'Tools'
        };
        return displayNames[category] || category;
    }
    
    // Add hover effects and animations
    document.addEventListener('mouseover', function(e) {
        if (e.target.closest('.feature-card')) {
            e.target.closest('.feature-card').style.transform = 'translateY(-4px) scale(1.02)';
        }
    });
    
    document.addEventListener('mouseout', function(e) {
        if (e.target.closest('.feature-card')) {
            e.target.closest('.feature-card').style.transform = 'translateY(0) scale(1)';
        }
    });
}); 