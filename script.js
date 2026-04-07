const hamburger = document.querySelector('.hamburger');

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
  setupSmoothScrolling();
  setupNavbarScroll();
}

function setupEventListeners() {
  hamburger.addEventListener('click', toggleMobileMenu);
  
  navLinks.forEach(link => {
    link.addEventListener('click', handleNavLinkClick);
  });
}

function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
}

function setupNavbarScroll() {
  let lastScrollTop = 0;
  const navbar = document.querySelector('.navbar');
    
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        navbar.style.transform = 'translateY(-100%)';
      } else {
          navbar.style.transform = 'translateY(0)';
        }
        
        if (scrollTop > 50) {
          navbar.style.background = 'rgba(44, 62, 80, 0.95)';
          navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'linear-gradient(135deg, var(--primary-color), #34495e)';
            navbar.style.backdropFilter = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
}

function handleNavLinkClick() {
    // Close mobile menu when a link is clicked
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
    
    // Update active state
    navLinks.forEach(link => link.classList.remove('active'));
    this.classList.add('active');
}

function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}