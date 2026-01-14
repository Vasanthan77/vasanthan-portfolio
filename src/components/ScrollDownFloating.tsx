import { ArrowDown } from "lucide-react";

const ScrollDownFloating = () => {
  const scrollNext = () => {
    const sections = document.querySelectorAll("section");
    const current = window.scrollY + window.innerHeight / 2;

    let nextSection: HTMLElement | null = null;

    sections.forEach((sec) => {
      const top = sec.offsetTop;
      if (top > current && !nextSection) {
        nextSection = sec as HTMLElement;
      }
    });

    nextSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollNext}
      className="
        fixed bottom-8 left-1/2 -translate-x-1/2 z-50
        bg-primary/20 hover:bg-primary/40 backdrop-blur-md
        p-3 rounded-full border border-primary/40
        transition-all hover:scale-110 shadow-xl
        animate-bounce
      "
      aria-label="Scroll to next section"
    >
      <ArrowDown className="h-7 w-7 text-primary" />
    </button>
  );
};

export default ScrollDownFloating;
