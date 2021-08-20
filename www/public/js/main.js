const search = document.getElementById('search');
const matchList = document.getElementById('match-list');
const category = document.getElementById('category');

const searchConcept = async searchText => {
    const url = 'https://images-316715.ew.r.appspot.com/api/title/' + searchText;
    const res = await fetch(url);
    const concepts = await res.json();


    let matches = concepts;
    //let matches = concepts.filter(concept => {
    //    const regex = new RegExp(`^${searchText}`, 'gi');
    //    return concept.title.match(regex);
    //});

    if (searchText.length === 0) {
        matches = [];
        matchList.innerHTML = '';
    }
    console.log(matches);
    outputHtml(matches);

};

const outputHtml = matches => {
    if (matches.length > 0) {
        const html = matches.map(match => `
    <div class="card card-body mb-1">
      <h4>${match.title}</h4>
      <a href="${match.licenseUrl}">${match.license}</a>
      <img src="${match.url}" alt="${match.title}" class="img-thumbnail" mb-1>
      <a href="${match.image}" mb-1 class="btn btn-info" role="button">Download</a>


    </div>
    `).join('');
        //<img style="height:300px;" src="${match.metaImage.url}" alt="${match.metaImage.alt}">
        matchList.innerHTML = html;
    } else {
        matchList.innerHTML = "";
    };
};



search.addEventListener('input', () => searchConcept(search.value));


// get matching data
