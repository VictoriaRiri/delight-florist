gsap.registerPlugin(ScrollTrigger);

function createPetal(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const petal = document.createElement('div');
    petal.className = 'petal';
    
    // Tiny, soft pink petals
    const size = Math.random() * 10 + 6 + 'px';
    petal.style.width = size;
    petal.style.height = size;
    petal.style.left = Math.random() * 100 + 'vw';
    petal.style.top = '-5%';
    petal.style.backgroundColor = ['#fce4ec', '#f8dae2', '#fbcfe8'][Math.floor(Math.random() * 3)];
    
    container.appendChild(petal);

    gsap.to(petal, {
        y: '105vh',
        x: '+=150',
        rotation: 720,
        duration: Math.random() * 3 + 5,
        ease: "none",
        onComplete: () => petal.remove()
    });
}

// Start Loader Petals FAST
const loaderInterval = setInterval(() => createPetal('loader-petal-container'), 100);

window.addEventListener('load', () => {
    // Faster loader: 2 seconds
    setTimeout(() => {
        clearInterval(loaderInterval);
        gsap.to("#loader", {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                document.getElementById('loader').style.display = 'none';
                
                // Hero Entrance
                const tl = gsap.timeline();
                tl.to("#hero-title", { opacity: 1, y: -20, duration: 1.2, ease: "power3.out" })
                  .to("#hero-poem", { opacity: 1, y: -10, duration: 1 }, "-=0.5");
                
                // Start persistent gentle hero petals
                setInterval(() => createPetal('hero-petal-container'), 800);
            }
        });
    }, 2000); 
});

// Scroll Reveals for Sections
document.querySelectorAll('.reveal-section').forEach((section) => {
    gsap.from(section, {
        opacity: 0, y: 60, duration: 1.5, ease: "power2.out",
        scrollTrigger: { trigger: section, start: "top 85%" }
    });
});
