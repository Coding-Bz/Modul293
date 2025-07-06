// Universities Directory JavaScript

class UniversityDirectory {
  constructor() {
    this.universities = [];
    this.filteredUniversities = [];
    this.currentPage = 1;
    this.itemsPerPage = 12;
    this.currentView = 'grid';
    this.filters = {
      search: '',
      state: '',
      scoreRange: '',
      type: ''
    };
    
    this.init();
  }

  init() {
    this.loadUniversities();
    this.setupEventListeners();
    this.setupViewToggle();
  }

  setupEventListeners() {
    // Search input
    const searchInput = document.getElementById('universitySearch');
    if (searchInput) {
      searchInput.addEventListener('input', this.debounce((e) => {
        this.filters.search = e.target.value;
        this.applyFilters();
      }, 300));
    }

    // Filter selects
    const stateFilter = document.getElementById('stateFilter');
    const scoreFilter = document.getElementById('scoreFilter');
    const typeFilter = document.getElementById('typeFilter');

    if (stateFilter) {
      stateFilter.addEventListener('change', (e) => {
        this.filters.state = e.target.value;
        this.applyFilters();
      });
    }

    if (scoreFilter) {
      scoreFilter.addEventListener('change', (e) => {
        this.filters.scoreRange = e.target.value;
        this.applyFilters();
      });
    }

    if (typeFilter) {
      typeFilter.addEventListener('change', (e) => {
        this.filters.type = e.target.value;
        this.applyFilters();
      });
    }

    // Clear filters
    const clearFilters = document.getElementById('clearFilters');
    if (clearFilters) {
      clearFilters.addEventListener('click', () => {
        this.clearAllFilters();
      });
    }

    // Favorites
    document.addEventListener('click', (e) => {
      if (e.target.matches('.uni-favorite') || e.target.closest('.uni-favorite')) {
        this.toggleFavorite(e.target.closest('.uni-favorite'));
      }
    });
  }

