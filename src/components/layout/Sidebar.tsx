import { NavLink } from "react-router-dom";
import { Bell, FileText, LayoutDashboard, ShieldBan } from "lucide-react";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const navItems = [
    { to: "/", label: "Dashboard", icon: LayoutDashboard },
    { to: "/alerts", label: "Alerts", icon: Bell },
    { to: "/banned-list", label: "Banned List", icon: ShieldBan },
    { to: "/audit-log", label: "Audit Log", icon: FileText },
  ];

  return (
    <aside className="hidden w-64 flex-shrink-0 border-r bg-background p-4 md:flex">
      <div className="flex h-full flex-col">
        <div className="mb-4 flex items-center gap-2 px-2">
          <ShieldBan className="h-8 w-8 text-primary" />
          <h1 className="text-xl font-bold">VeriSure AI</h1>
        </div>
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                  isActive && "bg-muted text-primary"
                )
              }
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;