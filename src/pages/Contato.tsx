import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, MapPin, Send, CheckCircle } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function Contato() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: "Mensagem enviada!",
      description: "Entraremos em contato em breve.",
    });
  };

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
              Contato
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
              Vamos{" "}
              <span className="text-gradient">conversar</span>?
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Conte rapidamente sobre seu cenário. A +351 Data entra em contato para entender como podemos ajudar.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding">
        <div className="container-tight">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {isSubmitted ? (
                <div className="glass-card rounded-2xl p-12 text-center">
                  <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-gold" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                    Mensagem enviada!
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Recebemos sua mensagem e entraremos em contato em breve.
                  </p>
                  <Button
                    variant="goldOutline"
                    onClick={() => setIsSubmitted(false)}
                  >
                    Enviar nova mensagem
                  </Button>
                </div>
              ) : (
                <div className="glass-card rounded-2xl p-8 md:p-10 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-gold" />
                  <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                    Falar com um especialista
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Seu nome"
                          required
                          className="bg-secondary border-border"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">E-mail</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="seu@email.com"
                          required
                          className="bg-secondary border-border"
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="company">Empresa</Label>
                        <Input
                          id="company"
                          name="company"
                          placeholder="Nome da empresa"
                          className="bg-secondary border-border"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="(00) 00000-0000"
                          className="bg-secondary border-border"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sector">Setor de interesse</Label>
                      <select
                        id="sector"
                        name="sector"
                        className="w-full h-10 px-3 rounded-md bg-secondary border border-border text-foreground"
                      >
                        <option value="">Selecione um setor</option>
                        <option value="saude">Saúde</option>
                        <option value="juridico">Jurídico</option>
                        <option value="rh">Recursos Humanos</option>
                        <option value="financeiro">Financeiro</option>
                        <option value="outro">Outro</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Mensagem</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Conte brevemente sobre seu cenário e desafios com dados..."
                        rows={5}
                        required
                        className="bg-secondary border-border resize-none"
                      />
                    </div>
                    <Button
                      type="submit"
                      variant="gold"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin mr-2">⏳</span>
                          Enviando...
                        </>
                      ) : (
                        <>
                          Enviar mensagem
                          <Send className="ml-2 w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              )}
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                  Outras formas de contato
                </h2>
                <p className="text-muted-foreground">
                  Prefere outro canal? Estamos disponíveis por e-mail e LinkedIn.
                </p>
              </div>

              <div className="space-y-6">
                <div className="glass-card rounded-xl p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">E-mail</h3>
                    <a
                      href="mailto:contato@mais351.com.br"
                      className="text-muted-foreground hover:text-gold transition-colors"
                    >
                      contato@mais351.com.br
                    </a>
                  </div>
                </div>

                <div className="glass-card rounded-xl p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <Linkedin className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">LinkedIn</h3>
                    <a
                      href="https://linkedin.com/company/351data"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-gold transition-colors"
                    >
                      /company/351data
                    </a>
                  </div>
                </div>

                <div className="glass-card rounded-xl p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Atuação</h3>
                    <p className="text-muted-foreground">
                      Brasil & Portugal
                    </p>
                    <p className="text-sm text-muted-foreground/60 mt-1">
                      Atendimento remoto em todo o território
                    </p>
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div className="p-8 rounded-xl bg-gold/5 border border-gold/20">
                <p className="text-xl font-display text-foreground italic mb-4">
                  "Dados organizados mudam decisões."
                </p>
                <p className="text-sm text-muted-foreground">
                  — +351 Data
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
