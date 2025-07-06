// Dummy data for updates and features
const updates = [
  { title: "New SAT Math Course Released!", date: "2024-06-01" },
  { title: "Mobile App Update: Flashcards", date: "2024-05-20" },
  { title: "SAT Practice Test v2.0", date: "2024-05-10" }
];
const features = [
  { title: "Practice Tests", desc: "Realistic SAT practice tests with instant feedback.", img: "img/feature1.jpg" },
  { title: "Score Tracker", desc: "Track your progress and see your improvement.", img: "img/feature2.jpg" },
  { title: "Video Lessons", desc: "Expert video lessons for every SAT topic.", img: "img/feature3.jpg" },
  { title: "Flashcards", desc: "Memorize key concepts with interactive flashcards.", img: "img/feature4.jpg" },
  { title: "Essay Grader", desc: "Get instant feedback on your SAT essays.", img: "img/feature5.jpg" },
  { title: "Question Bank", desc: "Thousands of SAT questions by topic.", img: "img/feature6.jpg" }
];

// Render updates
const updatesList = document.querySelector('.updates-list');
if (updatesList) {
  updates.forEach(u => {
    const div = document.createElement('div');
    div.className = 'update-item';
    div.innerHTML = `<strong>${u.title}</strong> <span style="float:right; color:#888;">${u.date}</span>`;
    updatesList.appendChild(div);
  });
}

// Render features
const featuresGrid = document.querySelector('.features-grid');
if (featuresGrid) {
  features.forEach(f => {
    const card = document.createElement('div');
    card.className = 'feature-card';
    card.innerHTML = `
      <img src="${f.img}" alt="${f.title}" style="width:100%;border-radius:0.5rem 0.5rem 0 0;object-fit:cover;max-height:120px;">
      <h3>${f.title}</h3>
      <p>${f.desc}</p>
      <a href="feature-detail.html?feature=${encodeURIComponent(f.title)}" class="btn">Learn more</a>
    `;
    featuresGrid.appendChild(card);
  });
}

// Newsletter form
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', e => {
    e.preventDefault();
    alert('Thank you for subscribing!');
    newsletterForm.reset();
  });
}

// Score calculator
const scoreForm = document.getElementById('score-form');
const scoreResult = document.getElementById('score-result');
if (scoreForm && scoreResult) {
  scoreForm.addEventListener('submit', e => {
    e.preventDefault();
    const math = parseInt(scoreForm.math.value, 10);
    const reading = parseInt(scoreForm.reading.value, 10);
    if (isNaN(math) || isNaN(reading)) {
      scoreResult.textContent = 'Please enter valid scores.';
      return;
    }
    const total = math + reading;
    scoreResult.textContent = `Your estimated SAT total score: ${total}`;
  });
} 