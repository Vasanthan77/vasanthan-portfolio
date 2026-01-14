import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
}

interface AboutNetworkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutNetworkModal = ({ isOpen, onClose }: AboutNetworkModalProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const animationFrameRef = useRef<number>();

  const aboutData = [
    { id: "center", label: "VASANTHAN", color: "#006CFF" },
    { id: "dev", label: "App Developer", color: "#00C8FF" },
    { id: "ai", label: "AI Innovator", color: "#4D5BFF" },
    { id: "design", label: "UI/UX Design", color: "#00D9FF" },
    { id: "full", label: "Full Stack", color: "#006CFF" },
    { id: "mtech", label: "MTech CSE", color: "#00C8FF" },
    { id: "sbv", label: "SBV Tech", color: "#4D5BFF" },
    { id: "passion", label: "Innovation", color: "#00D9FF" },
  ];

  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    // Initialize nodes in a star pattern around center
    nodesRef.current = aboutData.map((data, index) => {
      const angle = (index / aboutData.length) * Math.PI * 2;
      const radius = index === 0 ? 0 : 120;
      return {
        id: data.id,
        label: data.label,
        x: canvas.width / 2 + Math.cos(angle) * radius,
        y: canvas.height / 2 + Math.sin(angle) * radius,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        color: data.color,
      };
    });

    // Animation loop
    const animate = () => {
      // Clear canvas with gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, "rgba(15, 23, 42, 0.9)");
      gradient.addColorStop(1, "rgba(25, 35, 60, 0.95)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      const centerNode = nodesRef.current[0];
      nodesRef.current.forEach((node, index) => {
        if (index !== 0) {
          // Fade based on distance
          const dx = node.x - centerNode.x;
          const dy = node.y - centerNode.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const opacity = Math.max(0.1, 1 - distance / 300);

          // Draw gradient line to center
          const gradient = ctx.createLinearGradient(
            centerNode.x,
            centerNode.y,
            node.x,
            node.y
          );
          gradient.addColorStop(0, `rgba(0, 108, 255, ${opacity * 0.6})`);
          gradient.addColorStop(1, `rgba(77, 91, 255, ${opacity * 0.3})`);

          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(centerNode.x, centerNode.y);
          ctx.lineTo(node.x, node.y);
          ctx.stroke();

          // Draw glow effect along line
          ctx.strokeStyle = `rgba(0, 200, 255, ${opacity * 0.2})`;
          ctx.lineWidth = 4;
          ctx.setLineDash([5, 5]);
          ctx.beginPath();
          ctx.moveTo(centerNode.x, centerNode.y);
          ctx.lineTo(node.x, node.y);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      });

      // Update and draw nodes
      nodesRef.current.forEach((node, index) => {
        if (index !== 0) {
          // Attract to star position
          const angle = (index / (aboutData.length - 1)) * Math.PI * 2;
          const targetX = canvas.width / 2 + Math.cos(angle) * 120;
          const targetY = canvas.height / 2 + Math.sin(angle) * 120;

          node.vx += (targetX - node.x) * 0.002;
          node.vy += (targetY - node.y) * 0.002;
        }

        // Apply friction
        node.vx *= 0.95;
        node.vy *= 0.95;

        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Repel from center when too close
        const dx = node.x - centerNode.x;
        const dy = node.y - centerNode.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 50 && index !== 0) {
          const angle = Math.atan2(dy, dx);
          node.x = centerNode.x + Math.cos(angle) * 50;
          node.y = centerNode.y + Math.sin(angle) * 50;
        }

        // Draw node
        const gradient = ctx.createRadialGradient(node.x - 8, node.y - 8, 0, node.x, node.y, 16);
        gradient.addColorStop(0, node.color);
        gradient.addColorStop(1, node.color + "80");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 10, 0, Math.PI * 2);
        ctx.fill();

        // Draw glow
        ctx.strokeStyle = node.color + "40";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 16, 0, Math.PI * 2);
        ctx.stroke();

        // Draw label
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx.font = "bold 11px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.shadowColor = "rgba(0, 108, 255, 0.5)";
        ctx.shadowBlur = 8;
        ctx.fillText(node.label, node.x, node.y + 28);
        ctx.shadowColor = "transparent";
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl h-[600px] bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl overflow-hidden border border-cyan-500/20 shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="w-full h-full"
        />

        {/* Info section */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-8 text-white">
          <h3 className="text-3xl font-bold mb-2 text-cyan-400">Vasanthan</h3>
          <p className="text-lg text-gray-300">
            Full-stack Developer | AI Innovator | Creative Designer
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Building innovative solutions through code, design, and artificial intelligence.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutNetworkModal;
