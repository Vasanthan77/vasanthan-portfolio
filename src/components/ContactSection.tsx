import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { toast } = useToast();

  useEffect(() => {
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

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen flex items-center px-4 sm:px-6 lg:px-8 py-20"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
            }`}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-12 text-center">
            <span className="text-gradient">Get In Touch</span>
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-8">
              <div className="glass-morphism p-8 rounded-2xl">
                <h3 className="text-2xl font-bold mb-6">Let's Connect</h3>
                <p className="text-foreground/70 mb-8 leading-relaxed">
                  I'm always open to discussing new projects, creative ideas, or opportunities
                  to be part of your vision. Feel free to reach out!
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-foreground/50">Email</p>
                      <p className="font-medium text-foreground">vasanthandg@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-foreground/50">Phone</p>
                      <p className="font-medium text-foreground">+91 7845136537</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-foreground/50">Location</p>
                      <p className="font-medium text-foreground">India</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-morphism p-8 rounded-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    placeholder="Your Name"
                    className="bg-transparent border-foreground/20 text-foreground placeholder:text-foreground/40 focus:border-primary focus-visible:ring-primary transition-all p-6"
                    required
                  />
                </div>

                <div>
                  <Input
                    type="email"
                    placeholder="Your Email"
                    className="bg-transparent border-foreground/20 text-foreground placeholder:text-foreground/40 focus:border-primary focus-visible:ring-primary transition-all p-6"
                    required
                  />
                </div>

                <div>
                  <Input
                    placeholder="Subject"
                    className="bg-transparent border-foreground/20 text-foreground placeholder:text-foreground/40 focus:border-primary focus-visible:ring-primary transition-all p-6"
                    required
                  />
                </div>

                <div>
                  <Textarea
                    placeholder="Your Message"
                    rows={5}
                    className="bg-transparent border-foreground/20 text-foreground placeholder:text-foreground/40 focus:border-primary focus-visible:ring-primary transition-all resize-none p-6"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full group bg-gradient-to-r from-primary to-primary/80 hover:scale-[1.02] transition-all duration-300 text-white font-bold shadow-lg"
                >
                  Send Message
                  <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
