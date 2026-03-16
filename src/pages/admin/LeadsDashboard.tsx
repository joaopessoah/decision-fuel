import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { useLeadsApi } from "@/hooks/useLeadsApi";
import { Button } from "@/components/ui/button";
import { DashboardKpis } from "@/components/admin/DashboardKpis";
import { LeadTable } from "@/components/admin/LeadTable";
import { LeadForm } from "@/components/admin/LeadForm";
import { Lead } from "@/types/crm";
import { Plus } from "lucide-react";

export default function LeadsDashboard() {
  const { leads, isLoading, isError, deleteLead, createLead, updateLead, isCreating, isUpdating } = useLeadsApi();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const navigate = useNavigate();

  const handleCreate = () => {
    setSelectedLead(null);
    setIsFormOpen(true);
  };

  const handleEdit = (lead: Lead) => {
    setSelectedLead(lead);
    setIsFormOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir esse lead definitivamente?")) {
       deleteLead(id);
    }
  };

  const handleView = (lead: Lead) => {
    if (lead.id) {
       navigate(`/admin/leads/lista/${lead.id}`);
    }
  };

  const handleStageChange = async (lead: Lead, newStage: string) => {
    if (lead.id) {
       try {
         // Define a nova etapa mantendo os outros dados. Se mudar para Proposta/Fechamento, a pessoa pode preencher valores depois editando.
         await updateLead({ ...lead, etapa: newStage as Lead['etapa'] });
       } catch (error) {
         console.error("Erro ao mudar etapa:", error);
       }
    }
  };

  const handleSubmitLead = async (leadData: Lead) => {
    try {
      if (selectedLead?.id) {
        await updateLead({ ...leadData, id: selectedLead.id });
      } else {
        await createLead(leadData);
      }
      setIsFormOpen(false);
    } catch (error) {
      console.error("Erro ao salvar lead:", error);
    }
  };

  return (
    <AdminLayout title="Gestão de Leads">
      <div className="flex justify-between items-center mb-8">
        <div>
           <h2 className="text-3xl font-display font-semibold text-foreground">
             Pipeline Comercial
           </h2>
           <p className="text-muted-foreground mt-1">
             Acompanhe e gerencie as oportunidades em tempo real.
           </p>
        </div>
        <Button variant="gold" className="gap-2 hover-lift" onClick={handleCreate}>
          <Plus className="w-4 h-4" />
          Novo Lead
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-20">
           <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
           <p className="text-muted-foreground animate-pulse">Carregando painel de leads...</p>
        </div>
      ) : isError ? (
        <div className="glass-card text-center py-20 text-destructive text-sm rounded-2xl border-destructive/20 bg-destructive/5">
           <b>Erro de Conexão:</b> Não foi possível conectar ao banco de dados MySQL.<br/>
           Certifique-se de que o backend "npm run start:server" está rodando em paralelo.
        </div>
      ) : (
        <>
          <DashboardKpis leads={leads} />
          
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-display font-medium text-foreground">
               Leads Recentes
            </h3>
            {/* Futuro Input de Busca aqui */}
          </div>
          
          <LeadTable 
            leads={leads} 
            onEdit={handleEdit} 
            onDelete={handleDelete} 
            onViewDetails={handleView}
            onStageChange={handleStageChange}
          />
        </>
      )}

      <LeadForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        lead={selectedLead}
        onSubmit={handleSubmitLead}
        isLoading={isCreating || isUpdating}
      />
    </AdminLayout>
  );
}
