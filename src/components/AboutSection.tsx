import { motion } from "framer-motion";
import {
  Smartphone,
  Video,
  Lightbulb,
  Cpu,
  Dumbbell,
  Car,
  UtensilsCrossed,
} from "lucide-react";

const professional = [
  { icon: Smartphone, label: "Dev Mobile", desc: "React Native" },
  { icon: Video, label: "Edição de Vídeo", desc: "Conteúdo criativo" },
  { icon: Lightbulb, label: "Proativo", desc: "Resolução de problemas" },
];

const personal = [
  { icon: Cpu, label: "PC Builder", desc: "Specs & RGB" },
  { icon: Dumbbell, label: "Fitness", desc: "Disciplina diária" },
  { icon: Car, label: "Carros", desc: "Paixão por dirigir" },
  { icon: UtensilsCrossed, label: "Foodie", desc: "Apreciador de comida" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

const AboutSection = () => (
  <section id="about" className="py-24 md:py-32 px-4">
    <div className="max-w-6xl mx-auto">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
          O <span className="gradient-text">Hardware</span> e o{" "}
          <span className="gradient-text">Software</span>
        </h2>
        <p className="text-muted-foreground font-body max-w-lg mx-auto">
          A dualidade entre o profissional focado e o entusiasta de tecnologia.
        </p>
      </motion.div>

      {/* Professional */}
      <div className="mb-12">
        <motion.h3
          className="font-display text-sm tracking-[0.2em] uppercase text-neon-purple mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          // Profissional
        </motion.h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {professional.map((item, i) => (
            <motion.div
              key={item.label}
              className="glass-card gradient-border p-6 group hover:bg-card/60 transition-colors duration-300"
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <item.icon className="w-8 h-8 text-neon-purple mb-4 group-hover:drop-shadow-[0_0_8px_hsl(270,100%,65%)] transition-all duration-300" />
              <h4 className="font-display text-sm font-semibold text-foreground mb-1">
                {item.label}
              </h4>
              <p className="text-muted-foreground text-sm font-body">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Personal */}
      <div>
        <motion.h3
          className="font-display text-sm tracking-[0.2em] uppercase text-neon-green mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          // Pessoal
        </motion.h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {personal.map((item, i) => (
            <motion.div
              key={item.label}
              className="glass-card gradient-border p-6 group hover:bg-card/60 transition-colors duration-300"
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <item.icon className="w-8 h-8 text-neon-green mb-4 group-hover:drop-shadow-[0_0_8px_hsl(145,100%,45%)] transition-all duration-300" />
              <h4 className="font-display text-xs font-semibold text-foreground mb-1">
                {item.label}
              </h4>
              <p className="text-muted-foreground text-xs font-body">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
