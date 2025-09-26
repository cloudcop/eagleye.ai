import { NavLink } from "react-router-dom";
import { Bell, FileText, LayoutDashboard, ShieldBan } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/dashboard/alerts", label: "Alerts", icon: Bell },
  { to: "/dashboard/banned-list", label: "Banned List", icon: ShieldBan },
  { to: "/dashboard/audit-log", label: "Audit Log", icon: FileText },
];

const Sidebar = () => {
  return (
    <aside className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <NavLink
            to="/dashboard"
            className="flex items-center gap-2 font-semibold"
          >
            <ShieldBan className="h-6 w-6 text-primary" />
            <span className="">VeriSure AI</span>
          </NavLink>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/dashboard"}
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
      </div>
    </aside>
  );
};

export default Sidebar;