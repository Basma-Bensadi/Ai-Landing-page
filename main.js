const bars = document.getElementById('bars');
const sidebar = document.getElementById('sidebar');
const xmark = document.getElementById('xmark');

bars.addEventListener('click', () => {
    sidebar.style.display = 'flex';
});

xmark.addEventListener('click', () => {
    sidebar.style.display = 'none';
});

// Particle Network Background
const canvas = document.getElementById('particle-bg');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const DOT_COLOR = '#9053e7';
    const LINE_COLOR = 'rgba(144, 83, 231, 0.3)';
    const DOT_RADIUS = 4;
    const DOT_COUNT = Math.floor((width * height) / 4000);
    const LINE_DIST = 120;
    const HOVER_DIST = 80;
    const dots = [];
    let mouse = { x: null, y: null };

    function randomVel() {
        return (Math.random() - 0.5) * 0.7;
    }

    function createDot() {
        return {
            x: Math.random() * width,
            y: Math.random() * height,
            vx: randomVel(),
            vy: randomVel(),
            radius: DOT_RADIUS,
        };
    }

    for (let i = 0; i < DOT_COUNT; i++) {
        dots.push(createDot());
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);
        // Draw lines
        for (let i = 0; i < dots.length; i++) {
            for (let j = i + 1; j < dots.length; j++) {
                const dx = dots[i].x - dots[j].x;
                const dy = dots[i].y - dots[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < LINE_DIST) {
                    ctx.strokeStyle = LINE_COLOR;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(dots[i].x, dots[i].y);
                    ctx.lineTo(dots[j].x, dots[j].y);
                    ctx.stroke();
                }
            }
        }
        // Draw dots
        for (const dot of dots) {
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
            ctx.fillStyle = DOT_COLOR;
            ctx.shadowColor = DOT_COLOR;
            ctx.shadowBlur = 8;
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    function update() {
        for (const dot of dots) {
            dot.x += dot.vx;
            dot.y += dot.vy;
            // Bounce off edges
            if (dot.x < 0 || dot.x > width) dot.vx *= -1;
            if (dot.y < 0 || dot.y > height) dot.vy *= -1;
            // Hover effect
            if (mouse.x !== null && mouse.y !== null) {
                const dx = dot.x - mouse.x;
                const dy = dot.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < HOVER_DIST) {
                    // Move dot slightly toward mouse
                    dot.x += dx * -0.03;
                    dot.y += dy * -0.03;
                }
            }
        }
    }

    function animate() {
        update();
        draw();
        requestAnimationFrame(animate);
    }

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });
    window.addEventListener('resize', () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    });

    animate();
}
