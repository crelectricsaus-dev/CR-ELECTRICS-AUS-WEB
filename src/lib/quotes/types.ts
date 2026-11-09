export type QuoteStatus = "Draft" | "Sent" | "Approved" | "Rejected" | "Completed";

export type TemplateKey =
  | "residential"
  | "commercial"
  | "industrial"
  | "medical"
  | "security"
  | "maintenance"
  | "blank";

export type BillingRateType = "licensed" | "non-certified" | "custom";

export type WorkerKey = "anthony" | "adrian" | "other";

export type LabourLine = {
  id: string;
  category: string;
  task: string;
  worker: WorkerKey;
  workerName: string;
  costRate: number;
  billingType: BillingRateType;
  billingRate: number;
  hours: number;
};

export type MaterialLine = {
  id: string;
  name: string;
  description: string;
  quantity: number;
  unitCost: number;
  markupPercent: number;
};

export type AdditionalChargeType =
  | "Equipment hire"
  | "Scissor lift hire"
  | "EWP hire"
  | "Specialist tools"
  | "Parking fees"
  | "Access fees"
  | "Disposal fees"
  | "Permit fees"
  | "After-hours surcharge"
  | "Emergency callout fee"
  | "Subcontractor costs"
  | "Custom";

export type AdditionalChargeLine = {
  id: string;
  type: AdditionalChargeType;
  description: string;
  amount: number;
};

export type TravelBand = "none" | "0-20" | "20-50" | "50+";

export type TravelFee = {
  band: TravelBand;
  distanceKm: number | "";
  travelTimeMins: number | "";
  fee: number;
};

export type PaymentScheduleType = "full-on-completion" | "deposit-final" | "progress";

export type Attachment = {
  id: string;
  name: string;
  dataUrl: string;
};

export type ClientDetails = {
  clientName: string;
  companyName: string;
  phone: string;
  email: string;
  siteAddress: string;
  billingAddress: string;
  sameAsSite: boolean;
};

export type JobDetails = {
  jobDescription: string;
  scopeOfWorks: string;
  siteNotes: string;
  clientRequirements: string;
  specialConditions: string;
};

export type Quote = {
  id: string;
  quoteNumber: string;
  projectName: string;
  dateIssued: string;
  expiryDate: string;
  status: QuoteStatus;
  template: TemplateKey;
  client: ClientDetails;
  job: JobDetails;
  attachments: Attachment[];
  labourLines: LabourLine[];
  materialLines: MaterialLine[];
  additionalCharges: AdditionalChargeLine[];
  travel: TravelFee;
  gstEnabled: boolean;
  termsAndConditions: string;
  paymentMethod: string;
  bankDetails: string;
  paymentSchedule: PaymentScheduleType;
  depositPercent: number;
  otherExpenses: number;
  notesInternal: string;
  createdAt: string;
  updatedAt: string;
};

export type QuoteTotals = {
  labourSubtotal: number;
  materialsSubtotal: number;
  additionalSubtotal: number;
  subtotal: number;
  gst: number;
  total: number;
  labourCost: number;
  materialsCost: number;
  totalCost: number;
  grossProfit: number;
  profitMargin: number;
};
