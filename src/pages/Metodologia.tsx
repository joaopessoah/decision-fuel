import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Search, 
  Layers, 
  Hammer, 
  CheckCircle2, 
  RefreshCw,
  ArrowDown
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/shared/SectionTitle";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Diagnóstico",
    description: "Entendemos profundamente o seu negócio, seus desafios e objetivos. Mapeamos fontes de dados, processos existentes e necessidades de informação.",
    details: [
      "Reuniões de entendimento com stakeholders",
      "Mapeamento de fontes de dados",
      "Identificação de dores e oportunidades",
      "Definição de prioridades",
    ],
    duration: "1-2 semanas",
  },
  {
    number: "02",
    icon: Layers,
    title: "Estruturação",
    description: "Definimos a arquitetura da solução, regras de negócio, indicadores-chave e a estratégia de implementação.",
    details: [
      "Definição de regras de negócio",
      "Desenho de indicadores e métricas",
      "Arquitetura da solução",
      "Planejamento de entregas",
    ],
    duration: "1-2 semanas",
  },
  {
    number: "03",
    icon: Hammer,
    title: "Construção",
    description: "Desenvolvemos a solução com entregas incrementais, garantindo alinhamento constante com as expectativas do negócio.",
    details: [
      "Desenvolvimento iterativo",
      "Entregas parciais para validação",
      "Ajustes em tempo real",
      "Documentação completa",
    ],
    duration: "4-8 semanas",
  },
  {
    number: "04",
    icon: CheckCircle2,
    title: "Validação",
    description: "Validamos cada entrega com os usuários finais, garantindo que a solução atenda às necessidades do negócio.",
    details: [
      "Testes com usuários reais",
      "Validação de regras de negócio",
      "Ajustes finos",
      "Treinamento da equipe",
    ],
    duration: "1-2 semanas",
  },
  {
    number: "05",
    icon: RefreshCw,
    title: "Evolução Contínua",
    description: "Acompanhamos os resultados e evoluímos a solução conforme o negócio cresce e novas necessidades surgem.",
    details: [
      "Monitoramento de uso e resultados",
      "Identificação de melhorias",
      "Novas funcionalidades",
      "Suporte contínuo",
    ],
    duration: "Contínuo",
  },
];

const principles = [
  {
    title: "Parceria",
    description: "Trabalhamos lado a lado com sua equipe, como parte do time.",
  },
  {
    title: "Transparência",
    description: "Comunicação clara sobre progresso, desafios e decisões.",
  },
  {
    title: "Previsibilidade",
    description: "Cronogramas realistas e entregas no prazo combinado.",
  },
  {
    title: "Foco em Valor",
    description: "Cada entrega gera resultado tangível para o negócio.",
  },
];

export default function Metodologia() {
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
              Metodologia
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
              Como{" "}
              <span className="text-gradient">trabalhamos</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Método estruturado, entregas previsíveis e parceria contínua. Conheça nossa forma de trabalhar.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="section-padding">
        <div className="container-tight">
          <SectionTitle
            label="Nosso Processo"
            title="5 etapas para resultados"
            description="Um método comprovado que garante entregas de valor em cada fase do projeto."
          />

          <div className="relative">
            {/* Connection Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border hidden lg:block" />

            <div className="space-y-12 lg:space-y-0">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative lg:grid lg:grid-cols-2 lg:gap-16 ${
                    index % 2 === 0 ? "" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div
                    className={`glass-card rounded-2xl p-8 relative ${
                      index % 2 === 0 ? "lg:text-right" : "lg:order-2"
                    }`}
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-gold rounded-t-2xl" />
                    <div
                      className={`flex items-center gap-4 mb-4 ${
                        index % 2 === 0 ? "lg:flex-row-reverse" : ""
                      }`}
                    >
                      <span className="text-4xl font-display font-bold text-gold/30">
                        {step.number}
                      </span>
                      <h3 className="text-2xl font-display font-bold text-foreground">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground mb-6">{step.description}</p>
                    <ul
                      className={`space-y-2 mb-4 ${
                        index % 2 === 0 ? "lg:text-right" : ""
                      }`}
                    >
                      {step.details.map((detail) => (
                        <li
                          key={detail}
                          className={`flex items-center gap-2 text-sm text-muted-foreground ${
                            index % 2 === 0 ? "lg:flex-row-reverse" : ""
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                    <div
                      className={`inline-flex items-center gap-2 text-sm text-gold ${
                        index % 2 === 0 ? "" : ""
                      }`}
                    >
                      <span className="font-medium">Duração típica:</span>
                      {step.duration}
                    </div>
                  </div>

                  {/* Icon Node */}
                  <div
                    className={`hidden lg:flex items-center justify-center ${
                      index % 2 === 0 ? "lg:order-2" : ""
                    }`}
                  >
                    <div className="w-20 h-20 rounded-full bg-gold/10 border-4 border-background flex items-center justify-center relative z-10">
                      <step.icon className="w-8 h-8 text-gold" />
                    </div>
                  </div>

                  {/* Arrow */}
                  {index < steps.length - 1 && (
                    <div className="lg:hidden flex justify-center py-4">
                      <ArrowDown className="w-6 h-6 text-gold/40" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="section-padding bg-graphite">
        <div className="container-tight">
          <SectionTitle
            label="Nossos Princípios"
            title="O que nos guia em cada projeto"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card rounded-xl p-8 text-center hover-lift"
              >
                <h3 className="text-xl font-semibold text-gold mb-3">
                  {principle.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {principle.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-tight">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-12 md:p-16 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-gold" />
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
              Pronto para começar sua{" "}
              <span className="text-gradient">jornada de dados</span>?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              O primeiro passo é uma conversa. Conte sobre seus desafios e objetivos.
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link to="/contato">
                Agendar conversa
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
