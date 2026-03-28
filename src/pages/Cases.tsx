import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Scale,
  Users,
  Wallet,
  Quote,
  TrendingUp,
  CheckCircle,
  ChevronDown,
  Target,
  BarChart3,
  Zap,
  Shield,
  Timer,
  DollarSign,
  Activity,
  Layers,
  FileSearch,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/shared/SectionTitle";

/* ------------------------------------------------------------------ */
/*  Animated Counter                                                   */
/* ------------------------------------------------------------------ */
function Counter({
  end,
  suffix = "",
  prefix = "",
  duration = 2000,
}: {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const started = useRef(false);

  useEffect(() => {
    if (inView && !started.current) {
      started.current = true;
      const step = end / (duration / 16);
      let current = 0;
      const timer = setInterval(() => {
        current += step;
        if (current >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [inView, end, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Case Study Data                                                    */
/* ------------------------------------------------------------------ */
const cases = [
  {
    id: "saude",
    icon: Building2,
    accentColor: "emerald",
    glowFrom: "from-emerald-500/20",
    glowTo: "to-teal-500/10",
    borderAccent: "border-emerald-500/20",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
    tagBg: "bg-emerald-500/10",
    tagText: "text-emerald-400",
    sector: "Saúde",
    sectorLabel: "Healthcare",
    title: "Hospital Regional reorganiza indicadores assistenciais",
    subtitle: "De relatórios manuais a visibilidade em tempo real",
    challenge:
      "Um hospital de médio porte com 320 leitos enfrentava caos informacional: dados fragmentados em 7 sistemas distintos, relatórios montados manualmente em planilhas e decisões tomadas com indicadores desatualizados de até 15 dias.",
    solution:
      "Estruturação de uma base de dados unificada conectando todos os sistemas hospitalares, criação de dashboards executivos com indicadores de ocupação, custos assistenciais e produtividade médica, além de automação completa de relatórios mensais com envio programado.",
    metrics: [
      { value: 85, suffix: "%", label: "Redução no tempo de relatórios" },
      { value: 100, suffix: "%", label: "Visibilidade em tempo real" },
      { value: 340, suffix: "k", prefix: "R$ ", label: "Economia anual identificada" },
      { value: 15, suffix: " dias", label: "Antecipação de alertas críticos" },
    ],
    results: [
      "Dashboards de ocupação de leitos atualizados a cada 5 minutos",
      "Identificação de 15% de economia em custos assistenciais",
      "Relatórios que levavam 3 dias agora ficam prontos em 4 horas",
      "Gestores tomam decisões com dados do mesmo dia",
    ],
    quote: "Agora sabemos exatamente onde estamos e para onde podemos ir. Os dados deixaram de ser um problema e passaram a ser nosso maior aliado.",
    quoteAuthor: "Diretor Administrativo",
    quoteRole: "Hospital Regional, 320 leitos",
  },
  {
    id: "juridico",
    icon: Scale,
    accentColor: "violet",
    glowFrom: "from-violet-500/20",
    glowTo: "to-purple-500/10",
    borderAccent: "border-violet-500/20",
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-400",
    tagBg: "bg-violet-500/10",
    tagText: "text-violet-400",
    sector: "Jurídico",
    sectorLabel: "Legal",
    title: "Departamento jurídico ganha visão estratégica do contencioso",
    subtitle: "Controle total sobre 2.000+ processos ativos",
    challenge:
      "O departamento jurídico de uma grande empresa industrial gerenciava mais de 2.000 processos ativos com controles em planilhas fragmentadas. Sem visão consolidada de riscos e provisões, auditorias tornavam-se exercícios de pânico.",
    solution:
      "Desenvolvimento de painel de gestão de processos com classificação automatizada de riscos, cálculo de provisões baseado em histórico real e dashboards de acompanhamento por área, tipo de ação, jurisdição e faixa de valor.",
    metrics: [
      { value: 40, suffix: "%", label: "Redução em tempo de auditoria" },
      { value: 2000, suffix: "+", label: "Processos rastreados em tempo real" },
      { value: 95, suffix: "%", label: "Precisão nas provisões" },
      { value: 200, suffix: "k", prefix: "R$ ", label: "Economia em honorários" },
    ],
    results: [
      "Visão consolidada de todo o contencioso em um único lugar",
      "Provisões calculadas com metodologia consistente e auditável",
      "Padrões em ações trabalhistas identificados e prevenidos",
      "Tempo de preparação para auditorias reduzido em 40%",
    ],
    quote: "Pela primeira vez temos uma visão estratégica do nosso jurídico. O conselho agora recebe dados confiáveis e consegue tomar decisões com segurança.",
    quoteAuthor: "Gerente Jurídico",
    quoteRole: "Indústria de Grande Porte",
  },
  {
    id: "financeiro",
    icon: Wallet,
    accentColor: "amber",
    glowFrom: "from-amber-500/20",
    glowTo: "to-orange-500/10",
    borderAccent: "border-amber-500/20",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-400",
    tagBg: "bg-amber-500/10",
    tagText: "text-amber-400",
    sector: "Financeiro",
    sectorLabel: "Finance",
    title: "Gestão financeira ganha previsibilidade e controle total",
    subtitle: "De surpresas no fim do mês a projeções com 97% de precisão",
    challenge:
      "Uma empresa de serviços com faturamento de R$ 50 milhões/ano tinha dificuldades para projetar fluxo de caixa e identificar tendências de inadimplência. Decisões de crédito eram baseadas em intuição, gerando perdas recorrentes.",
    solution:
      "Desenvolvimento de painel financeiro completo com fluxo de caixa realizado vs. projetado, modelo preditivo de inadimplência por perfil de cliente, dashboard de rentabilidade por projeto e alertas automáticos de desvio orçamentário.",
    metrics: [
      { value: 97, suffix: "%", label: "Precisão no fluxo de caixa" },
      { value: 30, suffix: " dias", label: "Antecipação de inadimplência" },
      { value: 500, suffix: "k", prefix: "R$ ", label: "Receita recuperada por ano" },
      { value: 60, suffix: "%", label: "Menos surpresas financeiras" },
    ],
    results: [
      "Projeção de fluxo de caixa com 97% de precisão em 90 dias",
      "Inadimplência identificada e tratada 30 dias antes do vencimento",
      "Visibilidade completa de rentabilidade por cliente e projeto",
      "Decisões de crédito agora baseadas em scoring quantitativo",
    ],
    quote: "Acabaram as surpresas no fim do mês. Hoje temos confiança nos números e conseguimos planejar com segurança.",
    quoteAuthor: "CFO",
    quoteRole: "Empresa de Serviços, R$ 50M/ano",
  },
  {
    id: "rh",
    icon: Users,
    accentColor: "sky",
    glowFrom: "from-sky-500/20",
    glowTo: "to-cyan-500/10",
    borderAccent: "border-sky-500/20",
    iconBg: "bg-sky-500/10",
    iconColor: "text-sky-400",
    tagBg: "bg-sky-500/10",
    tagText: "text-sky-400",
    sector: "Recursos Humanos",
    sectorLabel: "HR & People",
    title: "RH transforma dados de pessoas em estratégia de retenção",
    subtitle: "De turnover crônico a programa de retenção data-driven",
    challenge:
      "Uma empresa de tecnologia com 500 colaboradores enfrentava turnover de 32% ao ano sem conseguir identificar padrões ou causas raiz. Decisões de RH eram tomadas com base em percepções, não em dados, custando caro em recontratações.",
    solution:
      "Criação de dashboards de people analytics com análise de turnover segmentada por área, tempo de casa, faixa salarial e motivo de desligamento. Implementação de modelos preditivos de risco de saída e alertas para variações críticas.",
    metrics: [
      { value: 25, suffix: "%", label: "Redução no turnover em 6 meses" },
      { value: 200, suffix: "k", prefix: "R$ ", label: "Economia em contratações" },
      { value: 40, suffix: "%", label: "Melhoria na satisfação interna" },
      { value: 3, suffix: " meses", label: "Antecipação de riscos de saída" },
    ],
    results: [
      "Causas raiz do turnover mapeadas e quantificadas por segmento",
      "Programa de retenção direcionado reduziu saídas em 25%",
      "Planejamento de headcount agora baseado em dados reais",
      "RH reconhecido como parceiro estratégico pela diretoria",
    ],
    quote: "Agora RH é parceiro estratégico, não apenas operacional. Os dados nos deram voz e credibilidade na mesa de decisão.",
    quoteAuthor: "Head de People",
    quoteRole: "Tech Company, 500 colaboradores",
  },
];

/* ------------------------------------------------------------------ */
/*  Aggregate Stats                                                    */
/* ------------------------------------------------------------------ */
const aggregateStats = [
  { icon: Timer, value: 85, suffix: "%", label: "Redução média no tempo de relatórios" },
  { icon: DollarSign, value: 1.2, suffix: "M+", label: "Economia total identificada (R$)" },
  { icon: Target, value: 97, suffix: "%", label: "Precisão média nas projeções" },
  { icon: Activity, value: 4, suffix: "", label: "Setores transformados" },
];

/* ------------------------------------------------------------------ */
/*  Animation Variants                                                 */
/* ------------------------------------------------------------------ */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

/* ================================================================== */
/*  PAGE COMPONENT                                                     */
/* ================================================================== */
export default function Cases() {
  return (
    <Layout>
      {/* ── Hero Section ── */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Layered background */}
        <div className="absolute inset-0 bg-[#08090f]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(193,163,98,0.12),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_60%,rgba(139,92,246,0.06),transparent)]" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Floating orbs */}
        <motion.div
          animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-gold/[0.04] rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ y: [15, -15, 15], x: [8, -8, 8] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-violet-500/[0.03] rounded-full blur-[80px]"
        />

        <div className="container-tight relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-4xl"
          >
            {/* Badge pill */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/20 bg-gold/[0.06] mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <span className="text-gold text-sm font-medium tracking-wide">
                Cases de Sucesso
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold text-foreground mb-8 leading-[0.95] tracking-tight">
              Resultados que{" "}
              <span className="text-gradient">comprovam</span>
              <br />
              <span className="text-gradient">valor real</span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mb-4"
            >
              Casos representativos de como a +351 Data transforma dados
              fragmentados em decisões estratégicas de alto impacto.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-sm text-muted-foreground/50 font-mono"
            >
              * Casos ilustrativos baseados em cenários reais aplicados pela +351 Data.
            </motion.p>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground/40 uppercase tracking-widest">
            Explorar
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-5 h-5 text-gold/40" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Aggregate Stats Bar ── */}
      <section className="relative py-0">
        <div className="container-tight">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="relative -mt-16 z-20 grid grid-cols-2 lg:grid-cols-4 gap-px rounded-3xl overflow-hidden border border-white/[0.06] bg-white/[0.03]"
          >
            {aggregateStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                custom={i}
                className="relative bg-[#0d0f14]/90 backdrop-blur-xl p-8 text-center group"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gold/[0.08] flex items-center justify-center group-hover:bg-gold/[0.15] transition-colors duration-500">
                    <stat.icon className="w-5 h-5 text-gold" />
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
                  {stat.value === 1.2 ? (
                    <span>
                      R$ <Counter end={1} suffix=".2M+" duration={1500} />
                    </span>
                  ) : (
                    <Counter end={stat.value} suffix={stat.suffix} duration={1800} />
                  )}
                </div>
                <p className="text-sm text-muted-foreground leading-snug">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Case Studies ── */}
      <section className="section-padding">
        <div className="container-tight">
          <SectionTitle
            label="Estudos de Caso"
            title="Impacto comprovado em cada setor"
            description="Cada projeto começa com um desafio real e termina com resultados mensuráveis. Confira como transformamos dados em vantagem competitiva."
          />

          <div className="space-y-32 mt-20">
            {cases.map((caseItem, index) => (
              <motion.div
                key={caseItem.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.1 } },
                }}
                className="relative"
              >
                {/* Case number watermark */}
                <div className="absolute -top-16 -left-4 text-[160px] font-display font-bold text-white/[0.02] leading-none select-none pointer-events-none">
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* Main card */}
                <motion.div
                  variants={fadeUp}
                  custom={0}
                  className="relative bg-[#0d0f14] rounded-3xl border border-white/[0.06] overflow-hidden group"
                >
                  {/* Top accent line */}
                  <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${caseItem.glowFrom} via-transparent ${caseItem.glowTo}`} />

                  {/* Colored glow */}
                  <div className={`absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br ${caseItem.glowFrom} ${caseItem.glowTo} rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000`} />

                  <div className="relative p-8 md:p-12 lg:p-16">
                    {/* Header row */}
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-12">
                      <div className="flex items-start gap-5">
                        <div className={`w-16 h-16 rounded-2xl ${caseItem.iconBg} flex items-center justify-center flex-shrink-0`}>
                          <caseItem.icon className={`w-8 h-8 ${caseItem.iconColor}`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider ${caseItem.tagBg} ${caseItem.tagText}`}>
                              {caseItem.sectorLabel}
                            </span>
                            <span className="text-muted-foreground/40 text-sm font-mono">
                              Case {String(index + 1).padStart(2, "0")}
                            </span>
                          </div>
                          <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-foreground leading-tight">
                            {caseItem.title}
                          </h2>
                          <p className="text-muted-foreground mt-2 text-lg">{caseItem.subtitle}</p>
                        </div>
                      </div>
                    </div>

                    {/* Metrics bar */}
                    <motion.div
                      variants={stagger}
                      className="grid grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-white/[0.06] mb-12"
                    >
                      {caseItem.metrics.map((metric, mi) => (
                        <motion.div
                          key={metric.label}
                          variants={scaleIn}
                          className="bg-white/[0.02] p-6 text-center hover:bg-white/[0.04] transition-colors duration-300"
                        >
                          <div className="text-3xl md:text-4xl font-display font-bold text-foreground mb-1">
                            <Counter
                              end={metric.value}
                              suffix={metric.suffix}
                              prefix={metric.prefix || ""}
                              duration={2000 + mi * 200}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider leading-snug">
                            {metric.label}
                          </p>
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* Content grid */}
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                      {/* Left: Challenge + Solution */}
                      <div className="space-y-10">
                        {/* Challenge */}
                        <motion.div variants={fadeUp} custom={1}>
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                              <Target className="w-5 h-5 text-red-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-foreground uppercase tracking-wide">
                              Desafio
                            </h3>
                          </div>
                          <p className="text-muted-foreground leading-relaxed pl-[52px]">
                            {caseItem.challenge}
                          </p>
                        </motion.div>

                        {/* Solution */}
                        <motion.div variants={fadeUp} custom={2}>
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                              <Zap className="w-5 h-5 text-gold" />
                            </div>
                            <h3 className="text-lg font-semibold text-foreground uppercase tracking-wide">
                              Solução +351 Data
                            </h3>
                          </div>
                          <p className="text-muted-foreground leading-relaxed pl-[52px]">
                            {caseItem.solution}
                          </p>
                        </motion.div>
                      </div>

                      {/* Right: Results + Quote */}
                      <div className="space-y-10">
                        {/* Results */}
                        <motion.div variants={fadeUp} custom={3}>
                          <div className="flex items-center gap-3 mb-5">
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                              <TrendingUp className="w-5 h-5 text-emerald-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-foreground uppercase tracking-wide">
                              Resultados
                            </h3>
                          </div>
                          <ul className="space-y-4 pl-[52px]">
                            {caseItem.results.map((result, ri) => (
                              <motion.li
                                key={ri}
                                variants={fadeUp}
                                custom={ri + 4}
                                className="flex items-start gap-3 group/item"
                              >
                                <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-gold/20 transition-colors">
                                  <CheckCircle className="w-3.5 h-3.5 text-gold" />
                                </div>
                                <span className="text-foreground/90 leading-relaxed">{result}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>

                        {/* Quote */}
                        <motion.div
                          variants={fadeUp}
                          custom={5}
                          className="relative p-8 rounded-2xl bg-gradient-to-br from-gold/[0.06] to-transparent border border-gold/[0.1] overflow-hidden"
                        >
                          <div className="absolute top-4 right-4 opacity-10">
                            <Quote className="w-16 h-16 text-gold" />
                          </div>
                          <Quote className="w-6 h-6 text-gold/60 mb-4" />
                          <p className="text-lg md:text-xl font-display text-foreground italic leading-relaxed mb-5">
                            "{caseItem.quote}"
                          </p>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                              <span className="text-sm font-semibold text-gold">
                                {caseItem.quoteAuthor.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-foreground">
                                {caseItem.quoteAuthor}
                              </p>
                              <p className="text-xs text-muted-foreground">{caseItem.quoteRole}</p>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process Section ── */}
      <section className="section-padding bg-graphite relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(193,163,98,0.04),transparent)]" />

        <div className="container-tight relative z-10">
          <SectionTitle
            label="Nossa Abordagem"
            title="Como transformamos seus dados"
            description="Um processo estruturado que garante resultados consistentes em qualquer setor."
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
          >
            {[
              {
                step: "01",
                icon: FileSearch,
                title: "Diagnóstico",
                desc: "Mapeamento completo dos dados, sistemas e necessidades de decisão.",
              },
              {
                step: "02",
                icon: Layers,
                title: "Estruturação",
                desc: "Unificação e limpeza dos dados em uma base confiável e escalável.",
              },
              {
                step: "03",
                icon: BarChart3,
                title: "Visualização",
                desc: "Dashboards executivos desenhados para as decisões que importam.",
              },
              {
                step: "04",
                icon: Shield,
                title: "Evolução",
                desc: "Acompanhamento contínuo, novas métricas e inteligência preditiva.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                variants={fadeUp}
                custom={i}
                className="relative bg-[#0d0f14] rounded-3xl border border-white/[0.06] p-8 group hover:border-gold/20 transition-all duration-500"
              >
                <div className="absolute top-6 right-6 text-4xl font-display font-bold text-white/[0.04] group-hover:text-gold/[0.08] transition-colors duration-500">
                  {item.step}
                </div>
                <div className="w-14 h-14 rounded-2xl bg-gold/[0.06] flex items-center justify-center mb-6 group-hover:bg-gold/[0.12] transition-colors duration-500">
                  <item.icon className="w-7 h-7 text-gold" />
                </div>
                <h3 className="text-xl font-display font-bold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-[#08090f]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(193,163,98,0.08),transparent)]" />

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />

        <div className="container-tight relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/20 bg-gold/[0.06] mb-8"
            >
              <Zap className="w-4 h-4 text-gold" />
              <span className="text-gold text-sm font-medium">Próximo passo</span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6 leading-tight">
              Seu caso pode ser o{" "}
              <span className="text-gradient">próximo</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              Conte para nós sobre seus desafios com dados. A +351 Data está
              pronta para transformar sua realidade com resultados mensuráveis.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="hero" size="xl" asChild>
                <Link to="/contato">
                  Falar com um especialista
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button variant="heroOutline" size="xl" asChild>
                <Link to="/servicos">
                  Conhecer serviços
                  <ArrowUpRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>

            <p className="text-sm text-muted-foreground/40 mt-8 font-mono">
              Resposta em até 24 horas úteis
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
