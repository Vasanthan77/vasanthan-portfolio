import { useEffect, useRef, useState } from "react";
import { GraduationCap, Briefcase, Award } from "lucide-react";
import AboutNetworkModal from "./AboutNetworkModal";

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
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
      id="about"
      ref={sectionRef}
      className="relative min-h-screen flex items-center px-4 sm:px-6 lg:px-8 py-20"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
            }`}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-12 text-center">
            <span className="text-gradient">About Me</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">

            {/* CARD 1 - Education */}
            <div
              onClick={() => setShowModal(true)}
              className="glass-morphism p-8 rounded-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-3 cursor-pointer shadow-lg"
              style={{ boxShadow: isVisible ? `0 20px 40px ${getGlowColor()}` : '' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 40px 80px ${getGlowColor().replace('0.3', '0.5').replace('0.2', '0.4')}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = `0 20px 40px ${getGlowColor()}`;
              }}
            >
              <div className="flex flex-col items-center group">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-primary/10 rounded-full group-hover:scale-110 transition-transform">
                    <GraduationCap className="h-10 w-10 text-primary" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center">Education</h3>
                <div className="space-y-3 text-center">
                  <p className="text-lg text-foreground">MTech CSE</p>
                  <p className="text-foreground/70">Currently 3rd Year</p>
                  <p className="text-primary font-semibold">84.3% in 12th Grade</p>
                </div>
                <p className="text-center text-sm text-primary mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  Click to explore network →
                </p>
              </div>
            </div>

            {/* CARD 2 - Experience */}
            <div
              className="glass-morphism p-8 rounded-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-3 cursor-pointer shadow-lg"
              style={{ boxShadow: isVisible ? `0 20px 40px ${getGlowColor()}` : '' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 40px 80px ${getGlowColor().replace('0.3', '0.5').replace('0.2', '0.4')}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = `0 20px 40px ${getGlowColor()}`;
              }}
            >
              <div className="flex flex-col items-center group">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-cyan-500/10 rounded-full group-hover:scale-110 transition-transform">
                    <Briefcase className="h-10 w-10 text-primary" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center">Experience</h3>
                <div className="space-y-3 text-center">
                  <p className="text-lg font-semibold text-foreground">SBV Technologies</p>
                  <p className="text-foreground/70">Software Development Intern</p>
                  <p className="text-primary">30 Days Internship</p>
                </div>
              </div>
            </div>

            {/* CARD 3 - Expertise */}
            <div
              className="glass-morphism p-8 rounded-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-3 cursor-pointer shadow-lg"
              style={{ boxShadow: isVisible ? `0 20px 40px ${getGlowColor()}` : '' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 40px 80px ${getGlowColor().replace('0.3', '0.5').replace('0.2', '0.4')}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = `0 20px 40px ${getGlowColor()}`;
              }}
            >
              <div className="flex flex-col items-center group">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-primary/10 rounded-full group-hover:scale-110 transition-transform">
                    <Award className="h-10 w-10 text-primary" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center">Expertise</h3>
                <div className="space-y-3 text-center">
                  <p className="text-lg text-foreground">App Development</p>
                  <p className="text-foreground/70">Software Development</p>
                  <p className="text-primary">AI Technology</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Neural Network Modal */}
      <AboutNetworkModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </section>
  );
};

export default AboutSection;
