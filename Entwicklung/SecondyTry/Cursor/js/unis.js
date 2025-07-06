// Universities page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // University data
    const universities = [
        {
            name: 'Harvard University',
            country: 'USA',
            satRange: '1400-1600',
            programs: ['Engineering', 'Business', 'Arts', 'Sciences'],
            location: 'Cambridge, MA'
        },
        {
            name: 'Stanford University',
            country: 'USA',
            satRange: '1400-1600',
            programs: ['Engineering', 'Business', 'Arts', 'Sciences'],
            location: 'Stanford, CA'
        },
        {
            name: 'MIT',
            country: 'USA',
            satRange: '1400-1600',
            programs: ['Engineering', 'Sciences'],
            location: 'Cambridge, MA'
        },
        {
            name: 'University of Toronto',
            country: 'Canada',
            satRange: '1200-1400',
            programs: ['Engineering', 'Business', 'Arts', 'Sciences'],
            location: 'Toronto, ON'
        },
        {
            name: 'University of British Columbia',
            country: 'Canada',
            satRange: '1200-1400',
            programs: ['Engineering', 'Business', 'Arts', 'Sciences'],
            location: 'Vancouver, BC'
        },
        {
            name: 'University of Oxford',
            country: 'UK',
            satRange: '1400-1600',
            programs: ['Arts', 'Sciences'],
            location: 'Oxford, England'
        },
        {
            name: 'University of Cambridge',
            country: 'UK',
            satRange: '1400-1600',
            programs: ['Arts', 'Sciences'],
            location: 'Cambridge, England'
        },
        {
            name: 'University of Melbourne',
            country: 'Australia',
            satRange: '1200-1400',
            programs: ['Engineering', 'Business', 'Arts', 'Sciences'],
            location: 'Melbourne, VIC'
        },
        {
            name: 'Yale University',
            country: 'USA',
            satRange: '1400-1600',
            programs: ['Arts', 'Sciences'],
            location: 'New Haven, CT'
        },
        {
            name: 'Princeton University',
            country: 'USA',
            satRange: '1400-1600',
            programs: ['Arts', 'Sciences'],
            location: 'Princeton, NJ'
        },
        {
            name: 'Columbia University',
            country: 'USA',
            satRange: '1400-1600',
            programs: ['Engineering', 'Business', 'Arts', 'Sciences'],
            location: 'New York, NY'
        },
        {
            name: 'University of California, Berkeley',
            country: 'USA',
            satRange: '1200-1400',
            programs: ['Engineering', 'Business', 'Arts', 'Sciences'],
            location: 'Berkeley, CA'
        }
    ];
    
    // Filter elements
    const searchInput = document.getElementById('search-input');
    const countryFilter = document.getElementById('country-filter');
    const scoreFilter = document.getElementById('score-filter');
    const studyFilter = document.getElementById('study-filter');
    const unisGrid = document.getElementById('unis-grid');
    
    // Initialize with all universities
    renderUniversities(universities);
    
    // Add event listeners for filters
    if (searchInput) {
        searchInput.addEventListener('input', filterUniversities);
    }
    
    if (countryFilter) {
        countryFilter.addEventListener('change', filterUniversities);
    }
    
    if (scoreFilter) {
        scoreFilter.addEventListener('change', filterUniversities);
    }
    
    if (studyFilter) {
        studyFilter.addEventListener('change', filterUniversities);
    }
    
    // Filter universities function
    function filterUniversities() {
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const selectedCountry = countryFilter ? countryFilter.value : '';
        const selectedScore = scoreFilter ? scoreFilter.value : '';
        const selectedStudy = studyFilter ? studyFilter.value : '';
        
        const filteredUnis = universities.filter(uni => {
            // Search filter
            const matchesSearch = !searchTerm || 
                uni.name.toLowerCase().includes(searchTerm) ||
                uni.location.toLowerCase().includes(searchTerm);
            
            // Country filter
            const matchesCountry = !selectedCountry || uni.country === selectedCountry;
            
            // Score filter
            const matchesScore = !selectedScore || uni.satRange === selectedScore;
            
            // Study area filter
            const matchesStudy = !selectedStudy || uni.programs.includes(selectedStudy);
            
            return matchesSearch && matchesCountry && matchesScore && matchesStudy;
        });
        
        renderUniversities(filteredUnis);
    }
    
    // Render universities function
    function renderUniversities(unisToRender) {
        if (!unisGrid) return;
        
        unisGrid.innerHTML = '';
        
        if (unisToRender.length === 0) {
            unisGrid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: #666;">
                    No universities found matching your criteria.
                </div>
            `;
            return;
        }
        
        unisToRender.forEach(uni => {
            const uniCard = document.createElement('div');
            uniCard.className = 'uni-card';
            uniCard.innerHTML = `
                <h3>${uni.name}</h3>
                <div class="uni-country">${uni.country}</div>
                <div class="uni-score">SAT Range: ${uni.satRange}</div>
                <div class="uni-programs">Programs: ${uni.programs.join(', ')}</div>
            `;
            
            // Add click event for potential detail view
            uniCard.addEventListener('click', function() {
                showUniversityDetails(uni);
            });
            
            unisGrid.appendChild(uniCard);
        });
    }
    
    // Show university details (modal or new page)
    function showUniversityDetails(uni) {
        // Create a simple modal
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        `;
        
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: white;
            padding: 2rem;
            border-radius: 1rem;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
        `;
        
        modalContent.innerHTML = `
            <h2 style="color: var(--primary-blue); margin-top: 0;">${uni.name}</h2>
            <p><strong>Location:</strong> ${uni.location}</p>
            <p><strong>Country:</strong> ${uni.country}</p>
            <p><strong>SAT Range:</strong> ${uni.satRange}</p>
            <p><strong>Programs:</strong></p>
            <ul>
                ${uni.programs.map(program => `<li>${program}</li>`).join('')}
            </ul>
            <button onclick="this.closest('.modal').remove()" style="
                background: var(--primary-blue);
                color: white;
                border: none;
                border-radius: 0.5rem;
                padding: 0.5rem 1rem;
                cursor: pointer;
                margin-top: 1rem;
            ">Close</button>
        `;
        
        modal.className = 'modal';
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
    
    // Add hover effects
    document.addEventListener('mouseover', function(e) {
        if (e.target.closest('.uni-card')) {
            e.target.closest('.uni-card').style.transform = 'translateY(-4px) scale(1.02)';
        }
    });
    
    document.addEventListener('mouseout', function(e) {
        if (e.target.closest('.uni-card')) {
            e.target.closest('.uni-card').style.transform = 'translateY(0) scale(1)';
        }
    });
}); 