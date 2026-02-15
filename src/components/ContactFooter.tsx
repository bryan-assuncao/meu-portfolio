import { motion } from "framer-motion";
import { Linkedin, Github, Mail } from "lucide-react";

const links = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/devbryan/",
  },
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/bryan-assuncao",
  },
];

const ContactFooter = () => (
  <footer id="contact" className="py-20 md:py-28 px-4 border-t border-border/30">
    <div className="max-w-4xl mx-auto text-center">
      <motion.h2
        className="font-display text-3xl md:text-4xl font-bold mb-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Vamos <span className="gradient-text">Conectar</span>
      </motion.h2>
      <motion.p
        className="text-muted-foreground font-body mb-12 max-w-md mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        Aberto a novas oportunidades e projetos desafiadores.
      </motion.p>

      <motion.div
        className="flex justify-center gap-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card gradient-border p-5 group hover:scale-105 transition-transform duration-300 flex flex-col items-center gap-3"
          >
            <link.icon className="w-7 h-7 text-muted-foreground group-hover:text-neon-purple transition-colors duration-300 group-hover:drop-shadow-[0_0_10px_hsl(270,100%,65%)]" />
            <span className="font-display text-xs text-muted-foreground group-hover:text-foreground transition-colors">
              {link.label}
            </span>
          </a>
        ))}
      </motion.div>

      <motion.p
        className="mt-16 text-xs text-muted-foreground font-body"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        © {new Date().getFullYear()} Bryan — Feito com paixão por código e tecnologia.
      </motion.p>
    </div>
  </footer>
);

export default ContactFooter;
