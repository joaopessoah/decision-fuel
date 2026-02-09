import { Link } from "react-router-dom";
import { Mail, Linkedin, MapPin } from "lucide-react";

const footerLinks = {
  empresa: [
    { href: "/sobre", label: "Sobre" },
    { href: "/servicos", label: "Serviços" },
    { href: "/metodologia", label: "Metodologia" },
    { href: "/cases", label: "Cases" },
  ],
  solucoes: [
    { href: "/solucoes#saude", label: "Saúde" },
    { href: "/solucoes#juridico", label: "Jurídico" },
    { href: "/solucoes#rh", label: "Recursos Humanos" },
    { href: "/solucoes#financeiro", label: "Financeiro" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-graphite border-t border-border">
      <div className="container-tight section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <span className="text-2xl font-display font-bold">
                <span className="text-gold">+351</span>
                <span className="text-foreground"> Data</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Transformamos dados em decisões estratégicas. 
              Consultoria especializada para empresas que precisam decidir melhor.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="mailto:contato@mais351.com.br"
                className="text-muted-foreground hover:text-gold transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-gold transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Links - Empresa */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              Empresa
            </h4>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-gold text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links - Soluções */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              Soluções
            </h4>
            <ul className="space-y-3">
              {footerLinks.solucoes.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-gold text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              Contato
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-gold mt-0.5" />
                <span className="text-muted-foreground text-sm">
                  contato@mais351.com.br
                </span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-gold mt-0.5" />
                <span className="text-muted-foreground text-sm">
                  Brasil & Portugal
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} +351 Data. Todos os direitos reservados.
            </p>
            <p className="text-muted-foreground text-sm italic">
              "Dados que viram decisão."
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
