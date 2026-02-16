import { LazyMotion, domAnimation, m } from "framer-motion";
import { ChevronDown } from "lucide-react";

const HeroSection = () => {
  const scrollToProjects = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <LazyMotion features={domAnimation}>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg">
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-background" />

        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-neon-purple/5 blur-[80px] animate-float will-change-transform" />
        <div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-neon-blue/5 blur-[80px] animate-float will-change-transform"
          style={{ animationDelay: "1.5s" }}
        />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <m.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="font-body text-sm md:text-base tracking-[0.3em] uppercase text-muted-foreground mb-6">
              Bryan Assunção — Desenvolvedor Mobile
            </p>
          </m.div>

          <m.h1
            className="font-display text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <span className="gradient-text">Código, Hardware</span>
            <br />
            <span className="text-foreground">e Inovação</span>
          </m.h1>

          <m.p
            className="font-body text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            Desenvolvedor movido pela paixão por tecnologia e inovação.
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            <button
              onClick={scrollToProjects}
              className="gradient-border bg-black/80 backdrop-blur-sm px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--neon-purple)/0.3)] hover:scale-105 group"
            >
              <span className="font-display font-semibold tracking-wider uppercase text-sm md:text-base gradient-text group-hover:brightness-125 transition-all">
                Ver Projetos
              </span>
            </button>
          </m.div>
        </div>

        {/* Scroll indicator */}
        <m.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6 text-muted-foreground" />
        </m.div>
      </section>
    </LazyMotion>
  );
};

export default HeroSection;
