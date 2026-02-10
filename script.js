document.addEventListener('DOMContentLoaded', () => {

    const track = document.querySelector('.carousel-track');
    const slides = track ? Array.from(track.children) : [];
    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.prev');
    
    if (!track || slides.length === 0) return;

    let currentIndex = 0;
    let autoSlideInterval;

    const updateCarousel = (index) => {
        track.style.transform = `translateX(-${index * 100}%)`;
    };

    const startAutoSlide = () => {
        stopAutoSlide(); 
        autoSlideInterval = setInterval(() => {
            moveNext();
        }, 7000);
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

    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.desktop-nav');

    menuToggle?.addEventListener('click', () => {
        nav.classList.toggle('mobile-active');
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