 // Initialize AOS animation library
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
        
        // Initialize typed.js for animated text
        new Typed('.typed-text', {
            strings: ["Full Stack Developer", "YouTuber", "Frontend Specialist", "Backend Developer", "Content Creator", "Software Engineer"],
            typeSpeed: 80,
            backSpeed: 50,
            loop: true,
            showCursor: true,
            cursorChar: '|',
            smartBackspace: true
        });
        
        // Dark mode toggle
        const themeToggle = document.getElementById('theme-toggle');
        const body = document.body;
        const icon = themeToggle.querySelector('i');
        
        // Check for saved theme preference
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme) {
            body.classList.add(currentTheme);
            if (currentTheme === 'dark-mode') {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
        }
        
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            if (body.classList.contains('dark-mode')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
                localStorage.setItem('theme', 'dark-mode');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
                localStorage.setItem('theme', '');
            }
        });
        
        // Sticky header on scroll
        window.addEventListener('scroll', function() {
            const header = document.querySelector('.header');
            header.classList.toggle('sticky', window.scrollY > 0);
            
            // Update active navigation link
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.header__link');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.clientHeight;
                
                if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
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
        const menuBtn = document.getElementById('menu-icon');
        const navbar = document.querySelector('.navbar');
        
        menuBtn.addEventListener('click', function() {
            navbar.classList.toggle('show');
            menuBtn.innerHTML = navbar.classList.contains('show') 
                ? '<span class="fas fa-times"></span>' 
                : '<span class="fas fa-bars"></span>';
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.header__link').forEach(link => {
            link.addEventListener('click', function() {
                navbar.classList.remove('show');
                menuBtn.innerHTML = '<span class="fas fa-bars"></span>';
            });
        });
        
        // Animate progress bars when skills section is in view
        const animateProgressBars = () => {
            const progressBars = document.querySelectorAll('.progress-bar');
            progressBars.forEach(bar => {
                const value = bar.getAttribute('aria-valuenow');
                bar.style.width = `${value}%`;
            });
        };
        
        // Use Intersection Observer to trigger progress bar animation
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateProgressBars();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        const skillsSection = document.querySelector('.skills');
        if (skillsSection) {
            observer.observe(skillsSection);
        }
        
        // CV Download function with loader
        function downloadCV() {
            const btn = document.querySelector('.download-btn .btn');
            const loader = document.getElementById('loader');
            
            btn.disabled = true;
            loader.style.display = 'block';
            btn.querySelector('span').textContent = 'Downloading...';
            
            // Simulate download (replace with actual download logic)
            setTimeout(() => {
                loader.style.display = 'none';
                btn.querySelector('span').textContent = 'Download Complete!';
                
                // Reset button after 2 seconds
                setTimeout(() => {
                    btn.querySelector('span').textContent = 'Download CV';
                    btn.disabled = false;
                }, 2000);
            }, 3000);
        }
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Form submission animation
        const overlay = document.querySelector('.overlay');
        const dots = Array.from(document.querySelectorAll('.dot'));
        
        const resetDots = () => {
            dots.forEach((dot, i) => {
                const x = (i / dots.length) * 240 - 25;
                const y = Math.random() * 50 - 25;
                dot.style.width = '50px';
                dot.style.height = '50px';
                dot.style.left = `${x}px`;
                dot.style.top = `${y}px`;
                dot.style.opacity = 1;
                dot.style.transform = 'scale(1)';
            });
        };
        
        overlay.addEventListener('click', () => {
            anime({
                targets: dots,
                opacity: [{ value: 0, duration: 600, delay: anime.stagger(10) }],
                translateX: () => anime.random(-30, 30),
                translateY: () => anime.random(-30, 30),
                scale: () => 0,
                duration: 400,
                delay: anime.stagger(10),
                easing: 'linear'
            });
            
            anime({
                delay: 4000,
                complete: () => {
                    document.querySelectorAll('.text').forEach(text => {
                        text.textContent = 'Submitted';
                    });
                    
                    setTimeout(() => {
                        document.querySelectorAll('.text').forEach(text => {
                            text.textContent = 'Submit';
                        });
                        resetDots();
                    }, 3000);
                }
            });
        });
        
        // Initialize dots position
        resetDots();
        
        // Portfolio filtering
        const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.port-container-box');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');
                
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
        
        // Testimonial slider
        $('.testimonial-slider').slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            dots: true,
            arrows: false,
            adaptiveHeight: true
        });
        
        // View more projects button
        const viewMoreBtn = document.getElementById('view-more-btn');
        const hiddenProjects = [
            {
                title: "University Management System",
                description: "Comprehensive system for managing university operations including student records, course scheduling, and faculty management.",
                category: "fullstack",
                image: "programmer-image/tasks/Screenshot (85).png"
            },
            {
                title: "React TypeScript Dashboard",
                description: "Advanced admin dashboard built with React and TypeScript featuring real-time analytics and customizable widgets.",
                category: "frontend",
                image: "programmer-image/tasks/Screenshot (86).png"
            }
        ];
        
        viewMoreBtn.addEventListener('click', () => {
            const portfolioContainer = document.querySelector('.port-container');
            
            hiddenProjects.forEach((project, index) => {
                const projectElement = document.createElement('div');
                projectElement.className = 'port-container-box';
                projectElement.setAttribute('data-aos', 'zoom-in');
                projectElement.setAttribute('data-aos-delay', `${index * 100}`);
                projectElement.setAttribute('data-category', project.category);
                
                projectElement.innerHTML = `
                    <div class="port-img-prg">
                        <img src="${project.image}" alt="${project.title}" loading="lazy">
                    </div>
                    <div class="port-body">
                        <div class="port-body-elements">
                            <h4>${project.title}</h4>
                            <p>${project.description}</p>
                            <div class="project-links">
                                <a href="#" class="ext-link" aria-label="Live demo"><i class="fas fa-external-link-alt"></i></a>
                                <a href="#" class="ext-link" aria-label="View code"><i class="fab fa-github"></i></a>
                            </div>
                        </div>
                    </div>
                `;
                
                portfolioContainer.appendChild(projectElement);
            });
            
            viewMoreBtn.style.display = 'none';
            AOS.refresh(); // Refresh animations for new elements
        });
        
        // Form submission
        const contactForm = document.querySelector('.form');
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(this);
            const formValues = Object.fromEntries(formData.entries());
            
            // Here you would typically send the form data to a server
            console.log('Form submitted:', formValues);
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            this.reset();
        });
