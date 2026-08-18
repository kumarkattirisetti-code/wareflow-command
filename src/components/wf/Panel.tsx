import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Panel({
  children,
  className,
  ticks = false,
}: {
  children: ReactNode;
  className?: string;
  ticks?: boolean;
}) {
  return (
    <section
      className={cn(
        "panel-frame hover-lift animate-reveal rounded-sm",
        ticks && "corner-ticks",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function PanelHeader({
  code,
  title,
  right,
  className,
}: {
  code?: string;
  title: string;
  right?: ReactNode;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "flex items-center justify-between gap-3 border-b border-border px-4 py-2.5",
        className,
      )}
    >
      <div className="flex items-baseline gap-2.5 min-w-0">
        {code && <span className="tech-label text-primary">{code}</span>}
        <h3 className="truncate text-sm font-semibold text-foreground">{title}</h3>
      </div>
      {right}
    </header>
  );
}

export function MetricStrip({
  label,
  value,
  delta,
  hint,
}: {
  label: string;
  value: string;
  delta?: string;
  hint?: string;
}) {
  return (
    <div className="metric-strip animate-reveal flex items-center justify-between gap-4 px-3.5 py-2.5">
      <div className="min-w-0">
        <div className="tech-label">{label}</div>
        <div className="data-figure mt-0.5 text-lg text-foreground">{value}</div>
      </div>
      <div className="text-right">
        {delta && <div className="data-figure text-xs text-primary">{delta}</div>}
        {hint && <div className="text-[0.6875rem] text-muted-foreground">{hint}</div>}
      </div>
    </div>
  );
}
