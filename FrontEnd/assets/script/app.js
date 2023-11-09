// Récupération des images et du texte pour "Mes Projets"

let allProjects = [];

fetch('http://localhost:5678/api/works')
    .then (response => response.json())
    .then(data => {
        allProjects = data;
        displayProjects(data);
});
    
// Création de la gallerie avec les images et les titres associés
function displayProjects(projects) {
    const createGallery = () => {
    const gallery = /*html*/`
        <div class="gallery">
    ${projects.map((project) => /*html*/ `
        <figure>
            <img src="${project.imageUrl}" alt="${project.title}" />
            <figcaption>${project.title}</figcaption> 
            </figure>
        `).join("")}
    </div>
`;
    
    
// Cherche la section avec l'id "portfolio"
    
const portfolioSection = document.getElementById('portfolio');
    
// Vérifie s'il y a déja une galerie, si oui, la remplace const existingGallery = document queryselector ("•gallery');
const existingGallery = document.querySelector('.gallery');
if (existingGallery) {
existingGallery.outerHTML = gallery;
} else {
// Sinon, ajoute la nouvelle galerie à l'intérieur de la section "portfolio"
    portfolioSection.insertAdjacentHTML('beforeend', gallery);
}};
    
createGallery(); // Appel de la fonction createdallery pour créer la galerie d'images
};


fetch ('http://localhost:5678/api/categories')
    .then(response => response.json())
    .then(categories => {
        const filterButtons = document.querySelector('.filtre-buttons');

    // Utilsation map pour générer la structure HTML pour chaque catégorie

    const  buttonsHTML = categories.map(category => {
        return /*html*/ `
        <button class="filtre">${category.name}</button>
        `;
    }).join('');

    // Ajoute le bouton "Tous" en tant que premier bouton
    const allButtonsHtml = /*html*/ `
    <button class="filtre filtre-selected">Tous</button>
    `;

    // Crée la struture complète en combinant le bouton "Tous" avec les boutons catégories
    const filterButtonsHtml = allButtonsHtml + buttonsHTML;

    // Utilise innerHTML pour mettre à jour le contenu de la div filter-buttons
    filterButtons.innerHTML = filterButtonsHtml;

    // Récupère tous les boutons de filtre 
    const buttons = document.querySelectorAll('.filtre-buttons button');

    // Ajoute un event listener à chaque bouton de filtre
    buttons.forEach(button => {
        button.addEventListener('click', () => {
        // Si le bouton "Tous est cliqué, on appelle "filterProjects" avec categoryId à null.
        //Sinon, on recherche l'id de la catégorie associée et on appelle "filterPrjects" avec cet id pour filter les projets par catégorie.
        const categoryId = button.classList.contains('filtre-selected') ? null : categories.find(category => category.name === button.textContent)?.id;
        filterProjects(categoryId,button);
        });
    });
    });

    function filterProjects(categoryId,selectedButton) {
        const filteredProjects = !categoryId ? allProjects : allProjects.filter(project => project.categoryId === categoryId);
        displayProjects(filteredProjects);
        setSelectedFilter(selectedButton);
    }

    function setSelectedFilter(selectedButton) {
        const buttons = document.querySelectorAll('.filtre-buttons button');
        buttons.forEach(button => {
            button.classList.remove('filtre-selected');
        });
        selectedButton.classList.add('filtre-selected');
    }