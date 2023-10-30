// Récupération des images et du texte pour "Mes Projets"

let allProjects = [];

fetch('http://localhost:5678/api/works')
    .then (response => response.json())
    .then(data => {
        allProjects = data;
        displayProjects(data);
});
    


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