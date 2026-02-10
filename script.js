gsap.registerPlugin(ScrollTrigger);

// 1. Petal Loader
function createPetal() {
    const container = document.getElementById('petal-container');
    if(!container) return;
    const petal = document.createElement('div');
    petal.className = 'petal';
    
    const size = Math.random() * 20 + 10 + 'px';
    petal.style.width = size;
    petal.style.height = size;
    petal.style.left = Math.random() * 100 + 'vw';
    petal.style.top = '-10%';

    container.appendChild(petal);

    gsap.to(petal, {
        y: '110vh',
        x: '+=150',
        rotation: 720,
        duration: Math.random() * 4 + 3,
        ease: "none",
        onComplete: () => petal.remove()
    });
}

const petalInterval = setInterval(createPetal, 400);

window.addEventListener('load', () => {
    setTimeout(() => {
        clearInterval(petalInterval);
        gsap.to("#loader", {
            opacity: 0,
            duration: 1.5,
            ease: "power2.inOut",
            onComplete: () => {
                document.getElementById('loader').style.display = 'none';
                // Hero Entrance
                gsap.to("#hero-title", { opacity: 1, y: -30, duration: 1.8, ease: "expo.out" });
            }
        });
    }, 2500);
});

// 2. Sticky Header Animation
ScrollTrigger.create({
    start: "top -100",
    onUpdate: (self) => {
        const nav = document.getElementById('main-nav');
        if (self.direction === 1) {
            nav.classList.add('nav-scrolled');
        } else if (self.scroll() < 100) {
            nav.classList.remove('nav-scrolled');
        }
    }
});

// 3. Diagonal Scroll Reveals
document.querySelectorAll('.reveal-section').forEach((section) => {
    const img = section.querySelector('.diagonal-mask');
    
    gsap.to(img, {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none none"
        }
    });

    gsap.from(section.querySelector('div:not(.diagonal-mask)'), {
        autoAlpha: 0,
        x: 50,
        duration: 1.2,
        scrollTrigger: {
            trigger: section,
            start: "top 75%"
        }
    });
});

// 4. Parallax Background
gsap.to("#hero-bg", {
    yPercent: 30,
    ease: "none",
    scrollTrigger: {
        trigger: "#home",
        scrub: true
    }
});
