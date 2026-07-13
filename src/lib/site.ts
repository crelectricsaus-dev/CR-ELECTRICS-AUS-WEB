import type { PlaceholderPhotoKey } from "./placeholder-photos";

export const site = {
  name: "CR Electrics Australia",
  shortName: "CR Electrics",
  legalTagline: "Licensed Electrical Contractor",
  phone: "0434 353 334",
  phoneHref: "tel:+61434353334",
  email: "crelectricsaus@gmail.com",
  emailHref: "mailto:crelectricsaus@gmail.com",
  addressLocality: "Mill Park",
  addressRegion: "VIC",
  postcode: "3082",
  addressCountry: "AU",
  fullAddress: "Mill Park, VIC 3082",
  primaryArea: "Melbourne",
  secondaryArea: "Victoria",
  url: "https://crelectricsaustralia.com.au",
  hours: [
    { day: "Monday – Sunday", time: "7:00 AM – 6:00 PM" },
    { day: "After Hours", time: "Available for all urgent electrical enquiries" },
  ],
  licences: [
    {
      title: "A-Grade Electrician",
      description: "Fully licensed A-Grade electrical tradesperson qualified across domestic, commercial and industrial work.",
    },
    {
      title: "REC Licensed Electrical Contractor",
      description: "Registered Electrical Contractor, licensed to run and take legal responsibility for electrical work across Victoria.",
    },
  ],
  serviceAreas: [
    "Mill Park", "South Morang", "Epping", "Thomastown", "Bundoora", "Greensborough",
    "Doreen", "Mernda", "Preston", "Reservoir", "Northcote", "Heidelberg",
    "Melbourne CBD", "Docklands", "Melbourne Eastern Suburbs", "Melbourne Northern Suburbs",
    "Melbourne Western Suburbs", "Geelong", "Regional Victoria",
  ],
};

export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

