"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { animate, createTimer, splitText, stagger } from "animejs";
import data from "@/data/data.json";

type Certificate = {
  id: string;
  name: string;
  issuer: string;
  credentialUrl: string;
  imageUrl: string;
  theme: string;
};

// ── Thai Corner Decoration ──────────
function ThaiCorners({ size = 48 }: { size?: number }) {
  const s = size;
  return (
    <>
      {/* Top Left Corner */}
      <svg
        width={s} height={s}
        viewBox="0 0 64 64"
        className="absolute top-0 left-0 z-10 pointer-events-none"
        style={{ filter: "drop-shadow(0 0 4px #ffd700aa)" }}
      >
        <path d="M2 100 L2 2 L100 2" fill="none" stroke="#ffd700" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M2 2 Q8 2 8 8 Q8 14 14 14 Q8 14 8 20 Q8 26 2 26" fill="none" stroke="#daa520" strokeWidth="1.2"/>
        <path d="M2 2 Q14 2 14 14 Q2 14 2 2" fill="#ffd70022" stroke="#ffd700" strokeWidth="1"/>
        <circle cx="2" cy="2" r="2.5" fill="#ffd700"/>
        <circle cx="14" cy="14" r="1.8" fill="#daa520"/>
        <circle cx="24" cy="2" r="1.5" fill="#b8860b"/>
        <circle cx="2" cy="24" r="1.5" fill="#b8860b"/>
        <path d="M6 2 Q6 6 2 6" fill="none" stroke="#ffd700" strokeWidth="1" opacity="0.7"/>
        <path d="M10 2 Q10 10 2 10" fill="none" stroke="#ffd700" strokeWidth="0.8" opacity="0.5"/>
      </svg>

      {/* Bottom Right Corner (Rotated 180deg) */}
      <svg
        width={s} height={s}
        viewBox="0 0 64 64"
        className="absolute bottom-0 right-0 z-10 pointer-events-none"
        style={{
          transform: "rotate(180deg)",
          filter: "drop-shadow(0 0 4px #ffd700aa)",
        }}
      >
        <path d="M2 100 L2 2 L100 2" fill="none" stroke="#ffd700" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M2 2 Q8 2 8 8 Q8 14 14 14 Q8 14 8 20 Q8 26 2 26" fill="none" stroke="#daa520" strokeWidth="1.2"/>
        <path d="M2 2 Q14 2 14 14 Q2 14 2 2" fill="#ffd70022" stroke="#ffd700" strokeWidth="1"/>
        <circle cx="2" cy="2" r="2.5" fill="#ffd700"/>
        <circle cx="14" cy="14" r="1.8" fill="#daa520"/>
        <circle cx="24" cy="2" r="1.5" fill="#b8860b"/>
        <circle cx="2" cy="24" r="1.5" fill="#b8860b"/>
        <path d="M6 2 Q6 6 2 6" fill="none" stroke="#ffd700" strokeWidth="1" opacity="0.7"/>
        <path d="M10 2 Q10 10 2 10" fill="none" stroke="#ffd700" strokeWidth="0.8" opacity="0.5"/>
      </svg>
    </>
  );
}

