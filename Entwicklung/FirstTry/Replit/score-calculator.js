// SAT Score Calculator
// Calculates estimated SAT scores based on correct answers

(function() {
    'use strict';

    // Score conversion tables (approximate)
    const MATH_CONVERSION = {
        58: 800, 57: 790, 56: 780, 55: 760, 54: 750, 53: 740, 52: 730, 51: 710,
        50: 700, 49: 690, 48: 680, 47: 670, 46: 660, 45: 650, 44: 640, 43: 630,
        42: 620, 41: 610, 40: 600, 39: 590, 38: 580, 37: 570, 36: 560, 35: 550,
        34: 540, 33: 530, 32: 520, 31: 510, 30: 500, 29: 490, 28: 480, 27: 470,
        26: 460, 25: 450, 24: 440, 23: 430, 22: 420, 21: 410, 20: 400, 19: 390,
        18: 380, 17: 370, 16: 360, 15: 350, 14: 340, 13: 330, 12: 320, 11: 310,
        10: 300, 9: 290, 8: 280, 7: 270, 6: 260, 5: 250, 4: 240, 3: 230,
        2: 220, 1: 210, 0: 200
    };

    // Reading & Writing combined score (out of 96 total questions: 52 reading + 44 writing)
    const VERBAL_CONVERSION = {
        96: 800, 95: 790, 94: 780, 93: 770, 92: 760, 91: 750, 90: 740, 89: 730,
        88: 720, 87: 710, 86: 700, 85: 690, 84: 680, 83: 670, 82: 660, 81: 650,
        80: 640, 79: 630, 78: 620, 77: 610, 76: 600, 75: 590, 74: 580, 73: 570,
        72: 560, 71: 550, 70: 540, 69: 530, 68: 520, 67: 510, 66: 500, 65: 490,
        64: 480, 63: 470, 62: 460, 61: 450, 60: 440, 59: 430, 58: 420, 57: 410,
        56: 400, 55: 390, 54: 380, 53: 370, 52: 360, 51: 350, 50: 340, 49: 330,
        48: 320, 47: 310, 46: 300, 45: 290, 44: 280, 43: 270, 42: 260, 41: 250,
        40: 240, 39: 230, 38: 220, 37: 210, 36: 200, 35: 200, 34: 200, 33: 200,
        32: 200, 31: 200, 30: 200, 29: 200, 28: 200, 27: 200, 26: 200, 25: 200,
        24: 200, 23: 200, 22: 200, 21: 200, 20: 200, 19: 200, 18: 200, 17: 200,
        16: 200, 15: 200, 14: 200, 13: 200, 12: 200, 11: 200, 10: 200, 9: 200,
        8: 200, 7: 200, 6: 200, 5: 200, 4: 200, 3: 200, 2: 200, 1: 200, 0: 200
    };

    let calculator = null;

    function initScoreCalculator() {
        calculator = {
            form: document.getElementById('score-form'),
            result: document.getElementById('score-result'),
            totalScore: document.getElementById('total-score'),
            mathScore: document.getElementById('math-score'),
            verbalScore: document.getElementById('verbal-score'),
            mathInput: document.getElementById('math-correct'),
            readingInput: document.getElementById('reading-correct'),
            writingInput: document.getElementById('writing-correct')
        };

        if (!calculator.form) return;

        setupCalculatorEvents();
        setupInputValidation();
    }

    function setupCalculatorEvents() {
        calculator.form.addEventListener('submit', function(e) {
            e.preventDefault();
            calculateScore();
        });

        // Real-time calculation as user types
        [calculator.mathInput, calculator.readingInput, calculator.writingInput].forEach(input => {
            if (input) {
                input.addEventListener('input', debounceCalculation);
                input.addEventListener('change', calculateScore);
            }
        });
    }

    function setupInputValidation() {
        // Math input validation (0-58)
        if (calculator.mathInput) {
            calculator.mathInput.addEventListener('input', function() {
                validateNumberInput(this, 0, 58);
            });
        }

        // Reading input validation (0-52)
        if (calculator.readingInput) {
            calculator.readingInput.addEventListener('input', function() {
                validateNumberInput(this, 0, 52);
            });
        }

        // Writing input validation (0-44)
        if (calculator.writingInput) {
            calculator.writingInput.addEventListener('input', function() {
                validateNumberInput(this, 0, 44);
            });
        }
    }

    function validateNumberInput(input, min, max) {
        const value = parseInt(input.value);
        
        if (input.value === '') return;
        
        if (isNaN(value) || value < min || value > max) {
            input.setCustomValidity(`Please enter a number between ${min} and ${max}`);
            input.reportValidity();
        } else {
            input.setCustomValidity('');
        }
    }

    const debounceCalculation = window.SATPrep.debounce(calculateScore, 500);

    function calculateScore() {
        if (!calculator.form.checkValidity()) {
            return;
        }

        const mathCorrect = parseInt(calculator.mathInput.value) || 0;
        const readingCorrect = parseInt(calculator.readingInput.value) || 0;
        const writingCorrect = parseInt(calculator.writingInput.value) || 0;

        // Calculate section scores
        const mathSectionScore = convertMathScore(mathCorrect);
        const verbalCorrect = readingCorrect + writingCorrect;
        const verbalSectionScore = convertVerbalScore(verbalCorrect);
        const totalSATScore = mathSectionScore + verbalSectionScore;

        // Update display with animation
        updateScoreDisplay(totalSATScore, mathSectionScore, verbalSectionScore);
        
        // Show insights
        showScoreInsights(totalSATScore, mathSectionScore, verbalSectionScore);
        
        // Save calculation to localStorage
        saveCalculation({
            mathCorrect,
            readingCorrect,
            writingCorrect,
            totalScore: totalSATScore,
            mathScore: mathSectionScore,
            verbalScore: verbalSectionScore,
            date: new Date().toISOString()
        });
    }

    function convertMathScore(correct) {
        return MATH_CONVERSION[correct] || 200;
    }

    function convertVerbalScore(correct) {
        return VERBAL_CONVERSION[correct] || 200;
    }

    function updateScoreDisplay(total, math, verbal) {
        // Animate numbers counting up
        animateNumber(calculator.totalScore, total, 1000);
        animateNumber(calculator.mathScore, math, 800);
        animateNumber(calculator.verbalScore, verbal, 800);

        // Add visual feedback based on score ranges
        updateScoreColors(total);
    }

    function animateNumber(element, targetValue, duration) {
        if (!element) return;

        const startValue = parseInt(element.textContent.replace(/\D/g, '')) || 0;
        const increment = (targetValue - startValue) / (duration / 16);
        let currentValue = startValue;

        const timer = setInterval(() => {
            currentValue += increment;
            
            if ((increment > 0 && currentValue >= targetValue) || 
                (increment < 0 && currentValue <= targetValue)) {
                currentValue = targetValue;
                clearInterval(timer);
            }
            
            element.textContent = Math.round(currentValue);
        }, 16);
    }

    function updateScoreColors(totalScore) {
        const resultElement = calculator.result;
        if (!resultElement) return;

        // Remove existing score classes
        resultElement.classList.remove('score-low', 'score-medium', 'score-high', 'score-excellent');

        // Add appropriate class based on score
        if (totalScore >= 1400) {
            resultElement.classList.add('score-excellent');
        } else if (totalScore >= 1200) {
            resultElement.classList.add('score-high');
        } else if (totalScore >= 1000) {
            resultElement.classList.add('score-medium');
        } else {
            resultElement.classList.add('score-low');
        }
    }

    function showScoreInsights(total, math, verbal) {
        let insights = [];
        
        // Total score insights
        if (total >= 1500) {
            insights.push("Excellent! This score qualifies you for top-tier universities.");
        } else if (total >= 1400) {
            insights.push("Great score! You're competitive for most selective colleges.");
        } else if (total >= 1200) {
            insights.push("Good score! This opens doors to many quality universities.");
        } else if (total >= 1000) {
            insights.push("Average score. Consider additional preparation to improve your options.");
        } else {
            insights.push("Below average. Focused preparation could significantly improve your score.");
        }

        // Section-specific insights
        const scoreDifference = Math.abs(math - verbal);
        if (scoreDifference >= 100) {
            if (math > verbal) {
                insights.push("Your math score is significantly higher. Consider focusing on reading and writing practice.");
            } else {
                insights.push("Your verbal score is significantly higher. Consider focusing on math practice.");
            }
        }

        // Show insights to user
        displayInsights(insights);
    }

    function displayInsights(insights) {
        let insightsContainer = document.querySelector('.score-insights');
        
        if (!insightsContainer) {
            insightsContainer = document.createElement('div');
            insightsContainer.className = 'score-insights';
            calculator.result.appendChild(insightsContainer);
        }

        insightsContainer.innerHTML = `
            <h4>Score Insights</h4>
            <ul>
                ${insights.map(insight => `<li>${insight}</li>`).join('')}
            </ul>
        `;
    }

    function saveCalculation(data) {
        const savedCalculations = window.SATPrep.getFromStorage('sat-calculations', []);
        savedCalculations.push(data);
        
        // Keep only last 10 calculations
        if (savedCalculations.length > 10) {
            savedCalculations.splice(0, savedCalculations.length - 10);
        }
        
        window.SATPrep.saveToStorage('sat-calculations', savedCalculations);
    }

    function loadPreviousCalculation() {
        const savedCalculations = window.SATPrep.getFromStorage('sat-calculations', []);
        if (savedCalculations.length > 0) {
            const lastCalculation = savedCalculations[savedCalculations.length - 1];
            
            if (calculator.mathInput) calculator.mathInput.value = lastCalculation.mathCorrect || '';
            if (calculator.readingInput) calculator.readingInput.value = lastCalculation.readingCorrect || '';
            if (calculator.writingInput) calculator.writingInput.value = lastCalculation.writingCorrect || '';
            
            // Recalculate
            if (lastCalculation.mathCorrect || lastCalculation.readingCorrect || lastCalculation.writingCorrect) {
                calculateScore();
            }
        }
    }

    // Add CSS for score insights and animations
    function addCalculatorStyles() {
        const styles = document.createElement('style');
        styles.textContent = `
            .score-insights {
                margin-top: 1.5rem;
                padding: 1rem;
                background: var(--color-surface);
                border-radius: var(--radius-lg);
                border-left: 4px solid var(--color-primary);
            }
            
            .score-insights h4 {
                margin-bottom: 0.75rem;
                color: var(--color-text);
                font-size: var(--font-size-base);
            }
            
            .score-insights ul {
                list-style: none;
                margin: 0;
                padding: 0;
            }
            
            .score-insights li {
                margin-bottom: 0.5rem;
                padding-left: 1.25rem;
                position: relative;
                color: var(--color-text-light);
                font-size: var(--font-size-sm);
                line-height: 1.5;
            }
            
            .score-insights li::before {
                content: '💡';
                position: absolute;
                left: 0;
                top: 0;
            }
            
            .calculator__result.score-excellent .result__total {
                background: linear-gradient(135deg, #10b981, #22c55e);
            }
            
            .calculator__result.score-high .result__total {
                background: linear-gradient(135deg, #3b82f6, #6366f1);
            }
            
            .calculator__result.score-medium .result__total {
                background: linear-gradient(135deg, #f59e0b, #f97316);
            }
            
            .calculator__result.score-low .result__total {
                background: linear-gradient(135deg, #ef4444, #f87171);
            }
            
            .result__score, .breakdown__score {
                transition: all 0.3s ease;
            }
        `;
        document.head.appendChild(styles);
    }

    // Initialize when page loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initScoreCalculator();
            addCalculatorStyles();
            loadPreviousCalculation();
        });
    } else {
        initScoreCalculator();
        addCalculatorStyles();
        loadPreviousCalculation();
    }

})();
