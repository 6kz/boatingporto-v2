document.addEventListener('DOMContentLoaded', () => {

    // --- 1. LÓGICA DO CARROSSEL ---
    const track = document.querySelector('.carousel-track');
    if (track) {
        const slides = Array.from(track.children);
        const nextButton = document.querySelector('.next');
        const prevButton = document.querySelector('.prev');
        let currentIndex = 0;

        const updateCarousel = (index) => {
            track.style.transform = `translateX(-${index * 100}%)`;
        };

        nextButton?.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateCarousel(currentIndex);
        });

        prevButton?.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateCarousel(currentIndex);
        });

        // Auto-play a cada 6 segundos
        setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateCarousel(currentIndex);
        }, 6000);
    }

    // --- 2. SCROLL SUAVE ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === "#") return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 85;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 3. MENU MOBILE TOGGLE ---
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.desktop-nav');

    menuToggle?.addEventListener('click', () => {
        nav.classList.toggle('mobile-active');
        // Adicionar estilo inline se necessário para override rápido
        if(nav.classList.contains('mobile-active')) {
            nav.style.display = 'flex';
            nav.style.flexDirection = 'column';
            nav.style.position = 'absolute';
            nav.style.top = '100%';
            nav.style.left = '0';
            nav.style.width = '100%';
            nav.style.background = '#fff';
            nav.style.padding = '30px';
            nav.style.borderBottom = '1px solid #eee';
        } else {
            nav.style.display = 'none';
        }
    });
});