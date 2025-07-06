// Features Page JavaScript

class FeaturesFilter {
  constructor() {
    this.filterButtons = document.querySelectorAll('.filter-btn');
    this.featureItems = document.querySelectorAll('.feature-item');
    this.featuresGrid = document.getElementById('featuresGrid');
    this.currentFilter = 'all';
    
    this.init();
  }

  init() {
    this.setupFilterButtons();
    this.showAllFeatures();
  }

  setupFilterButtons() {
    this.filterButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const category = e.target.getAttribute('data-category');
        this.filterFeatures(category);
        this.updateActiveButton(e.target);
      });
    });
  }

  filterFeatures(category) {
    this.currentFilter = category;
    this.featuresGrid.classList.add('loading');
    
    setTimeout(() => {
      this.featureItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        
        if (category === 'all' || itemCategory === category) {
          item.classList.remove('hidden');
          item.style.display = 'block';
        } else {
          item.classList.add('hidden');
          item.style.display = 'none';
        }
      });
      
      this.featuresGrid.classList.remove('loading');
      this.checkForResults();
    }, 300);
  }

  updateActiveButton(activeButton) {
    this.filterButtons.forEach(button => {
      button.classList.remove('active');
    });
    activeButton.classList.add('active');
  }

  showAllFeatures() {
    this.featureItems.forEach(item => {
      item.classList.remove('hidden');
      item.style.display = 'block';
    });
  }

  checkForResults() {
    const visibleItems = Array.from(this.featureItems).filter(item => 
      !item.classList.contains('hidden')
    );
    
    // Remove existing no-results message
    const existingMessage = this.featuresGrid.querySelector('.no-results');
    if (existingMessage) {
      existingMessage.remove();
    }
    
    if (visibleItems.length === 0) {
      this.showNoResults();
    }
  }

  showNoResults() {
    const noResultsHtml = `
      <div class="no-results">
        <h3>No features found</h3>
        <p>Try selecting a different category to explore more features.</p>
        <button class="btn btn-primary" onclick="featuresFilter.filterFeatures('all')">
          Show All Features
        </button>
      </div>
    `;
    
    this.featuresGrid.insertAdjacentHTML('beforeend', noResultsHtml);
  }

  // Method to filter by search term (for future enhancement)
  searchFeatures(searchTerm) {
    const term = searchTerm.toLowerCase();
    
    this.featureItems.forEach(item => {
      const title = item.querySelector('h3').textContent.toLowerCase();
      const description = item.querySelector('p').textContent.toLowerCase();
      const tags = Array.from(item.querySelectorAll('.tag'))
        .map(tag => tag.textContent.toLowerCase())
        .join(' ');
      
      const matches = title.includes(term) || 
                     description.includes(term) || 
                     tags.includes(term);
      
      if (matches || term === '') {
        item.classList.remove('hidden');
        item.style.display = 'block';
      } else {
        item.classList.add('hidden');
        item.style.display = 'none';
      }
    });
    
    this.checkForResults();
  }
}

// Feature animations
class FeatureAnimations {
  constructor() {
    this.init();
  }

  init() {
    this.setupHoverEffects();
    this.setupScrollAnimations();
  }

  setupHoverEffects() {
    const featureItems = document.querySelectorAll('.feature-item');
    
    featureItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        const icon = item.querySelector('.feature-icon svg');
        if (icon) {
          icon.style.transform = 'scale(1.1) rotate(5deg)';
          icon.style.transition = 'transform 0.3s ease';
        }
      });
      
      item.addEventListener('mouseleave', () => {
        const icon = item.querySelector('.feature-icon svg');
        if (icon) {
          icon.style.transform = 'scale(1) rotate(0deg)';
        }
      });
    });
  }

  setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationDelay = `${Math.random() * 0.3}s`;
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.feature-item').forEach(item => {
      observer.observe(item);
    });
  }
}

// Feature analytics (simple tracking)
class FeatureAnalytics {
  constructor() {
    this.trackingData = {
      filterClicks: {},
      featureViews: {},
      ctaClicks: {}
    };
    
    this.init();
  }

  init() {
    this.trackFilterClicks();
    this.trackFeatureClicks();
    this.trackCTAClicks();
  }

  trackFilterClicks() {
    document.querySelectorAll('.filter-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const category = e.target.getAttribute('data-category');
        this.trackingData.filterClicks[category] = 
          (this.trackingData.filterClicks[category] || 0) + 1;
        
        console.log('Filter clicked:', category, this.trackingData.filterClicks);
      });
    });
  }

  trackFeatureClicks() {
    document.querySelectorAll('.feature-cta').forEach(cta => {
      cta.addEventListener('click', (e) => {
        const featureTitle = e.target.closest('.feature-item')
          .querySelector('h3').textContent;
        
        this.trackingData.featureViews[featureTitle] = 
          (this.trackingData.featureViews[featureTitle] || 0) + 1;
        
        console.log('Feature viewed:', featureTitle, this.trackingData.featureViews);
      });
    });
  }

  trackCTAClicks() {
    document.querySelectorAll('.cta-actions .btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const ctaText = e.target.textContent.trim();
        this.trackingData.ctaClicks[ctaText] = 
          (this.trackingData.ctaClicks[ctaText] || 0) + 1;
        
        console.log('CTA clicked:', ctaText, this.trackingData.ctaClicks);
      });
    });
  }

  getAnalytics() {
    return this.trackingData;
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.featuresFilter = new FeaturesFilter();
  window.featureAnimations = new FeatureAnimations();
  window.featureAnalytics = new FeatureAnalytics();
});

// Utility functions
const FeatureUtils = {
  // Get feature count by category
  getFeatureCount: (category) => {
    if (category === 'all') {
      return document.querySelectorAll('.feature-item').length;
    }
    return document.querySelectorAll(`[data-category="${category}"]`).length;
  },

  // Get all categories
  getCategories: () => {
    const categories = new Set();
    document.querySelectorAll('.feature-item').forEach(item => {
      categories.add(item.getAttribute('data-category'));
    });
    return Array.from(categories);
  },

  // Update filter button text with counts
  updateFilterCounts: () => {
    document.querySelectorAll('.filter-btn').forEach(button => {
      const category = button.getAttribute('data-category');
      const count = FeatureUtils.getFeatureCount(category);
      const originalText = button.textContent.split(' (')[0];
      button.textContent = `${originalText} (${count})`;
    });
  }
};

// Update filter counts on page load
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    FeatureUtils.updateFilterCounts();
  }, 100);
});
