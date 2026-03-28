import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Lock, Mail, Loader2 } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simula uma chamada de API
    await new Promise(resolve => setTimeout(resolve, 800));

    if (email === "contato@mais351data.com.br" && password === "123") {
      toast({
        title: "Acesso Liberado!",
        description: "Bem-vindo ao CRM da +351 Data.",
      });
      navigate("/admin/leads");
    } else {
      toast({
        title: "Acesso negado",
        description: "E-mail ou senha incorretos.",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4"
      style={{ background: "linear-gradient(145deg, #08090f 0%, #0d0f14 40%, #08090f 100%)" }}
    >
      {/* Glow orbs */}
      <div className="absolute top-[15%] right-[20%] w-[420px] h-[420px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%)" }}
      />
      <div className="absolute bottom-[10%] left-[15%] w-[380px] h-[380px] rounded-full blur-[100px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%)" }}
      />
      <div className="absolute top-[60%] right-[40%] w-[260px] h-[260px] rounded-full blur-[90px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)" }}
      />

      {/* Dot grid texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.03,
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md relative z-10"
      >
        <div
          className="rounded-3xl p-8 md:p-10 shadow-2xl shadow-black/40 relative overflow-hidden"
          style={{
            background: "#0d0f14",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* Gold gradient line on top */}
          <div
            className="absolute top-0 left-0 w-full h-[2px]"
            style={{
              background: "linear-gradient(90deg, transparent 0%, #d4af37 30%, #f5d76e 50%, #d4af37 70%, transparent 100%)",
            }}
          />

          {/* Acesso restrito badge pill */}
          <div className="flex justify-center mb-6">
            <span
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium tracking-wide uppercase"
              style={{
                background: "rgba(212,175,55,0.08)",
                border: "1px solid rgba(212,175,55,0.15)",
                color: "#d4af37",
              }}
            >
              <Lock className="w-3 h-3" />
              Acesso restrito
            </span>
          </div>

          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-white/90 mb-1">
              +351{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg, #d4af37, #f5d76e, #d4af37)",
                }}
              >
                Data
              </span>
            </h1>
            <p className="text-sm text-white/40 mt-2">
              Painel Administrativo
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/60 text-sm font-medium">
                E-mail
              </Label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@e-mail.com"
                  className="pl-11 h-12 rounded-xl bg-[#0d0f14] border-border/60 text-white/90 placeholder:text-white/20 focus:border-[#d4af37]/50 focus:ring-2 focus:ring-[#d4af37]/20 transition-all duration-200"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white/60 text-sm font-medium">
                Senha
              </Label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-11 h-12 rounded-xl bg-[#0d0f14] border-border/60 text-white/90 placeholder:text-white/20 focus:border-[#d4af37]/50 focus:ring-2 focus:ring-[#d4af37]/20 transition-all duration-200"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 mt-2 rounded-xl text-sm font-semibold tracking-wide text-black/90 border-0 transition-all duration-200 hover:brightness-110 hover:shadow-lg hover:shadow-[#d4af37]/20"
              style={{
                background: "linear-gradient(135deg, #d4af37, #f5d76e, #d4af37)",
              }}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2 w-4 h-4" />
                  Validando...
                </>
              ) : (
                "Entrar no Sistema"
              )}
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center text-xs text-white/20 mt-8 tracking-wide">
            Dados que viram decisão.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
