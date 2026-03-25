import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Atividade } from '../types/crm';
import { toast } from 'sonner';

const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/atividades`;

export function useAtividadesApi(leadId?: number) {
  const queryClient = useQueryClient();

  // Buscar atividades de um lead específico
  const { data: atividadesLead = [], isLoading: isLoadingLead } = useQuery<Atividade[]>({
    queryKey: ['atividades', 'lead', leadId],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/lead/${leadId}`);
      if (!response.ok) throw new Error('Erro ao buscar atividades do lead');
      return response.json();
    },
    enabled: !!leadId, // Só roda se tiver um leadId
  });

  // Buscar todas as atividades pendentes globais (para o dashboard principal de atividades)
  const { data: atividadesPendentes = [], isLoading: isLoadingPendentes } = useQuery<Atividade[]>({
    queryKey: ['atividades', 'pendentes'],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/pendentes`);
      if (!response.ok) throw new Error('Erro ao buscar atividades pendentes');
      return response.json();
    },
  });

  // Criar nova atividade
  const createAtividadeMutation = useMutation({
    mutationFn: async (novaAtividade: Partial<Atividade>) => {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novaAtividade),
      });
      if (!response.ok) throw new Error('Falha ao registrar atividade');
      return response.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['atividades'] });
      // Invalida o histórico de movimentações daquele lead para aparecer a recém criada (se houver visualização de lead ativa)
      queryClient.invalidateQueries({ queryKey: ['leads'] }); 
      toast.success('Atividade registrada com sucesso!');
    },
    onError: (err) => {
      toast.error('Erro ao salvar a atividade: ' + err.message);
    }
  });

  // Atualizar (Concluir/Editar) atividade
  const updateAtividadeMutation = useMutation({
    mutationFn: async (atualizada: Partial<Atividade>) => {
      if (!atualizada.id) throw new Error('ID da atividade não fornecido');
      const response = await fetch(`${API_URL}/${atualizada.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(atualizada),
      });
      if (!response.ok) throw new Error('Falha ao atualizar atividade');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['atividades'] });
      toast.success('Atividade atualizada!');
    },
    onError: (err) => {
      toast.error('Erro ao atualizar: ' + err.message);
    }
  });

  // Deletar atividade
  const deleteAtividadeMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Falha ao excluir atividade');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['atividades'] });
      toast.success('Atividade removida!');
    },
    onError: (err) => {
      toast.error('Erro ao remover: ' + err.message);
    }
  });

  return {
    atividadesLead,
    isLoadingLead,
    atividadesPendentes,
    isLoadingPendentes,
    createAtividade: createAtividadeMutation.mutateAsync,
    isCreating: createAtividadeMutation.isPending,
    updateAtividade: updateAtividadeMutation.mutateAsync,
    isUpdating: updateAtividadeMutation.isPending,
    deleteAtividade: deleteAtividadeMutation.mutateAsync,
    isDeleting: deleteAtividadeMutation.isPending,
  };
}
