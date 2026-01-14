import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const SplashScreen = ({ finishLoading }: { finishLoading: () => void }) => {
  const [dots, setDots] = useState("");
  const [isExiting, setIsExiting] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [theme, setTheme] = useState("dark");

  const messages = [
    "Initializing System",
    "Loading Assets",
    "Optimizing Performance",
    "Ready for Launch"
  ];

  useEffect(() => {
    const checkTheme = () => {
      if (document.documentElement.classList.contains("dynamic")) setTheme("dynamic");
      else if (document.documentElement.classList.contains("dark")) setTheme("dark");
      else setTheme("light");
    };
    checkTheme();

    const dotInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    const msgInterval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % messages.length);
    }, 800);

    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        finishLoading();
      }, 1000); // Shutter animation duration
    }, 3000); // 3s loading + 1s shutter = 4s total

    return () => {
      clearInterval(dotInterval);
      clearInterval(msgInterval);
      clearTimeout(timer);
    };
  }, [finishLoading]);

  // Generate some random positions for water drops
  const drops = Array.from({ length: 60 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    scale: 0.3 + Math.random() * 1.5,
    delay: Math.random() * 5,
    duration: 5 + Math.random() * 7,
  }));

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={isExiting ? { y: "-100%" } : { y: 0 }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      className={`fixed inset-0 z-[1000] flex items-center justify-center overflow-hidden font-sans transition-colors duration-500 ${theme === 'light' ? 'bg-white' : 'bg-[#0a0a0a]'}`}
    >
      {/* Ultra Realistic Glass Layer */}
      <div className={`absolute inset-0 backdrop-blur-[40px] border-b ${theme === 'light' ? 'bg-white/40 border-black/10' : 'bg-black/40 border-white/20'}`} />

      {/* Rainfall / Drops Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-80">
        {drops.map((drop) => (
          <motion.div
            key={drop.id}
            initial={{ opacity: 0, y: -20, scale: drop.scale }}
            animate={{
              opacity: [0, 0.6, 0.4, 0],
              y: ["0%", "15%"],
            }}
            transition={{
              duration: drop.duration,
              repeat: Infinity,
              delay: drop.delay,
              ease: "linear",
            }}
            className="absolute rounded-full bg-blue-100/30 blur-[0.5px]"
            style={{
              top: drop.top,
              left: drop.left,
              width: `${1.5 * drop.scale}px`,
              height: `${2.5 * drop.scale}px`,
              boxShadow: `0 0 ${2 * drop.scale}px rgba(255,255,255,0.4)`,
            }}
          />
        ))}
      </div>

      {/* Modern Glass Reflection Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />

      {/* MAIN CONTENT AREA */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">

        {/* Central Logo/Name */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <h1 className={`text-3xl md:text-6xl font-black tracking-[0.1em] mb-4 text-center transition-colors duration-500
            ${theme === 'light' ? 'text-black/90 drop-shadow-[0_0_15px_rgba(0,0,0,0.1)]' : 'text-white/95 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]'}`}>
            VASANTHAN'S PORTFOLIO
          </h1>
          <div className={`h-[2px] w-48 bg-gradient-to-r from-transparent via-primary to-transparent ${theme === 'light' ? 'opacity-40' : 'opacity-60'}`} />
        </motion.div>

        {/* LOADING MESSAGE - Moving from bottom to up */}
        <div className="absolute bottom-20 flex flex-col items-center gap-6">
          <AnimatePresence mode="wait">
            <motion.p
              key={messageIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className={`text-xs tracking-[0.7em] uppercase font-light transition-colors duration-500 ${theme === 'light' ? 'text-black/60' : 'text-white/60'}`}
            >
              {messages[messageIndex]}{dots}
            </motion.p>
          </AnimatePresence>

          <div className="h-[2px] w-64 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 6, ease: "linear" }}
              className="h-full bg-gradient-to-r from-primary/50 to-primary shadow-[0_0_20px_rgba(37,99,235,0.8)]"
            />
          </div>
        </div>
      </div>

      {/* SHUTTER EFFECT: TOP SHADOW */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
    </motion.div>
  );
};

export default SplashScreen;