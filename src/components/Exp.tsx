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
};

export default function Experience() {
  const { experience } = data;

  // Refs
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Animation Effect
  useEffect(() => {
    const sectionEl = sectionRef.current;
    const titleEl = titleRef.current;
    const timelineEl = timelineRef.current;

    if (!sectionEl || !titleEl || !timelineEl) return;

    // Text Splitting
    const splitTitle = splitText(titleEl, { chars: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Intro Animations
            animate(splitTitle.chars, {
              opacity: [0, 1],
              y: ["1rem", "0rem"],
              delay: stagger(30),
              duration: 600,
              ease: "outExpo",
            });

            animate(timelineEl.children, {
              opacity: [0, 1],
              x: ["-2rem", "0rem"],
              delay: stagger(150, { start: 400 }), // Wait for title, then stagger cards
              duration: 800,
              ease: "outExpo",
            });
          } else {
            // Outro Animations
            animate(splitTitle.chars, {
              opacity: [1, 0],
              y: ["0rem", "-1rem"],
              duration: 300,
              ease: "inExpo",
            });

            animate(timelineEl.children, {
              opacity: [1, 0],
              x: ["0rem", "-1rem"],
              delay: stagger(50),
              duration: 300,
              ease: "inExpo",
            });
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(sectionEl);

    // Cleanup
    return () => {
      observer.disconnect();
      splitTitle.revert();
    };
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="w-full">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-12 overflow-hidden">
        <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold text-slate-50 ">
          Experience & Education
        </h2>
        <div className="w-16 h-1 bg-blue-600 rounded-full" />
      </div>

      <div className="relative ml-2 md:ml-6 mt-8">
        {/* Vertical Timeline Line */}
        <div className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-blue-600 via-slate-700 to-transparent" />

        {/* Timeline Items Wrapper */}
        <div ref={timelineRef} className="flex flex-col gap-10">
          {(experience as ExperienceItem[]).map((item) => (
            <div key={item.id} className="relative pl-8 md:pl-12 group opacity-0">
              {/* Timeline Dot */}
              <div
                className={`absolute -left-[7px] top-6 h-4 w-4 rounded-full border-4 border-slate-950 z-10 transition-all duration-300
                  ${
                    item.type === "work"
                      ? "bg-blue-500 group-hover:bg-blue-400 group-hover:shadow-[0_0_12px_#3b82f6]"
                      : "bg-cyan-500 group-hover:bg-cyan-400 group-hover:shadow-[0_0_12px_#22d3ee]"
                  }`}
              />

              {/* Experience Card */}
              <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 p-6 md:p-8 rounded-2xl shadow-xl hover:border-slate-700 transition-colors duration-300">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                  <div>
                    {/* Badge */}
                    <span
                      className={`inline-block text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full mb-3 border
                        ${
                          item.type === "work"
                            ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                            : "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                        }`}
                    >
                      {item.type === "work" ? "Work" : "Education"}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-100">
                      {item.title}
                    </h3>
                    <p className="text-slate-400 font-medium text-base mt-1">
                      {item.organization}
                    </p>
                  </div>

                  {/* Period Block */}
                  <div className="shrink-0 bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-700/50">
                    <p className="text-slate-300 font-mono text-sm">
                      {item.period}
                    </p>
                  </div>
                </div>

                <p className="text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}