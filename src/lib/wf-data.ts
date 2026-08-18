export const revenueSeries = [
  { m: "JAN", revenue: 182, loss: 22 },
  { m: "FEB", revenue: 205, loss: 18 },
  { m: "MAR", revenue: 244, loss: 31 },
  { m: "APR", revenue: 231, loss: 26 },
  { m: "MAY", revenue: 288, loss: 19 },
  { m: "JUN", revenue: 316, loss: 24 },
  { m: "JUL", revenue: 349, loss: 17 },
  { m: "AUG", revenue: 372, loss: 21 },
];

export const stockBars = [
  { sku: "SKU-1042 · Cartons", label: "Cartons", onHand: 82, reserved: 12, gap: 6 },
  { sku: "SKU-2287 · Pallets", label: "Pallets", onHand: 61, reserved: 24, gap: 15 },
  { sku: "SKU-3390 · Drums", label: "Drums", onHand: 44, reserved: 18, gap: 38 },
  { sku: "SKU-4471 · Crates", label: "Crates", onHand: 91, reserved: 7, gap: 2 },
  { sku: "SKU-5518 · Sacks", label: "Sacks", onHand: 28, reserved: 22, gap: 50 },
];

export const orderStatusSegments = [
  { label: "PICKING", value: 34, tone: "primary" as const },
  { label: "PACKING", value: 21, tone: "gold" as const },
  { label: "READY", value: 18, tone: "success" as const },
  { label: "DISPATCHED", value: 27, tone: "info" as const },
];

export const utilizationZones = [
  { zone: "A", name: "Bulk Storage", used: 88 },
  { zone: "B", name: "Fast Pick", used: 64 },
  { zone: "C", name: "Cold Hold", used: 41 },
  { zone: "D", name: "Dispatch Bay", used: 73 },
];

export const dispatchTimeline = [
  { code: "DSP-9041", route: "Godown → Nashik Hub", at: "06:20", state: "DELIVERED" },
  { code: "DSP-9042", route: "Godown → Pune Depot", at: "08:05", state: "IN TRANSIT" },
  { code: "DSP-9043", route: "Godown → Surat Retail", at: "09:40", state: "DISPATCHED" },
  { code: "DSP-9044", route: "Godown → Mumbai DC", at: "11:15", state: "READY" },
  { code: "DSP-9045", route: "Godown → Indore Hub", at: "13:30", state: "PACKING" },
];

export const aiRecommendations = [
  {
    id: "FP-118",
    priority: "P1",
    title: "Replenish SKU-5518 before Thursday inbound peak",
    why: "Sacks fall below safety stock in 38h at current outbound velocity; 3 confirmed orders depend on it.",
    impact: "Protects ₹4.2L of confirmed revenue and avoids 2 partial dispatches.",
    action: "Raise PO with Meridian Mills for 400 sacks, dock slot 14:00.",
    confidence: 92,
  },
  {
    id: "FP-119",
    priority: "P2",
    title: "Rebalance Zone A overflow into Zone C",
    why: "Zone A at 88% utilization is slowing pick paths by an average of 42 seconds per line.",
    impact: "Recovers ~1.8h of picker time per shift.",
    action: "Move 60 pallets of slow movers to Zone C racks 12-18.",
    confidence: 78,
  },
  {
    id: "FP-120",
    priority: "P3",
    title: "Damage cluster detected on inbound lane 2",
    why: "Damaged-item reports on lane 2 are 3.4x baseline across the last 9 receipts.",
    impact: "Reduces write-off exposure of ₹64K per month.",
    action: "Audit lane 2 conveyor transfer and flag carrier Vertex Freight.",
    confidence: 66,
  },
];

export const twinZones = [
  { id: "A", name: "BULK STORAGE", x: 4, y: 8, w: 40, h: 34, density: 88, state: "CRITICAL" },
  { id: "B", name: "FAST PICK", x: 48, y: 8, w: 30, h: 22, density: 64, state: "PICKING" },
  { id: "C", name: "COLD HOLD", x: 48, y: 34, w: 30, h: 24, density: 41, state: "IN STOCK" },
  { id: "D", name: "PACKING FLOOR", x: 4, y: 46, w: 40, h: 20, density: 73, state: "PACKING" },
  { id: "E", name: "DISPATCH BAY", x: 4, y: 70, w: 74, h: 22, density: 58, state: "DISPATCHED" },
  { id: "F", name: "INBOUND DOCK", x: 82, y: 8, w: 14, h: 50, density: 35, state: "READY" },
];

export const orders = [
  {
    id: "ORD-77120",
    customer: "Kestrel Retail Pvt Ltd",
    barcode: "77120884301",
    items: 14,
    value: "₹2,84,500",
    stage: 3,
    status: "DISPATCHED",
  },
  {
    id: "ORD-77121",
    customer: "Northline Distributors",
    barcode: "77121993402",
    items: 6,
    value: "₹96,200",
    stage: 1,
    status: "PICKING",
  },
  {
    id: "ORD-77122",
    customer: "Vertex Freight Wholesale",
    barcode: "77122117503",
    items: 22,
    value: "₹4,12,900",
    stage: 2,
    status: "PACKING",
  },
  {
    id: "ORD-77123",
    customer: "Sundara Traders",
    barcode: "77123556604",
    items: 9,
    value: "₹1,38,700",
    stage: 4,
    status: "DELIVERED",
  },
];

export const orderStages = ["RECEIVED", "PICKING", "PACKING", "DISPATCH", "DELIVERED"];

export const networkChain = [
  { key: "BRANDS", detail: "18 supplier brands" },
  { key: "YOUR GODOWN", detail: "Primary node · Bhiwandi" },
  { key: "STORAGE", detail: "6 zones · 12,400 sq ft" },
  { key: "FULFILLMENT", detail: "Pick + pack cells" },
  { key: "DISPATCH", detail: "4 carrier lanes" },
  { key: "CUSTOMER", detail: "212 active accounts" },
];

export const calendarDays = Array.from({ length: 35 }, (_, i) => {
  const day = i - 3;
  return {
    day,
    income: day > 0 ? 20 + ((day * 37) % 80) : 0,
    loss: day > 0 ? (day * 13) % 30 : 0,
    orders: day > 0 ? (day * 7) % 22 : 0,
    dispatch: day > 0 ? (day * 11) % 18 : 0,
  };
});
