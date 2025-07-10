// Education page specific JavaScript

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

// Animate elements on scroll
document.addEventListener('DOMContentLoaded', function() {
    // Animate course categories
    const courseCategories = document.querySelectorAll('.course-category');
    courseCategories.forEach((category, index) => {
        category.style.opacity = '0';
        category.style.transform = 'translateY(30px)';
        category.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        observer.observe(category);
    });

    // Animate certification categories
    const certCategories = document.querySelectorAll('.cert-category');
    certCategories.forEach((category, index) => {
        category.style.opacity = '0';
        category.style.transform = 'translateY(30px)';
        category.style.transition = `opacity 0.6s ease ${index * 0.3}s, transform 0.6s ease ${index * 0.3}s`;
        observer.observe(category);
    });

    // Animate timeline items (already have CSS animation, but we can enhance)
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 300);
    });
});

// Add interactive effects to course items
document.addEventListener('DOMContentLoaded', function() {
    const courseItems = document.querySelectorAll('.course-item');
    
    courseItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f8f9fa';
            this.style.borderRadius = '10px';
            this.style.padding = '20px 15px';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
            this.style.borderRadius = '';
            this.style.padding = '20px 0';
        });
    });
});

// Add hover effects for certification items
document.addEventListener('DOMContentLoaded', function() {
    const certItems = document.querySelectorAll('.cert-item');
    
    certItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f8f9fa';
            this.style.borderRadius = '10px';
            this.style.padding = '20px 15px';
            this.style.margin = '0 -15px';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
            this.style.borderRadius = '';
            this.style.padding = '20px 0';
            this.style.margin = '';
        });
    });
});

// Timeline icon animation on scroll
window.addEventListener('scroll', function() {
    const timelineIcons = document.querySelectorAll('.timeline-icon');
    
    timelineIcons.forEach(icon => {
        const rect = icon.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top <= windowHeight * 0.8 && rect.bottom >= 0) {
            icon.style.animation = 'pulse 2s infinite';
        }
    });
});

// Add pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3); }
        50% { box-shadow: 0 15px 40px rgba(102, 126, 234, 0.5); }
        100% { box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3); }
    }
`;
document.head.appendChild(style);

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
