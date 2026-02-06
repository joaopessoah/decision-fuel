import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Database, 
  BarChart3, 
  Zap, 
  Target,
  Building2,
  Scale,
  Users,
  Wallet,
  CheckCircle,
  TrendingUp,
  Shield,
  Lightbulb
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { FeatureCard } from "@/components/shared/FeatureCard";

const services = [
  {
    icon: Database,
    title: "Consultoria de Dados",
    description: "Estruturação de dados, regras de negócio e indicadores confiáveis para sua operação.",
  },
  {
    icon: BarChart3,
    title: "Business Intelligence",
    description: "Dashboards profissionais, executivos e focados em decisão estratégica.",
  },
  {
    icon: Zap,
    title: "Automação",
    description: "Eliminação de tarefas manuais e planilhas repetitivas que consomem tempo.",
  },
  {
    icon: Target,
    title: "Apoio à Decisão",
    description: "Informação clara e confiável para líderes decidirem com segurança.",
  },
];

const sectors = [
  { icon: Building2, name: "Saúde", href: "/solucoes#saude" },
  { icon: Scale, name: "Jurídico", href: "/solucoes#juridico" },
  { icon: Users, name: "Recursos Humanos", href: "/solucoes#rh" },
  { icon: Wallet, name: "Financeiro", href: "/solucoes#financeiro" },
];

const differentials = [
  { icon: TrendingUp, text: "Foco em resultados de negócio, não apenas tecnologia" },
  { icon: Shield, text: "Metodologia comprovada e processos estruturados" },
  { icon: Lightbulb, text: "Visão estratégica aliada à execução técnica" },
  { icon: CheckCircle, text: "Parceria contínua e evolução constante" },
];

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-dark" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/3 rounded-full blur-3xl" />
        
        <div className="container-tight relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block text-gold text-sm font-medium uppercase tracking-widest mb-6">
                Consultoria em Dados
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-foreground mb-6 leading-tight"
            >
              Dados que viram{" "}
              <span className="text-gradient">decisão.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-muted-foreground mb-4 font-light"
            >
              Consultoria em dados, Business Intelligence e automação para empresas que precisam decidir melhor.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg text-gold/80 italic mb-10 font-display"
            >
              "Menos planilha. Mais estratégia."
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button variant="hero" size="xl" asChild>
                <Link to="/contato">
                  Falar com um especialista
                  <ArrowRight className="ml-2" />
                </Link>
              </Button>
              <Button variant="heroOutline" size="xl" asChild>
                <Link to="/servicos">Conhecer nossas soluções</Link>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 bg-gold rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Problem Section */}
      <section className="section-padding bg-graphite">
        <div className="container-tight">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-gold text-sm font-medium uppercase tracking-widest mb-4">
                O Problema
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                Sua empresa ainda decide com base em planilhas?
              </h2>
              <div className="divider-gold mb-6" />
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2" />
                  <span>Dados espalhados em dezenas de planilhas desconectadas</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2" />
                  <span>Informações desatualizadas e sem confiabilidade</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2" />
                  <span>Horas perdidas em relatórios manuais</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2" />
                  <span>Decisões importantes tomadas no escuro</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="inline-block text-gold text-sm font-medium uppercase tracking-widest mb-4">
                A Solução
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                Transformamos dados em clareza estratégica
              </h2>
              <div className="divider-gold mb-6" />
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5" />
                  <span>Dados organizados, confiáveis e acessíveis</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5" />
                  <span>Indicadores alinhados às regras do negócio</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5" />
                  <span>Automação de processos repetitivos</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5" />
                  <span>Informação clara para quem decide</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding">
        <div className="container-tight">
          <SectionTitle
            label="Nossos Serviços"
            title="Como a +351 Data pode ajudar"
            description="Soluções completas em dados para empresas que buscam decisões mais seguras e estratégicas."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <FeatureCard
                key={service.title}
                icon={service.icon}
                title={service.title}
                description={service.description}
                index={index}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button variant="goldOutline" size="lg" asChild>
              <Link to="/servicos">
                Ver todos os serviços
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Sectors Section */}
      <section className="section-padding bg-graphite">
        <div className="container-tight">
          <SectionTitle
            label="Especialização"
            title="Soluções por setor"
            description="Atuamos com foco em segmentos que demandam visão estratégica de dados."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sectors.map((sector, index) => (
              <motion.div
                key={sector.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={sector.href}
                  className="group glass-card rounded-xl p-8 flex flex-col items-center text-center hover-lift block"
                >
                  <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                    <sector.icon className="w-8 h-8 text-gold" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {sector.name}
                  </h3>
                  <span className="text-gold text-sm font-medium group-hover:underline">
                    Saiba mais →
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentials Section */}
      <section className="section-padding">
        <div className="container-tight">
          <SectionTitle
            label="Por que a +351 Data"
            title="Nossos diferenciais"
          />

          <div className="grid md:grid-cols-2 gap-6">
            {differentials.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center gap-4 p-6 rounded-xl bg-secondary/50"
              >
                <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-gold" />
                </div>
                <p className="text-foreground font-medium">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-b from-background via-graphite to-background">
        <div className="container-tight">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-12 md:p-16 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-gold" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
              Pronto para transformar seus dados em{" "}
              <span className="text-gradient">decisões estratégicas</span>?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Entre em contato com um especialista da +351 Data e descubra como podemos ajudar sua empresa a decidir melhor.
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
