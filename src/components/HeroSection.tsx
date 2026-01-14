import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { NeuralText } from "./NeuralText";
import { motion } from "motion/react";
/* Ensure this path is correct; use me.png or me.jpg as per your folder */
import myProfileImage from "../assets/me.png";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    setIsVisible(true);
    const checkTheme = () => {
      if (document.documentElement.classList.contains("dynamic")) setTheme("dynamic");
      else if (document.documentElement.classList.contains("dark")) setTheme("dark");
      else setTheme("light");
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const description = "Passionate MTech CSE student specializing in building high-performance applications and AI-driven solutions. Dedicated to creating seamless digital experiences through innovative research and clean code.";
  const words = description.split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-12 overflow-hidden bg-transparent"
    >
      {/* --- LEFT SOCIAL BAR: Theme-Responsive Colors --- */}
      <div className="hidden lg:flex flex-col gap-8 fixed left-8 top-1/2 -translate-y-1/2 z-40">
        {[
          { icon: Github, link: "https://github.com", label: "Github" },
          { icon: Linkedin, link: "https://linkedin.com", label: "Linkedin" },
          { icon: Mail, link: "mailto:vasanthandg@gmail.com", label: "Email" }
        ].map((item, i) => (
          <a key={i} href={item.link} target="_blank" rel="noreferrer" className="group">
            <div className="flex flex-col items-center gap-1">
              <item.icon className={`h-6 w-6 transition-all duration-300
                ${theme === "dynamic" ? "animate-rainbow-text" : "text-primary"}
                group-hover:scale-110 
                group-hover:drop-shadow-[0_0_10px_currentColor]`}
              />
              <span className={`text-[10px] font-medium capitalize opacity-0 group-hover:opacity-100 transition-all 
                ${theme === "dynamic" ? "animate-rainbow-text" : "text-primary"}`}>
                {item.label}
              </span>
            </div>
          </a>
        ))}
        <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-primary to-transparent mx-auto mt-4" />
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="container mx-auto max-w-7xl z-10 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-20">

          {/* IMAGE SECTION - Hair in front of ring fixed */}
          <div className={`lg:col-span-4 flex justify-center lg:justify-start transition-all duration-1000 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-32 opacity-0"
            }`}>
            <div className="relative group">
              {/* NEON RING - Adjusted Z-index to be BEHIND the image */}
              <div className="absolute inset-0 z-0 neon-ring pointer-events-none" style={{ transform: 'scale(1.05)' }} />

              {/* PROFILE IMAGE - Rounded-full with high z-index to bring hair forward */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden z-20 transition-transform duration-700 group-hover:scale-105">
                <img
                  src={myProfileImage}
                  alt="Vasanthan"
                  className="w-full h-full object-cover relative z-30"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-40 z-40" />
              </div>
            </div>
          </div>

          {/* TEXT & NEURAL TEXT SECTION */}
          <div className={`lg:col-span-8 flex flex-col items-center text-center space-y-8 transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
            }`}>
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-3 mb-2">
                <h1 className={`text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight transition-colors duration-500
                  ${theme === "dynamic" ? "bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400" : "text-primary"}`}>
                  {"Hi, I am".split("").map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        duration: 0.1,
                        delay: i * 0.1,
                        ease: "easeIn"
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                  <motion.span
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    className={`inline-block w-[3px] h-10 md:h-14 ml-2 align-middle ${theme === "dynamic" ? "bg-purple-400" : "bg-primary"}`}
                  />
                </h1>
              </div>

              {/* RESTORED NEURAL TEXT */}
              <div className="scale-90 sm:scale-105 lg:scale-115 py-4 flex justify-center w-full">
                <NeuralText />
              </div>
            </div>

            <div className="space-y-4 max-w-2xl">
              <p className={`text-xl sm:text-2xl font-semibold transition-colors duration-500 
                ${theme === "dynamic" ? "text-purple-200" : "text-foreground"}`}>
                App Developer & Software Engineer
              </p>
              {/* TYPING DESCRIPTION - 5 SECONDS */}
              <div className={`text-base leading-relaxed italic min-h-[4.5em] transition-colors duration-500
                ${theme === "dynamic" ? "text-purple-100/70" : "text-foreground/80"}`}>
                {words.map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.25,
                      delay: i * (5 / words.length),
                      ease: "easeIn"
                    }}
                    className="inline-block mr-1"
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* BUTTONS: Azure Blue Themed */}
            <div className="flex flex-wrap gap-6 justify-center pt-6">
              <Button
                className={`rounded-full px-10 py-6 font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg
                  ${theme === "dynamic"
                    ? "bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 animate-gradient-x"
                    : "bg-gradient-to-r from-primary to-blue-600 shadow-primary/20"}`}
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              >
                View Projects <ArrowDown className="ml-2 h-4 w-4 animate-bounce" />
              </Button>

              <Button
                variant="outline"
                className={`rounded-full px-10 py-6 transition-all font-bold
                  ${theme === "dynamic"
                    ? "border-purple-500 text-purple-300 hover:bg-purple-500/10"
                    : "border-primary/30 text-foreground hover:bg-primary/10"}`}
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Get in Touch
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;