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
    }
      
    }

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
            

        }) 
        
}
}
// REDIRECTION VERS LA PAGE ADMIN

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

// DECONNEXION 
logoutBtn.addEventListener('click', function() {

  // Supprimer le token du local storage
  localStorage.removeItem('jeton');

  // Cacher le bouton de déconnexion
  logoutBtn.style.display = 'none';

  // Afficher le lien de connexion
  loginBtn.style.display = 'inline-block';
});