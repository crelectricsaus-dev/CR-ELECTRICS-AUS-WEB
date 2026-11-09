import type {
  AdditionalChargeType,
  BillingRateType,
  PaymentScheduleType,
  QuoteStatus,
  TemplateKey,
  TravelBand,
  WorkerKey,
} from "./types";

export const BILLING_RATES: Record<Exclude<BillingRateType, "custom">, { label: string; rate: number }> = {
  licensed: { label: "Licensed electrical work (certified)", rate: 130 },
  "non-certified": { label: "Non-certified electrical work", rate: 100 },
};

export const EMPLOYEES: Record<Exclude<WorkerKey, "other">, { name: string; costRate: number }> = {
  anthony: { name: "Anthony", costRate: 60 },
  adrian: { name: "Adrian", costRate: 40 },
};

export const WORKER_OPTIONS: { value: WorkerKey; label: string }[] = [
  { value: "anthony", label: "Anthony ($60/hr cost)" },
  { value: "adrian", label: "Adrian ($40/hr cost)" },
  { value: "other", label: "Other / Subcontractor" },
];

export type LabourCategoryGroup = {
  group: string;
  tasks: string[];
};

export const LABOUR_CATEGORIES: LabourCategoryGroup[] = [
  {
    group: "Electrical Work",
    tasks: [
      "Licensed electrical installation",
      "Electrical repairs",
      "Fault finding",
      "Switchboard upgrades",
      "New circuits",
      "Lighting installation",
      "Power installation",
      "Maintenance work",
    ],
  },
  {
    group: "Commercial",
    tasks: ["Fit outs", "Office electrical works", "Retail electrical works", "Maintenance", "Emergency lighting"],
  },
  {
    group: "Industrial",
    tasks: ["Factory works", "Machinery connections", "Three phase works", "Shutdown works", "Industrial maintenance"],
  },
  {
    group: "Medical",
    tasks: ["Medical fit outs", "Clinic electrical works", "Compliance works"],
  },
  {
    group: "Security",
    tasks: ["CCTV installation", "Access control", "Intercom systems", "Security wiring"],
  },
  {
    group: "Testing & Compliance",
    tasks: [
      "Test and Tag",
      "RCD testing",
      "Emergency lighting testing",
      "Electrical inspections",
      "Compliance certificates",
    ],
  },
];

export const ADDITIONAL_CHARGE_TYPES: AdditionalChargeType[] = [
  "Equipment hire",
  "Scissor lift hire",
  "EWP hire",
  "Specialist tools",
  "Parking fees",
  "Access fees",
  "Disposal fees",
  "Permit fees",
  "After-hours surcharge",
  "Emergency callout fee",
  "Subcontractor costs",
  "Custom",
];

export const TRAVEL_BANDS: { value: TravelBand; label: string; defaultFee: number | null }[] = [
  { value: "none", label: "0–20km — No fee", defaultFee: 0 },
  { value: "20-50", label: "20–50km — Travel charge applies", defaultFee: 55 },
  { value: "50+", label: "50km+ — Custom fee", defaultFee: null },
];

export const MATERIAL_PRESETS: { name: string; description: string; unitCost: number }[] = [
  { name: "Light fitting", description: "Supply and install light fitting", unitCost: 50 },
  { name: "LED downlight", description: "Supply and install LED downlight", unitCost: 25 },
  { name: "LED batten", description: "Supply and install LED batten fitting", unitCost: 45 },
  { name: "GPO (power point)", description: "Supply and install single/double GPO", unitCost: 18 },
  { name: "Light switch", description: "Supply and install light switch", unitCost: 15 },
  { name: "Smoke alarm", description: "Supply and install 240V interconnected smoke alarm", unitCost: 45 },
  { name: "Ceiling fan", description: "Supply and install ceiling fan", unitCost: 120 },
  { name: "Exhaust fan", description: "Supply and install exhaust fan", unitCost: 85 },
  { name: "Circuit breaker", description: "Supply and install circuit breaker", unitCost: 35 },
  { name: "RCD / safety switch", description: "Supply and install RCD safety switch", unitCost: 55 },
  { name: "Switchboard", description: "Supply and install distribution switchboard", unitCost: 650 },
  { name: "Data point", description: "Supply and install data/network point", unitCost: 40 },
  { name: "CCTV camera", description: "Supply and install CCTV camera", unitCost: 180 },
  { name: "Access control reader", description: "Supply and install access control reader", unitCost: 220 },
  { name: "Cable (per metre)", description: "Supply and install cabling, per metre", unitCost: 4 },
  { name: "Conduit (per metre)", description: "Supply and install conduit, per metre", unitCost: 6 },
];

