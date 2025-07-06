// SAT Score Calculator JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const calculatorForm = document.getElementById('sat-calculator');
    const resultsSection = document.getElementById('results-section');
    
    // SAT scoring conversion tables (simplified but realistic)
    const readingConversion = {
        52: 400, 51: 400, 50: 400, 49: 400, 48: 400, 47: 400, 46: 400, 45: 400, 44: 400, 43: 400,
        42: 400, 41: 400, 40: 400, 39: 400, 38: 400, 37: 400, 36: 400, 35: 400, 34: 400, 33: 400,
        32: 400, 31: 400, 30: 400, 29: 400, 28: 400, 27: 400, 26: 400, 25: 400, 24: 400, 23: 400,
        22: 400, 21: 400, 20: 400, 19: 400, 18: 400, 17: 400, 16: 400, 15: 400, 14: 400, 13: 400,
        12: 400, 11: 400, 10: 400, 9: 400, 8: 400, 7: 400, 6: 400, 5: 400, 4: 400, 3: 400, 2: 400, 1: 400, 0: 400
    };
    
    const writingConversion = {
        44: 400, 43: 400, 42: 400, 41: 400, 40: 400, 39: 400, 38: 400, 37: 400, 36: 400, 35: 400,
        34: 400, 33: 400, 32: 400, 31: 400, 30: 400, 29: 400, 28: 400, 27: 400, 26: 400, 25: 400,
        24: 400, 23: 400, 22: 400, 21: 400, 20: 400, 19: 400, 18: 400, 17: 400, 16: 400, 15: 400,
        14: 400, 13: 400, 12: 400, 11: 400, 10: 400, 9: 400, 8: 400, 7: 400, 6: 400, 5: 400,
        4: 400, 3: 400, 2: 400, 1: 400, 0: 400
    };
    
    const mathConversion = {
        58: 800, 57: 800, 56: 800, 55: 800, 54: 800, 53: 800, 52: 800, 51: 800, 50: 800, 49: 800,
        48: 800, 47: 800, 46: 800, 45: 800, 44: 800, 43: 800, 42: 800, 41: 800, 40: 800, 39: 800,
        38: 800, 37: 800, 36: 800, 35: 800, 34: 800, 33: 800, 32: 800, 31: 800, 30: 800, 29: 800,
        28: 800, 27: 800, 26: 800, 25: 800, 24: 800, 23: 800, 22: 800, 21: 800, 20: 800, 19: 800,
        18: 800, 17: 800, 16: 800, 15: 800, 14: 800, 13: 800, 12: 800, 11: 800, 10: 800, 9: 800,
        8: 800, 7: 800, 6: 800, 5: 800, 4: 800, 3: 800, 2: 800, 1: 800, 0: 800
    };
    
    // Simplified conversion function (in reality, SAT uses more complex curves)
    function convertToScore(correct, max, conversionTable) {
        // For demo purposes, use a simplified linear conversion
        const percentage = correct / max;
        if (percentage >= 0.95) return 800;
        if (percentage >= 0.90) return 750;
        if (percentage >= 0.85) return 700;
        if (percentage >= 0.80) return 650;
        if (percentage >= 0.75) return 600;
        if (percentage >= 0.70) return 550;
        if (percentage >= 0.65) return 500;
        if (percentage >= 0.60) return 450;
        if (percentage >= 0.55) return 400;
        if (percentage >= 0.50) return 350;
        if (percentage >= 0.45) return 300;
        if (percentage >= 0.40) return 250;
        return 200;
    }
    
    // Calculate SAT scores
    function calculateSATScores(readingCorrect, writingCorrect, mathCorrect) {
        const readingScore = convertToScore(readingCorrect, 52, readingConversion);
        const writingScore = convertToScore(writingCorrect, 44, writingConversion);
        const mathScore = convertToScore(mathCorrect, 58, mathConversion);
        
        // EBRW score is average of Reading and Writing
        const ebrwScore = Math.round((readingScore + writingScore) / 2);
        
        // Total score is sum of EBRW and Math
        const totalScore = ebrwScore + mathScore;
        
        return {
            reading: readingScore,
            writing: writingScore,
            ebrw: ebrwScore,
            math: mathScore,
            total: totalScore
        };
    }
    
    // Get score analysis
    function getScoreAnalysis(scores) {
        const { total, ebrw, math } = scores;
        
        let analysis = '';
        
        // Overall score analysis
        if (total >= 1400) {
            analysis += 'Excellent! Your score is in the top tier and competitive for most universities. ';
        } else if (total >= 1200) {
            analysis += 'Great job! Your score is above average and competitive for many universities. ';
        } else if (total >= 1000) {
            analysis += 'Good work! Your score is around the national average. ';
        } else {
            analysis += 'Keep practicing! Focus on your weak areas to improve your score. ';
        }
        
        // Section comparison
        if (Math.abs(ebrw - math) > 100) {
            if (ebrw > math) {
                analysis += 'Your EBRW score is significantly higher than your Math score. Consider focusing more on Math practice.';
            } else {
                analysis += 'Your Math score is significantly higher than your EBRW score. Consider focusing more on Reading and Writing practice.';
            }
        } else {
            analysis += 'Your scores are well-balanced across sections.';
        }
        
        return analysis;
    }
    
    // Form submission handler
    if (calculatorForm) {
        calculatorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get input values
            const readingCorrect = parseInt(document.getElementById('reading-correct').value) || 0;
            const writingCorrect = parseInt(document.getElementById('writing-correct').value) || 0;
            const mathCorrect = parseInt(document.getElementById('math-correct').value) || 0;
            
            // Validate inputs
            if (readingCorrect < 0 || readingCorrect > 52) {
                showNotification('Reading score must be between 0 and 52.', 'error');
                return;
            }
            
            if (writingCorrect < 0 || writingCorrect > 44) {
                showNotification('Writing score must be between 0 and 44.', 'error');
                return;
            }
            
            if (mathCorrect < 0 || mathCorrect > 58) {
                showNotification('Math score must be between 0 and 58.', 'error');
                return;
            }
            
            // Calculate scores
            const scores = calculateSATScores(readingCorrect, writingCorrect, mathCorrect);
            
            // Display results
            displayResults(scores);
        });
    }
    
    // Display results
    function displayResults(scores) {
        if (!resultsSection) return;
        
        // Update score displays
        document.getElementById('total-score').textContent = scores.total;
        document.getElementById('ebrw-score').textContent = scores.ebrw;
        document.getElementById('math-score').textContent = scores.math;
        
        // Update analysis
        const analysisText = getScoreAnalysis(scores);
        document.getElementById('score-analysis-text').textContent = analysisText;
        
        // Show results section with animation
        resultsSection.style.display = 'block';
        resultsSection.style.opacity = '0';
        resultsSection.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            resultsSection.style.opacity = '1';
            resultsSection.style.transform = 'translateY(0)';
        }, 100);
        
        // Scroll to results
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    // Input validation and real-time feedback
    const inputs = document.querySelectorAll('#sat-calculator input[type="number"]');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            const value = parseInt(this.value) || 0;
            const max = parseInt(this.max);
            
            if (value > max) {
                this.value = max;
            }
            
            if (value < 0) {
                this.value = 0;
            }
        });
        
        // Add visual feedback
        input.addEventListener('focus', function() {
            this.style.borderColor = 'var(--primary-blue)';
        });
        
        input.addEventListener('blur', function() {
            this.style.borderColor = '#ddd';
        });
    });
    
    // Notification system
    function showNotification(message, type) {
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
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    // Add CSS transitions for smooth animations
    const style = document.createElement('style');
    style.textContent = `
        .calculator-results {
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}); 