export const serviceNav: NavItem[] = [
  { label: "Domestic Electrical", href: "/services/domestic-electrical", description: "Homes, renovations & new builds" },
  { label: "Commercial Electrical", href: "/services/commercial-electrical", description: "Offices, retail & fit outs" },
  { label: "Industrial Electrical", href: "/services/industrial-electrical", description: "Factories, warehouses & plants" },
  { label: "Medical Electrical", href: "/services/medical-electrical", description: "Clinics & healthcare facilities" },
  { label: "Security Systems", href: "/services/security-systems", description: "CCTV, access control & alarms" },
  { label: "Testing & Compliance", href: "/services/testing-compliance", description: "Test & tag, RCD & reporting" },
];

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Industries", href: "/industries" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export type ServiceCategory = {
  slug: string;
  name: string;
  shortName: string;
  cardTitle: string;
  tagline: string;
  summary: string;
  metaTitle: string;
  metaDescription: string;
  heroKeywords: string[];
  items: string[];
  icon: string;
  heroPhoto: PlaceholderPhotoKey;
  heroPhotoAlignRight?: boolean;
  heroPhotoPosition?: string;
};

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "domestic-electrical",
    name: "Domestic Electrical Services",
    shortName: "Domestic",
    cardTitle: "Domestic Electrical",
    tagline: "Trusted electricians for Melbourne homes",
    summary:
      "From new homes to full rewires, CR Electrics Australia delivers safe, code-compliant residential electrical work across Melbourne, backed by A-Grade licensed tradespeople.",
    metaTitle: "Domestic Electrician Melbourne | Residential Electrical Services | CR Electrics Australia",
    metaDescription:
      "Licensed domestic electrician servicing Melbourne & Victoria. Lighting, switchboards, rewiring, safety inspections & more. Call 0434 353 334.",
    heroKeywords: ["Electrician Melbourne", "Residential Electrician Melbourne", "Mill Park Electrician"],
    items: [
      "Lighting installation & upgrades", "Power point installation", "Switchboard upgrades",
      "Smoke alarm installation & compliance", "Ceiling fan installation", "Renovation electrical",
      "New home electrical fit outs", "Fault finding & diagnostics", "Electrical safety inspections",
      "Outdoor & garden lighting", "Rewiring & re-wiring services",
      "Appliance installation & hardwiring",
    ],
    icon: "Home",
    heroPhoto: "luxuryKitchen",
  },
  {
    slug: "commercial-electrical",
    name: "Commercial Electrical Services",
    shortName: "Commercial",
    cardTitle: "Commercial Electrical",
    tagline: "Electrical partners for Melbourne businesses",
    summary:
      "We deliver reliable commercial electrical services for offices, retail and hospitality fit outs across Melbourne and Victoria, minimising downtime and keeping your business compliant.",
    metaTitle: "Commercial Electrician Melbourne | Commercial Electrical Contractor | CR Electrics Australia",
    metaDescription:
      "Commercial electrical contractor servicing Melbourne businesses. Office & retail fit outs, maintenance, emergency lighting, data cabling & compliance. Call 0434 353 334.",
    heroKeywords: ["Commercial Electrician Melbourne", "Commercial Electrical Contractor Melbourne"],
    items: [
      "Office fit outs", "Retail fit outs", "Scheduled electrical maintenance", "Lighting upgrades & LED retrofits",
      "Emergency & exit lighting", "Power installations", "Data & network cabling", "Switchboard upgrades",
      "Electrical testing",
    ],
    icon: "Building2",
    heroPhoto: "officeWorkstations",
  },
  {
    slug: "industrial-electrical",
    name: "Industrial Electrical Services",
    shortName: "Industrial",
    cardTitle: "Industrial Electrical",
    tagline: "Heavy-duty electrical for Victorian industry",
    summary:
      "CR Electrics Australia supports factories, warehouses and manufacturing plants across Victoria with three-phase installations, industrial switchboards and preventative maintenance programs.",
    metaTitle: "Industrial Electrician Melbourne | Industrial Electrical Contractor Victoria | CR Electrics Australia",
    metaDescription:
      "Industrial electrical contractor for factories, warehouses & manufacturing across Victoria. Three-phase, switchboards, shutdowns & preventative maintenance. Call 0434 353 334.",
    heroKeywords: ["Industrial Electrician Melbourne", "Factory Electrician", "Warehouse Electrician"],
    items: [
      "Factory electrical installations", "Warehouse electrical & maintenance", "Manufacturing plant electrical",
      "Shutdown work", "Industrial preventative maintenance", "Three-phase installations",
      "Industrial switchboards", "Power distribution", "Control systems", "Industrial lighting",
      "Cable tray installation",
    ],
    icon: "Factory",
    heroPhoto: "factoryInterior",
  },
  {
    slug: "medical-electrical",
    name: "Medical Electrical Services",
    shortName: "Medical",
    cardTitle: "Medical Electrical",
    tagline: "Precision electrical for healthcare facilities",
    summary:
      "We provide compliant electrical solutions for medical and dental clinics across Melbourne, understanding the critical power and compliance standards healthcare facilities demand.",
    metaTitle: "Medical Electrician Melbourne | Healthcare Electrical Contractor | CR Electrics Australia",
    metaDescription:
      "Medical electrician for clinics, dental practices & healthcare facilities across Melbourne. Fit outs, critical power, compliance & maintenance. Call 0434 353 334.",
    heroKeywords: ["Medical Electrician Melbourne", "Healthcare Electrical Contractor Melbourne"],
    items: [
      "Medical clinic fit outs", "Medical equipment installation & wiring", "Healthcare facility electrical",
      "Critical power systems", "Compliance & certification", "Electrical servicing", "Scheduled maintenance", "Electrical testing",
    ],
    icon: "HeartPulse",
    heroPhoto: "hospitalCorridor",
  },
  {
    slug: "security-systems",
    name: "Security System Installation",
    shortName: "Security",
    cardTitle: "Security Systems",
    tagline: "Protecting Melbourne homes & businesses",
    summary:
      "From CCTV to access control, our licensed electricians design and install integrated security systems for residential, commercial and industrial sites across Victoria.",
    metaTitle: "CCTV & Security System Installation Melbourne | CR Electrics Australia",
    metaDescription:
      "CCTV, access control, video intercoms & alarm system installation across Melbourne. Commercial & industrial security specialists. Call 0434 353 334.",
    heroKeywords: ["CCTV Installation Melbourne", "Security System Installer Melbourne"],
    items: [
      "CCTV installation", "Intercom systems", "Access control systems", "Video intercoms", "Alarm systems",
      "Commercial security systems", "Industrial security systems", "Network cabling", "System maintenance & upgrades",
    ],
    icon: "ShieldCheck",
    heroPhoto: "cctv",
    heroPhotoPosition: "object-[center_20%]",
  },
  {
    slug: "testing-compliance",
    name: "Testing & Compliance",
    shortName: "Testing & Compliance",
    cardTitle: "Testing & Compliance",
    tagline: "Keep your site safe, legal & insurable",
    summary:
      "CR Electrics Australia provides thorough electrical testing and compliance services, giving Melbourne businesses the documentation and peace of mind required by law and insurers.",
    metaTitle: "Test and Tag & Electrical Compliance Melbourne | CR Electrics Australia",
    metaDescription:
      "Test & tag, RCD testing, emergency & exit lighting testing, thermal imaging and electrical compliance reports across Melbourne. Call 0434 353 334.",
    heroKeywords: ["Test and Tagging Melbourne", "Electrical Compliance Melbourne", "Emergency Lighting Testing Melbourne"],
    items: [
      "Test & Tag", "RCD testing", "Emergency lighting testing", "Exit light testing",
      "Electrical compliance reporting", "Electrical safety inspections", "Preventative maintenance programs",
      "Compliance certificates", "Scheduled maintenance",
    ],
    icon: "ClipboardCheck",
    heroPhoto: "switchboard",
  },
];

