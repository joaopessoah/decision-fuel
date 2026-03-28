import { motion, useScroll, useTransform } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
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
  PieChart,
  ChevronDown,
  HeartPulse,
  BedDouble,
  Stethoscope,
  ShieldCheck,
  Gavel,
  Timer,
  BarChart3,
  BadgeDollarSign,
  UserCheck,
  CalendarOff,
  Banknote,
  TrendingUp,
  LineChart,
  Receipt,
  Target,
  Gauge,
  Layers,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/shared/SectionTitle";

/* ------------------------------------------------------------------ */
/*  Sector Theme Colors                                                */
/* ------------------------------------------------------------------ */
const sectorThemes = {
  saude: {
    color: "sky",
    accent: "rgb(56, 189, 248)",
    glow: "rgba(56, 189, 248, 0.15)",
    glowStrong: "rgba(56, 189, 248, 0.25)",
    border: "rgba(56, 189, 248, 0.12)",
    bg: "rgba(56, 189, 248, 0.06)",
    text: "text-sky-400",
    iconBg: "bg-sky-500/10",
    iconColor: "text-sky-400",
    pillBg: "bg-sky-500/10 text-sky-400 border-sky-500/20",
    barColor: "from-sky-500 to-sky-400",
    kpiBg: "bg-sky-500/[0.08]",
    kpiBorder: "border-sky-500/20",
    btnClass: "bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/20",
  },
  juridico: {
    color: "violet",
    accent: "rgb(167, 139, 250)",
    glow: "rgba(167, 139, 250, 0.15)",
    glowStrong: "rgba(167, 139, 250, 0.25)",
    border: "rgba(167, 139, 250, 0.12)",
    bg: "rgba(167, 139, 250, 0.06)",
    text: "text-violet-400",
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-400",
    pillBg: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    barColor: "from-violet-500 to-violet-400",
    kpiBg: "bg-violet-500/[0.08]",
    kpiBorder: "border-violet-500/20",
    btnClass: "bg-violet-500/10 hover:bg-violet-500/20 text-violet-400 border border-violet-500/20",
  },
  rh: {
    color: "emerald",
    accent: "rgb(52, 211, 153)",
    glow: "rgba(52, 211, 153, 0.15)",
    glowStrong: "rgba(52, 211, 153, 0.25)",
    border: "rgba(52, 211, 153, 0.12)",
    bg: "rgba(52, 211, 153, 0.06)",
    text: "text-emerald-400",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
    pillBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    barColor: "from-emerald-500 to-emerald-400",
    kpiBg: "bg-emerald-500/[0.08]",
    kpiBorder: "border-emerald-500/20",
    btnClass: "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20",
  },
  financeiro: {
    color: "amber",
    accent: "rgb(251, 191, 36)",
    glow: "rgba(251, 191, 36, 0.15)",
    glowStrong: "rgba(251, 191, 36, 0.25)",
    border: "rgba(251, 191, 36, 0.12)",
    bg: "rgba(251, 191, 36, 0.06)",
    text: "text-amber-400",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-400",
    pillBg: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    barColor: "from-amber-500 to-amber-400",
    kpiBg: "bg-amber-500/[0.08]",
    kpiBorder: "border-amber-500/20",
    btnClass: "bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20",
  },
} as const;

