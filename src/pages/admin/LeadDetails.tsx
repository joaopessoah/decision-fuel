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
import { motion } from "framer-motion";

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

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
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
          <div className="w-14 h-14 border-[3px] border-gold/30 border-t-gold rounded-full animate-spin mb-5" />
          <p className="text-white/40 text-sm tracking-wide">Carregando informações do lead...</p>
        </div>
      </AdminLayout>
    );
  }

  if (!lead) {
    return (
      <AdminLayout title="Lead não encontrado">
        <div className="text-center p-20">
          <p className="text-white/40">O lead solicitado não existe ou foi removido.</p>
          <Button variant="ghost" className="mt-4 hover:text-gold transition-colors" onClick={() => navigate("/admin/leads")}>
            <ChevronLeft className="w-4 h-4 mr-2" /> Voltar para Dashboard
          </Button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title={`Detalhes: ${lead.nome_empresa}`}>
      {/* Top bar */}
      <motion.div
        {...fadeUp}
        transition={{ duration: 0.4 }}
        className="mb-8 flex items-center justify-between"
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/admin/leads")}
          className="gap-2 text-white/40 hover:text-gold hover:bg-transparent transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Voltar para Lista
        </Button>
        <Button variant="gold" className="gap-2" onClick={() => setIsFormOpen(true)}>
          <Edit3 className="w-4 h-4" />
          Editar Dados
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna da Esquerda: Dados Principais */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card da Empresa */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="bg-[#0d0f14] p-7 rounded-3xl border border-white/[0.06] relative overflow-hidden"
          >
            {/* Gold glow in corner */}
            <div className="absolute -top-16 -right-16 w-72 h-72 bg-gold/[0.07] rounded-full blur-[80px] pointer-events-none" />

            <div className="flex items-start gap-5 relative z-10">
              <div className="w-[72px] h-[72px] rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center shrink-0 shadow-2xl shadow-black/40">
                <Building2 className="w-9 h-9 text-gold" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-1.5">
                  <h2 className="text-2xl font-display font-bold text-white truncate">{lead.nome_empresa}</h2>
                  <span className={cn("px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-widest", getFaseColor(lead.fase))}>
                    {lead.fase}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-white/40">
                  <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {lead.estado}</span>
                  <span className="flex items-center gap-1.5"><Layers className="w-3.5 h-3.5" /> {lead.produto}</span>
                  <span className="flex items-center gap-1.5 uppercase font-medium text-xs tracking-tight">CNPJ: {lead.cnpj || '---'}</span>
                </div>
              </div>
            </div>

            {/* Info pills */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-7 border-t border-white/[0.04] relative z-10">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.04]">
                 <p className="text-[10px] text-white/30 uppercase font-bold mb-1.5 tracking-wider">Etapa Atual</p>
                 <span className={cn("px-2.5 py-0.5 rounded-lg text-xs font-semibold border", getEtapaColor(lead.etapa))}>
                   {lead.etapa}
                 </span>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.04]">
                 <p className="text-[10px] text-white/30 uppercase font-bold mb-1.5 tracking-wider">Origem do Lead</p>
                 <span className="text-sm font-medium text-white/90">{lead.origem}</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.04]">
                 <p className="text-[10px] text-white/30 uppercase font-bold mb-1.5 tracking-wider">Ingressou em</p>
                 <span className="text-sm font-medium text-white/90">
                   {lead.created_at ? format(new Date(lead.created_at), "dd/MM/yyyy", { locale: ptBR }) : '---'}
                 </span>
              </div>
            </div>

            {/* Valores Condicionais */}
            {(lead.valor_implantacao || lead.valor_mensal || lead.valor_unico) && (
              <div className="mt-6 p-5 rounded-2xl bg-gold/[0.03] border border-gold/10 grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10 shadow-[inset_0_1px_0_0_rgba(212,175,55,0.06)]">
                {lead.valor_implantacao && (
                  <div>
                    <p className="text-[10px] text-gold/60 uppercase font-bold mb-1">Implantação</p>
                    <p className="text-lg font-display font-medium text-white">
                      {Number(lead.valor_implantacao).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
                    </p>
                  </div>
                )}
                {lead.valor_mensal && (
                  <div>
                    <p className="text-[10px] text-gold/60 uppercase font-bold mb-1">Mensalidade</p>
                    <p className="text-lg font-display font-medium text-white">
                      {Number(lead.valor_mensal).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
                    </p>
                  </div>
                )}
                {lead.valor_unico && (
                  <div>
                    <p className="text-[10px] text-gold/60 uppercase font-bold mb-1">Valor Único</p>
                    <p className="text-lg font-display font-medium text-white">
                      {Number(lead.valor_unico).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
                    </p>
                  </div>
                )}
              </div>
            )}
          </motion.div>

          {/* Card de Contatos */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="bg-[#0d0f14] p-7 rounded-3xl border border-white/[0.06]"
          >
            <h3 className="text-lg font-medium flex items-center gap-2.5 mb-6 text-white">
              <User className="w-5 h-5 text-gold" />
              Pessoas de Contato
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lead.contatos?.map((contato, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:border-gold/20 transition-all duration-300 group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-full bg-gold/10 text-gold flex items-center justify-center shrink-0">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-medium text-white group-hover:text-gold transition-colors">{contato.nome}</p>
                      <p className="text-[10px] text-white/30 uppercase font-bold tracking-wider">{contato.cargo || 'Contato'}</p>
                    </div>
                  </div>
                  <div className="space-y-2 pt-3 border-t border-white/[0.04]">
                    {contato.email && (
                      <div className="flex items-center gap-2 text-xs text-white/40">
                        <Mail className="w-3 h-3" />
                        {contato.email}
                      </div>
                    )}
                    {contato.celular && (
                      <div className="flex items-center gap-2 text-xs text-white/40">
                        <Phone className="w-3 h-3" />
                        {contato.celular}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {(!lead.contatos || lead.contatos.length === 0) && (
                <p className="text-white/30 text-sm italic col-span-2 py-4">Nenhum contato cadastrado.</p>
              )}
            </div>
          </motion.div>
        </div>

        {/* Coluna da Direita: Timeline */}
        <div className="space-y-6">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="bg-[#0d0f14] p-7 rounded-3xl border border-white/[0.06] h-full"
          >
            <h3 className="text-lg font-medium flex items-center gap-2.5 mb-7 text-white">
              <Milestone className="w-5 h-5 text-gold" />
              Interações & Histórico
            </h3>

            {(!lead.movimentacoes || lead.movimentacoes.length === 0) && (!lead.atividades || lead.atividades.length === 0) ? (
              <div className="text-center py-12">
                <Clock className="w-12 h-12 text-white/10 mx-auto mb-3" />
                <p className="text-sm text-white/30 italic">Nenhuma atividade registrada.</p>
              </div>
            ) : (
              <div className="relative border-l-2 border-white/[0.06] ml-3 space-y-10 pb-4">
                {[
                  ...(lead.movimentacoes || []).map(m => ({ ...m, type: 'mov' as const, date: new Date(m.data_alteracao) })),
                  ...(lead.atividades || []).map(a => ({ ...a, type: 'ativ' as const, date: new Date(a.data_atividade) }))
                ]
                .sort((a, b) => b.date.getTime() - a.date.getTime())
                .map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: 0.3 + idx * 0.05 }}
                    className="relative pl-7"
                  >
                     <span className={cn(
                       "absolute -left-[11px] top-1 w-5 h-5 rounded-full ring-4 ring-[#0d0f14] flex items-center justify-center shadow-lg",
                       item.type === 'mov'
                         ? "bg-gold text-[8px] font-bold text-black shadow-gold/20"
                         : "bg-sky-500 text-[8px] font-bold text-white shadow-sky-500/20"
                     )}>
                       {item.type === 'mov' ? 'M' : 'A'}
                     </span>

                     <div className="text-[11px] text-white/30 mb-1.5 font-medium tracking-wide">
                       {format(item.date, "dd MMM yyyy, HH:mm", { locale: ptBR })}
                     </div>

                     <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] transition-all duration-300">
                        <div className="flex items-center gap-2 mb-2">
                           <span className={cn(
                             "text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider",
                             item.type === 'mov' ? "bg-gold/10 text-gold" : "bg-sky-500/10 text-sky-400"
                           )}>
                             {item.type === 'mov' ? (item as any).acao : (item as any).tipo}
                           </span>
                           {item.type === 'ativ' && (item as any).status === 'Concluída' && (
                             <span className="text-[9px] bg-green-500/10 text-green-500 px-2 py-0.5 rounded-md font-bold uppercase">OK</span>
                           )}
                        </div>

                        <div className="text-xs text-white/70 leading-relaxed">
                          {item.type === 'mov' ? (
                             (item as any).acao === 'Criação' ? (
                               <span>{(item as any).valor_novo}</span>
                             ) : (
                               <span>Alterou <b className="text-white/90">{(item as any).campo_alterado}</b> para <b className="text-gold">{(item as any).valor_novo}</b>.</span>
                             )
                          ) : (
                            <div>
                               <p className="font-medium text-white/80">{(item as any).descricao}</p>
                            </div>
                          )}
                        </div>
                     </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
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
