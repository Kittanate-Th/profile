"use client";

import { useEffect, useRef } from "react";
import { animate } from "animejs";

export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // ซ่อนก่อน
    el.style.opacity = "0";
    el.style.transform = "translateY(48px)";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          animate(el, {
            opacity: [0, 1],
            translateY: [48, 0],
            duration: 700,
            delay: delay,
            easing: "easeOutQuad",
          });
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}