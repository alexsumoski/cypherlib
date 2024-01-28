let lastX = 0;
let lastY = 0;
let velocityX = 0;
let velocityY = 0;
let isMouseMoving = false;
const smoothness = 500;

document.body.addEventListener("pointermove", (e) => {
    const { currentTarget: el, clientX: x, clientY: y } = e;
    const { top: t, left: l, width: w, height: h } = el.getBoundingClientRect();

    isMouseMoving = true;
    velocityX = (x - l - w / 2 - lastX) / smoothness;
    velocityY = (y - t - h / 2 - lastY) / smoothness;
});

document.body.addEventListener("pointerout", () => {
    isMouseMoving = false;
});

function animate() {
    requestAnimationFrame(animate);
    
    if (isMouseMoving) {
        lastX += velocityX;
        lastY += velocityY;
    } else {
        // Apply decay to the velocity
        velocityX *= 0.95;
        velocityY *= 0.95;
        lastX += velocityX;
        lastY += velocityY;

        // Optional: Stop the animation when the velocity is very low
        if (Math.abs(velocityX) < 0.04 && Math.abs(velocityY) < 0.04) {
            return;
        }
    }

    document.body.style.setProperty('--posX', lastX);
    document.body.style.setProperty('--posY', lastY);
}

animate();
