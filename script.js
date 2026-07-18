/**
 * Premium Portfolio Core Interactions Architecture
 * Vanilla JavaScript Engine
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initThemeEngine();
    initInteractiveGlow();
    initTypingEffect();
    initScrollAnimations();
    initProjectFilters();
    initTestimonialSlider();
    initContactFormValidator();
});

/* ==========================================================================
   Navigation Mechanics
   ========================================================================== */
function initNavigation() {
    const header = document.querySelector('.header');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTop = document.getElementById('back-to-top');
    const scrollProgress = document.getElementById('scroll-progress');

    // Sticky Nav & Scroll Tracker Metrics
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        // Dynamic top scroll loader tracking strip
        if (docHeight > 0) {
            const progress = (scrollY / docHeight) * 100;
            scrollProgress.style.width = `${progress}%`;
        }

        // Header glassmorphic transformation metrics triggers
        if (scrollY > 50) {
            header.classList.add('scrolled');
            backToTop.classList.add('show');
        } else {
            header.classList.remove('scrolled');
            backToTop.classList.remove('show');
        }

        // Dynamic Nav highlighters tracker system
        detectActiveSection();
    });

    // Mobile Navigation Controls toggle toggler
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile panels on nav mapping selected links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Top mechanics button execution anchor
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    function detectActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 120;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop;
            const sectionId = current.getAttribute('id');
            const targetLink = document.querySelector(`.nav-link[href*=${sectionId}]`);

            if (scrollPosition > sectionTop && scrollPosition <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (targetLink) targetLink.classList.add('active');
            }
        });
    }
}

/* ==========================================================================
   Light / Dark Mode State Engine
   ========================================================================== */
function initThemeEngine() {
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');
    
    // Check user ecosystem cache preferences
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateToggleIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
        updateToggleIcon(newTheme);
    });

    function updateToggleIcon(theme) {
        if (theme === 'light') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }
}

/* ==========================================================================
   Cursor Gradient Tracker Vector
   ========================================================================== */
function initInteractiveGlow() {
    const glow = document.getElementById('cursor-glow');
    if (!glow) return;

    window.addEventListener('mousemove', (e) => {
        // Run execution smoothly utilizing browser hardware acceleration vectors
        glow.style.left = `${e.clientX}px`;
        glow.style.top = `${e.clientY}px`;
    });
}

/* ==========================================================================
   Animated Typing Matrix
   ========================================================================== */
function initTypingEffect() {
    const target = document.getElementById('typing-text');
    const strings = ['Full Stack Developer.', 'UI/UX Engineer.', 'Problem Solver.'];
    let stringIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentString = strings[stringIdx];
        
        if (isDeleting) {
            target.textContent = currentString.substring(0, charIdx - 1);
            charIdx--;
            typeSpeed = 40; // Erase faster
        } else {
            target.textContent = currentString.substring(0, charIdx + 1);
            charIdx++;
            typeSpeed = 120;
        }

        if (!isDeleting && charIdx === currentString.length) {
            typeSpeed = 2000; // Freeze at completion
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            stringIdx = (stringIdx + 1) % strings.length;
            typeSpeed = 500; // Pause before restarting sequence
        }

        setTimeout(type, typeSpeed);
    }

    if (target) setTimeout(type, 1000);
}

/* ==========================================================================
   Scroll Intersection Observers Engine
   ========================================================================== */
function initScrollAnimations() {
    // Reveal Observer Configuration
    const revealOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // If it contains numerical statistics metrics, initialize ticker engines
                const stats = entry.target.querySelectorAll('.stat-num');
                if (stats.length > 0) {
                    stats.forEach(stat => animateStats(stat));
                }
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // Numerical incremental ticker calculation formulation
    function animateStats(el) {
        const target = parseInt(el.getAttribute('data-target'), 10);
        let current = 0;
        const duration = 1500; // 1.5s execution cycle
        const increment = target / (duration / 16); // ~60fps processing mappings

        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                el.textContent = target;
                clearInterval(counter);
            } else {
                el.textContent = Math.floor(current);
            }
        }, 16);
    }
}

/* ==========================================================================
   Project Ecosystem Filtering Engineering
   ========================================================================== */
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove previous active classes vectors
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });
}

/* ==========================================================================
   Glassmorphism Testimonials Slider Mechanics
   ========================================================================== */
function initTestimonialSlider() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dotsContainer = document.getElementById('slider-dots');
    if (slides.length === 0) return;

    let currentSlide = 0;
    let autoPlayInterval;

    // Build dynamic visual tracker elements
    slides.forEach((_, idx) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (idx === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(idx));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function goToSlide(idx) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        currentSlide = idx;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
        
        resetAutoplay();
    }

    function nextSlide() {
        let next = (currentSlide + 1) % slides.length;
        goToSlide(next);
    }

    function resetAutoplay() {
        clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(nextSlide, 6000); // Shift every 6 seconds
    }

    resetAutoplay();
}

/* ==========================================================================
   Form Input Validation Pipeline
   ========================================================================== */
function initContactFormValidator() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], textarea[required]');

        inputs.forEach(input => {
            if (!validateInput(input)) {
                isValid = false;
            }
        });

        const status = document.getElementById('form-status');
        const btnText = form.querySelector('.btn-text');
        
        if (isValid) {
            // Simulated asynchronous API network handshakes transmit pipeline
            btnText.textContent = "Transmitting...";
            form.querySelector('.form-btn').style.pointerEvents = "none";
            
            setTimeout(() => {
                status.className = "form-status success";
                status.textContent = "Signal successfully broadcasted. I'll connect shortly.";
                btnText.textContent = "Transmit Signal";
                form.querySelector('.form-btn').style.pointerEvents = "auto";
                form.reset();
                
                // Clear state indicators
                setTimeout(() => status.textContent = "", 5000);
            }, 1800);
        }
    });

    // Add immediate input tracking listeners
    form.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', () => {
            if (input.hasAttribute('required')) {
                validateInput(input);
            }
        });
    });

    function validateInput(input) {
        const group = input.parentElement;
        let isFieldValid = true;

        if (input.value.trim() === '') {
            isFieldValid = false;
        } else if (input.type === 'email') {
            // Regex compliance checks mapping criteria mapping
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isFieldValid = emailRegex.test(input.value.trim());
        }

        if (!isFieldValid) {
            group.classList.add('error');
            return false;
        } else {
            group.classList.remove('error');
            return true;
        }
    }
}