import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { useAtividadesApi } from "@/hooks/useAtividadesApi";
import { useLeadsApi } from "@/hooks/useLeadsApi";
import { CheckCircle2, Circle, Calendar, Clock, Phone, Mail, CalendarClock, MoreHorizontal, Plus } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

const getTypeIcon = (tipo: string) => {
  switch (tipo) {
    case 'Ligação': return <Phone className="w-4 h-4" />;
    case 'E-mail': return <Mail className="w-4 h-4" />;
    case 'Reunião': return <CalendarClock className="w-4 h-4" />;
    default: return <Clock className="w-4 h-4" />;
  }
};

const getTypeBadgeClasses = (tipo: string) => {
  switch (tipo) {
    case 'Ligação':
      return 'bg-blue-500/15 text-blue-400 border border-blue-500/20';
    case 'E-mail':
      return 'bg-violet-500/15 text-violet-400 border border-violet-500/20';
    case 'Reunião':
      return 'bg-amber-500/15 text-amber-400 border border-amber-500/20';
    case 'WhatsApp':
      return 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20';
    default:
      return 'bg-white/[0.06] text-white/60 border border-white/[0.08]';
  }
};

export default function AtividadesDashboard() {
  const { atividadesPendentes, isLoadingPendentes, updateAtividade, createAtividade, isCreating } = useAtividadesApi();
  const { leads, isLoading: isLoadingLeads } = useLeadsApi();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    lead_id: "",
    tipo: "Ligação",
    descricao: "",
    data_atividade: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
  });

  const handleConcluir = async (id: number) => {
    await updateAtividade({ id, status: 'Concluída' });
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.lead_id) return;

    await createAtividade({
      lead_id: Number(formData.lead_id),
      tipo: formData.tipo as any,
      descricao: formData.descricao,
      data_atividade: formData.data_atividade.replace('T', ' ') + ':00',
      status: 'Pendente'
    });

    setIsModalOpen(false);
    setFormData({
       lead_id: "",
       tipo: "Ligação",
       descricao: "",
       data_atividade: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
    });
  };

  if (isLoadingPendentes) {
    return (
      <AdminLayout title="Atividades">
        <div className="flex justify-center items-center p-16">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
            <span className="text-sm text-white/40 tracking-wide">Carregando atividades...</span>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Fila de Atividades Pendentes">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
         <div className="max-w-2xl text-white/50 text-sm leading-relaxed">
           Acompanhe todas as atividades, reuniões e follow-ups agendados para os leads.
         </div>
         <Button variant="gold" onClick={() => setIsModalOpen(true)} className="gap-2 shrink-0 rounded-xl shadow-[0_0_20px_rgba(234,179,8,0.15)]">
            <Plus className="w-4 h-4" />
            Nova Atividade
         </Button>
      </div>

      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {atividadesPendentes.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#0d0f14] border border-white/[0.06] p-16 text-center rounded-3xl flex flex-col items-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-gold/[0.02] to-transparent pointer-events-none" />
              <div className="relative">
                <div className="absolute inset-0 w-20 h-20 mx-auto bg-gold/10 rounded-full blur-2xl animate-pulse" />
                <CheckCircle2 className="w-20 h-20 text-white/[0.12] mb-6 relative z-10" />
              </div>
              <h3 className="text-xl font-semibold text-white/80 mb-2 tracking-tight">Nenhuma atividade pendente</h3>
              <p className="text-white/40 text-sm">Você está em dia com seus leads!</p>
            </motion.div>
          ) : (
            atividadesPendentes.map((ativ, index) => (
              <motion.div
                key={ativ.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20, transition: { duration: 0.25 } }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="bg-[#0d0f14] border border-white/[0.06] p-5 rounded-3xl flex items-start gap-4 hover:border-gold/20 transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gold/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <button
                  onClick={() => ativ.id && handleConcluir(ativ.id)}
                  className="mt-1 shrink-0 relative z-10 text-white/20 hover:text-emerald-400 transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]"
                  title="Marcar como concluída"
                >
                  <Circle className="w-6 h-6 group-hover:hidden" />
                  <CheckCircle2 className="w-6 h-6 hidden group-hover:block" />
                </button>

                <div className="flex-1 min-w-0 relative z-10">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2.5">
                    <div className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg w-fit ${getTypeBadgeClasses(ativ.tipo)}`}>
                      {getTypeIcon(ativ.tipo)}
                      {ativ.tipo}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-white/40 bg-white/[0.03] border border-white/[0.04] px-2.5 py-1 rounded-lg w-fit">
                      <Calendar className="w-3.5 h-3.5" />
                      {format(new Date(ativ.data_atividade), "dd MMM, HH:mm", { locale: ptBR })}
                    </div>
                  </div>

                  <h4 className="text-[15px] font-medium text-white/90 mb-1.5 leading-snug tracking-tight">
                    {ativ.descricao}
                  </h4>

                  <div className="text-sm text-white/35 flex items-center gap-2">
                     <span>Lead: <strong className="text-white/60 font-medium">{ativ.nome_empresa}</strong></span>
                     <span className="text-white/15">•</span>
                     <span>Produto: {ativ.produto}</span>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2 relative z-10">
                   <Button variant="outline" size="sm" className="hidden md:flex border-white/[0.08] bg-transparent text-white/50 hover:text-gold hover:border-gold/30 rounded-xl transition-all duration-300">
                     Ver Lead
                   </Button>
                   <Button variant="ghost" size="icon" className="text-white/25 hover:text-white/60 hover:bg-white/[0.04] rounded-xl">
                     <MoreHorizontal className="w-4 h-4" />
                   </Button>
                </div>

              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-[#0d0f14] border-white/[0.08] max-w-md rounded-3xl shadow-[0_24px_80px_rgba(0,0,0,0.6)]">
          <DialogHeader>
            <DialogTitle className="text-xl font-display text-white/90 tracking-tight">Programar Atividade</DialogTitle>
            <DialogDescription className="text-white/40 text-sm">
              Agende um follow-up, reunião ou tarefa para um lead específico.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateSubmit} className="space-y-4 pt-4 mt-2 border-t border-white/[0.06]">
            <div className="space-y-2">
              <Label className="text-white/60 text-sm">Vincular a qual Lead? *</Label>
              <select
                required
                value={formData.lead_id}
                onChange={(e) => setFormData(prev => ({ ...prev, lead_id: e.target.value }))}
                className="flex h-10 w-full rounded-xl border border-border/50 bg-background/50 px-3 py-2 text-sm text-white/80 ring-offset-background focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/20 transition-colors duration-200 disabled:opacity-50"
              >
                <option value="">Selecione um Lead...</option>
                {!isLoadingLeads && leads.map(l => (
                   <option key={l.id} value={l.id}>{l.nome_empresa} ({l.produto})</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label className="text-white/60 text-sm">Tipo de Atividade *</Label>
              <select
                required
                value={formData.tipo}
                onChange={(e) => setFormData(prev => ({ ...prev, tipo: e.target.value }))}
                className="flex h-10 w-full rounded-xl border border-border/50 bg-background/50 px-3 py-2 text-sm text-white/80 ring-offset-background focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/20 transition-colors duration-200 disabled:opacity-50"
              >
                <option value="Ligação">Ligação</option>
                <option value="E-mail">E-mail</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="Reunião">Reunião</option>
                <option value="Outro">Outro</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label className="text-white/60 text-sm">O que precisa ser feito? *</Label>
              <Input
                required
                placeholder="Ex: Ligar para confirmar proposta..."
                value={formData.descricao}
                onChange={(e) => setFormData(prev => ({ ...prev, descricao: e.target.value }))}
                className="bg-background/50 border-border/50 rounded-xl focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-colors duration-200 text-white/80 placeholder:text-white/25"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white/60 text-sm">Data e Hora Planejada *</Label>
              <Input
                required
                type="datetime-local"
                value={formData.data_atividade}
                onChange={(e) => setFormData(prev => ({ ...prev, data_atividade: e.target.value }))}
                className="bg-background/50 border-border/50 rounded-xl focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-colors duration-200 text-white/80"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-white/[0.06] mt-6">
               <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)} className="text-white/40 hover:text-white/70 hover:bg-white/[0.04] rounded-xl">Cancelar</Button>
               <Button type="submit" variant="gold" disabled={isCreating} className="rounded-xl shadow-[0_0_20px_rgba(234,179,8,0.15)]">
                 {isCreating ? "Salvando..." : "Programar Atividade"}
               </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
