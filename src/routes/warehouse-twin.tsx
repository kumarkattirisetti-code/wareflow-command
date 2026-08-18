import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/wf/AppShell";
import { Panel, PanelHeader } from "@/components/wf/Panel";
import { StatusTag } from "@/components/wf/StatusTag";
import { twinZones } from "@/lib/wf-data";

export const Route = createFileRoute("/warehouse-twin")({
  head: () => ({
    meta: [
      { title: "Warehouse Twin — WareFlow Intelligence" },
      {
        name: "description",
        content:
          "Blueprint-style digital twin of the godown: operational zones, movement paths, inventory density and live alerts.",
      },
      { property: "og:title", content: "Warehouse Twin — WareFlow Intelligence" },
      {
        property: "og:description",
        content: "Live operational digital twin of storage zones, movement paths and dispatch bays.",
      },
    ],
  }),
  component: TwinPage,
});

function TwinPage() {
  return (
    <AppShell title="Warehouse Twin" code="TWIN · 02">
      <div className="grid gap-4 lg:grid-cols-12">
        <Panel ticks className="lg:col-span-9">
          <PanelHeader
            code="BLUEPRINT"
            title="Godown BHW-01 · Live Floor"
            right={<StatusTag label="6 zones active" tone="active" />}
          />
          <div className="blueprint-surface relative p-4">
            <svg viewBox="0 0 100 100" className="aspect-[16/10] w-full">
              <defs>
                <pattern id="dense" width="3" height="3" patternUnits="userSpaceOnUse">
                  <path d="M0 3 L3 0" stroke="var(--color-primary)" strokeWidth="0.4" opacity="0.35" />
                </pattern>
              </defs>

              {/* movement paths */}
              <path
                d="M46 19 L46 78 M22 42 L22 70 M78 30 L78 78"
                stroke="var(--color-primary)"
                strokeWidth="0.5"
                strokeDasharray="3 2"
                className="animate-flow"
                fill="none"
              />

              {twinZones.map((z) => (
                <g key={z.id}>
                  <rect
                    x={z.x}
                    y={z.y}
                    width={z.w}
                    height={z.h}
                    fill="url(#dense)"
                    opacity={z.density / 110}
                  />
                  <rect
                    x={z.x}
                    y={z.y}
                    width={z.w}
                    height={z.h}
                    fill="none"
                    stroke={z.density > 80 ? "var(--color-destructive)" : "var(--color-border-strong)"}
                    strokeWidth="0.5"
                  />
                  <text
                    x={z.x + 1.6}
                    y={z.y + 4.4}
                    fill="var(--color-foreground)"
                    fontSize="2.4"
                    fontFamily="var(--font-display)"
                    letterSpacing="0.25"
                  >
                    {z.id} · {z.name}
                  </text>
                  <text
                    x={z.x + 1.6}
                    y={z.y + 8.2}
                    fill="var(--color-primary)"
                    fontSize="2.6"
                    fontFamily="var(--font-display)"
                    fontWeight="700"
                  >
                    {z.density}%
                  </text>
                  {z.density > 80 && (
                    <circle cx={z.x + z.w - 2.4} cy={z.y + 2.6} r="1" fill="var(--color-destructive)" className="animate-pulse-ai" />
                  )}
                </g>
              ))}
            </svg>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 border-t border-border pt-3">
              <span className="tech-label">Grid 1 sq = 40 sq ft</span>
              <span className="tech-label">Hatch density = inventory load</span>
              <span className="tech-label text-destructive">Pulse = capacity alert</span>
              <span className="tech-label text-primary">Dashed = movement path</span>
            </div>
          </div>
        </Panel>

        <div className="grid gap-3 lg:col-span-3">
          {twinZones.map((z) => (
            <div key={z.id} className="metric-strip px-3.5 py-2.5">
              <div className="flex items-center justify-between">
                <span className="tech-label">Zone {z.id}</span>
                <StatusTag label={z.state} />
              </div>
              <div className="mt-1 text-[0.8125rem] font-medium text-foreground">{z.name}</div>
              <div className="mt-2 flex h-1.5 bg-secondary">
                <div
                  className={z.density > 80 ? "bg-destructive" : "bg-primary"}
                  style={{ width: `${z.density}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
