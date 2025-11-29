// 1. Artwork Configuration
// Data array containing all artwork details, including correct filenames and medium
const artworks = [
    { filename: 'benedict.jpeg', title: 'Benedict Cumberbatch', medium: 'Color Pencil portrait drawing on Ivory sheet', dateCreated: 'November 2025' },
    { filename: 'captain.jpeg', title: 'Captain America', medium: 'Color Pencil portrait drawing on Ivory sheet', dateCreated: 'December 2022' },
    { filename: 'captainmarvel.jpeg', title: 'Captain Marvel', medium: 'Color Pencil portrait drawing on Ivory sheet', dateCreated: 'March 2023' },
    { filename: 'daredevil.jpeg', title: 'Daredevil', medium: 'Color Pencil on Bristol Board', dateCreated: 'July 2025' },
    { filename: 'flash.jpeg', title: 'The Flash', medium: 'Color Pencil portrait drawing on Ivory sheet', dateCreated: 'May 2023' },
    { filename: 'homelander.jpeg', title: 'Homelander', medium: 'Color Pencil portrait drawing on Ivory sheet', dateCreated: 'May 2025' },
    { filename: 'johnshelby.jpeg', title: 'John Shelby (Peaky Blinders)', medium: 'Color Pencil portrait drawing on Ivory sheet', dateCreated: 'January 2025' },
    { filename: 'leomessi.jpeg', title: 'Lionel Messi', medium: 'Color Pencil portrait drawing on Ivory sheet', dateCreated: 'March 2024' },
    { filename: 'martha.jpeg', title: 'Martha', medium: 'Color Pencil portrait drawing on Ivory sheet', dateCreated: 'May 2025' },
    { filename: 'melisandre.jpeg', title: 'Melisandre', medium: 'Color Pencil portrait drawing on Ivory sheet', dateCreated: 'August 2025' },
    { filename: 'tony.jpeg', title: 'Tony Stark', medium: 'Color Pencil portrait drawing on Ivory sheet', dateCreated: 'April 2023' },
    { filename: 'wolverine.jpeg', title: 'Wolverine', medium: 'Color Pencil portrait drawing on Ivory sheet', dateCreated: 'July 2024' }
];

const container = document.getElementById('artwork-container');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lbTitle = document.getElementById('lb-title');
const lbMedium = document.getElementById('lb-medium');
const lbDate = document.getElementById('lb-date'); 
let currentIndex = 0;

// --- LIVE WALLPAPER LOGIC ---
const bgContainer = document.getElementById('live-background');
const backgroundImages = [
    // Using abstract, dark artistic images from a free open source (Unsplash/Pexels)
    // NOTE: Replace these URLs with your own self-hosted images for production.
    'https://images.unsplash.com/photo-1549492437-d5a2b1329a27?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&h=1080', 
    'https://images.unsplash.com/photo-1518606471813-c9012431268b?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&h=1080', 
    'https://images.unsplash.com/photo-1563228741-6e3e5c9b60d0?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&h=1080', 
    'https://images.unsplash.com/photo-1582268482596-f36611585800?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&h=1080'
];
let currentBgIndex = 0;

function changeBackground() {
    // Cycles through the images and sets the new background-image style
    const nextImage = backgroundImages[currentBgIndex];
    bgContainer.style.backgroundImage = `url('${nextImage}')`;
    
    // Move to the next index, looping back to 0
    currentBgIndex = (currentBgIndex + 1) % backgroundImages.length;
}
// Set interval for changing the background every 10 seconds (10000 milliseconds)
setInterval(changeBackground, 10000); 
// ----------------------------


// 2. Render Gallery
function loadGallery() {
    artworks.forEach((art, index) => {
        const item = document.createElement('div');
        item.classList.add('art-item');
        item.innerHTML = `
            <div class="frame">
                <img src="assets/drawings/${art.filename}" alt="${art.title}" loading="lazy">
            </div>
            <div class="art-overlay">
                <div class="art-title">${art.title}</div>
            </div>
        `;
        
        // Open Lightbox on Click
        item.addEventListener('click', () => openLightbox(index));
        container.appendChild(item);
    });
    
    // Trigger animations after elements are added
    animateGallery();
}

// 3. Lightbox Functions
function openLightbox(index) {
    currentIndex = index;
    updateLightboxContent();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; 
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function updateLightboxContent() {
    const art = artworks[currentIndex];
    lightboxImg.src = `assets/drawings/${art.filename}`; 
    lbTitle.textContent = art.title;
    lbMedium.textContent = art.medium;
    lbDate.textContent = art.dateCreated;
}

// Navigation (Button and Keypad logic)
document.querySelector('.next').addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % artworks.length;
    updateLightboxContent();
});

document.querySelector('.prev').addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + artworks.length) % artworks.length;
    updateLightboxContent();
});

document.querySelector('.close-lightbox').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    if(e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') document.querySelector('.next').click();
    if (e.key === 'ArrowLeft') document.querySelector('.prev').click();
});

// 4. GSAP Animations 
gsap.registerPlugin(ScrollTrigger);

window.onload = () => {
    // Hide loading overlay
    const loader = document.querySelector('.loader');
    gsap.to(loader, { opacity: 0, duration: 1, onComplete: () => loader.style.display = 'none' });

    // Start the live background change immediately
    changeBackground(); 

    // Hero Text Animation
    gsap.from(".hero h1", {
        y: 100, opacity: 0, duration: 1.5, ease: "power4.out", delay: 0.5
    });
    gsap.from(".subtitle", {
        y: 50, opacity: 0, duration: 1.5, ease: "power4.out", delay: 0.8
    });

    loadGallery();
};

function animateGallery() {
    gsap.utils.toArray('.art-item').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 85%",
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    });
}
