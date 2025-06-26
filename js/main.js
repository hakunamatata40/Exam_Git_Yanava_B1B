document.addEventListener('DOMContentLoaded', function() {
    // Menu Burger
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
    
    // Fermer le menu lorsqu'on clique sur un lien
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Initialiser l'état du header
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    }
    
    // Animations au scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    };
    
    // Observer les éléments avec IntersectionObserver pour de meilleures performances
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.animate').forEach(element => {
        observer.observe(element);
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Exécuter une fois au chargement
});

// Carrousel de véhicules
function initVehicleSlider() {
    const slides = document.querySelectorAll('.vehicle-slide');
    const dots = document.querySelectorAll('.slider-dot');
    let currentSlide = 0;
    
    if (slides.length === 0) return;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });
    
    // Auto-rotation
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 5000);
    
    // Afficher le premier slide
    showSlide(0);
}

// Carrousel de témoignages
function initTestimonialSlider() {
    const slides = document.querySelectorAll('.testimonial-slide');
    let currentSlide = 0;
    
    if (slides.length === 0) return;
    
    function showTestimonial(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
        currentSlide = index;
    }
    
    // Auto-rotation
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        showTestimonial(currentSlide);
    }, 7000);
    
    // Afficher le premier témoignage
    showTestimonial(0);
}

// Initialiser les carrousels lorsque la page est chargée
window.addEventListener('DOMContentLoaded', function() {
    initVehicleSlider();
    initTestimonialSlider();
    
    // Animation pour les éléments avec des délais
    document.querySelectorAll('.delay-1').forEach(el => {
        el.style.animationDelay = '0.3s';
    });
    
    document.querySelectorAll('.delay-2').forEach(el => {
        el.style.animationDelay = '0.6s';
    });
    
    document.querySelectorAll('.delay-3').forEach(el => {
        el.style.animationDelay = '0.9s';
    });
});

// Formulaire de contact
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Récupérer les valeurs du formulaire
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Ici, vous pourriez ajouter une validation et un envoi AJAX
        console.log('Formulaire soumis:', data);
        
        // Afficher un message de succès
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Merci pour votre message! Nous vous contacterons bientôt.';
        successMessage.style.backgroundColor = 'var(--primary-color)';
        successMessage.style.color = 'white';
        successMessage.style.padding = 'var(--space-md)';
        successMessage.style.borderRadius = 'var(--border-radius)';
        successMessage.style.marginTop = 'var(--space-md)';
        successMessage.style.textAlign = 'center';
        successMessage.style.animation = 'fadeIn 0.5s ease';
        
        contactForm.appendChild(successMessage);
        
        // Réinitialiser le formulaire après 3 secondes
        setTimeout(() => {
            contactForm.reset();
            successMessage.style.animation = 'fadeOut 0.5s ease';
            setTimeout(() => successMessage.remove(), 500);
        }, 3000);
    });
}

// Initialiser le formulaire de contact
document.addEventListener('DOMContentLoaded', initContactForm);