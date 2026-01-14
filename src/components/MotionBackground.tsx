import { useEffect, useRef, useState } from "react";
import lightVideo from "../assets/homescreenbackground.mp4";
import darkVideo from "../assets/darkmodebackgroundhs.mp4";
import dynamicVideo from "../assets/dynamicbackground.mp4";

const MotionBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lightRef = useRef<HTMLVideoElement>(null);
  const darkRef = useRef<HTMLVideoElement>(null);
  const dynamicRef = useRef<HTMLVideoElement>(null);
  const [theme, setTheme] = useState<"light" | "dark" | "dynamic">("dark");

  /* ---------- THEME OBSERVER ---------- */
  useEffect(() => {
    const checkTheme = () => {
      const root = document.documentElement;
      if (root.classList.contains("dynamic")) setTheme("dynamic");
      else if (root.classList.contains("dark")) setTheme("dark");
      else setTheme("light");
    };
    checkTheme();
    const obs = new MutationObserver(checkTheme);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  /* ---------- VIDEO PLAYBACK ENFORCEMENT ---------- */
  useEffect(() => {
    const playVideo = (ref: React.RefObject<HTMLVideoElement | null>) => {
      if (ref.current) {
        ref.current.play().catch(() => {
          // Fallback if autoplay is blocked
          const forcePlay = () => {
            ref.current?.play();
            window.removeEventListener('click', forcePlay);
          };
          window.addEventListener('click', forcePlay);
        });
      }
    };

    if (theme === "light") playVideo(lightRef);
    if (theme === "dark") playVideo(darkRef);
    if (theme === "dynamic") playVideo(dynamicRef);
  }, [theme]);
  /* ---------- NEURAL FLOW ---------- */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const isMobile = window.innerWidth < 768;

    // Theme-based colors for particles
    const getParticleColor = () => {
      if (theme === "dynamic") return "217,70,239"; // Magenta/Pinkish
      if (theme === "dark") return "0,229,255"; // Electric Cyan
      return "37,99,235"; // Sapphire Blue
    };
    const color = getParticleColor();

    const COUNT = Math.floor((w * h) / (isMobile ? 15000 : 10000)); // Slightly fewer particles
    const LINK_DIST = isMobile ? 100 : 120; // Shorter links for performance
    const MAX_LINKS = isMobile ? 2 : 3; // Fewer links calculation per particle

    const particles: any[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: Math.random() * 0.6 + 0.15,
      vy: (Math.random() - 0.5) * 0.12,
      drift: (Math.random() - 0.5) * 0.002,
      size: Math.random() * (theme === "light" ? 1.8 : 1.3) + (theme === "light" ? 0.9 : 0.6),
    }));

    let mouse = { x: -9999, y: -9999 };
    let scrollFactor = 1;

    const onMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    const onScroll = () => {
      const max = window.innerHeight;
      scrollFactor = Math.max(0.3, 1 - window.scrollY / max);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll);

    let t = 0;
    let lastTime = 0;

    const animate = (time = 0) => {
      if (time - lastTime < 16) {
        requestAnimationFrame(animate);
        return;
      }
      lastTime = time;

      t += 0.01;
      ctx.clearRect(0, 0, w, h);

      const fadeStart = h * 0.3;
      const fadeEnd = h * 0.6;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.vx += 0.002;
        p.vy += Math.sin(t + p.x * 0.01) * 0.002;
        p.vy += p.drift;

        const dxm = p.x - mouse.x;
        const dym = p.y - mouse.y;
        const d = Math.sqrt(dxm * dxm + dym * dym);

        if (!isMobile && d < 180 && d > 0.01) {
          const proximity = 1 - d / 180;
          const force = proximity * proximity * 0.35;
          p.vx += (dxm / d) * force;
          p.vy += (dym / d) * force;
        }

        const damp = d < 180 ? 0.995 : 0.985;
        p.vx *= damp * scrollFactor;
        p.vy *= damp * scrollFactor;

        p.vx = Math.min(Math.max(p.vx, 0.15), d < 180 ? 1.6 : 0.8);
        p.vy = Math.min(Math.max(p.vy, -0.5), 0.5);

        p.x += p.vx;
        p.y += p.vy;

        if (p.x > w + 20) {
          p.x = -Math.random() * 120;
          p.y = Math.random() * h;
        }

        p.y = Math.max(0, Math.min(h, p.y));

        let opacity = theme === "light" ? 0.55 : 0.45;
        if (p.y > fadeStart && p.y < fadeEnd) {
          const f = (p.y - fadeStart) / (fadeEnd - fadeStart);
          opacity *= 1 - f * 0.6;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${opacity})`;
        ctx.fill();

        let links = 0;
        for (let j = i + 1; j < particles.length && links < MAX_LINKS; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;

          if (Math.abs(dx) < 12) continue;

          const d2 = dx * dx + dy * dy;
          if (d2 < LINK_DIST * LINK_DIST) {
            const a = 1 - Math.sqrt(d2) / LINK_DIST;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(${color}, ${a * (theme === "light" ? 0.6 : 0.35)})`;
            ctx.lineWidth = theme === "light" ? 0.8 : 0.6;
            ctx.stroke();
            links++;
          }
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, [theme]); // Re-run when theme changes to update particle color

  return (
    <div className={`fixed inset-0 z-0 overflow-hidden transition-colors duration-1000 ${theme === "light" ? "bg-white" : "bg-black"}`}>
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <video
          ref={lightRef}
          src={lightVideo}
          muted loop autoPlay playsInline preload="auto"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${theme === "light" ? "opacity-45" : "opacity-0"}`}
        />
        <video
          ref={darkRef}
          src={darkVideo}
          muted loop autoPlay playsInline preload="auto"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${theme === "dark" ? "opacity-35" : "opacity-0"}`}
        />
        <video
          ref={dynamicRef}
          src={dynamicVideo}
          muted loop autoPlay playsInline preload="auto"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${theme === "dynamic" ? "opacity-15" : "opacity-0"}`}
        />
      </div>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full will-change-transform" />
      <div
        className={`absolute inset-0 pointer-events-none transition-colors duration-1000 ${theme === "dynamic"
          ? "bg-gradient-to-b from-purple-500/20 via-transparent to-black/40"
          : theme === "dark"
            ? "bg-gradient-to-b from-background/40 via-transparent to-background/80"
            : "bg-gradient-to-b from-white/70 via-white/30 to-white/10"
          }`}
      />
    </div>
  );
};

export default MotionBackground;
