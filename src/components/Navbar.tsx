"use client";

import { useState, useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  

  const logoRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Anime.js Effect สำหรับ Logo
  useEffect(() => {
    if (logoRef.current) {
      // ดึงเอาเฉพาะ span ที่มีคลาส logo-letter มาทำอนิเมชัน
      const letters = logoRef.current.querySelectorAll('.logo-letter');
      
      animate(letters, {
        
        y: [
          { to: '-0.75rem', ease: 'outExpo', duration: 600 },
          { to: 0, ease: 'outBounce', duration: 800, delay: 100 }
        ],
        rotate: {
          from: '-1turn',
          delay: 0
        },
        delay: stagger(50),
        ease: 'inOutCirc',
        loopDelay: 2000, 
        loop: true
      });
    }
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled
          ? "bg-slate-950/80 backdrop-blur-md border-b border-slate-800 shadow-sm"
          : "bg-transparent"
        }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
       <a
          href="#kittanate"
          ref={logoRef}
          className="text-slate-50 font-bold text-2xl tracking-tight hover:text-blue-500 transition-colors flex items-center">
          <span className="text-slate-500">&lt;</span>
          <div className="relative flex">
            <span className="absolute left-0 top-0 text-slate-800 select-none pointer-events-none">
              Kittanate
            </span>
            <div className="flex relative z-10 text-slate-50 hover:text-blue-500 transition-colors">
              {"Kittanate".split("").map((char, index) => (
                <span 
                  key={index} 
                  className="logo-letter inline-block"
                >
                  {char}
                </span>
              ))}
            </div>
          </div>
          
          <span className="text-slate-500">/&gt;</span>
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-slate-400 hover:text-slate-50 text-sm transition-colors duration-200 font-medium"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-slate-400 hover:text-slate-50 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>
    
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-md border-b border-slate-800 absolute w-full left-0">
          <ul className="flex flex-col px-6 py-4 gap-4">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-slate-400 hover:text-slate-50 text-sm font-medium transition-colors block py-2"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}