function updateClock() {
    let now = new Date();
    // let hours = String(now.getHours()).padStart(2, "0");
    let hours = now.getHours();
    let minutes = String(now.getMinutes()).padStart(2, "0");
    let seconds = String(now.getSeconds()).padStart(2, "0");
    let ampm = hours >= 12 ? "PM" : "AM";

    // format
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be 12
    hours = String(hours).padStart(2, "0");

    const clockEl = document.getElementById('clock');
    if (clockEl) {
        clockEl.textContent = `${hours}:${minutes} ${ampm}`;
    }
}
updateClock();

setInterval(updateClock, 1000)

// TESTTTTTTTTTT
document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap === 'undefined') return;

    const cards = Array.from(document.querySelectorAll('#projects .card'));
    if (!cards.length) return;

    const total = cards.length;
    let position = Math.floor(total / 2); // float instead of integer
    const maxSideVisible = 3;

    let rafId = null;
    let cursorX = null;
    let targetSpeed = 0;
    let currentSpeed = 0;

    //i never want to touch this again
    function render() {
        const angleStep = 140 / (total - 1); // spread across smaller arc (was 180)
        const radius = 505;                  // bro went back to 505 -arctic monkeys

        cards.forEach((card, i) => {
            // circular offset with wrapping
            let offset = (i - position) % total;
            if (offset < -total / 2) offset += total;
            if (offset > total / 2) offset -= total;

            const angle = offset * angleStep;
            const rad = angle * (Math.PI / 180);

            // positions along the arc
            const x = Math.sin(rad) * radius;
            const z = (Math.cos(rad) - 1) * radius;
            const y = Math.abs(Math.sin(rad)) * 15; // subtle lift

            // tilt to face inward
            const rotateY = angle;
            const scale = 1 - Math.abs(offset) * 0.06;

            gsap.to(card, {
                duration: 0.8,
                x, y, z,
                rotateY,
                scale,
                opacity: 1,
                ease: "power3.out"
            });

            card.style.zIndex = String(1000 - Math.abs(offset));
        });
    }

    //hope this works
    // function animate() {
    //     position += currentSpeed;

    //     // instead of clamping → wrap smoothly
    //     if (position < 0) position += total;
    //     if (position >= total) position -= total;

    //     render();
    //     rafId = requestAnimationFrame(animate);
    // }

    //magic thingy
    function animate() {
        position += currentSpeed;

        // wrap position infinitely
        if (position < 0) position += total;
        if (position >= total) position -= total;

        render();
        rafId = requestAnimationFrame(animate);
    }

    const wrap = document.querySelector('#projects .carousel-wrap');

    wrap.addEventListener('mouseenter', () => {
        rafId = requestAnimationFrame(animate);
    });

    wrap.addEventListener('mouseleave', () => {
        cancelAnimationFrame(rafId);
        rafId = null;
        targetSpeed = 0; // stop smoothly
    });

    // track cursor, map to speed
    window.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        const rect = wrap.getBoundingClientRect();
        const mid = rect.left + rect.width / 2;

        // if cursor left of center → negative speed, right → positive speed
        const dist = (cursorX - mid) / (rect.width / 2);
        targetSpeed = dist * 0.05; // scale factor for sensitivity
    });

    // smooth speed easing
    setInterval(() => {
        currentSpeed += (targetSpeed - currentSpeed) * 0.1;
    }, 16);

    render();
});