// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

// 1. Petal Loading Animation
function createPetal() {
    const container = document.getElementById('petal-container');
    const petal = document.createElement('div');
    petal.className = 'petal';
    
    // Random sizes and positions
    const size = Math.random() * 15 + 10 + 'px';
    petal.style.width = size;
    petal.style.height = size;
    petal.style.left = Math.random() * 100 + 'vw';
    petal.style.top = '-5%';

    container.appendChild(petal);

    gsap.to(petal, {
        y: '110vh',
        x: '+=100',
        rotation: 360,
        duration: Math.random() * 3 + 2,
        ease: "none",
        onComplete: () => petal.remove()
    });
}

// Start petals
const petalInterval = setInterval(createPetal, 300);

// Close Loader
window.addEventListener('load', () => {
    setTimeout(() => {
        clearInterval(petalInterval);
        gsap.to("#loader", {
            opacity: 0,
            duration: 1.5,
            onComplete: () => {
                document.getElementById('loader').style.display = 'none';
                animateHero();
            }
        });
    }, 3000);
});

// 2. Hero Animation
function animateHero() {
    gsap.to("#hero-title", { opacity: 1, y: -20, duration: 1.5, ease: "power2.out" });
}

// 3. Diagonal Scroll Reveals
const sections = document.querySelectorAll('.reveal-section');

sections.forEach((section) => {
    const img = section.querySelector('.diagonal-mask');
    
    gsap.fromTo(img, 
        { clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }, 
        { 
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            duration: 1.5,
            ease: "power4.inOut",
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        }
    );
});