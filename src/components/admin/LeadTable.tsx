import { Lead } from "@/types/crm";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { MoreHorizontal, Building2, MapPin, Briefcase } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface LeadTableProps {
  leads: Lead[];
  onEdit: (lead: Lead) => void;
  onDelete: (id: number) => void;
  onViewDetails: (lead: Lead) => void;
  onStageChange?: (lead: Lead, newStage: string) => void;
}

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

const ETAPAS = ["Prospecção", "Qualificação", "Apresentação", "Proposta", "Fechamento", "Perdido"];

export function LeadTable({ leads, onEdit, onDelete, onViewDetails, onStageChange }: LeadTableProps) {
  if (leads.length === 0) {
    return (
      <div className="bg-[#0d0f14] border border-white/[0.06] rounded-3xl p-16 text-center">
        <div className="relative w-20 h-20 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mx-auto mb-6">
          <div className="absolute inset-0 rounded-2xl bg-gold/5 blur-xl" />
          <Briefcase className="w-9 h-9 text-muted-foreground/70 relative z-10" />
        </div>
        <h3 className="text-xl font-display font-medium text-foreground mb-2">
          Nenhum lead encontrado
        </h3>
        <p className="text-muted-foreground/60 text-sm max-w-xs mx-auto">
          Comece adicionando seu primeiro lead ao CRM.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#0d0f14] border border-white/[0.06] rounded-3xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-white/[0.02] border-b border-white/[0.04]">
            <tr>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-medium text-muted-foreground/60">Empresa / Lead</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-medium text-muted-foreground/60">Produto</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-medium text-muted-foreground/60">Etapa</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-medium text-muted-foreground/60">Fase</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-medium text-muted-foreground/60">Origem</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-medium text-muted-foreground/60">Data</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-medium text-muted-foreground/60 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-white/[0.03] transition-colors duration-300">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center shrink-0">
                      <Building2 className="w-5 h-5 text-muted-foreground/70" />
                    </div>
                    <div
                      className="cursor-pointer group/name"
                      onClick={() => onViewDetails(lead)}
                    >
                      <div className="font-medium text-foreground group-hover/name:text-gold transition-colors duration-300">{lead.nome_empresa}</div>
                      <div className="text-xs text-muted-foreground/50 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3" /> {lead.estado} • {lead.cnpj}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-foreground/90">
                  {lead.produto}
                </td>
                <td className="px-6 py-4">
                  {onStageChange ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className={`px-3 py-1.5 rounded-lg text-xs font-medium border cursor-pointer hover:opacity-80 transition-opacity duration-300 focus:outline-none ${getEtapaColor(lead.etapa)}`}>
                          {lead.etapa}
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="bg-[#0d0f14] border-white/[0.08] min-w-[140px]">
                        <DropdownMenuLabel className="text-xs text-muted-foreground/60">Mover para etapa:</DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-white/[0.06]" />
                        {ETAPAS.map((etapa) => (
                           <DropdownMenuItem
                              key={etapa}
                              className={`cursor-pointer text-xs transition-colors duration-300 ${lead.etapa === etapa ? 'bg-white/[0.04] font-medium' : ''}`}
                              onClick={() => {
                                 if (lead.etapa !== etapa) {
                                    onStageChange(lead, etapa);
                                 }
                              }}
                           >
                             {etapa}
                           </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <span className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${getEtapaColor(lead.etapa)}`}>
                      {lead.etapa}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${getFaseColor(lead.fase)}`}>
                    {lead.fase}
                  </span>
                </td>
                <td className="px-6 py-4 text-muted-foreground/60 text-sm">
                  {lead.origem}
                </td>
                <td className="px-6 py-4 text-muted-foreground/60 text-sm">
                  {lead.created_at ? format(new Date(lead.created_at), "dd 'de' MMM, yyyy", { locale: ptBR }) : '-'}
                </td>
                <td className="px-6 py-4 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-white/[0.06] transition-colors duration-300">
                        <span className="sr-only">Abrir menu</span>
                        <MoreHorizontal className="h-4 w-4 text-muted-foreground/60" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-[#0d0f14] border-white/[0.08]">
                      <DropdownMenuLabel className="text-muted-foreground/60">Ações</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => onViewDetails(lead)} className="cursor-pointer transition-colors duration-300">
                        Ver detalhes completos
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-white/[0.06]" />
                      <DropdownMenuItem onClick={() => onEdit(lead)} className="cursor-pointer transition-colors duration-300">
                        Editar lead
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => lead.id && onDelete(lead.id)}
                        className="text-destructive focus:text-destructive cursor-pointer transition-colors duration-300"
                      >
                        Excluir lead
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
