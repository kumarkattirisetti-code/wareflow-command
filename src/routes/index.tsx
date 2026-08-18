import { createFileRoute } from "@tanstack/react-router";
import { ArrowDownRight, ArrowUpRight, Sparkles } from "lucide-react";
import { AppShell } from "@/components/wf/AppShell";
import { Panel, PanelHeader, MetricStrip } from "@/components/wf/Panel";
import { StatusTag } from "@/components/wf/StatusTag";
import { Button } from "@/components/ui/button";
import {
  IncomeLossChart,
  OrderStatusSegments,
  RevenueArea,
  RiskIndicator,
  StockComparisonBars,
  StockFlow,
  UtilizationRadials,
} from "@/components/wf/charts";
import { aiRecommendations, dispatchTimeline } from "@/lib/wf-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Command Deck — WareFlow Intelligence" },
      {
        name: "description",
        content:
          "Live warehouse command deck: stock, orders, revenue, utilization and FlowPilot AI recommendations in one industrial control surface.",
      },
      { property: "og:title", content: "Command Deck — WareFlow Intelligence" },
      {
        property: "og:description",
        content: "Warehouse Business Command Center for stock, dispatch and business intelligence.",
      },
    ],
  }),
  component: CommandDeck,
});

function CommandDeck() {
  return (
    <AppShell title="Command Deck" code="OPS · 01">
      <div className="grid gap-4 lg:grid-cols-12">
        {/* Primary command module */}
        <Panel ticks className="lg:col-span-8">
          <PanelHeader
            code="FIN · 01"
            title="Revenue Trajectory"
            right={
              <div className="flex items-center gap-3">
                <span className="data-figure text-sm text-success">+18.4%</span>
                <StatusTag label="LIVE" tone="active" />
              </div>
            }
          />
          <div className="grid gap-px bg-border sm:grid-cols-3">
            <div className="bg-card px-4 py-3">
              <div className="tech-label">Gross Revenue MTD</div>
              <div className="data-figure mt-1 text-2xl text-foreground">₹37.2L</div>
            </div>
            <div className="bg-card px-4 py-3">
              <div className="tech-label">Recognised Loss</div>
              <div className="data-figure mt-1 text-2xl text-destructive">₹2.1L</div>
            </div>
            <div className="bg-card px-4 py-3">
              <div className="tech-label">Net Margin</div>
              <div className="data-figure mt-1 text-2xl text-gold">31.6%</div>
            </div>
          </div>
          <RevenueArea />
        </Panel>

        {/* Metric strips column */}
        <div className="grid gap-3 lg:col-span-4">
          <MetricStrip label="Total Stock Units" value="24,118" delta="+412" hint="last 24h" />
          <MetricStrip label="Open Orders" value="100" delta="34 picking" hint="4 late" />
          <MetricStrip label="Incoming Today" value="1,284" delta="6 docks" hint="2 pending QC" />
          <MetricStrip label="Outgoing Today" value="1,147" delta="5 lanes" hint="on schedule" />
          <div className="panel-frame corner-ticks px-3.5 py-3">
            <div className="tech-label">Warehouse Utilization</div>
            <div className="mt-1 flex items-end gap-2">
              <span className="data-figure text-3xl text-foreground">76</span>
              <span className="mb-1 text-sm text-muted-foreground">% of 12,400 sq ft</span>
            </div>
            <div className="mt-2 flex h-1.5 bg-secondary">
              <div className="bg-primary" style={{ width: "76%" }} />
            </div>
          </div>
        </div>

        {/* AI command panel */}
        <Panel className="lg:col-span-7 border-l-2 border-l-primary">
          <PanelHeader
            code="AI · FLOWPILOT"
            title="Agentic Recommendations"
            right={
              <span className="flex items-center gap-2">
                <span className="size-2 animate-pulse-ai rounded-full bg-primary" />
                <span className="tech-label">3 active</span>
              </span>
            }
          />
          <div className="divide-y divide-border">
            {aiRecommendations.map((r) => (
              <article key={r.id} className="px-4 py-3.5">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusTag label={r.priority} tone={r.priority === "P1" ? "critical" : r.priority === "P2" ? "low" : "neutral"} dot={false} />
                  <span className="tech-label">{r.id}</span>
                  <span className="ml-auto flex items-center gap-1.5">
                    <Sparkles className="size-3 text-gold" />
                    <span className="data-figure text-[0.6875rem] text-gold">{r.confidence}% conf.</span>
                  </span>
                </div>
                <h4 className="mt-2 text-sm font-semibold leading-snug text-foreground">{r.title}</h4>
                <dl className="mt-2.5 grid gap-2 sm:grid-cols-3">
                  <div>
                    <dt className="tech-label">Why this matters</dt>
                    <dd className="mt-1 text-[0.75rem] leading-relaxed text-muted-foreground">{r.why}</dd>
                  </div>
                  <div>
                    <dt className="tech-label">Business impact</dt>
                    <dd className="mt-1 text-[0.75rem] leading-relaxed text-muted-foreground">{r.impact}</dd>
                  </div>
                  <div>
                    <dt className="tech-label">Recommended action</dt>
                    <dd className="mt-1 text-[0.75rem] leading-relaxed text-foreground">{r.action}</dd>
                  </div>
                </dl>
                <div className="mt-3 flex gap-2">
                  <Button variant="command" size="sm">
                    Execute
                  </Button>
                  <Button variant="outline" size="sm">
                    Defer
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </Panel>

        <div className="grid gap-4 lg:col-span-5">
          <Panel>
            <PanelHeader code="AI · RISK" title="Operational Risk Index" />
            <div className="space-y-3.5 p-4">
              <RiskIndicator label="Stockout probability · 7d" value={74} />
              <RiskIndicator label="Dispatch delay risk" value={38} />
              <RiskIndicator label="Damage exposure" value={52} />
              <RiskIndicator label="Supplier reliability gap" value={21} />
            </div>
          </Panel>
          <Panel>
            <PanelHeader code="MOV · 01" title="Stock Movement Flow" />
            <StockFlow />
          </Panel>
        </div>

        <Panel className="lg:col-span-4">
          <PanelHeader code="INV · 02" title="Stock Coverage" />
          <StockComparisonBars />
        </Panel>

        <div className="grid gap-4 lg:col-span-4">
          <Panel>
            <PanelHeader code="ORD · 03" title="Order Pipeline" />
            <OrderStatusSegments />
          </Panel>
          <Panel>
            <PanelHeader code="FIN · 04" title="Income vs Loss" />
            <IncomeLossChart />
          </Panel>
        </div>

        <div className="grid gap-4 lg:col-span-4">
          <Panel>
            <PanelHeader code="ZON · 05" title="Zone Utilization" />
            <UtilizationRadials />
          </Panel>
          <Panel>
            <PanelHeader code="DSP · 06" title="Dispatch Timeline" />
            <ol className="relative p-4 pl-7">
              <span className="absolute bottom-5 left-[1.35rem] top-5 w-px bg-border" />
              {dispatchTimeline.map((d) => (
                <li key={d.code} className="relative pb-3.5 last:pb-0">
                  <span className="absolute -left-[0.6rem] top-1.5 size-2 rounded-full bg-primary ring-4 ring-card" />
                  <div className="flex items-center gap-2">
                    <span className="data-figure text-xs text-foreground">{d.at}</span>
                    <span className="tech-label">{d.code}</span>
                    <StatusTag className="ml-auto" label={d.state} />
                  </div>
                  <div className="mt-0.5 text-[0.75rem] text-muted-foreground">{d.route}</div>
                </li>
              ))}
            </ol>
          </Panel>
        </div>

        <Panel className="lg:col-span-12">
          <PanelHeader code="ALR · 07" title="Live Exception Feed" />
          <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
            {[
              { t: "SKU-5518 below safety stock", s: "CRITICAL", i: ArrowDownRight },
              { t: "Lane 2 damage cluster (9 receipts)", s: "AI ALERT", i: ArrowDownRight },
              { t: "ORD-77121 pick time over SLA", s: "LOW STOCK", i: ArrowUpRight },
              { t: "Zone A at 88% capacity", s: "AI ALERT", i: ArrowUpRight },
            ].map((a) => (
              <div key={a.t} className="bg-card px-4 py-3">
                <StatusTag label={a.s} />
                <div className="mt-2 flex items-start gap-2 text-[0.8125rem] leading-snug text-foreground">
                  <a.i className="mt-0.5 size-3.5 shrink-0 text-primary" />
                  {a.t}
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}