// ── Lightbox ───────────────────────────────────────────────
function Lightbox({ cert, onClose }: { cert: Certificate; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (overlayRef.current)
      animate(overlayRef.current, { opacity: [0, 1], duration: 250, easing: "easeOutQuad" });
    if (boxRef.current)
      animate(boxRef.current, { opacity: [0, 1], scale: [0.85, 1], duration: 400, easing: "easeOutBack" });
  }, []);

  const handleClose = useCallback(() => {
    if (boxRef.current)
      animate(boxRef.current, {
        opacity: [1, 0], scale: [1, 0.85], duration: 250, easing: "easeInQuad",
        onComplete: () => {
          onClose();
          // --- DISPATCH EVENT: Modal Closed ---
          window.dispatchEvent(new Event("modal-closed"));
        },
      });
    if (overlayRef.current)
      animate(overlayRef.current, { opacity: [1, 0], duration: 250 });
  }, [onClose]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && handleClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleClose]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
      style={{ opacity: 0 }}
      onClick={handleClose}
    >
      <div
        ref={boxRef}
        style={{ opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-surface-card p-8 flex flex-col items-center gap-6"
      >
        <button
          onClick={handleClose}
          className="self-end font-pixel text-xs text-slate-400 hover:text-yellow-400 transition-colors"
        >
          [ ESC ]
        </button>

        <div className="relative ">
          <div className="relative w-[510px] h-[391px] bg-surface-bg ">
            <Image src={cert.imageUrl} alt={cert.name} fill className="object-contain p-1" />
            <ThaiCorners size={80} />
          </div>
        </div>

        <div className="text-center">
          <p className="font-pixel text-slate-100 text-sm leading-relaxed mb-2">{cert.name}</p>
          <p className="text-slate-400 font-mono text-xs">{cert.issuer}</p>
        </div>

        <a
          href={cert.credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 font-pixel text-xs text-surface-bg"
          style={{
            background: "linear-gradient(135deg, #b8860b, #ffd700, #daa520)",
            boxShadow: "0 0 12px #ffd70066",
          }}
        >
          View Credential ↗
        </a>
      </div>
    </div>
  );
}

// ── CertCard ───────────────────────────────────────────────
function CertCard({ cert, onClick }: { cert: Certificate; onClick: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (cardRef.current)
      animate(cardRef.current, { scale: 1.06, translateY: -8, duration: 250, easing: "easeOutQuad" });
  };

  const handleMouseLeave = () => {
    if (cardRef.current)
      animate(cardRef.current, { scale: 1, translateY: 0, duration: 250, easing: "easeOutQuad" });
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-iguana-perch="true" 
      className="shrink-0 cursor-pointer w-72 bg-surface-card p-5 flex flex-col items-center gap-4"
      style={{ isolation: "isolate" }}
    >
      <div className="relative w-full">
        <div className="relative w-full h-48 bg-surface-bg ">
          <Image src={cert.imageUrl} alt={cert.name} fill className="object-contain p-1" />
        </div>
        <ThaiCorners size={48} />
      </div>

      <div className="text-center">
        <p className="font-pixel text-slate-100 text-xs leading-relaxed">{cert.name}</p>
        <p className="text-slate-500 font-mono text-xs mt-2">{cert.issuer}</p>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────
export default function Certificates() {
  const { certificates } = data as { certificates: Certificate[] };
  
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof createTimer> | null>(null);
  
  const posRef = useRef(0);
  const [selected, setSelected] = useState<Certificate | null>(null);

  const CARD_WIDTH = 288 + 32;
  const TOTAL_WIDTH = CARD_WIDTH * certificates.length;

  // Marquee Animation
  useEffect(() => {
    if (!marqueeRef.current) return;
    posRef.current = -TOTAL_WIDTH;

    timerRef.current = createTimer({
      duration: Infinity,
      onUpdate: () => {
        posRef.current += 0.5;
        if (posRef.current >= 0) posRef.current = -TOTAL_WIDTH;
        if (marqueeRef.current)
          marqueeRef.current.style.transform = `translateX(${posRef.current}px)`;
      },
    });

    return () => { timerRef.current?.pause(); };
  }, [TOTAL_WIDTH]);

  // Scroll-triggered Animation
  useEffect(() => {
    const sectionEl = sectionRef.current;
    const titleEl = titleRef.current;
    const containerEl = containerRef.current;

    if (!sectionEl || !titleEl || !containerEl) return;

    const splitTitle = splitText(titleEl, { chars: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(splitTitle.chars, { opacity: [0, 1], y: ["1rem", "0rem"], delay: stagger(30), duration: 600, ease: "outExpo" });
            animate(containerEl, { opacity: [0, 1], y: ["2rem", "0rem"], delay: 300, duration: 800, ease: "outExpo" });
          } else {
            animate(splitTitle.chars, { opacity: [1, 0], y: ["0rem", "-1rem"], duration: 300, ease: "inExpo" });
            animate(containerEl, { opacity: [1, 0], y: ["0rem", "1rem"], duration: 300, ease: "inExpo" });
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(sectionEl);

    return () => {
      observer.disconnect();
      splitTitle.revert();
    };
  }, []);

  const duplicated = [...certificates, ...certificates, ...certificates];

  return (
    <>
      {selected && <Lightbox cert={selected} onClose={() => setSelected(null)} />}

      <section id="certificates" ref={sectionRef} className="section-padding">
        <h2 ref={titleRef} className="text-3xl font-bold text-slate-100 mb-2 relative inline-block w-fit pr-16">
          Certificates
        </h2>
        <div className="w-12 h-1 mb-10" style={{ background: "linear-gradient(90deg, #b8860b, #ffd700, #daa520)" }} />

        <div ref={containerRef} className="w-full overflow-hidden relative py-8 opacity-0">
          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-surface-bg to-transparent z-20 pointer-events-none" />
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-surface-bg to-transparent z-20 pointer-events-none" />

          <div ref={marqueeRef} className="flex gap-8 w-max">
            {duplicated.map((cert, index) => (
              <CertCard
                key={`${cert.id}-${index}`}
                cert={cert}
                onClick={() => {
                  setSelected(cert);
                  // --- DISPATCH EVENT: Modal Opened ---
                  window.dispatchEvent(new Event("modal-open"));
                }}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}