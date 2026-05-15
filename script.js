document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    const container = document.querySelector('.container');

    container.addEventListener('scroll', () => {
        if (container.scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Scroll-linked Opacity Effect
    const sections = document.querySelectorAll('.full-page');
    container.addEventListener('scroll', () => {
        window.requestAnimationFrame(() => {
            const containerCenter = container.clientHeight / 2;
            
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                const sectionCenter = rect.top + (rect.height / 2);
                const distanceFromCenter = Math.abs(containerCenter - sectionCenter);
                
                // Calculate opacity: 1 when perfectly centered, fading out as it moves away
                // TWEAK THIS: Change the 0.35 value below. 
                // A smaller number (e.g. 0.25) means it starts fading in LATER (closer to the center).
                // A larger number (e.g. 0.5) means it starts fading in EARLIER (at the edge of the screen).
                let opacity = 1 - Math.pow(distanceFromCenter / (container.clientHeight * 0.08), 2);
                opacity = Math.max(0, Math.min(1, opacity));
                
                const card = section.querySelector('.content');
                if (card) {
                    card.style.opacity = opacity;
                }
                
                const overlay = section.querySelector('.dark-overlay-scroll');
                if (overlay) {
                    overlay.style.opacity = opacity;
                }
            });
        });
    });
    
    // Trigger scroll event once on load to set initial opacities
    container.dispatchEvent(new Event('scroll'));

    // Mobile Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinksList = document.querySelector('.nav-links');
    
    if(hamburger) {
        hamburger.addEventListener('click', () => {
            navLinksList.classList.toggle('active');
            navbar.classList.toggle('menu-active');
        });
    }

    // Expandable Details Logic
    const expandBtns = document.querySelectorAll('.expand-btn');
    const closeBtns = document.querySelectorAll('.close-btn');
    const panels = document.querySelectorAll('.details-panel');

    expandBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetId = btn.getAttribute('data-target');
            const panel = document.getElementById(targetId);
            
            // Close any currently open panels
            panels.forEach(p => p.classList.remove('active'));
            
            if (panel) {
                panel.classList.add('active');
            }
        });
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const panel = btn.closest('.details-panel');
            if (panel) {
                panel.classList.remove('active');
            }
        });
    });

    // Close panel when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.details-panel') && !e.target.closest('.expand-btn')) {
            panels.forEach(p => p.classList.remove('active'));
        }
    });

    // Smooth Scrolling for Navigation Links within the snap container
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Mobile: if it's the experience dropdown link, toggle it
            if(link.classList.contains('dropbtn') && window.innerWidth <= 768) {
                e.preventDefault();
                link.parentElement.classList.toggle('active');
                return;
            }

            // Mobile: close menu after clicking a regular link
            if(window.innerWidth <= 768) {
                navLinksList.classList.remove('active');
                navbar.classList.remove('menu-active');
            }

            // Only handle hash links
            const href = link.getAttribute('href');
            if(href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});
