// About page specific JavaScript

// Card Slideshow functionality
let currentSlide = 0;
let slideInterval;
const totalSlides = 5;
let isUserScrolling = false;

function showSlide(index) {
    const scrollContainer = document.querySelector('.scroll-container');
    const dots = document.querySelectorAll('.dot');
    
    if (!scrollContainer || !dots.length) return;
    
    // Calculate card width and gap based on screen size
    let cardWidth = 320;
    let gap = 24;
    let padding = 40; // Account for wrapper padding
    
    if (window.innerWidth <= 480) {
        cardWidth = 250;
        padding = 20;
    } else if (window.innerWidth <= 768) {
        cardWidth = 280;
        padding = 30;
    } else if (window.innerWidth <= 1024) {
        cardWidth = 300;
        padding = 30;
    }
    
    // Scroll to the selected card
    const scrollPosition = (index * (cardWidth + gap)) + (index > 0 ? padding : 0);
    scrollContainer.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
    });
    
    // Update dots
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[index]) {
        dots[index].classList.add('active');
    }
    
    currentSlide = index;
}

function updateSlideFromScroll() {
    const scrollContainer = document.querySelector('.scroll-container');
    if (!scrollContainer || isUserScrolling) return;
    
    const scrollLeft = scrollContainer.scrollLeft;
    let cardWidth = 320;
    let gap = 24;
    
    if (window.innerWidth <= 480) {
        cardWidth = 250;
    } else if (window.innerWidth <= 768) {
        cardWidth = 280;
    } else if (window.innerWidth <= 1024) {
        cardWidth = 300;
    }
    
    // Calculate which card is most visible
    const newSlide = Math.round(scrollLeft / (cardWidth + gap));
    const clampedSlide = Math.max(0, Math.min(newSlide, totalSlides - 1));
    
    if (clampedSlide !== currentSlide) {
        currentSlide = clampedSlide;
        const dots = document.querySelectorAll('.dot');
        dots.forEach(dot => dot.classList.remove('active'));
        if (dots[currentSlide]) {
            dots[currentSlide].classList.add('active');
        }
    }
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function startSlideshow() {
    slideInterval = setInterval(nextSlide, 3000); // Change slide every 3 seconds
}

function stopSlideshow() {
    if (slideInterval) {
        clearInterval(slideInterval);
    }
}

// Initialize slideshow when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set up dot click handlers
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            stopSlideshow();
            isUserScrolling = true;
            showSlide(index);
            setTimeout(() => {
                isUserScrolling = false;
                startSlideshow(); // Restart the slideshow
            }, 1000);
        });
    });
    
    // Set up scroll event listener
    const scrollContainer = document.querySelector('.scroll-container');
    if (scrollContainer) {
        let scrollTimeout;
        scrollContainer.addEventListener('scroll', function() {
            isUserScrolling = true;
            stopSlideshow();
            
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                updateSlideFromScroll();
                isUserScrolling = false;
                startSlideshow();
            }, 150);
        });
        
        // Pause slideshow on hover
        scrollContainer.addEventListener('mouseenter', stopSlideshow);
        scrollContainer.addEventListener('mouseleave', function() {
            if (!isUserScrolling) {
                startSlideshow();
            }
        });
    }
    
    // Start the slideshow
    showSlide(0);
    startSlideshow();
});

// Handle window resize
window.addEventListener('resize', function() {
    showSlide(currentSlide); // Recalculate position on resize
});

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
