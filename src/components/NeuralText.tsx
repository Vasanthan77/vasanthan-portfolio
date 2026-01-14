import { useEffect, useRef, useState } from "react";

export const NeuralText = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [theme, setTheme] = useState<"light" | "dark" | "dynamic">("dark");

  useEffect(() => {
    // 1. Safe Theme Detection for 3-tier system
    const checkTheme = () => {
      const root = document.documentElement;
      if (root.classList.contains("dynamic")) setTheme("dynamic");
      else if (root.classList.contains("dark")) setTheme("dark");
      else setTheme("light");
    };
    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;
    const W = isMobile ? Math.min(window.innerWidth - 40, 400) : 800;
    const H = isMobile ? 80 : 140;
    const DPR = window.devicePixelRatio || 1;
    canvas.width = W * DPR;
    canvas.height = H * DPR;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
    ctx.scale(DPR, DPR);

    // Dynamic, Dark, or Light Palettes
    const getPalette = () => {
      if (theme === "dynamic") return ["#D946EF", "#8B5CF6", "#06B6D4", "#10B981", "#F59E0B"]; // Multi-color
      if (theme === "dark") return ["#7DF9FF", "#00E5FF", "#00B8D4"]; // Electric Blues
      return ["#2563EB", "#1D4ED8", "#1E40AF"]; // Sapphire Blues (Light)
    };

    const currentPalette = getPalette();
    const pulseColor = theme === "dynamic" ? "#FFFFFF" : (theme === "dark" ? "#7DF9FF" : "#2563EB");

    let particles: any[] = [];
    const off = document.createElement("canvas");
    off.width = W;
    off.height = H;
    const octx = off.getContext("2d");
    if (!octx) return;

    const fontSize = isMobile ? 50 : 90;
    // Multi-color theme uses a slightly more futuristic font if possible
    const font = theme === "dynamic" ? '"Exo 2", sans-serif' : '"Outfit", sans-serif';
    octx.font = `900 ${fontSize}px ${font}`;
    octx.textAlign = "center";
    octx.textBaseline = "middle";
    octx.fillText("VASANTHAN", W / 2, H / 2);

    const img = octx.getImageData(0, 0, W, H).data;
    const step = isMobile ? 3 : 4;
    for (let y = 0; y < H; y += step) {
      for (let x = 0; x < W; x += step) {
        if (img[(y * W + x) * 4 + 3] > 128) {
          particles.push({
            x, y, ox: x, oy: y, vx: 0, vy: 0,
            color: currentPalette[Math.floor(Math.random() * currentPalette.length)]
          });
        }
      }
    }

    let mouse = { x: -1000, y: -1000 };
    const handleMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    window.addEventListener("mousemove", handleMove);

    let animationFrame: number;
    const animate = (time: number) => {
      ctx.clearRect(0, 0, W, H);

      const scanL = (time / 8) % (W * 1.5);
      const scanR = W - ((time / 8) % (W * 1.5));

      particles.forEach((p) => {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 50) {
          const force = (1 - dist / 50) * 8;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        p.vx += (p.ox - p.x) * 0.12;
        p.vy += (p.oy - p.y) * 0.12;
        p.vx *= 0.82;
        p.vy *= 0.82;
        p.x += p.vx;
        p.y += p.vy;

        const isHit = Math.abs(p.ox - scanL) < 25 || Math.abs(p.ox - scanR) < 25;
        ctx.fillStyle = isHit ? pulseColor : p.color;

        if (theme === "dynamic") {
          ctx.globalAlpha = isHit ? 1 : 0.6;
        } else {
          ctx.globalAlpha = isHit ? 1 : (theme === "dark" ? 0.35 : 0.5);
        }

        ctx.beginPath();
        const radius = isMobile ? (isHit ? 1.2 : 0.8) : (isHit ? 1.8 : 1.2);
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();
      });
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
    };
  }, [theme]);

  return (
    <div className="flex justify-center items-center py-4 w-full min-h-[160px]">
      <canvas ref={canvasRef} className="block max-w-full" />
    </div>
  );
};