  setupViewToggle() {
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const view = e.target.getAttribute('data-view');
        this.switchView(view);
        
        // Update active state
        viewButtons.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
      });
    });
  }

  async loadUniversities() {
    try {
      this.showLoading();
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Sample university data (in a real app, this would come from an API)
      this.universities = this.generateUniversityData();
      this.filteredUniversities = [...this.universities];
      
      this.hideLoading();
      this.renderUniversities();
      this.updateResultCount();
      this.renderPagination();
      
    } catch (error) {
      console.error('Error loading universities:', error);
      this.showError('Failed to load universities. Please try again.');
    }
  }

  generateUniversityData() {
    // This would typically come from an API
    return [
      {
        id: 1,
        name: "Harvard University",
        location: "Cambridge, MA",
        state: "MA",
        type: "private",
        logo: "HU",
        description: "Prestigious Ivy League institution known for excellence in academics, research, and producing world leaders.",
        satRange: "1460-1580",
        acceptanceRate: 3.4,
        tuition: 54269,
        enrollment: 22000,
        tags: ["Ivy League", "Research", "Highly Competitive"],
        avgSAT: 1520,
        difficulty: "high",
        programs: ["Business", "Medicine", "Law", "Engineering"]
      },
      {
        id: 2,
        name: "Stanford University",
        location: "Stanford, CA",
        state: "CA",
        type: "private",
        logo: "SU",
        description: "Leading research university in Silicon Valley, known for innovation, entrepreneurship, and technological advancement.",
        satRange: "1440-1570",
        acceptanceRate: 4.3,
        tuition: 56169,
        enrollment: 17000,
        tags: ["Research", "Tech Hub", "Highly Competitive"],
        avgSAT: 1505,
        difficulty: "high",
        programs: ["Computer Science", "Engineering", "Business", "Medicine"]
      },
      {
        id: 3,
        name: "Massachusetts Institute of Technology",
        location: "Cambridge, MA",
        state: "MA",
        type: "private",
        logo: "MIT",
        description: "World-renowned institution for science, technology, engineering, and mathematics education and research.",
        satRange: "1510-1580",
        acceptanceRate: 6.7,
        tuition: 53790,
        enrollment: 11000,
        tags: ["STEM", "Research", "Innovation"],
        avgSAT: 1545,
        difficulty: "high",
        programs: ["Engineering", "Computer Science", "Physics", "Mathematics"]
      },
      {
        id: 4,
        name: "University of California, Berkeley",
        location: "Berkeley, CA",
        state: "CA",
        type: "public",
        logo: "UCB",
        description: "Top public research university known for academic excellence, innovation, and social activism.",
        satRange: "1330-1530",
        acceptanceRate: 14.5,
        tuition: 14254,
        enrollment: 45000,
        tags: ["Public Ivy", "Research", "Diverse"],
        avgSAT: 1430,
        difficulty: "high",
        programs: ["Engineering", "Business", "Liberal Arts", "Sciences"]
      },
      {
        id: 5,
        name: "Yale University",
        location: "New Haven, CT",
        state: "CT",
        type: "private",
        logo: "YU",
        description: "Historic Ivy League university with strong liberal arts programs and beautiful Gothic architecture.",
        satRange: "1460-1580",
        acceptanceRate: 4.6,
        tuition: 59950,
        enrollment: 13000,
        tags: ["Ivy League", "Liberal Arts", "Historic"],
        avgSAT: 1520,
        difficulty: "high",
        programs: ["Liberal Arts", "Law", "Medicine", "Drama"]
      },
      {
        id: 6,
        name: "University of Michigan",
        location: "Ann Arbor, MI",
        state: "MI",
        type: "public",
        logo: "UM",
        description: "Leading public research university with excellent programs across multiple disciplines.",
        satRange: "1340-1520",
        acceptanceRate: 20.2,
        tuition: 15948,
        enrollment: 47000,
        tags: ["Public Research", "Big Ten", "School Spirit"],
        avgSAT: 1430,
        difficulty: "medium",
        programs: ["Engineering", "Business", "Medicine", "Liberal Arts"]
      },
      {
        id: 7,
        name: "Princeton University",
        location: "Princeton, NJ",
        state: "NJ",
        type: "private",
        logo: "PU",
        description: "Elite Ivy League institution known for undergraduate focus and beautiful campus.",
        satRange: "1470-1580",
        acceptanceRate: 4.0,
        tuition: 56010,
        enrollment: 5400,
        tags: ["Ivy League", "Undergraduate Focus", "Small Class Size"],
        avgSAT: 1525,
        difficulty: "high",
        programs: ["Economics", "Computer Science", "Public Policy", "Engineering"]
      },
      {
        id: 8,
        name: "Columbia University",
        location: "New York, NY",
        state: "NY",
        type: "private",
        logo: "CU",
        description: "Prestigious Ivy League university in Manhattan, known for journalism, business, and medicine.",
        satRange: "1450-1570",
        acceptanceRate: 5.1,
        tuition: 61850,
        enrollment: 31000,
        tags: ["Ivy League", "Urban", "Media"],
        avgSAT: 1510,
        difficulty: "high",
        programs: ["Journalism", "Business", "Medicine", "International Affairs"]
      },
      {
        id: 9,
        name: "University of Chicago",
        location: "Chicago, IL",
        state: "IL",
        type: "private",
        logo: "UC",
        description: "Rigorous academic environment known for economics, law, and intellectual discourse.",
        satRange: "1500-1580",
        acceptanceRate: 6.2,
        tuition: 59298,
        enrollment: 17000,
        tags: ["Academic Rigor", "Economics", "Research"],
        avgSAT: 1540,
        difficulty: "high",
        programs: ["Economics", "Business", "Law", "Medicine"]
      },
      {
        id: 10,
        name: "Duke University",
        location: "Durham, NC",
        state: "NC",
        type: "private",
        logo: "DU",
        description: "Top research university known for academics, athletics, and beautiful campus.",
        satRange: "1450-1570",
        acceptanceRate: 7.7,
        tuition: 58031,
        enrollment: 16000,
        tags: ["Research", "Athletics", "Southern Ivy"],
        avgSAT: 1510,
        difficulty: "high",
        programs: ["Medicine", "Business", "Engineering", "Public Policy"]
      },
      {
        id: 11,
        name: "University of Pennsylvania",
        location: "Philadelphia, PA",
        state: "PA",
        type: "private",
        logo: "UP",
        description: "Ivy League university famous for the Wharton School of Business and strong pre-professional programs.",
        satRange: "1470-1570",
        acceptanceRate: 5.9,
        tuition: 61710,
        enrollment: 25000,
        tags: ["Ivy League", "Business", "Pre-Professional"],
        avgSAT: 1520,
        difficulty: "high",
        programs: ["Business", "Medicine", "Engineering", "Liberal Arts"]
      },
      {
        id: 12,
        name: "Northwestern University",
        location: "Evanston, IL",
        state: "IL",
        type: "private",
        logo: "NU",
        description: "Research university known for journalism, theater, and strong alumni network.",
        satRange: "1440-1570",
        acceptanceRate: 7.0,
        tuition: 58701,
        enrollment: 22000,
        tags: ["Research", "Journalism", "Theater"],
        avgSAT: 1505,
        difficulty: "high",
        programs: ["Journalism", "Theater", "Business", "Engineering"]
      },
      {
        id: 13,
        name: "Georgetown University",
        location: "Washington, DC",
        state: "DC",
        type: "private",
        logo: "GU",
        description: "Catholic research university known for international affairs, business, and government relations.",
        satRange: "1410-1560",
        acceptanceRate: 12.2,
        tuition: 59957,
        enrollment: 19000,
        tags: ["Catholic", "International Affairs", "Government"],
        avgSAT: 1485,
        difficulty: "medium",
        programs: ["International Affairs", "Business", "Government", "Medicine"]
      },
      {
        id: 14,
        name: "University of Texas at Austin",
        location: "Austin, TX",
        state: "TX",
        type: "public",
        logo: "UT",
        description: "Large public research university known for business, engineering, and vibrant campus life.",
        satRange: "1240-1470",
        acceptanceRate: 31.8,
        tuition: 11448,
        enrollment: 51000,
        tags: ["Public Research", "Large Campus", "Texas Pride"],
        avgSAT: 1355,
        difficulty: "medium",
        programs: ["Business", "Engineering", "Liberal Arts", "Communications"]
      },
      {
        id: 15,
        name: "University of Virginia",
        location: "Charlottesville, VA",
        state: "VA",
        type: "public",
        logo: "UV",
        description: "Historic public university founded by Thomas Jefferson, known for honor code and traditions.",
        satRange: "1370-1520",
        acceptanceRate: 23.9,
        tuition: 18059,
        enrollment: 25000,
        tags: ["Public Ivy", "Historic", "Honor Code"],
        avgSAT: 1445,
        difficulty: "medium",
        programs: ["Business", "Liberal Arts", "Engineering", "Medicine"]
      },
      {
        id: 16,
        name: "University of North Carolina at Chapel Hill",
        location: "Chapel Hill, NC",
        state: "NC",
        type: "public",
        logo: "UNC",
        description: "Flagship public university known for basketball, journalism, and strong school spirit.",
        satRange: "1330-1500",
        acceptanceRate: 22.6,
        tuition: 8980,
        enrollment: 30000,
        tags: ["Public", "Basketball", "Journalism"],
        avgSAT: 1415,
        difficulty: "medium",
        programs: ["Journalism", "Business", "Medicine", "Liberal Arts"]
      }
    ];
  }

  applyFilters() {
    this.filteredUniversities = this.universities.filter(uni => {
      // Search filter
      if (this.filters.search) {
        const searchTerm = this.filters.search.toLowerCase();
        const searchMatch = 
          uni.name.toLowerCase().includes(searchTerm) ||
          uni.location.toLowerCase().includes(searchTerm) ||
          uni.programs.some(program => program.toLowerCase().includes(searchTerm)) ||
          uni.tags.some(tag => tag.toLowerCase().includes(searchTerm));
        
        if (!searchMatch) return false;
      }

      // State filter
      if (this.filters.state && uni.state !== this.filters.state) {
        return false;
      }

      // Score range filter
      if (this.filters.scoreRange) {
        if (!this.scoreInRange(uni.avgSAT, this.filters.scoreRange)) {
          return false;
        }
      }

      // Type filter
      if (this.filters.type && uni.type !== this.filters.type) {
        return false;
      }

      return true;
    });

    this.currentPage = 1;
    this.renderUniversities();
    this.updateResultCount();
    this.renderPagination();
  }

  scoreInRange(score, range) {
    switch (range) {
      case '1400+':
        return score >= 1400;
      case '1200-1399':
        return score >= 1200 && score <= 1399;
      case '1000-1199':
        return score >= 1000 && score <= 1199;
      case '800-999':
        return score >= 800 && score <= 999;
      default:
        return true;
    }
  }

  renderUniversities() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    const universitiesToShow = this.filteredUniversities.slice(startIndex, endIndex);

    if (universitiesToShow.length === 0) {
      this.showEmptyState();
      return;
    }

    this.hideEmptyState();

    if (this.currentView === 'grid') {
      this.renderGridView(universitiesToShow);
    } else {
      this.renderListView(universitiesToShow);
    }
  }

  renderGridView(universities) {
    const gridContainer = document.getElementById('universitiesGrid');
    const listContainer = document.getElementById('universitiesList');
    
    if (!gridContainer) return;

    gridContainer.classList.remove('hidden');
    if (listContainer) listContainer.classList.add('hidden');

    gridContainer.innerHTML = universities.map(uni => this.createUniversityCard(uni)).join('');
  }

  renderListView(universities) {
    const gridContainer = document.getElementById('universitiesGrid');
    const listContainer = document.getElementById('universitiesList');
    
    if (!listContainer) return;

    listContainer.classList.remove('hidden');
    if (gridContainer) gridContainer.classList.add('hidden');

    listContainer.innerHTML = universities.map(uni => this.createUniversityListItem(uni)).join('');
  }

  createUniversityCard(uni) {
    const isFavorited = this.isFavorited(uni.id);
    
    return `
      <div class="uni-card" data-university-id="${uni.id}">
        <div class="uni-header">
          <div class="uni-logo">${uni.logo}</div>
          <div class="uni-info">
            <h3>${uni.name}</h3>
            <div class="uni-location">
              📍 ${uni.location}
            </div>
          </div>
        </div>
        
        <div class="uni-details">
          <p class="uni-description">${uni.description}</p>
          
          <div class="uni-stats">
            <div class="uni-stat">
              <span class="uni-stat-value">${uni.satRange}</span>
              <div class="uni-stat-label">SAT Range</div>
            </div>
            <div class="uni-stat">
              <span class="uni-stat-value">${uni.acceptanceRate}%</span>
              <div class="uni-stat-label">Acceptance</div>
            </div>
          </div>
          
          <div class="uni-tags">
            ${uni.tags.map(tag => `
              <span class="uni-tag ${uni.difficulty === 'high' ? 'difficulty-high' : uni.difficulty === 'medium' ? 'difficulty-medium' : 'difficulty-low'}">${tag}</span>
            `).join('')}
          </div>
        </div>
        
        <div class="uni-actions">
          <a href="#" class="uni-cta" onclick="uniDirectory.viewUniversityDetail(${uni.id})">View Details</a>
          <button class="uni-favorite ${isFavorited ? 'favorited' : ''}" data-university-id="${uni.id}" title="${isFavorited ? 'Remove from favorites' : 'Add to favorites'}">
            ${isFavorited ? '❤️' : '🤍'}
          </button>
        </div>
      </div>
    `;
  }

  createUniversityListItem(uni) {
    const isFavorited = this.isFavorited(uni.id);
    
    return `
      <div class="uni-list-item" data-university-id="${uni.id}">
        <div class="uni-header">
          <div class="uni-logo">${uni.logo}</div>
          <div class="uni-info">
            <h3>${uni.name}</h3>
            <div class="uni-location">
              📍 ${uni.location}
            </div>
          </div>
        </div>
        
        <div class="uni-details">
          <p class="uni-description">${uni.description}</p>
          
          <div class="uni-stats">
            <div class="uni-stat">
              <span class="uni-stat-value">${uni.satRange}</span>
              <div class="uni-stat-label">SAT Range</div>
            </div>
            <div class="uni-stat">
              <span class="uni-stat-value">${uni.acceptanceRate}%</span>
              <div class="uni-stat-label">Acceptance</div>
            </div>
            <div class="uni-stat">
              <span class="uni-stat-value">$${uni.tuition.toLocaleString()}</span>
              <div class="uni-stat-label">Tuition</div>
            </div>
            <div class="uni-stat">
              <span class="uni-stat-value">${(uni.enrollment / 1000).toFixed(0)}K</span>
              <div class="uni-stat-label">Students</div>
            </div>
          </div>
          
          <div class="uni-tags">
            ${uni.tags.slice(0, 3).map(tag => `
              <span class="uni-tag ${uni.difficulty === 'high' ? 'difficulty-high' : uni.difficulty === 'medium' ? 'difficulty-medium' : 'difficulty-low'}">${tag}</span>
            `).join('')}
          </div>
        </div>
        
        <div class="uni-actions">
          <a href="#" class="uni-cta" onclick="uniDirectory.viewUniversityDetail(${uni.id})">View Details</a>
          <button class="uni-favorite ${isFavorited ? 'favorited' : ''}" data-university-id="${uni.id}" title="${isFavorited ? 'Remove from favorites' : 'Add to favorites'}">
            ${isFavorited ? '❤️' : '🤍'}
          </button>
        </div>
      </div>
    `;
  }

  switchView(view) {
    this.currentView = view;
    this.renderUniversities();
  }

  renderPagination() {
    const paginationSection = document.getElementById('paginationSection');
    const paginationContainer = document.getElementById('pagination');
    
    if (!paginationContainer || !paginationSection) return;

    const totalPages = Math.ceil(this.filteredUniversities.length / this.itemsPerPage);
    
    if (totalPages <= 1) {
      paginationSection.classList.add('hidden');
      return;
    }

    paginationSection.classList.remove('hidden');

    let paginationHTML = '';
    
    // Previous button
    paginationHTML += `
      <button class="pagination-btn" ${this.currentPage === 1 ? 'disabled' : ''} onclick="uniDirectory.goToPage(${this.currentPage - 1})">
        ← Previous
      </button>
    `;

    // Page numbers
    const startPage = Math.max(1, this.currentPage - 2);
    const endPage = Math.min(totalPages, this.currentPage + 2);

    if (startPage > 1) {
      paginationHTML += `<button class="pagination-btn" onclick="uniDirectory.goToPage(1)">1</button>`;
      if (startPage > 2) {
        paginationHTML += `<span class="pagination-info">...</span>`;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      paginationHTML += `
        <button class="pagination-btn ${i === this.currentPage ? 'active' : ''}" onclick="uniDirectory.goToPage(${i})">
          ${i}
        </button>
      `;
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        paginationHTML += `<span class="pagination-info">...</span>`;
      }
      paginationHTML += `<button class="pagination-btn" onclick="uniDirectory.goToPage(${totalPages})">${totalPages}</button>`;
    }

    // Next button
    paginationHTML += `
      <button class="pagination-btn" ${this.currentPage === totalPages ? 'disabled' : ''} onclick="uniDirectory.goToPage(${this.currentPage + 1})">
        Next →
      </button>
    `;

    paginationContainer.innerHTML = paginationHTML;
  }

  goToPage(page) {
    this.currentPage = page;
    this.renderUniversities();
    this.renderPagination();
    
    // Scroll to top of results
    document.querySelector('.unis-grid-section').scrollIntoView({ behavior: 'smooth' });
  }

  updateResultCount() {
    const resultCountEl = document.getElementById('resultCount');
    if (resultCountEl) {
      const total = this.filteredUniversities.length;
      const start = (this.currentPage - 1) * this.itemsPerPage + 1;
      const end = Math.min(start + this.itemsPerPage - 1, total);
      
      if (total === 0) {
        resultCountEl.textContent = 'No universities found';
      } else if (total <= this.itemsPerPage) {
        resultCountEl.textContent = `Showing ${total} universities`;
      } else {
        resultCountEl.textContent = `Showing ${start}-${end} of ${total} universities`;
      }
    }
  }

  clearAllFilters() {
    this.filters = {
      search: '',
      state: '',
      scoreRange: '',
      type: ''
    };

    // Reset form elements
    const searchInput = document.getElementById('universitySearch');
    const stateFilter = document.getElementById('stateFilter');
    const scoreFilter = document.getElementById('scoreFilter');
    const typeFilter = document.getElementById('typeFilter');

    if (searchInput) searchInput.value = '';
    if (stateFilter) stateFilter.value = '';
    if (scoreFilter) scoreFilter.value = '';
    if (typeFilter) typeFilter.value = '';

    this.applyFilters();
  }

  toggleFavorite(button) {
    const universityId = parseInt(button.getAttribute('data-university-id'));
    let favorites = this.getFavorites();
    
    if (favorites.includes(universityId)) {
      favorites = favorites.filter(id => id !== universityId);
      button.classList.remove('favorited');
      button.innerHTML = '🤍';
      button.title = 'Add to favorites';
    } else {
      favorites.push(universityId);
      button.classList.add('favorited');
      button.innerHTML = '❤️';
      button.title = 'Remove from favorites';
    }
    
    localStorage.setItem('universityFavorites', JSON.stringify(favorites));
    
    // Show message
    const action = favorites.includes(universityId) ? 'added to' : 'removed from';
    window.satApp.showMessage(`University ${action} favorites!`, 'success');
  }

  isFavorited(universityId) {
    return this.getFavorites().includes(universityId);
  }

  getFavorites() {
    const favorites = localStorage.getItem('universityFavorites');
    return favorites ? JSON.parse(favorites) : [];
  }

  viewUniversityDetail(universityId) {
    const university = this.universities.find(uni => uni.id === universityId);
    if (university) {
      // In a real app, this would navigate to a detail page
      this.showUniversityModal(university);
    }
  }

  showUniversityModal(university) {
    const modal = document.createElement('div');
    modal.className = 'university-modal';
    modal.innerHTML = `
      <div class="modal-overlay" onclick="this.parentNode.remove()">
        <div class="modal-content" onclick="event.stopPropagation()">
          <div class="modal-header">
            <h2>${university.name}</h2>
            <button class="modal-close" onclick="this.closest('.university-modal').remove()">✕</button>
          </div>
          <div class="modal-body">
            <div class="university-detail">
              <div class="detail-section">
                <h3>Overview</h3>
                <p>${university.description}</p>
                <p><strong>Location:</strong> ${university.location}</p>
                <p><strong>Type:</strong> ${university.type.charAt(0).toUpperCase() + university.type.slice(1)}</p>
              </div>
              
              <div class="detail-section">
                <h3>Admissions</h3>
                <p><strong>SAT Range:</strong> ${university.satRange}</p>
                <p><strong>Acceptance Rate:</strong> ${university.acceptanceRate}%</p>
                <p><strong>Average SAT:</strong> ${university.avgSAT}</p>
              </div>
              
              <div class="detail-section">
                <h3>Cost & Enrollment</h3>
                <p><strong>Tuition:</strong> $${university.tuition.toLocaleString()}</p>
                <p><strong>Enrollment:</strong> ${university.enrollment.toLocaleString()} students</p>
              </div>
              
              <div class="detail-section">
                <h3>Popular Programs</h3>
                <ul>
                  ${university.programs.map(program => `<li>${program}</li>`).join('')}
                </ul>
              </div>
            </div>
          </div>
          <div class="modal-actions">
            <a href="calculator.html" class="btn btn-primary">Calculate My Chances</a>
            <button class="btn btn-secondary" onclick="this.closest('.university-modal').remove()">Close</button>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add modal styles
    if (!document.getElementById('modal-styles')) {
      const styles = document.createElement('style');
      styles.id = 'modal-styles';
      styles.textContent = `
        .university-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 10000;
        }
        .modal-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .modal-content {
          background: white;
          border-radius: 12px;
          max-width: 600px;
          width: 100%;
          max-height: 80vh;
          overflow-y: auto;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px;
          border-bottom: 1px solid #e5e7eb;
        }
        .modal-close {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #6b7280;
        }
        .modal-body {
          padding: 24px;
        }
        .detail-section {
          margin-bottom: 24px;
        }
        .detail-section h3 {
          margin-bottom: 12px;
          color: var(--primary-blue);
        }
        .detail-section ul {
          list-style: none;
          padding: 0;
        }
        .detail-section li {
          padding: 4px 0;
          color: var(--medium-gray);
        }
        .detail-section li::before {
          content: '•';
          color: var(--primary-blue);
          margin-right: 8px;
        }
        .modal-actions {
          display: flex;
          gap: 12px;
          padding: 24px;
          border-top: 1px solid #e5e7eb;
        }
      `;
      document.head.appendChild(styles);
    }
  }

  showLoading() {
    const loadingState = document.getElementById('loadingState');
    if (loadingState) {
      loadingState.classList.remove('hidden');
    }
  }

  hideLoading() {
    const loadingState = document.getElementById('loadingState');
    if (loadingState) {
      loadingState.classList.add('hidden');
    }
  }

  showEmptyState() {
    const emptyState = document.getElementById('emptyState');
    const gridContainer = document.getElementById('universitiesGrid');
    const listContainer = document.getElementById('universitiesList');
    
    if (emptyState) emptyState.classList.remove('hidden');
    if (gridContainer) gridContainer.classList.add('hidden');
    if (listContainer) listContainer.classList.add('hidden');
  }

  hideEmptyState() {
    const emptyState = document.getElementById('emptyState');
    if (emptyState) emptyState.classList.add('hidden');
  }

  showError(message) {
    window.satApp.showMessage(message, 'error');
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

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.uniDirectory = new UniversityDirectory();
});
