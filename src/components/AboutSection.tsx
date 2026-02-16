import { LazyMotion, domAnimation, m } from "framer-motion";
import { Smartphone, Video, Cpu, Dumbbell, User } from "lucide-react";

const N8nIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
    {...props}
  >
    <path d="M12.793 1.157L7.432 4.25v6.18l5.361 3.095 5.361-3.095V4.25l-5.361-3.093zM5.96 5.1v6.18L.6 14.375V8.195L5.96 5.101zm1.472 6.18v6.184l5.361 3.093 5.361-3.093v-6.184l-5.361 3.093-5.361-3.093z" />
  </svg>
);

const professional = [
  { icon: Smartphone, label: "Dev Mobile", desc: "React Native" },
  { icon: Video, label: "Edição de Vídeo", desc: "Conteúdo criativo" },
  { icon: N8nIcon, label: "Automação", desc: "n8n" },
];

const personal = [
  { icon: Cpu, label: "PC Builder", desc: "Specs & RGB" },
  { icon: Dumbbell, label: "Fitness", desc: "Disciplina diária" },
];

const profilePhotoPath = `${import.meta.env.BASE_URL}profile.webp`;

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

const AboutSection = () => (
  <LazyMotion features={domAnimation}>
    <section id="about" className="py-24 md:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <m.div
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
            A dualidade entre o profissional focado e o entusiasta de
            tecnologia.
          </p>
        </m.div>

        {/* Photo + Bio */}
        <m.div
          className="glass-card gradient-border p-6 md:p-10 mb-16 flex flex-col md:flex-row items-center gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Coloque sua foto em /public/profile.jpg ou altere o caminho em profilePhotoPath */}
          <div className="relative shrink-0 w-40 h-40 md:w-52 md:h-52 rounded-2xl overflow-hidden border-2 border-border bg-muted flex items-center justify-center neon-glow-purple">
            <img
              src={profilePhotoPath}
              alt="Foto de Bryan Assunção"
              className="absolute inset-0 w-full h-full object-cover"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
            <User className="w-20 h-20 text-muted-foreground" />
          </div>

          <div className="text-center md:text-left">
            <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-3">
              Bryan <span className="gradient-text">Assunção</span>
            </h3>
            <p className="text-muted-foreground font-body leading-relaxed text-sm md:text-base max-w-xl">
              Desenvolvedor Mobile React Native, apaixonado por tecnologia,
              hardware e inovação. Sempre buscando evoluir — tanto no código
              quanto na vida. Quando não estou programando, estou montando PCs,
              treinando na academia ou explorando novas tecnologias.
            </p>
          </div>
        </m.div>

        {/* Professional */}
        <div className="mb-12">
          <m.h3
            className="font-display text-sm tracking-[0.2em] uppercase text-neon-purple mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            // Profissional
          </m.h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {professional.map((item, i) => (
              <m.div
                key={item.label}
                className="glass-card gradient-border p-6 group hover:bg-card/60 transition-colors duration-300"
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <item.icon className="w-8 h-8 text-neon-purple mb-4 group-hover:drop-shadow-[0_0_8px_hsl(270,100%,75%)] transition-all duration-300" />
                <h4 className="font-display text-sm font-semibold text-foreground mb-1">
                  {item.label}
                </h4>
                <p className="text-muted-foreground text-sm font-body">
                  {item.desc}
                </p>
              </m.div>
            ))}
          </div>
        </div>

        {/* Personal */}
        <div>
          <m.h3
            className="font-display text-sm tracking-[0.2em] uppercase text-neon-green mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            // Pessoal
          </m.h3>
          <div className="grid grid-cols-2 gap-4">
            {personal.map((item, i) => (
              <m.div
                key={item.label}
                className="glass-card gradient-border p-6 group hover:bg-card/60 transition-colors duration-300"
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <item.icon className="w-8 h-8 text-neon-green mb-4 group-hover:drop-shadow-[0_0_8px_hsl(145,100%,55%)] transition-all duration-300" />
                <h4 className="font-display text-xs font-semibold text-foreground mb-1">
                  {item.label}
                </h4>
                <p className="text-muted-foreground text-xs font-body">
                  {item.desc}
                </p>
              </m.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  </LazyMotion>
);

export default AboutSection;
