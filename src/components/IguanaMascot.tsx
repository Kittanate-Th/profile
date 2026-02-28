"use client";

import { useEffect, useRef } from "react";
import { animate } from "animejs";

const STYLES = `
  @keyframes tongue {
    0%,60%  { transform:scaleX(0); opacity:0 }
    70%     { transform:scaleX(.4); opacity:1 }
    85%     { transform:scaleX(1); opacity:1 }
    93%     { transform:scaleX(.1); opacity:1 }
    96%,100%{ transform:scaleX(0); opacity:0 }
  }
  @keyframes dewlap {
    0%,100%{ transform:rotate(0deg) }
    50%    { transform:rotate(-4deg) }
  }
  @keyframes spine {
    0%,100%{ fill:#4ade80 }
    50%    { fill:#86efac; filter:drop-shadow(0 0 6px #86efac80) }
  }
  @keyframes breathe {
    0%,100%{ transform:scaleY(1) }
    50%    { transform:scaleY(1.025) }
  }
  .ig-t  { animation:tongue  5s ease-in-out infinite; transform-origin:5px 68px }
  .ig-dw { animation:dewlap  3s ease-in-out infinite; transform-origin:28px 76px }
  .ig-sp { animation:spine  2.5s ease-in-out infinite }
  .ig-br { animation:breathe 3.5s ease-in-out infinite; transform-origin:105px 78px }
`;

const IGUANA_W = 160;
const IGUANA_H = 92;
const PERCH_OFFSET_X = 16; // px from right edge of card
const PERCH_OFFSET_Y = -IGUANA_H + 8; // sit on top of card

function IguanaSVG({ pupilRef }: { pupilRef: React.RefObject<SVGEllipseElement | null> }) {
  const tailBands = [
    [148,71,152,66,158,67,158,73,5],[160,66,165,61,171,63,170,69,5],
    [172,68,177,64,183,68,182,75,4],[180,79,184,75,188,79,186,86,4],[183,91,185,87,188,91,185,97,3],
  ];
  const spines = [
    [56,44,59,26],[68,40,71,20],[82,36,85,14],[97,33,100,10],
    [113,33,116,12],[127,36,130,18],[138,42,141,28],[147,49,149,38],
  ];
  const legs = [
    ["M126 94L134 112","M134 112L128 116M134 112L134 117M134 112L140 115"],
    ["M114 96L119 113","M119 113L113 117M119 113L119 118M119 113L125 116"],
    ["M85 92L80 110", "M80 110L74 114M80 110L80 115M80 110L86 113"],
    ["M95 94L93 111", "M93 111L87 115M93 111L93 116M93 111L99 114"],
  ];

  return (
    <svg width={IGUANA_W} height={IGUANA_H} viewBox="0 0 210 120" xmlns="http://www.w3.org/2000/svg" style={{overflow:"visible"}}>
      <path d="M143 74C162 64 180 66 190 80C197 90 193 105 180 106C168 107 160 97 165 88" stroke="#15803d" strokeWidth="16" strokeLinecap="round" fill="none"/>
      <path d="M165 88C170 82 175 80 176 86" stroke="#15803d" strokeWidth="9" strokeLinecap="round" fill="none"/>
      {tailBands.map(([x1,y1,x2,y2,x3,y3,x4,y4,w],i) => (
        <path key={i} d={`M${x1} ${y1}C${x2} ${y2} ${x3} ${y3} ${x4} ${y4}`} stroke="#052e16" strokeWidth={w} strokeLinecap="round" fill="none"/>
      ))}
      <g className="ig-br">
        <ellipse cx="105" cy="78" rx="44" ry="24" fill="#16a34a"/>
        <ellipse cx="105" cy="84" rx="36" ry="14" fill="#22c55e" opacity=".4"/>
      </g>
      {legs.map(([limb, claws], i) => (
        <g key={i}>
          <path d={limb}  stroke="#15803d" strokeWidth="6" strokeLinecap="round" fill="none"/>
          <path d={claws} stroke="#14532d" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        </g>
      ))}
      <path d="M66 56C74 48 88 52 90 64L84 88C72 86 64 76 66 56Z" fill="#16a34a"/>
      <polygon points="12,68 54,44 74,48 76,68 60,80 16,78" fill="#16a34a"/>
      <polygon points="14,72 52,66 60,80 16,78" fill="#22c55e" opacity=".5"/>
      <polygon points="4,67 12,63 13,72" fill="#15803d"/>
      <ellipse cx="9" cy="66" rx="2" ry="1.5" fill="#052e16"/>
      <ellipse cx="44" cy="55" rx="11" ry="9" fill="#14532d"/>
      <circle cx="44" cy="56" r="8" fill="#d97706"/>
      <ellipse ref={pupilRef} cx="44" cy="56" rx="2.5" ry="5.5" fill="#0c0a09"/>
      <circle cx="47" cy="52" r="1.8" fill="white" opacity=".55"/>
      <g className="ig-dw">
        <path d="M28 78C22 88 24 102 36 108C48 114 58 104 56 92C55 84 48 80 40 80Z" fill="#dc2626"/>
        <path d="M30 80C26 90 28 102 36 108M38 79C36 88 38 100 46 106" fill="none" stroke="#991b1b" strokeWidth="1.5" opacity=".8"/>
      </g>
      <path d="M56 44C80 35 115 34 145 48C152 52 154 58 148 64" fill="#15803d" stroke="#15803d" strokeWidth="3"/>
      {spines.map(([x1,y1,,y2],i) => (
        <polygon key={i} className="ig-sp" points={`${x1},${y1} ${x1+6},${y1} ${x1+3},${y2}`} style={{animationDelay:`${i*0.15}s`}}/>
      ))}
      <g className="ig-t">
        <line x1="5" y1="67" x2="-32" y2="62" stroke="#e11d48" strokeWidth="5" strokeLinecap="round"/>
        <line x1="-32" y1="62" x2="-58" y2="48" stroke="#e11d48" strokeWidth="4" strokeLinecap="round"/>
        <line x1="-32" y1="62" x2="-58" y2="76" stroke="#e11d48" strokeWidth="4" strokeLinecap="round"/>
        <circle cx="-58" cy="48" r="3.5" fill="#be123c"/>
        <circle cx="-58" cy="76" r="3.5" fill="#be123c"/>
      </g>
    </svg>
  );
}

