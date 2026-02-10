gsap.registerPlugin(ScrollTrigger);

// Petal Generator Function
function createPetal(targetId) {
    const container = document.getElementById(targetId);
    if (!container) return;
    const petal = document.createElement('div');
    petal.className = 'petal';
    const size = Math.random() * 15 + 10 + 'px';
    petal.style.width = size;
    petal.style.height = size;
    petal.style.left = Math.random() * 100 + 'vw';
    petal.style.top = '-10%';
    container.appendChild(petal);

    gsap.to(petal, {
        y: '110vh',
        x: '+=100',
        rotation: 360,
        duration: Math.random() * 5 + 5,
        ease: "none",
        onComplete: () => petal.remove()
    });
}

// Start Loader Petals
const loaderInterval = setInterval(() => createPetal('petal-container-loader'), 300);

// Close Loader and Start Hero
window.addEventListener('load', () => {
    setTimeout(() => {
        clearInterval(loaderInterval);
        gsap.to("#loader", {
            opacity: 0, duration: 1.5, onComplete: () => {
                document.getElementById('loader').style.display = 'none';
                // Hero Animation
                const tl = gsap.timeline();
                tl.to("#hero-title", { opacity: 1, y: -20, duration: 1.5 })
                  .to("#hero-poem", { opacity: 1, duration: 1.5 }, "-=0.5")
                  .to("#hero-cta", { opacity: 1, duration: 1 }, "-=0.5");
                
                // Start Hero Background Petals
                setInterval(() => createPetal('hero-petal-canvas'), 800);
            }
        });
    }, 2000);
});

// Reveal Sections
document.querySelectorAll('.reveal-section').forEach((section) => {
    gsap.from(section, {
        opacity: 0, y: 100, duration: 1.5,
        scrollTrigger: { trigger: section, start: "top 80%" }
    });
});