/* ------------------------------------------------------------------ */
/*  Sector Data                                                        */
/* ------------------------------------------------------------------ */
const sectors = [
  {
    id: "saude" as const,
    icon: Building2,
    heroIcon: HeartPulse,
    name: "Saúde",
    label: "Healthcare Analytics",
    title: "Inteligência clínica e operacional",
    subtitle: "para decisões que salvam vidas",
    description:
      "Transforme dados assistenciais e financeiros em indicadores acionáveis para hospitais, clínicas e operadoras de saúde.",
    kpis: [
      { label: "Taxa de Ocupação", value: "87%", icon: BedDouble, trend: "+3.2%" },
      { label: "Tempo Médio Internação", value: "4.2d", icon: Clock, trend: "-12%" },
      { label: "Custo por Paciente", value: "R$ 2.4k", icon: DollarSign, trend: "-8%" },
      { label: "Score Qualidade", value: "94.5", icon: ShieldCheck, trend: "+5.1%" },
    ],
    painPoints: [
      "Custos assistenciais crescendo sem visibilidade da causa raiz",
      "Gestão de leitos feita em planilhas desatualizadas",
      "Indicadores de qualidade dispersos em sistemas diferentes",
      "Impossibilidade de prever demanda e alocar recursos",
    ],
    solutions: [
      { icon: Activity, title: "Indicadores Assistenciais", desc: "Painel em tempo real com taxa de ocupação, tempo médio de internação e giro de leitos" },
      { icon: TrendingDown, title: "Análise de Custos", desc: "Decomposição de custos por procedimento, centro de custo e operadora" },
      { icon: Stethoscope, title: "Produtividade Médica", desc: "Métricas de atendimento, tempo por consulta e taxa de retorno" },
      { icon: AlertTriangle, title: "Alertas Inteligentes", desc: "Notificações automáticas para variações críticas nos indicadores" },
    ],
    dashboardIndicators: [
      { label: "Leitos Ocupados", value: 87, max: 100, suffix: "%" },
      { label: "Satisfação Paciente", value: 92, max: 100, suffix: "%" },
      { label: "Glosa Reduzida", value: 34, max: 100, suffix: "%" },
      { label: "Produtividade", value: 78, max: 100, suffix: "%" },
    ],
    impact: "Hospitais que centralizam seus dados reduzem custos operacionais em até 20% e melhoram indicadores de qualidade assistencial.",
  },
  {
    id: "juridico" as const,
    icon: Scale,
    heroIcon: Gavel,
    name: "Jurídico",
    label: "Legal Intelligence",
    title: "Gestão estratégica do contencioso",
    subtitle: "com dados que reduzem riscos",
    description:
      "Visibilidade total sobre processos, prazos, provisões e resultados para escritórios e departamentos jurídicos.",
    kpis: [
      { label: "Processos Ativos", value: "1.247", icon: FileText, trend: "-4%" },
      { label: "Taxa de Êxito", value: "73%", icon: Target, trend: "+6.8%" },
      { label: "Provisão Total", value: "R$ 12M", icon: DollarSign, trend: "-15%" },
      { label: "Prazos em Dia", value: "99.2%", icon: Timer, trend: "+2.1%" },
    ],
    painPoints: [
      "Contencioso espalhado em sistemas e planilhas sem visão consolidada",
      "Risco de perda de prazos processuais críticos",
      "Provisões calculadas manualmente com alto grau de incerteza",
      "Dificuldade de medir produtividade e resultado por advogado",
    ],
    solutions: [
      { icon: FileText, title: "Gestão de Processos", desc: "Painel unificado com status, valores, fases e responsáveis de cada processo" },
      { icon: AlertTriangle, title: "Riscos e Provisões", desc: "Classificação automática de risco e cálculo dinâmico de provisões" },
      { icon: Clock, title: "Controle de Prazos", desc: "Calendário inteligente com alertas escalonados e integração com tribunais" },
      { icon: BarChart3, title: "Performance Jurídica", desc: "Métricas de resultado por área, advogado, tipo de ação e comarca" },
    ],
    dashboardIndicators: [
      { label: "Casos Resolvidos", value: 68, max: 100, suffix: "%" },
      { label: "Prazos Cumpridos", value: 99, max: 100, suffix: "%" },
      { label: "Redução Provisão", value: 45, max: 100, suffix: "%" },
      { label: "Produtividade", value: 82, max: 100, suffix: "%" },
    ],
    impact: "Departamentos jurídicos com dados centralizados reduzem provisões em até 30% e praticamente eliminam perda de prazos.",
  },
  {
    id: "rh" as const,
    icon: Users,
    heroIcon: UserCheck,
    name: "Recursos Humanos",
    label: "People Analytics",
    title: "Decisões de pessoas baseadas em dados",
    subtitle: "que retêm talentos e otimizam custos",
    description:
      "Indicadores estratégicos de capital humano para gestão de talentos, clima organizacional e eficiência de pessoal.",
    kpis: [
      { label: "Headcount", value: "2.340", icon: Users, trend: "+2.4%" },
      { label: "Turnover", value: "8.3%", icon: UserMinus, trend: "-22%" },
      { label: "Absenteísmo", value: "2.1%", icon: CalendarOff, trend: "-18%" },
      { label: "Custo Folha", value: "R$ 4.2M", icon: Banknote, trend: "-5%" },
    ],
    painPoints: [
      "Turnover alto sem entender os fatores que causam saída",
      "Absenteísmo impactando produtividade sem rastreabilidade",
      "Custo de pessoal crescendo sem correlação com resultado",
      "Decisões de contratação e promoção sem base analítica",
    ],
    solutions: [
      { icon: UserMinus, title: "Turnover & Retenção", desc: "Análise preditiva de risco de saída com fatores contributivos" },
      { icon: TrendingDown, title: "Custos de Pessoal", desc: "Decomposição de folha por área, cargo, tipo de contrato e benefícios" },
      { icon: Activity, title: "Produtividade & Clima", desc: "Correlação entre engajamento, absenteísmo e resultado das equipes" },
      { icon: PieChart, title: "Headcount & Estrutura", desc: "Visão organográfica com custos, vagas abertas e planejamento de workforce" },
    ],
    dashboardIndicators: [
      { label: "Retenção Talentos", value: 91, max: 100, suffix: "%" },
      { label: "Engajamento", value: 85, max: 100, suffix: "%" },
      { label: "Redução Turnover", value: 40, max: 100, suffix: "%" },
      { label: "Eficiência Folha", value: 76, max: 100, suffix: "%" },
    ],
    impact: "Empresas orientadas por people analytics reduzem turnover em até 40% e aumentam a produtividade por colaborador.",
  },
  {
    id: "financeiro" as const,
    icon: Wallet,
    heroIcon: LineChart,
    name: "Financeiro",
    label: "Financial Intelligence",
    title: "Visibilidade total das suas finanças",
    subtitle: "para decisões que protegem o caixa",
    description:
      "Fluxo de caixa, inadimplência, projeções e análise de rentabilidade para decisões financeiras com confiança.",
    kpis: [
      { label: "Receita Mensal", value: "R$ 8.7M", icon: TrendingUp, trend: "+12%" },
      { label: "Inadimplência", value: "3.2%", icon: AlertTriangle, trend: "-28%" },
      { label: "Margem Líquida", value: "18.4%", icon: Gauge, trend: "+4.2%" },
      { label: "Fluxo de Caixa", value: "R$ 2.1M", icon: DollarSign, trend: "+9%" },
    ],
    painPoints: [
      "Fluxo de caixa consolidado manualmente com dias de atraso",
      "Inadimplência identificada apenas quando já é crítica",
      "Projeções financeiras feitas em planilhas com premissas frágeis",
      "Rentabilidade por produto/cliente desconhecida",
    ],
    solutions: [
      { icon: DollarSign, title: "Fluxo de Caixa", desc: "Visão diária, semanal e mensal com projeção automática de recebimentos" },
      { icon: AlertTriangle, title: "Inadimplência", desc: "Aging detalhado com scoring de risco e alertas de cobrança escalonados" },
      { icon: LineChart, title: "Projeções & Cenários", desc: "Modelagem de cenários otimista, realista e pessimista com dados reais" },
      { icon: Receipt, title: "Rentabilidade", desc: "Análise de margem por produto, cliente, canal e centro de resultado" },
    ],
    dashboardIndicators: [
      { label: "Previsibilidade", value: 94, max: 100, suffix: "%" },
      { label: "Redução Inadimplência", value: 55, max: 100, suffix: "%" },
      { label: "Acurácia Projeção", value: 89, max: 100, suffix: "%" },
      { label: "Visibilidade", value: 97, max: 100, suffix: "%" },
    ],
    impact: "Empresas com visibilidade financeira real reduzem inadimplência em até 50% e melhoram projeções em 3x.",
  },
];

