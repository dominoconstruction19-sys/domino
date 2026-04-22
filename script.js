// ===== DOMINO CONSTRUCTION v2.0 — JavaScript =====

// Navigation scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    document.querySelector('.nav-actions').classList.toggle('active');
});

// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        document.querySelector('.nav-actions').classList.remove('active');
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-link[href="#${id}"]`);
        if (link) {
            link.classList.toggle('active', scrollY >= top && scrollY < top + height);
        }
    });
});

// Animate on scroll (Intersection Observer)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

// Counter animation
const counters = document.querySelectorAll('.stat-number');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.count);
            let current = 0;
            const step = target / 60;
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    el.textContent = target;
                    clearInterval(timer);
                } else {
                    el.textContent = Math.floor(current);
                }
            }, 30);
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });
counters.forEach(c => counterObserver.observe(c));

// Service cards expand/collapse
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', () => {
        const wasActive = card.classList.contains('active');
        document.querySelectorAll('.service-card').forEach(c => c.classList.remove('active'));
        if (!wasActive) card.classList.add('active');
    });
});

// Calculator
document.getElementById('calcBtn').addEventListener('click', () => {
    const type = document.getElementById('calcType').value;
    const size = parseInt(document.getElementById('calcSize').value) || 0;
    const condition = document.getElementById('calcCondition').value;
    const result = document.getElementById('calcResult');

    if (!type || !size) {
        result.innerHTML = '<div class="calc-result-inner"><div class="calc-icon"><i class="fas fa-exclamation-triangle"></i></div><p>Please select a project type and enter the size</p></div>';
        return;
    }

    // Base rates per sq ft (CAD, Toronto 2026)
    const rates = {
        painting: { light: 4, medium: 7, full: 12 },
        bathroom: { light: 80, medium: 150, full: 250 },
        kitchen: { light: 60, medium: 120, full: 200 },
        basement: { light: 30, medium: 55, full: 90 },
        flooring: { light: 8, medium: 14, full: 22 },
        plumbing: { light: 40, medium: 80, full: 150 },
        landscaping: { light: 15, medium: 30, full: 60 },
        commercial: { light: 25, medium: 50, full: 90 },
        drywall: { light: 5, medium: 10, full: 18 },
        deck: { light: 25, medium: 45, full: 75 }
    };

    const names = {
        painting: 'Interior Painting', bathroom: 'Bathroom Renovation', kitchen: 'Kitchen Renovation',
        basement: 'Basement Finishing', flooring: 'Flooring Installation', plumbing: 'Plumbing Work',
        landscaping: 'Landscaping', commercial: 'Commercial Fit-Out', drywall: 'Drywall Work', deck: 'Deck / Patio'
    };

    const rate = rates[type][condition];
    const low = Math.round(rate * size * 0.85 / 100) * 100;
    const high = Math.round(rate * size * 1.15 / 100) * 100;

    result.innerHTML = `
        <div class="calc-result-inner">
            <div class="calc-icon"><i class="fas fa-calculator"></i></div>
            <p style="font-size:13px;color:#999;text-transform:uppercase;letter-spacing:1px">${names[type]} — ${size} sq ft</p>
            <div class="estimate-range">$${low.toLocaleString()} — $${high.toLocaleString()}</div>
            <p class="estimate-note">This is a rough estimate. For an accurate quote,<br><a href="#contact" style="color:#c9a84c">contact us for a free on-site assessment</a>.</p>
            <div style="margin-top:20px">
                <a href="tel:+14375250565" class="btn btn-gold" style="font-size:12px;padding:10px 20px"><i class="fas fa-phone"></i> Call for Exact Quote</a>
            </div>
        </div>
    `;
});

// Contact form
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    setTimeout(() => {
        btn.textContent = 'Message Sent!';
        btn.style.background = '#2ecc71';
        setTimeout(() => {
            btn.textContent = 'Send Request';
            btn.style.background = '';
            btn.disabled = false;
            e.target.reset();
        }, 3000);
    }, 1500);
});

// Particles effect (simple)
const particles = document.getElementById('particles');
if (particles) {
    for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.style.cssText = `
            position:absolute; width:${Math.random()*4+1}px; height:${Math.random()*4+1}px;
            background:rgba(201,168,76,${Math.random()*0.3}); border-radius:50%;
            left:${Math.random()*100}%; top:${Math.random()*100}%;
            animation: float ${Math.random()*10+10}s linear infinite;
        `;
        particles.appendChild(p);
    }
    const style = document.createElement('style');
    style.textContent = `@keyframes float { 0%{transform:translateY(0) translateX(0)} 50%{transform:translateY(-${Math.random()*100+50}px) translateX(${Math.random()*50-25}px)} 100%{transform:translateY(0) translateX(0)} }`;
    document.head.appendChild(style);
}

// 3D Tilt effect on cards
const tiltCards = document.querySelectorAll('.why-card, .service-card, .contact-card');
tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / centerY * -5;
        const rotateY = (x - centerX) / centerX * 5;
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

console.log('Domino Construction v2.0 loaded');
