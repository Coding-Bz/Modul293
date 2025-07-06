const universities = [
  { name: "Harvard University", country: "usa", minscore: 1500, img: "img/harvard.jpg", desc: "Located in Cambridge, MA. World-renowned Ivy League university.", location: "Cambridge, MA, USA" },
  { name: "Stanford University", country: "usa", minscore: 1450, img: "img/stanford.jpg", desc: "Leading research university in California.", location: "Stanford, CA, USA" },
  { name: "University of Toronto", country: "canada", minscore: 1300, img: "img/toronto.jpg", desc: "Top Canadian university accepting SAT.", location: "Toronto, ON, Canada" },
  { name: "University of Oxford", country: "uk", minscore: 1400, img: "img/oxford.jpg", desc: "Prestigious UK university accepting SAT.", location: "Oxford, England" },
  { name: "MIT", country: "usa", minscore: 1520, img: "img/mit.jpg", desc: "Massachusetts Institute of Technology.", location: "Cambridge, MA, USA" },
  { name: "Yale University", country: "usa", minscore: 1460, img: "img/yale.jpg", desc: "Ivy League university in Connecticut.", location: "New Haven, CT, USA" },
  { name: "McGill University", country: "canada", minscore: 1250, img: "img/mcgill.jpg", desc: "Leading university in Montreal.", location: "Montreal, QC, Canada" },
  { name: "Princeton University", country: "usa", minscore: 1480, img: "img/princeton.jpg", desc: "Ivy League university in New Jersey.", location: "Princeton, NJ, USA" },
  { name: "Columbia University", country: "usa", minscore: 1450, img: "img/columbia.jpg", desc: "Ivy League university in New York.", location: "New York, NY, USA" },
  { name: "Imperial College London", country: "uk", minscore: 1380, img: "img/imperial.jpg", desc: "Top science university in London.", location: "London, England" }
];

function renderUniversities(list) {
  const grid = document.querySelector('.universities-grid');
  grid.innerHTML = '';
  list.forEach(u => {
    const card = document.createElement('div');
    card.className = 'university-card';
    card.innerHTML = `
      <img src="${u.img}" alt="${u.name}">
      <h3>${u.name}</h3>
      <p>${u.desc}</p>
      <p><strong>Location:</strong> ${u.location}</p>
      <p><strong>Min. SAT Score:</strong> ${u.minscore}</p>
    `;
    grid.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderUniversities(universities);
  const filterForm = document.getElementById('uni-filter');
  filterForm.addEventListener('submit', e => {
    e.preventDefault();
    const country = filterForm.country.value;
    const minscore = parseInt(filterForm.minscore.value, 10);
    const filtered = universities.filter(u => {
      return (country === '' || u.country === country) && (isNaN(minscore) || u.minscore >= minscore);
    });
    renderUniversities(filtered);
  });
}); 