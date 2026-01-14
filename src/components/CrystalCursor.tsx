import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

const CrystalCursor = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [theme, setTheme] = useState<"light" | "dark" | "dynamic">("dark");
    const isMobile = typeof window !== 'undefined' && window.matchMedia("(pointer: coarse)").matches;

    // Balanced physics for a smooth, professional feel without jitter
    const springConfig = { damping: 20, stiffness: 1000, mass: 0.1 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const checkTheme = () => {
            const root = document.documentElement;
            if (root.classList.contains("dynamic")) setTheme("dynamic");
            else if (root.classList.contains("dark")) setTheme("dark");
            else setTheme("light");
        };
        checkTheme();
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        if (isMobile) return;
        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener("mousemove", moveCursor, { passive: true });
        return () => {
            window.removeEventListener("mousemove", moveCursor);
            observer.disconnect();
        };
    }, [mouseX, mouseY, isMobile]);

    if (isMobile) return null;

    const getColors = () => {
        if (theme === "dynamic") return ["#D946EF", "rgba(217,70,239,0.5)"];
        if (theme === "light") return ["#2563EB", "rgba(37,99,235,0.4)"];
        return ["#00E5FF", "rgba(0,229,255,0.5)"];
    };
    const [mainColor, glowColor] = getColors();

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[1000000] will-change-transform"
            style={{
                x: springX,
                y: springY,
                translateX: "-2px",
                translateY: "-2px",
            }}
        >
            <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-[0_2px_5px_rgba(0,0,0,0.2)]"
            >
                <path
                    d="M3 3L21 12L12 14L9 21L3 3Z"
                    fill={mainColor}
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                />
                <path
                    d="M3 3L21 12L12 14L9 21L3 3Z"
                    fill="url(#cursorGlow)"
                    opacity="0.3"
                />
                <defs>
                    <radialGradient id="cursorGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="white" />
                        <stop offset="100%" stopColor="transparent" />
                    </radialGradient>
                </defs>
            </svg>
        </motion.div>
    );
};

export default CrystalCursor;