export default function IguanaMascot() {
  const iguanaRef = useRef<HTMLDivElement>(null);
  const pupilRef  = useRef<SVGEllipseElement | null>(null);

  // Eye tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!iguanaRef.current || !pupilRef.current) return;
      const rect  = iguanaRef.current.getBoundingClientRect();
      const angle = Math.atan2(
        e.clientY - (rect.top  + rect.height * (56/120)),
        e.clientX - (rect.left + rect.width  * (44/210))
      );
      const d = 2.5;
      pupilRef.current.style.transform = `translate(${Math.cos(angle)*d}px,${Math.sin(angle)*d}px)`;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Perch jumping
  useEffect(() => {
    const iguana = iguanaRef.current;
    if (!iguana) return;

    // helper: compute target fixed position for a perch element
    const getTarget = (el: Element) => {
      const rect = el.getBoundingClientRect();
      return {
        // right edge of card, minus iguana width, minus small gap
        left: rect.right - IGUANA_W - PERCH_OFFSET_X + window.scrollX,
        // top of card, shifted up so iguana sits ON the card edge
        top:  rect.top   + window.scrollY + PERCH_OFFSET_Y,
      };
    };

    const jump = (targetEl: Element) => {
      const { left, top } = getTarget(targetEl);

      // Crouch
      animate(iguana, { scaleY:[1,.8,1], scaleX:[1,1.2,1], duration:140, ease:"easeInOut" });

      setTimeout(() => {
        // Arc jump: move left/top linearly, translateY curves up then down
        animate(iguana, { left, top, duration:460, ease:"linear" });
        animate(iguana, {
          translateY: [0, -90, 0],
          scaleX: [1, .7, 1],
          scaleY: [1, 1.4, 1],
          duration: 460,
          ease: "easeInOutQuad",
        });
        // Landing squash
        setTimeout(() => {
          animate(iguana, { scaleY:[.72,1], scaleX:[1.35,1], duration:250, ease:"easeOutBounce" });
        }, 400);
      }, 120);
    };

    // Observe all perch targets across the whole page
    const perches = Array.from(document.querySelectorAll("[data-iguana-perch]"));
    if (perches.length === 0) return;

    // Start at first perch
    const firstRect = perches[0].getBoundingClientRect();
    iguana.style.left = `${firstRect.right - IGUANA_W - PERCH_OFFSET_X + window.scrollX}px`;
    iguana.style.top  = `${firstRect.top   + window.scrollY + PERCH_OFFSET_Y}px`;

    const ratios = new Map<Element, number>();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => ratios.set(e.target, e.intersectionRatio));

      // Find perch with highest visibility
      let best: Element | null = null;
      let bestRatio = 0;
      ratios.forEach((ratio, el) => {
        if (ratio > bestRatio) { bestRatio = ratio; best = el; }
      });

      if (best && bestRatio > 0.1) jump(best);
    }, {
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0],
    });

    perches.forEach(p => {
      ratios.set(p, 0);
      observer.observe(p);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }}/>
      <div
        ref={iguanaRef}
        className="drop-shadow-2xl z-50"
        style={{
          position: "absolute",
          width:  IGUANA_W,
          height: IGUANA_H,
          pointerEvents: "none",
        }}
      >
        <IguanaSVG pupilRef={pupilRef}/>
      </div>
    </>
  );
}