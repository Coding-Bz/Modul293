// Filtering functionality for Features and Universities pages
// Handles dynamic filtering and search functionality

(function() {
    'use strict';

    let filterSystem = null;

    function initFilters() {
        // Determine which page we're on and initialize appropriate filters
        if (document.querySelector('.features__grid')) {
            initFeaturesFilters();
        }
        
        if (document.querySelector('.universities__grid')) {
            initUniversitiesFilters();
        }
    }

    function initFeaturesFilters() {
        filterSystem = {
            container: document.querySelector('.features__grid'),
            items: document.querySelectorAll('.feature'),
            filters: {
                subject: document.getElementById('subject-filter'),
                type: document.getElementById('type-filter'),
                level: document.getElementById('level-filter')
            }
        };

        if (!filterSystem.container) return;

        setupFilterEvents(filterSystem);
        createNoResultsElement(filterSystem.container, 'No features match your criteria.');
    }

    function initUniversitiesFilters() {
        filterSystem = {
            container: document.querySelector('.universities__grid'),
            items: document.querySelectorAll('.university'),
            filters: {
                region: document.getElementById('region-filter'),
                type: document.getElementById('type-filter'),
                score: document.getElementById('score-filter'),
                search: document.getElementById('search-filter')
            }
        };

        if (!filterSystem.container) return;

        setupFilterEvents(filterSystem);
        setupSearchFilter();
        createNoResultsElement(filterSystem.container, 'No universities match your criteria.');
        
        // Setup load more functionality for universities
        setupLoadMore();
    }

    function setupFilterEvents(system) {
        Object.values(system.filters).forEach(filter => {
            if (filter && filter.type !== 'text') {
                filter.addEventListener('change', debounceFilter);
            }
        });
    }

    function setupSearchFilter() {
        const searchInput = filterSystem.filters.search;
        if (searchInput) {
            searchInput.addEventListener('input', debounceFilter);
            
            // Clear search functionality
            const clearBtn = document.createElement('button');
            clearBtn.type = 'button';
            clearBtn.className = 'search-clear';
            clearBtn.innerHTML = '×';
            clearBtn.addEventListener('click', () => {
                searchInput.value = '';
                applyFilters();
            });
            
            searchInput.parentNode.style.position = 'relative';
            searchInput.parentNode.appendChild(clearBtn);
        }
    }

    const debounceFilter = window.SATPrep.debounce(applyFilters, 300);

    function applyFilters() {
        if (!filterSystem) return;

        const activeFilters = getActiveFilters();
        let visibleCount = 0;

        // Add filtering animation
        filterSystem.items.forEach(item => {
            item.classList.add('filtering');
        });

        setTimeout(() => {
            filterSystem.items.forEach(item => {
                const shouldShow = matchesFilters(item, activeFilters);
                
                item.classList.remove('filtering');
                
                if (shouldShow) {
                    item.classList.remove('hidden');
                    item.style.display = '';
                    visibleCount++;
                } else {
                    item.classList.add('hidden');
                    item.style.display = 'none';
                }
            });

            // Show/hide no results message
            toggleNoResults(visibleCount === 0);
            
            // Update URL with current filters
            updateURLWithFilters(activeFilters);
            
            // Save filter state
            saveFilterState(activeFilters);
            
        }, 150);
    }

    function getActiveFilters() {
        const filters = {};
        
        Object.entries(filterSystem.filters).forEach(([key, element]) => {
            if (element) {
                filters[key] = element.value.toLowerCase().trim();
            }
        });
        
        return filters;
    }

    function matchesFilters(item, filters) {
        // Subject/Region filter
        if (filters.subject && !matchesDataAttribute(item, 'data-subject', filters.subject)) {
            return false;
        }
        
        if (filters.region && !matchesDataAttribute(item, 'data-region', filters.region)) {
            return false;
        }

        // Type filter
        if (filters.type && !matchesDataAttribute(item, 'data-type', filters.type)) {
            return false;
        }

        // Level filter (features only)
        if (filters.level && !matchesDataAttribute(item, 'data-level', filters.level)) {
            return false;
        }

        // Score filter (universities only)
        if (filters.score && !matchesScoreFilter(item, filters.score)) {
            return false;
        }

        // Search filter
        if (filters.search && !matchesSearchFilter(item, filters.search)) {
            return false;
        }

        return true;
    }

    function matchesDataAttribute(item, attribute, value) {
        const itemValue = item.getAttribute(attribute);
        return itemValue && itemValue.toLowerCase() === value;
    }

    function matchesScoreFilter(item, scoreFilter) {
        const itemScore = parseInt(item.getAttribute('data-score'));
        const filterScore = parseInt(scoreFilter);
        
        return itemScore >= filterScore;
    }

    function matchesSearchFilter(item, searchTerm) {
        const searchableText = [
            item.querySelector('.feature__title, .university__name')?.textContent || '',
            item.querySelector('.feature__description, .university__description')?.textContent || '',
            item.querySelector('.feature__author')?.textContent || '',
            ...Array.from(item.querySelectorAll('.tag')).map(tag => tag.textContent)
        ].join(' ').toLowerCase();

        return searchableText.includes(searchTerm);
    }

    function createNoResultsElement(container, message) {
        const noResults = document.createElement('div');
        noResults.className = 'no-results hidden';
        noResults.innerHTML = `
            <div class="no-results__icon">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                </svg>
            </div>
            <h3 class="no-results__title">No Results Found</h3>
            <p class="no-results__text">${message}</p>
            <button class="btn btn--secondary" onclick="clearAllFilters()">Clear All Filters</button>
        `;
        
        container.appendChild(noResults);
    }

    function toggleNoResults(show) {
        const noResults = document.querySelector('.no-results');
        if (noResults) {
            if (show) {
                noResults.classList.remove('hidden');
            } else {
                noResults.classList.add('hidden');
            }
        }
    }

    function clearAllFilters() {
        Object.values(filterSystem.filters).forEach(filter => {
            if (filter) {
                filter.value = '';
            }
        });
        
        applyFilters();
        window.SATPrep.showToast('All filters cleared', 'info');
    }

    function updateURLWithFilters(filters) {
        const url = new URL(window.location);
        const params = new URLSearchParams();
        
        Object.entries(filters).forEach(([key, value]) => {
            if (value) {
                params.set(key, value);
            }
        });
        
        url.search = params.toString();
        window.history.replaceState({}, '', url);
    }

    function loadFiltersFromURL() {
        const params = new URLSearchParams(window.location.search);
        
        Object.entries(filterSystem.filters).forEach(([key, element]) => {
            if (element && params.has(key)) {
                element.value = params.get(key);
            }
        });
        
        applyFilters();
    }

    function saveFilterState(filters) {
        const page = window.location.pathname.split('/').pop() || 'index';
        window.SATPrep.saveToStorage(`filters_${page}`, filters);
    }

    function loadFilterState() {
        const page = window.location.pathname.split('/').pop() || 'index';
        const savedFilters = window.SATPrep.getFromStorage(`filters_${page}`, {});
        
        Object.entries(savedFilters).forEach(([key, value]) => {
            if (filterSystem.filters[key] && value) {
                filterSystem.filters[key].value = value;
            }
        });
        
        if (Object.values(savedFilters).some(v => v)) {
            applyFilters();
        }
    }

    // Load More functionality for universities
    function setupLoadMore() {
        const loadMoreBtn = document.getElementById('load-more');
        if (!loadMoreBtn) return;

        let hiddenUniversities = [];
        
        // Initially hide universities beyond the first 6
        const allUniversities = Array.from(document.querySelectorAll('.university'));
        if (allUniversities.length > 6) {
            hiddenUniversities = allUniversities.slice(6);
            hiddenUniversities.forEach(uni => {
                uni.style.display = 'none';
                uni.classList.add('initially-hidden');
            });
        } else {
            loadMoreBtn.style.display = 'none';
        }

        loadMoreBtn.addEventListener('click', function() {
            const itemsToShow = 3;
            const visibleHidden = hiddenUniversities.filter(uni => 
                !uni.classList.contains('hidden') // Not filtered out
            );
            
            for (let i = 0; i < Math.min(itemsToShow, visibleHidden.length); i++) {
                const uni = visibleHidden[i];
                uni.style.display = '';
                uni.classList.remove('initially-hidden');
                
                // Remove from hidden array
                const index = hiddenUniversities.indexOf(uni);
                if (index > -1) {
                    hiddenUniversities.splice(index, 1);
                }
            }
            
            // Hide button if no more items
            if (hiddenUniversities.length === 0) {
                loadMoreBtn.style.display = 'none';
                window.SATPrep.showToast('All universities loaded', 'info');
            }
            
            // Update button text
            if (hiddenUniversities.length > 0) {
                const remaining = hiddenUniversities.filter(uni => 
                    !uni.classList.contains('hidden')
                ).length;
                loadMoreBtn.innerHTML = `<i data-feather="plus"></i> Load More Universities (${remaining} remaining)`;
                if (typeof feather !== 'undefined') {
                    feather.replace();
                }
            }
        });
    }

    // Filter analytics
    function trackFilterUsage(filterType, filterValue) {
        // This could be connected to analytics service
        console.log(`Filter used: ${filterType} = ${filterValue}`);
    }

    // Export functions to global scope
    window.clearAllFilters = clearAllFilters;

    // Initialize on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initFilters();
            
            // Load filters from URL or storage after a short delay
            setTimeout(() => {
                if (window.location.search) {
                    loadFiltersFromURL();
                } else {
                    loadFilterState();
                }
            }, 100);
        });
    } else {
        initFilters();
        setTimeout(() => {
            if (window.location.search) {
                loadFiltersFromURL();
            } else {
                loadFilterState();
            }
        }, 100);
    }

})();