export type Industry = {
  name: string;
  description: string;
  icon: string;
};

export const industries: Industry[] = [
  { name: "Residential", description: "Homeowners, renovators & new home builders across Melbourne.", icon: "Home" },
  { name: "Retail", description: "Shopfitting, lighting design & maintenance for retail chains and independents.", icon: "ShoppingBag" },
  { name: "Office & Commercial", description: "Fit outs, energy efficiency and maintenance for corporate tenancies.", icon: "Building2" },
  { name: "Warehousing & Logistics", description: "High-bay lighting, three-phase power and switchboards for distribution centres.", icon: "Warehouse" },
  { name: "Manufacturing", description: "Industrial switchboards, power distribution and shutdown works for production lines.", icon: "Factory" },
  { name: "Healthcare & Medical", description: "Compliant fit outs and critical power for clinics and allied health.", icon: "HeartPulse" },
  { name: "Hospitality", description: "Restaurants, cafes and venues that need electrical work with zero disruption.", icon: "UtensilsCrossed" },
  { name: "Education", description: "Schools and childcare centres requiring safe, compliant electrical infrastructure.", icon: "GraduationCap" },
  { name: "Construction & Development", description: "Trade partnerships with builders across residential and commercial projects.", icon: "HardHat" },
];

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    name: "Marcus T.",
    role: "Facility Manager, Melbourne CBD",
    quote:
      "CR Electrics handled a full switchboard upgrade across our office tower with zero disruption to tenants. Professional, on time and the compliance paperwork was flawless.",
    rating: 5,
  },
  {
    name: "Sarah D.",
    role: "Practice Manager, Dental Clinic",
    quote:
      "They understood exactly what our clinic needed for compliance and critical power. Communication was excellent from quote through to sign-off.",
    rating: 5,
  },
  {
    name: "Daniel R.",
    role: "Operations Manager, Warehouse & Logistics",
    quote:
      "We use CR Electrics for all our preventative maintenance across two warehouses. Their reporting and thermal imaging inspections have caught issues before they became costly failures.",
    rating: 5,
  },
  {
    name: "Emily H.",
    role: "Homeowner, Mill Park",
    quote:
      "Rewired our whole house from top to bottom. Tidy workmanship, clear pricing and they left the place spotless. Highly recommend.",
    rating: 5,
  },
  {
    name: "James K.",
    role: "Store Owner, Retail Fit Out",
    quote:
      "Our shop fit out was completed on schedule despite a tight opening date. CR Electrics coordinated well with our builder and shopfitter.",
    rating: 5,
  },
];

export type Stat = { value: string; label: string };

export const stats: Stat[] = [
  { value: "Trusted", label: "Licensed Electrician" },
  { value: "8+", label: "Years Combined Experience" },
  { value: "5.0 Star", label: "Rated by Clients" },
  { value: "24/7", label: "Emergency Response" },
];

export type Project = {
  slug: string;
  title: string;
  category: "Commercial" | "Industrial" | "Medical" | "Residential";
  location: string;
  summary: string;
  scope: string[];
};

