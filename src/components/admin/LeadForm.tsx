import { useState, useEffect } from "react";
import { Lead, Contato, EtapaLead, FaseLead, OrigemLead } from "@/types/crm";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X, Building2, User, History, Phone, Mail, CalendarClock, Clock, CheckCircle2, Briefcase } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface LeadFormProps {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead | null;
  onSubmit: (lead: Lead) => void;
  isLoading: boolean;
}

export function LeadForm({ isOpen, onClose, lead, onSubmit, isLoading }: LeadFormProps) {
  const [formData, setFormData] = useState<Partial<Lead>>({
    produto: "",
    etapa: "Prospecção",
    fase: "Frio",
    origem: "Inbound",
    nome_empresa: "",
    estado: "",
    cnpj: "",
    contatos: [],
  });

  // Preenche dados se estiver editando
  useEffect(() => {
    if (lead) {
      setFormData(lead);
    } else {
      // reseta para criacao
      setFormData({
        produto: "",
        etapa: "Prospecção",
        fase: "Frio",
        origem: "Inbound",
        nome_empresa: "",
        estado: "",
        cnpj: "",
        valor_implantacao: "",
        valor_mensal: "",
        valor_unico: "",
        contatos: [],
      });
    }
  }, [lead, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (index: number, value: string) => {
    // Aplicação da máscara de telefone: (XX) XXXXX-XXXX
    let cleaned = value.replace(/\D/g, "");
    if (cleaned.length > 11) cleaned = cleaned.substring(0, 11);

    let formatted = "";
    if (cleaned.length > 0) {
       formatted = "(" + cleaned.substring(0, 2);
       if (cleaned.length > 2) {
         formatted += ") " + cleaned.substring(2, 7);
         if (cleaned.length > 7) {
            formatted += "-" + cleaned.substring(7, 11);
         }
       }
    } else {
       formatted = cleaned;
    }

    handleContatoChange(index, "celular", formatted);
  };

  const handleAddContato = () => {
    setFormData((prev) => ({
      ...prev,
      contatos: [
        ...(prev.contatos || []),
        { nome: "", email: "", celular: "", cargo: "" },
      ],
    }));
  };

  const handleContatoChange = (index: number, field: keyof Contato, value: string) => {
    const novosContatos = [...(formData.contatos || [])];
    novosContatos[index] = { ...novosContatos[index], [field]: value };
    setFormData((prev) => ({ ...prev, contatos: novosContatos }));
  };

  const handleRemoveContato = (index: number) => {
    const novosContatos = [...(formData.contatos || [])];
    novosContatos.splice(index, 1);
    setFormData((prev) => ({ ...prev, contatos: novosContatos }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as Lead);
  };

  const inputClasses = "bg-background/50 border-border/50 rounded-xl focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-all duration-200 placeholder:text-white/20";
  const selectClasses = "flex h-10 w-full items-center justify-between rounded-xl border border-border/50 bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 appearance-none";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0d0f14] border-white/[0.08] text-foreground rounded-3xl relative overflow-hidden">
        {/* Subtle gold glow in top-right corner */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-gold/[0.07] rounded-full blur-[80px] pointer-events-none" />

        <DialogHeader className="relative z-10">
          <DialogTitle className="text-2xl font-display font-semibold flex items-center gap-3 text-white">
            <div className="p-2 rounded-xl bg-gold/10 border border-gold/20">
              <Briefcase className="w-5 h-5 text-gold" />
            </div>
            {lead ? "Editar Oportunidade" : "Nova Oportunidade"}
          </DialogTitle>
          <DialogDescription className="text-white/40 text-sm pl-[52px]">
            Preencha os dados da empresa e das pessoas de contato envolvidas.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-8 mt-4 relative z-10">

          {/* Sessão 1: Informações da Empresa */}
          <div className="space-y-5">
            <div className="flex items-center gap-3 pb-3 border-b border-transparent" style={{ borderImage: "linear-gradient(to right, rgba(212,175,55,0.2), transparent) 1" }}>
              <div className="p-1.5 rounded-lg bg-gold/10">
                <Building2 className="w-4 h-4 text-gold" />
              </div>
              <h3 className="text-base font-display font-medium text-white/90 tracking-wide">
                Dados da Empresa
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome_empresa" className="text-white/60 text-xs font-medium uppercase tracking-wider">Nome da Empresa *</Label>
                <Input
                  id="nome_empresa"
                  name="nome_empresa"
                  value={formData.nome_empresa}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cnpj" className="text-white/60 text-xs font-medium uppercase tracking-wider">CNPJ / NIF</Label>
                <Input
                  id="cnpj"
                  name="cnpj"
                  value={formData.cnpj}
                  onChange={handleChange}
                  className={inputClasses}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="produto" className="text-white/60 text-xs font-medium uppercase tracking-wider">Produto de Interesse *</Label>
                <Input
                  id="produto"
                  name="produto"
                  value={formData.produto}
                  onChange={handleChange}
                  required
                  placeholder="Ex: Consultoria BI Corporativa"
                  className={inputClasses}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="estado" className="text-white/60 text-xs font-medium uppercase tracking-wider">Estado (UF / Região) *</Label>
                <Input
                  id="estado"
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  required
                  maxLength={2}
                  placeholder="Ex: SP, RJ"
                  className={cn(inputClasses, "uppercase")}
                />
              </div>
            </div>
          </div>

          {/* Sessão 2: Pipeline / CRM */}
          <div className="space-y-5">
            <div className="flex items-center gap-3 pb-3 border-b border-transparent" style={{ borderImage: "linear-gradient(to right, rgba(212,175,55,0.2), transparent) 1" }}>
              <div className="p-1.5 rounded-lg bg-gold/10">
                <Briefcase className="w-4 h-4 text-gold" />
              </div>
              <h3 className="text-base font-display font-medium text-white/90 tracking-wide">
                Informações do Negócio
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="etapa" className="text-white/60 text-xs font-medium uppercase tracking-wider">Etapa do Funil</Label>
                <select
                  id="etapa"
                  name="etapa"
                  value={formData.etapa}
                  onChange={handleChange}
                  className={selectClasses}
                >
                  <option value="Prospecção">Prospecção</option>
                  <option value="Qualificação">Qualificação</option>
                  <option value="Apresentação">Apresentação</option>
                  <option value="Proposta">Proposta</option>
                  <option value="Fechamento">Fechamento (Ganho)</option>
                  <option value="Perdido">Perdido</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fase" className="text-white/60 text-xs font-medium uppercase tracking-wider">Temperatura da Fase</Label>
                <select
                  id="fase"
                  name="fase"
                  value={formData.fase}
                  onChange={handleChange}
                  className={selectClasses}
                >
                  <option value="Frio">Frio</option>
                  <option value="Morno">Morno</option>
                  <option value="Quente">Quente</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="origem" className="text-white/60 text-xs font-medium uppercase tracking-wider">Origem do Lead</Label>
                <select
                  id="origem"
                  name="origem"
                  value={formData.origem}
                  onChange={handleChange}
                  className={selectClasses}
                >
                  <option value="Inbound">Inbound (Site)</option>
                  <option value="Outbound">Outbound (Ativo)</option>
                  <option value="Indicação">Indicação</option>
                  <option value="Parceria">Parceria</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>
            </div>

            {/* Condicional de Valores (Aparece apenas na Proposta ou Fechamento) */}
            {(formData.etapa === "Proposta" || formData.etapa === "Fechamento") && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 p-5 bg-gold/[0.03] border border-gold/10 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gold/[0.08] rounded-full blur-[60px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gold/[0.05] rounded-full blur-[40px] pointer-events-none" />
                <div className="space-y-2 relative z-10">
                  <Label htmlFor="valor_implantacao" className="text-gold/70 text-xs font-medium uppercase tracking-wider">Valor Implantação (R$)</Label>
                  <Input
                    id="valor_implantacao"
                    name="valor_implantacao"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={formData.valor_implantacao || ""}
                    onChange={handleChange}
                    className="bg-background/50 border-gold/20 rounded-xl focus:border-gold/50 focus:ring-1 focus:ring-gold/20"
                  />
                </div>
                <div className="space-y-2 relative z-10">
                  <Label htmlFor="valor_mensal" className="text-gold/70 text-xs font-medium uppercase tracking-wider">Valor Mensal (R$)</Label>
                  <Input
                    id="valor_mensal"
                    name="valor_mensal"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={formData.valor_mensal || ""}
                    onChange={handleChange}
                    className="bg-background/50 border-gold/20 rounded-xl focus:border-gold/50 focus:ring-1 focus:ring-gold/20"
                  />
                </div>
                <div className="space-y-2 relative z-10">
                  <Label htmlFor="valor_unico" className="text-gold/70 text-xs font-medium uppercase tracking-wider">Valor Único (R$)</Label>
                  <Input
                    id="valor_unico"
                    name="valor_unico"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={formData.valor_unico || ""}
                    onChange={handleChange}
                    className="bg-background/50 border-gold/20 rounded-xl focus:border-gold/50 focus:ring-1 focus:ring-gold/20"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Sessão 3: Contatos Multiplos */}
          <div className="space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-transparent" style={{ borderImage: "linear-gradient(to right, rgba(212,175,55,0.2), transparent) 1" }}>
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-gold/10">
                  <User className="w-4 h-4 text-gold" />
                </div>
                <h3 className="text-base font-display font-medium text-white/90 tracking-wide">
                  Contatos (Pessoas)
                </h3>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddContato}
                className="gap-2 rounded-xl border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] hover:border-gold/30 text-white/70 hover:text-gold transition-all duration-200"
              >
                <Plus className="w-4 h-4" />
                Adicionar Contato
              </Button>
            </div>

            {formData.contatos && formData.contatos.length === 0 ? (
               <div className="text-center py-8">
                 <div className="inline-flex p-3 rounded-2xl bg-white/[0.02] border border-white/[0.04] mb-3">
                   <User className="w-5 h-5 text-white/20" />
                 </div>
                 <p className="text-sm text-white/30 italic">Nenhum contato adicionado ainda.</p>
               </div>
            ) : (
               <div className="space-y-3">
                 {formData.contatos?.map((contato, index) => (
                    <div
                      key={index}
                      className="bg-white/[0.02] border border-white/[0.04] rounded-2xl p-5 relative hover:border-white/[0.08] transition-all duration-300 group"
                    >
                       <Button
                         type="button"
                         variant="ghost"
                         size="icon"
                         className="absolute right-3 top-3 text-white/20 hover:bg-red-500/10 hover:text-red-400 h-8 w-8 rounded-xl transition-all duration-200"
                         onClick={() => handleRemoveContato(index)}
                       >
                         <X className="w-4 h-4" />
                       </Button>
                       <div className="flex items-center gap-2 mb-4">
                         <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Contato {index + 1}</span>
                       </div>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <Label className="text-white/50 text-[11px] font-medium uppercase tracking-wider">Nome do Contato *</Label>
                            <Input required value={contato.nome} onChange={(e) => handleContatoChange(index, "nome", e.target.value)} className={cn("h-9", inputClasses)} />
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-white/50 text-[11px] font-medium uppercase tracking-wider">Cargo principal</Label>
                            <Input value={contato.cargo} onChange={(e) => handleContatoChange(index, "cargo", e.target.value)} className={cn("h-9", inputClasses)} />
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-white/50 text-[11px] font-medium uppercase tracking-wider">E-mail corporativo</Label>
                            <Input type="email" value={contato.email} onChange={(e) => handleContatoChange(index, "email", e.target.value)} className={cn("h-9", inputClasses)} />
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-white/50 text-[11px] font-medium uppercase tracking-wider">Celular / WhatsApp</Label>
                            <Input
                              value={contato.celular}
                              onChange={(e) => handlePhoneChange(index, e.target.value)}
                              placeholder="(11) 99999-9999"
                              maxLength={15}
                              className={cn("h-9", inputClasses)}
                            />
                          </div>
                       </div>
                    </div>
                 ))}
               </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-white/[0.06] mt-8">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="rounded-xl text-white/50 hover:text-white/80 hover:bg-white/[0.04] transition-all duration-200"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="gold"
              disabled={isLoading}
              className="rounded-xl px-6 shadow-lg shadow-gold/10 hover:shadow-gold/20 transition-all duration-200"
            >
              {isLoading ? "Salvando..." : "Salvar Lead"}
            </Button>
          </div>

          {/* Sessão 4: Linha do Tempo Unificada (Apenas Edição) */}
          {lead && (
            <div className="space-y-5 pt-8 mt-8 border-t border-white/[0.06]">
              <div className="flex items-center gap-3 pb-3 border-b border-transparent mb-2" style={{ borderImage: "linear-gradient(to right, rgba(212,175,55,0.2), transparent) 1" }}>
                <div className="p-1.5 rounded-lg bg-gold/10">
                  <History className="w-4 h-4 text-gold" />
                </div>
                <h3 className="text-base font-display font-medium text-white/90 tracking-wide">
                  Linha do Tempo de Interações
                </h3>
              </div>

              {(!lead.movimentacoes || lead.movimentacoes.length === 0) && (!lead.atividades || lead.atividades.length === 0) ? (
                <div className="text-center py-8">
                  <div className="inline-flex p-3 rounded-2xl bg-white/[0.02] border border-white/[0.04] mb-3">
                    <History className="w-5 h-5 text-white/20" />
                  </div>
                  <p className="text-sm text-white/30 italic">Nenhuma interação registrada ainda.</p>
                </div>
              ) : (
                <div className="relative border-l border-white/[0.06] ml-3 space-y-4">
                  {/* Mescla e ordena por data decrescente */}
                  {[
                    ...(lead.movimentacoes || []).map(m => ({ ...m, type: 'mov' as const, date: new Date(m.data_alteracao) })),
                    ...(lead.atividades || []).map(a => ({ ...a, type: 'ativ' as const, date: new Date(a.data_atividade) }))
                  ]
                  .sort((a, b) => b.date.getTime() - a.date.getTime())
                  .map((item, idx) => (
                    <div key={idx} className="relative pl-7">
                       <span className={cn(
                         "absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full ring-4 ring-[#0d0f14]",
                         item.type === 'mov' ? "bg-gold" : "bg-blue-500"
                       )} />

                       <div className="bg-white/[0.02] border border-white/[0.04] rounded-2xl p-4 hover:border-white/[0.08] transition-all duration-300">
                         <div className="flex justify-between items-start mb-3">
                           <div className="flex items-center gap-2">
                             <span className={cn(
                               "text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider",
                               item.type === 'mov' ? "bg-gold/10 text-gold" : "bg-blue-500/10 text-blue-400"
                             )}>
                               {item.type === 'mov' ? (item as any).acao : (item as any).tipo}
                             </span>
                             {item.type === 'ativ' && (item as any).status === 'Concluída' && (
                               <span className="text-[10px] bg-green-500/10 text-green-500 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider flex items-center gap-1">
                                 <CheckCircle2 className="w-3 h-3" />
                                 Concluído
                               </span>
                             )}
                           </div>
                           <span className="text-[11px] text-white/30 font-mono">
                             {format(item.date, "dd MMM yyyy 'às' HH:mm", { locale: ptBR })}
                           </span>
                         </div>

                         <div className="text-sm text-white/70">
                           {item.type === 'mov' ? (
                             (item as any).acao === 'Criação' ? (
                               <span>{(item as any).valor_novo}</span>
                             ) : (
                               <span>Alterou <b className="text-white/90">{(item as any).campo_alterado}</b> de <span className="text-white/30 line-through">{(item as any).valor_antigo === null ? "vazio" : (item as any).valor_antigo}</span> para <b className="text-gold">{(item as any).valor_novo}</b>.</span>
                             )
                           ) : (
                             <div className="flex items-start gap-3">
                                <div className="mt-0.5 p-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white/40">
                                   {(item as any).tipo === 'Ligação' && <Phone className="w-3.5 h-3.5" />}
                                   {(item as any).tipo === 'E-mail' && <Mail className="w-3.5 h-3.5" />}
                                   {(item as any).tipo === 'Reunião' && <CalendarClock className="w-3.5 h-3.5" />}
                                   {((item as any).tipo === 'WhatsApp' || (item as any).tipo === 'Outro') && <Clock className="w-3.5 h-3.5" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                   <p className="font-medium whitespace-pre-wrap text-white/80">{(item as any).descricao}</p>
                                   <p className="text-[11px] text-white/25 mt-1.5 lowercase">{(item as any).status} — agendado via atividades</p>
                                </div>
                             </div>
                           )}
                         </div>
                       </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
