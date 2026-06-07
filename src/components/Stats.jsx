import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap-trial';

const stats = [
  { value: "15+", label: "Enterprise Clients" },
  { value: "5", label: "Countries Served" },
  { value: "40+", label: "Projects Completed" },
  { value: "> $8 mn", label: "Cost Savings" }
];

const Stats = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Cinematic stagger fade-in matching the Hero text
    gsap.fromTo(".stat-item", 
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 1.4, stagger: 0.15, ease: "power4.out", delay: 1.2 }
    );
  }, []);

  return (
    <div ref={containerRef} className="absolute bottom-10 right-10 z-50 flex items-center gap-8">
      {stats.map((stat, i) => (
        <div key={i} className="stat-item flex flex-col items-end text-right">
          <span className="text-white/40 text-[0.55rem] tracking-widest uppercase font-medium mb-1">
            {stat.label}
          </span>
          <span className="text-white/80 font-medium text-[0.95rem] tracking-wide leading-none">
            {stat.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Stats;
