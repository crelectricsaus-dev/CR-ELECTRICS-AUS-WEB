import { ShieldCheck, BadgeCheck, Clock, Award } from "lucide-react";

const items = [
  { icon: ShieldCheck, label: "A-Grade Licensed Electrician" },
  { icon: BadgeCheck, label: "REC Licensed Electrical Contractor" },
  { icon: Award, label: "Fully Insured Workmanship" },
  { icon: Clock, label: "24/7 Emergency Response" },
];

export function TrustBar() {
  return (
    <section className="border-b border-ink/5 bg-white py-8">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 lg:grid-cols-4 lg:px-8">
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-electric/10 text-electric">
              <Icon className="size-5" />
            </span>
            <span className="text-sm font-semibold text-ink/80">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
