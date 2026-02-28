"use client";

import { useEffect, useRef } from "react";
import { animate, splitText, stagger } from "animejs";
import data from "@/data/data.json";

export default function About() {
  const { about } = data;

  const sectionRef     = useRef<HTMLElement>(null);
  const mainTitleRef   = useRef<HTMLHeadingElement>(null);
  const bioTitleRef    = useRef<HTMLHeadingElement>(null);
  const bioTextRef     = useRef<HTMLParagraphElement>(null);
  const skillsTitleRef = useRef<HTMLHeadingElement>(null);
  const hardSkillsRef  = useRef<HTMLDivElement>(null);
  const softSkillsRef  = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const section     = sectionRef.current;
    const mainTitle   = mainTitleRef.current;
    const bioTitle    = bioTitleRef.current;
    const bioText     = bioTextRef.current;
    const skillsTitle = skillsTitleRef.current;
    const hardSkills  = hardSkillsRef.current;
    const softSkills  = softSkillsRef.current;
    if (!section || !mainTitle || !bioTitle || !bioText || !skillsTitle || !hardSkills || !softSkills) return;

    const s = {
      main:   splitText(mainTitle,   { chars: true }),
      bio:    splitText(bioTitle,    { words: true }),
      text:   splitText(bioText,     { lines: true }),
      skills: splitText(skillsTitle, { words: true }),
    };

    const inn = { opacity: [0,1] as [number,number], y: ["1rem","0rem"] as [string,string] };
    const out = { opacity: [1,0] as [number,number], y: ["0rem","-1rem"] as [string,string] };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        animate(s.main.chars,    { ...inn, delay: stagger(60),             duration: 1500, ease: "outExpo" });
        animate(s.bio.words,     { ...inn, delay: stagger(40,{start:200}), duration: 600,  ease: "outExpo" });
        animate(s.text.lines,    { ...inn, delay: stagger(80,{start:400}), duration: 800,  ease: "outExpo" });
        animate(s.skills.words,  { ...inn, delay: stagger(40,{start:600}), duration: 600,  ease: "outExpo" });
        animate(hardSkills.children, { opacity:[0,1], x:["-1rem","0rem"], delay: stagger(100,{start:800}), duration: 600, ease: "outExpo" });
        animate(softSkills.children, { opacity:[0,1], x:["1rem","0rem"],  delay: stagger(100,{start:800}), duration: 600, ease: "outExpo" });
      } else {
        animate(s.main.chars,   { ...out, duration: 500, ease: "inExpo" });
        animate(s.bio.words,    { ...out, duration: 500, ease: "inExpo" });
        animate(s.text.lines,   { ...out, duration: 500, ease: "inExpo" });
        animate(s.skills.words, { ...out, duration: 500, ease: "inExpo" });
        animate(hardSkills.children, { opacity:[1,0], x:["0rem","-1rem"], duration: 500, ease: "inExpo" });
        animate(softSkills.children, { opacity:[1,0], x:["0rem","1rem"],  duration: 500, ease: "inExpo" });
      }
    }, { threshold: 0.15 });

    observer.observe(section);
    return () => { observer.disconnect(); Object.values(s).forEach(x => x.revert()); };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="w-full">

      <div className="flex flex-col gap-4 mb-10 overflow-hidden">
        <h2 ref={mainTitleRef} className="text-3xl md:text-4xl font-bold text-slate-50">About Me</h2>
        <div className="w-16 h-1 bg-blue-600 rounded-full"/>
      </div>

      <div className="flex flex-col gap-12">

        <div data-iguana-perch className="bg-slate-900/40 backdrop-blur-md border border-slate-800 p-8 rounded-2xl shadow-xl">
          <h3 ref={bioTitleRef} className="text-xl font-semibold text-slate-200 mb-4">Who am I?</h3>
          <p ref={bioTextRef} className="text-slate-400 leading-relaxed text-lg max-w-4xl">{about.bio}</p>
        </div>

        <div data-iguana-perch className="bg-slate-900/40 backdrop-blur-md border border-slate-800 p-8 rounded-2xl shadow-xl overflow-hidden">
          <div className="text-center mb-10">
            <h3 ref={skillsTitleRef} className="text-2xl font-bold text-slate-100 tracking-wider">HARD SKILLS & SOFT SKILLS</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-12 relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-slate-800 -translate-x-1/2"/>

            <div>
              <h4 className="text-xl font-semibold text-cyan-400 mb-6 text-center md:text-left">Hard Skills</h4>
              <div ref={hardSkillsRef} className="flex flex-col gap-6">
                {Object.entries(about.hardSkills).map(([cat, skills]) => (
                  <div key={cat} className="opacity-0">
                    <h5 className="text-slate-300 font-medium mb-3">{cat}:</h5>
                    <div className="flex flex-wrap gap-2">
                      {(skills as string[]).map(s => (
                        <span key={s} className="px-3 py-1.5 bg-slate-800/60 border border-slate-700/50 text-blue-300 text-sm font-medium rounded-lg hover:bg-slate-700 transition-colors">{s}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-blue-400 mb-6 text-center md:text-left">Soft Skills</h4>
              <ul ref={softSkillsRef} className="flex flex-col gap-4">
                {about.softSkills.map((skill: string, i: number) => (
                  <li key={i} className="opacity-0 flex items-start gap-3 text-slate-300 hover:text-slate-100 transition-colors">
                    <span className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"/>
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