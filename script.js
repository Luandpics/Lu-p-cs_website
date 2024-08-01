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
            <form class="contact-form" action="mailto:Luka.pics9@gmail.com" method="post" enctype="text/plain">
                <label for="name">Nom</label>
                <input type="text" id="name" name="name" required>
                
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required>
                
                <label for="message">Message</label>
                <textarea id="message" name="message" rows="5" required></textarea>
                
                <button type="submit">Envoyer</button>
            </form>
            <div class="contact-info">
                <p>Mon numéro de téléphone : +33648137680</p>
                <p>Mon adresse email : Luka.pics9@gmail.com</p>
                <p>Seule cette adresse mail exacte vous répondra, toute autre est une arnaque!</p>
                <p>Suivez-moi sur les réseaux sociaux : <a href="https://www.instagram.com/luka_.pics/" target="_blank" class="insta-link">Instagram</a></p>
                <p><a href="#" onclick="showPage('faq')" class="faq-link">FAQ</a></p>
            </div>
        `;
        document.getElementById('nav-contact').classList.add('disabled');
        document.querySelector('.gallery').style.display = 'none';
    } else if (page === 'faq') {
        contentDiv.innerHTML = `
            <h2>Questions Fréquentes</h2>
            <div id="faq-list">
                <!-- Les questions et réponses les plus pertinentes seront affichées ici -->
            </div>
            <button id="show-all" class="button-common">Afficher tout</button>
            <button id="show-less" class="button-common" style="display:none;">Afficher moins</button>
            <h3>Posez une question</h3>
            <form id="question-form">
                <label for="question">Votre question :</label>
                <textarea id="question" name="question" rows="4" required></textarea>
                <button type="submit">Envoyer</button>
            </form>
        `;
        document.getElementById('nav-faq').classList.add('disabled');
        document.querySelector('.gallery').style.display = 'none';
        
        initializeFaq();
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

function openModal(src) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <span class="close">&times;</span>
        <img class="modal-content" src="${src}">
    `;
    document.body.appendChild(modal);

    const closeBtn = modal.querySelector('.close');
    closeBtn.onclick = () => {
        modal.remove();
    };
}

function initializeFaq() {
    const faqList = document.getElementById('faq-list');
    const questionForm = document.getElementById('question-form');
    const showAllButton = document.getElementById('show-all');
    const showLessButton = document.getElementById('show-less');

    const faqs = [
        {
            question: 'Comment puis-je vous contacter ?',
            answer: 'Vous pouvez me contacter via le <a href="#" onclick="showPage(\'contact\')" style="color: white;">formulaire de contact</a> de mon site.'
        },
        {
            question: 'Quels services proposez-vous ?',
            answer: 'Visite ma page galerie pour avoir une idée de ce que je fais!'
        },
        {
            question: 'Quels sont vos tarifs ?',
            answer: 'Mes tarifs varient en fonction des services. Contactez-moi directement pour obtenir un devis personnalisé.'
        }
    ];

    let displayedFaqs = [];

    function displayFaqs() {
        faqList.innerHTML = '';
        displayedFaqs.forEach(faq => {
            const faqItem = document.createElement('div');
            faqItem.classList.add('faq-item');
            faqItem.innerHTML = `
                <h3>${faq.question}</h3>
                <p>${faq.answer}</p>
                ${faq.answer === 'Réponse en attente...' ? '<button onclick="replyFaq(this)" class="button-common">Répondre</button>' : ''}
            `;
            faqList.appendChild(faqItem);
        });
    }

    function showAllFaqs() {
        displayedFaqs = faqs;
        displayFaqs();
        showAllButton.style.display = 'none';
        showLessButton.style.display = 'inline';
    }

    function showLessFaqs() {
        displayedFaqs = faqs.slice(0, 3); // Afficher les 3 questions les plus pertinentes
        displayFaqs();
        showLessButton.style.display = 'none';
        showAllButton.style.display = 'inline';
    }

    function replyFaq(button) {
        const faqItem = button.parentElement;
        const question = faqItem.querySelector('h3').textContent;
        const answerForm = document.createElement('form');
        answerForm.innerHTML = `
            <label for="answer">Votre réponse :</label>
            <textarea name="answer" rows="2" required></textarea>
            <button type="submit" class="button-common">Répondre</button>
        `;
        faqItem.appendChild(answerForm);

        answerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const answer = answerForm.querySelector('textarea').value;
            const faq = faqs.find(f => f.question === question);
            faq.answer = answer;
            displayFaqs();
        });
    }

    questionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newQuestion = document.getElementById('question').value;
        const newFaq = {
            question: newQuestion,
            answer: 'Réponse en attente...'
        };
        faqs.push(newFaq);
        displayedFaqs.push(newFaq);
        displayFaqs();
        questionForm.reset();
    });

    showAllButton.addEventListener('click', showAllFaqs);
    showLessButton.addEventListener('click', showLessFaqs);

    displayedFaqs = faqs.slice(0, 3); // Afficher les 3 questions les plus pertinentes
    displayFaqs();
}
