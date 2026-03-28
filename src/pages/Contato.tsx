import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Send,
  CheckCircle,
  Phone,
  MessageCircle,
  Clock,
  Shield,
  Headphones,
  ChevronDown,
  ArrowRight,
  Loader2,
  Sparkles,
  Building2,
} from "lucide-react";
import { useForm, ValidationError } from "@formspree/react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const WHATSAPP_NUMBER = "5511950492627";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Ol\u00e1! Gostaria de falar com um especialista da +351 Data."
)}`;

const trustIndicators = [
  {
    icon: Clock,
    label: "Resposta em at\u00e9 2h",
    description: "Em hor\u00e1rio comercial",
  },
  {
    icon: Shield,
    label: "Dados protegidos",
    description: "LGPD & GDPR compliant",
  },
  {
    icon: Headphones,
    label: "Suporte dedicado",
    description: "Especialista exclusivo",
  },
];

const faqItems = [
  {
    question: "Como funciona a primeira conversa?",
    answer:
      "Realizamos uma sess\u00e3o diagn\u00f3stica gratuita de 30 minutos para entender seu cen\u00e1rio atual, desafios com dados e objetivos. A partir disso, desenhamos uma proposta personalizada.",
  },
  {
    question: "Quanto tempo leva para ver resultados?",
    answer:
      "Projetos de estrutura\u00e7\u00e3o de dados costumam entregar os primeiros dashboards em 2 a 4 semanas. Solu\u00e7\u00f5es de IA sob medida variam de 4 a 12 semanas, dependendo da complexidade.",
  },
  {
    question: "Atendem empresas de qualquer porte?",
    answer:
      "Sim. Trabalhamos desde startups em fase de estrutura\u00e7\u00e3o at\u00e9 grandes corpora\u00e7\u00f5es com opera\u00e7\u00f5es complexas. Nossas solu\u00e7\u00f5es s\u00e3o modulares e escal\u00e1veis.",
  },
  {
    question: "Qual o investimento m\u00ednimo?",
    answer:
      "Cada projeto \u00e9 dimensionado sob medida. Na conversa inicial, alinhamos escopo e or\u00e7amento para garantir que a solu\u00e7\u00e3o gere ROI desde o primeiro m\u00eas.",
  },
];

function FAQItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="border-b border-border/40 last:border-0"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="text-foreground font-medium pr-8 group-hover:text-gold transition-colors">
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-gold flex-shrink-0 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <p className="text-muted-foreground pb-5 leading-relaxed">{answer}</p>
      </motion.div>
    </motion.div>
  );
}

export default function Contato() {
  const [state, handleSubmit] = useForm("xwvrndkp");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <Layout>
      {/* ── Hero ── */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        {/* Layered backgrounds */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#08090f] via-graphite to-background" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-gold/[0.04] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gold/[0.03] rounded-full blur-[100px]" />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="container-tight relative z-10 py-20 md:py-32">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-3xl"
          >
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/[0.06] text-gold text-xs font-mono uppercase tracking-widest mb-8">
                <Sparkles className="w-3.5 h-3.5" />
                Falar com especialista
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-foreground leading-[1.1] mb-6"
            >
              Transforme dados em{" "}
              <span className="text-gradient">vantagem competitiva</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10"
            >
              Conte sobre seu cen&aacute;rio. Um especialista da +351 Data
              analisa sua necessidade e prop&otilde;e um caminho claro para
              decis&otilde;es baseadas em dados.
            </motion.p>

            {/* Trust indicators */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-6"
            >
              {trustIndicators.map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {item.label}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Contact Split Section ── */}
      <section className="section-padding relative">
        <div className="container-tight">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* ── Left: Form (3 cols) ── */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              {state.succeeded ? (
                <div className="glass-card rounded-2xl p-12 text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-gold" />
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      delay: 0.2,
                    }}
                    className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle className="w-10 h-10 text-gold" />
                  </motion.div>
                  <h2 className="text-3xl font-display font-bold text-foreground mb-4">
                    Mensagem enviada!
                  </h2>
                  <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                    Recebemos sua mensagem e um especialista entrar&aacute; em
                    contato em at&eacute; 2 horas &uacute;teis.
                  </p>
                  <p className="text-sm text-muted-foreground/60 mb-8">
                    Prefere algo mais r&aacute;pido? Fale agora pelo WhatsApp.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      variant="goldOutline"
                      onClick={() => window.location.reload()}
                    >
                      Enviar nova mensagem
                    </Button>
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                      <Button
                        variant="gold"
                        className="bg-emerald-600 hover:bg-emerald-700 border-emerald-600 w-full"
                      >
                        <MessageCircle className="mr-2 w-4 h-4" />
                        WhatsApp
                      </Button>
                    </a>
                  </div>
                </div>
              ) : (
                <div className="glass-card rounded-2xl p-8 md:p-10 relative overflow-hidden">
                  {/* Gold top bar */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-gold" />

                  <div className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
                      Falar com um especialista
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      Preencha o formul&aacute;rio e receba um retorno
                      personalizado.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Row 1: Name + Email */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="name"
                          className="text-foreground/80 text-sm"
                        >
                          Nome *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Seu nome completo"
                          required
                          className="bg-[#0d0f14] border-border/60 focus:border-gold/50 focus:ring-gold/20 placeholder:text-muted-foreground/40 h-11"
                        />
                        <ValidationError
                          prefix="Name"
                          field="name"
                          errors={state.errors}
                          className="text-destructive text-xs"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="email"
                          className="text-foreground/80 text-sm"
                        >
                          E-mail *
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="seu@email.com"
                          required
                          className="bg-[#0d0f14] border-border/60 focus:border-gold/50 focus:ring-gold/20 placeholder:text-muted-foreground/40 h-11"
                        />
                        <ValidationError
                          prefix="Email"
                          field="email"
                          errors={state.errors}
                          className="text-destructive text-xs"
                        />
                      </div>
                    </div>

                    {/* Row 2: Phone + Company */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="phone"
                          className="text-foreground/80 text-sm"
                        >
                          Telefone
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="(00) 00000-0000"
                          className="bg-[#0d0f14] border-border/60 focus:border-gold/50 focus:ring-gold/20 placeholder:text-muted-foreground/40 h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="company"
                          className="text-foreground/80 text-sm"
                        >
                          Empresa
                        </Label>
                        <Input
                          id="company"
                          name="company"
                          placeholder="Nome da empresa"
                          className="bg-[#0d0f14] border-border/60 focus:border-gold/50 focus:ring-gold/20 placeholder:text-muted-foreground/40 h-11"
                        />
                      </div>
                    </div>

                    {/* Sector dropdown */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="sector"
                        className="text-foreground/80 text-sm"
                      >
                        Setor de interesse
                      </Label>
                      <div className="relative">
                        <select
                          id="sector"
                          name="sector"
                          className="w-full h-11 px-3 pr-10 rounded-md bg-[#0d0f14] border border-border/60 text-foreground text-sm appearance-none focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-colors"
                        >
                          <option value="">Selecione um setor</option>
                          <option value="saude">Sa&uacute;de</option>
                          <option value="juridico">Jur&iacute;dico</option>
                          <option value="rh">Recursos Humanos</option>
                          <option value="financeiro">Financeiro</option>
                          <option value="varejo">Varejo</option>
                          <option value="industria">
                            Ind&uacute;stria
                          </option>
                          <option value="tecnologia">Tecnologia</option>
                          <option value="outro">Outro</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="message"
                        className="text-foreground/80 text-sm"
                      >
                        Mensagem *
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Conte brevemente sobre seu cen&aacute;rio, desafios com dados e o que espera alcan&ccedil;ar..."
                        rows={5}
                        required
                        className="bg-[#0d0f14] border-border/60 focus:border-gold/50 focus:ring-gold/20 placeholder:text-muted-foreground/40 resize-none"
                      />
                      <ValidationError
                        prefix="Message"
                        field="message"
                        errors={state.errors}
                        className="text-destructive text-xs"
                      />
                    </div>

                    {/* Submit */}
                    <Button
                      type="submit"
                      variant="gold"
                      size="lg"
                      className="w-full h-12 text-base font-semibold"
                      disabled={state.submitting}
                    >
                      {state.submitting ? (
                        <>
                          <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          Enviar mensagem
                          <Send className="ml-2 w-4 h-4" />
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-muted-foreground/50 text-center">
                      Ao enviar, voc&ecirc; concorda com nossa pol&iacute;tica
                      de privacidade. Seus dados est&atilde;o protegidos.
                    </p>
                  </form>
                </div>
              )}
            </motion.div>

            {/* ── Right: Contact Info (2 cols) ── */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-2 space-y-6"
            >
              <div className="mb-2">
                <h2 className="text-2xl font-display font-bold text-foreground mb-3">
                  Outros canais
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Prefere outro canal? Estamos dispon&iacute;veis por e-mail,
                  WhatsApp ou nos encontre no LinkedIn.
                </p>
              </div>

              {/* WhatsApp CTA */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="rounded-xl p-6 bg-emerald-500/[0.08] border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 hover:-translate-y-0.5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500/30 transition-colors">
                      <MessageCircle className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                        WhatsApp
                        <ArrowRight className="w-4 h-4 text-emerald-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </h3>
                      <p className="text-emerald-400/80 text-sm font-mono">
                        (11) 95049-2627
                      </p>
                      <p className="text-muted-foreground/60 text-xs mt-1">
                        Resposta imediata em hor&aacute;rio comercial
                      </p>
                    </div>
                  </div>
                </div>
              </a>

              {/* Email card */}
              <div className="glass-card rounded-xl p-6 hover-lift">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      E-mail
                    </h3>
                    <a
                      href="mailto:contato@mais351data.com.br"
                      className="text-muted-foreground hover:text-gold transition-colors text-sm"
                    >
                      contato@mais351data.com.br
                    </a>
                  </div>
                </div>
              </div>

              {/* Phone card */}
              <div className="glass-card rounded-xl p-6 hover-lift">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      Telefone
                    </h3>
                    <a
                      href="tel:+5511950492627"
                      className="text-muted-foreground hover:text-gold transition-colors text-sm"
                    >
                      +55 (11) 95049-2627
                    </a>
                  </div>
                </div>
              </div>

              {/* Location card */}
              <div className="glass-card rounded-xl p-6 hover-lift">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      Atua&ccedil;&atilde;o
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Brasil & Portugal
                    </p>
                    <p className="text-muted-foreground/50 text-xs mt-1">
                      Atendimento remoto em todo o territ&oacute;rio
                    </p>
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div className="p-8 rounded-xl bg-gold/[0.04] border border-gold/15 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gold/[0.05] rounded-full blur-2xl" />
                <p className="text-lg font-display text-foreground italic mb-3 relative z-10">
                  "Dados organizados mudam decis&otilde;es. Decis&otilde;es
                  certas mudam empresas."
                </p>
                <div className="flex items-center gap-3 relative z-10">
                  <div className="divider-gold" />
                  <p className="text-sm text-gold font-medium">+351 Data</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── What to Expect Section ── */}
      <section className="section-padding relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-graphite/50 to-background" />
        <div className="container-tight relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/20 bg-gold/[0.04] text-gold text-xs font-mono uppercase tracking-widest mb-6">
              Processo
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              O que esperar ap&oacute;s o{" "}
              <span className="text-gradient">contato</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Um processo estruturado para garantir que cada projeto comece com
              clareza e alinhamento total.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                icon: Headphones,
                title: "Diagn\u00f3stico gratuito",
                description:
                  "Sess\u00e3o de 30 min para entender seu cen\u00e1rio, dores e objetivos com dados.",
              },
              {
                step: "02",
                icon: Building2,
                title: "Proposta sob medida",
                description:
                  "Desenhamos uma solu\u00e7\u00e3o personalizada com escopo, cronograma e investimento claros.",
              },
              {
                step: "03",
                icon: Sparkles,
                title: "Implementa\u00e7\u00e3o \u00e1gil",
                description:
                  "Entregas semanais com valida\u00e7\u00e3o cont\u00ednua. Primeiros resultados em semanas.",
              },
              {
                step: "04",
                icon: Shield,
                title: "Suporte cont\u00ednuo",
                description:
                  "Acompanhamento p\u00f3s-entrega com evolu\u00e7\u00e3o constante e suporte dedicado.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card rounded-2xl p-6 relative group hover-lift"
              >
                {/* Step number */}
                <span className="text-5xl font-display font-bold text-gold/[0.08] absolute top-4 right-5 select-none">
                  {item.step}
                </span>

                <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/15 transition-colors">
                  <item.icon className="w-6 h-6 text-gold" />
                </div>

                <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <section className="section-padding">
        <div className="container-tight">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/20 bg-gold/[0.04] text-gold text-xs font-mono uppercase tracking-widest mb-6">
                FAQ
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Perguntas{" "}
                <span className="text-gradient">frequentes</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Reunimos as d&uacute;vidas mais comuns para que voc&ecirc; tenha
                clareza antes mesmo da primeira conversa.
              </p>

              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="goldOutline" size="lg">
                  <MessageCircle className="mr-2 w-4 h-4" />
                  Tirar d&uacute;vidas pelo WhatsApp
                </Button>
              </a>
            </motion.div>

            <div className="glass-card rounded-2xl p-6 md:p-8">
              {faqItems.map((item, i) => (
                <FAQItem key={i} index={i} {...item} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-graphite/50 to-background" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gold/[0.04] rounded-full blur-[100px]" />

        <div className="container-tight relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
              Pronto para transformar seus{" "}
              <span className="text-gradient">dados em resultados</span>?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
              Cada dia sem dados estruturados &eacute; um dia de
              decis&otilde;es no escuro. Comece agora.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#top">
                <Button variant="hero" size="lg" className="px-8">
                  Preencher formul&aacute;rio
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="heroOutline"
                  size="lg"
                  className="px-8 border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10"
                >
                  <MessageCircle className="mr-2 w-5 h-5" />
                  WhatsApp direto
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
