import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { 
  ArrowRight, 
  Building2, 
  Scale, 
  Users, 
  Wallet,
  Activity,
  TrendingDown,
  FileText,
  AlertTriangle,
  UserMinus,
  Clock,
  DollarSign,
  PieChart
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/shared/SectionTitle";

const sectors = [
  {
    id: "saude",
    icon: Building2,
    name: "Saúde",
    title: "Dados para decisões na área da Saúde",
    description: "Indicadores assistenciais e financeiros para hospitais, clínicas e operadoras de saúde.",
    challenges: [
      "Controle de custos assistenciais",
      "Gestão de leitos e ocupação",
      "Análise de produtividade médica",
      "Indicadores de qualidade assistencial",
    ],
    solutions: [
      { icon: Activity, text: "Dashboards de indicadores assistenciais" },
      { icon: TrendingDown, text: "Análise de custos e eficiência" },
      { icon: PieChart, text: "Relatórios de produção e ocupação" },
      { icon: AlertTriangle, text: "Alertas de variações críticas" },
    ],
    impact: "Hospitais e clínicas que organizam seus dados reduzem custos e melhoram a qualidade do atendimento.",
  },
  {
    id: "juridico",
    icon: Scale,
    name: "Jurídico",
    title: "Dados para decisões no setor Jurídico",
    description: "Gestão de processos, riscos e resultados para escritórios e departamentos jurídicos.",
    challenges: [
      "Visibilidade do contencioso",
      "Análise de riscos e provisões",
      "Acompanhamento de prazos",
      "Gestão de honorários e custas",
    ],
    solutions: [
      { icon: FileText, text: "Painéis de gestão de processos" },
      { icon: AlertTriangle, text: "Análise de riscos e provisões" },
      { icon: Clock, text: "Controle de prazos automatizado" },
      { icon: DollarSign, text: "Relatórios financeiros do jurídico" },
    ],
    impact: "Departamentos jurídicos com dados organizados tomam decisões mais seguras sobre seu contencioso.",
  },
  {
    id: "rh",
    icon: Users,
    name: "Recursos Humanos",
    title: "Dados para decisões em RH",
    description: "Indicadores de pessoas para gestão estratégica de talentos e clima organizacional.",
    challenges: [
      "Turnover e retenção de talentos",
      "Absenteísmo e produtividade",
      "Gestão de headcount e custos",
      "Análise de clima e engajamento",
    ],
    solutions: [
      { icon: UserMinus, text: "Dashboards de turnover e absenteísmo" },
      { icon: TrendingDown, text: "Análise de custos de pessoal" },
      { icon: Activity, text: "Indicadores de produtividade" },
      { icon: PieChart, text: "Relatórios de headcount" },
    ],
    impact: "Empresas que medem seus indicadores de pessoas conseguem reter mais talentos e reduzir custos.",
  },
  {
    id: "financeiro",
    icon: Wallet,
    name: "Financeiro",
    title: "Dados para decisões Financeiras",
    description: "Fluxo de caixa, inadimplência e projeções para suporte a decisões críticas.",
    challenges: [
      "Visibilidade do fluxo de caixa",
      "Controle de inadimplência",
      "Projeções e cenários",
      "Análise de rentabilidade",
    ],
    solutions: [
      { icon: DollarSign, text: "Dashboards de fluxo de caixa" },
      { icon: AlertTriangle, text: "Análise de inadimplência" },
      { icon: TrendingDown, text: "Projeções e simulações" },
      { icon: PieChart, text: "Relatórios de rentabilidade" },
    ],
    impact: "Empresas com visão clara de suas finanças tomam decisões mais seguras e evitam surpresas.",
  },
];

export default function Solucoes() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-dark relative overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        
        <div className="container-tight relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="inline-block text-gold text-sm font-medium uppercase tracking-widest mb-6">
              Soluções por Setor
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
              Expertise em{" "}
              <span className="text-gradient">segmentos estratégicos</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Atuamos em setores que demandam visão estratégica de dados, com soluções personalizadas para cada realidade.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sectors Navigation */}
      <section className="py-8 bg-graphite border-b border-border sticky top-20 z-40">
        <div className="container-tight">
          <div className="flex flex-wrap justify-center gap-4">
            {sectors.map((sector) => (
              <a
                key={sector.id}
                href={`#${sector.id}`}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-secondary hover:bg-gold/10 hover:text-gold transition-colors text-sm font-medium"
              >
                <sector.icon className="w-4 h-4" />
                {sector.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors Details */}
      {sectors.map((sector, index) => (
        <section
          key={sector.id}
          id={sector.id}
          className={`section-padding ${index % 2 === 0 ? "" : "bg-graphite"}`}
        >
          <div className="container-tight">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-xl bg-gold/10 flex items-center justify-center">
                    <sector.icon className="w-8 h-8 text-gold" />
                  </div>
                  <div>
                    <span className="text-gold text-sm font-medium uppercase tracking-widest">
                      {sector.name}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                      {sector.title}
                    </h2>
                  </div>
                </div>
                <p className="text-lg text-muted-foreground mb-8">
                  {sector.description}
                </p>

                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Desafios comuns:
                </h3>
                <ul className="space-y-3 mb-8">
                  {sector.challenges.map((challenge) => (
                    <li key={challenge} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{challenge}</span>
                    </li>
                  ))}
                </ul>

                <div className="p-6 rounded-xl bg-gold/5 border border-gold/20">
                  <p className="text-foreground italic">"{sector.impact}"</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="glass-card rounded-2xl p-8 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-gold" />
                  <h3 className="text-lg font-semibold text-foreground mb-6">
                    Nossas soluções para {sector.name}:
                  </h3>
                  <div className="space-y-4">
                    {sector.solutions.map((solution) => (
                      <div
                        key={solution.text}
                        className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50"
                      >
                        <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                          <solution.icon className="w-5 h-5 text-gold" />
                        </div>
                        <span className="text-foreground">{solution.text}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8">
                    <Button variant="gold" className="w-full" asChild>
                      <Link to="/contato">
                        Falar sobre {sector.name}
                        <ArrowRight className="ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-b from-background via-graphite to-background">
        <div className="container-tight">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
              Seu setor não está na lista?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              A +351 Data tem experiência em diversos setores. Entre em contato e conte sobre seu cenário.
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link to="/contato">
                Falar com um especialista
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
