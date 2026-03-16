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

const getTypeIcon = (tipo: string) => {
  switch (tipo) {
    case 'Ligação': return <Phone className="w-4 h-4" />;
    case 'E-mail': return <Mail className="w-4 h-4" />;
    case 'Reunião': return <CalendarClock className="w-4 h-4" />;
    default: return <Clock className="w-4 h-4" />;
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
        <div className="flex justify-center p-12">Carregando atividades...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Fila de Atividades Pendentes">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
         <div className="max-w-2xl text-muted-foreground">
           Acompanhe todas as atividades, reuniões e follow-ups agendados para os leads.
         </div>
         <Button variant="gold" onClick={() => setIsModalOpen(true)} className="gap-2 shrink-0">
            <Plus className="w-4 h-4" />
            Nova Atividade
         </Button>
      </div>

      <div className="space-y-4">
        {atividadesPendentes.length === 0 ? (
          <div className="glass-card p-12 text-center rounded-2xl flex flex-col items-center">
            <CheckCircle2 className="w-16 h-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-1">Nenhuma atividade pendente</h3>
            <p className="text-muted-foreground">Você está em dia com seus leads!</p>
          </div>
        ) : (
          atividadesPendentes.map((ativ) => (
            <div key={ativ.id} className="glass-card p-5 rounded-2xl flex items-start gap-4 hover:border-gold/30 transition-colors group">
              
              <button 
                onClick={() => ativ.id && handleConcluir(ativ.id)}
                className="mt-1 text-muted-foreground hover:text-green-500 transition-colors shrink-0"
                title="Marcar como concluída"
              >
                <Circle className="w-6 h-6 group-hover:hidden" />
                <CheckCircle2 className="w-6 h-6 hidden group-hover:block" />
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-gold bg-gold/10 px-2.5 py-1 rounded-full w-fit">
                    {getTypeIcon(ativ.tipo)}
                    {ativ.tipo}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary/50 px-2.5 py-1 rounded-full w-fit">
                    <Calendar className="w-3.5 h-3.5" />
                    {format(new Date(ativ.data_atividade), "dd MMM, HH:mm", { locale: ptBR })}
                  </div>
                </div>
                
                <h4 className="text-lg font-medium text-foreground mb-1 leading-snug">
                  {ativ.descricao}
                </h4>
                
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                   <span>Lead: <strong className="text-foreground/80">{ativ.nome_empresa}</strong></span>
                   •
                   <span>Produto: {ativ.produto}</span>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                 <Button variant="outline" size="sm" className="hidden md:flex">
                   Ver Lead
                 </Button>
                 <Button variant="ghost" size="icon" className="text-muted-foreground">
                   <MoreHorizontal className="w-4 h-4" />
                 </Button>
              </div>

            </div>
          ))
        )}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-background border-border max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-display text-foreground">Programar Atividade</DialogTitle>
            <DialogDescription>
              Agende um follow-up, reunião ou tarefa para um lead específico.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateSubmit} className="space-y-4 pt-4 mt-2 border-t border-border">
            <div className="space-y-2">
              <Label>Vincular a qual Lead? *</Label>
              <select
                required
                value={formData.lead_id}
                onChange={(e) => setFormData(prev => ({ ...prev, lead_id: e.target.value }))}
                className="flex h-10 w-full rounded-md border border-input bg-secondary px-3 py-2 text-sm ring-offset-background disabled:opacity-50"
              >
                <option value="">Selecione um Lead...</option>
                {!isLoadingLeads && leads.map(l => (
                   <option key={l.id} value={l.id}>{l.nome_empresa} ({l.produto})</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label>Tipo de Atividade *</Label>
              <select
                required
                value={formData.tipo}
                onChange={(e) => setFormData(prev => ({ ...prev, tipo: e.target.value }))}
                className="flex h-10 w-full rounded-md border border-input bg-secondary px-3 py-2 text-sm ring-offset-background disabled:opacity-50"
              >
                <option value="Ligação">Ligação</option>
                <option value="E-mail">E-mail</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="Reunião">Reunião</option>
                <option value="Outro">Outro</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label>O que precisa ser feito? *</Label>
              <Input
                required
                placeholder="Ex: Ligar para confirmar proposta..."
                value={formData.descricao}
                onChange={(e) => setFormData(prev => ({ ...prev, descricao: e.target.value }))}
                className="bg-secondary"
              />
            </div>

            <div className="space-y-2">
              <Label>Data e Hora Planejada *</Label>
              <Input
                required
                type="datetime-local"
                value={formData.data_atividade}
                onChange={(e) => setFormData(prev => ({ ...prev, data_atividade: e.target.value }))}
                className="bg-secondary"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-border mt-6">
               <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
               <Button type="submit" variant="gold" disabled={isCreating}>
                 {isCreating ? "Salvando..." : "Programar Atividade"}
               </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
