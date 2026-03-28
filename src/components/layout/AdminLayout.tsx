import { ReactNode } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, LogOut, Settings, BarChart3, CalendarClock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { toast } from "sonner";

interface AdminLayoutProps {
  children: ReactNode;
  title?: string;
}

export function AdminLayout({ children, title = "Dashboard" }: AdminLayoutProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    toast("Sessão encerrada");
    navigate("/");
  };

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin/leads" },
    { icon: Users, label: "Leads", path: "/admin/leads/lista" },
    { icon: CalendarClock, label: "Atividades", path: "/admin/atividades" },
    { icon: BarChart3, label: "Relatórios", path: "/admin/reports" },
    { icon: Settings, label: "Configurações", path: "/admin/settings" },
  ];

  return (
    <div className="flex h-screen bg-graphite overflow-hidden font-sans text-foreground">
      {/* Sidebar */}
      <aside className="w-72 bg-[#0d0f14] border-r border-white/[0.06] hidden md:flex flex-col">
        {/* Logo Area */}
        <div className="px-7 py-6 border-b border-white/[0.06]">
          <div className="relative flex items-center gap-1">
            {/* Gold glow behind logo */}
            <div className="absolute -inset-3 bg-gold/[0.07] rounded-2xl blur-xl pointer-events-none" />
            <h2 className="relative text-3xl font-display font-bold tracking-tight">
              <span className="text-gold drop-shadow-[0_0_12px_rgba(212,175,55,0.4)]">+351</span>
              <span className="ml-2 text-white/90">CRM</span>
            </h2>
          </div>
          {/* Subtle divider accent */}
          <div className="mt-4 h-px bg-gradient-to-r from-gold/20 via-gold/[0.08] to-transparent" />
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-5 space-y-1.5 overflow-y-auto">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-sm font-medium",
                  isActive
                    ? "bg-gold/[0.06] text-gold"
                    : "text-white/40 hover:bg-white/[0.03] hover:text-white/70"
                )
              }
            >
              {({ isActive }) => (
                <>
                  {/* Active left accent bar */}
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-full bg-gold shadow-[0_0_8px_rgba(212,175,55,0.5)]" />
                  )}
                  <item.icon className={cn(
                    "w-5 h-5 shrink-0 transition-colors duration-300",
                    isActive ? "text-gold" : "text-white/30 group-hover:text-white/60"
                  )} />
                  <span className="transition-colors duration-300">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-4 py-4 border-t border-white/[0.06]">
          <Button
            variant="ghost"
            className="w-full justify-start text-white/30 hover:text-red-400 hover:bg-red-500/[0.08] rounded-xl transition-all duration-300"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 mr-3 shrink-0" />
            Sair do sistema
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-graphite relative">
        {/* Dot texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Subtle gold glow in top-right */}
        <div className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-gold/[0.04] rounded-full blur-[120px] pointer-events-none z-0" />

        {/* Topbar */}
        <header className="h-16 border-b border-white/[0.06] bg-[#0d0f14]/80 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-display font-semibold text-white/90 tracking-tight">
              {title}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            {/* Profile avatar with gold gradient */}
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center text-[#0d0f14] font-bold text-xs shadow-[0_0_16px_rgba(212,175,55,0.25)] transition-shadow duration-300 hover:shadow-[0_0_24px_rgba(212,175,55,0.4)]">
              351
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto p-6 md:p-8 z-[1]">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
