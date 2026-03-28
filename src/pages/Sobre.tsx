import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";
import {
  ArrowRight,
  Target,
  Eye,
  Compass,
  Award,
  Handshake,
  Sparkles,
  Database,
  BarChart3,
  Shield,
  Zap,
  CheckCircle,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

const values = [
  {
    icon: Target,
    title: "Foco em Resultados",
    description:
      "Entregamos valor real para o negócio, não apenas dashboards bonitos. Cada projeto é medido pelo impacto na sua operação.",
    color: "gold",
  },
  {
    icon: Handshake,
    title: "Parceria",
    description:
      "Atuamos lado a lado com nossos clientes, como parte da equipe. Seu desafio é o nosso desafio.",
    color: "sky",
  },
  {
    icon: Award,
    title: "Excelência",
    description:
      "Compromisso com qualidade técnica e entrega impecável. Zero atalhos, zero gambiarras.",
    color: "emerald",
  },
  {
    icon: Eye,
    title: "Clareza",
    description:
      "Comunicação direta, sem jargões técnicos desnecessários. Você entende tudo o que fazemos e porquê.",
    color: "amber",
  },
];

const journey = [
  {
    phase: "01",
    title: "O problema",
    description:
      "Empresas tomam decisões no escuro. Dados em planilhas espalhadas, duplicados, desatualizados. Relatórios que levam dias. Gestores sem confiança nos números.",
    icon: Database,
    color: "red",
  },
  {
    phase: "02",
    title: "A visão",
    description:
      "E se cada líder tivesse informação confiável em tempo real? E se a decisão certa estivesse a um clique de distância? Essa é a visão que nos move.",
    icon: Compass,
    color: "sky",
  },
  {
    phase: "03",
    title: "A solução",
    description:
      "A +351 Data nasceu para fechar essa lacuna. Combinamos visão de negócio com excelência técnica para transformar caos em clareza, de verdade.",
    icon: Sparkles,
    color: "gold",
  },
];

const stats = [
  { value: "50+", label: "Projetos entregues" },
  { value: "20M+", label: "Linhas processadas" },
  { value: "100%", label: "Clientes satisfeitos" },
  { value: "4", label: "Setores de atuação" },
];

const approach = [
  {
    icon: Eye,
    title: "Diagnóstico profundo",
    desc: "Entendemos o negócio antes de tocar nos dados.",
  },
  {
    icon: Database,
    title: "Dados como ativo",
    desc: "Tratamos seus dados como o ativo estratégico que são.",
  },
  {
    icon: BarChart3,
    title: "Decisão no centro",
    desc: "Cada dashboard é desenhado para uma decisão específica.",
  },
  {
    icon: Shield,
    title: "Segurança primeiro",
    desc: "Governança, permissões e auditoria desde o dia um.",
  },
  {
    icon: Zap,
    title: "Velocidade real",
    desc: "Entregas incrementais. Valor desde a primeira semana.",
  },
  {
    icon: Handshake,
    title: "Parceria contínua",
    desc: "Não desaparecemos após a entrega. Evoluímos junto.",
  },
];

export default function Sobre() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <Layout>
      {/* ═══════════════ HERO — Immersive ═══════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-[85vh] flex items-center overflow-hidden"
      >
        {/* Layered background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#08090f] via-background to-[#0d0f1a]" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold/[0.04] rounded-full blur-[200px] -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-sky-500/[0.03] rounded-full blur-[150px] translate-y-1/4" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="container-tight relative z-10"
        >
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-flex items-center gap-2 text-gold/90 text-xs font-semibold uppercase tracking-[0.2em] mb-8 px-4 py-2 rounded-full border border-gold/15 bg-gold/[0.04]">
                <Sparkles className="w-3.5 h-3.5" />
                Sobre a +351 Data
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl font-display font-bold text-foreground mb-8 leading-[1.05] tracking-tight"
            >
              Transformamos o caos em{" "}
              <span className="text-gradient">clareza</span>
              <br />
              para quem{" "}
              <span className="text-gradient">decide.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-xl md:text-2xl text-muted-foreground/80 leading-relaxed max-w-2xl mb-10"
            >
              Não somos apenas uma empresa de tecnologia. Somos consultores de
              negócio que dominam dados, e entendem que por trás de cada
              número existe uma decisão a ser tomada.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button variant="hero" size="xl" asChild>
                <Link to="/contato">
                  Falar com especialista
                  <ArrowRight className="ml-2" />
                </Link>
              </Button>
              <Button variant="heroOutline" size="xl" asChild>
                <Link to="/metodologia">Ver metodologia</Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/20 flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 bg-gold/80 rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* ═══════════════ STATS BAR ═══════════════ */}
      <section className="py-14 border-y border-border/30 bg-graphite">
        <div className="container-tight">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {stats.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-1 font-display tabular-nums">
                  {item.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ JOURNEY — Storytelling ═══════════════ */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/[0.02] rounded-full blur-[150px] pointer-events-none" />

        <div className="container-tight relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block text-gold text-sm font-medium uppercase tracking-widest mb-4">
              Nossa História
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
              Por que existimos
            </h2>
            <div className="divider-gold mx-auto" />
          </motion.div>

          <div className="space-y-0 max-w-4xl mx-auto">
            {journey.map((step, i) => {
              const colorClasses: Record<string, { bg: string; text: string; glow: string; border: string }> = {
                red: { bg: "from-red-500/15 to-red-500/5", text: "text-red-400", glow: "bg-red-500/[0.06]", border: "border-red-500/15" },
                sky: { bg: "from-sky-400/15 to-sky-400/5", text: "text-sky-400", glow: "bg-sky-400/[0.06]", border: "border-sky-400/15" },
                gold: { bg: "from-gold/15 to-gold/5", text: "text-gold", glow: "bg-gold/[0.06]", border: "border-gold/15" },
              };
              const c = colorClasses[step.color];

              return (
                <div key={i} className="relative flex gap-6 md:gap-10">
                  {/* Timeline */}
                  <div className="flex flex-col items-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 + i * 0.2, type: "spring" }}
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${c.bg} border ${c.border} flex items-center justify-center flex-shrink-0 z-10 shadow-lg`}
                    >
                      <step.icon className={`w-7 h-7 ${c.text}`} />
                    </motion.div>
                    {i < journey.length - 1 && (
                      <motion.div
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 + i * 0.2 }}
                        className="w-[2px] flex-1 bg-gradient-to-b from-border/50 to-border/10 origin-top my-2"
                      />
                    )}
                  </div>

                  {/* Content */}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.2 }}
                    className="pb-16 flex-1"
                  >
                    <div className="relative bg-[#0d0f14] border border-white/[0.06] rounded-3xl p-8 md:p-10 overflow-hidden group hover:border-white/[0.1] transition-all duration-700">
                      <div className={`absolute -top-20 -right-20 w-40 h-40 ${c.glow} rounded-full blur-[60px] pointer-events-none`} />

                      <span className={`font-mono text-xs font-bold tracking-widest ${c.text} opacity-60`}>
                        {step.phase}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mt-2 mb-4">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════ MISSION — Split ═══════════════ */}
      <section className="section-padding bg-graphite relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)`, backgroundSize: "32px 32px" }} />

        <div className="container-tight relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-block text-gold text-sm font-medium uppercase tracking-widest mb-6">
                Visão & Propósito
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-8 leading-tight">
                Mais que tecnologia,{" "}
                <span className="text-gradient">visão de negócio</span>
              </h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed text-lg">
                <p>
                  Não trabalhamos com pacotes prontos. Cada empresa tem suas
                  particularidades, desafios e objetivos únicos.
                </p>
                <p>
                  Nosso foco está em entregar valor real: informação clara para
                  quem decide, não excesso de gráficos e relatórios que
                  ninguém consulta.
                </p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 gap-5">
              {[
                {
                  icon: Compass,
                  title: "Visão",
                  text: "Ser referência em consultoria de dados para empresas que valorizam decisões estratégicas.",
                  color: "sky",
                },
                {
                  icon: Target,
                  title: "Propósito",
                  text: "Transformar a forma como empresas usam dados para tomar decisões, com clareza, segurança e velocidade.",
                  color: "gold",
                },
              ].map((item, i) => {
                const colorMap: Record<string, string> = {
                  sky: "from-sky-400/15 to-sky-400/5 border-sky-400/10",
                  gold: "from-gold/15 to-gold/5 border-gold/10",
                };

                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 + i * 0.15 }}
                    className="relative bg-[#0d0f14] border border-white/[0.06] rounded-3xl p-8 overflow-hidden group hover:border-white/[0.1] transition-all duration-700"
                  >
                    <div className={`absolute -top-16 -right-16 w-32 h-32 bg-${item.color === "sky" ? "sky-400" : "gold"}/[0.06] rounded-full blur-[50px] pointer-events-none`} />
                    <div className="relative z-10 flex gap-5">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colorMap[item.color]} border flex items-center justify-center flex-shrink-0`}>
                        <item.icon className={`w-7 h-7 ${item.color === "sky" ? "text-sky-400" : "text-gold"}`} />
                      </div>
                      <div>
                        <h3 className="text-xl font-display font-bold text-foreground mb-2">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ VALUES — Bento ═══════════════ */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gold/[0.03] rounded-full blur-[120px] pointer-events-none" />

        <div className="container-tight relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block text-gold text-sm font-medium uppercase tracking-widest mb-4">
              Nossos Valores
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
              O que nos guia
            </h2>
            <div className="divider-gold mx-auto" />
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              Princípios que orientam cada projeto e relacionamento.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
            {values.map((value, index) => {
              const colorMap: Record<string, { bg: string; text: string; border: string; glow: string }> = {
                gold: { bg: "from-gold/15 to-gold/5", text: "text-gold", border: "border-gold/15", glow: "bg-gold/[0.08]" },
                sky: { bg: "from-sky-400/15 to-sky-400/5", text: "text-sky-400", border: "border-sky-400/15", glow: "bg-sky-400/[0.08]" },
                emerald: { bg: "from-emerald-400/15 to-emerald-400/5", text: "text-emerald-400", border: "border-emerald-400/15", glow: "bg-emerald-400/[0.08]" },
                amber: { bg: "from-amber-400/15 to-amber-400/5", text: "text-amber-400", border: "border-amber-400/15", glow: "bg-amber-400/[0.08]" },
              };
              const c = colorMap[value.color];
              const span = index === 0 || index === 3 ? "lg:col-span-7" : "lg:col-span-5";

              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`group ${span}`}
                >
                  <div className="relative h-full bg-[#0d0f14] border border-white/[0.06] rounded-3xl p-8 md:p-10 overflow-hidden hover:border-white/[0.1] transition-all duration-700">
                    {/* Gradient border on hover */}
                    <div className={`absolute -inset-[1px] rounded-3xl bg-gradient-to-br ${c.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10`} />

                    <div className={`absolute -top-16 -right-16 w-40 h-40 ${c.glow} rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none`} />

                    <div className="relative z-10">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${c.bg} border ${c.border} flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500`}>
                        <value.icon className={`w-7 h-7 ${c.text}`} />
                      </div>
                      <h3 className={`text-xl md:text-2xl font-display font-bold text-foreground mb-3 ${c.text.replace("text-", "group-hover:text-")} transition-colors duration-500`}>
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════ APPROACH — Grid ═══════════════ */}
      <section className="section-padding bg-graphite relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gold/[0.03] rounded-full blur-[120px] pointer-events-none" />

        <div className="container-tight relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block text-gold text-sm font-medium uppercase tracking-widest mb-4">
              Nossa Abordagem
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
              Consultoria sob medida
            </h2>
            <div className="divider-gold mx-auto" />
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              Não trabalhamos com pacotes prontos. Cada solução é desenhada para a sua realidade.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {approach.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative bg-[#0d0f14] border border-white/[0.06] rounded-3xl p-7 overflow-hidden hover:border-white/[0.1] transition-all duration-700"
              >
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-gold/[0.04] rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none" />

                <div className="relative z-10 flex gap-4 items-start">
                  <div className="w-11 h-11 rounded-xl bg-gold/[0.08] border border-gold/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-gold/15 transition-all duration-500">
                    <item.icon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-gold transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-14"
          >
            <Button variant="gold" size="lg" asChild>
              <Link to="/metodologia">
                Conheça nossa metodologia
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ CTA ═══════════════ */}
      <section className="section-padding bg-gradient-to-b from-background via-graphite to-background">
        <div className="container-tight">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-12 md:p-16 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-gold" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/[0.03] rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10">
              <span className="inline-block text-gold text-sm font-medium uppercase tracking-widest mb-4">
                Pronto para decidir melhor?
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
                Vamos conversar sobre o seu{" "}
                <span className="text-gradient">projeto</span>?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Conte para nós sobre seus desafios com dados. A +351 Data
                está pronta para ajudar.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="xl" asChild>
                  <Link to="/contato">
                    Falar com um especialista
                    <ArrowRight className="ml-2" />
                  </Link>
                </Button>
                <Button variant="heroOutline" size="xl" asChild>
                  <Link to="/cases">Ver casos de sucesso</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
