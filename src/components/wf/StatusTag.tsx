import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const statusTagVariants = cva(
  "inline-flex items-center gap-1.5 border px-2 py-[3px] font-display text-[0.625rem] font-semibold uppercase tracking-[0.14em] leading-none rounded-[2px]",
  {
    variants: {
      tone: {
        neutral: "border-border-strong text-muted-foreground bg-secondary/60",
        stock: "border-success/45 text-success bg-success/10",
        low: "border-warning/50 text-warning bg-warning/10",
        critical: "border-destructive/50 text-destructive bg-destructive/10",
        active: "border-primary/50 text-primary bg-primary/10",
        gold: "border-gold/50 text-gold bg-gold/10",
        done: "border-info/45 text-info bg-info/10",
      },
    },
    defaultVariants: { tone: "neutral" },
  },
);

const TONES = {
  "IN STOCK": "stock",
  "LOW STOCK": "low",
  CRITICAL: "critical",
  PICKING: "active",
  PACKING: "gold",
  READY: "gold",
  DISPATCHED: "active",
  "IN TRANSIT": "active",
  DELIVERED: "stock",
  "AI ALERT": "critical",
  PENDING: "neutral",
  DAMAGED: "critical",
  MISSING: "critical",
} as const;

export type StatusLabel = keyof typeof TONES;

export function StatusTag({
  label,
  tone,
  dot = true,
  className,
}: {
  label: string;
  tone?: VariantProps<typeof statusTagVariants>["tone"];
  dot?: boolean;
  className?: string;
}) {
  const resolved =
    tone ?? (TONES[label.toUpperCase() as StatusLabel] as VariantProps<typeof statusTagVariants>["tone"]) ?? "neutral";
  return (
    <span className={cn(statusTagVariants({ tone: resolved }), className)}>
      {dot && <span className="size-1.5 rounded-full bg-current" />}
      {label}
    </span>
  );
}

export { statusTagVariants };
