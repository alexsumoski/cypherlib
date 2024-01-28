import { useEffect, useState } from 'react';

const useMouseMovement = () => {
    const [lastX, setLastX] = useState(0);
    const [lastY, setLastY] = useState(0);
    const smoothness = 500;

    useEffect(() => {
        const handlePointerMove = (e: PointerEvent) => {
            const el = e.currentTarget as HTMLElement;
            const { clientX: x, clientY: y } = e;
            const { top: t, left: l, width: w, height: h } = el.getBoundingClientRect();

            const velocityX = (x - l - w / 2 - lastX) / smoothness;
            const velocityY = (y - t - h / 2 - lastY) / smoothness;

            setLastX(lastX => lastX + velocityX);
            setLastY(lastY => lastY + velocityY);
        };

        document.body.addEventListener("pointermove", handlePointerMove);
        return () => {
            document.body.removeEventListener("pointermove", handlePointerMove);
        };
    }, [lastX, lastY]);

    return { lastX, lastY };
};

export default useMouseMovement;
