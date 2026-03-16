import { useState, useEffect } from "react";
import { Lead, Contato, EtapaLead, FaseLead, OrigemLead } from "@/types/crm";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X, Building2, User, History, Phone, Mail, CalendarClock, Clock, CheckCircle2 } from "lucide-react";
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-background border-border text-foreground">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display font-semibold flex items-center gap-2">
            {lead ? "Editar Oportunidade" : "Nova Oportunidade"}
          </DialogTitle>
          <DialogDescription>
            Preencha os dados da empresa e das pessoas de contato envolvidas.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-8 mt-4">
          
          {/* Sessão 1: Informações da Empresa */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2 border-b border-border pb-2">
              <Building2 className="w-5 h-5 text-gold" />
              Dados da Empresa
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome_empresa">Nome da Empresa *</Label>
                <Input
                  id="nome_empresa"
                  name="nome_empresa"
                  value={formData.nome_empresa}
                  onChange={handleChange}
                  required
                  className="bg-secondary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cnpj">CNPJ / NIF</Label>
                <Input
                  id="cnpj"
                  name="cnpj"
                  value={formData.cnpj}
                  onChange={handleChange}
                  className="bg-secondary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="produto">Produto de Interesse *</Label>
                <Input
                  id="produto"
                  name="produto"
                  value={formData.produto}
                  onChange={handleChange}
                  required
                  placeholder="Ex: Consultoria BI Corporativa"
                  className="bg-secondary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="estado">Estado (UF / Região) *</Label>
                <Input
                  id="estado"
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  required
                  maxLength={2}
                  placeholder="Ex: SP, RJ"
                  className="bg-secondary uppercase"
                />
              </div>
            </div>
          </div>

          {/* Sessão 2: Pipeline / CRM */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium border-b border-border pb-2">
               Informações do Negócio
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="etapa">Etapa do Funil</Label>
                <select
                  id="etapa"
                  name="etapa"
                  value={formData.etapa}
                  onChange={handleChange}
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-secondary px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
                <Label htmlFor="fase">Temperatura da Fase</Label>
                <select
                  id="fase"
                  name="fase"
                  value={formData.fase}
                  onChange={handleChange}
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-secondary px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="Frio">Frio</option>
                  <option value="Morno">Morno</option>
                  <option value="Quente">Quente</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="origem">Origem do Lead</Label>
                <select
                  id="origem"
                  name="origem"
                  value={formData.origem}
                  onChange={handleChange}
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-secondary px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 p-4 bg-gold/5 border border-gold/20 rounded-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-[40px] pointer-events-none" />
                <div className="space-y-2 relative z-10">
                  <Label htmlFor="valor_implantacao">Valor Implantação (R$)</Label>
                  <Input
                    id="valor_implantacao"
                    name="valor_implantacao"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={formData.valor_implantacao || ""}
                    onChange={handleChange}
                    className="bg-background border-gold/20"
                  />
                </div>
                <div className="space-y-2 relative z-10">
                  <Label htmlFor="valor_mensal">Valor Mensal (R$)</Label>
                  <Input
                    id="valor_mensal"
                    name="valor_mensal"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={formData.valor_mensal || ""}
                    onChange={handleChange}
                    className="bg-background border-gold/20"
                  />
                </div>
                <div className="space-y-2 relative z-10">
                  <Label htmlFor="valor_unico">Valor Único (R$)</Label>
                  <Input
                    id="valor_unico"
                    name="valor_unico"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={formData.valor_unico || ""}
                    onChange={handleChange}
                    className="bg-background border-gold/20"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Sessão 3: Contatos Multiplos */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-2">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <User className="w-5 h-5 text-gold" />
                Contatos (Pessoas)
              </h3>
              <Button type="button" variant="outline" size="sm" onClick={handleAddContato} className="gap-2">
                <Plus className="w-4 h-4" />
                Adicionar Contato
              </Button>
            </div>
            
            {formData.contatos && formData.contatos.length === 0 ? (
               <p className="text-sm text-muted-foreground italic">Nenhum contato adicionado ainda.</p>
            ) : (
               <div className="space-y-4">
                 {formData.contatos?.map((contato, index) => (
                    <div key={index} className="glass-card p-4 rounded-xl border border-border/50 relative">
                       <Button
                         type="button"
                         variant="ghost"
                         size="icon"
                         className="absolute right-2 top-2 text-muted-foreground hover:text-destructive h-8 w-8"
                         onClick={() => handleRemoveContato(index)}
                       >
                         <X className="w-4 h-4" />
                       </Button>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                          <div className="space-y-1">
                            <Label className="text-xs">Nome do Contato *</Label>
                            <Input required value={contato.nome} onChange={(e) => handleContatoChange(index, "nome", e.target.value)} className="h-9 bg-secondary" />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs">Cargo principal</Label>
                            <Input value={contato.cargo} onChange={(e) => handleContatoChange(index, "cargo", e.target.value)} className="h-9 bg-secondary" />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs">E-mail corporativo</Label>
                            <Input type="email" value={contato.email} onChange={(e) => handleContatoChange(index, "email", e.target.value)} className="h-9 bg-secondary" />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs">Celular / WhatsApp</Label>
                            <Input 
                              value={contato.celular} 
                              onChange={(e) => handlePhoneChange(index, e.target.value)} 
                              placeholder="(11) 99999-9999"
                              maxLength={15}
                              className="h-9 bg-secondary" 
                            />
                          </div>
                       </div>
                    </div>
                 ))}
               </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-border mt-8">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" variant="gold" disabled={isLoading}>
              {isLoading ? "Salvando..." : "Salvar Lead"}
            </Button>
          </div>
          
          {/* Sessão 4: Linha do Tempo Unificada (Apenas Edição) */}
          {lead && (
            <div className="space-y-4 pt-8 mt-8 border-t border-border">
              <h3 className="text-lg font-medium flex items-center gap-2 mb-4">
                <History className="w-5 h-5 text-gold" />
                Linha do Tempo de Interações
              </h3>
              
              {(!lead.movimentacoes || lead.movimentacoes.length === 0) && (!lead.atividades || lead.atividades.length === 0) ? (
                <p className="text-sm text-muted-foreground italic">Nenhuma interação registrada ainda.</p>
              ) : (
                <div className="relative border-l border-border ml-3 space-y-6">
                  {/* Mescla e ordena por data decrescente */}
                  {[
                    ...(lead.movimentacoes || []).map(m => ({ ...m, type: 'mov' as const, date: new Date(m.data_alteracao) })),
                    ...(lead.atividades || []).map(a => ({ ...a, type: 'ativ' as const, date: new Date(a.data_atividade) }))
                  ]
                  .sort((a, b) => b.date.getTime() - a.date.getTime())
                  .map((item, idx) => (
                    <div key={idx} className="relative pl-6">
                       <span className={cn(
                         "absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full ring-4 ring-background",
                         item.type === 'mov' ? "bg-gold" : "bg-blue-500"
                       )} />
                       
                       <div className="glass-card p-4 rounded-xl border border-border/50">
                         <div className="flex justify-between items-start mb-2">
                           <div className="flex items-center gap-2">
                             <span className={cn(
                               "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider",
                               item.type === 'mov' ? "bg-gold/10 text-gold" : "bg-blue-500/10 text-blue-400"
                             )}>
                               {item.type === 'mov' ? (item as any).acao : (item as any).tipo}
                             </span>
                             {item.type === 'ativ' && (item as any).status === 'Concluída' && (
                               <span className="text-[10px] bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full font-bold uppercase">Concluído</span>
                             )}
                           </div>
                           <span className="text-xs text-muted-foreground">
                             {format(item.date, "dd MMM yyyy 'às' HH:mm", { locale: ptBR })}
                           </span>
                         </div>
                         
                         <div className="text-sm text-foreground">
                           {item.type === 'mov' ? (
                             (item as any).acao === 'Criação' ? (
                               <span>{(item as any).valor_novo}</span>
                             ) : (
                               <span>Alterou <b>{(item as any).campo_alterado}</b> de <span className="text-muted-foreground line-through">{(item as any).valor_antigo === null ? "vazio" : (item as any).valor_antigo}</span> para <b className="text-gold">{(item as any).valor_novo}</b>.</span>
                             )
                           ) : (
                             <div className="flex items-start gap-3">
                                <div className="mt-0.5 p-1.5 rounded-lg bg-secondary text-muted-foreground">
                                   {(item as any).tipo === 'Ligação' && <Phone className="w-3.5 h-3.5" />}
                                   {(item as any).tipo === 'E-mail' && <Mail className="w-3.5 h-3.5" />}
                                   {(item as any).tipo === 'Reunião' && <CalendarClock className="w-3.5 h-3.5" />}
                                   {((item as any).tipo === 'WhatsApp' || (item as any).tipo === 'Outro') && <Clock className="w-3.5 h-3.5" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                   <p className="font-medium whitespace-pre-wrap">{(item as any).descricao}</p>
                                   <p className="text-xs text-muted-foreground mt-1 lowercase">{(item as any).status} — agendado via atividades</p>
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
