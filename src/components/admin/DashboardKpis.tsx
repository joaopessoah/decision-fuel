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
    },
    {
      label: "Oportunidades Quentes",
      value: leadsQuentes,
      icon: Target,
      trend: "Prioridade alta",
    },
    {
      label: "Negócios Fechados",
      value: leadsFechados,
      icon: CheckCircle,
      trend: "Mês atual",
    },
    {
      label: "Taxa de Conversão",
      value: `${taxaConversao}%`,
      icon: TrendingUp,
      trend: "Em relação ao total",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {kpis.map((kpi, index) => (
        <motion.div
          key={kpi.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="glass-card rounded-2xl p-6 relative overflow-hidden group hover:border-gold/30 transition-colors"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-lg bg-gold/10 text-gold group-hover:scale-110 transition-transform">
              <kpi.icon className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-3xl font-display font-bold text-foreground mb-1">
            {kpi.value}
          </h3>
          <p className="text-sm font-medium text-muted-foreground mb-4">
            {kpi.label}
          </p>
          <div className="text-xs text-muted-foreground/80 flex items-center">
             {kpi.trend}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
