import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { ExternalLink, Smartphone, Sparkles } from "lucide-react";

const ProjectsSection = () => {
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      themeObserver.disconnect();
    };
  }, []);

  const getGlowColor = () => {
    if (theme === "dynamic") return "rgba(217, 70, 239, 0.3)";
    if (theme === "dark") return "rgba(0, 229, 255, 0.3)";
    return "rgba(37, 99, 235, 0.2)";
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen flex items-center px-4 sm:px-6 lg:px-8 py-20"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
            }`}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-12 text-center">
            <span className="text-gradient">Featured Project</span>
          </h2>

          <div
            className="glass-morphism p-8 lg:p-12 rounded-3xl transition-all duration-500 hover:scale-105 hover:-translate-y-3 cursor-pointer shadow-lg"
            style={{ boxShadow: isVisible ? `0 20px 40px ${getGlowColor()}` : '' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `0 40px 80px ${getGlowColor().replace('0.3', '0.5').replace('0.2', '0.4')}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = `0 20px 40px ${getGlowColor()}`;
            }}
          >
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-br from-primary to-secondary rounded-xl">
                    <Smartphone className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-bold">Vannam</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-2 rounded-full text-sm font-medium bg-primary text-white">
                    AI Technology
                  </span>
                  <span className="px-4 py-2 rounded-full text-sm font-medium bg-white/5 text-foreground/80">
                    App Development
                  </span>
                  <span className="px-4 py-2 rounded-full text-sm font-medium bg-white/5 text-foreground/80">
                    Innovation
                  </span>
                </div>

                <p className="text-lg text-foreground/80 leading-relaxed">
                  Revolutionary vertical moving wall painting application powered by artificial intelligence.
                  Vannam transforms traditional wall art into dynamic, interactive experiences using cutting-edge
                  AI technology and innovative app development.
                </p>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Sparkles className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <p className="text-foreground/80">AI-powered wall painting automation</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Sparkles className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <p className="text-foreground/80">Vertical movement technology integration</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Sparkles className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <p className="text-foreground/80">Real-time creative control through mobile app</p>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="group bg-gradient-to-r from-primary to-primary hover:shadow-[var(--shadow-glow)] transition-all duration-300 text-white font-bold"
                >
                  View Project Details
                  <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              <div className="relative">
                <div className="aspect-square glass-morphism rounded-3xl p-8 flex items-center justify-center group">
                  <div className="text-center space-y-6">
                    <div className="relative inline-block">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent rounded-full blur-3xl opacity-50 animate-pulse" />
                      <Smartphone className="relative h-32 w-32 text-primary animate-float" />
                    </div>
                    <p className="text-2xl font-bold text-gradient">Vannam App</p>
                    <p className="text-foreground/70">AI-Powered Wall Painting</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
