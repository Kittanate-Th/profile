import data from "@/data/data.json";

export default function About() {
  const { about } = data;

  return (
    <section id="about" className="section-padding">
      <h2 className="text-3xl font-bold text-slate-100 mb-2">About Me</h2>
      <div className="w-12 h-1 bg-brand-primary rounded mb-10" />

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Bio */}
        <div>
          <p className="text-slate-400 leading-relaxed text-lg">{about.bio}</p>
        </div>

        {/* Skills */}
        <div>
          <h3 className="text-slate-300 font-semibold mb-4 uppercase tracking-widest text-sm">
            Tech Stack
          </h3>
          <div className="flex flex-wrap gap-3">
            {about.skills.map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 rounded-lg bg-surface-card border border-surface-border
                           text-brand-secondary font-mono text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}