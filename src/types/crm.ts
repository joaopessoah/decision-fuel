export interface Contato {
  id?: number;
  lead_id?: number;
  nome: string;
  email: string;
  celular: string;
  cargo: string;
}

export interface Movimentacao {
  id?: number;
  lead_id: number;
  acao: string;
  campo_alterado: string;
  valor_antigo: string;
  valor_novo: string;
  data_alteracao: string;
}

export interface Atividade {
  id?: number;
  lead_id: number;
  tipo: 'Ligação' | 'E-mail' | 'Reunião' | 'WhatsApp' | 'Outro';
  descricao: string;
  data_atividade: string;
  status: 'Pendente' | 'Concluída' | 'Cancelada';
  nome_empresa?: string; // Trazido pelo JOIN (opcional)
  produto?: string; // Trazido pelo JOIN (opcional)
}

export interface Lead {
  id?: number;
  produto: string;
  etapa: 'Prospecção' | 'Qualificação' | 'Apresentação' | 'Proposta' | 'Fechamento' | 'Perdido';
  fase: 'Quente' | 'Morno' | 'Frio';
  origem: 'Inbound' | 'Outbound' | 'Indicação' | 'Parceria' | 'Outro';
  nome_empresa: string;
  estado: string;
  cnpj: string;
  valor_implantacao?: number | string | null;
  valor_mensal?: number | string | null;
  valor_unico?: number | string | null;
  contatos?: Contato[];
  movimentacoes?: Movimentacao[];
  atividades?: Atividade[];
  created_at?: string;
  updated_at?: string;
}

export type EtapaLead = Lead['etapa'];
export type FaseLead = Lead['fase'];
export type OrigemLead = Lead['origem'];
