import { Area, AreaChart, CartesianGrid, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { cn } from "@/lib/utils";
import { revenueSeries, stockBars, utilizationZones, orderStatusSegments } from "@/lib/wf-data";

const toneBg: Record<string, string> = {
  primary: "bg-primary",
  gold: "bg-gold",
  success: "bg-success",
  info: "bg-info",
};

function TechTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="border border-border-strong bg-popover px-3 py-2 shadow-lift">
      <div className="tech-label text-primary">{label}</div>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="mt-1 flex items-center gap-2 text-xs">
          <span className="size-1.5" style={{ background: p.color }} />
          <span className="text-muted-foreground">{p.name}</span>
          <span className="data-figure ml-auto text-foreground">{p.value}</span>
        </div>
      ))}
    </div>
  );
}

/* Revenue — smooth area */
export function RevenueArea() {
  return (
    <div className="h-56 px-2 pt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={revenueSeries} margin={{ top: 4, right: 12, left: -18, bottom: 0 }}>
          <defs>
            <linearGradient id="wfRev" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.45} />
              <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="var(--color-border)" vertical={false} />
          <XAxis dataKey="m" tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }} tickLine={false} axisLine={false} />
          <Tooltip content={<TechTooltip />} />
          <Area
            type="monotone"
            dataKey="revenue"
            name="Revenue ₹L"
            stroke="var(--color-chart-1)"
            strokeWidth={2}
            fill="url(#wfRev)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

/* Income vs Loss — dual series */
export function IncomeLossChart() {
  return (
    <div className="h-48 px-2 pt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={revenueSeries} margin={{ top: 4, right: 12, left: -18, bottom: 0 }}>
          <CartesianGrid stroke="var(--color-border)" vertical={false} />
          <XAxis dataKey="m" tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }} tickLine={false} axisLine={false} />
          <Tooltip content={<TechTooltip />} />
          <Line type="linear" dataKey="revenue" name="Income" stroke="var(--color-chart-3)" strokeWidth={2} dot={false} />
          <Line
            type="linear"
            dataKey="loss"
            name="Loss"
            stroke="var(--color-chart-4)"
            strokeWidth={2}
            strokeDasharray="5 3"
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

/* Inventory — segmented horizontal comparison bars */
export function StockComparisonBars() {
  return (
    <div className="divide-y divide-border">
      {stockBars.map((s) => (
        <div key={s.sku} className="px-4 py-3">
          <div className="flex items-baseline justify-between">
            <span className="font-display text-xs font-semibold tracking-wide text-foreground">{s.label}</span>
            <span className="tech-label">{s.sku.split(" · ")[0]}</span>
          </div>
          <div className="mt-2 flex h-2.5 w-full overflow-hidden bg-secondary">
            <div className="bg-success transition-all duration-500" style={{ width: `${s.onHand}%` }} />
            <div className="bg-gold transition-all duration-500" style={{ width: `${s.reserved}%` }} />
            <div className="bg-destructive/70 transition-all duration-500" style={{ width: `${s.gap}%` }} />
          </div>
          <div className="mt-1.5 flex gap-4 text-[0.6875rem] text-muted-foreground">
            <span>On hand <span className="data-figure text-foreground">{s.onHand}</span></span>
            <span>Reserved <span className="data-figure text-foreground">{s.reserved}</span></span>
            <span>Gap <span className="data-figure text-foreground">{s.gap}</span></span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* Warehouse utilization — radial gauges */
export function UtilizationRadials() {
  return (
    <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-4">
      {utilizationZones.map((z) => {
        const r = 26;
        const c = 2 * Math.PI * r;
        return (
          <div key={z.zone} className="flex flex-col items-center gap-1.5">
            <div className="relative">
              <svg width="72" height="72" className="-rotate-90">
                <circle cx="36" cy="36" r={r} fill="none" stroke="var(--color-secondary)" strokeWidth="6" />
                <circle
                  cx="36"
                  cy="36"
                  r={r}
                  fill="none"
                  stroke={z.used > 80 ? "var(--color-destructive)" : "var(--color-chart-1)"}
                  strokeWidth="6"
                  strokeDasharray={c}
                  strokeDashoffset={c * (1 - z.used / 100)}
                  className="transition-all duration-700"
                />
              </svg>
              <span className="data-figure absolute inset-0 flex items-center justify-center text-sm text-foreground">
                {z.used}%
              </span>
            </div>
            <div className="tech-label">ZONE {z.zone}</div>
            <div className="text-[0.6875rem] text-muted-foreground">{z.name}</div>
          </div>
        );
      })}
    </div>
  );
}

/* Order status — compact segmented bar */
export function OrderStatusSegments() {
  const total = orderStatusSegments.reduce((a, s) => a + s.value, 0);
  return (
    <div className="p-4">
      <div className="flex h-7 w-full overflow-hidden">
        {orderStatusSegments.map((s) => (
          <div
            key={s.label}
            className={cn("flex items-center justify-center transition-all duration-500", toneBg[s.tone])}
            style={{ width: `${(s.value / total) * 100}%` }}
          >
            <span className="data-figure text-[0.625rem] text-background">{s.value}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 sm:grid-cols-4">
        {orderStatusSegments.map((s) => (
          <div key={s.label} className="flex items-center gap-2">
            <span className={cn("h-2.5 w-0.5", toneBg[s.tone])} />
            <span className="tech-label">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* AI risk — probability indicator */
export function RiskIndicator({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="tech-label">{label}</span>
        <span className="data-figure text-xs text-foreground">{value}%</span>
      </div>
      <div className="mt-1.5 flex gap-[3px]">
        {Array.from({ length: 20 }, (_, i) => (
          <span
            key={i}
            className={cn(
              "h-3 flex-1",
              i < Math.round(value / 5)
                ? value > 70
                  ? "bg-destructive"
                  : value > 40
                    ? "bg-warning"
                    : "bg-success"
                : "bg-secondary",
            )}
          />
        ))}
      </div>
    </div>
  );
}

/* Stock movement — directional flow */
export function StockFlow() {
  const rows = [
    { dir: "IN", label: "Inbound receipts", value: 1284, tone: "success" },
    { dir: "OUT", label: "Outbound dispatch", value: 1147, tone: "primary" },
    { dir: "RTN", label: "Returns / rework", value: 62, tone: "gold" },
    { dir: "WRT", label: "Write-offs", value: 19, tone: "destructive" },
  ];
  return (
    <div className="divide-y divide-border">
      {rows.map((r) => (
        <div key={r.dir} className="flex items-center gap-3 px-4 py-2.5">
          <span className="tech-label w-8 text-primary">{r.dir}</span>
          <span className="flex-1 text-xs text-muted-foreground">{r.label}</span>
          <svg width="60" height="10" className="shrink-0">
            <line
              x1="0"
              y1="5"
              x2="56"
              y2="5"
              stroke={`var(--color-${r.tone})`}
              strokeWidth="2"
              strokeDasharray="6 4"
              className="animate-flow"
            />
            <polygon points="56,1 60,5 56,9" fill={`var(--color-${r.tone})`} />
          </svg>
          <span className="data-figure w-14 text-right text-sm text-foreground">{r.value}</span>
        </div>
      ))}
    </div>
  );
}
