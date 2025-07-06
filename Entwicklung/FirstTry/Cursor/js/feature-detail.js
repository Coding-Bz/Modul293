const features = [
  { title: "Practice Tests", desc: "Realistic SAT practice tests with instant feedback.", img: "img/feature1.jpg" },
  { title: "Score Tracker", desc: "Track your progress and see your improvement.", img: "img/feature2.jpg" },
  { title: "Video Lessons", desc: "Expert video lessons for every SAT topic.", img: "img/feature3.jpg" },
  { title: "Flashcards", desc: "Memorize key concepts with interactive flashcards.", img: "img/feature4.jpg" },
  { title: "Essay Grader", desc: "Get instant feedback on your SAT essays.", img: "img/feature5.jpg" },
  { title: "Question Bank", desc: "Thousands of SAT questions by topic.", img: "img/feature6.jpg" }
];

function getFeatureByTitle(title) {
  return features.find(f => f.title === title) || features[0];
}

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const featureTitle = params.get('feature');
  const feature = getFeatureByTitle(featureTitle);
  document.getElementById('feature-title').textContent = feature.title;
  document.getElementById('feature-desc').textContent = feature.desc;
  document.getElementById('feature-img').src = feature.img;
  document.getElementById('feature-img').alt = feature.title;

  const inquiryForm = document.getElementById('inquiry-form');
  inquiryForm.addEventListener('submit', e => {
    e.preventDefault();
    alert('Thank you for your inquiry! We will get back to you soon.');
    inquiryForm.reset();
  });
}); 