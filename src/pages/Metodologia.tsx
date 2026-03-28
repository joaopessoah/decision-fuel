import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";
import {
  ArrowRight,
  Search,
  Map,
  Code2,
  Rocket,
  ChevronDown,
  CircleDot,
  FileCheck2,
  Clock,
  Sparkles,
  Handshake,
  Eye,
  Target,
  TrendingUp,
  Shield,
  Zap,
  Users,
  BarChart3,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/shared/SectionTitle";

/* ── Phase Data ── */

const phases = [
  {
    number: "01",
    icon: Search,
    title: "Diagnóstico",
    accent: "gold",
    colorClass: "text-gold",
    bgClass: "bg-gold/10",
    borderClass: "border-gold/20",
    glowClass: "shadow-gold/20",
    gradientFrom: "from-gold/20",
    gradientTo: "to-gold/5",
    ringClass: "ring-gold/30",
    headline: "Entender antes de agir",
    description:
      "Mergulhamos no seu negócio para compreender a realidade como ela é. Mapeamos cada fonte de dados, cada processo, cada dor. Sem diagnóstico preciso, não existe solução eficaz.",
    deliverables: [
      "Entrevistas com stakeholders-chave",
      "Mapeamento completo de fontes de dados",
      "Identificação de gargalos e oportunidades",
      "Relatório de diagnóstico com prioridades",
      "Matriz de maturidade analítica",
    ],
    timeline: "1-2 semanas",
  },
  {
    number: "02",
    icon: Map,
    title: "Planejamento",
    accent: "sky",
    colorClass: "text-sky-400",
    bgClass: "bg-sky-400/10",
    borderClass: "border-sky-400/20",
    glowClass: "shadow-sky-400/20",
    gradientFrom: "from-sky-400/20",
    gradientTo: "to-sky-400/5",
    ringClass: "ring-sky-400/30",
    headline: "Arquitetar a solução certa",
    description:
      "Com o diagnóstico em mãos, desenhamos a arquitetura ideal. Definimos KPIs que realmente importam, modelamos os dados e planejamos cada entrega com precisão cirúrgica.",
    deliverables: [
      "Definição de KPIs e métricas de sucesso",
      "Modelagem de dados e arquitetura técnica",
      "Cronograma detalhado de entregas",
      "Blueprint de dashboards e automações",
      "Plano de governança de dados",
    ],
    timeline: "1-2 semanas",
  },
  {
    number: "03",
    icon: Code2,
    title: "Execução",
    accent: "emerald",
    colorClass: "text-emerald-400",
    bgClass: "bg-emerald-400/10",
    borderClass: "border-emerald-400/20",
    glowClass: "shadow-emerald-400/20",
    gradientFrom: "from-emerald-400/20",
    gradientTo: "to-emerald-400/5",
    ringClass: "ring-emerald-400/30",
    headline: "Construir com excelência",
    description:
      "Aqui a magia acontece. Pipelines de dados, transformações, dashboards interativos e automações inteligentes. Entregas incrementais para validação contínua.",
    deliverables: [
      "ETL e limpeza de dados automatizada",
      "Dashboards interativos e responsivos",
      "Automações de processos e alertas",
      "Testes de qualidade e validação",
      "Documentação técnica completa",
    ],
    timeline: "2-4 semanas",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Entrega & Evolução",
    accent: "amber",
    colorClass: "text-amber-400",
    bgClass: "bg-amber-400/10",
    borderClass: "border-amber-400/20",
    glowClass: "shadow-amber-400/20",
    gradientFrom: "from-amber-400/20",
    gradientTo: "to-amber-400/5",
    ringClass: "ring-amber-400/30",
    headline: "Entregar e evoluir sempre",
    description:
      "A entrega é apenas o começo. Treinamos sua equipe, monitoramos a adoção e evoluímos continuamente. Seu investimento em dados gera retorno crescente ao longo do tempo.",
    deliverables: [
      "Treinamento hands-on com a equipe",
      "Deploy em ambiente de produção",
      "Monitoramento de uso e performance",
      "Ciclos de melhoria contínua",
      "Suporte dedicado e proativo",
    ],
    timeline: "Contínuo",
  },
];

const differentiators = [
  {
    icon: Handshake,
    title: "Parceria Real",
    description:
      "Não somos fornecedores. Somos parte do seu time. Trabalhamos lado a lado, com compromisso genuíno com seus resultados.",
  },
  {
    icon: Eye,
    title: "Transparência Total",
    description:
      "Você sabe exatamente onde estamos, para onde vamos e quais são os desafios. Sem surpresas, sem letras miúdas.",
  },
  {
    icon: Target,
    title: "Foco em Resultado",
    description:
      "Cada entrega gera valor mensurável. Não criamos dashboards bonitos que ninguém usa. Criamos ferramentas que mudam decisões.",
  },
  {
    icon: Shield,
    title: "Previsibilidade",
    description:
      "Cronogramas realistas, comunicação proativa, entregas no prazo. Sua operação não pode esperar e nós sabemos disso.",
  },
  {
    icon: Zap,
    title: "Velocidade com Qualidade",
    description:
      "Metodologia ágil com entregas incrementais. Você vê resultados desde a primeira semana, sem sacrificar a robustez técnica.",
  },
  {
    icon: TrendingUp,
    title: "Evolução Contínua",
    description:
      "O mercado muda, seu negócio cresce, e suas ferramentas de dados evoluem junto. Acompanhamento proativo, não reativo.",
  },
];

/* ── Animated SVG Connector ── */

function PhaseConnector({ color }: { color: string }) {
  return (
    <div className="hidden lg:flex justify-center py-2">
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="origin-top"
      >
        <svg
          width="3"
          height="80"
          viewBox="0 0 3 80"
          fill="none"
          className="mx-auto"
        >
          <line
            x1="1.5"
            y1="0"
            x2="1.5"
            y2="80"
            stroke="url(#connectorGrad)"
            strokeWidth="2"
            strokeDasharray="6 4"
          />
          <defs>
            <linearGradient
              id="connectorGrad"
              x1="0"
              y1="0"
              x2="0"
              y2="80"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor={color} stopOpacity="0.6" />
              <stop offset="1" stopColor={color} stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </div>
  );
}

/* ── Phase Card ── */

function PhaseCard({
  phase,
  index,
}: {
  phase: (typeof phases)[0];
  index: number;
}) {
  const Icon = phase.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative group"
    >
      {/* Ambient glow */}
      <div
        className={`absolute -inset-px rounded-3xl bg-gradient-to-b ${phase.gradientFrom} ${phase.gradientTo} opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl`}
      />

      <div
        className={`relative bg-[#0d0f14] border border-white/[0.06] rounded-3xl overflow-hidden transition-all duration-500 group-hover:border-white/[0.12] group-hover:shadow-2xl ${phase.glowClass}`}
      >
        {/* Top accent line */}
        <div
          className={`h-[2px] w-full bg-gradient-to-r ${phase.gradientFrom} via-transparent ${phase.gradientTo}`}
        />

        <div className="p-8 md:p-10 lg:p-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start gap-6 mb-8">
            {/* Phase number + icon cluster */}
            <div className="flex items-center gap-5">
              <div className="relative">
                <div
                  className={`w-16 h-16 rounded-2xl ${phase.bgClass} flex items-center justify-center ring-1 ${phase.ringClass} transition-all duration-500 group-hover:scale-110`}
                >
                  <Icon className={`w-7 h-7 ${phase.colorClass}`} />
                </div>
                <span
                  className={`absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#0d0f14] border ${phase.borderClass} flex items-center justify-center`}
                >
                  <span
                    className={`text-[10px] font-mono font-bold ${phase.colorClass}`}
                  >
                    {phase.number}
                  </span>
                </span>
              </div>

              <div>
                <span
                  className={`text-xs font-mono uppercase tracking-[0.2em] ${phase.colorClass} opacity-70`}
                >
                  Fase {phase.number}
                </span>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mt-1">
                  {phase.title}
                </h3>
              </div>
            </div>

            {/* Timeline badge */}
            <div
              className={`md:ml-auto flex items-center gap-2 px-4 py-2 rounded-full ${phase.bgClass} border ${phase.borderClass}`}
            >
              <Clock className={`w-3.5 h-3.5 ${phase.colorClass}`} />
              <span
                className={`text-sm font-mono font-medium ${phase.colorClass}`}
              >
                {phase.timeline}
              </span>
            </div>
          </div>

          {/* Headline + Description */}
          <p
            className={`text-lg md:text-xl font-display font-semibold ${phase.colorClass} mb-3`}
          >
            {phase.headline}
          </p>
          <p className="text-muted-foreground leading-relaxed mb-8 max-w-3xl">
            {phase.description}
          </p>

          {/* Deliverables */}
          <div className="border-t border-white/[0.06] pt-8">
            <div className="flex items-center gap-2 mb-5">
              <FileCheck2 className={`w-4 h-4 ${phase.colorClass}`} />
              <span className="text-sm font-semibold text-foreground uppercase tracking-wider">
                Entregáveis
              </span>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {phase.deliverables.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                  className="flex items-start gap-3 group/item"
                >
                  <CircleDot
                    className={`w-3.5 h-3.5 ${phase.colorClass} mt-1 shrink-0 opacity-60 group-hover/item:opacity-100 transition-opacity`}
                  />
                  <span className="text-sm text-muted-foreground group-hover/item:text-foreground/80 transition-colors">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main Page ── */

export default function Metodologia() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const connectorColors = ["#d4a437", "#38bdf8", "#34d399", "#fbbf24"];

  return (
    <Layout>
      {/* ─── Hero Section ─── */}
      <section
        ref={heroRef}
        className="relative min-h-[85vh] flex items-center justify-center overflow-hidden"
      >
        {/* Layered backgrounds */}
        <div className="absolute inset-0 bg-[#08090f]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,164,55,0.08)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(56,189,248,0.04)_0%,_transparent_50%)]" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Floating orbs */}
        <motion.div
          animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-gold/[0.04] blur-[120px]"
        />
        <motion.div
          animate={{ y: [15, -15, 15], x: [10, -10, 10] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-sky-400/[0.03] blur-[100px]"
        />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 container-tight text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gold/[0.08] border border-gold/[0.15] text-gold text-sm font-medium tracking-wide mb-8">
              <Sparkles className="w-3.5 h-3.5" />
              Nossa Metodologia
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-foreground leading-[1.1] mb-6"
          >
            Processo que gera
            <br />
            <span className="text-gradient">resultado previsível</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10"
          >
            Quatro fases. Entregas incrementais. Transparência absoluta.
            Conheça o método que transforma dados em vantagem competitiva.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button variant="hero" size="xl" asChild>
              <Link to="/contato">
                Iniciar projeto
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <a href="#processo">
                Ver processo
                <ChevronDown className="ml-2 w-5 h-5" />
              </a>
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground/50 font-mono">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4 text-gold/40" />
          </motion.div>
        </motion.div>
      </section>

      {/* ─── Process Timeline ─── */}
      <section id="processo" className="section-padding relative">
        {/* Background texture */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,164,55,0.03)_0%,_transparent_70%)]" />

        <div className="container-tight relative z-10">
          <SectionTitle
            label="Nosso Processo"
            title="Quatro fases para transformar seus dados"
            description="Um método validado em dezenas de projetos. Cada fase é desenhada para gerar valor tangível e manter sua equipe alinhada."
          />

          {/* Timeline */}
          <div className="space-y-4 lg:space-y-0">
            {phases.map((phase, index) => (
              <div key={phase.number}>
                <PhaseCard phase={phase} index={index} />
                {index < phases.length - 1 && (
                  <PhaseConnector color={connectorColors[index]} />
                )}
              </div>
            ))}
          </div>

          {/* Timeline summary bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-16 bg-[#0d0f14] border border-white/[0.06] rounded-2xl p-6 md:p-8"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <span className="text-sm font-mono text-gold uppercase tracking-wider">
                  Timeline Típica
                </span>
                <p className="text-2xl md:text-3xl font-display font-bold text-foreground mt-1">
                  5-10 semanas
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Do diagnóstico à primeira entrega em produção
                </p>
              </div>

              {/* Mini phase indicators */}
              <div className="flex items-center gap-3">
                {phases.map((p, i) => (
                  <div key={p.number} className="flex items-center gap-3">
                    <div className="text-center">
                      <div
                        className={`w-10 h-10 rounded-xl ${p.bgClass} flex items-center justify-center border ${p.borderClass}`}
                      >
                        <p.icon className={`w-4 h-4 ${p.colorClass}`} />
                      </div>
                      <span className="text-[10px] text-muted-foreground mt-1 block font-mono">
                        {p.timeline}
                      </span>
                    </div>
                    {i < phases.length - 1 && (
                      <div className="w-6 h-px bg-white/10" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── What Makes Us Different ─── */}
      <section className="section-padding bg-graphite relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(212,164,55,0.05)_0%,_transparent_60%)]" />

        <div className="container-tight relative z-10">
          <SectionTitle
            label="Por Que Nós"
            title="O que nos torna diferentes"
            description="Não vendemos horas. Vendemos resultado. Cada princípio abaixo é praticado diariamente, não apenas escrito em um slide."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {differentiators.map((diff, index) => {
              const DiffIcon = diff.icon;
              return (
                <motion.div
                  key={diff.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group relative"
                >
                  {/* Hover glow */}
                  <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

                  <div className="relative bg-[#0d0f14] border border-white/[0.06] rounded-2xl p-7 h-full transition-all duration-500 group-hover:border-gold/[0.15] hover-lift">
                    <div className="w-11 h-11 rounded-xl bg-gold/[0.08] flex items-center justify-center mb-5 group-hover:bg-gold/[0.15] transition-colors duration-500">
                      <DiffIcon className="w-5 h-5 text-gold" />
                    </div>
                    <h3 className="text-lg font-display font-bold text-foreground mb-2">
                      {diff.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {diff.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Numbers bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.04] rounded-2xl overflow-hidden"
          >
            {[
              {
                value: "98%",
                label: "Satisfação dos clientes",
                icon: Users,
              },
              {
                value: "5-10",
                label: "Semanas até produção",
                icon: Clock,
              },
              {
                value: "3x",
                label: "Retorno médio sobre investimento",
                icon: BarChart3,
              },
              {
                value: "100%",
                label: "Projetos entregues no prazo",
                icon: Shield,
              },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="bg-[#0d0f14] p-6 md:p-8 text-center"
              >
                <stat.icon className="w-5 h-5 text-gold/50 mx-auto mb-3" />
                <p className="text-2xl md:text-3xl font-display font-bold text-gradient mb-1">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground tracking-wide">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className="section-padding relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,164,55,0.06)_0%,_transparent_50%)]" />

        <div className="container-tight relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Outer glow */}
            <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-b from-gold/[0.15] via-gold/[0.05] to-transparent blur-2xl opacity-60" />

            <div className="relative bg-[#0d0f14] border border-white/[0.08] rounded-3xl overflow-hidden">
              {/* Top accent */}
              <div className="h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />

              <div className="p-10 md:p-16 lg:p-20 text-center">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: 0.2,
                  }}
                  className="w-16 h-16 rounded-2xl bg-gold/[0.1] border border-gold/20 flex items-center justify-center mx-auto mb-8"
                >
                  <Sparkles className="w-7 h-7 text-gold" />
                </motion.div>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6 leading-tight">
                  Pronto para transformar
                  <br />
                  <span className="text-gradient">dados em decisões</span>?
                </h2>

                <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed">
                  O primeiro passo é uma conversa. Sem compromisso, sem
                  pressão. Conte sobre seus desafios e vamos desenhar juntos
                  o caminho.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="hero" size="xl" asChild>
                    <Link to="/contato">
                      Agendar conversa
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                  <Button variant="heroOutline" size="xl" asChild>
                    <Link to="/cases">
                      Ver resultados reais
                      <BarChart3 className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                </div>

                {/* Trust note */}
                <p className="mt-8 text-xs text-muted-foreground/50 font-mono tracking-wide">
                  Resposta em até 24h úteis
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
