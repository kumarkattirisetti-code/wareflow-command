import { useEffect, useState, type ReactNode } from "react";
import { Sidebar, Topbar } from "./Sidebar";
import { cn } from "@/lib/utils";

export function AppShell({
  title,
  code,
  children,
}: {
  title: string;
  code: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="sticky top-0 hidden h-screen shrink-0 border-r border-sidebar-border lg:block">
        <Sidebar />
      </aside>

      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 animate-reveal border-r border-sidebar-border">
            <Sidebar onClose={() => setOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar
          title={title}
          code={code}
          onMenu={() => setOpen(true)}
          theme={theme}
          onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")}
        />
        <main className={cn("deck-surface flex-1 px-4 py-5 sm:px-6 sm:py-7")}>{children}</main>
        <footer className="border-t border-border px-4 py-3 sm:px-6">
          <span className="tech-label">
            Wareflow Intelligence · Warehouse Business Command Center
          </span>
        </footer>
      </div>
    </div>
  );
}
