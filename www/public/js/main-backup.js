const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

const searchConcept = async searchText => {
  const res = await fetch('../data/concept.json');
  const concepts = await res.json();

let matches = concepts.filter(concept => {
  const regex = new RegExp(`^${searchText}`, 'gi');
  return concept.title.title.match(regex);
});

if (searchText.length === 0) {
    matches = [];
    matchList.innerHTML = '';
}
  console.log(matches);
  outputHtml(matches);

};

// show result in HTML on page
const outputHtml = matches => {
  if (matches.length > 0) {
    const html = matches.map(match => `
    <div class="card card-body mb-1">
      <h4>${match.title.title}</h4>
      <span class="text-primary">${match.content.content}</span>
    </div>
    `).join('');
    matchList.innerHTML = html;
  };
};



search.addEventListener('input', () => searchConcept(search.value));

// get matching data
