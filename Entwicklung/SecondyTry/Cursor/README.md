# SAT App Landing Page

A modern, responsive landing page for a SAT preparation mobile app, built with vanilla HTML, CSS, and JavaScript. Features a clean Swiss/California design hybrid with interactive elements and a fully functional SAT score calculator.

## 🎯 Project Overview

This landing page serves as a comprehensive showcase for a SAT preparation app, featuring:

- **Modern Design**: Swiss-inspired minimalism with California-style creative accents
- **Responsive Layout**: Works perfectly on all devices (320px to 1440px+)
- **Interactive Features**: Real SAT score calculator, university directory, and contact forms
- **Clean Code**: Built with only HTML5, CSS3, and vanilla JavaScript (no frameworks)

## 🚀 Features

### Core Pages
- **Home** (`index.html`) - Welcome section, latest updates, newsletter signup
- **Features** (`features.html`) - Filterable feature grid with category filters
- **Feature Details** (`feature-detail.html`) - Dynamic template for individual features
- **SAT Information** (`sat-info.html`) - SAT stats, preparation insights, FAQ
- **University Directory** (`unis.html`) - Searchable university database with filters
- **Contact** (`contact.html`) - Team section, contact form, feedback system
- **SAT Calculator** (`calculator.html`) - Real SAT score calculator with analysis

### Interactive Elements
- **SAT Score Calculator**: Real scoring logic with detailed analysis
- **University Filters**: Search by country, SAT score range, and study area
- **Feature Categories**: Filter features by practice, analytics, universities, tools
- **FAQ Accordion**: Smooth expandable FAQ sections
- **Contact Forms**: Validated forms with file upload and star ratings
- **Newsletter Signup**: Email validation and notifications

## 📁 File Structure

```
SAT-App-Landing/
├── index.html                 # Main landing page
├── features.html              # Features overview
├── feature-detail.html        # Feature detail template
├── sat-info.html              # SAT information page
├── unis.html                  # University directory
├── contact.html               # Contact & feedback page
├── calculator.html            # SAT score calculator
├── css/
│   ├── index.css              # Main page styles
│   ├── features.css           # Features page styles
│   ├── feature-detail.css     # Feature detail styles
│   ├── sat-info.css           # SAT info page styles
│   ├── unis.css               # University directory styles
│   ├── contact.css            # Contact page styles
│   └── calculator.css         # Calculator page styles
├── js/
│   ├── index.js               # Main page interactions
│   ├── features.js            # Feature filtering & rendering
│   ├── feature-detail.js      # Dynamic content loading
│   ├── sat-info.js            # FAQ accordion functionality
│   ├── unis.js                # University search & filters
│   ├── contact.js             # Form handling & validation
│   └── calculator.js          # SAT score calculation logic
└── README.md                  # Project documentation
```

## 🎨 Design System

### Colors
- **Primary Blue**: `#2563eb` - Main brand color
- **Primary Gray**: `#f4f4f6` - Background color
- **Accent**: `#ffb300` - Highlight color
- **Text**: `#222` - Main text color

### Typography
- **Primary**: Inter (Google Fonts)
- **Secondary**: Noto Sans (Google Fonts)
- **Fallback**: Helvetica, Arial, sans-serif

### Layout
- **Grid-based**: CSS Grid for responsive layouts
- **Sticky Header**: Navigation stays at top
- **Abstract Accents**: Subtle gradient elements for visual interest
- **Card Design**: Clean white cards with subtle shadows

## 🛠️ Technical Features

### Responsive Design
- Mobile-first approach
- Breakpoints: 320px, 600px, 900px, 1440px+
- Flexible grid layouts
- Touch-friendly interactions

### JavaScript Functionality
- **Form Validation**: Real-time input validation
- **Dynamic Content**: Feature cards and university listings
- **Interactive Filters**: Multi-criteria filtering
- **SAT Calculator**: Real scoring algorithms
- **Notifications**: Toast-style success/error messages
- **Accessibility**: Keyboard navigation and ARIA labels

### Performance
- No external dependencies (except Google Fonts)
- Optimized CSS with CSS custom properties
- Efficient JavaScript event handling
- Minimal DOM manipulation

## 🚀 Getting Started

### Prerequisites
- Modern web browser
- Local web server (optional, for development)

### Installation
1. Clone or download the project files
2. Open `index.html` in your web browser
3. Navigate through the pages using the navigation menu

### Development
For local development with a web server:
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## 📱 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🎯 SAT Calculator Logic

The SAT score calculator uses a simplified but realistic scoring algorithm:

1. **Reading Section**: 52 questions → 200-800 scale
2. **Writing Section**: 44 questions → 200-800 scale
3. **Math Section**: 58 questions → 200-800 scale
4. **EBRW Score**: Average of Reading and Writing scores
5. **Total Score**: Sum of EBRW and Math scores (400-1600 scale)

The calculator provides:
- Individual section scores
- Total composite score
- Performance analysis
- Study recommendations

## 🔧 Customization

### Adding New Features
1. Add feature data to `js/features.js`
2. Update the features grid rendering
3. Create corresponding CSS styles

### Adding Universities
1. Add university data to `js/unis.js`
2. Update filter options if needed
3. University cards will render automatically

### Modifying Design
1. Update CSS custom properties in `:root`
2. Modify component styles in respective CSS files
3. Maintain responsive breakpoints

## 📄 License

This project is created for educational and demonstration purposes.

## 🤝 Contributing

Feel free to submit issues, feature requests, or pull requests to improve the project.

## 📞 Support

For questions or support, please refer to the contact page within the application.

---

**Built with ❤️ using vanilla HTML, CSS, and JavaScript** 