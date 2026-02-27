import data from "@/data/data.json";

export default function Hero() {
  const { hero } = data;

  return (
    <section
      id="hero"
      className="w-full flex justify-center items-center pt-32 pb-16 px-4 md:px-0"
    >
      {/* Glassmorphism Hero Card */}
      <div className="flex flex-col md:flex-row items-center gap-8 bg-slate-900/40 backdrop-blur-md border border-slate-800 p-8 md:p-12 rounded-[2rem] w-full max-w-4xl shadow-2xl relative overflow-hidden">
        
        {/* Glow Effect บางๆ ด้านหลังการ์ด (อิงจาก Ref ที่อยากให้มีแสงนิดหน่อย ไม่ฉูดฉาด) */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600/0 via-blue-500/50 to-blue-600/0"></div>

        {/* Profile Image Space */}
        <div className="w-32 h-32 md:w-48 md:h-48 shrink-0 rounded-2xl overflow-hidden border border-slate-700 bg-slate-800 flex items-center justify-center">
          <img src="/mypic.jpg" alt="Profile Image" className="w-full h-full object-cover" />
        </div>

        {/* Text Content */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left z-10">
          <p className="text-blue-400 font-medium tracking-wide uppercase mb-2 text-sm">
            {hero.greeting}
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-50 mb-3">
            {hero.name}
          </h1>

          <div className="flex flex-wrap justify-center md:justify-start items-center gap-2 mb-8">
            {hero.roles.map((role, index) => (
              <span
                key={index}
                className="text-sm md:text-base text-slate-400"
              >
                {role}
                {index < hero.roles.length - 1 && (
                  <span className="hidden md:inline mx-3 text-slate-700">|</span>
                )}
              </span>
            ))}
          </div>

          <a
            href={hero.resumeUrl}
            download
            className="inline-flex items-center gap-2 w-fit px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors duration-300 shadow-lg shadow-blue-500/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
}