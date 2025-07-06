// Feature detail page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Feature data
    const featureData = {
        'practice-tests': {
            title: 'Practice Tests',
            description: 'Our comprehensive practice tests are designed to mirror the actual SAT exam experience. Each test includes the same number of questions, time limits, and difficulty distribution as the real SAT. Track your progress across multiple tests and identify areas for improvement.',
            media: '<div style="background: #f0f9ff; padding: 2rem; border-radius: 1rem; text-align: center; color: #0369a1;">📝 Practice Test Interface Preview</div>'
        },
        'question-bank': {
            title: 'Question Bank',
            description: 'Access thousands of carefully curated SAT questions organized by topic, difficulty, and question type. Practice specific areas like algebra, geometry, reading comprehension, or grammar. Our adaptive system ensures you see questions that match your current skill level.',
            media: '<div style="background: #f0f9ff; padding: 2rem; border-radius: 1rem; text-align: center; color: #0369a1;">📚 Question Bank Preview</div>'
        },
        'progress-tracking': {
            title: 'Progress Tracking',
            description: 'Monitor your SAT preparation journey with detailed analytics and visual progress charts. See your score improvements over time, identify patterns in your performance, and get insights into your study effectiveness.',
            media: '<div style="background: #f0f9ff; padding: 2rem; border-radius: 1rem; text-align: center; color: #0369a1;">📊 Progress Dashboard Preview</div>'
        },
        'performance-insights': {
            title: 'Performance Insights',
            description: 'Get AI-powered analysis of your performance patterns. Our system identifies your strengths and weaknesses, provides personalized recommendations, and helps you focus your study time on areas that will have the biggest impact.',
            media: '<div style="background: #f0f9ff; padding: 2rem; border-radius: 1rem; text-align: center; color: #0369a1;">🤖 AI Insights Preview</div>'
        },
        'university-finder': {
            title: 'University Finder',
            description: 'Find universities that match your SAT score, academic interests, and personal preferences. Filter by location, program offerings, admission requirements, and more. Get detailed information about each university\'s SAT score ranges.',
            media: '<div style="background: #f0f9ff; padding: 2rem; border-radius: 1rem; text-align: center; color: #0369a1;">🎓 University Search Preview</div>'
        },
        'admission-chances': {
            title: 'Admission Chances',
            description: 'Calculate your probability of admission to top universities based on your SAT score, GPA, extracurricular activities, and other factors. Get personalized recommendations for target, reach, and safety schools.',
            media: '<div style="background: #f0f9ff; padding: 2rem; border-radius: 1rem; text-align: center; color: #0369a1;">📈 Admission Calculator Preview</div>'
        },
        'study-planner': {
            title: 'Study Planner',
            description: 'Get a personalized study schedule based on your target score, current level, and available time. Our adaptive planner adjusts your study plan based on your progress and performance in practice sessions.',
            media: '<div style="background: #f0f9ff; padding: 2rem; border-radius: 1rem; text-align: center; color: #0369a1;">📅 Study Schedule Preview</div>'
        }
    };
    
    // Get feature ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const featureId = urlParams.get('id');
    
    // Load feature content
    if (featureId && featureData[featureId]) {
        loadFeatureContent(featureData[featureId]);
    } else {
        // Default content or error handling
        loadFeatureContent({
            title: 'Feature Not Found',
            description: 'The requested feature could not be found. Please return to the features page to browse available features.',
            media: '<div style="background: #fef2f2; padding: 2rem; border-radius: 1rem; text-align: center; color: #dc2626;">❌ Feature Not Available</div>'
        });
    }
    
    function loadFeatureContent(feature) {
        const titleElement = document.getElementById('feature-title');
        const descriptionElement = document.getElementById('feature-description');
        const mediaElement = document.querySelector('.feature-media');
        
        if (titleElement) {
            titleElement.textContent = feature.title;
        }
        
        if (descriptionElement) {
            descriptionElement.textContent = feature.description;
        }
        
        if (mediaElement) {
            mediaElement.innerHTML = feature.media;
        }
        
        // Update page title
        document.title = `${feature.title} – SAT App`;
    }
    
    // Add back button functionality
    const backButton = document.createElement('button');
    backButton.textContent = '← Back to Features';
    backButton.style.cssText = `
        position: fixed;
        top: 80px;
        left: 20px;
        background: var(--primary-blue);
        color: white;
        border: none;
        border-radius: 0.5rem;
        padding: 0.5rem 1rem;
        font-size: 0.9rem;
        cursor: pointer;
        z-index: 100;
        transition: background 0.2s;
    `;
    
    backButton.addEventListener('click', function() {
        window.location.href = 'features.html';
    });
    
    backButton.addEventListener('mouseenter', function() {
        this.style.background = 'var(--accent)';
        this.style.color = '#222';
    });
    
    backButton.addEventListener('mouseleave', function() {
        this.style.background = 'var(--primary-blue)';
        this.style.color = 'white';
    });
    
    document.body.appendChild(backButton);
}); 