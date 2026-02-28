"use client";

import { useEffect, useRef } from "react";
import { animate, splitText, stagger } from "animejs";
import data from "@/data/data.json";

export default function Contact() {
  const { contact } = data;

  // Refs
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  // Animation Effect
  useEffect(() => {
    const sectionEl = sectionRef.current;
    const titleEl = titleRef.current;
    const descEl = descRef.current;
    const cardsEl = cardsRef.current;
    const footerEl = footerRef.current;

    if (!sectionEl || !titleEl || !descEl || !cardsEl || !footerEl) return;

    // Text Splitting
    const splitTitle = splitText(titleEl, { chars: true });
    const splitDesc = splitText(descEl, { lines: true });

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

            animate(splitDesc.lines, {
              opacity: [0, 1],
              y: ["1rem", "0rem"],
              delay: stagger(60, { start: 200 }),
              duration: 800,
              ease: "outExpo",
            });

            animate(cardsEl.children, {
              opacity: [0, 1],
              y: ["2rem", "0rem"],
              delay: stagger(100, { start: 400 }),
              duration: 800,
              ease: "outExpo",
            });

            animate(footerEl, {
              opacity: [0, 1],
              y: ["1rem", "0rem"],
              delay: 800, // Wait for cards to finish
              duration: 800,
              ease: "outExpo",
            });
          } else {
            // Outro Animations
            animate(splitTitle.chars, { opacity: [1, 0], y: ["0rem", "-1rem"], duration: 300, ease: "inExpo" });
            animate(splitDesc.lines, { opacity: [1, 0], y: ["0rem", "-1rem"], duration: 300, ease: "inExpo" });
            animate(cardsEl.children, { opacity: [1, 0], y: ["0rem", "1rem"], duration: 300, ease: "inExpo" });
            animate(footerEl, { opacity: [1, 0], y: ["0rem", "1rem"], duration: 300, ease: "inExpo" });
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
      splitDesc.revert();
    };
  }, []);

  const links = [
    {
      label: "GitHub",
      href: contact.github,
      description: "Explore my source codes",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: contact.linkedin,
      description: "Let's connect professionally",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      label: "Email",
      href: `mailto:${contact.email}`,
      description: "Get in touch directly",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="contact" ref={sectionRef} className="w-full">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-10 overflow-hidden">
        <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold text-slate-50 ">
          Contact
        </h2>
        <div className="w-16 h-1 bg-blue-600 rounded-full" />
      </div>

      <div className="w-full">
        {/* Description */}
        <p ref={descRef} className="text-slate-400 text-lg leading-relaxed mb-8 max-w-2xl ">
          I'm currently open to new opportunities. Whether you have a question
          or just want to say hi!! my inbox is always open!
        </p>

        {/* Contact Links Grid */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-6">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-6 rounded-2xl opacity-0 bg-slate-900/40 backdrop-blur-md border border-slate-800 hover:border-blue-500/50 hover:bg-slate-800/60 hover:-translate-y-1 transition-all duration-300 shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="text-slate-400 group-hover:text-blue-400 transition-colors">
                  {link.icon}
                </div>
                <div>
                  <p className="text-slate-100 font-bold text-lg">{link.label}</p>
                  <p className="text-slate-500 text-sm mt-0.5">{link.description}</p>
                </div>
              </div>
              
              {/* Arrow Icon */}
              <div className="text-slate-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div ref={footerRef} className="mt-24 pt-8 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-4 opacity-0">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} <a href="https://www.facebook.com/zroyalz/" target="_blank" className="text-slate-400 hover:text-slate-300">Kittanate Thanee</a>. All rights reserved.
          </p>
          <p className="text-slate-600 text-sm">
            Built with <span className="text-slate-400"><a href="https://nextjs.org/" target="_blank" className="text-slate-400 hover:text-slate-300">Next.js(16.1.6) </a></span> &  
            <span className="text-blue-400/80">
            <a href="https://tailwindcss.com/" target="_blank" className="text-blue-400/80 hover:text-blue-300"> Tailwind CSS@4.2.1 </a>and   
            <a href="https://animejs.com/" target="_blank" className="text-blue-400/80 hover:text-blue-300"> Animejs@4.3.6</a></span>
          </p>
        </div>
      </div>
    </section>
  );
}