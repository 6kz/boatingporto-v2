document.addEventListener('DOMContentLoaded', () => {
    // 1. Cookies Logic
    document.addEventListener('DOMContentLoaded', () => {
    const cookieBanner = document.querySelector('.cookie-banner');
    const acceptButton = document.querySelector('#accept-cookies');

    // 1. Verificar se já existe consentimento no navegador
    const hasAccepted = localStorage.getItem('boating_porto_cookies');

    if (!hasAccepted) {
        // Mostra o banner com um pequeno delay para ser mais natural
        setTimeout(() => {
            cookieBanner.style.display = 'block';
            // Trigger para a animação do CSS
            setTimeout(() => cookieBanner.classList.add('active'), 10);
        }, 1000);
    }

    // 2. Lógica ao clicar em Aceitar
    if (acceptButton) {
        acceptButton.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Animação de saída
            cookieBanner.classList.remove('active');
            
            // Grava a decisão e remove o elemento após a animação
            setTimeout(() => {
                cookieBanner.remove();
                localStorage.setItem('boating_porto_cookies', 'true');
            }, 400);
        });
    }

    // 2. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.desktop-nav');

    menuToggle?.addEventListener('click', () => {
        nav.classList.toggle('mobile-active');
    });

    // 3. Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === "#") return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Fecha menu mobile ao clicar num link
                nav.classList.remove('mobile-active');
            }
        });
    });
});