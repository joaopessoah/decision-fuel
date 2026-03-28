import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";
import {
  ArrowRight,
  Database,
  BarChart3,
  Zap,
  Target,
  CheckCircle,
  Layers,
  GitBranch,
  Search,
  Cog,
  Lightbulb,
  ArrowDownRight,
  Workflow,
  Sparkles,
  Shield,
  Clock,
  TrendingUp,
  FileCode2,
  ServerCog,
  BrainCircuit,
  ChevronRight,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/shared/SectionTitle";

/* ═══════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════ */

const services = [
  {
    icon: Database,
    title: "Consultoria de Dados",
    subtitle: "A fundação que sustenta tudo",
    description:
      "Estruturamos, organizamos e documentamos o seu ambiente de dados para que cada número seja confiável e cada decisão, segura.",
    included: [
      "Mapeamento completo de fontes de dados",
      "Definição de regras de negócio e indicadores-chave (KPIs)",
      "Modelagem de dados dimensional e relacional",
      "Governança e políticas de qualidade de dados",
      "Documentação técnica e de processos",
      "Auditoria e limpeza de bases existentes",
    ],
    outcome:
      "Dados confiáveis, organizados e prontos para suportar decisões estratégicas.",
    color: "gold" as const,
    metric: { value: "99.5%", label: "Acurácia dos dados" },
  },
  {
    icon: BarChart3,
    title: "Business Intelligence",
    subtitle: "Visão clara para quem decide",
    description:
      "Dashboards profissionais, relatórios automatizados e painéis executivos que transformam dados em insights acionáveis, em tempo real.",
    included: [
      "Painéis executivos com KPIs estratégicos",
      "Dashboards operacionais por área",
      "Relatórios automatizados e agendados",
      "Análises de tendências e projeções",
      "Visualizações interativas e drill-down",
      "Acesso mobile e compartilhamento seguro",
    ],
    outcome:
      "Visão 360 do negócio na palma da mão, com informação atualizada em tempo real.",
    color: "sky" as const,
    metric: { value: "80%", label: "Menos tempo em relatórios" },
  },
  {
    icon: Zap,
    title: "Automação",
    subtitle: "Elimine o trabalho manual",
    description:
      "Automatizamos processos repetitivos, integrações de dados e fluxos de trabalho para que sua equipe foque no que realmente importa: o estratégico.",
    included: [
      "Pipelines ETL/ELT automatizados",
      "Integração entre sistemas e bases de dados",
      "Automação de relatórios e envio programado",
      "Alertas e notificações inteligentes",
      "Workflows automatizados de dados",
      "Migração de processos manuais (planilhas)",
    ],
    outcome:
      "Mais tempo para o estratégico, menos tempo com tarefas repetitivas.",
    color: "emerald" as const,
    metric: { value: "40h+", label: "Economizadas por mês" },
  },
  {
    icon: Target,
    title: "Apoio à Decisão",
    subtitle: "Inteligência para líderes",
    description:
      "Suporte consultivo contínuo com análises de cenários, simulações e insights estratégicos que capacitam gestores a decidir com confiança.",
    included: [
      "Definição e acompanhamento de KPIs estratégicos",
      "Análises de cenários e simulações",
      "Projeções e modelagem preditiva",
      "Suporte consultivo contínuo e sob demanda",
      "Apresentações executivas de resultados",
      "Recomendações data-driven para liderança",
    ],
    outcome:
      "Decisões baseadas em dados, não em achismos. Confiança em cada escolha.",
    color: "amber" as const,
    metric: { value: "3x", label: "Mais velocidade nas decisões" },
  },
];

const colorClasses = {
  gold: {
    bg: "from-gold/15 to-gold/5",
    text: "text-gold",
    border: "border-gold/15",
    glow: "bg-gold/[0.08]",
    glowLg: "bg-gold/[0.04]",
    bar: "bg-gold",
    ring: "ring-gold/20",
  },
  sky: {
    bg: "from-sky-400/15 to-sky-400/5",
    text: "text-sky-400",
    border: "border-sky-400/15",
    glow: "bg-sky-400/[0.08]",
    glowLg: "bg-sky-400/[0.04]",
    bar: "bg-sky-400",
    ring: "ring-sky-400/20",
  },
  emerald: {
    bg: "from-emerald-400/15 to-emerald-400/5",
    text: "text-emerald-400",
    border: "border-emerald-400/15",
    glow: "bg-emerald-400/[0.08]",
    glowLg: "bg-emerald-400/[0.04]",
    bar: "bg-emerald-400",
    ring: "ring-emerald-400/20",
  },
  amber: {
    bg: "from-amber-400/15 to-amber-400/5",
    text: "text-amber-400",
    border: "border-amber-400/15",
    glow: "bg-amber-400/[0.08]",
    glowLg: "bg-amber-400/[0.04]",
    bar: "bg-amber-400",
    ring: "ring-amber-400/20",
  },
};

const methodology = [
  {
    step: "01",
    title: "Diagnóstico",
    description:
      "Entendemos o negócio, mapeamos fontes de dados e identificamos oportunidades e gaps.",
    icon: Search,
    color: "gold" as const,
  },
  {
    step: "02",
    title: "Planeamento",
    description:
      "Definimos arquitetura, KPIs, cronograma e entregáveis com total transparência.",
    icon: GitBranch,
    color: "sky" as const,
  },
  {
    step: "03",
    title: "Execução",
    description:
      "Desenvolvemos a solução com entregas incrementais e validações constantes.",
    icon: Cog,
    color: "emerald" as const,
  },
  {
    step: "04",
    title: "Entrega & Evolução",
    description:
      "Deploy, treinamento e suporte contínuo. Evoluímos junto com o negócio.",
    icon: TrendingUp,
    color: "amber" as const,
  },
];

const technologies = [
  { name: "Power BI", category: "Visualização", icon: BarChart3 },
  { name: "SQL Server", category: "Base de Dados", icon: Database },
  { name: "Python", category: "Automação", icon: FileCode2 },
  { name: "Azure", category: "Cloud", icon: ServerCog },
  { name: "DAX / M", category: "Modelagem", icon: Layers },
  { name: "ETL Pipelines", category: "Integração", icon: Workflow },
  { name: "Machine Learning", category: "Analytics", icon: BrainCircuit },
  { name: "Data Quality", category: "Governança", icon: Shield },
];

/* ═══════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════ */

export default function Servicos() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <Layout>
      {/* ═══════════════ HERO ═══════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-[85vh] flex items-center overflow-hidden"
      >
        {/* Layered background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#08090f] via-background to-[#0d0f1a]" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold/[0.04] rounded-full blur-[200px] -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-sky-500/[0.03] rounded-full blur-[150px] translate-y-1/4" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-emerald-500/[0.02] rounded-full blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="container-tight relative z-10"
        >
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-flex items-center gap-2 text-gold/90 text-xs font-semibold uppercase tracking-[0.2em] mb-8 px-4 py-2 rounded-full border border-gold/15 bg-gold/[0.04]">
                <Layers className="w-3.5 h-3.5" />
                Nossos Serviços
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl font-display font-bold text-foreground mb-8 leading-[1.05] tracking-tight"
            >
              Soluções completas em{" "}
              <span className="text-gradient">dados</span>
              <br />
              para quem quer{" "}
              <span className="text-gradient">decidir melhor.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-xl md:text-2xl text-muted-foreground/80 leading-relaxed max-w-2xl mb-10"
            >
              Da estruturação à visualização, da automação ao apoio estratégico
              Tudo que sua empresa precisa para transformar dados em vantagem
              competitiva.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button variant="hero" size="xl" asChild>
                <Link to="/contato">
                  Falar com especialista
                  <ArrowRight className="ml-2" />
                </Link>
              </Button>
              <Button variant="heroOutline" size="xl" asChild>
                <Link to="/metodologia">Ver metodologia</Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/20 flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 bg-gold/80 rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* ═══════════════ STATS BAR ═══════════════ */}
      <section className="py-14 border-y border-border/30 bg-graphite">
        <div className="container-tight">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {[
              { value: "4", label: "Serviços core" },
              { value: "50+", label: "Projetos entregues" },
              { value: "100%", label: "Clientes satisfeitos" },
              { value: "6+", label: "Tecnologias dominadas" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-1 font-display tabular-nums">
                  {item.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ SERVICES — Bento Grid ═══════════════ */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gold/[0.02] rounded-full blur-[200px] pointer-events-none" />

        <div className="container-tight relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block text-gold text-sm font-medium uppercase tracking-widest mb-4">
              O que fazemos
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
              Quatro pilares, um objetivo
            </h2>
            <div className="divider-gold mx-auto" />
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              Cada serviço é uma peça essencial no ecossistema de dados da sua
              empresa. Juntos, formam uma solução completa.
            </p>
          </motion.div>

          {/* Bento grid — alternating 7+5 / 5+7 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {services.map((service, index) => {
              const c = colorClasses[service.color];
              const isWide = index % 2 === 0;
              const span = isWide ? "lg:col-span-7" : "lg:col-span-5";

              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`group ${span}`}
                >
                  <div className="relative h-full bg-[#0d0f14] border border-white/[0.06] rounded-3xl p-8 md:p-10 overflow-hidden hover:border-white/[0.1] transition-all duration-700 cursor-pointer">
                    {/* Glow */}
                    <div
                      className={`absolute -top-20 -right-20 w-48 h-48 ${c.glow} rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none`}
                    />
                    {/* Gradient border on hover */}
                    <div
                      className={`absolute -inset-[1px] rounded-3xl bg-gradient-to-br ${c.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10`}
                    />

                    <div className="relative z-10">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div
                          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${c.bg} border ${c.border} flex items-center justify-center group-hover:scale-110 transition-all duration-500`}
                        >
                          <service.icon className={`w-7 h-7 ${c.text}`} />
                        </div>
                        <div className="text-right">
                          <div
                            className={`text-2xl md:text-3xl font-bold font-display ${c.text} tabular-nums`}
                          >
                            {service.metric.value}
                          </div>
                          <div className="text-xs text-muted-foreground mt-0.5">
                            {service.metric.label}
                          </div>
                        </div>
                      </div>

                      {/* Title & description */}
                      <span
                        className={`font-mono text-xs font-bold tracking-widest ${c.text} opacity-60`}
                      >
                        {service.subtitle}
                      </span>
                      <h3
                        className={`text-2xl md:text-3xl font-display font-bold text-foreground mt-2 mb-3 group-hover:${c.text.replace("text-", "text-")} transition-colors duration-500`}
                      >
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {service.description}
                      </p>

                      {/* What's included */}
                      <div className="space-y-2.5 mb-6">
                        {service.included.map((item, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <CheckCircle
                              className={`w-4 h-4 ${c.text} mt-0.5 flex-shrink-0 opacity-70`}
                            />
                            <span className="text-sm text-muted-foreground">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Outcome bar */}
                      <div
                        className={`p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]`}
                      >
                        <div className="flex items-start gap-3">
                          <Lightbulb
                            className={`w-4 h-4 ${c.text} mt-0.5 flex-shrink-0`}
                          />
                          <p className="text-sm text-foreground/80">
                            <span className={`font-semibold ${c.text}`}>
                              Resultado:
                            </span>{" "}
                            {service.outcome}
                          </p>
                        </div>
                      </div>

                      {/* Decorative arrow */}
                      <div
                        className={`absolute bottom-6 right-6 w-10 h-10 rounded-full border ${c.border} flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1`}
                      >
                        <ArrowDownRight className={`w-4 h-4 ${c.text}`} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════ METHODOLOGY — Timeline ═══════════════ */}
      <section className="section-padding bg-graphite relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/[0.03] rounded-full blur-[120px] pointer-events-none" />

        <div className="container-tight relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block text-gold text-sm font-medium uppercase tracking-widest mb-4">
              Como trabalhamos
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
              Metodologia comprovada
            </h2>
            <div className="divider-gold mx-auto" />
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              Um processo claro, transparente e orientado a resultados. Do
              diagnóstico à entrega, sem surpresas.
            </p>
          </motion.div>

          <div className="space-y-0 max-w-4xl mx-auto">
            {methodology.map((step, i) => {
              const c = colorClasses[step.color];

              return (
                <div key={i} className="relative flex gap-6 md:gap-10">
                  {/* Timeline connector */}
                  <div className="flex flex-col items-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: 0.1 + i * 0.2,
                        type: "spring",
                      }}
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${c.bg} border ${c.border} flex items-center justify-center flex-shrink-0 z-10 shadow-lg`}
                    >
                      <step.icon className={`w-7 h-7 ${c.text}`} />
                    </motion.div>
                    {i < methodology.length - 1 && (
                      <motion.div
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 + i * 0.2 }}
                        className="w-[2px] flex-1 bg-gradient-to-b from-border/50 to-border/10 origin-top my-2"
                      />
                    )}
                  </div>

                  {/* Content card */}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.2 }}
                    className="pb-16 flex-1"
                  >
                    <div className="relative bg-[#0d0f14] border border-white/[0.06] rounded-3xl p-8 md:p-10 overflow-hidden group hover:border-white/[0.1] transition-all duration-700">
                      <div
                        className={`absolute -top-20 -right-20 w-40 h-40 ${c.glow} rounded-full blur-[60px] pointer-events-none`}
                      />

                      <span
                        className={`font-mono text-xs font-bold tracking-widest ${c.text} opacity-60`}
                      >
                        FASE {step.step}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mt-2 mb-4">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-4"
          >
            <Button variant="gold" size="lg" asChild>
              <Link to="/metodologia">
                Ver metodologia completa
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ TECHNOLOGIES ═══════════════ */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-sky-500/[0.02] rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold/[0.03] rounded-full blur-[120px] pointer-events-none" />

        <div className="container-tight relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block text-gold text-sm font-medium uppercase tracking-widest mb-4">
              Stack Tecnológico
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
              Ferramentas que dominamos
            </h2>
            <div className="divider-gold mx-auto" />
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              Utilizamos as melhores ferramentas do mercado, sempre escolhidas
              em função do problema, nunca o contrário.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {technologies.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="group relative bg-[#0d0f14] border border-white/[0.06] rounded-2xl p-6 overflow-hidden hover:border-white/[0.1] transition-all duration-700 cursor-pointer"
              >
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-gold/[0.04] rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none" />

                <div className="relative z-10">
                  <div className="w-11 h-11 rounded-xl bg-gold/[0.08] border border-gold/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-gold/15 transition-all duration-500">
                    <tech.icon className="w-5 h-5 text-gold" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-1 group-hover:text-gold transition-colors duration-300">
                    {tech.name}
                  </h3>
                  <p className="text-xs text-muted-foreground font-mono tracking-wide uppercase">
                    {tech.category}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ WHY US — Differentiators ═══════════════ */}
      <section className="section-padding bg-graphite relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />

        <div className="container-tight relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-block text-gold text-sm font-medium uppercase tracking-widest mb-6">
                Porque a +351 Data
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-8 leading-tight">
                Não somos só{" "}
                <span className="text-gradient">tecnologia</span>
              </h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed text-lg">
                <p>
                  Somos consultores de negócio que dominam dados. Cada solução é
                  desenhada para a sua realidade, não a partir de templates
                  genéricos.
                </p>
                <p>
                  O nosso foco está em entregar valor real: informação clara e
                  acionável para quem decide. Não desaparecemos após a entrega
                  evoluímos junto.
                </p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 gap-5">
              {[
                {
                  icon: Clock,
                  title: "Valor desde a semana 1",
                  text: "Entregas incrementais com resultados tangíveis desde o início. Sem esperar meses por um 'big bang'.",
                  color: "gold" as const,
                },
                {
                  icon: Shield,
                  title: "Segurança e governança",
                  text: "Permissões, auditoria e governança de dados desde o dia um. Os seus dados estão seguros.",
                  color: "sky" as const,
                },
                {
                  icon: Sparkles,
                  title: "Excelência técnica",
                  text: "Zero atalhos, zero gambiarras. Soluções robustas, escaláveis e documentadas.",
                  color: "emerald" as const,
                },
              ].map((item, i) => {
                const c = colorClasses[item.color];
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 + i * 0.15 }}
                    className="relative bg-[#0d0f14] border border-white/[0.06] rounded-3xl p-8 overflow-hidden group hover:border-white/[0.1] transition-all duration-700 cursor-pointer"
                  >
                    <div
                      className={`absolute -top-16 -right-16 w-32 h-32 ${c.glow} rounded-full blur-[50px] pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-700`}
                    />
                    <div className="relative z-10 flex gap-5">
                      <div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${c.bg} border ${c.border} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-all duration-500`}
                      >
                        <item.icon className={`w-7 h-7 ${c.text}`} />
                      </div>
                      <div>
                        <h3 className="text-xl font-display font-bold text-foreground mb-2 group-hover:text-gold transition-colors duration-300">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA ═══════════════ */}
      <section className="section-padding bg-gradient-to-b from-background via-graphite to-background">
        <div className="container-tight">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-12 md:p-16 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-gold" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/[0.03] rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10">
              <span className="inline-block text-gold text-sm font-medium uppercase tracking-widest mb-4">
                Pronto para começar?
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
                Qual serviço é ideal para a sua{" "}
                <span className="text-gradient">empresa</span>?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Fale com um especialista da +351 Data. Entendemos o seu cenário
                e indicamos a melhor solução, sem compromisso.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="xl" asChild>
                  <Link to="/contato">
                    Falar com um especialista
                    <ArrowRight className="ml-2" />
                  </Link>
                </Button>
                <Button variant="heroOutline" size="xl" asChild>
                  <Link to="/cases">Ver casos de sucesso</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
