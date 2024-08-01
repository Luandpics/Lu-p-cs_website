document.addEventListener('DOMContentLoaded', function() {
    showPage('gallery'); // Afficher la galerie par défaut
});

function showPage(page) {
    const contentDiv = document.getElementById('content');
    const navLinks = document.querySelectorAll('.main-nav a');
    
    // Désactive tous les liens
    navLinks.forEach(link => {
        link.classList.remove('disabled');
    });

    // Affiche le contenu correspondant
    if (page === 'gallery') {
        contentDiv.innerHTML = '<p class="page-title">Mais alors... que voit mon objectif?</p>';
        document.getElementById('nav-gallery').classList.add('disabled');
        document.querySelector('.gallery').style.display = 'block';
        loadImages();
    } else if (page === 'contact') {
        contentDiv.innerHTML = `
            <p class="page-title">N'hésitez plus... contactez moi!</p>
            <div class="contact-image">
                <img src="/Users/lukasegouin/Documents/Site_Luka&p!cs/Logo/white_logo.png" alt="Contact Image">
            </div>
            <div class="contact-info">
                <p>Mon numéro de téléphone : +33648137680</p>
                <p>Mon adresse email : Luka.pics9@gmail.com</p>
                <p>Suivez-moi sur les réseaux sociaux : <a href="https://www.instagram.com/luka_.pics/" target="_blank" class="insta-link">Instagram</a></p>
            </div>
        `;
        document.getElementById('nav-contact').classList.add('disabled');
        document.querySelector('.gallery').style.display = 'none';    

    } else if (page.startsWith('image')) {
        const imageIndex = page.split('-')[1];
        const image = images[imageIndex];
        contentDiv.innerHTML = `
            <h2>${image.text}</h2>
            <div id="category-gallery"></div>
        `;
        document.querySelector('.gallery').style.display = 'none';
        showImageGallery(image.text);
    }
}

const images = [
    { src: 'Sport/perche.JPG', text: 'Sports' },
    { src: 'Paysages/paysage.JPG', text: 'Paysages' },
    { src: 'Animaux/animaux.JPG', text: 'Animaux' },
    { src: 'Portraits/portrait.JPG', text: 'Portraits' },
    { src: 'Shooting/shooting.JPG', text: 'Shooting' },
    //{ src: 'Events/events.JPG', text: 'Événements' },
];

function loadImages() {
    const imageGrid = document.querySelector('.image-grid');
    imageGrid.innerHTML = ''; // Clear existing images

    images.forEach((image, index) => {
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.text;
        img.style.cursor = 'pointer';
        img.onclick = () => {
            showPage(`image-${index}`);
        };

        const imgContainer = document.createElement('div');
        imgContainer.classList.add('image-item');
        imgContainer.appendChild(img);

        const imgText = document.createElement('div');
        imgText.classList.add('image-text');
        imgText.textContent = image.text;
        imgContainer.appendChild(imgText);

        imageGrid.appendChild(imgContainer);
    });
}

function showImageGallery(category) {
    const categoryGallery = document.getElementById('category-gallery');
    const categoryImages = getCategoryImages(category);
    
    categoryImages.forEach(src => {
        const thumb = document.createElement('img');
        thumb.src = src;
        thumb.classList.add('thumbnail');
        thumb.onclick = () => openModal(src);
        categoryGallery.appendChild(thumb);
    });
}

function getCategoryImages(category) {
    // Remplacez les chemins d'accès par ceux de vos images réelles
    if (category === 'Sports') {
        return [
            'Sport/course1.JPG',
            'Sport/course2.JPG',
            'Sport/course3.JPG',
            'Sport/perche.JPG',
            'Sport/perche1.JPG',
            'Sport/perche2.JPG',
            'Sport/perche3.JPG',
            'Sport/perche4.JPG'   
        ];
    }
    if (category === 'Paysages') {
        return [
            'Paysages/paysage.JPG',
            'Paysages/paysage1.JPG',
            'Paysages/paysage2.JPG',
            'Paysages/paysage3.JPG',
            'Paysages/paysage4.JPG',
            'Paysages/paysage5.JPG',
            'Paysages/paysage6.JPG',
            'Paysages/paysage7.JPG'
        ];
    }
    if (category === 'Animaux') {
        return [
            'Animaux/animaux.JPG',
            'Animaux/animaux1.JPG',
            'Animaux/animaux2.JPG',
            'Animaux/animaux3.JPG',
            'Animaux/animaux4.JPG',
            'Animaux/animaux5.JPG',
            'Animaux/animaux6.JPG',
            'Animaux/animaux7.JPG'
        ];
    }
    if (category === 'Portraits') {
        return [
            'Portraits/portrait.JPG',
            'Portraits/portrait1.JPG',
            'Portraits/portrait2.JPG',
            'Portraits/portrait3.JPG',
            'Portraits/portrait4.JPG'
        ];
    }
    if (category === 'Shooting') {
        return [
            'Shooting/shooting.JPG',
            'Shooting/shooting1.JPG',
            'Shooting/shooting2.JPG'
        ];
    }
    return [];
}