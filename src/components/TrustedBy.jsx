import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap-trial';

const companies = [
  { name: "ITC Limited", domain: "itcportal.com" },
  { name: "Delhivery", domain: "delhivery.com" },
  { name: "ENSO Group", domain: "ensogroup.com" },
  { name: "Nuvr", domain: "nuvr.in" },
  { name: "Kameleo", domain: "kameleo.io" },
  { name: "Propertree", domain: "propertree.in" },
  { name: "Bikaji", domain: "bikaji.com" },
  { name: "WTFIS?", domain: "open.spotify.com" }, // Podcast
  { name: "Mundo Aromas", domain: "mundoaromas.com" },
  { name: "FightRight", domain: "fightright.in" }
];

const TrustedBy = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Slide up completely out of the mask
      gsap.to(".trusted-anim", {
        opacity: 0,
        y: "-100%",
        duration: 0.5,
        ease: "power3.inOut",
        onComplete: () => {
          setIndex((prev) => (prev + 1) % companies.length);
          // Emerge perfectly from the bottom cutoff
          gsap.fromTo(".trusted-anim", 
            { opacity: 0, y: "100%" }, 
            { opacity: 1, y: "0%", duration: 0.6, ease: "power3.out" }
          );
        }
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const current = companies[index];

  return (
    <div className="absolute bottom-10 left-10 z-50 flex items-center">
      {/* Subtle minimalist crosshair */}
      <div className="absolute -left-4 -bottom-4 w-1 h-1 border-b border-l border-white/20" />

      <div className="flex items-center gap-4">
        {/* Minimalist Logo Circle - Masked */}
        <div className="overflow-hidden rounded-full w-[3rem] h-[3rem]">
          <div className="trusted-anim w-full h-full rounded-full flex items-center justify-center border border-white/10 bg-white/5 overflow-hidden">
            <img 
              src={`https://logo.clearbit.com/${current.domain}`} 
              alt={current.name}
              className="w-full h-full object-cover p-1.5"
              onError={(e) => {
                e.target.style.display = 'none';
                if (e.target.nextSibling) {
                  e.target.nextSibling.style.display = 'flex';
                }
              }}
            />
            {/* Fallback to letter if logo fails to load */}
            <span className="hidden w-full h-full items-center justify-center text-white/40 font-light text-lg">
              {current.name.charAt(0)}
            </span>
          </div>
        </div>
        
        {/* Minimalist Text */}
        <div className="flex flex-col justify-center">
          {/* Static Label */}
          <span className="text-white/40 text-[0.75rem] tracking-wider uppercase font-normal mb-1">Trusted by</span>
          {/* Animated Name - Masked */}
          <div className="overflow-hidden leading-none pt-0.5 pb-0.5">
            <span className="trusted-anim block text-white/80 font-light text-[0.95rem] tracking-wide leading-none">{current.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustedBy;
