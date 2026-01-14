import { motion } from "motion/react";
import { Sun, Moon, Sparkles } from "lucide-react";

interface ThemeToggleProps {
  currentTheme: "light" | "dark" | "dynamic";
  onThemeChange: (theme: "light" | "dark" | "dynamic") => void;
}

const ThemeToggle = ({ currentTheme, onThemeChange }: ThemeToggleProps) => {
  const themes = [
    { id: "light" as const, icon: Sun },
    { id: "dark" as const, icon: Moon },
    { id: "dynamic" as const, icon: Sparkles },
  ];

  // Pulley positions (Upside-down triangle from latest sketch)
  const getPos = (id: string) => {
    switch (id) {
      case "light": return { x: "-36px", y: "-22px" };    // Top Left (Sun)
      case "dark": return { x: "36px", y: "-22px" };     // Top Right (Moon)
      case "dynamic": return { x: "0px", y: "38px" };    // Bottom (Sparkles)
      default: return { x: "0px", y: "0px" };
    }
  };

  const getGlowColor = (id: string) => {
    switch (id) {
      case "light": return "#2563EB"; // Deep Azure
      case "dark": return "#00E5FF";  // Electric Blue
      case "dynamic": return "#ec46bdff";
      default: return "#f8f1f5ff";
    }
  };

  return (
    <div className="fixed top-8 right-8 z-[1000] flex items-center justify-center">
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Belt-Pulley Wireframe (Based on latest sketch) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" viewBox="0 0 128 128">
          {/* Outer Belt Path */}
          <path
            d="M 28,42 L 100,42 L 64,102 Z"
            fill="none"
            stroke={getGlowColor(currentTheme)}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-500"
            style={{
              filter: `drop-shadow(0 0 4px ${getGlowColor(currentTheme)})`,
              strokeOpacity: currentTheme === "light" ? 0.8 : 1
            }}
          />

          {/* Inner Belt Path */}
          <path
            d="M 38,48 L 90,48 L 64,90 Z"
            fill="none"
            stroke={getGlowColor(currentTheme)}
            strokeWidth="1"
            className="opacity-40 transition-all duration-500"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {themes.map((t) => {
          const Icon = t.icon;
          const isActive = currentTheme === t.id;
          const pos = getPos(t.id);

          return (
            <motion.button
              key={t.id}
              onClick={() => onThemeChange(t.id)}
              className={`absolute p-2 rounded-full transition-all duration-300 backdrop-blur-md border
                ${isActive
                  ? currentTheme === "light"
                    ? "bg-white/40 border-primary/60 shadow-[0_0_15px_rgba(37,99,235,0.4)] z-10 scale-110"
                    : "bg-white/10 border-white/60 shadow-[0_0_15px_rgba(255,255,255,0.5)] z-10 scale-110"
                  : currentTheme === "light"
                    ? "bg-blue-50/10 border-primary/10 opacity-60 hover:opacity-100"
                    : "bg-black/10 border-white/10 opacity-60 hover:opacity-100"
                }`}
              animate={pos}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <Icon
                size={14}
                className={`transition-colors duration-300 ${isActive
                  ? "text-primary drop-shadow-[0_0_8px_currentColor]"
                  : currentTheme === "light" ? "text-primary/60" : "text-white/60"
                  }`}
                strokeWidth={isActive ? 3 : 1.5}
              />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default ThemeToggle;
