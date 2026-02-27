import data from "@/data/data.json";

type ExperienceItem = {
  id: string;
  type: "work" | "education";
  title: string;
  organization: string;
  period: string;
  description: string;
};

export default function Experience() {
  const { experience } = data;

  return (
    <section id="experience" className="section-padding">
      <h2 className="text-3xl font-bold text-slate-100 mb-2">
        Experience & Education
      </h2>
      <div className="w-12 h-1 bg-brand-primary rounded mb-10" />

      <div className="relative ml-4">
        {/* Vertical Line */}
        <div className="absolute left-0 top-0 h-full w-px bg-surface-border" />

        <div className="flex flex-col gap-10">
          {(experience as ExperienceItem[]).map((item) => (
            <div key={item.id} className="relative pl-8">
              {/* Dot on timeline */}
              <div
                className={`absolute -left-[5px] top-1 h-3 w-3 rounded-full border-2
                  ${
                    item.type === "work"
                      ? "bg-brand-primary border-brand-primary"
                      : "bg-brand-secondary border-brand-secondary"
                  }`}
              />

              {/* Badge */}
              <span
                className={`inline-block text-xs font-mono px-2 py-0.5 rounded mb-2
                  ${
                    item.type === "work"
                      ? "bg-indigo-500/20 text-brand-primary"
                      : "bg-cyan-500/20 text-brand-secondary"
                  }`}
              >
                {item.type === "work" ? "Work" : "Education"}
              </span>

              {/* Content */}
              <h3 className="text-slate-100 font-semibold text-lg leading-tight">
                {item.title}
              </h3>
              <p className="text-brand-secondary font-medium text-sm mt-0.5">
                {item.organization}
              </p>
              <p className="text-slate-500 font-mono text-xs mt-1 mb-3">
                {item.period}
              </p>
              <p className="text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}