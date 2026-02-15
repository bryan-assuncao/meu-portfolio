import { motion } from "framer-motion";

const techs = [
  {
    name: "React Native",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    main: true,
  },
  {
    name: "TypeScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    name: "JavaScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    name: "Python",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "IA",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
  },
  {
    name: "Java",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  },
  {
    name: "Git",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  {
    name: "Firebase",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  },
  {
    name: "AWS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  },
  {
    name: "GCP",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
  },
];

const TechStack = () => (
  <section id="tech" className="py-24 md:py-32 px-4">
    <div className="max-w-4xl mx-auto text-center">
      <motion.h2
        className="font-display text-3xl md:text-4xl font-bold mb-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Minha <span className="gradient-text">Stack</span>
      </motion.h2>
      <motion.p
        className="text-muted-foreground font-body mb-14 max-w-md mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        As tecnologias que uso para transformar ideias em realidade.
      </motion.p>

      <div className="flex flex-wrap justify-center gap-8 md:gap-12">
        {techs.map((tech, i) => (
          <motion.div
            key={tech.name}
            className={`glass-card gradient-border flex flex-col items-center justify-center p-6 md:p-8 ${
              tech.main ? "w-32 h-32 md:w-40 md:h-40 neon-glow-blue" : "w-24 h-24 md:w-32 md:h-32"
            } group hover:scale-105 transition-transform duration-300`}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <img
              src={tech.logo}
              alt={tech.name}
              className={`${tech.main ? "w-14 h-14 md:w-16 md:h-16" : "w-10 h-10 md:w-12 md:h-12"} mb-3 group-hover:drop-shadow-[0_0_12px_hsl(200,100%,50%)] transition-all duration-300`}
            />
            <span className="font-display text-[10px] md:text-xs text-muted-foreground group-hover:text-foreground transition-colors">
              {tech.name}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Hardware knowledge badge */}
      <motion.div
        className="mt-12 inline-flex items-center gap-2 glass-card px-5 py-3 rounded-full"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <span className="w-2 h-2 rounded-full bg-neon-green animate-glow-pulse" />
        <span className="font-body text-sm text-muted-foreground">
          + Conhecimento em Hardware
        </span>
      </motion.div>
    </div>
  </section>
);

export default TechStack;
