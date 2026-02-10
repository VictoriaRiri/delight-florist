gsap.registerPlugin(ScrollTrigger);

// Petal Generator Function
function createPetal(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const petal = document.createElement('div');
    petal.className = 'petal';
    
    // Randomize Petal Properties
    const size = Math.random() * 12 + 8 + 'px';
    petal.style.width = size;
    petal.style.height = size;
    petal.style.left = Math.random() * 100 + 'vw';
    petal.style.top = '-5%';
    petal.style.backgroundColor = ['#f8dae2', '#fce4ec', '#fbcfe8'][Math.floor(Math.random() * 3)];
    
    container.appendChild(petal);

    gsap.to(petal, {
        y: '105vh',
        x: '+=100',
        rotation: 360,
        duration: Math.random() * 4 + 4,
        ease: "none",
        onComplete: () => petal.remove()
    });
}

// Start Loader Petals Immediately
const loaderInterval = setInterval(() => createPetal('loader-petal-container'), 150);

// Close Loader Fast (2 seconds)
window.addEventListener('load', () => {
    setTimeout(() => {
        clearInterval(loaderInterval);
        gsap.to("#loader", {
            opacity: 0,
            duration: 0.8,
            onComplete: () => {
                document.getElementById('loader').style.display = 'none';
                // Hero Text Entrance
                const tl = gsap.timeline();
                tl.to("#hero-title", { opacity: 1, y: -20, duration: 1 })
                  .to("#hero-poem", { opacity: 1, y: -10, duration: 1 }, "-=0.5");
                
                // Keep Hero Petals falling gently
                setInterval(() => createPetal('hero-petal-container'), 600);
            }
        });
    }, 2000); 
});

// Scroll Reveals
document.querySelectorAll('.reveal-section').forEach((section) => {
    gsap.from(section, {
        opacity: 0, y: 50, duration: 1.2,
        scrollTrigger: { trigger: section, start: "top 85%" }
    });
});
