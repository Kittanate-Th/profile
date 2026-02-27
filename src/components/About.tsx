import data from "@/data/data.json";

export default function About() {
  const { about } = data;

  return (
    <section id="about" className="w-full">
      <div className="flex flex-col gap-4 mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-50">About Me</h2>
        <div className="w-16 h-1 bg-blue-600 rounded-full" />
      </div>

      <div className="flex flex-col gap-8">
        {/* Bio Card */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 p-8 rounded-2xl shadow-xl">
          <h3 className="text-xl font-semibold text-slate-200 mb-4">Who am I?</h3>
          <p className="text-slate-400 leading-relaxed text-lg max-w-4xl">
            {about.bio}
          </p>
        </div>

        {/* Skills & Expertise Card */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 p-8 rounded-2xl shadow-xl">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-slate-100 tracking-wider">HARD SKILLS & SOFT SKILLS</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-12 relative">
            {/* เส้นคั่นตรงกลาง (Vertical Divider) แสดงเฉพาะหน้าจอใหญ่ */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-slate-800 -translate-x-1/2"></div>

            {/* --- ฝั่งซ้าย: Hard Skills --- */}
            <div>
              <h4 className="text-xl font-semibold text-cyan-400 mb-6 text-center md:text-left">Hard Skills</h4>
              <div className="flex flex-col gap-6">
                {Object.entries(about.hardSkills).map(([category, skills]) => (
                  <div key={category}>
                    <h5 className="text-slate-300 font-medium mb-3">{category}:</h5>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <span 
                          key={skill} 
                          className="px-3 py-1.5 bg-slate-800/60 border border-slate-700/50 text-blue-300 text-sm font-medium rounded-lg hover:bg-slate-700 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* --- ฝั่งขวา: Soft Skills --- */}
            <div>
              <h4 className="text-xl font-semibold text-blue-400 mb-6 text-center md:text-left">Soft Skills</h4>
              <ul className="flex flex-col gap-4">
                {about.softSkills.map((skill, index) => (
                  <li key={index} className="flex items-start gap-3 text-slate-300 hover:text-slate-100 transition-colors">
                    {/* ไอคอน Bullet Point */}
                    <span className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
                    <span className="leading-relaxed text-base">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}