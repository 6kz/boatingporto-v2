document.addEventListener('DOMContentLoaded', () => {

    // --- CAROUSEL CONTROLLER ---
    const track = document.querySelector('.carousel-track');
    const slides = track ? Array.from(track.children) : [];
    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.prev');
    
    if (track && slides.length > 0) {
        let currentIndex = 0;
        let autoSlideInterval;

        const updateCarousel = (index) => {
            track.style.transform = `translateX(-${index * 100}%)`;
        };

        const startAutoSlide = () => {
            stopAutoSlide(); 
            autoSlideInterval = setInterval(moveNext, 6000);
        };

        const stopAutoSlide = () => {
            if (autoSlideInterval) clearInterval(autoSlideInterval);
        };

        const moveNext = () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateCarousel(currentIndex);
        };

        const movePrev = () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateCarousel(currentIndex);
        };

        nextButton?.addEventListener('click', () => {
            moveNext();
            startAutoSlide(); 
        });

        prevButton?.addEventListener('click', () => {
            movePrev();
            startAutoSlide(); 
        });

        track.addEventListener('mouseenter', stopAutoSlide);
        track.addEventListener('mouseleave', startAutoSlide);

        startAutoSlide();
    }

    // --- SMOOTH SCROLL COM COMPENSAÇÃO DE HEADER ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === "#") return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = document.querySelector('header').offsetHeight || 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                // Fechar menu mobile se um link for clicado
                const nav = document.querySelector('.desktop-nav');
                const menuToggle = document.querySelector('.menu-toggle');
                if(nav?.classList.contains('mobile-active')) {
                    nav.classList.remove('mobile-active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- MENU MOBILE CORRIGIDO (Via Classes CSS) ---
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.desktop-nav');

    menuToggle?.addEventListener('click', () => {
        const isActive = nav.classList.toggle('mobile-active');
        menuToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
        menuToggle.textContent = isActive ? '✕' : '☰'; // Muda o ícone de hambúrguer para um X
    });
});