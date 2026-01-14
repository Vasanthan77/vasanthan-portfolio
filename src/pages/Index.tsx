import { useState } from "react";
import MotionBackground from "@/components/MotionBackground";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import ThemeToggle from "@/components/ThemeToggle";
import CrystalCursor from "@/components/CrystalCursor";
import ScrollDownFloating from "@/components/ScrollDownFloating";
const Index = () => {
  return (
    <div className="relative min-h-screen">
      <CrystalCursor />
      <MotionBackground />
      <div className="relative z-10 bg-transparent">
        <HeroSection />
        <div className="bg-transparent"><AboutSection /></div>
        <div className="bg-transparent"><ProjectsSection /></div>
        <div className="bg-transparent"><SkillsSection /></div>
        <div className="bg-transparent"><ContactSection /></div>

        <footer className="relative py-8 px-4 text-center text-muted-foreground border-t border-border/30">
          <p>&copy; 2025 Vasanthan Dev. Crafted with passion and innovation.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
