const features = [
  { title: "Practice Tests", desc: "Realistic SAT practice tests with instant feedback.", img: "img/feature1.jpg", subject: "math", language: "en" },
  { title: "Score Tracker", desc: "Track your progress and see your improvement.", img: "img/feature2.jpg", subject: "math", language: "en" },
  { title: "Video Lessons", desc: "Expert video lessons for every SAT topic.", img: "img/feature3.jpg", subject: "reading", language: "en" },
  { title: "Flashcards", desc: "Memorize key concepts with interactive flashcards.", img: "img/feature4.jpg", subject: "writing", language: "en" },
  { title: "Essay Grader", desc: "Get instant feedback on your SAT essays.", img: "img/feature5.jpg", subject: "writing", language: "en" },
  { title: "Question Bank", desc: "Thousands of SAT questions by topic.", img: "img/feature6.jpg", subject: "math", language: "es" }
];

function renderFeatures(list) {
  const grid = document.querySelector('.features-grid');
  grid.innerHTML = '';
  list.forEach(f => {
    const card = document.createElement('div');
    card.className = 'feature-card';
    card.innerHTML = `
      <img src="${f.img}" alt="${f.title}">
      <h3>${f.title}</h3>
      <p>${f.desc}</p>
      <a href="feature-detail.html?feature=${encodeURIComponent(f.title)}" class="btn">Learn more</a>
    `;
    grid.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderFeatures(features);
  const filterForm = document.getElementById('feature-filter');
  filterForm.addEventListener('submit', e => {
    e.preventDefault();
    const subject = filterForm.subject.value;
    const language = filterForm.language.value;
    const filtered = features.filter(f => {
      return (subject === '' || f.subject === subject) && (language === '' || f.language === language);
    });
    renderFeatures(filtered);
  });
}); 