export const PAYMENT_SCHEDULE_LABELS: Record<PaymentScheduleType, string> = {
  "full-on-completion": "Full payment on completion",
  "deposit-final": "Deposit + final payment",
  progress: "Progress payments",
};

export const QUOTE_STATUSES: QuoteStatus[] = ["Draft", "Sent", "Approved", "Rejected", "Completed"];

export const STATUS_STYLES: Record<QuoteStatus, string> = {
  Draft: "bg-mist-2 text-ink/70 border-ink/15",
  Sent: "bg-electric/10 text-electric-dark border-electric/30",
  Approved: "bg-emerald-50 text-emerald-700 border-emerald-300",
  Rejected: "bg-red-50 text-red-700 border-red-300",
  Completed: "bg-ink text-white border-ink",
};

export const DEFAULT_TERMS = `1. This quote is valid for 30 days from the date of issue unless otherwise stated.
2. Work will commence only after written or verbal acceptance of this quote.
3. Any additional work outside the quoted scope of works will require separate approval and may incur additional charges.
4. Variations to the agreed scope may incur additional charges, quoted prior to work proceeding where possible.
5. The client must provide safe and reasonable access to the site for the duration of the works.
6. Payment terms are as outlined in the Payment section of this quote.
7. Materials and product availability may vary; substitutions of equivalent quality may be made where required.
8. Electrical compliance certificates will be provided where required by law.
9. All work is completed in accordance with the relevant Australian Standards (AS/NZS 3000) and Victorian electrical safety regulations.`;

export const TEMPLATES: {
  key: TemplateKey;
  label: string;
  description: string;
  category: string;
  scopeStarter: string;
}[] = [
  {
    key: "residential",
    label: "Residential",
    description: "Small domestic electrical jobs",
    category: "Electrical Work",
    scopeStarter: "Domestic electrical works to be carried out in accordance with AS/NZS 3000 and manufacturer specifications.",
  },
  {
    key: "commercial",
    label: "Commercial",
    description: "Office / retail projects",
    category: "Commercial",
    scopeStarter: "Commercial electrical works to be carried out with minimal disruption to business operations, in accordance with AS/NZS 3000.",
  },
  {
    key: "industrial",
    label: "Industrial",
    description: "Factories / warehouses",
    category: "Industrial",
    scopeStarter: "Industrial electrical works to be carried out in accordance with AS/NZS 3000 and site safety requirements.",
  },
  {
    key: "medical",
    label: "Medical",
    description: "Clinics / healthcare",
    category: "Medical",
    scopeStarter: "Medical facility electrical works to be carried out in accordance with AS/NZS 3000, AS/NZS 3003 and relevant healthcare compliance requirements.",
  },
  {
    key: "security",
    label: "Security",
    description: "CCTV / access control",
    category: "Security",
    scopeStarter: "Security system installation works including supply, installation, configuration and testing of all equipment.",
  },
  {
    key: "maintenance",
    label: "Maintenance",
    description: "Recurring electrical work",
    category: "Electrical Work",
    scopeStarter: "Scheduled electrical maintenance works to be carried out in accordance with AS/NZS 3000 and site maintenance requirements.",
  },
  {
    key: "blank",
    label: "Blank quote",
    description: "Start from scratch",
    category: "Electrical Work",
    scopeStarter: "",
  },
];
