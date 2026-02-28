"use client";

import { useEffect, useRef } from "react";
import { animate, splitText, stagger } from "animejs";
import data from "@/data/data.json";

export default function Hero() {
  const { hero } = data;

  // Refs
  const sectionRef = useRef<HTMLElement>(null);
  const greetingRef = useRef<HTMLParagraphElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const rolesRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Animation Effect
  useEffect(() => {
    const sectionEl = sectionRef.current;
    const greetingEl = greetingRef.current;
    const nameEl = nameRef.current;
    const rolesEl = rolesRef.current;
    const btnEl = btnRef.current;

    if (!sectionEl || !greetingEl || !nameEl || !rolesEl || !btnEl) return;

    const splitName = splitText(nameEl, { chars: true });
    const splitGreeting = splitText(greetingEl, { words: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Intro Animations
            animate(splitGreeting.words, {
              opacity: [0, 1],
              y: ["1rem", "0rem"],
              delay: stagger(50),
              duration: 600,
              ease: "outExpo",
            });

            animate(splitName.chars, {
              opacity: [0, 1],
              y: ["2rem", "0rem"],
              rotateX: [90, 0],
              delay: stagger(30, { start: 200 }),
              duration: 800,
              ease: "outBack",
            });

            animate(rolesEl.children, {
              opacity: [0, 1],
              y: ["1rem", "0rem"],
              delay: stagger(100, { start: 600 }),
              duration: 600,
              ease: "outExpo",
            });

            animate(btnEl, {
              opacity: [0, 1],
              scale: [0.8, 1],
              delay: 1000,
              duration: 800,
              ease: "outElastic(1, .5)",
            });
          } else {
            // Outro Animations
            animate(splitGreeting.words, { opacity: [1, 0], y: ["0rem", "-1rem"], delay: stagger(10), duration: 300, ease: "inExpo" });
            animate(splitName.chars, { opacity: [1, 0], y: ["0rem", "-2rem"], rotateX: [0, -90], delay: stagger(10), duration: 300, ease: "inExpo" });
            animate(rolesEl.children, { opacity: [1, 0], y: ["0rem", "-1rem"], delay: stagger(10), duration: 300, ease: "inExpo" });
            animate(btnEl, { opacity: [1, 0], scale: [1, 0.9], duration: 300, ease: "inExpo" });
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(sectionEl);

    return () => {
      observer.disconnect();
      splitName.revert();
      splitGreeting.revert();
    };
  }, []);

  // Spawn a single bubble
  const spawnBubble = () => {
    const btn = btnRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const particle = document.createElement("div");

    const spawnX = rect.left + Math.random() * rect.width;
    const spawnY = rect.top;
    const size = 6 + Math.random() * 12;

    particle.style.cssText = `
      position: fixed;
      left: ${spawnX}px;
      top: ${spawnY}px;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: rgba(96, 165, 250, 0.25);
      border: 1px solid rgba(96, 165, 250, 0.8);
      box-shadow: 0 0 6px rgba(96,165,250,0.5), inset 0 0 4px rgba(255,255,255,0.2);
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
    `;

    document.body.appendChild(particle);

    const driftX = (Math.random() - 0.5) * 60;
    const floatY = -(160 + Math.random() * 120);

    animate(particle, {
      translateX: [0, driftX],
      translateY: [0, floatY],
      scale: [1, 0.1],
      opacity: [0.9, 0],
      duration: 1400 + Math.random() * 600,
      ease: "outCubic",
      onComplete: () => {
        if (document.body.contains(particle)) {
          document.body.removeChild(particle);
        }
      },
    });
  };

  const handleMouseEnter = () => {
    spawnBubble();
    intervalRef.current = setInterval(spawnBubble, 80);
  };

  const handleMouseLeave = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <section
      id="kittanate"
      ref={sectionRef}
      className="w-full flex justify-center items-center pt-32 pb-16 px-4 md:px-0"
    >
      <div data-iguana-perch className="flex flex-col md:flex-row items-center gap-8 bg-slate-900/40 backdrop-blur-md border border-slate-800 p-8 md:p-12 rounded-[2rem] w-full max-w-4xl relative overflow-hidden animate-breath-glow">
        {/* Background Glow data-iguana-perch */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600/0 via-blue-500/50 to-blue-600/0"></div>

        {/* Profile Image */}
        <div className="w-32 h-32 md:w-48 md:h-48 shrink-0 rounded-2xl overflow-hidden border border-slate-700 bg-slate-800 flex items-center justify-center">
          <img
            src="/mypic.jpg"
            alt="Profile Image"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text Content */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left z-10 perspective-1000">
          <p
            ref={greetingRef}
            className="text-blue-400 font-medium tracking-wide uppercase mb-2 text-sm"
          >
            {hero.greeting}
          </p>

          <h1
            ref={nameRef}
            className="text-4xl md:text-5xl font-bold text-slate-50 mb-3 origin-bottom"
          >
            {hero.name}
          </h1>

          <div
            ref={rolesRef}
            
            className="flex flex-wrap justify-center md:justify-start items-center gap-2 mb-8"
          >
            {hero.roles.map((role, index) => (
              <span
                key={index}
                className="text-sm md:text-base text-slate-400 opacity-0 inline-block"
              >
                {role}
                {index < hero.roles.length - 1 && (
                  <span className="hidden md:inline mx-3 text-slate-700">
                    |
                  </span>
                )}
              </span>
            ))}
          </div>

          <a
            ref={btnRef}
            href={hero.resumeUrl}
            download
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative inline-flex items-center gap-2 w-fit px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors duration-300 shadow-lg shadow-blue-500/20 opacity-0"
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
        </div>
      </div>
    </section>
  );
}