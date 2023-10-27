let reponse = await fetch('/api/works');
let works = await reponse.json();
console.log(works);

async function updateWorks() {
    reponse = await fetch('/api/works');
    works = await reponse.json();
}

// Toutes ces variables servent à cibler des éléments du fichier HTML
const catalogue = document.querySelector('#portfolio');
const header = document.querySelector('header');
const main = document.getElementById('main');
const introduction = document.querySelector('#introduction');
const contact = document.querySelector('#contact');

// Création du HTML du catalogue
function createPortfolio() {
    const worksTitleDiv = document.createElement('div');
    worksTitleDiv.className = 'worksTitleDiv';
    const worksTitle = document.createElement('h2');
    worksTitle.innerText = 'Mes Projets';
  
    const filters = document.createElement('div');
    filters.className = 'filters';
  
    const gallery = document.createElement('div');
    gallery.className = 'gallery';
  
    catalogue.style.display = null;
  
    catalogue.appendChild(worksTitleDiv);
    worksTitleDiv.appendChild(worksTitle);
    catalogue.appendChild(filters);
    catalogue.appendChild(gallery);
    const sectionWorks = document.querySelector('.gallery');
    const divFilters = document.querySelector('.filters');
  
    const editWorksBtn = document.createElement('p');
    editWorksBtn.innerHTML = `<a href="#modale" class="openModale">
          <i class="fa fa-light fa-pen-to-square"></i> 
          modifier </a>`;
    editWorksBtn.setAttribute('id', 'editWorksBtn');
    editWorksBtn.className = 'editWorksBtn';
    editWorksBtn.style.display = 'none';
  
    worksTitleDiv.appendChild(editWorksBtn);}