"use client";

import { useEffect, useRef } from "react";
import { animate, splitText, stagger } from "animejs";
import data from "@/data/data.json";

export default function About() {
  const { about } = data;

  // Refs
  const sectionRef = useRef<HTMLElement>(null);
  const mainTitleRef = useRef<HTMLHeadingElement>(null);
  const bioTitleRef = useRef<HTMLHeadingElement>(null);
  const bioTextRef = useRef<HTMLParagraphElement>(null);
  const skillsTitleRef = useRef<HTMLHeadingElement>(null);
  const hardSkillsRef = useRef<HTMLDivElement>(null);
  const softSkillsRef = useRef<HTMLUListElement>(null);

  // Animation Effect
  useEffect(() => {
    const sectionEl = sectionRef.current;
    const mainTitleEl = mainTitleRef.current;
    const bioTitleEl = bioTitleRef.current;
    const bioTextEl = bioTextRef.current;
    const skillsTitleEl = skillsTitleRef.current;
    const hardSkillsEl = hardSkillsRef.current;
    const softSkillsEl = softSkillsRef.current;

    if (
      !sectionEl ||
      !mainTitleEl ||
      !bioTitleEl ||
      !bioTextEl ||
      !skillsTitleEl ||
      !hardSkillsEl ||
      !softSkillsEl
    )
      return;

    // Text Splitting
    const splitMainTitle = splitText(mainTitleEl, { chars: true });
    const splitBioTitle = splitText(bioTitleEl, { words: true });
    const splitBioText = splitText(bioTextEl, { lines: true });
    const splitSkillsTitle = splitText(skillsTitleEl, { words: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Intro Animations
            animate(splitMainTitle.chars, {
              opacity: [0, 1],
              y: ["1rem", "0rem"],
              delay: stagger(60),
              duration: 1500,
              ease: "outExpo",
            });

            animate(splitBioTitle.words, {
              opacity: [0, 1],
              y: ["1rem", "0rem"],
              delay: stagger(40, { start: 200 }),
              duration: 600,
              ease: "outExpo",
            });

            animate(splitBioText.lines, {
              opacity: [0, 1],
              y: ["1rem", "0rem"],
              delay: stagger(80, { start: 400 }),
              duration: 800,
              ease: "outExpo",
            });

            animate(splitSkillsTitle.words, {
              opacity: [0, 1],
              y: ["1rem", "0rem"],
              delay: stagger(40, { start: 600 }),
              duration: 600,
              ease: "outExpo",
            });

            animate(hardSkillsEl.children, {
              opacity: [0, 1],
              x: ["-1rem", "0rem"],
              delay: stagger(100, { start: 800 }),
              duration: 600,
              ease: "outExpo",
            });

            animate(softSkillsEl.children, {
              opacity: [0, 1],
              x: ["1rem", "0rem"],
              delay: stagger(100, { start: 800 }),
              duration: 600,
              ease: "outExpo",
            });
          } else {
            // Outro Animations
            animate(splitMainTitle.chars, { opacity: [1, 0], y: ["0rem", "-1rem"], duration: 500, ease: "inExpo" });
            animate(splitBioTitle.words, { opacity: [1, 0], y: ["0rem", "-1rem"], duration: 500, ease: "inExpo" });
            animate(splitBioText.lines, { opacity: [1, 0], y: ["0rem", "-1rem"], duration: 500, ease: "inExpo" });
            animate(splitSkillsTitle.words, { opacity: [1, 0], y: ["0rem", "-1rem"], duration: 500, ease: "inExpo" });
            animate(hardSkillsEl.children, { opacity: [1, 0], x: ["0rem", "-1rem"], duration: 500, ease: "inExpo" });
            animate(softSkillsEl.children, { opacity: [1, 0], x: ["0rem", "1rem"], duration: 500, ease: "inExpo" });
          }
        });
      },
      { threshold: 0.15 } // Trigger when 15% of the section is visible
    );

    observer.observe(sectionEl);

    // Cleanup
    return () => {
      observer.disconnect();
      splitMainTitle.revert();
      splitBioTitle.revert();
      splitBioText.revert();
      splitSkillsTitle.revert();
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="w-full">
      {/* Main Header */}
      <div className="flex flex-col gap-4 mb-10 overflow-hidden">
        <h2 ref={mainTitleRef} className="text-3xl md:text-4xl font-bold text-slate-50">
          About Me
        </h2>
        <div className="w-16 h-1 bg-blue-600 rounded-full" />
      </div>

      <div className="flex flex-col gap-8">
        {/* Bio Card */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 p-8 rounded-2xl shadow-xl">
          <h3 ref={bioTitleRef} className="text-xl font-semibold text-slate-200 mb-4">
            Who am I?
          </h3>
          <p ref={bioTextRef} className="text-slate-400 leading-relaxed text-lg max-w-4xl">
            {about.bio}
          </p>
        </div>

        {/* Skills & Expertise Card */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 p-8 rounded-2xl shadow-xl overflow-hidden">
          <div className="text-center mb-10">
            <h3 ref={skillsTitleRef} className="text-2xl font-bold text-slate-100 tracking-wider">
              HARD SKILLS & SOFT SKILLS
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-12 relative">
            {/* Vertical Divider */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-slate-800 -translate-x-1/2"></div>

            {/* Hard Skills */}
            <div>
              <h4 className="text-xl font-semibold text-cyan-400 mb-6 text-center md:text-left">
                Hard Skills
              </h4>
              <div ref={hardSkillsRef} className="flex flex-col gap-6">
                {Object.entries(about.hardSkills).map(([category, skills]) => (
                  <div key={category} className="opacity-0">
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

            {/* Soft Skills */}
            <div>
              <h4 className="text-xl font-semibold text-blue-400 mb-6 text-center md:text-left">
                Soft Skills
              </h4>
              <ul ref={softSkillsRef} className="flex flex-col gap-4">
                {about.softSkills.map((skill, index) => (
                  <li
                    key={index}
                    className="opacity-0 flex items-start gap-3 text-slate-300 hover:text-slate-100 transition-colors"
                  >
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