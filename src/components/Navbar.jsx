import React, { useState, useEffect } from 'react';
import Shuffle from './Shuffle';

const TinyArrow = () => (
  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60 mb-1.5 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
    <path d="M2.5 1.5H6.5V5.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M6.5 1.5L1.5 6.5" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const Navbar = () => {
  const [show, setShow] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY;
        
        // Track if we've scrolled down past the hero
        setIsScrolled(currentScrollY > 50);

        if (currentScrollY > lastScrollY && currentScrollY > 100) { 
          // Hide on scroll down
          setShow(false); 
        } else {
          // Show on scroll up
          setShow(true);  
        }
        setLastScrollY(currentScrollY); 
      }
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  const handleScroll = (e, targetId) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full h-32 px-16 py-10 z-[100] box-border transition-transform duration-500 ease-out pointer-events-none ${show ? 'translate-y-0' : '-translate-y-full'}`}>
      
      {/* App Name - Left (Fades out when scrolled) */}
      <div className={`absolute left-16 top-10 flex items-center gap-3 text-white font-extrabold text-xl tracking-[0.1em] font-sans cursor-pointer hoverable transition-opacity duration-300 pointer-events-auto ${isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <img src="/logo.svg" alt="Purple Block Logo" className="h-11 w-auto object-contain" />
        <Shuffle text="PURPLE BLOCK" tag="span" />
      </div>

      {/* Nav Links - Right by default, Center when scrolled */}
      <div className={`absolute top-10 flex items-center gap-12 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-auto ${isScrolled ? 'left-1/2 -translate-x-1/2 bg-[#0a0a0f]/90 backdrop-blur-xl border border-white/10 rounded-full px-8 py-4 shadow-2xl' : 'left-[calc(100%-4rem)] -translate-x-full px-0 py-0'}`}>
        <a href="#services" onClick={(e) => handleScroll(e, '#services')} className="group hoverable flex items-center gap-1 text-white no-underline font-bold text-[0.8rem] tracking-[0.05em] font-sans opacity-80 hover:opacity-100 transition-opacity duration-300 cursor-pointer whitespace-nowrap">
          SERVICES <TinyArrow />
        </a>
        <a href="#work" onClick={(e) => handleScroll(e, '#work')} className="group hoverable flex items-center gap-1 text-white no-underline font-bold text-[0.8rem] tracking-[0.05em] font-sans opacity-80 hover:opacity-100 transition-opacity duration-300 cursor-pointer whitespace-nowrap">
          OUR WORK <TinyArrow />
        </a>
        <a href="#about" onClick={(e) => handleScroll(e, '#about')} className="group hoverable flex items-center gap-1 text-white no-underline font-bold text-[0.8rem] tracking-[0.05em] font-sans opacity-80 hover:opacity-100 transition-opacity duration-300 cursor-pointer whitespace-nowrap">
          ABOUT <TinyArrow />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
