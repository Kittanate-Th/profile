"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Slider from "react-slick";
import { animate, splitText, stagger } from "animejs";
import data from "@/data/data.json";
import { ChevronRightIcon, ChevronLeftIcon, XMarkIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string | null;
  image?: string;
  longDescription?: string;
  features?: string[];
};

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    if (overlayRef.current) {
      animate(overlayRef.current, { opacity: [0, 1], duration: 300, easing: "easeOutQuad" });
    }
    
    if (boxRef.current) {
      animate(boxRef.current, { 
        opacity: [0, 1], 
        scale: [0.95, 1], 
        translateY: ["2rem", "0rem"], 
        duration: 500, 
        easing: "easeOutExpo" 
      });
    }

    if (contentRef.current) {
      const elements = contentRef.current.children;
      animate(elements, {
        opacity: [0, 1],
        translateY: ["1rem", "0rem"],
        delay: stagger(60, { start: 200 }),
        duration: 600,
        easing: "easeOutExpo"
      });
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleClose = useCallback(() => {
    if (boxRef.current) {
      animate(boxRef.current, {
        opacity: [1, 0], 
        scale: [1, 0.95], 
        translateY: ["0rem", "1rem"], 
        duration: 250, 
        easing: "easeInQuad",
        onComplete: () => {
          onClose();
          window.dispatchEvent(new Event("modal-closed"));
        },
      });
    }
    if (overlayRef.current) {
      animate(overlayRef.current, { opacity: [1, 0], duration: 250 });
    }
  }, [onClose]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && handleClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleClose]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 backdrop-blur-sm px-4 md:px-8 py-6 md:py-10"
      style={{ opacity: 0 }}
      onClick={handleClose}
    >
      <div
        ref={boxRef}
        style={{ opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col max-h-full overflow-hidden relative"
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 bg-slate-900/50 hover:bg-slate-800 rounded-full text-slate-300 hover:text-white transition-colors"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        <div className="w-full h-48 md:h-72 bg-slate-800 relative border-b border-slate-700/50 overflow-hidden shrink-0 flex items-center justify-center">
          {project.image ? (
            <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-90" />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-slate-900 z-0 flex items-center justify-center">
               <span className="text-slate-500 font-mono">[ Image Overview: {project.title} ]</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
        </div>

        <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
          <div ref={contentRef} className="flex flex-col gap-6">
            
            <div className="flex flex-wrap gap-2 opacity-0">
              {project.tags.map((tag) => (
                <span key={tag} className="text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {tag}
                </span>
              ))}
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-slate-50 opacity-0">{project.title}</h3>
            
            <p className="text-slate-300 leading-relaxed text-base md:text-lg opacity-0">
              {project.longDescription || project.description}
            </p>

            {project.features && project.features.length > 0 && (
              <div className="opacity-0">
                <h4 className="text-lg font-semibold text-slate-100 mb-4 border-b border-slate-800 pb-2">Key Features & Architecture</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-400">
                      <CheckCircleIcon className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-800 opacity-0">
              {project.githubUrl !== "#" && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-medium transition-colors border border-slate-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  View Source Code
                </a>
              )}
              {project.liveUrl && project.liveUrl !== "#" && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/20"
                >
                  Live Preview
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

function SampleNextArrow(props: any) {
  const { onClick } = props;
  return (
    <div className="absolute top-1/2 -right-12 z-10 -translate-y-1/2 cursor-pointer p-2 rounded-full bg-slate-800/50 hover:bg-slate-700/70 transition-colors hidden md:block" onClick={onClick}>
      <ChevronRightIcon className="h-6 w-6 text-slate-300" />
    </div>
  );
}

function SamplePrevArrow(props: any) {
  const { onClick } = props;
  return (
    <div className="absolute top-1/2 -left-12 z-10 -translate-y-1/2 cursor-pointer p-2 rounded-full bg-slate-800/50 hover:bg-slate-700/70 transition-colors hidden md:block" onClick={onClick}>
      <ChevronLeftIcon className="h-6 w-6 text-slate-300" />
    </div>
  );
}

export default function Projects() {
  const { projects } = data;

  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
            animate(splitTitle.chars, { opacity: [0, 1], y: ["1rem", "0rem"], delay: stagger(30), duration: 600, ease: "outExpo" });
            animate(sliderEl, { opacity: [0, 1], y: ["2rem", "0rem"], delay: 300, duration: 800, ease: "outExpo" });
          } else {
            animate(splitTitle.chars, { opacity: [1, 0], y: ["0rem", "-1rem"], duration: 300, ease: "inExpo" });
            animate(sliderEl, { opacity: [1, 0], y: ["0rem", "1rem"], duration: 300, ease: "inExpo" });
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

  const handleOpenModal = (project: Project) => {
    setSelectedProject(project);
    window.dispatchEvent(new Event("modal-open")); 
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
    beforeChange: () => {
      window.dispatchEvent(new Event("iguana-hop"));
    },
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: projects.length >= 2 ? 2 : projects.length, centerMode: projects.length > 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1, centerMode: false, arrows: false } },
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
    <>
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}

      <section id="projects" ref={sectionRef} className="w-full py-20 relative overflow-visible">
        <div className="flex flex-col gap-4 mb-12 px-4 md:px-0 overflow-hidden">
          <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold text-slate-50 relative inline-block w-fit pr-16">
            Projects
          </h2>
          <div className="w-16 h-1 bg-blue-600 rounded-full" />
        </div>

        <div className="relative">
          <div className="absolute top-0 left-0 w-full h-10 pointer-events-none z-50 flex justify-center">
            <div className="w-full max-w-[340px] h-full" data-iguana-perch="true" />
          </div>

          <div ref={sliderRef} className="px-8 md:px-12 opacity-0">
            <Slider {...settings} className="project-slider">
              {(projects as Project[]).map((project) => (
                <div key={project.id} className="p-4 outline-none">
                  
                  <div 
                    onClick={() => handleOpenModal(project)}
                    className="group cursor-pointer flex flex-col bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl overflow-hidden transition-all duration-500 relative slider-card hover:-translate-y-2 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10"
                    onMouseMove={handleMouseMove}
                  >
                    <div 
                      className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100 z-20"
                      style={{
                        background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(59, 130, 246, 0.15), transparent 40%)`
                      }}
                    />

                    <div className="w-full h-48 bg-slate-800/80 border-b border-slate-700/50 flex items-center justify-center relative overflow-hidden">
                      {project.image ? (
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
                      ) : (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-slate-900/80 z-0"></div>
                          <span className="text-slate-600 font-medium z-10 opacity-50 transition-all duration-500">
                            [ {project.title} Image ]
                          </span>
                        </>
                      )}
                      
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                        <span className="text-white font-medium px-4 py-2 border border-white/50 rounded-full backdrop-blur-sm bg-white/10">View Details</span>
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
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>
    </>
  );
}