export const projects: Project[] = [
  {
    slug: "cbd-office-tower-switchboard-upgrade",
    title: "CBD Office Tower Switchboard Upgrade",
    category: "Commercial",
    location: "Melbourne CBD",
    summary: "Full switchboard replacement and distribution upgrade across a 12-storey commercial tower, staged after-hours to avoid tenant disruption.",
    scope: ["Main switchboard replacement", "Distribution board upgrades", "Emergency lighting compliance", "Load testing & certification"],
  },
  {
    slug: "logistics-warehouse-highbay-lighting",
    title: "Logistics Warehouse High-Bay Lighting Retrofit",
    category: "Industrial",
    location: "Northern Melbourne",
    summary: "LED high-bay lighting retrofit across a 15,000m² distribution centre, reducing energy usage while improving warehouse safety.",
    scope: ["High-bay LED retrofit", "Three-phase power upgrade", "Emergency lighting", "Preventative maintenance program"],
  },
  {
    slug: "dental-clinic-electrical-fitout",
    title: "Dental Clinic Electrical Fit Out",
    category: "Medical",
    location: "Bundoora",
    summary: "Complete electrical fit out for a new dental clinic, including critical power circuits, compliance testing and equipment hardwiring.",
    scope: ["Critical power circuits", "Equipment hardwiring", "Compliance certification", "Emergency lighting"],
  },
  {
    slug: "mill-park-luxury-home-rewire",
    title: "Mill Park Luxury Home Rewire & Lighting",
    category: "Residential",
    location: "Mill Park",
    summary: "Full home rewire with architectural lighting design and smart switching for a family home renovation.",
    scope: ["Full rewire", "Architectural lighting", "Smart switchboard"],
  },
  {
    slug: "retail-chain-fitout-rollout",
    title: "Retail Chain Multi-Site Fit Out Rollout",
    category: "Commercial",
    location: "Melbourne Metro",
    summary: "Electrical fit out rollout across five retail locations to a tight opening schedule, coordinated with builders and shopfitters.",
    scope: ["Retail fit outs", "Feature lighting", "Data cabling", "Compliance certification"],
  },
  {
    slug: "manufacturing-plant-shutdown",
    title: "Manufacturing Plant Scheduled Shutdown",
    category: "Industrial",
    location: "Epping",
    summary: "Planned shutdown works including power distribution upgrades and industrial switchboard maintenance across a manufacturing facility.",
    scope: ["Power distribution upgrades", "Switchboard maintenance", "Thermal imaging", "Compliance reporting"],
  },
];

export type FaqItem = { question: string; answer: string; category: string };

export const faqs: FaqItem[] = [
  {
    category: "General",
    question: "Is CR Electrics Australia fully licensed and insured?",
    answer:
      "Yes. We hold an A-Grade Electrician licence and are a REC Licensed Electrical Contractor, meaning we are qualified and legally authorised to carry out and take responsibility for electrical work across Victoria. We also carry full insurance for every job we complete.",
  },
  {
    category: "General",
    question: "What areas do you service?",
    answer:
      "We are based in Mill Park and service all of Melbourne as our primary area, with work carried out across all of Victoria as our secondary service area. We're also available for interstate commercial and industrial projects on request.",
  },
  {
    category: "General",
    question: "Do you provide free quotes?",
    answer:
      "Yes, we provide obligation-free quotes for domestic, commercial and industrial work. Call 0434 353 334 or submit an enquiry through our contact page and we'll get back to you promptly.",
  },
  {
    category: "General",
    question: "Do you offer emergency electrical services?",
    answer:
      "Yes, we offer after-hours emergency call-outs for urgent commercial and industrial electrical faults, including switchboard failures and loss of power.",
  },
  {
    category: "Domestic",
    question: "Can you help with a full home rewire?",
    answer:
      "Absolutely. We handle full and partial home rewires for renovations and older properties, ensuring your home meets current safety standards and is ready for modern appliances and EV charging.",
  },
  {
    category: "Commercial",
    question: "Can you work around our business hours to avoid disruption?",
    answer:
      "Yes, we regularly schedule commercial electrical work after-hours or on weekends to minimise disruption to your business operations, staff and customers.",
  },
  {
    category: "Commercial",
    question: "Do you provide ongoing maintenance contracts?",
    answer:
      "We offer scheduled maintenance programs for commercial and industrial clients, covering testing, compliance and preventative maintenance to keep your site safe and operational.",
  },
  {
    category: "Industrial",
    question: "Do you work on three-phase industrial installations?",
    answer:
      "Yes, three-phase installations, industrial switchboards and power distribution are core parts of our industrial electrical services across Victoria.",
  },
  {
    category: "Testing & Compliance",
    question: "What is included in a Test & Tag service?",
    answer:
      "Our test and tag service covers visual inspection and electrical testing of portable appliances and equipment, with compliant tagging and reporting suitable for workplace safety and insurance requirements.",
  },
  {
    category: "Testing & Compliance",
    question: "How often should emergency and exit lighting be tested?",
    answer:
      "Australian Standards require regular testing of emergency and exit lighting, typically every six months with an annual discharge test. We provide scheduled testing and full compliance documentation.",
  },
  {
    category: "Security",
    question: "Can you integrate CCTV with access control systems?",
    answer:
      "Yes, we design and install integrated security solutions combining CCTV, access control, intercoms and alarm systems for residential, commercial and industrial sites.",
  },
];
