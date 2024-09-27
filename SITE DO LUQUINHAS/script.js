// Menu Responsivo - Mostra/Esconde menu em dispositivos móveis
document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');

    menuToggle.addEventListener('click', function () {
        navMenu.classList.toggle('show-menu');
    });
});

// Função para rolar suavemente para uma seção quando um link é clicado
const smoothScroll = () => {
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70, // Ajuste para compensar o cabeçalho fixo
                    behavior: 'smooth'
                });
            }
        });
    });
};
smoothScroll();

// Animações ao rolar a página (revelar seções ao chegar nelas)
const scrollReveal = () => {
    const sections = document.querySelectorAll('section');
    const windowHeight = window.innerHeight;

    const revealSection = () => {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < windowHeight - 150) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
    };

    window.addEventListener('scroll', revealSection);
};
scrollReveal();

// Mensagem de boas-vindas com Temporizador
const welcomeMessage = () => {
    setTimeout(() => {
        alert('Bem-vindo ao site da Ecocoleta! Explore nosso trabalho em reciclagem e sustentabilidade.');
    }, 2000); // Exibe a mensagem após 2 segundos
};
welcomeMessage();

// Validação de Formulário de Contato
const validateForm = () => {
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const errorMessage = document.querySelector('.error-message');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Previne o envio do formulário até validar os campos
        let isValid = true;

        // Validação do nome
        if (nameInput.value.trim() === '') {
            errorMessage.textContent = 'Por favor, insira seu nome.';
            isValid = false;
        }

        // Validação do email
        if (!validateEmail(emailInput.value)) {
            errorMessage.textContent = 'Por favor, insira um e-mail válido.';
            isValid = false;
        }

        // Validação da mensagem
        if (messageInput.value.trim() === '') {
            errorMessage.textContent = 'Por favor, escreva uma mensagem.';
            isValid = false;
        }

        if (isValid) {
            errorMessage.textContent = '';
            alert('Formulário enviado com sucesso!');
            form.reset(); // Limpa o formulário após o envio
        }
    });
};

// Função auxiliar para validar email
const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};
validateForm();

// Botão de voltar ao topo (scroll to top)
const backToTopButton = () => {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '⬆';
    backToTopBtn.classList.add('back-to-top');
    document.body.appendChild(backToTopBtn);

    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    };

    window.addEventListener('scroll', toggleVisibility);

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
};
backToTopButton();

// Carrossel de imagens automático (slideshow)
const imageCarousel = () => {
    const slides = document.querySelectorAll('.carousel-slide');
    let currentSlide = 0;

    const showSlide = (index) => {
        slides.forEach(slide => slide.style.display = 'none');
        slides[index].style.display = 'block';
    };

    const nextSlide = () => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    };

    showSlide(currentSlide); // Mostra o primeiro slide
    setInterval(nextSlide, 5000); // Troca de slide a cada 5 segundos
};
imageCarousel();

// Troca de temas (claro/escuro)
const themeToggle = () => {
    const themeButton = document.createElement('button');
    themeButton.innerHTML = '🌙'; // Ícone de lua
    themeButton.classList.add('theme-toggle');
    document.body.appendChild(themeButton);

    themeButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        themeButton.innerHTML = document.body.classList.contains('dark-theme') ? '☀️' : '🌙'; // Alterna o ícone
    });
};
themeToggle();

// Carregamento de Imagens com Lazy Load
const lazyLoadImages = () => {
    const images = document.querySelectorAll('img.lazy-load');

    const loadImage = (image) => {
        image.src = image.dataset.src;
        image.classList.remove('lazy-load');
    };

    const handleScroll = () => {
        images.forEach(image => {
            if (image.getBoundingClientRect().top < window.innerHeight) {
                loadImage(image);
            }
        });
    };

    window.addEventListener('scroll', handleScroll);
};
lazyLoadImages();

// Animações para botões ao passar o mouse
const buttonAnimations = () => {
    const buttons = document.querySelectorAll('.cta-button, #contact-form button');

    buttons.forEach(button => {
        button.addEventListener('mouseover', () => {
            button.style.transform = 'scale(1.1)';
        });

        button.addEventListener('mouseout', () => {
            button.style.transform = 'scale(1)';
        });
    });
};
buttonAnimations();

// Observador de Interseção para animação de elementos ao entrar na viewport
const intersectionObserverAnimations = () => {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            } else {
                entry.target.classList.remove('animate');
            }
        });
    }, { threshold: 0.1 });

    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach(element => observer.observe(element));
};
intersectionObserverAnimations();
