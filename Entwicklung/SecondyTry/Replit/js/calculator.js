// SAT Score Calculator JavaScript

class SATCalculator {
  constructor() {
    this.form = document.getElementById('calculatorForm');
    this.resultsPanel = document.querySelector('.results-content');
    this.resultsPlaceholder = document.querySelector('.results-placeholder');
    this.calculateButton = document.querySelector('.calc-button');
    
    this.scoreData = {
      math: {
        correct: 0,
        total: 58
      },
      reading: {
        correct: 0,
        total: 52
      },
      writing: {
        correct: 0,
        total: 44
      }
    };
    
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupFormValidation();
  }

  setupEventListeners() {
    if (this.form) {
      this.form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.calculateScore();
      });
    }

    // Real-time calculation as user types
    this.form.querySelectorAll('.calc-input').forEach(input => {
      input.addEventListener('input', this.debounce(() => {
        if (this.validateInputs()) {
          this.calculateScore();
        }
      }, 500));
    });

    // Save/Share buttons
    document.addEventListener('click', (e) => {
      if (e.target.matches('.save-results')) {
        this.saveResults();
      } else if (e.target.matches('.share-results')) {
        this.shareResults();
      } else if (e.target.matches('.reset-calculator')) {
        this.resetCalculator();
      }
    });
  }

  setupFormValidation() {
    this.form.querySelectorAll('.calc-input').forEach(input => {
      input.addEventListener('blur', () => {
        this.validateInput(input);
      });
      
      input.addEventListener('input', () => {
        this.clearInputError(input);
      });
    });
  }

  validateInput(input) {
    const value = parseInt(input.value);
    const max = parseInt(input.getAttribute('max'));
    const min = parseInt(input.getAttribute('min')) || 0;
    
    let isValid = true;
    let errorMessage = '';

    if (isNaN(value)) {
      isValid = false;
      errorMessage = 'Please enter a valid number';
    } else if (value < min) {
      isValid = false;
      errorMessage = `Minimum value is ${min}`;
    } else if (value > max) {
      isValid = false;
      errorMessage = `Maximum value is ${max}`;
    }

    if (!isValid) {
      this.showInputError(input, errorMessage);
    } else {
      this.clearInputError(input);
    }

    return isValid;
  }

  validateInputs() {
    const inputs = this.form.querySelectorAll('.calc-input');
    let allValid = true;

    inputs.forEach(input => {
      if (!this.validateInput(input)) {
        allValid = false;
      }
    });

    return allValid;
  }

  showInputError(input, message) {
    input.classList.add('error');
    
    let errorElement = input.parentNode.querySelector('.input-error');
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.className = 'input-error';
      input.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
  }

  clearInputError(input) {
    input.classList.remove('error');
    
    const errorElement = input.parentNode.querySelector('.input-error');
    if (errorElement) {
      errorElement.remove();
    }
  }

  calculateScore() {
    if (!this.validateInputs()) {
      return;
    }

    this.calculateButton.classList.add('loading');
    
    // Simulate API call delay
    setTimeout(() => {
      this.performCalculation();
      this.displayResults();
      this.calculateButton.classList.remove('loading');
    }, 1000);
  }

  performCalculation() {
    // Get form values
    const mathCorrect = parseInt(document.getElementById('mathCorrect').value) || 0;
    const readingCorrect = parseInt(document.getElementById('readingCorrect').value) || 0;
    const writingCorrect = parseInt(document.getElementById('writingCorrect').value) || 0;

    // Store data
    this.scoreData.math.correct = mathCorrect;
    this.scoreData.reading.correct = readingCorrect;
    this.scoreData.writing.correct = writingCorrect;

    // Calculate section scores using official SAT scoring tables
    const mathScore = this.calculateMathScore(mathCorrect);
    const readingScore = this.calculateReadingScore(readingCorrect);
    const writingScore = this.calculateWritingScore(writingCorrect);
    
    // Calculate total scores
    const verbScore = readingScore + writingScore;
    const totalScore = mathScore + verbScore;
    
    // Calculate percentiles
    const percentile = this.calculatePercentile(totalScore);
    
    // Store results
    this.results = {
      math: mathScore,
      reading: readingScore,
      writing: writingScore,
      verbal: verbScore,
      total: totalScore,
      percentile: percentile,
      breakdown: {
        mathCorrect,
        readingCorrect,
        writingCorrect,
        mathTotal: this.scoreData.math.total,
        readingTotal: this.scoreData.reading.total,
        writingTotal: this.scoreData.writing.total
      }
    };
  }

  calculateMathScore(correct) {
    // Simplified SAT Math scoring table (200-800 scale)
    const scoreTable = [
      200, 210, 220, 230, 240, 250, 260, 270, 280, 290, // 0-9
      300, 310, 320, 330, 340, 350, 360, 370, 380, 390, // 10-19
      400, 410, 420, 430, 440, 450, 460, 470, 480, 490, // 20-29
      500, 510, 520, 530, 540, 550, 560, 570, 580, 590, // 30-39
      600, 610, 620, 630, 640, 650, 660, 670, 680, 690, // 40-49
      700, 710, 720, 730, 740, 750, 760, 770, 780, 800  // 50-58
    ];
    
    return scoreTable[Math.min(correct, 58)] || 200;
  }

  calculateReadingScore(correct) {
    // Simplified SAT Reading scoring (converts to 200-400 scale)
    const scoreTable = [
      100, 105, 110, 115, 120, 125, 130, 135, 140, 145, // 0-9
      150, 155, 160, 165, 170, 175, 180, 185, 190, 195, // 10-19
      200, 205, 210, 215, 220, 225, 230, 235, 240, 245, // 20-29
      250, 255, 260, 265, 270, 275, 280, 285, 290, 295, // 30-39
      300, 305, 310, 315, 320, 325, 330, 335, 340, 345, // 40-49
      350, 355, 360, 365, 370, 375, 380, 385, 390, 395, 400 // 50-52
    ];
    
    return scoreTable[Math.min(correct, 52)] || 100;
  }

  calculateWritingScore(correct) {
    // Simplified SAT Writing scoring (converts to 200-400 scale)
    const scoreTable = [
      100, 105, 110, 115, 120, 125, 130, 135, 140, 145, // 0-9
      150, 155, 160, 165, 170, 175, 180, 185, 190, 195, // 10-19
      200, 205, 210, 215, 220, 225, 230, 235, 240, 245, // 20-29
      250, 255, 260, 265, 270, 275, 280, 285, 290, 295, // 30-39
      300, 305, 310, 315, 320, 325, 330, 335, 340, 345, 350 // 40-44
    ];
    
    return scoreTable[Math.min(correct, 44)] || 100;
  }

  calculatePercentile(totalScore) {
    // Simplified percentile calculation based on SAT score distributions
    if (totalScore >= 1570) return 99;
    if (totalScore >= 1520) return 98;
    if (totalScore >= 1480) return 95;
    if (totalScore >= 1440) return 90;
    if (totalScore >= 1400) return 85;
    if (totalScore >= 1350) return 75;
    if (totalScore >= 1300) return 65;
    if (totalScore >= 1250) return 55;
    if (totalScore >= 1200) return 45;
    if (totalScore >= 1150) return 35;
    if (totalScore >= 1100) return 25;
    if (totalScore >= 1050) return 15;
    if (totalScore >= 1000) return 10;
    return 5;
  }

  displayResults() {
    if (!this.results) return;

    // Hide placeholder and show results
    this.resultsPlaceholder.style.display = 'none';
    this.resultsPanel.style.display = 'block';
    this.resultsPanel.classList.add('active');

    // Update score display
    this.updateScoreDisplay();
    this.updateSectionScores();
    this.updateScoreBreakdown();
    this.updatePercentileInfo();
    this.updateImprovementSuggestions();
    this.updateResultsActions();
  }

  updateScoreDisplay() {
    const totalScoreEl = document.querySelector('.total-score');
    const scoreRangeEl = document.querySelector('.score-range');
    
    if (totalScoreEl) {
      totalScoreEl.textContent = this.results.total;
      this.animateNumber(totalScoreEl, 0, this.results.total, 1000);
    }
    
    if (scoreRangeEl) {
      scoreRangeEl.textContent = `Range: 400-1600`;
    }
  }

  updateSectionScores() {
    const mathScoreEl = document.querySelector('.math-score .section-score-value');
    const verbScoreEl = document.querySelector('.verbal-score .section-score-value');
    
    if (mathScoreEl) {
      mathScoreEl.textContent = this.results.math;
      this.animateNumber(mathScoreEl, 0, this.results.math, 800);
    }
    
    if (verbScoreEl) {
      verbScoreEl.textContent = this.results.verbal;
      this.animateNumber(verbScoreEl, 0, this.results.verbal, 800);
    }
  }

  updateScoreBreakdown() {
    const breakdownContainer = document.querySelector('.score-breakdown');
    if (!breakdownContainer) return;

    const breakdown = this.results.breakdown;
    
    breakdownContainer.innerHTML = `
      <h3>Detailed Breakdown</h3>
      <div class="breakdown-item">
        <span class="breakdown-label">Math Questions Correct</span>
        <span class="breakdown-score">${breakdown.mathCorrect}/${breakdown.mathTotal}</span>
      </div>
      <div class="breakdown-item">
        <span class="breakdown-label">Reading Questions Correct</span>
        <span class="breakdown-score">${breakdown.readingCorrect}/${breakdown.readingTotal}</span>
      </div>
      <div class="breakdown-item">
        <span class="breakdown-label">Writing Questions Correct</span>
        <span class="breakdown-score">${breakdown.writingCorrect}/${breakdown.writingTotal}</span>
      </div>
      <div class="breakdown-item">
        <span class="breakdown-label">Math Section Score</span>
        <span class="breakdown-score">${this.results.math}/800</span>
      </div>
      <div class="breakdown-item">
        <span class="breakdown-label">Reading Section Score</span>
        <span class="breakdown-score">${this.results.reading}/400</span>
      </div>
      <div class="breakdown-item">
        <span class="breakdown-label">Writing Section Score</span>
        <span class="breakdown-score">${this.results.writing}/400</span>
      </div>
    `;
  }

  updatePercentileInfo() {
    const percentileValueEl = document.querySelector('.percentile-value');
    const percentileDescEl = document.querySelector('.percentile-description');
    
    if (percentileValueEl) {
      percentileValueEl.textContent = `${this.results.percentile}th percentile`;
    }
    
    if (percentileDescEl) {
      percentileDescEl.textContent = `You scored higher than ${this.results.percentile}% of test takers.`;
    }
  }

  updateImprovementSuggestions() {
    const suggestionsContainer = document.querySelector('.improvement-suggestions');
    if (!suggestionsContainer) return;

    const suggestions = this.generateSuggestions();
    
    suggestionsContainer.innerHTML = `
      <h3>Improvement Suggestions</h3>
      ${suggestions.map(suggestion => `
        <div class="suggestion-item">
          <div class="suggestion-icon">${suggestion.icon}</div>
          <div class="suggestion-content">
            <h4>${suggestion.title}</h4>
            <p>${suggestion.description}</p>
          </div>
        </div>
      `).join('')}
    `;
  }

  generateSuggestions() {
    const suggestions = [];
    const breakdown = this.results.breakdown;
    
    // Math suggestions
    const mathPercentage = (breakdown.mathCorrect / breakdown.mathTotal) * 100;
    if (mathPercentage < 70) {
      suggestions.push({
        icon: '📊',
        title: 'Focus on Math Fundamentals',
        description: 'Practice algebra, geometry, and data analysis. Consider using our adaptive practice tests to target weak areas.'
      });
    }
    
    // Reading suggestions
    const readingPercentage = (breakdown.readingCorrect / breakdown.readingTotal) * 100;
    if (readingPercentage < 70) {
      suggestions.push({
        icon: '📚',
        title: 'Improve Reading Comprehension',
        description: 'Practice active reading strategies and work on identifying main ideas and supporting details in passages.'
      });
    }
    
    // Writing suggestions
    const writingPercentage = (breakdown.writingCorrect / breakdown.writingTotal) * 100;
    if (writingPercentage < 70) {
      suggestions.push({
        icon: '✍️',
        title: 'Strengthen Writing Skills',
        description: 'Review grammar rules, sentence structure, and practice identifying and correcting common writing errors.'
      });
    }
    
    // Overall suggestions
    if (this.results.total < 1200) {
      suggestions.push({
        icon: '⏰',
        title: 'Create a Study Schedule',
        description: 'Develop a consistent study routine with at least 1-2 hours of daily practice across all sections.'
      });
    }
    
    if (suggestions.length === 0) {
      suggestions.push({
        icon: '🎯',
        title: 'Maintain Your Performance',
        description: 'Great job! Continue practicing to maintain your strong performance and aim for even higher scores.'
      });
    }
    
    return suggestions;
  }

  updateResultsActions() {
    const actionsContainer = document.querySelector('.results-actions');
    if (!actionsContainer) return;

    actionsContainer.innerHTML = `
      <a href="features.html" class="action-button primary">View Study Features</a>
      <a href="unis.html" class="action-button">Find Universities</a>
      <button class="action-button save-results">Save Results</button>
      <button class="action-button share-results">Share Results</button>
      <button class="action-button reset-calculator">Calculate Again</button>
    `;
  }

  animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const current = Math.floor(start + (end - start) * progress);
      element.textContent = current;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }

  saveResults() {
    if (!this.results) return;

    const resultsData = {
      timestamp: new Date().toISOString(),
      scores: this.results
    };
    
    localStorage.setItem('satCalculatorResults', JSON.stringify(resultsData));
    
    window.satApp.showMessage('Results saved successfully!', 'success');
  }

  shareResults() {
    if (!this.results) return;

    const shareText = `I scored ${this.results.total} on the SAT calculator! (${this.results.percentile}th percentile)`;
    
    if (navigator.share) {
      navigator.share({
        title: 'My SAT Score Calculation',
        text: shareText,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareText).then(() => {
        window.satApp.showMessage('Results copied to clipboard!', 'success');
      });
    }
  }

  resetCalculator() {
    this.form.reset();
    this.resultsPanel.style.display = 'none';
    this.resultsPanel.classList.remove('active');
    this.resultsPlaceholder.style.display = 'block';
    
    // Clear any error messages
    this.form.querySelectorAll('.input-error').forEach(error => error.remove());
    this.form.querySelectorAll('.calc-input').forEach(input => input.classList.remove('error'));
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.satCalculator = new SATCalculator();
});

