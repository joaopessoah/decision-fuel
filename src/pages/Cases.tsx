import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Building2, 
  Scale, 
  Users, 
  Wallet,
  Quote,
  TrendingUp,
  Clock,
  CheckCircle
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/shared/SectionTitle";

const cases = [
  {
    id: "saude",
    icon: Building2,
    sector: "Saúde",
    title: "Hospital Regional reorganiza indicadores assistenciais",
    context: "Um hospital de médio porte enfrentava dificuldades para consolidar informações de diferentes sistemas. Gestores perdiam horas montando relatórios manualmente e decisões eram tomadas com dados desatualizados.",
    problem: "Dados espalhados em múltiplos sistemas, relatórios manuais demorados e falta de visibilidade em tempo real dos indicadores de ocupação, custos e produtividade.",
    solution: "Estruturação de uma base de dados unificada, criação de dashboards executivos com indicadores de ocupação, custos assistenciais e produtividade médica, além de automação de relatórios mensais.",
    results: [
      "Redução de 70% no tempo de geração de relatórios",
      "Visibilidade em tempo real da ocupação de leitos",
      "Identificação de 15% de economia em custos assistenciais",
      "Decisões baseadas em dados atualizados",
    ],
    quote: "Agora sabemos exatamente onde estamos e para onde podemos ir.",
  },
  {
    id: "juridico",
    icon: Scale,
    sector: "Jurídico",
    title: "Departamento jurídico ganha visão estratégica do contencioso",
    context: "O departamento jurídico de uma grande empresa industrial gerenciava mais de 2.000 processos ativos com controles em planilhas fragmentadas, sem visão consolidada de riscos e provisões.",
    problem: "Falta de visibilidade do contencioso, dificuldade em calcular provisões com precisão e ausência de indicadores para tomada de decisão estratégica.",
    solution: "Desenvolvimento de painel de gestão de processos com classificação de riscos, cálculo automatizado de provisões e dashboards de acompanhamento por área, tipo de ação e valor.",
    results: [
      "Visão consolidada de todo o contencioso em um único lugar",
      "Provisões calculadas com metodologia consistente",
      "Redução de 40% no tempo de preparação para auditorias",
      "Identificação de padrões em ações trabalhistas",
    ],
    quote: "Pela primeira vez temos uma visão estratégica do nosso jurídico.",
  },
  {
    id: "rh",
    icon: Users,
    sector: "Recursos Humanos",
    title: "RH transforma dados de pessoas em estratégia",
    context: "Uma empresa de tecnologia com 500 colaboradores enfrentava alto turnover e não conseguia identificar padrões. Decisões de RH eram tomadas com base em percepções, não em dados.",
    problem: "Turnover elevado sem identificação de causas, falta de indicadores de absenteísmo e produtividade, e ausência de dados para planejamento de headcount.",
    solution: "Criação de dashboards de indicadores de pessoas com análise de turnover por área, tempo de casa, faixa salarial e motivo de desligamento. Implementação de alertas para variações críticas.",
    results: [
      "Identificação das principais causas de turnover",
      "Redução de 25% no turnover em 6 meses",
      "Planejamento de headcount baseado em dados",
      "Economia de R$ 200 mil em custos de contratação",
    ],
    quote: "Agora RH é parceiro estratégico, não apenas operacional.",
  },
  {
    id: "financeiro",
    icon: Wallet,
    sector: "Financeiro",
    title: "Gestão financeira ganha previsibilidade",
    context: "Uma empresa de serviços com faturamento de R$ 50 milhões/ano tinha dificuldades para projetar fluxo de caixa e identificar tendências de inadimplência antes que virassem problema.",
    problem: "Fluxo de caixa projetado manualmente com baixa precisão, inadimplência identificada tardiamente e falta de visibilidade da rentabilidade por cliente/projeto.",
    solution: "Desenvolvimento de painel financeiro com fluxo de caixa realizado vs projetado, análise de inadimplência por perfil de cliente e dashboard de rentabilidade por projeto.",
    results: [
      "Projeção de fluxo de caixa com 95% de precisão",
      "Inadimplência identificada 30 dias antes",
      "Visibilidade de rentabilidade por cliente",
      "Decisões de crédito baseadas em dados",
    ],
    quote: "Acabaram as surpresas no fim do mês.",
  },
];

export default function Cases() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-dark relative overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        
        <div className="container-tight relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="inline-block text-gold text-sm font-medium uppercase tracking-widest mb-6">
              Cases de Sucesso
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
              Resultados que{" "}
              <span className="text-gradient">comprovam valor</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Conheça casos representativos de como a +351 Data transforma dados em decisões estratégicas.
            </p>
            <p className="text-sm text-muted-foreground/60 mt-4 italic">
              * Casos ilustrativos baseados em cenários reais aplicados pela +351 Data.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cases */}
      <section className="section-padding">
        <div className="container-tight">
          <div className="space-y-24">
            {cases.map((caseItem, index) => (
              <motion.div
                key={caseItem.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="glass-card rounded-2xl p-8 md:p-12 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-gold" />
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center">
                    <caseItem.icon className="w-7 h-7 text-gold" />
                  </div>
                  <div>
                    <span className="text-gold text-sm font-medium uppercase tracking-widest">
                      {caseItem.sector}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                      {caseItem.title}
                    </h2>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                  {/* Left Column */}
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-sm text-gold">1</span>
                        Contexto
                      </h3>
                      <p className="text-muted-foreground pl-10">{caseItem.context}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-sm text-gold">2</span>
                        Problema
                      </h3>
                      <p className="text-muted-foreground pl-10">{caseItem.problem}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-sm text-gold">3</span>
                        Solução +351 Data
                      </h3>
                      <p className="text-muted-foreground pl-10">{caseItem.solution}</p>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-gold" />
                        Resultados Alcançados
                      </h3>
                      <ul className="space-y-3">
                        {caseItem.results.map((result) => (
                          <li key={result} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                            <span className="text-foreground">{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-6 rounded-xl bg-gold/5 border border-gold/20">
                      <Quote className="w-8 h-8 text-gold/40 mb-4" />
                      <p className="text-xl font-display text-foreground italic mb-4">
                        "{caseItem.quote}"
                      </p>
                      <p className="text-sm text-muted-foreground">
                        — Gestor, setor de {caseItem.sector}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-graphite">
        <div className="container-tight">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
              Seu caso pode ser o{" "}
              <span className="text-gradient">próximo</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Conte para nós sobre seus desafios com dados. A +351 Data está pronta para transformar sua realidade.
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link to="/contato">
                Falar com um especialista
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
