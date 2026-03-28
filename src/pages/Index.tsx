import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import {
  ArrowRight,
  Database,
  BarChart3,
  Zap,
  Target,
  Building2,
  Scale,
  Users,
  Wallet,
  CheckCircle,
  TrendingUp,
  Shield,
  Lightbulb,
  FileSearch,
  Sparkles,
  Layers,
  Lock,
  Eye,
  ChevronDown,
  X as XIcon,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { FeatureCard } from "@/components/shared/FeatureCard";

/* ── Animated Counter ── */
function Counter({
  end,
  suffix = "",
  duration = 2000,
}: {
  end: number;
  suffix?: string;
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
      {count}
      {suffix}
    </span>
  );
}

/* ── Messy Spreadsheet (Before) ── */
function MessySpreadsheet() {
  const rows = [
    ["ID", "Nome", "Valor", "Data", "Status"],
    ["1", "João Silva", "R$ 1.200", "15/03/2024", "ativo"],
    ["2", "maria", "1200,00", "2024-03-15", "Ativo"],
    ["3", "JOÃO SILVA", "1.200", "15/mar", "ativo"],
    ["", "Ana Costa", "R$800", "??", "inativo"],
    ["5", "João silva", "1200", "15-03-24", "ATIVO"],
    ["5", "Pedro", "#REF!", "01/04/2024", ""],
    ["7", "", "R$ 950,0", "abr/24", "ativo"],
  ];

  return (
    <div className="rounded-lg overflow-hidden border border-red-500/20 bg-[#1a1f1a]/50 shadow-lg">
      <div className="flex items-center gap-2 px-3 py-2 bg-[#1e3a1e]/40 border-b border-red-500/10">
        <div className="flex gap-1">
          <span className="w-2 h-2 rounded-full bg-red-500/60" />
          <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
          <span className="w-2 h-2 rounded-full bg-green-500/60" />
        </div>
        <span className="text-[10px] text-red-400/60 font-mono">
          relatorio_final_v3_COPIA(2).xlsx
        </span>
      </div>
      <div className="overflow-hidden">
        <table className="w-full text-[10px] font-mono">
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                className={
                  i === 0
                    ? "bg-[#2a2a1a]/60"
                    : i % 2 === 0
                    ? "bg-red-500/[0.02]"
                    : ""
                }
              >
                <td className="w-6 text-center text-muted-foreground/20 border-r border-border/10 px-1 py-0.5">
                  {i + 1}
                </td>
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className={`px-2 py-0.5 border-r border-border/10 truncate max-w-[80px] ${
                      i === 0
                        ? "text-muted-foreground/50 font-semibold"
                        : cell === "#REF!" || cell === "??" || cell === ""
                        ? "text-red-400/70 bg-red-500/5"
                        : "text-muted-foreground/40"
                    }`}
                  >
                    {cell || <span className="text-red-400/40">vazio</span>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-3 py-1.5 bg-red-500/[0.03] border-t border-red-500/10 flex items-center gap-2">
        <XIcon className="w-3 h-3 text-red-400/60" />
        <span className="text-[9px] text-red-400/50">
          3 duplicados | 2 campos vazios | formatos inconsistentes
        </span>
      </div>
    </div>
  );
}

/* ── Clean Dashboard (After) ── */
function CleanDashboard() {
  return (
    <div className="rounded-xl overflow-hidden border border-sky-400/15 bg-[#0c1020] shadow-2xl shadow-sky-500/10 h-full flex flex-col">
      {/* Browser bar */}
      <div className="flex items-center gap-3 px-3 py-2 bg-black/40 border-b border-sky-400/10">
        <div className="flex gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-500/70" />
          <span className="w-2 h-2 rounded-full bg-yellow-500/70" />
          <span className="w-2 h-2 rounded-full bg-green-500/70" />
        </div>
        <div className="flex-1 flex justify-center">
          <span className="text-[9px] text-muted-foreground/30 font-mono bg-white/[0.03] px-3 py-0.5 rounded border border-white/[0.04]">
            portal.suaempresa.com/financeiro
          </span>
        </div>
        <Lock className="w-2.5 h-2.5 text-sky-400/25" />
      </div>

      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-[100px] bg-black/30 border-r border-white/[0.04] py-2 px-1.5 flex flex-col gap-0.5">
          <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-md bg-sky-400/10 text-sky-400 text-[9px] font-semibold">
            <BarChart3 className="w-3 h-3" />
            Financeiro
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-md text-muted-foreground/40 text-[9px]">
            <Users className="w-3 h-3" />
            RH
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-md text-muted-foreground/40 text-[9px]">
            <Building2 className="w-3 h-3" />
            Operações
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-md text-muted-foreground/20 text-[9px]">
            <Lock className="w-3 h-3" />
            Diretoria
          </div>
          <div className="mt-auto pt-3 border-t border-white/[0.04] px-2">
            <div className="w-5 h-5 rounded-full bg-sky-400/15 flex items-center justify-center text-[8px] text-sky-400 font-bold">
              JP
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-2.5 space-y-2">
          {/* Top: page title + date */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold text-foreground/80">
              Painel Financeiro
            </span>
            <span className="text-[8px] text-muted-foreground/30 bg-white/[0.03] px-2 py-0.5 rounded">
              Mar 2026
            </span>
          </div>

          {/* KPI row */}
          <div className="grid grid-cols-4 gap-1.5">
            {[
              { val: "R$ 2.4M", label: "Receita", trend: "+8.2%", up: true },
              { val: "R$ 1.1M", label: "Despesas", trend: "-3.1%", up: false },
              { val: "R$ 1.3M", label: "Lucro Líq.", trend: "+22%", up: true },
              { val: "847", label: "Clientes", trend: "+5.4%", up: true },
            ].map((kpi, i) => (
              <div
                key={i}
                className="bg-white/[0.02] border border-white/[0.04] rounded-md px-2 py-1.5"
              >
                <div className="text-[10px] font-bold text-foreground/90">
                  {kpi.val}
                </div>
                <div className="text-[7px] text-muted-foreground/35">
                  {kpi.label}
                </div>
                <div
                  className={`text-[7px] font-semibold mt-0.5 ${
                    kpi.up ? "text-emerald-400/80" : "text-red-400/70"
                  }`}
                >
                  {kpi.up ? "▲" : "▼"} {kpi.trend}
                </div>
              </div>
            ))}
          </div>

          {/* Charts row */}
          <div className="grid grid-cols-5 gap-1.5">
            {/* Bar chart - 3 cols */}
            <div className="col-span-3 bg-white/[0.02] border border-white/[0.04] rounded-md p-2">
              <div className="text-[7px] text-muted-foreground/40 mb-1.5 font-medium">
                Receita Mensal
              </div>
              <div className="h-12 flex items-end gap-[3px]">
                {[52, 38, 65, 48, 72, 55, 80, 62, 88, 70, 82, 92].map(
                  (h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 0.5, delay: 1.2 + i * 0.04 }}
                      className={`flex-1 rounded-t-sm ${
                        i === 11
                          ? "bg-gradient-to-t from-sky-500 to-cyan-400"
                          : "bg-gradient-to-t from-sky-500/50 to-sky-400/30"
                      }`}
                    />
                  )
                )}
              </div>
            </div>

            {/* Donut chart - 2 cols */}
            <div className="col-span-2 bg-white/[0.02] border border-white/[0.04] rounded-md p-2 flex flex-col">
              <div className="text-[7px] text-muted-foreground/40 mb-1 font-medium">
                Por Categoria
              </div>
              <div className="flex-1 flex items-center justify-center">
                <div className="relative w-12 h-12">
                  <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                    <circle
                      cx="18"
                      cy="18"
                      r="14"
                      fill="none"
                      stroke="currentColor"
                      className="text-white/[0.04]"
                      strokeWidth="5"
                    />
                    <motion.circle
                      cx="18"
                      cy="18"
                      r="14"
                      fill="none"
                      stroke="currentColor"
                      className="text-sky-400"
                      strokeWidth="5"
                      strokeDasharray="88"
                      initial={{ strokeDashoffset: 88 }}
                      animate={{ strokeDashoffset: 88 - 88 * 0.42 }}
                      transition={{ duration: 0.8, delay: 1.5 }}
                      strokeLinecap="round"
                    />
                    <motion.circle
                      cx="18"
                      cy="18"
                      r="14"
                      fill="none"
                      stroke="currentColor"
                      className="text-emerald-400"
                      strokeWidth="5"
                      strokeDasharray="88"
                      strokeDashoffset={88 - 88 * 0.42}
                      initial={{ strokeDashoffset: 88 }}
                      animate={{
                        strokeDashoffset: 88 - 88 * 0.42 - 88 * 0.28,
                      }}
                      transition={{ duration: 0.6, delay: 1.8 }}
                      strokeLinecap="round"
                    />
                    <motion.circle
                      cx="18"
                      cy="18"
                      r="14"
                      fill="none"
                      stroke="currentColor"
                      className="text-violet-400"
                      strokeWidth="5"
                      strokeDasharray="88"
                      strokeDashoffset={88 - 88 * 0.7}
                      initial={{ strokeDashoffset: 88 }}
                      animate={{
                        strokeDashoffset: 88 - 88 * 0.7 - 88 * 0.18,
                      }}
                      transition={{ duration: 0.5, delay: 2.0 }}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[7px] font-bold text-foreground/70">
                      100%
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-0.5 mt-0.5">
                {[
                  { label: "Serviços", pct: "42%", color: "bg-sky-400" },
                  { label: "Produtos", pct: "28%", color: "bg-emerald-400" },
                  { label: "Licenças", pct: "18%", color: "bg-violet-400" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1 text-[6px]"
                  >
                    <span
                      className={`w-1 h-1 rounded-full ${item.color}`}
                    />
                    <span className="text-muted-foreground/40 flex-1">
                      {item.label}
                    </span>
                    <span className="text-foreground/50 font-medium">
                      {item.pct}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── HR Dashboard (After) ── */
function HRDashboard() {
  return (
    <div className="rounded-xl overflow-hidden border border-emerald-400/15 bg-[#0c1020] shadow-2xl shadow-emerald-500/10">
      {/* Browser bar */}
      <div className="flex items-center gap-3 px-3 py-2 bg-black/40 border-b border-emerald-400/10">
        <div className="flex gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-500/70" />
          <span className="w-2 h-2 rounded-full bg-yellow-500/70" />
          <span className="w-2 h-2 rounded-full bg-green-500/70" />
        </div>
        <div className="flex-1 flex justify-center">
          <span className="text-[9px] text-muted-foreground/30 font-mono bg-white/[0.03] px-3 py-0.5 rounded border border-white/[0.04]">
            portal.suaempresa.com/rh
          </span>
        </div>
        <Lock className="w-2.5 h-2.5 text-emerald-400/25" />
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-[100px] bg-black/30 border-r border-white/[0.04] py-2 px-1.5 flex flex-col gap-0.5">
          <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-md text-muted-foreground/40 text-[9px]">
            <BarChart3 className="w-3 h-3" />
            Financeiro
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-md bg-emerald-400/10 text-emerald-400 text-[9px] font-semibold">
            <Users className="w-3 h-3" />
            RH
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-md text-muted-foreground/40 text-[9px]">
            <Building2 className="w-3 h-3" />
            Operações
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-md text-muted-foreground/20 text-[9px]">
            <Lock className="w-3 h-3" />
            Diretoria
          </div>
          <div className="mt-auto pt-3 border-t border-white/[0.04] px-2">
            <div className="w-5 h-5 rounded-full bg-emerald-400/15 flex items-center justify-center text-[8px] text-emerald-400 font-bold">
              JP
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-2.5 space-y-2">
          {/* Top: page title + date */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold text-foreground/80">
              Painel de RH
            </span>
            <span className="text-[8px] text-muted-foreground/30 bg-white/[0.03] px-2 py-0.5 rounded">
              Mar 2026
            </span>
          </div>

          {/* KPI row */}
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { val: "342", label: "Headcount", trend: "+12", up: true },
              { val: "3.2%", label: "Absenteísmo", trend: "-0.8%", up: false },
              { val: "1.8%", label: "Turnover", trend: "-0.3%", up: false },
            ].map((kpi, i) => (
              <div
                key={i}
                className="bg-white/[0.02] border border-white/[0.04] rounded-md px-2 py-1.5"
              >
                <div className="text-[10px] font-bold text-foreground/90">
                  {kpi.val}
                </div>
                <div className="text-[7px] text-muted-foreground/35">
                  {kpi.label}
                </div>
                <div
                  className={`text-[7px] font-semibold mt-0.5 ${
                    !kpi.up ? "text-emerald-400/80" : "text-emerald-400/80"
                  }`}
                >
                  {kpi.up ? "▲" : "▼"} {kpi.trend}
                </div>
              </div>
            ))}
          </div>

          {/* Second KPI row */}
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { val: "R$ 1.8M", label: "Custo da Folha", trend: "+2.1%", up: true, warn: true },
              { val: "4.280h", label: "Banco de Horas", trend: "-320h", up: false },
              { val: "28", label: "Contratações", trend: "+8", up: true },
            ].map((kpi, i) => (
              <div
                key={i}
                className="bg-white/[0.02] border border-white/[0.04] rounded-md px-2 py-1.5"
              >
                <div className="text-[10px] font-bold text-foreground/90">
                  {kpi.val}
                </div>
                <div className="text-[7px] text-muted-foreground/35">
                  {kpi.label}
                </div>
                <div
                  className={`text-[7px] font-semibold mt-0.5 ${
                    kpi.warn ? "text-amber-400/80" : kpi.up ? "text-emerald-400/80" : "text-emerald-400/80"
                  }`}
                >
                  {kpi.up ? "▲" : "▼"} {kpi.trend}
                </div>
              </div>
            ))}
          </div>

          {/* Charts row */}
          <div className="grid grid-cols-5 gap-1.5">
            {/* Headcount evolution - 3 cols */}
            <div className="col-span-3 bg-white/[0.02] border border-white/[0.04] rounded-md p-2">
              <div className="text-[7px] text-muted-foreground/40 mb-1.5 font-medium">
                Evolução Headcount
              </div>
              <div className="h-12 flex items-end gap-[3px]">
                {[280, 285, 290, 295, 298, 305, 310, 318, 322, 330, 336, 342].map(
                  (val, i) => {
                    const h = ((val - 270) / 80) * 100;
                    return (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ duration: 0.5, delay: 0.5 + i * 0.04 }}
                        className={`flex-1 rounded-t-sm ${
                          i === 11
                            ? "bg-gradient-to-t from-emerald-500 to-emerald-300"
                            : "bg-gradient-to-t from-emerald-500/50 to-emerald-400/30"
                        }`}
                      />
                    );
                  }
                )}
              </div>
            </div>

            {/* Turnover by area - 2 cols */}
            <div className="col-span-2 bg-white/[0.02] border border-white/[0.04] rounded-md p-2 flex flex-col">
              <div className="text-[7px] text-muted-foreground/40 mb-1 font-medium">
                Turnover por Área
              </div>
              <div className="flex-1 flex flex-col justify-center gap-1.5 mt-1">
                {[
                  { area: "Comercial", pct: 65, color: "bg-emerald-400/60" },
                  { area: "Operações", pct: 40, color: "bg-sky-400/60" },
                  { area: "Tech", pct: 25, color: "bg-violet-400/60" },
                  { area: "Admin", pct: 15, color: "bg-amber-400/60" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <span className="text-[6px] text-muted-foreground/40 w-[38px] text-right truncate">
                      {item.area}
                    </span>
                    <div className="flex-1 h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.pct}%` }}
                        transition={{ duration: 0.6, delay: 0.8 + i * 0.1 }}
                        className={`h-full rounded-full ${item.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Data ── */
const processSteps = [
  {
    icon: FileSearch,
    phase: "01",
    title: "Captura",
    desc: "Recolhemos dados de qualquer fonte: planilhas, ERPs, APIs, bases legadas.",
    color: "text-gold",
    bg: "bg-gold/10",
  },
  {
    icon: Sparkles,
    phase: "02",
    title: "Higienização",
    desc: "Limpamos, padronizamos e eliminamos inconsistências. Dados sujos viram matéria-prima confiável.",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
  {
    icon: Layers,
    phase: "03",
    title: "Estruturação",
    desc: "Modelamos os dados em estruturas otimizadas, prontas para análise e cruzamento.",
    color: "text-sky-400",
    bg: "bg-sky-400/10",
  },
  {
    icon: BarChart3,
    phase: "04",
    title: "Decisão",
    desc: "Entregamos dashboards interativos num portal exclusivo com permissões por usuário.",
    color: "text-amber-400",
    bg: "bg-amber-400/10",
  },
];

const services = [
  {
    icon: Database,
    title: "Consultoria de Dados",
    description:
      "Estruturação de dados, regras de negócio e indicadores confiáveis para sua operação.",
  },
  {
    icon: BarChart3,
    title: "Business Intelligence",
    description:
      "Dashboards profissionais, executivos e focados em decisão estratégica.",
  },
  {
    icon: Zap,
    title: "Automação",
    description:
      "Eliminação de tarefas manuais e planilhas repetitivas que consomem tempo.",
  },
  {
    icon: Target,
    title: "Apoio à Decisão",
    description:
      "Informação clara e confiável para líderes decidirem com segurança.",
  },
];

const sectors = [
  { icon: Building2, name: "Saúde", href: "/solucoes#saude" },
  { icon: Scale, name: "Jurídico", href: "/solucoes#juridico" },
  { icon: Users, name: "Recursos Humanos", href: "/solucoes#rh" },
  { icon: Wallet, name: "Financeiro", href: "/solucoes#financeiro" },
];

const portalFeatures = [
  {
    icon: Lock,
    title: "Acesso por permissão",
    desc: "Cada pessoa vê apenas o que deve ver. Controle granular por grupo, área ou usuário.",
  },
  {
    icon: Eye,
    title: "Portal exclusivo",
    desc: "Um ambiente único com a sua marca, organizado por categorias e com busca inteligente.",
  },
  {
    icon: Database,
    title: "Dados confiáveis",
    desc: "Sem duplicidades, sem erros. Cada número que aparece no dashboard é verificado.",
  },
  {
    icon: Shield,
    title: "Segurança enterprise",
    desc: "Integração com Azure AD, Row-Level Security e auditoria de acessos.",
  },
];

const differentials = [
  {
    icon: TrendingUp,
    text: "Foco em resultados de negócio, não apenas tecnologia",
  },
  {
    icon: Shield,
    text: "Metodologia comprovada e processos estruturados",
  },
  {
    icon: Lightbulb,
    text: "Visão estratégica aliada à execução técnica",
  },
  {
    icon: CheckCircle,
    text: "Parceria contínua e evolução constante",
  },
];

export default function Index() {
  return (
    <Layout>
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative overflow-hidden pt-4 pb-20">
        {/* Layered background atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#08090f] via-background to-[#0d0f1a]" />
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-sky-500/[0.04] rounded-full blur-[150px] -translate-y-1/3" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-gold/[0.03] rounded-full blur-[120px] translate-y-1/3" />

        {/* Dot pattern for texture */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />

        <div className="container-tight relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
            {/* Left: Copy */}
            <div className="flex flex-col justify-center py-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-flex items-center gap-2 text-gold/90 text-xs font-semibold uppercase tracking-[0.2em] mb-8 px-4 py-2 rounded-full border border-gold/15 bg-gold/[0.04]">
                  <Sparkles className="w-3.5 h-3.5" />
                  Consultoria em Dados & BI
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.08 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-display font-bold text-foreground mb-7 leading-[1.08] tracking-tight"
              >
                Transformamos{" "}
                <span className="text-gradient">informação</span>
                <br />
                em <span className="text-gradient">decisão.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.16 }}
                className="text-base md:text-lg text-muted-foreground/80 mb-2 leading-relaxed max-w-lg"
              >
                Dados dispersos, sujos e desorganizados viram dashboards
                estruturados, higienizados e com acesso controlado.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.24 }}
                className="text-base text-gold/70 font-display italic mb-10"
              >
                "Você só precisa decidir."
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.32 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button variant="hero" size="xl" asChild>
                  <Link to="/contato">
                    Quero saber mais
                    <ArrowRight className="ml-2" />
                  </Link>
                </Button>
                <Button variant="heroOutline" size="xl" asChild>
                  <a href="#processo">Ver como funciona</a>
                </Button>
              </motion.div>
            </div>

            {/* Right: Stacked before/after */}
            <div className="hidden lg:flex flex-col justify-end gap-4 py-4">
              {/* Spreadsheet (Before) */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                <div className="text-[10px] text-red-400/70 uppercase tracking-[0.2em] font-semibold mb-2">
                  Antes
                </div>
                <MessySpreadsheet />
              </motion.div>

              {/* Dashboard (After) */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <div className="text-[10px] text-sky-400/70 uppercase tracking-[0.2em] font-semibold mb-2">
                  Depois
                </div>
                <CleanDashboard />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
        >
          <a href="#numeros" aria-label="Rolar para a próxima seção" className="cursor-pointer">
            <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/20 flex items-start justify-center p-2 hover:border-gold/40 transition-colors">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-2 bg-gold/80 rounded-full"
              />
            </div>
          </a>
        </motion.div>
      </section>

      {/* ═══════════════ PROOF BAR ═══════════════ */}
      <section
        id="numeros"
        className="py-14 border-y border-border/30 bg-graphite"
      >
        <div className="container-tight">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-4">
            {[
              { value: 20, suffix: "M+", label: "Linhas processadas" },
              { value: 50, suffix: "+", label: "Dashboards entregues" },
              { value: 120, suffix: "h", label: "Economizadas por mês" },
              { value: 98, suffix: "%", label: "Menos retrabalho" },
              { value: 40, suffix: "%", label: "Mais rapidez na decisão" },
              { value: 0, suffix: "", label: "Erros em produção", display: "zero" },
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
                  {item.display ? (
                    item.display
                  ) : (
                    <Counter end={item.value} suffix={item.suffix} />
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ PROCESSO ═══════════════ */}
      <section id="processo" className="section-padding">
        <div className="container-tight">
          <SectionTitle
            label="Como funciona"
            title="Do caos à clareza em 4 passos"
            description="O nosso processo transforma qualquer fonte de informação num portal de dados pronto para a sua equipa tomar decisões."
          />

          {/* ── Desktop: horizontal pipeline ── */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Animated SVG connector path */}
              <svg
                className="absolute top-[60px] left-0 w-full h-[4px] z-0 overflow-visible"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="hsl(45 90% 55%)" />
                    <stop offset="33%" stopColor="hsl(160 60% 50%)" />
                    <stop offset="66%" stopColor="hsl(200 80% 60%)" />
                    <stop offset="100%" stopColor="hsl(45 80% 55%)" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                {/* Glow line behind */}
                <motion.line
                  x1="12.5%" y1="2" x2="87.5%" y2="2"
                  stroke="url(#lineGrad)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  filter="url(#glow)"
                  opacity="0.3"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }}
                />
                {/* Main line */}
                <motion.line
                  x1="12.5%" y1="2" x2="87.5%" y2="2"
                  stroke="url(#lineGrad)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }}
                />
                {/* Traveling pulse */}
                <motion.circle
                  r="4"
                  fill="hsl(45 90% 55%)"
                  filter="url(#glow)"
                  initial={{ cx: "12.5%", cy: 2, opacity: 0 }}
                  whileInView={{
                    cx: ["12.5%", "37.5%", "62.5%", "87.5%"],
                    opacity: [0, 1, 1, 0],
                  }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, delay: 1.2, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
                />
              </svg>

              <div className="grid grid-cols-4 gap-8 relative z-10">
                {processSteps.map((step, i) => {
                  const glowColor = step.color === "text-gold" ? "shadow-gold/30" : step.color === "text-emerald-400" ? "shadow-emerald-400/30" : step.color === "text-sky-400" ? "shadow-sky-400/30" : "shadow-amber-400/30";
                  const ringColor = step.color === "text-gold" ? "ring-gold/30" : step.color === "text-emerald-400" ? "ring-emerald-400/30" : step.color === "text-sky-400" ? "ring-sky-400/30" : "ring-amber-400/30";

                  return (
                    <div key={i} className="flex flex-col items-center">
                      {/* Node on the line */}
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 + i * 0.3, type: "spring", stiffness: 180 }}
                        className={`relative w-[120px] h-[120px] flex items-center justify-center mb-8`}
                      >
                        {/* Outer ring pulse */}
                        <motion.div
                          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
                          transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                          className={`absolute inset-0 rounded-full ${step.bg} ring-2 ${ringColor}`}
                        />
                        {/* Main circle */}
                        <div className={`relative w-[100px] h-[100px] rounded-full ${step.bg} border border-border/50 backdrop-blur-sm flex flex-col items-center justify-center shadow-2xl ${glowColor} group cursor-default`}>
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <step.icon className={`w-8 h-8 ${step.color} mb-1`} />
                          </motion.div>
                          <span className={`font-mono text-[10px] font-bold tracking-widest ${step.color} opacity-70`}>
                            {step.phase}
                          </span>
                        </div>
                      </motion.div>

                      {/* Card below */}
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.5 + i * 0.3 }}
                        className="glass-card rounded-xl p-6 text-center w-full hover:border-border transition-colors flex-1 flex flex-col justify-start"
                      >
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {step.desc}
                        </p>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Mobile/Tablet: vertical timeline ── */}
          <div className="lg:hidden space-y-0">
            {processSteps.map((step, i) => {
              const glowColor = step.color === "text-gold" ? "shadow-gold/20" : step.color === "text-emerald-400" ? "shadow-emerald-400/20" : step.color === "text-sky-400" ? "shadow-sky-400/20" : "shadow-amber-400/20";

              return (
                <div key={i} className="relative flex gap-5">
                  {/* Vertical line + node */}
                  <div className="flex flex-col items-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.1 + i * 0.15, type: "spring" }}
                      className={`w-12 h-12 rounded-full ${step.bg} flex items-center justify-center shadow-lg ${glowColor} flex-shrink-0 z-10`}
                    >
                      <step.icon className={`w-5 h-5 ${step.color}`} />
                    </motion.div>
                    {i < processSteps.length - 1 && (
                      <motion.div
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
                        className="w-[2px] flex-1 bg-gradient-to-b from-border/60 to-border/20 origin-top my-1"
                      />
                    )}
                  </div>

                  {/* Content */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
                    className="glass-card rounded-xl p-5 mb-4 flex-1"
                  >
                    <span className={`font-mono text-[10px] font-bold tracking-widest ${step.color} opacity-70`}>
                      {step.phase}
                    </span>
                    <h3 className="text-lg font-semibold text-foreground mt-1 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════ PORTAL PREVIEW ═══════════════ */}
      <section className="section-padding relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/[0.03] rounded-full blur-[150px] pointer-events-none" />

        <div className="container-tight relative z-10">
          <SectionTitle
            label="O que você recebe"
            title="Um portal de dados exclusivo"
            description="Com a sua marca, organizado por áreas e pronto para sua equipa usar no dia seguinte."
          />

          <div className="grid lg:grid-cols-5 gap-12 items-stretch">
            {/* Left: Portal mockup — 3 cols */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative lg:col-span-3 h-full"
            >
              {/* Glow behind mockup */}
              <div className="absolute -inset-4 bg-gold/[0.04] rounded-3xl blur-2xl pointer-events-none" />

              <div className="space-y-4">
                <CleanDashboard />
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                >
                  <HRDashboard />
                </motion.div>
              </div>
            </motion.div>

            {/* Right: Features list — 2 cols */}
            <div className="space-y-5 lg:col-span-2 flex flex-col justify-center">
              {portalFeatures.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }}
                  className="group flex gap-5 items-start p-5 rounded-xl border border-transparent hover:border-border/30 hover:bg-card/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/15 group-hover:scale-105 transition-all duration-300">
                    <f.icon className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-gold transition-colors duration-300">
                      {f.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ SERVICES — Bento Grid ═══════════════ */}
      <section className="section-padding bg-graphite overflow-hidden relative">
        {/* Layered background */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)`, backgroundSize: "32px 32px" }} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/[0.03] rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-500/[0.02] rounded-full blur-[120px] pointer-events-none" />

        <div className="container-tight relative z-10">
          <SectionTitle
            label="Nossos Serviços"
            title="Como a +351 Data pode ajudar"
            description="Soluções completas em dados para empresas que buscam decisões mais seguras e estratégicas."
          />

          {/* Bento Grid — asymmetric layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 auto-rows-[minmax(220px,auto)]">
            {/* Card 1 — Consultoria de Dados (large, spans 7 cols) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group relative lg:col-span-7 rounded-3xl overflow-hidden cursor-default"
            >
              <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-gold/30 via-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative h-full bg-[#0d0f14] border border-white/[0.06] rounded-3xl p-8 md:p-10 flex flex-col justify-between overflow-hidden group-hover:border-white/[0.1] transition-all duration-700">
                {/* Background glow */}
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-gold/[0.06] rounded-full blur-[80px] group-hover:bg-gold/[0.12] transition-all duration-700 pointer-events-none" />
                {/* Decorative grid lines */}
                <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-700" style={{ backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.3) 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/15 flex items-center justify-center group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-gold/10 transition-all duration-500">
                      <Database className="w-8 h-8 text-gold" />
                    </div>
                    <span className="text-7xl font-display font-bold text-white/[0.03] group-hover:text-gold/[0.07] transition-colors duration-700 leading-none">01</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3 group-hover:text-gold transition-colors duration-500">
                    Consultoria de Dados
                  </h3>
                  <p className="text-muted-foreground leading-relaxed max-w-md text-base">
                    Estruturação de dados, regras de negócio e indicadores confiáveis para sua operação. Transformamos complexidade em clareza.
                  </p>
                </div>

                <div className="relative z-10 flex items-center gap-3 mt-6 pt-6 border-t border-white/[0.04]">
                  {["Modelagem", "KPIs", "Governança"].map((tag) => (
                    <span key={tag} className="text-xs text-muted-foreground/60 bg-white/[0.03] px-3 py-1.5 rounded-full border border-white/[0.04]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Card 2 — BI (medium, spans 5 cols) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group relative lg:col-span-5 rounded-3xl overflow-hidden cursor-default"
            >
              <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-sky-400/30 via-sky-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative h-full bg-[#0d0f14] border border-white/[0.06] rounded-3xl p-8 md:p-10 flex flex-col justify-between overflow-hidden group-hover:border-white/[0.1] transition-all duration-700">
                <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-sky-500/[0.06] rounded-full blur-[60px] group-hover:bg-sky-500/[0.12] transition-all duration-700 pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-400/20 to-sky-400/5 border border-sky-400/15 flex items-center justify-center group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-sky-400/10 transition-all duration-500">
                      <BarChart3 className="w-8 h-8 text-sky-400" />
                    </div>
                    <span className="text-7xl font-display font-bold text-white/[0.03] group-hover:text-sky-400/[0.07] transition-colors duration-700 leading-none">02</span>
                  </div>
                  <h3 className="text-2xl font-display font-bold text-foreground mb-3 group-hover:text-sky-400 transition-colors duration-500">
                    Business Intelligence
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    Dashboards profissionais, executivos e focados em decisão estratégica.
                  </p>
                </div>

                {/* Mini chart decoration */}
                <div className="relative z-10 flex items-end gap-1 mt-6 h-10">
                  {[40, 65, 45, 80, 55, 90, 70, 85].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.6 + i * 0.05 }}
                      className="flex-1 rounded-sm bg-gradient-to-t from-sky-500/40 to-sky-400/20 group-hover:from-sky-500/60 group-hover:to-sky-400/40 transition-colors duration-500"
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Card 3 — Automação (medium, spans 5 cols) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative lg:col-span-5 rounded-3xl overflow-hidden cursor-default"
            >
              <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-emerald-400/30 via-emerald-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative h-full bg-[#0d0f14] border border-white/[0.06] rounded-3xl p-8 md:p-10 flex flex-col justify-between overflow-hidden group-hover:border-white/[0.1] transition-all duration-700">
                <div className="absolute -top-16 -left-16 w-48 h-48 bg-emerald-500/[0.06] rounded-full blur-[60px] group-hover:bg-emerald-500/[0.12] transition-all duration-700 pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400/20 to-emerald-400/5 border border-emerald-400/15 flex items-center justify-center group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-emerald-400/10 transition-all duration-500">
                      <Zap className="w-8 h-8 text-emerald-400" />
                    </div>
                    <span className="text-7xl font-display font-bold text-white/[0.03] group-hover:text-emerald-400/[0.07] transition-colors duration-700 leading-none">03</span>
                  </div>
                  <h3 className="text-2xl font-display font-bold text-foreground mb-3 group-hover:text-emerald-400 transition-colors duration-500">
                    Automação
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    Eliminação de tarefas manuais e planilhas repetitivas que consomem tempo.
                  </p>
                </div>

                {/* Automation flow decoration */}
                <div className="relative z-10 flex items-center gap-2 mt-6">
                  {["Coleta", "Processo", "Entrega"].map((step, i) => (
                    <div key={step} className="flex items-center gap-2">
                      <span className="text-[10px] text-emerald-400/50 bg-emerald-400/[0.06] px-2.5 py-1 rounded-full border border-emerald-400/10 group-hover:text-emerald-400/80 group-hover:border-emerald-400/20 transition-all duration-500">
                        {step}
                      </span>
                      {i < 2 && <ArrowRight className="w-3 h-3 text-emerald-400/20 group-hover:text-emerald-400/50 transition-colors duration-500" />}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Card 4 — Apoio à Decisão (large, spans 7 cols) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group relative lg:col-span-7 rounded-3xl overflow-hidden cursor-default"
            >
              <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-amber-400/30 via-amber-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative h-full bg-[#0d0f14] border border-white/[0.06] rounded-3xl p-8 md:p-10 flex flex-col justify-between overflow-hidden group-hover:border-white/[0.1] transition-all duration-700">
                <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-amber-400/[0.05] rounded-full blur-[80px] group-hover:bg-amber-400/[0.1] transition-all duration-700 pointer-events-none" />
                <div className="absolute top-0 left-0 w-1/2 h-full opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-700" style={{ backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.3) 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400/20 to-amber-400/5 border border-amber-400/15 flex items-center justify-center group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-amber-400/10 transition-all duration-500">
                      <Target className="w-8 h-8 text-amber-400" />
                    </div>
                    <span className="text-7xl font-display font-bold text-white/[0.03] group-hover:text-amber-400/[0.07] transition-colors duration-700 leading-none">04</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3 group-hover:text-amber-400 transition-colors duration-500">
                    Apoio à Decisão
                  </h3>
                  <p className="text-muted-foreground leading-relaxed max-w-md text-base">
                    Informação clara e confiável para líderes decidirem com segurança. Do dado bruto ao insight estratégico.
                  </p>
                </div>

                <div className="relative z-10 flex items-center gap-3 mt-6 pt-6 border-t border-white/[0.04]">
                  {["Insights", "Relatórios", "Estratégia"].map((tag) => (
                    <span key={tag} className="text-xs text-muted-foreground/60 bg-white/[0.03] px-3 py-1.5 rounded-full border border-white/[0.04]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-14"
          >
            <Button variant="goldOutline" size="lg" asChild>
              <Link to="/servicos">
                Ver todos os serviços
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ SECTORS — Immersive Cards ═══════════════ */}
      <section className="section-padding relative overflow-hidden">
        {/* Atmospheric background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gold/[0.03] rounded-full blur-[150px] pointer-events-none" />

        <div className="container-tight relative z-10">
          <SectionTitle
            label="Especialização"
            title="Soluções por setor"
            description="Atuamos com foco em segmentos que demandam visão estratégica de dados."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { ...sectors[0], color: "sky", desc: "Indicadores clínicos, operacionais e financeiros para hospitais e clínicas." },
              { ...sectors[1], color: "violet", desc: "Análise de processos, prazos e produtividade para escritórios de advocacia." },
              { ...sectors[2], color: "emerald", desc: "Headcount, turnover, absenteísmo e custo de folha num só painel." },
              { ...sectors[3], color: "amber", desc: "Receita, despesas, fluxo de caixa e projeções com atualização em tempo real." },
            ].map((sector, index) => {
              const colorMap: Record<string, { bg: string; border: string; text: string; glow: string; shadow: string }> = {
                sky: { bg: "from-sky-400/15 to-sky-400/5", border: "border-sky-400/10 group-hover:border-sky-400/25", text: "group-hover:text-sky-400", glow: "bg-sky-400/[0.08]", shadow: "group-hover:shadow-sky-400/20" },
                violet: { bg: "from-violet-400/15 to-violet-400/5", border: "border-violet-400/10 group-hover:border-violet-400/25", text: "group-hover:text-violet-400", glow: "bg-violet-400/[0.08]", shadow: "group-hover:shadow-violet-400/20" },
                emerald: { bg: "from-emerald-400/15 to-emerald-400/5", border: "border-emerald-400/10 group-hover:border-emerald-400/25", text: "group-hover:text-emerald-400", glow: "bg-emerald-400/[0.08]", shadow: "group-hover:shadow-emerald-400/20" },
                amber: { bg: "from-amber-400/15 to-amber-400/5", border: "border-amber-400/10 group-hover:border-amber-400/25", text: "group-hover:text-amber-400", glow: "bg-amber-400/[0.08]", shadow: "group-hover:shadow-amber-400/20" },
              };
              const c = colorMap[sector.color];

              return (
                <motion.div
                  key={sector.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link
                    to={sector.href}
                    className="group block cursor-pointer h-full"
                  >
                    <div className={`relative h-full bg-[#0d0f14] border ${c.border} rounded-3xl p-8 flex flex-col overflow-hidden transition-all duration-700 hover:-translate-y-2 ${c.shadow} hover:shadow-2xl`}>
                      {/* Background glow */}
                      <div className={`absolute -top-20 -right-20 w-40 h-40 ${c.glow} rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none`} />
                      {/* Bottom gradient line */}
                      <div className={`absolute bottom-0 left-[10%] right-[10%] h-[2px] bg-gradient-to-r ${c.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                      <div className="relative z-10 flex flex-col h-full">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${c.bg} border ${c.border} flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500`}>
                          <sector.icon className="w-7 h-7 text-foreground/80" />
                        </div>

                        <h3 className={`text-xl font-display font-bold text-foreground mb-3 ${c.text} transition-colors duration-500`}>
                          {sector.name}
                        </h3>

                        <p className="text-muted-foreground/70 text-sm leading-relaxed mb-6 flex-1">
                          {sector.desc}
                        </p>

                        <div className="flex items-center gap-2 text-muted-foreground/40 group-hover:text-foreground/70 transition-colors duration-500">
                          <span className="text-xs font-medium">Explorar</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
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
                Pronto para decidir melhor?
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
                Vamos transformar seus dados em{" "}
                <span className="text-gradient">decisões estratégicas</span>.
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Conte-nos o seu desafio. Analisamos a situação e mostramos como
                os seus dados podem trabalhar a seu favor, sem compromisso.
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
