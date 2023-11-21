const apiWorks = "http://localhost:5678/api/works";
const apiCategories = "http://localhost:5678/api/categories";
let allProject = []

fetch(apiWorks)
  .then(response => response.json())
  .then(works => {
    renderProject(works)
    renderProjectModal(works)
    allProject = works
});
  fetch(apiCategories)
      .then(response => response.json())
      .then(categories => {
        renderCategories(categories);
});



function renderProject (works) {  
  let project = document.querySelector(".gallery");
    
  project.innerHTML = "";

  for (let i = 0; i < works.length; i++){
    let figure = document.createElement("figure");
    let img = document.createElement("img");
    let figcaption = document.createElement("figcaption");

    img.setAttribute("src", works[i].imageUrl);
    figcaption.setAttribute("alt", works[i].title);
    img.setAttribute("crossorigin", "anonymous");
    figcaption.innerHTML = works[i].title;
    project.appendChild(figure);
    figure.append(img, figcaption);
}}
    

function renderCategories (categories) {  
    
  let filtre = document.querySelector(".filtre");
  filtre.innerHTML = "";

      
  let allButton = document.createElement("button");  
    allButton.innerHTML = "Tous";
    filtre.appendChild(allButton);
    allButton.addEventListener("click", function () {
    renderProject(allProject);
  });
    
  for (let i = 0 ; i < categories.length; i++){

    let button = document.createElement("button");
      button.setAttribute("value", categories[i].name);
      button.innerHTML = categories[i].name;
      filtre.appendChild(button);
      button.addEventListener("click", function (){
    const filterProject = allProject.filter(function(project){
      console.log(categories[i].id, project.categoryId)
      return project.categoryId === categories[i].id
    });
    renderProject(filterProject)
})}}


// Redirection vers la page d'admin

const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const buttonModal = document.querySelector('.js-modal');
const logoModal = document.querySelector('.fa-sharp')
const boutonFiltre = document.querySelector(".filtre")
const modeEdition = document.querySelector(".mode-edition")
const logoModif = document.querySelector(".fa-pen-to-square")




// Vérifier si un utilisateur est connecté
if (localStorage.getItem("jeton")) {

  // Afficher le bouton de déconnexion
  logoutBtn.style.display = 'flex';

  // Cacher le bouton login
  loginBtn.style.display = 'none';

  // Cacher les boutons des filtres
  boutonFiltre.style.display = 'none';

  logoModal.style.display= 'flex';

  logoModif.style.display="flex"


} else{
  // Cacher le bouton Modifier de la Modal
  buttonModal.style.display = 'none' ;

  

  modeEdition.style.display= "none"
}

// Déconnexion
logoutBtn.addEventListener('click', function() {

  // Supprimer le token du local storage
  localStorage.removeItem('jeton');

  // Cacher le bouton de déconnexion
  logoutBtn.style.display = 'none';

  // Afficher le lien de connexion
  loginBtn.style.display = 'inline-block';
});


//  Création Modal

const openModal = function(e) {
  e.preventDefault();
  const target = document.querySelector(e.target.getAttribute("href"));
  target.style.display = "block";
  target.removeAttribute("aria-hidden");
  target.setAttribute("aria-modal", "true");
};

const closeModal = function(e) {
  e.preventDefault();
  const modal = e.target.closest(".modal");
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
};

document.querySelectorAll(".js-modal").forEach(a => {
  a.addEventListener("click", openModal);
});

document.querySelectorAll(".js-modal-close").forEach(button => {
  button.addEventListener("click", closeModal);
});

window.addEventListener("click", e => {
  if (e.target.classList.contains("modal")) {
    e.target.style.display = "none";
    e.target.setAttribute("aria-hidden", "true");
    e.target.removeAttribute("aria-modal");
  }
});

window.addEventListener("keydown", e => {
  if (e.key === "Escape" || e.key === "Esc") {
    document.querySelectorAll(".modal").forEach(modal => {
      modal.style.display = "none";
      modal.setAttribute("aria-hidden", "true");
      modal.removeAttribute("aria-modal");
    });
  }
});


// Contenu de la modal

function renderProjectModal(works) {
  const modalProject = document.querySelector(".project-modal");
  modalProject.innerHTML = "";
  const tokenJeton = window.localStorage.getItem("jeton")
  const projectModal = document.querySelector('.project-modal');

  for (let i = 0; i < works.length; i++) {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");
    const trashIcon = document.createElement('i');
    const editModal = document.createElement("p")


    img.setAttribute("src", works[i].imageUrl);
    figcaption.setAttribute("alt", works[i].title);
    img.setAttribute("crossorigin", "anonymous");
    trashIcon.classList.add('fa-solid', 'fa-trash-can');
   

    trashIcon.addEventListener('click', function() {
      const projectId = works[i].id;
      fetch(apiWorks + '/' + projectId, {
        method: 'DELETE',
        headers: {
          Authorization : 'Bearer ' + tokenJeton,
          'Content-Type': 'application/json'
        }
      })

      .then(response => response.json())
      .then(data => {
        figure.remove();
      })
    });

    projectModal.appendChild(figure);
    figure.append(img, figcaption, trashIcon, editModal,);
  }
}

// Modal 2 Ajout Photo

const ajouterPhotoBtn = document.querySelector('.js-ajouter-photo');
const modal1 = document.getElementById('modal1');
const modal2 = document.getElementById('modal2');
const backArrowBtn = document.querySelector('.fa-arrow-left');

ajouterPhotoBtn.addEventListener('click', () => {

// Passage de modal1 a modal2

  modal2.style.display = 'flex';
  modal1.style.display = 'none'; 

});

backArrowBtn.addEventListener('click', () => {

 // Passage de modal2 a modal1

  modal1.style.display = 'flex';
  modal2.style.display = 'none';
});


// Ajout d'un projet

const form = document.getElementById('project-form');
const fileInput = document.getElementById('file-upload');
const tokenJeton = window.localStorage.getItem('jeton');

// Affichage de la prévisualisation de l'image sélectionnée

fileInput.addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
    const previewImg = document.createElement('img');
    const previewContainer = document.createElement('div');
    const projectModal2 = document.querySelector('.project-modal2')
    const reader = new FileReader();
      reader.onload = function(event) {
      previewImg.setAttribute('src', event.target.result);
      previewContainer.appendChild(previewImg);
      form.insertBefore(previewContainer, form.childNodes[0]);
    }
      reader.readAsDataURL(file);
      projectModal2.style.display = 'none';
  }
});