/* ------------------------------------------------------------------ */
/*  Mini Bar Chart Component                                           */
/* ------------------------------------------------------------------ */
function MiniBar({
  value,
  max,
  label,
  suffix,
  colorClass,
  delay = 0,
}: {
  value: number;
  max: number;
  label: string;
  suffix: string;
  colorClass: string;
  delay?: number;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground font-medium">{label}</span>
        <span className="text-xs font-mono font-semibold text-foreground">
          {value}{suffix}
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${colorClass}`}
          initial={{ width: 0 }}
          whileInView={{ width: `${(value / max) * 100}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  KPI Card Component                                                 */
/* ------------------------------------------------------------------ */
function KpiCard({
  kpi,
  theme,
  index,
}: {
  kpi: { label: string; value: string; icon: any; trend: string };
  theme: (typeof sectorThemes)[keyof typeof sectorThemes];
  index: number;
}) {
  const Icon = kpi.icon;
  const isPositive = kpi.trend.startsWith("+") || kpi.trend.startsWith("-");
  const isGood = kpi.trend.includes("-") && (kpi.label.toLowerCase().includes("custo") || kpi.label.toLowerCase().includes("turnover") || kpi.label.toLowerCase().includes("inadimpl") || kpi.label.toLowerCase().includes("absen"))
    ? true
    : kpi.trend.startsWith("+");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative p-4 rounded-2xl border ${theme.kpiBorder} ${theme.kpiBg} backdrop-blur-sm group`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`w-9 h-9 rounded-xl ${theme.iconBg} flex items-center justify-center`}>
          <Icon className={`w-4 h-4 ${theme.iconColor}`} />
        </div>
        <span className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full ${isGood ? "text-emerald-400 bg-emerald-500/10" : "text-red-400 bg-red-500/10"}`}>
          {kpi.trend}
        </span>
      </div>
      <p className="text-2xl font-display font-bold text-foreground tracking-tight">{kpi.value}</p>
      <p className="text-xs text-muted-foreground mt-1">{kpi.label}</p>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Dot Grid Background                                                */
/* ------------------------------------------------------------------ */
function DotGrid() {
  return (
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page Component                                                */
/* ------------------------------------------------------------------ */
export default function Solucoes() {
  const location = useLocation();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

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
      {/* ── Hero Section ── */}
      <section ref={heroRef} className="relative min-h-[85vh] flex items-center overflow-hidden bg-[#08090f]">
        {/* Layered backgrounds */}
        <div className="absolute inset-0">
          <DotGrid />
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gold/[0.04] rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-sky-500/[0.03] rounded-full blur-[100px]" />
          <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-violet-500/[0.03] rounded-full blur-[80px]" />
          {/* Gradient fade at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#08090f] to-transparent" />
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="container-tight relative z-10 py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            {/* Badge pill */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/20 bg-gold/[0.06] mb-8"
            >
              <Layers className="w-3.5 h-3.5 text-gold" />
              <span className="text-gold text-xs font-medium uppercase tracking-widest">
                Soluções por Setor
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-foreground mb-6 leading-[1.1]">
              Expertise setorial{" "}
              <br className="hidden md:block" />
              em{" "}
              <span className="text-gradient">dados estratégicos</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mb-10">
              Cada setor tem suas métricas críticas. Construímos soluções
              personalizadas que transformam a complexidade de cada segmento em
              dashboards claros e decisões seguras.
            </p>

            {/* Sector pills preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-3"
            >
              {sectors.map((sector) => {
                const theme = sectorThemes[sector.id];
                return (
                  <a
                    key={sector.id}
                    href={`#${sector.id}`}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-medium transition-all duration-300 hover:scale-105 ${theme.pillBg}`}
                  >
                    <sector.icon className="w-4 h-4" />
                    {sector.name}
                  </a>
                );
              })}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Explorar</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4 text-gold/60" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Sticky Sector Navigation ── */}
      <section className="py-4 bg-[#08090f]/90 backdrop-blur-xl border-b border-white/[0.06] sticky top-20 z-40">
        <div className="container-tight">
          <div className="flex flex-wrap justify-center gap-3">
            {sectors.map((sector) => {
              const theme = sectorThemes[sector.id];
              return (
                <a
                  key={sector.id}
                  href={`#${sector.id}`}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-medium transition-all duration-300 hover:scale-[1.02] ${theme.pillBg}`}
                >
                  <sector.icon className="w-3.5 h-3.5" />
                  {sector.name}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Sector Detail Sections ── */}
      {sectors.map((sector, sectorIndex) => {
        const theme = sectorThemes[sector.id];
        const HeroIcon = sector.heroIcon;
        const isEven = sectorIndex % 2 === 0;

        return (
          <section
            key={sector.id}
            id={sector.id}
            className="relative py-24 md:py-36 overflow-hidden"
            style={{ background: isEven ? "#08090f" : "#0a0c13" }}
          >
            {/* Background glow */}
            <div
              className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full blur-[160px] opacity-30 pointer-events-none"
              style={{ background: theme.glow }}
            />
            <div
              className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[140px] opacity-20 pointer-events-none"
              style={{ background: theme.glow }}
            />
            <DotGrid />

            <div className="container-tight relative z-10">
              {/* Sector header */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="mb-16 md:mb-20"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{ background: theme.bg, border: `1px solid ${theme.border}` }}
                  >
                    <HeroIcon className={`w-7 h-7 ${theme.iconColor}`} />
                  </div>
                  <div>
                    <span className={`text-xs font-mono font-semibold uppercase tracking-[0.2em] ${theme.text}`}>
                      {sector.label}
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground">
                      {sector.title}
                    </h2>
                  </div>
                </div>
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
                  {sector.description}
                </p>
              </motion.div>

              {/* KPI Cards Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                {sector.kpis.map((kpi, i) => (
                  <KpiCard key={kpi.label} kpi={kpi} theme={theme} index={i} />
                ))}
              </div>

              {/* Bento Grid: Pain Points + Solutions + Dashboard */}
              <div className="grid lg:grid-cols-12 gap-5">
                {/* Pain Points - left column */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="lg:col-span-5 bg-[#0d0f14] rounded-3xl border border-white/[0.06] p-8 relative overflow-hidden"
                >
                  {/* Top accent bar */}
                  <div
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: `linear-gradient(90deg, transparent, ${theme.accent}, transparent)` }}
                  />
                  <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-3">
                    <AlertTriangle className={`w-5 h-5 ${theme.iconColor}`} />
                    Dores que resolvemos
                  </h3>
                  <div className="space-y-4">
                    {sector.painPoints.map((pain, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        className="flex items-start gap-3 group"
                      >
                        <div
                          className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0 transition-all duration-300 group-hover:scale-150"
                          style={{ background: theme.accent }}
                        />
                        <span className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                          {pain}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Impact quote */}
                  <div
                    className="mt-8 p-5 rounded-2xl border"
                    style={{ background: theme.bg, borderColor: theme.border }}
                  >
                    <p className="text-sm text-foreground/80 italic leading-relaxed">
                      "{sector.impact}"
                    </p>
                  </div>
                </motion.div>

                {/* Solutions - right column */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="lg:col-span-7 space-y-5"
                >
                  {/* Solutions bento grid 2x2 */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    {sector.solutions.map((solution, i) => {
                      const SolIcon = solution.icon;
                      return (
                        <motion.div
                          key={solution.title}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: i * 0.1 }}
                          className="bg-[#0d0f14] rounded-3xl border border-white/[0.06] p-6 hover-lift group relative overflow-hidden"
                        >
                          {/* Hover glow */}
                          <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
                            style={{
                              background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${theme.glow}, transparent 40%)`,
                            }}
                          />
                          <div className="relative z-10">
                            <div
                              className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                              style={{ background: theme.bg, border: `1px solid ${theme.border}` }}
                            >
                              <SolIcon className={`w-5 h-5 ${theme.iconColor}`} />
                            </div>
                            <h4 className="text-base font-semibold text-foreground mb-2">{solution.title}</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">{solution.desc}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Dashboard Preview Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="bg-[#0d0f14] rounded-3xl border border-white/[0.06] p-6 relative overflow-hidden"
                  >
                    <div
                      className="absolute top-0 left-0 right-0 h-px"
                      style={{ background: `linear-gradient(90deg, transparent, ${theme.accent}, transparent)` }}
                    />
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                          <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                          <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                        </div>
                        <span className="text-[11px] font-mono text-muted-foreground">
                          dashboard_{sector.id}.view
                        </span>
                      </div>
                      <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full ${theme.pillBg}`}>
                        LIVE
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                      {sector.dashboardIndicators.map((ind, i) => (
                        <MiniBar
                          key={ind.label}
                          value={ind.value}
                          max={ind.max}
                          label={ind.label}
                          suffix={ind.suffix}
                          colorClass={theme.barColor}
                          delay={0.2 + i * 0.15}
                        />
                      ))}
                    </div>
                  </motion.div>

                  {/* CTA Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                  >
                    <Button variant="gold" className="w-full h-14 text-base rounded-2xl" asChild>
                      <Link to="/contato">
                        Falar sobre {sector.name}
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Link>
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </div>

            {/* Bottom divider */}
            {sectorIndex < sectors.length - 1 && (
              <div className="container-tight relative z-10 mt-24">
                <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
              </div>
            )}
          </section>
        );
      })}

      {/* ── Final CTA Section ── */}
      <section className="relative py-24 md:py-36 overflow-hidden bg-[#08090f]">
        <div className="absolute inset-0">
          <DotGrid />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/[0.04] rounded-full blur-[160px]" />
        </div>

        <div className="container-tight relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <div className="glass-card rounded-3xl border border-white/[0.06] p-12 md:p-16 relative overflow-hidden">
              {/* Top gold bar */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
              {/* Corner glows */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-gold/[0.06] rounded-full blur-[80px] pointer-events-none" />

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="w-16 h-16 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-8"
              >
                <Target className="w-8 h-8 text-gold" />
              </motion.div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
                Seu setor não está na lista?
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                A Decision Fuel tem experiência em diversos segmentos. Cada empresa é única
                 -- conte-nos sobre o seu cenário e construiremos a solução ideal.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="hero" size="xl" asChild>
                  <Link to="/contato">
                    Falar com um especialista
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button variant="heroOutline" size="xl" asChild>
                  <Link to="/metodologia">
                    Conhecer a metodologia
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
