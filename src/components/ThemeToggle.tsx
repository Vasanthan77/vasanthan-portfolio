import { motion } from "motion/react";
import { Sun, Moon, Sparkles } from "lucide-react";

interface ThemeToggleProps {
  currentTheme: "light" | "dark" | "dynamic";
  onThemeChange: (theme: "light" | "dark" | "dynamic") => void;
}

const ThemeToggle = ({ currentTheme, onThemeChange }: ThemeToggleProps) => {
  const themes = [
    { id: "light" as const, icon: Sun, cx: 30, cy: 35 },     // Top Left
    { id: "dark" as const, icon: Moon, cx: 98, cy: 35 },     // Top Right
    { id: "dynamic" as const, icon: Sparkles, cx: 64, cy: 95 } // Bottom Center
  ];

  const getGlowColor = (id: string) => {
    switch (id) {
      case "light": return "#2563EB"; // Deep Azure
      case "dark": return "#00E5FF";  // Electric Blue
      case "dynamic": return "#d946ef"; // Magenta
      default: return "#ffffff";
    }
  };

  const currentColor = getGlowColor(currentTheme);

  return (
    <div className="absolute top-4 right-4 sm:top-8 sm:right-8 z-[1000] scale-75 origin-top-right">
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Animated Connecting 'Blowing' Lines (Wireframe Triangle) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" viewBox="0 0 128 128">
          <defs>
            <filter id="glow-blur" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="blowingGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={currentColor} stopOpacity="0.1" />
              <stop offset="50%" stopColor={currentColor} stopOpacity="1" />
              <stop offset="100%" stopColor={currentColor} stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Solid Glowing Border Line (No Travelling) */}
          <motion.path
            d="M 30,35 L 98,35 L 64,95 L 30,35 Z"
            fill="none"
            stroke={currentColor}
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
            animate={{
              strokeOpacity: [0.6, 1, 0.6],
              filter: [
                `drop-shadow(0 0 2px ${currentColor})`,
                `drop-shadow(0 0 8px ${currentColor})`,
                `drop-shadow(0 0 2px ${currentColor})`
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </svg>

        {/* Icons / Pulleys */}
        {themes.map((t) => {
          const Icon = t.icon;
          const isActive = currentTheme === t.id;

          return (
            <motion.button
              key={t.id}
              onClick={() => onThemeChange(t.id)}
              className="absolute flex items-center justify-center rounded-full outline-none backdrop-blur-sm transition-all duration-300"
              style={{
                left: t.cx - 20,
                top: t.cy - 20,
                width: 40,
                height: 40,
                backgroundColor: isActive ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.2)",
                border: `1px solid ${isActive ? currentColor : (currentTheme === "light" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)")}`,
                boxShadow: isActive ? `0 0 15px ${currentColor}, inset 0 0 10px ${currentColor}` : "none"
              }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              initial={false}
              animate={{
                scale: isActive ? 1.1 : 1,
              }}
            >
              <Icon
                size={18}
                color={isActive ? currentColor : (currentTheme === "light" ? "#52525b" : "white")}
                className={`transition-all duration-300 ${!isActive ? (currentTheme === "light" ? "opacity-80 hover:opacity-100" : "opacity-60 hover:opacity-100") : ""}`}
                strokeWidth={isActive ? 2.5 : 1.5}
              />
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  style={{
                    borderTop: `2px solid ${currentColor}`,
                    borderRight: "2px solid transparent",
                    borderBottom: "2px solid transparent",
                    borderLeft: "2px solid transparent",
                    filter: `drop-shadow(0 0 2px ${currentColor})`
                  }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default ThemeToggle;
