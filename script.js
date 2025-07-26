// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all animations and interactions
    initHeroAnimations();
    initScrollAnimations();
    initCounterAnimations();
    initChartAnimations();
    initParticleSystem();
    initSmoothScrolling();
    initNavigationEffects();
    initInteractiveElements();
    
});

// Hero Section Animations
function initHeroAnimations() {
    const tl = gsap.timeline();
    
    // Animate hero content
    tl.from('.hero-content h2 span:first-child', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out'
    })
    .from('.hero-content h2 span:last-child', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out'
    }, '-=0.8')
    .from('.hero-content p', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    }, '-=0.6')
    .from('.stat-item', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
    }, '-=0.4')
    .from('.cta-primary, .cta-secondary', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
    }, '-=0.4');
    
    // Animate floating elements
    gsap.to('.floating-element', {
        y: -30,
        duration: 6,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: 2
    });
    
    // Logo pulse animation
    gsap.to('.white-rose-logo svg', {
        scale: 1.05,
        duration: 2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
    });
}

// Scroll-triggered animations
function initScrollAnimations() {
    
    // Feature cards animation
    gsap.from('.feature-card', {
        scrollTrigger: {
            trigger: '.feature-card',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
    });
    
    // Performance stats animation
    gsap.from('.performance-stat', {
        scrollTrigger: {
            trigger: '.performance-stat',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
    });
    
    // Community section animations
    gsap.from('.community-feature', {
        scrollTrigger: {
            trigger: '.community-content',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        x: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
    });
    
    gsap.from('.platform-card', {
        scrollTrigger: {
            trigger: '.community-platforms',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        x: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
    });
    
    // About section animation
    gsap.from('.about-item', {
        scrollTrigger: {
            trigger: '#about',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
    });
}

// Counter animations
function initCounterAnimations() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        
        ScrollTrigger.create({
            trigger: counter,
            start: 'top 80%',
            onEnter: () => animateCounter(counter, target),
            onLeaveBack: () => resetCounter(counter)
        });
    });
}

function animateCounter(element, target) {
    const isDecimal = target.toString().includes('.');
    const duration = 2;
    
    gsap.to(element, {
        innerHTML: target,
        duration: duration,
        ease: 'power2.out',
        snap: isDecimal ? { innerHTML: 0.1 } : { innerHTML: 1 },
        onUpdate: function() {
            const value = parseFloat(this.targets()[0].innerHTML);
            if (isDecimal) {
                element.innerHTML = value.toFixed(1);
            } else if (target >= 1000000) {
                element.innerHTML = (value / 1000000).toFixed(1) + 'M';
            } else if (target >= 1000) {
                element.innerHTML = value.toLocaleString();
            } else {
                element.innerHTML = Math.round(value);
            }
        }
    });
}

function resetCounter(element) {
    element.innerHTML = '0';
}

// Chart animations
function initChartAnimations() {
    const chartBars = document.querySelectorAll('.chart-bar');
    
    ScrollTrigger.create({
        trigger: '.trading-chart',
        start: 'top 80%',
        onEnter: () => animateChart(chartBars),
        onLeaveBack: () => resetChart(chartBars)
    });
}

function animateChart(bars) {
    bars.forEach((bar, index) => {
        const height = bar.getAttribute('data-height');
        
        gsap.to(bar, {
            height: height + '%',
            duration: 1.5,
            delay: index * 0.1,
            ease: 'power3.out'
        });
    });
}

function resetChart(bars) {
    bars.forEach(bar => {
        gsap.set(bar, { height: '0%' });
    });
}

// Particle system
function initParticleSystem() {
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random positioning
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        
        document.body.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 4000);
    }
    
    // Create particles periodically
    setInterval(createParticle, 2000);
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                gsap.to(window, {
                    duration: 1.5,
                    scrollTo: {
                        y: target,
                        offsetY: 80
                    },
                    ease: 'power3.inOut'
                });
            }
        });
    });
    
    // Scroll indicator click
    document.querySelector('.scroll-indicator')?.addEventListener('click', function() {
        gsap.to(window, {
            duration: 1.5,
            scrollTo: {
                y: '#signals',
                offsetY: 80
            },
            ease: 'power3.inOut'
        });
    });
}

