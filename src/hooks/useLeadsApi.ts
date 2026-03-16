import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Lead } from '../types/crm';
import { toast } from 'sonner';

const API_URL = 'http://localhost:3000/api/leads'; // Em produção isso precisará apontar para a origin correta

export function useLeadsApi() {
  const queryClient = useQueryClient();

  // Buscar todos os leads
  const { data: leads = [], isLoading, isError, error } = useQuery<Lead[]>({
    queryKey: ['leads'],
    queryFn: async () => {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Erro ao buscar leads da API');
      }
      return response.json();
    },
  });

  // Criar novo lead
  const createLeadMutation = useMutation({
    mutationFn: async (newLead: Lead) => {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLead),
      });
      if (!response.ok) throw new Error('Falha ao criar lead');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      toast.success('Lead adicionado com sucesso!');
    },
    onError: (err) => {
      toast.error('Erro ao salvar o lead: ' + err.message);
    }
  });

  // Atualizar lead existente
  const updateLeadMutation = useMutation({
    mutationFn: async (updatedLead: Lead) => {
      if (!updatedLead.id) throw new Error('ID do Lead não fornecido para atualização');
      const response = await fetch(`${API_URL}/${updatedLead.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedLead),
      });
      if (!response.ok) throw new Error('Falha ao atualizar lead');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      toast.success('Lead atualizado!');
    },
    onError: (err) => {
      toast.error('Erro ao atualizar: ' + err.message);
    }
  });

  // Deletar lead
  const deleteLeadMutation = useMutation({
    mutationFn: async (leadId: number) => {
      const response = await fetch(`${API_URL}/${leadId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Falha ao excluir lead');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      toast.success('Lead removido com sucesso!');
    },
    onError: (err) => {
      toast.error('Erro ao remover lead: ' + err.message);
    }
  });

  // Buscar um lead específico por ID
  const getLeadById = async (id: number): Promise<Lead> => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error('Erro ao buscar detalhes do lead');
    }
    return response.json();
  };

  return {
    leads,
    isLoading,
    isError,
    error,
    createLead: createLeadMutation.mutateAsync,
    isCreating: createLeadMutation.isPending,
    updateLead: updateLeadMutation.mutateAsync,
    isUpdating: updateLeadMutation.isPending,
    deleteLead: deleteLeadMutation.mutateAsync,
    isDeleting: deleteLeadMutation.isPending,
    getLeadById,
  };
}
