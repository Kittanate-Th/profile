"use client";

import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import { animate, splitText, stagger } from "animejs";
import data from "@/data/data.json";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string | null;
};

// Custom Arrow Components
function SampleNextArrow(props: any) {
  const { onClick } = props;
  return (
    <div
      className="absolute top-1/2 -right-12 z-10 -translate-y-1/2 cursor-pointer p-2 rounded-full bg-slate-800/50 hover:bg-slate-700/70 transition-colors hidden md:block"
      onClick={onClick}
    >
      <ChevronRightIcon className="h-6 w-6 text-slate-300" />
    </div>
  );
}

function SamplePrevArrow(props: any) {
  const { onClick } = props;
  return (
    <div
      className="absolute top-1/2 -left-12 z-10 -translate-y-1/2 cursor-pointer p-2 rounded-full bg-slate-800/50 hover:bg-slate-700/70 transition-colors hidden md:block"
      onClick={onClick}
    >
      <ChevronLeftIcon className="h-6 w-6 text-slate-300" />
    </div>
  );
}

export default function Projects() {
  const { projects } = data;

  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const titleEl = titleRef.current;
    const sliderEl = sliderRef.current;

    if (!sectionEl || !titleEl || !sliderEl) return;

    const splitTitle = splitText(titleEl, { chars: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(splitTitle.chars, {
              opacity: [0, 1],
              y: ["1rem", "0rem"],
              delay: stagger(30),
              duration: 600,
              ease: "outExpo",
            });

            animate(sliderEl, {
              opacity: [0, 1],
              y: ["2rem", "0rem"],
              delay: 300, 
              duration: 800,
              ease: "outExpo",
            });
          } else {
            animate(splitTitle.chars, {
              opacity: [1, 0],
              y: ["0rem", "-1rem"],
              duration: 300,
              ease: "inExpo",
            });

            animate(sliderEl, {
              opacity: [1, 0],
              y: ["0rem", "1rem"],
              duration: 300,
              ease: "inExpo",
            });
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: projects.length >= 3 ? 3 : projects.length,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    focusOnSelect: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    // Trigger custom event for the Mascot to hop in place
    beforeChange: () => {
      window.dispatchEvent(new Event("iguana-hop"));
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: projects.length >= 2 ? 2 : projects.length,
          centerMode: projects.length > 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          centerMode: false,
          arrows: false,
        },
      },
    ],
    appendDots: (dots: any) => (
      <div style={{ bottom: "-40px" }}>
        <ul className="flex justify-center gap-2 slick-dots-custom"> {dots} </ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-3 h-3 rounded-full bg-slate-600 hover:bg-blue-500 transition-colors cursor-pointer dot"></div>
    ),
  };

  return (
    <section id="projects" ref={sectionRef} className="w-full py-20 relative overflow-visible">
      
      <div className="flex flex-col gap-4 mb-12 px-4 md:px-0 overflow-hidden">
        <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold text-slate-50 relative inline-block w-fit pr-16">
          Projects
        </h2>
        <div className="w-16 h-1 bg-blue-600 rounded-full" />
      </div>

      <div className="relative">
        {/* Phantom Perch: Invisible box perfectly centered for the Iguana to sit on */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-sm h-10 pointer-events-none z-50" 
          data-iguana-perch="true" 
        />

        <div ref={sliderRef} className="px-8 md:px-12 opacity-0">
          <Slider {...settings} className="project-slider">
            {(projects as Project[]).map((project) => (
              <div key={project.id} className="p-4 outline-none">
                <div 
                  className="group flex flex-col bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl overflow-hidden transition-all duration-500 relative slider-card"
                  onMouseMove={handleMouseMove}
                >
                  <div 
                    className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100 z-20"
                    style={{
                      background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(59, 130, 246, 0.15), transparent 40%)`
                    }}
                  />

                  <div className="w-full h-48 bg-slate-800/80 border-b border-slate-700/50 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-slate-900/80 z-0"></div>
                    <span className="text-slate-600 font-medium z-10 opacity-50 group-hover:opacity-100 transition-all duration-500">
                      [ {project.title} Image ]
                    </span>
                    
                    <div className="absolute bottom-4 left-4 bg-slate-900/90 px-3 py-1.5 rounded-lg border border-blue-500/30 text-xs text-blue-300 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 tooltip z-20">
                      <span className="font-bold">{project.tags[0]}</span> - Main Tech Stack
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow z-10 bg-slate-900/90 relative">
                    <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md bg-slate-800/80 text-blue-300 border border-slate-700/50 group-hover:border-blue-500/30 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <p className="text-slate-400 text-sm leading-relaxed flex-grow line-clamp-3">
                      {project.description}
                    </p>

                    <div className="flex gap-4 mt-6 pt-4 border-t border-slate-800/80 relative z-30">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm font-medium text-slate-400 hover:text-white transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        GitHub
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}