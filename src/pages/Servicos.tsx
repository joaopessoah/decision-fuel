import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Database, 
  BarChart3, 
  Zap, 
  Target,
  CheckCircle,
  FileSpreadsheet,
  Settings,
  TrendingUp,
  Users
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/shared/SectionTitle";

const services = [
  {
    icon: Database,
    title: "Consultoria de Dados",
    description: "Estruturação completa do seu ambiente de dados",
    details: [
      "Mapeamento e organização de fontes de dados",
      "Definição de regras de negócio e indicadores",
      "Governança e qualidade de dados",
      "Documentação de processos e padrões",
    ],
    outcome: "Dados confiáveis e organizados para suportar decisões estratégicas.",
  },
  {
    icon: BarChart3,
    title: "Business Intelligence",
    description: "Dashboards profissionais focados em decisão",
    details: [
      "Painéis executivos e operacionais",
      "Relatórios automatizados",
      "Análises de tendências e projeções",
      "Visualizações claras e objetivas",
    ],
    outcome: "Visão clara do negócio em tempo real, na palma da mão.",
  },
  {
    icon: Zap,
    title: "Automação de Processos",
    description: "Eliminação de tarefas manuais e repetitivas",
    details: [
      "Integração de sistemas e bases de dados",
      "Automatização de relatórios",
      "Alertas e notificações inteligentes",
      "Workflows automatizados",
    ],
    outcome: "Mais tempo para o estratégico, menos tempo com planilhas.",
  },
  {
    icon: Target,
    title: "Apoio à Tomada de Decisão",
    description: "Informação estratégica para líderes",
    details: [
      "Definição de KPIs estratégicos",
      "Análises de cenários",
      "Simulações e projeções",
      "Suporte consultivo contínuo",
    ],
    outcome: "Decisões baseadas em dados, não em achismos.",
  },
];

const additionalServices = [
  {
    icon: FileSpreadsheet,
    title: "Migração de Planilhas",
    description: "Transformamos planilhas complexas em soluções robustas e escaláveis.",
  },
  {
    icon: Settings,
    title: "Integração de Sistemas",
    description: "Conectamos suas ferramentas para um fluxo de dados unificado.",
  },
  {
    icon: TrendingUp,
    title: "Análise Preditiva",
    description: "Antecipe tendências e prepare-se para o futuro com análises avançadas.",
  },
  {
    icon: Users,
    title: "Treinamento",
    description: "Capacitamos sua equipe para usar as ferramentas com autonomia.",
  },
];

export default function Servicos() {
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
              Nossos Serviços
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
              Soluções completas em{" "}
              <span className="text-gradient">dados</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Da estruturação à visualização, oferecemos tudo que sua empresa precisa para transformar dados em decisões estratégicas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Services */}
      <section className="section-padding">
        <div className="container-tight">
          <div className="space-y-16">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-lg bg-gold/10 flex items-center justify-center">
                      <service.icon className="w-7 h-7 text-gold" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                      {service.title}
                    </h2>
                  </div>
                  <p className="text-lg text-muted-foreground mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-3 mb-6">
                    {service.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{detail}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="p-4 rounded-lg bg-gold/5 border border-gold/20">
                    <p className="text-foreground font-medium">
                      <span className="text-gold">Resultado:</span> {service.outcome}
                    </p>
                  </div>
                </div>
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="glass-card rounded-2xl p-8 md:p-12 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-gold" />
                    <div className="w-24 h-24 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
                      <service.icon className="w-12 h-12 text-gold" />
                    </div>
                    <p className="text-center text-muted-foreground italic">
                      "{service.outcome}"
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="section-padding bg-graphite">
        <div className="container-tight">
          <SectionTitle
            label="Serviços Complementares"
            title="Mais formas de ajudar"
            description="Oferecemos serviços adicionais para complementar sua jornada de dados."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card rounded-xl p-6 hover-lift"
              >
                <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {service.description}
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
              Qual serviço é ideal para sua{" "}
              <span className="text-gradient">empresa</span>?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Fale com um especialista da +351 Data. Entendemos seu cenário e indicamos a melhor solução.
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
