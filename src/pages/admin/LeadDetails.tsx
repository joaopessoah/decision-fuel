import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { useLeadsApi } from "@/hooks/useLeadsApi";
import { Lead, Contato } from "@/types/crm";
import { 
  Building2, User, History, Phone, Mail, CalendarClock, 
  Clock, CheckCircle2, ChevronLeft, Edit3, MapPin, 
  ExternalLink, Layers, Milestone, MousePointer2 
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/admin/LeadForm";
import { cn } from "@/lib/utils";

const getFaseColor = (fase: string) => {
  switch (fase) {
    case "Quente": return "bg-red-500/10 text-red-500 border-red-500/20";
    case "Morno": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
    case "Frio": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    default: return "bg-gray-500/10 text-gray-500 border-gray-500/20";
  }
};

const getEtapaColor = (etapa: string) => {
  switch (etapa) {
    case "Fechamento": return "bg-green-500/10 text-green-500 border-green-500/20";
    case "Perdido": return "bg-red-900/40 text-red-400 border-red-900/50";
    default: return "bg-gold/10 text-gold border-gold/20";
  }
};

export default function LeadDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getLeadById, updateLead, isUpdating } = useLeadsApi();
  const [lead, setLead] = useState<Lead | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    fetchLead();
  }, [id]);

  const fetchLead = async () => {
    if (!id) return;
    try {
      setIsLoading(true);
      const data = await getLeadById(Number(id));
      setLead(data);
    } catch (error) {
      console.error("Erro ao carregar lead:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitLead = async (leadData: Lead) => {
    try {
      if (lead?.id) {
        await updateLead({ ...leadData, id: lead.id });
        await fetchLead(); // Recarrega os dados
        setIsFormOpen(false);
      }
    } catch (error) {
      console.error("Erro ao atualizar lead:", error);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout title="Detalhes do Lead">
        <div className="flex flex-col items-center justify-center p-20">
          <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-muted-foreground">Carregando informações do lead...</p>
        </div>
      </AdminLayout>
    );
  }

  if (!lead) {
    return (
      <AdminLayout title="Lead não encontrado">
        <div className="text-center p-20">
          <p className="text-muted-foreground">O lead solicitado não existe ou foi removido.</p>
          <Button variant="ghost" className="mt-4" onClick={() => navigate("/admin/leads")}>
            <ChevronLeft className="w-4 h-4 mr-2" /> Voltar para Dashboard
          </Button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title={`Detalhes: ${lead.nome_empresa}`}>
      <div className="mb-6 flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={() => navigate("/admin/leads")} className="gap-2 text-muted-foreground hover:text-foreground">
          <ChevronLeft className="w-4 h-4" />
          Voltar para Lista
        </Button>
        <Button variant="gold" className="gap-2" onClick={() => setIsFormOpen(true)}>
          <Edit3 className="w-4 h-4" />
          Editar Dados
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna da Esquerda: Dados Principais */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card da Empresa */}
          <div className="glass-card p-6 rounded-2xl border border-border/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-[60px] pointer-events-none" />
            
            <div className="flex items-start gap-4 relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-secondary border border-border flex items-center justify-center shrink-0 shadow-lg shadow-black/20">
                <Building2 className="w-8 h-8 text-gold" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h2 className="text-2xl font-display font-bold text-foreground truncate">{lead.nome_empresa}</h2>
                  <span className={cn("px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-widest", getFaseColor(lead.fase))}>
                    {lead.fase}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {lead.estado}</span>
                  <span className="flex items-center gap-1"><Layers className="w-3.5 h-3.5" /> {lead.produto}</span>
                  <span className="flex items-center gap-1 uppercase font-medium text-xs tracking-tight">CNPJ: {lead.cnpj || '---'}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-6 border-t border-border/40 relative z-10">
              <div className="p-4 rounded-xl bg-secondary/50 border border-border/30">
                 <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1 tracking-wider">Etapa Atual</p>
                 <span className={cn("px-2 py-0.5 rounded-md text-xs font-semibold border", getEtapaColor(lead.etapa))}>
                   {lead.etapa}
                 </span>
              </div>
              <div className="p-4 rounded-xl bg-secondary/50 border border-border/30">
                 <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1 tracking-wider">Origem do Lead</p>
                 <span className="text-sm font-medium text-foreground">{lead.origem}</span>
              </div>
              <div className="p-4 rounded-xl bg-secondary/50 border border-border/30">
                 <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1 tracking-wider">Ingressou em</p>
                 <span className="text-sm font-medium text-foreground">
                   {lead.created_at ? format(new Date(lead.created_at), "dd/MM/yyyy", { locale: ptBR }) : '---'}
                 </span>
              </div>
            </div>

            {/* Valores Condicionais */}
            {(lead.valor_implantacao || lead.valor_mensal || lead.valor_unico) && (
              <div className="mt-6 p-4 rounded-xl bg-gold/5 border border-gold/10 grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
                {lead.valor_implantacao && (
                  <div>
                    <p className="text-[10px] text-gold/70 uppercase font-bold mb-0.5">Implantação</p>
                    <p className="text-lg font-display font-medium text-foreground">
                      {Number(lead.valor_implantacao).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
                    </p>
                  </div>
                )}
                {lead.valor_mensal && (
                  <div>
                    <p className="text-[10px] text-gold/70 uppercase font-bold mb-0.5">Mensalidade</p>
                    <p className="text-lg font-display font-medium text-foreground">
                      {Number(lead.valor_mensal).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
                    </p>
                  </div>
                )}
                {lead.valor_unico && (
                  <div>
                    <p className="text-[10px] text-gold/70 uppercase font-bold mb-0.5">Valor Único</p>
                    <p className="text-lg font-display font-medium text-foreground">
                      {Number(lead.valor_unico).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Card de Contatos */}
          <div className="glass-card p-6 rounded-2xl border border-border/50">
            <h3 className="text-lg font-medium flex items-center gap-2 mb-6 text-foreground">
              <User className="w-5 h-5 text-gold" />
              Pessoas de Contato
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lead.contatos?.map((contato, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-secondary/30 border border-border/50 hover:border-gold/30 transition-colors group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-gold/10 text-gold flex items-center justify-center shrink-0">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground group-hover:text-gold transition-colors">{contato.nome}</p>
                      <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">{contato.cargo || 'Contato'}</p>
                    </div>
                  </div>
                  <div className="space-y-1.5 pt-2 border-t border-border/30">
                    {contato.email && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Mail className="w-3 h-3" />
                        {contato.email}
                      </div>
                    )}
                    {contato.celular && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Phone className="w-3 h-3" />
                        {contato.celular}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {(!lead.contatos || lead.contatos.length === 0) && (
                <p className="text-muted-foreground text-sm italic col-span-2 py-4">Nenhum contato cadastrado.</p>
              )}
            </div>
          </div>
        </div>

        {/* Coluna da Direita: Timeline */}
        <div className="space-y-6">
           <div className="glass-card p-6 rounded-2xl border border-border/50 h-full">
              <h3 className="text-lg font-medium flex items-center gap-2 mb-6 text-foreground">
                <Milestone className="w-5 h-5 text-gold" />
                Interações & Histórico
              </h3>

              {(!lead.movimentacoes || lead.movimentacoes.length === 0) && (!lead.atividades || lead.atividades.length === 0) ? (
                <div className="text-center py-10">
                  <Clock className="w-10 h-10 text-muted-foreground mx-auto mb-2 opacity-20" />
                  <p className="text-sm text-muted-foreground italic">Nenhuma atividade registrada.</p>
                </div>
              ) : (
                <div className="relative border-l-2 border-border/50 ml-3 space-y-8 pb-4">
                  {[
                    ...(lead.movimentacoes || []).map(m => ({ ...m, type: 'mov' as const, date: new Date(m.data_alteracao) })),
                    ...(lead.atividades || []).map(a => ({ ...a, type: 'ativ' as const, date: new Date(a.data_atividade) }))
                  ]
                  .sort((a, b) => b.date.getTime() - a.date.getTime())
                  .map((item, idx) => (
                    <div key={idx} className="relative pl-6">
                       <span className={cn(
                         "absolute -left-[9px] top-1.5 w-4 h-4 rounded-full ring-4 ring-background flex items-center justify-center",
                         item.type === 'mov' ? "bg-gold text-[8px] font-bold text-black" : "bg-blue-500 text-[8px] text-white"
                       )}>
                         {item.type === 'mov' ? 'M' : 'A'}
                       </span>
                       
                       <div className="text-xs text-muted-foreground mb-1 font-medium">
                         {format(item.date, "dd MMM yyyy, HH:mm", { locale: ptBR })}
                       </div>

                       <div className="p-3 rounded-xl bg-secondary/30 border border-border/30 hover:bg-secondary/50 transition-colors">
                          <div className="flex items-center gap-2 mb-1.5">
                             <span className={cn(
                               "text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider",
                               item.type === 'mov' ? "bg-gold/10 text-gold" : "bg-blue-500/10 text-blue-400"
                             )}>
                               {item.type === 'mov' ? (item as any).acao : (item as any).tipo}
                             </span>
                             {item.type === 'ativ' && (item as any).status === 'Concluída' && (
                               <span className="text-[9px] bg-green-500/10 text-green-500 px-1.5 py-0.5 rounded font-bold uppercase">OK</span>
                             )}
                          </div>

                          <div className="text-xs text-foreground leading-relaxed">
                            {item.type === 'mov' ? (
                               (item as any).acao === 'Criação' ? (
                                 <span>{(item as any).valor_novo}</span>
                               ) : (
                                 <span>Alteou <b>{(item as any).campo_alterado}</b> para <b className="text-gold">{(item as any).valor_novo}</b>.</span>
                               )
                            ) : (
                              <div>
                                 <p className="font-medium">{(item as any).descricao}</p>
                              </div>
                            )}
                          </div>
                       </div>
                    </div>
                  ))}
                </div>
              )}
           </div>
        </div>
      </div>

      <LeadForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        lead={lead}
        onSubmit={handleSubmitLead}
        isLoading={isUpdating}
      />
    </AdminLayout>
  );
}
