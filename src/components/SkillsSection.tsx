import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

const TechIcon = ({ name, icon, theme, custom, isVisible }: { name: string, icon: string, theme: string, custom?: string, isVisible: boolean }) => {
  const getGlowColor = () => {
    if (theme === "dynamic") return "rgba(217, 70, 239, 0.3)";
    if (theme === "dark") return "rgba(0, 229, 255, 0.3)";
    return "rgba(37, 99, 235, 0.2)";
  };

  return (
    <motion.div
      whileHover={{ scale: 1.15, y: -5 }}
      className="flex flex-col items-center gap-3 group cursor-pointer"
    >
      <div
        className={`w-20 h-20 md:w-24 md:h-24 flex items-center justify-center rounded-2xl transition-all duration-500 shadow-xl backdrop-blur-md relative overflow-visible
          ${theme === "dynamic"
            ? "bg-purple-900/20 border border-purple-500/30 group-hover:border-purple-400"
            : theme === "dark"
              ? "bg-[#111111]/80 border border-white/10 group-hover:border-primary/50"
              : "bg-blue-50/50 border border-blue-200/50 group-hover:border-primary"
          }`}
        style={{ boxShadow: isVisible ? `0 10px 20px ${getGlowColor()}` : '' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = `0 20px 40px ${getGlowColor().replace('0.3', '0.5').replace('0.2', '0.4')}`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = `0 10px 20px ${getGlowColor()}`;
        }}
      >
        <img
          src={custom || `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${icon}/${icon}-original.svg`}
          alt={name}
          className={`w-10 h-10 md:w-12 md:h-12 object-contain filter transition-all duration-500 relative z-10 ${theme === "dynamic" ? "group-hover:drop-shadow-[0_0_15px_rgba(217,70,239,0.8)]" :
            theme === "dark" ? "group-hover:drop-shadow-[0_0_15px_rgba(0,229,255,0.8)]" :
              "group-hover:drop-shadow-[0_0_15px_rgba(37,99,235,0.6)]"
            }`}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (target.src.includes('devicon')) {
              target.src = `https://cdn.simpleicons.org/${icon.replace('-', '')}`;
            } else if (target.src.includes('simpleicons')) {
              target.src = `https://img.icons8.com/color/144/${icon.replace('-original', '')}.png`;
            }
          }}
        />
      </div>
      <span className={`text-[10px] md:text-xs font-bold transition-colors uppercase tracking-[0.2em] group-hover:text-primary 
        ${theme === "dynamic" ? "text-purple-300/60" : theme === "dark" ? "text-white/40" : "text-blue-900/40"}`}
      >
        {name}
      </span>
    </motion.div>
  );
};

const SkillsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [theme, setTheme] = useState("dark");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const checkTheme = () => {
      if (document.documentElement.classList.contains("dynamic")) setTheme("dynamic");
      else if (document.documentElement.classList.contains("dark")) setTheme("dark");
      else setTheme("light");
    };
    checkTheme();
    const themeObserver = new MutationObserver(checkTheme);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      themeObserver.disconnect();
    };
  }, []);

  const frontend = [
    { name: "HTML5", icon: "html5" },
    { name: "CSS3", icon: "css3" },
    { name: "Sass", icon: "sass" },
    { name: "JS", icon: "javascript" },
    { name: "Tailwind", icon: "tailwindcss" },
    { name: "React", icon: "react" },
    { name: "Redux", icon: "redux" },
    { name: "TypeScript", icon: "typescript" },
    { name: "Figma", icon: "figma" },
    { name: "React Native", icon: "react" },
  ];

  const backend = [
    { name: "Next.js", icon: "nextjs" },
    { name: "Node.js", icon: "nodejs" },
    { name: "Express", icon: "express" },
    { name: "PostgreSQL", icon: "postgresql" },
    { name: "MySQL", icon: "mysql" },
    { name: "MongoDB", icon: "mongodb" },
    { name: "GraphQL", icon: "graphql" },
    { name: "Firebase", icon: "firebase" },
  ];

  const dataScience = [
    { name: "Python", icon: "python" },
    { name: "FastAPI", icon: "fastapi" },
    { name: "Excel", icon: "microsoft-excel", custom: "https://img.icons8.com/color/144/microsoft-excel-2019.png" },
    { name: "Power BI", icon: "power-bi", custom: "https://img.icons8.com/color/144/power-bi.png" },
    { name: "Pandas", icon: "pandas" },
  ];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className={`relative min-h-screen flex items-center px-4 sm:px-6 lg:px-8 py-24 overflow-hidden transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="text-center mb-24">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            className="text-3xl md:text-5xl lg:text-7xl font-light italic mb-8 tracking-tight"
          >
            Crafting innovative solutions with a <br />
            <span className="text-primary font-black not-italic block mt-4 tracking-normal uppercase">versatile skill set</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className={`text-sm md:text-md italic font-light tracking-[0.4em] uppercase 
              ${theme === "dynamic" ? "text-purple-300/60" : theme === "dark" ? "text-muted-foreground" : "text-blue-900/60"}`}
          >
            Seamlessly integrating technologies to bring ideas to life
          </motion.p>
        </div>

        <div className="space-y-32">
          {/* Frontend Category */}
          <div className="space-y-12">
            <h3 className={`text-xl md:text-4xl font-light italic text-center tracking-[0.2em] 
              ${theme === "dynamic" ? "text-purple-200/80" : theme === "dark" ? "text-foreground/70" : "text-blue-900/80"}`}>
              Front-end Development Technologies
            </h3>
            <div className="flex flex-wrap justify-center gap-6 md:gap-12">
              {frontend.map((tech, i) => (
                <TechIcon key={i} {...tech} theme={theme} isVisible={isVisible} />
              ))}
            </div>
          </div>

          {/* Backend Category */}
          <div className="space-y-12">
            <h3 className={`text-xl md:text-4xl font-light italic text-center tracking-[0.2em] 
              ${theme === "dynamic" ? "text-purple-200/80" : theme === "dark" ? "text-foreground/70" : "text-blue-900/80"}`}>
              Back-end Development Technologies
            </h3>
            <div className="flex flex-wrap justify-center gap-6 md:gap-12">
              {backend.map((tech, i) => (
                <TechIcon key={i} {...tech} theme={theme} isVisible={isVisible} />
              ))}
            </div>
          </div>

          {/* Data Science Category */}
          <div className="space-y-12">
            <h3 className={`text-xl md:text-4xl font-light italic text-center tracking-[0.2em] 
              ${theme === "dynamic" ? "text-purple-200/80" : theme === "dark" ? "text-foreground/70" : "text-blue-900/80"}`}>
              Data Science Technologies
            </h3>
            <div className="flex flex-wrap justify-center gap-6 md:gap-12">
              {dataScience.map((tech, i) => (
                <TechIcon key={i} {...tech} theme={theme} isVisible={isVisible} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div className={`absolute top-0 right-0 w-[500px] h-[500px] blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 
        ${theme === "dynamic" ? "bg-purple-600/10" : theme === "dark" ? "bg-primary/5" : "bg-blue-400/10"}`} />
      <div className={`absolute bottom-0 left-0 w-[500px] h-[500px] blur-[150px] rounded-full translate-y-1/2 -translate-x-1/2 
        ${theme === "dynamic" ? "bg-pink-600/10" : theme === "dark" ? "bg-blue-500/5" : "bg-primary/10"}`} />
    </section>
  );
};

export default SkillsSection;
