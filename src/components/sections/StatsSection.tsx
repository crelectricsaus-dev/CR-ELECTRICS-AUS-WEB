import { stats } from "@/lib/site";

export function StatsSection() {
  return (
    <section className="bg-ink py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 lg:grid-cols-4 lg:px-8">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="font-display text-4xl font-extrabold text-white sm:text-5xl">{stat.value}</div>
            <div className="mt-2 text-sm font-medium uppercase tracking-wider text-white/50">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
