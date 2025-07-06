document.addEventListener('DOMContentLoaded', () => {
    const universities = [
        { name: 'Harvard University', country: 'USA', score: 1460 },
        { name: 'Stanford University', country: 'USA', score: 1420 },
        { name: 'University of Oxford', country: 'UK', score: 1470 },
        { name: 'University of Toronto', country: 'Canada', score: 1300 },
        { name: 'MIT', country: 'USA', score: 1500 },
        { name: 'University of Cambridge', country: 'UK', score: 1460 },
        { name: 'McGill University', country: 'Canada', score: 1250 },
    ];

    const countryFilter = document.getElementById('country-filter');
    const scoreFilter = document.getElementById('score-filter');
    const scoreValue = document.getElementById('score-value');
    const uniList = document.querySelector('.uni-list');

    function renderUniversities() {
        const selectedCountry = countryFilter.value;
        const minScore = parseInt(scoreFilter.value, 10);

        uniList.innerHTML = '';

        const filteredUniversities = universities.filter(uni => {
            const countryMatch = selectedCountry === 'all' || uni.country === selectedCountry;
            const scoreMatch = uni.score >= minScore;
            return countryMatch && scoreMatch;
        });

        filteredUniversities.forEach(uni => {
            const uniItem = document.createElement('div');
            uniItem.className = 'uni-item';
            uniItem.innerHTML = `
                <h3>${uni.name}</h3>
                <span class="country">${uni.country}</span>
                <span class="score">SAT: ${uni.score}+</span>
            `;
            uniList.appendChild(uniItem);
        });
    }

    scoreFilter.addEventListener('input', () => {
        scoreValue.textContent = `Min SAT: ${scoreFilter.value}`;
        renderUniversities();
    });

    countryFilter.addEventListener('change', renderUniversities);

    // Initial render
    renderUniversities();
});
