document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('sat-calculator-form');
    const resultsContainer = document.getElementById('results-container');
    const totalScoreEl = document.getElementById('total-score');
    const rwScoreEl = document.getElementById('rw-score');
    const mathScoreEl = document.getElementById('math-score');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const rwCorrectInput = document.getElementById('rw-correct');
        const mathCorrectInput = document.getElementById('math-correct');

        const rwCorrect = parseInt(rwCorrectInput.value) || 0;
        const mathCorrect = parseInt(mathCorrectInput.value) || 0;

        // Clamp values to the allowed range
        const clampedRwCorrect = Math.max(0, Math.min(rwCorrect, 54));
        const clampedMathCorrect = Math.max(0, Math.min(mathCorrect, 44));

        // Update input fields with clamped values
        rwCorrectInput.value = clampedRwCorrect;
        mathCorrectInput.value = clampedMathCorrect;

        // Basic scaling - this is a simplified model and not official
        const rwScore = Math.round((200 + (clampedRwCorrect / 54) * 600) / 10) * 10;
        const mathScore = Math.round((200 + (clampedMathCorrect / 44) * 600) / 10) * 10;
        const totalScore = rwScore + mathScore;
        
        totalScoreEl.textContent = totalScore;
        rwScoreEl.textContent = rwScore;
        mathScoreEl.textContent = mathScore;

        resultsContainer.classList.remove('results-hidden');
    });
});
