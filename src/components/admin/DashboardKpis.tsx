import { Lead } from "@/types/crm";
import { Users, Target, CheckCircle, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

interface DashboardKpisProps {
  leads: Lead[];
}

export function DashboardKpis({ leads }: DashboardKpisProps) {
  const totalLeads = leads.length;
  const leadsQuentes = leads.filter((l) => l.fase === "Quente").length;
  const leadsFechados = leads.filter((l) => l.etapa === "Fechamento").length;

  // Calcula uma "taxa de conversão" basica
  const taxaConversao = totalLeads > 0 ? Math.round((leadsFechados / totalLeads) * 100) : 0;

  const kpis = [
    {
      label: "Total de Leads",
      value: totalLeads,
      icon: Users,
      trend: "+12% este mês",
      watermark: "01",
      color: {
        iconBg: "bg-sky-400/10",
        iconText: "text-sky-400",
        pillBg: "bg-sky-400/10",
        pillText: "text-sky-400",
        glow: "bg-sky-400/20",
      },
    },
    {
      label: "Oportunidades Quentes",
      value: leadsQuentes,
      icon: Target,
      trend: "Prioridade alta",
      watermark: "02",
      color: {
        iconBg: "bg-amber-400/10",
        iconText: "text-amber-400",
        pillBg: "bg-amber-400/10",
        pillText: "text-amber-400",
        glow: "bg-amber-400/20",
      },
    },
    {
      label: "Negócios Fechados",
      value: leadsFechados,
      icon: CheckCircle,
      trend: "Mês atual",
      watermark: "03",
      color: {
        iconBg: "bg-emerald-400/10",
        iconText: "text-emerald-400",
        pillBg: "bg-emerald-400/10",
        pillText: "text-emerald-400",
        glow: "bg-emerald-400/20",
      },
    },
    {
      label: "Taxa de Conversão",
      value: `${taxaConversao}%`,
      icon: TrendingUp,
      trend: "Em relação ao total",
      watermark: "04",
      color: {
        iconBg: "bg-gold/10",
        iconText: "text-gold",
        pillBg: "bg-gold/10",
        pillText: "text-gold",
        glow: "bg-gold/20",
      },
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {kpis.map((kpi) => (
        <motion.div
          key={kpi.label}
          variants={cardVariants}
          className="group relative overflow-hidden rounded-3xl bg-[#0d0f14] border border-white/[0.06] p-6 hover:border-white/[0.1] transition-all duration-300"
        >
          {/* Colored glow on hover */}
          <div
            className={`absolute -bottom-6 -right-6 h-32 w-32 rounded-full ${kpi.color.glow} blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
          />

          {/* Decorative watermark number */}
          <span className="absolute -top-3 -right-1 text-[80px] font-display font-black leading-none text-white/[0.03] pointer-events-none select-none">
            {kpi.watermark}
          </span>

          {/* Content */}
          <div className="relative z-10">
            {/* Icon + Trend row */}
            <div className="flex items-center justify-between mb-5">
              <div
                className={`flex items-center justify-center w-11 h-11 rounded-xl ${kpi.color.iconBg} ${kpi.color.iconText} group-hover:scale-110 transition-transform duration-300`}
              >
                <kpi.icon className="w-5 h-5" />
              </div>
              <span
                className={`inline-flex items-center ${kpi.color.pillBg} ${kpi.color.pillText} text-[10px] font-semibold tracking-wide rounded-full px-2 py-0.5`}
              >
                {kpi.trend}
              </span>
            </div>

            {/* Value */}
            <h3 className="text-4xl font-display font-bold tabular-nums text-white mb-1">
              {kpi.value}
            </h3>

            {/* Label */}
            <p className="text-sm font-medium text-white/50">
              {kpi.label}
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
