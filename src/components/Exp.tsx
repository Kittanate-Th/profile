"use client";

import { useEffect, useRef } from "react";
import { animate, splitText, stagger } from "animejs";
import data from "@/data/data.json";

type ExperienceItem = {
  id: string;
  type: "work" | "education";
  title: string;
  organization: string;
  period: string;
  description: string;
  startDate?: string;
};

const getDuration = (startDateStr: string) => {
  const start = new Date(startDateStr);
  const end   = new Date();
  let months  = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  let days    = end.getDate() - start.getDate();
  if (days < 0) { months -= 1; days += new Date(end.getFullYear(), end.getMonth(), 0).getDate(); }
  return { months: Math.max(0, months), days: Math.max(0, days) };
};

const STYLES = `
  @keyframes radar-pulse {
    0%   { transform:scale(1); opacity:.8 }
    100% { transform:scale(3); opacity:0  }
  }
  .radar { animation:radar-pulse 2s cubic-bezier(.1,.7,1,.1) infinite }
`;

export default function Experience() {
  const { experience } = data;
  const sectionRef  = useRef<HTMLElement>(null);
  const titleRef    = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section  = sectionRef.current;
    const title    = titleRef.current;
    const timeline = timelineRef.current;
    if (!section || !title || !timeline) return;

    const splitTitle = splitText(title, { chars: true });

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        animate(splitTitle.chars,  { opacity:[0,1], y:["1rem","0rem"], delay:stagger(30),          duration:600, ease:"outExpo" });
        animate(timeline.children, { opacity:[0,1], x:["-2rem","0rem"], delay:stagger(150,{start:400}), duration:800, ease:"outExpo" });

        section.querySelectorAll<HTMLElement>(".job-counter").forEach((counter) => {
          const startDate = counter.dataset.start;
          if (!startDate) return;
          const { months, days } = getDuration(startDate);
          const mEl = counter.querySelector(".m-val");
          const dEl = counter.querySelector(".d-val");
          const DURATION = 4000;
          const ease = (t: number) => t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
          setTimeout(() => {
            const startTime = performance.now();
            const tick = (now: number) => {
              const t = Math.min((now - startTime) / DURATION, 1);
              const e = ease(t);
              if (mEl) mEl.textContent = String(Math.round(e * months));
              if (dEl) dEl.textContent = String(Math.round(e * days));
              if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }, 700);
        });
      } else {
        animate(splitTitle.chars,  { opacity:[1,0], y:["0rem","-1rem"], duration:300, ease:"inExpo" });
        animate(timeline.children, { opacity:[1,0], x:["0rem","-1rem"], delay:stagger(50), duration:300, ease:"inExpo" });
      }
    }, { threshold: 0.15 });

    observer.observe(section);
    return () => { observer.disconnect(); splitTitle.revert(); };
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="w-full">
      <style dangerouslySetInnerHTML={{ __html: STYLES }}/>

      <div className="flex flex-col gap-4 mb-12 overflow-hidden">
        <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold text-slate-50">Experience & Education</h2>
        <div className="w-16 h-1 bg-blue-600 rounded-full"/>
      </div>

      <div className="relative ml-2 md:ml-6 mt-8">
        <div className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-blue-600 via-slate-700 to-transparent"/>

        <div ref={timelineRef} className="flex flex-col gap-10">
          {(experience as ExperienceItem[]).map((item, index) => {
            const isWork = item.type === "work";
            const color  = isWork ? "blue" : "cyan";

            return (
              <div key={item.id} className="relative pl-8 md:pl-12 group opacity-0">

                <div className="absolute -left-[7px] top-6 w-4 h-4 z-10">
                  <div className={`absolute inset-0 rounded-full radar bg-${color}-500`} style={{ animationDelay:`${index*0.4}s` }}/>
                  <div className={`relative w-full h-full rounded-full border-4 border-slate-950 bg-${color}-500 transition-all duration-300 group-hover:bg-${color}-400 group-hover:shadow-[0_0_12px_var(--tw-shadow-color)]`}
                       style={{ "--tw-shadow-color": isWork ? "#3b82f6" : "#22d3ee" } as React.CSSProperties}/>
                </div>

                <div data-iguana-perch className="bg-slate-900/40 backdrop-blur-md border border-slate-800 p-6 md:p-8 rounded-2xl shadow-xl hover:border-slate-700 transition-colors duration-300 relative z-20">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
                    <div>
                      <span className={`inline-block text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full mb-3 border bg-${color}-500/10 text-${color}-400 border-${color}-500/20`}>
                        {isWork ? "Work" : "Education"}
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold text-slate-100">{item.title}</h3>
                      <p className="text-slate-400 font-medium text-base mt-1">{item.organization}</p>
                    </div>

                    <div className="shrink-0 bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-700/50 text-right self-start">
                      <p className="text-slate-300 font-mono text-sm whitespace-nowrap">{item.period}</p>
                      {item.startDate && (
                        <div className="job-counter flex items-center justify-end gap-1.5 mt-1.5 font-mono text-xs text-slate-400" data-start={item.startDate}>
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse inline-block"/>
                          <span className="m-val font-bold tabular-nums text-slate-300">0</span>
                          <span>months</span>
                          <span className="d-val font-bold tabular-nums text-slate-300 ml-0.5">0</span>
                          <span>days</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <ul className="flex flex-col gap-3">
                    {item.description.split(/•|\n/).map(p => p.trim()).filter(Boolean).map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-slate-400 leading-relaxed group/item">
                        <span className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-slate-600 group-hover/item:bg-blue-400 transition-colors duration-300"/>
                        <span className="group-hover/item:text-slate-200 transition-colors duration-300 text-sm md:text-base">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}