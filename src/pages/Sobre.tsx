import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Target, Eye, Compass, Users, Award, Handshake } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/shared/SectionTitle";

const values = [
  {
    icon: Target,
    title: "Foco em Resultados",
    description: "Entregamos valor real para o negócio, não apenas dashboards bonitos.",
  },
  {
    icon: Handshake,
    title: "Parceria",
    description: "Atuamos lado a lado com nossos clientes, como parte da equipe.",
  },
  {
    icon: Award,
    title: "Excelência",
    description: "Compromisso com qualidade técnica e entrega impecável.",
  },
  {
    icon: Eye,
    title: "Clareza",
    description: "Comunicação direta, sem jargões técnicos desnecessários.",
  },
];

export default function Sobre() {
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
              Sobre Nós
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
              Parceiros estratégicos em{" "}
              <span className="text-gradient">dados</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              A +351 Data nasceu para ajudar empresas a sair do caos das planilhas e transformar dados em informação clara, confiável e estratégica para tomada de decisão.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding">
        <div className="container-tight">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-gold text-sm font-medium uppercase tracking-widest mb-4">
                Nossa Missão
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                Mais que tecnologia, visão de negócio
              </h2>
              <div className="divider-gold mb-6" />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Não somos apenas uma empresa de tecnologia. Somos consultores de negócio que dominam dados. Entendemos que por trás de cada número existe uma decisão a ser tomada.
                </p>
                <p>
                  Nossa atuação vai além de construir dashboards ou automatizar processos. Trabalhamos para entender profundamente o seu negócio e entregar soluções que realmente fazem diferença.
                </p>
                <p>
                  Acreditamos que dados bem organizados e apresentados de forma clara são a base para decisões estratégicas seguras.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card rounded-2xl p-8 md:p-12"
            >
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                    <Compass className="w-8 h-8 text-gold" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Visão</h3>
                  <p className="text-sm text-muted-foreground">
                    Ser referência em consultoria de dados para empresas que valorizam decisões estratégicas.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-gold" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Propósito</h3>
                  <p className="text-sm text-muted-foreground">
                    Transformar a forma como empresas usam dados para tomar decisões.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-graphite">
        <div className="container-tight">
          <SectionTitle
            label="Nossos Valores"
            title="O que nos guia"
            description="Princípios que orientam cada projeto e relacionamento."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card rounded-xl p-8 text-center hover-lift"
              >
                <div className="w-14 h-14 rounded-lg bg-gold/10 flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-7 h-7 text-gold" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="section-padding">
        <div className="container-tight">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block text-gold text-sm font-medium uppercase tracking-widest mb-4">
                Nossa Abordagem
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                Consultoria sob medida, não soluções de prateleira
              </h2>
              <div className="divider-gold mx-auto mb-6" />
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Cada empresa tem suas particularidades, desafios e objetivos únicos. Por isso, não trabalhamos com pacotes prontos. Desenvolvemos soluções personalizadas que se encaixam perfeitamente na realidade do seu negócio.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Nosso foco está em entregar valor real: informação clara para quem decide, não excesso de gráficos e relatórios que ninguém consulta.
              </p>
              <Button variant="gold" size="lg" asChild>
                <Link to="/metodologia">
                  Conheça nossa metodologia
                  <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </motion.div>
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
              Vamos conversar sobre o seu{" "}
              <span className="text-gradient">projeto</span>?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Conte para nós sobre seus desafios com dados. A +351 Data está pronta para ajudar.
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
