import data from "@/data/data.json";

export default function Hero() {
  const { hero } = data;

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center section-padding"
    >
      <p className="text-brand-secondary font-mono mb-3 text-sm tracking-widest uppercase">
        {hero.greeting}
      </p>

      <h1 className="text-5xl md:text-7xl font-bold text-slate-100 mb-4">
        {hero.name}
      </h1>

      <div className="flex flex-wrap gap-3 mb-8">
        {hero.roles.map((role, index) => (
          <span
            key={index}
            className="text-lg md:text-2xl text-slate-400 font-light"
          >
            {role}
            {index < hero.roles.length - 1 && (
              <span className="ml-3 text-surface-border">|</span>
            )}
          </span>
        ))}
      </div>
        <a
        href={hero.resumeUrl}
        download
        className="inline-flex items-center gap-2 w-fit px-6 py-3 rounded-lg
                   bg-brand-primary hover:bg-indigo-500 
                   text-white font-medium transition-colors duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
        Download Resume
      </a>
    </section>
  );
}