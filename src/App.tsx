import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Sobre from "./pages/Sobre";
import Servicos from "./pages/Servicos";
import Solucoes from "./pages/Solucoes";
import Cases from "./pages/Cases";
import Metodologia from "./pages/Metodologia";
import Contato from "./pages/Contato";
import AdminLogin from "./pages/AdminLogin";
import LeadsDashboard from "./pages/admin/LeadsDashboard";
import AtividadesDashboard from "./pages/admin/AtividadesDashboard";
import LeadDetails from "./pages/admin/LeadDetails";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/solucoes" element={<Solucoes />} />
          <Route path="/cases" element={<Cases />} />
          <Route path="/metodologia" element={<Metodologia />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/acessoadm" element={<AdminLogin />} />
          <Route path="/admin/leads" element={<LeadsDashboard />} />
          <Route path="/admin/leads/lista" element={<LeadsDashboard />} />
          <Route path="/admin/leads/lista/:id" element={<LeadDetails />} />
          <Route path="/admin/atividades" element={<AtividadesDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
