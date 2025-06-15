// SyntaxSmith Main JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme
    initTheme();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize code syntax highlighting
    highlightCode();
    
    // Initialize testimonial slider
    initTestimonialSlider();
});

// Theme Toggling
function initTheme() {
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Set initial theme based on user preference or localStorage
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
    
    // Toggle theme when button is clicked
    themeToggle?.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// Mobile Menu
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    
    // Clone navigation and append to mobile menu
    const navList = document.querySelector('.nav-list')?.cloneNode(true);
    
    if (navList) {
        mobileMenu.appendChild(navList);
        document.body.appendChild(mobileMenu);
        
        // Toggle mobile menu
        mobileMenuToggle?.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('open');
            mobileMenu.classList.toggle('open');
            document.body.classList.toggle('no-scroll');
        });
        
        // Close menu when clicking on a link
        mobileMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('open');
                mobileMenu.classList.remove('open');
                document.body.classList.remove('no-scroll');
            });
        });
    }
}

// Scroll Animations
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.reveal-on-scroll, .feature-card, .course-card');
    
    // Initial check for elements in viewport
    animateElementsInView();
    
    // Check on scroll
    window.addEventListener('scroll', debounce(animateElementsInView, 20));
    
    function animateElementsInView() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = window.innerHeight * 0.8;
            
            if (elementTop < elementVisible) {
                if (element.classList.contains('reveal-on-scroll')) {
                    element.classList.add('revealed');
                } else {
                    element.classList.add('in-view');
                }
            }
        });
    }
    
    // Debounce helper function
    function debounce(func, delay) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), delay);
        };
    }
}

// Code Syntax Highlighting
function highlightCode() {
    document.querySelectorAll('code').forEach(codeBlock => {
        // Simple syntax highlighting
        if (codeBlock.classList.contains('language-javascript')) {
            const text = codeBlock.textContent;
            
            // Replace with highlighted HTML
            codeBlock.innerHTML = text
                .replace(/(\/\/.*)/g, '<span class="comment">$1</span>')
                .replace(/\b(const|let|var|function|return|if|else|for|while|class)\b/g, '<span class="keyword">$1</span>')
                .replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g, '<span class="function">$1</span>(')
                .replace(/(".*?"|'.*?'|`.*?`)/g, '<span class="string">$1</span>');
                
            // Add typing animation to the first code block
            const editorContent = document.querySelector('.editor-content');
            if (editorContent && editorContent.contains(codeBlock)) {
                setTimeout(() => {
                    const lines = codeBlock.innerHTML.split('\n');
                    if (lines.length > 2) {
                        // Highlight a specific line for emphasis
                        const randomLineIndex = Math.floor(Math.random() * (lines.length - 2)) + 1;
                        const parts = codeBlock.innerHTML.split('\n');
                        parts[randomLineIndex] = `<span class="highlight-animation">${parts[randomLineIndex]}</span>`;
                        codeBlock.innerHTML = parts.join('\n');
                    }
                }, 2000);
            }
        }
    });
}

// Testimonial Slider
function initTestimonialSlider() {
    const slider = document.querySelector('.testimonials-slider');
    const cards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.slide-dots .dot');
    const prevButton = document.querySelector('.prev-slide');
    const nextButton = document.querySelector('.next-slide');
    
    if (!slider || cards.length === 0) return;
    
    let currentIndex = 0;
    
    // Display only the current testimonial
    function showTestimonial(index) {
        cards.forEach((card, i) => {
            card.style.display = i === index ? 'block' : 'none';
            // Reset animation and reapply
            card.style.animation = 'none';
            card.offsetHeight; // Trigger reflow
            card.style.animation = '';
        });
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
    
    // Initialize with first testimonial
    showTestimonial(0);
    
    // Event listeners for navigation
    prevButton?.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        showTestimonial(currentIndex);
    });
    
    nextButton?.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % cards.length;
        showTestimonial(currentIndex);
    });
    
    // Dot navigation
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            currentIndex = i;
            showTestimonial(currentIndex);
        });
    });
    
    // Auto advance slider
    let sliderInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % cards.length;
        showTestimonial(currentIndex);
    }, 5000);
    
    // Pause auto-advance on hover
    slider.addEventListener('mouseenter', () => {
        clearInterval(sliderInterval);
    });
    
    slider.addEventListener('mouseleave', () => {
        sliderInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % cards.length;
            showTestimonial(currentIndex);
        }, 5000);
    });
}

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Form Validation
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Simple validation example
        const emailInput = this.querySelector('input[type="email"]');
        if (emailInput && !isValidEmail(emailInput.value)) {
            // Show error
            const errorMsg = document.createElement('p');
            errorMsg.className = 'error-message';
            errorMsg.textContent = 'Please enter a valid email address.';
            
            // Remove existing error messages
            const existingError = emailInput.parentNode.querySelector('.error-message');
            if (existingError) existingError.remove();
            
            emailInput.parentNode.appendChild(errorMsg);
            emailInput.classList.add('error');
            return;
        }
        
        // Success state
        if (this.classList.contains('newsletter-form')) {
            const button = this.querySelector('button');
            const originalText = button.textContent;
            button.textContent = 'Subscribed!';
            button.classList.add('success');
            
            setTimeout(() => {
                button.textContent = originalText;
                button.classList.remove('success');
                this.reset();
            }, 2000);
        }
    });
});

// Email validation helper
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
} 