"use client";

import { useEffect, useRef } from "react";
import { animate, splitText, stagger } from "animejs";
import data from "@/data/data.json";

const PARTICLE_ICONS: Record<string, { svg: string; color: string }> = {
  GitHub: {
    color: "#fbbf24",
    svg: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>`,
  },
  LinkedIn: {
    color: "#60a5fa",
    svg: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  },
  Email: {
    color: "#f87171",
    svg: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  },
};

const triggerParticles = (e: React.MouseEvent<HTMLAnchorElement>, label: string) => {
  const rect   = e.currentTarget.getBoundingClientRect();
  const startX = rect.left + rect.width  / 2;
  const startY = rect.top  + rect.height / 3;
  const icon   = PARTICLE_ICONS[label];
  if (!icon) return;

  for (let i = 0; i < 8; i++) {
    const el = document.createElement("div");
    // วาง element ที่ตำแหน่งเริ่มต้นโดยชดเชย center ด้วย margin แทน transform
    el.style.cssText = `position:fixed;left:${startX - 9}px;top:${startY - 9}px;pointer-events:none;color:${icon.color};filter:drop-shadow(0 0 6px currentColor);z-index:9999;`;
    el.innerHTML = icon.svg;
    document.body.appendChild(el);

    const angle    = (Math.random() * Math.PI) / 1.2 + Math.PI / 12;
    const velocity = 40 + Math.random() * 60;
    const tx       = Math.cos(angle) * velocity;
    const ty       = -(Math.sin(angle) * velocity) - 40;

    animate(el, {
      translateX: [0, tx],
      translateY: [0, ty],
      rotate: [0, (Math.random() - 0.5) * 360],
      scale:  [Math.random() * 0.5 + 0.5, 0],
      opacity:[1, 0],
      duration: 800 + Math.random() * 500,
      ease: "outCirc",
      complete: () => { if (document.body.contains(el)) document.body.removeChild(el); },
    });
  }
};

export default function Contact() {
  const { contact } = data;

  const sectionRef = useRef<HTMLElement>(null);
  const titleRef   = useRef<HTMLHeadingElement>(null);
  const descRef    = useRef<HTMLParagraphElement>(null);
  const cardsRef   = useRef<HTMLDivElement>(null);
  const footerRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title   = titleRef.current;
    const desc    = descRef.current;
    const cards   = cardsRef.current;
    const footer  = footerRef.current;
    if (!section || !title || !desc || !cards || !footer) return;

    const splitTitle = splitText(title, { chars: true });
    const splitDesc  = splitText(desc,  { lines: true });

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        animate(splitTitle.chars,  { opacity:[0,1], y:["1rem","0rem"], delay:stagger(30),          duration:600, ease:"outExpo" });
        animate(splitDesc.lines,   { opacity:[0,1], y:["1rem","0rem"], delay:stagger(60,{start:200}), duration:800, ease:"outExpo" });
        animate(cards.children,    { opacity:[0,1], y:["2rem","0rem"], delay:stagger(100,{start:400}), duration:800, ease:"outExpo" });
        animate(footer,            { opacity:[0,1], y:["1rem","0rem"], delay:800,               duration:800, ease:"outExpo" });
      } else {
        animate(splitTitle.chars, { opacity:[1,0], y:["0rem","-1rem"], duration:300, ease:"inExpo" });
        animate(splitDesc.lines,  { opacity:[1,0], y:["0rem","-1rem"], duration:300, ease:"inExpo" });
        animate(cards.children,   { opacity:[1,0], y:["0rem","1rem"],  duration:300, ease:"inExpo" });
        animate(footer,           { opacity:[1,0], y:["0rem","1rem"],  duration:300, ease:"inExpo" });
      }
    }, { threshold: 0.15 });

    observer.observe(section);
    return () => { observer.disconnect(); splitTitle.revert(); splitDesc.revert(); };
  }, []);

  const links = [
    {
      label: "GitHub",
      href: contact.github,
      description: "Explore my source codes",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: contact.linkedin,
      description: "Let's connect professionally",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
    {
      label: "Email",
      href: `mailto:${contact.email}`,
      description: "Get in touch directly",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
        </svg>
      ),
    },
  ];

  return (
    <section id="contact" ref={sectionRef} className="w-full">

      <div className="flex flex-col gap-4 mb-10 overflow-hidden">
        <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold text-slate-50">Contact</h2>
        <div className="w-16 h-1 bg-blue-600 rounded-full"/>
      </div>

      <div className="w-full">
        <p ref={descRef} className="text-slate-400 text-lg leading-relaxed mb-8 max-w-2xl">
          I'm currently open to new opportunities. Whether you have a question or just want to say hi, my inbox is always open!
        </p>

        <div ref={cardsRef} className="grid md:grid-cols-3 gap-6">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              data-iguana-hover          
              onMouseEnter={(e) => triggerParticles(e, link.label)}
              className="relative overflow-hidden group flex items-center justify-between p-6 rounded-2xl opacity-0 bg-slate-900/40 backdrop-blur-md border border-slate-800 hover:border-blue-500/50 hover:bg-slate-800/60 hover:-translate-y-1 transition-all duration-300 shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"/>

              <div className="flex items-center gap-4 relative z-10">
                <div className="text-slate-400 group-hover:text-blue-400 transition-colors">{link.icon}</div>
                <div>
                  <p className="text-slate-100 font-bold text-lg">{link.label}</p>
                  <p className="text-slate-500 text-sm mt-0.5">{link.description}</p>
                </div>
              </div>

              <div className="text-slate-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all relative z-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </a>
          ))}
        </div>

        <div ref={footerRef} className="mt-24 pt-8 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-4 opacity-0">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()}{" "}
            <a href="https://www.facebook.com/zroyalz/" target="_blank" className="text-slate-400 hover:text-slate-300">Kittanate Thanee</a>. All rights reserved.
          </p>
          <p className="text-slate-600 text-sm">
            Built with{" "}
            <a href="https://nextjs.org/" target="_blank" className="text-slate-400 hover:text-slate-300">Next.js</a> &{" "}
            <a href="https://tailwindcss.com/" target="_blank" className="text-blue-400/80 hover:text-blue-300">Tailwind CSS</a> and{" "}
            <a href="https://animejs.com/" target="_blank" className="text-blue-400/80 hover:text-blue-300">Anime.js</a>
          </p>
        </div>
      </div>
    </section>
  );
}