// Navigation effects
function initNavigationEffects() {
    const header = document.querySelector('header');
    
    ScrollTrigger.create({
        start: 'top -80',
        end: 99999,
        toggleClass: {className: 'scrolled', targets: header}
    });
    
    // Add scrolled class styling
    const style = document.createElement('style');
    style.textContent = `
        header.scrolled {
            background: rgba(0, 0, 0, 0.95) !important;
            backdrop-filter: blur(20px) !important;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2) !important;
        }
    `;
    document.head.appendChild(style);
}

// Interactive elements
function initInteractiveElements() {
    
    // CTA button effects
    document.querySelectorAll('.cta-primary, .cta-secondary').forEach(button => {
        button.addEventListener('mouseenter', function() {
            gsap.to(this, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        button.addEventListener('mouseleave', function() {
            gsap.to(this, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        button.addEventListener('click', function() {
            // Ripple effect
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                left: 50%;
                top: 50%;
                width: 20px;
                height: 20px;
                margin-left: -10px;
                margin-top: -10px;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Platform card interactions
    document.querySelectorAll('.platform-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this.querySelector('.platform-icon'), {
                rotation: 360,
                duration: 0.6,
                ease: 'power2.out'
            });
        });
    });
    
    // Feature card tilt effect
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            gsap.to(this, {
                rotationX: rotateX,
                rotationY: rotateY,
                duration: 0.3,
                transformPerspective: 1000,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                rotationX: 0,
                rotationY: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
    
    // Logo click effect
    document.querySelector('.white-rose-logo')?.addEventListener('click', function() {
        gsap.to(this.querySelector('svg'), {
            rotation: 360,
            scale: 1.2,
            duration: 0.8,
            ease: 'back.out(1.7)',
            onComplete: () => {
                gsap.set(this.querySelector('svg'), { rotation: 0 });
            }
        });
    });
}

// Add CSS for ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Mouse tracking for subtle parallax
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', function(e) {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    
    // Subtle parallax for floating elements
    gsap.to('.floating-element', {
        x: mouseX * 10,
        y: mouseY * 10,
        duration: 1,
        ease: 'power2.out'
    });
    
    // Parallax for hero background
    gsap.to('.bg-grid-pattern', {
        x: mouseX * 5,
        y: mouseY * 5,
        duration: 1,
        ease: 'power2.out'
    });
});

// Window resize handler
window.addEventListener('resize', function() {
    ScrollTrigger.refresh();
});

// Performance optimization - reduce animations on mobile
if (window.innerWidth < 768) {
    // Disable some heavy animations on mobile
    gsap.set('.floating-element', { display: 'none' });
    gsap.set('.bg-grid-pattern', { animation: 'none' });
}

// Preloader (if needed)
window.addEventListener('load', function() {
    // Hide any loading screens
    document.body.classList.add('loaded');
    
    // Refresh ScrollTrigger after everything is loaded
    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 100);
});

// Custom cursor effect (optional)
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: rgba(255, 255, 255, 0.8);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        transition: transform 0.1s ease;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', function(e) {
        gsap.to(cursor, {
            x: e.clientX - 10,
            y: e.clientY - 10,
            duration: 0.1
        });
    });
    
    // Scale cursor on hover over interactive elements
    document.querySelectorAll('button, a, .feature-card, .platform-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(cursor, { scale: 2, duration: 0.3 });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(cursor, { scale: 1, duration: 0.3 });
        });
    });
}

// Initialize custom cursor only on desktop
if (window.innerWidth > 1024) {
    initCustomCursor();
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close any modals or overlays
    }
    
    if (e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        const nextSection = document.querySelector('#signals');
        if (nextSection) {
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: nextSection,
                    offsetY: 80
                },
                ease: 'power3.inOut'
            });
        }
    }
});