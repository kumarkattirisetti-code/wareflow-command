import { Link } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Boxes,
  ClipboardList,
  PackageCheck,
  TriangleAlert,
  Truck,
  BarChart3,
  Network,
  CalendarRange,
  Users,
  Bot,
  Warehouse,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const GROUPS = [
  {
    label: "Command",
    items: [
      { to: "/", label: "Command Deck", icon: LayoutDashboard },
      { to: "/warehouse-twin", label: "Warehouse Twin", icon: Warehouse },
      { to: "/flowpilot", label: "FlowPilot AI", icon: Bot },
    ],
  },
  {
    label: "Operations",
    items: [
      { to: "/inventory", label: "Inventory", icon: Boxes },
      { to: "/orders", label: "Orders", icon: ClipboardList },
      { to: "/picking-packing", label: "Picking & Packing", icon: PackageCheck },
      { to: "/exceptions", label: "Damaged / Missing", icon: TriangleAlert },
      { to: "/dispatch", label: "Dispatch Tracking", icon: Truck },
    ],
  },
  {
    label: "Business",
    items: [
      { to: "/analytics", label: "Analytics", icon: BarChart3 },
      { to: "/godown-calendar", label: "Godown Calendar", icon: CalendarRange },
      { to: "/partnership", label: "Partnership Network", icon: Network },
      { to: "/users", label: "User Management", icon: Users },
    ],
  },
] as const;

export function Sidebar({ onClose }: { onClose?: () => void }) {
  return (
    <nav className="flex h-full w-64 flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex items-center gap-3 border-b border-sidebar-border px-4 py-4">
        <div className="relative grid size-9 place-items-center bg-sidebar-accent">
          <Warehouse className="size-5 text-primary-foreground" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-display text-[0.8125rem] font-bold uppercase tracking-[0.16em] leading-none">
            Wareflow
          </div>
          <div className="mt-1 font-display text-[0.5625rem] uppercase tracking-[0.22em] text-sidebar-muted">
            Intelligence
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-sidebar-muted hover:text-sidebar-foreground lg:hidden">
            <X className="size-4" />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto py-3">
        {GROUPS.map((g) => (
          <div key={g.label} className="mb-1">
            <div className="px-4 pb-1.5 pt-3 font-display text-[0.5625rem] font-semibold uppercase tracking-[0.22em] text-sidebar-muted">
              {g.label}
            </div>
            <div className="border-t border-sidebar-border">
              {g.items.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={onClose}
                  className="group relative flex items-center gap-2.5 py-2 pl-4 pr-3 text-[0.8125rem] text-sidebar-muted transition-colors duration-150 hover:bg-white/[0.04] hover:text-sidebar-foreground"
                  activeProps={{
                    className:
                      "bg-white/[0.06] text-sidebar-foreground before:absolute before:left-0 before:top-0 before:h-full before:w-[3px] before:bg-sidebar-accent",
                  }}
                  activeOptions={{ exact: item.to === "/" }}
                >
                  <item.icon className="size-[15px] shrink-0 stroke-[1.5] transition-transform duration-150 group-hover:translate-x-0.5" />
                  <span className="truncate">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-sidebar-border px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="relative flex size-2">
            <span className="absolute inset-0 animate-pulse-ai rounded-full bg-success" />
            <span className="relative size-2 rounded-full bg-success" />
          </span>
          <span className="font-display text-[0.5625rem] uppercase tracking-[0.2em] text-sidebar-muted">
            Node online · BHW-01
          </span>
        </div>
      </div>
    </nav>
  );
}

export function Topbar({
  title,
  code,
  onMenu,
  theme,
  onToggleTheme,
}: {
  title: string;
  code: string;
  onMenu: () => void;
  theme: "dark" | "light";
  onToggleTheme: () => void;
}) {
  return (
    <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-border bg-background/85 px-4 py-3 backdrop-blur-md sm:px-6">
      <button onClick={onMenu} className="text-muted-foreground hover:text-foreground lg:hidden">
        <LayoutDashboard className="size-5" />
      </button>
      <div className="min-w-0">
        <div className="tech-label text-primary">{code}</div>
        <h1 className="truncate text-base font-semibold sm:text-lg">{title}</h1>
      </div>
      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <div className="hidden items-center gap-2 border border-border px-2.5 py-1.5 md:flex">
          <span className="size-1.5 animate-pulse-ai rounded-full bg-primary" />
          <span className="tech-label">Live sync 12s</span>
        </div>
        <button
          onClick={onToggleTheme}
          className={cn(
            "border border-border-strong px-2.5 py-1.5 font-display text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:border-primary hover:text-primary",
          )}
        >
          {theme === "dark" ? "Command" : "Workspace"}
        </button>
      </div>
    </header>
  );
}
