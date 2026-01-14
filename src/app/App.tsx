import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// 1. Change BrowserRouter to HashRouter
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useLayoutEffect } from "react";
import { AnimatePresence } from "motion/react";
import Index from "../pages/Index";
import NotFound from "../pages/NotFound";
import ScrollDownFloating from "../components/ScrollDownFloating";
import SplashScreen from "../components/SplashScreen";
import ThemeToggle from "../components/ThemeToggle";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState<"light" | "dark" | "dynamic">(() => {
    return (localStorage.getItem("theme") as any) || "dark";
  });

  // Handle theme application
  useLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark", "dynamic");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className={`relative min-h-screen transition-all duration-1000 ${isLoading ? "blur-md pointer-events-none" : "blur-0"}`}>
          <Toaster />
          <Sonner />
          
          {/* 2. Using Router (HashRouter) instead of BrowserRouter */}
          <Router>
            <ScrollDownFloating />
            <ThemeToggle currentTheme={theme} onThemeChange={setTheme} />
            <Routes>
              <Route path="/" element={<Index />} />
              {/* This catches everything else and shows your NotFound page */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </div>

        <AnimatePresence>
          {isLoading && (
            <SplashScreen finishLoading={() => setIsLoading(false)} />
          )}
        </AnimatePresence>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;