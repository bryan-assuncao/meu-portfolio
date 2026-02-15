import { motion } from "framer-motion";
import { Linkedin, Github, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
    {...props}
  >
    <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.151-.174.2-.298.3-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.07 0C5.537 0 .181 5.37.179 11.964a11.954 11.954 0 001.839 6.391L0 24l5.784-1.894a11.943 11.943 0 006.29 1.74h.004c6.532 0 11.889-5.369 11.892-11.961.002-3.196-1.229-6.194-3.486-8.452" fill="currentColor" />
  </svg>
);

const links = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/devbryan/",
    colorClass: "group-hover:text-blue-600 group-hover:drop-shadow-[0_0_10px_rgba(37,99,235,0.7)]"
  },
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/bryan-assuncao",
    colorClass: "group-hover:text-blue-600 group-hover:drop-shadow-[0_0_10px_rgba(37,99,235,0.7)]"
  },
  {
    icon: WhatsAppIcon,
    label: "WhatsApp",
    href: "https://wa.me/5551991924156",
    colorClass: "group-hover:text-green-500 group-hover:drop-shadow-[0_0_10px_rgba(34,197,94,0.7)]"
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:bryan.assuncao.dev@gmail.com",
    colorClass: "group-hover:text-red-500 group-hover:drop-shadow-[0_0_10px_rgba(239,68,68,0.7)]"
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
            className="glass-card gradient-border w-32 h-32 p-5 group hover:scale-105 transition-transform duration-300 flex flex-col items-center justify-center gap-3"
          >
            <link.icon className={cn("w-7 h-7 text-muted-foreground transition-all duration-300", link.colorClass)} />
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
        © {new Date().getFullYear()} Copyright by &lt;Bryan de Assunção/&gt;
      </motion.p>
    </div>
  </footer>
);

export default ContactFooter;
