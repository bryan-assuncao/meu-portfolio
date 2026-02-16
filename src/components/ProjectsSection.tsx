import { LazyMotion, domAnimation, m } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    name: "Buscador de Séries",
    desc: "Aplicação Spring Boot para buscar e catalogar séries de TV via API.",
    tech: ["Java", "Spring Boot"],
    repo: "https://github.com/bryan-assuncao/buscador-de-series-spring",
  },
  {
    name: "Sistema de Vendas",
    desc: "Sistema completo de gerenciamento de vendas com controle de estoque.",
    tech: ["C#", ".NET"],
    repo: "https://github.com/bryan-assuncao/sistema-de-vendas",
  },
  {
    name: "Chatbot ICP-Brasil",
    desc: "Chatbot local com IA para responder dúvidas sobre certificação digital ICP-Brasil.",
    tech: ["Python", "IA"],
    repo: "https://github.com/bryan-assuncao/chatbot-local-icpbrasil",
  },
  {
    name: "Game Master AI",
    desc: "IA que atua como mestre de RPG, gerando narrativas e aventuras interativas.",
    tech: ["Python", "IA"],
    repo: "https://github.com/bryan-assuncao/game-master-ai",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12, ease: "easeOut" as const },
  }),
};

const ProjectsSection = () => (
  <LazyMotion features={domAnimation}>
    <section id="projects" className="py-24 md:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <m.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Meus <span className="gradient-text">Projetos</span>
          </h2>
          <p className="text-muted-foreground font-body max-w-lg mx-auto">
            Alguns dos projetos que construí explorando diferentes tecnologias.
          </p>
        </m.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <m.a
              key={project.name}
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card gradient-border p-6 group hover:bg-card/60 transition-colors duration-300 block"
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="flex items-start justify-between mb-3">
                <Github className="w-6 h-6 text-muted-foreground group-hover:text-neon-purple transition-colors duration-300" />
                <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h3 className="font-display text-sm md:text-base font-semibold text-foreground mb-2">
                {project.name}
              </h3>
              <p className="text-muted-foreground text-sm font-body mb-4 leading-relaxed">
                {project.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-display uppercase tracking-wider px-2 py-1 rounded-full bg-muted/50 text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </m.a>
          ))}
        </div>
      </div>
    </section>
  </LazyMotion>
);

export default ProjectsSection;
