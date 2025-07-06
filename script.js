// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all functions
    initNavbar();
    initScrollAnimations();
    initContactForm();
    initPortfolioFilter();
    initTypingEffect();
    initProgressBars();
    initSmoothScrolling();
    
    // Navbar functionality
    function initNavbar() {
        const navbar = document.querySelector('.navbar');
        const navLinks = document.querySelectorAll('.nav-link');
        
        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
        // Active nav link highlighting
        window.addEventListener('scroll', function() {
            let current = '';
            const sections = document.querySelectorAll('section');
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
        
        // Mobile menu toggle
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        
        if (navbarToggler && navbarCollapse) {
            navbarToggler.addEventListener('click', function() {
                navbarCollapse.classList.toggle('show');
            });
            
            // Close mobile menu when clicking on a link
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    navbarCollapse.classList.remove('show');
                });
            });
        }
    }
    
    // Scroll animations
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .stat-card, .skill-item');
        animateElements.forEach(el => {
            observer.observe(el);
        });
    }
    
    // Contact form functionality
    function initContactForm() {
        const contactForm = document.querySelector('.contact-form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(contactForm);
                const name = contactForm.querySelector('input[type="text"]').value;
                const email = contactForm.querySelector('input[type="email"]').value;
                const subject = contactForm.querySelector('input[placeholder="Subject"]').value;
                const message = contactForm.querySelector('textarea').value;
                
                // Basic validation
                if (!name || !email || !subject || !message) {
                    showNotification('Please fill in all fields', 'error');
                    return;
                }
                
                if (!isValidEmail(email)) {
                    showNotification('Please enter a valid email address', 'error');
                    return;
                }
                
                // Simulate form submission
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
                submitBtn.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    showNotification('Thank you! Your message has been sent successfully.', 'success');
                    contactForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            });
        }
    }
    
    // Portfolio filter functionality
    function initPortfolioFilter() {
        const filterButtons = document.querySelectorAll('.portfolio-filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter portfolio items
                portfolioItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // Typing effect for hero section
    function initTypingEffect() {
        const heroTitle = document.querySelector('.hero-content h1');
        if (heroTitle) {
            const text = heroTitle.textContent;
            heroTitle.textContent = '';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    heroTitle.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                }
            };
            
            // Start typing effect after a delay
            setTimeout(typeWriter, 1000);
        }
    }
    
    // Progress bars animation
    function initProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar');
        
        const progressObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const width = progressBar.style.width;
                    progressBar.style.width = '0%';
                    
                    setTimeout(() => {
                        progressBar.style.width = width;
                    }, 500);
                }
            });
        }, { threshold: 0.5 });
        
        progressBars.forEach(bar => {
            progressObserver.observe(bar);
        });
    }
    
    // Smooth scrolling for navigation links
    function initSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Utility functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : '#dc3545'};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 9999;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }
    
    // Add loading animation to elements
    function addLoadingAnimation() {
        const elements = document.querySelectorAll('.service-card, .portfolio-item, .stat-card');
        
        elements.forEach((element, index) => {
            element.classList.add('loading');
            setTimeout(() => {
                element.classList.add('loaded');
            }, index * 200);
        });
    }
    
    // Initialize loading animation
    setTimeout(addLoadingAnimation, 500);
    
    // Add scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #007bff;
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add hover effect to scroll to top button
    scrollToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 8px 20px rgba(0,0,0,0.3)';
    });
    
    scrollToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
    });
    
    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        
        if (heroSection) {
            heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Add counter animation to stats
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-card h3');
        
        counters.forEach(counter => {
            const target = parseInt(counter.textContent);
            const increment = target / 100;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current) + (counter.textContent.includes('+') ? '+' : '');
                    setTimeout(updateCounter, 20);
                } else {
                    counter.textContent = target + (counter.textContent.includes('+') ? '+' : '');
                }
            };
            
            const counterObserver = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        counterObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            counterObserver.observe(counter);
        });
    }
    
    // Initialize counter animation
    setTimeout(animateCounters, 1000);
    
    // Add portfolio item click functionality
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            const projectTitle = this.querySelector('h5').textContent;
            const projectTech = this.querySelector('p').textContent;
            
            // Create modal for project details
            const modal = document.createElement('div');
            modal.className = 'portfolio-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <h3>${projectTitle}</h3>
                    <p><strong>Technologies:</strong> ${projectTech}</p>
                    <p>This is a detailed description of the project. You can add more information about the project, challenges faced, solutions implemented, and results achieved.</p>
                    <div class="modal-buttons">
                        <a href="#" class="btn btn-primary">View Live</a>
                        <a href="#" class="btn btn-outline-primary">View Code</a>
                    </div>
                </div>
            `;
            
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            document.body.appendChild(modal);
            
            setTimeout(() => {
                modal.style.opacity = '1';
            }, 100);
            
            // Close modal functionality
            const closeModal = () => {
                modal.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 300);
            };
            
            modal.querySelector('.close-modal').addEventListener('click', closeModal);
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    closeModal();
                }
            });
        });
    });
    
    // Add CSS for modal
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .portfolio-modal .modal-content {
            background: white;
            padding: 40px;
            border-radius: 15px;
            max-width: 500px;
            width: 90%;
            position: relative;
            transform: scale(0.8);
            transition: transform 0.3s ease;
        }
        
        .portfolio-modal.show .modal-content {
            transform: scale(1);
        }
        
        .close-modal {
            position: absolute;
            top: 15px;
            right: 20px;
            font-size: 24px;
            cursor: pointer;
            color: #666;
        }
        
        .close-modal:hover {
            color: #333;
        }
        
        .modal-buttons {
            margin-top: 20px;
        }
        
        .modal-buttons .btn {
            margin-right: 10px;
        }
    `;
    
    document.head.appendChild(modalStyles);
    
    // Add loading animation to modal
    setTimeout(() => {
        const modalContent = document.querySelector('.portfolio-modal .modal-content');
        if (modalContent) {
            modalContent.style.transform = 'scale(1)';
        }
    }, 100);
    
    console.log('Portfolio website initialized successfully!');
}); 