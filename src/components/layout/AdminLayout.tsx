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
      <aside className="w-64 bg-background border-r border-border hidden md:flex flex-col">
        <div className="p-6 border-b border-border">
          <h2 className="text-2xl font-display font-bold text-foreground">
            +351 <span className="text-gold">CRM</span>
          </h2>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium",
                  isActive
                    ? "bg-gold/10 text-gold shadow-sm shadow-gold/5" // Active State
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground" // Inactive State
                )
              }
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 mr-3 shrink-0" />
            Sair do sistema
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-graphite relative">
         {/* Subtle background glow for premium feel */}
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px] pointer-events-none" />
         
        {/* Topbar */}
        <header className="h-16 border-b border-border/50 bg-background/50 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-display font-semibold text-foreground">
              {title}
            </h1>
          </div>
          <div className="flex items-center gap-4">
             {/* Profile Mock */}
             <div className="w-8 h-8 rounded-full bg-gradient-gold flex items-center justify-center text-graphite font-bold text-sm">
               351
             </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto p-6 md:p-8 z-10">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
