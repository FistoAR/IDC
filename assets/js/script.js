document.addEventListener('DOMContentLoaded', () => {
    const carouselItems = document.querySelectorAll('.slide');

    const nextBtn = document.getElementById('nxt-slide');
    const prevBtn = document.getElementById('prev-slide');

    let currentIndex = 0;

    const backgroundImages = [
        'url("assets/images/shareanywheremain.webp")',
        'url("assets/images/hotspotmain.webp")',
        'url("assets/images/immersivemain.webp")',
        'url("assets/images/librarymain.webp")',
        'url("assets/images/360degreemain.webp")',
        'url("assets/images/ARanimmain.webp")',
        'url("assets/images/3danimain.webp")',
        'url("assets/images/2danimmain.webp")',
        'url("assets/images/brandidentitymain.webp")',
        'url("assets/images/Productselectionmain.webp")',
    ];

    const updateCarousel = () => {
        carouselItems.forEach((item, index) => {
            item.style.transitionDelay = ''; 
            item.style = ''; 

            if (index === currentIndex) {
                item.style.transform = 'translate(0, 0) scale(1) rotate(0)';
                item.style.zIndex = '3'; 
            } else if (index === (currentIndex - 1 + carouselItems.length) % carouselItems.length) {
                item.style.transform = 'translateX(-22%) rotate3d(0, 1, -0.06, 48deg) scale(0.9)';
                item.style.zIndex = '2';
            } else if (index === (currentIndex + 1) % carouselItems.length) {
                item.style.transform = 'translateX(22%) rotate3d(0, 1, 0.06, 48deg) scale(0.9)';
                item.style.zIndex = '2';
            } else if (index === (currentIndex - 2 + carouselItems.length) % carouselItems.length) {
                item.style.transform = 'translateX(-33%) translateY(1%) rotate3d(0, 1, -0.09, 58deg) scale(0.8)';
                item.style.zIndex = '1';
            } else if (index === (currentIndex + 2) % carouselItems.length) {
                item.style.transform = 'translateX(33%) translateY(1%) rotate3d(0, 1, 0.09, 58deg) scale(0.8)';
                item.style.zIndex = '1';
            }
        });

        const backgroundImageElement = document.querySelector('.background-image');
        backgroundImageElement.style.backgroundImage = backgroundImages[currentIndex];
    };

    const nextSlide = () => {
        currentIndex = (currentIndex + 1) % carouselItems.length;
        updateCarousel(); 
    };

    const prevSlide = () => {
        currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
        updateCarousel(); 
    };

    nextBtn.addEventListener('click', () => {
        nextSlide(); 
    });

    prevBtn.addEventListener('click', () => {
        prevSlide(); 
    });

    let startX = 0;
    let isDragging = false;

    document.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
    });

    document.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        isDragging = false;
        let diff = e.clientX - startX;

        if (diff > 50) {
            prevSlide(); 
        } else if (diff < -50) {
            nextSlide(); 
        }
    });

    // Add smooth scroll transition to the slides
    const addCSS = () => {
        const style = document.createElement('style');
        style.innerHTML = `
            .slide {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: auto;
                transition: transform 0.5s ease-in-out; /* Smooth transition for scrolling */
                z-index: 1;
            }
        `;
        document.head.appendChild(style);
    };

    addCSS();
    updateCarousel(); 
});
