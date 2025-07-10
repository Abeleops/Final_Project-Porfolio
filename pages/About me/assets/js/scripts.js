// About page specific JavaScript

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate cards on scroll
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.detail-card, .skill-category');
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });

    // Animate personal content
    const personalContent = document.querySelector('.personal-content');
    if (personalContent) {
        personalContent.style.opacity = '0';
        personalContent.style.transform = 'translateY(20px)';
        personalContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(personalContent);
    }
});

// Add hover effects for skill items
document.addEventListener('DOMContentLoaded', function() {
    const skillItems = document.querySelectorAll('.skill-category li');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
            this.style.color = '#667eea';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.color = '';
        });
    });
});

// Smooth scroll enhancement for internal links
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
