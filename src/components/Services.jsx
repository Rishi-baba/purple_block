import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap-trial';
import { ScrollTrigger } from 'gsap-trial/ScrollTrigger';
import Shuffle from './Shuffle';

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  { title: "Workflow Automation", desc: "Automating repetitive tasks and decision-making processes using AI — freeing up your team to focus on what matters." },
  { title: "Customized Enterprise LLMs", desc: "We fine-tune models on your data to get reliable, domain-specific performance—not generic AI." },
  { title: "Vertical Agentic Workflows", desc: "Mini-AI agents that mimic human workflows in specific verticals. Think of it like an AI intern." },
  { title: "NLP & Computer Vision", desc: "We use NLP to understand text/audio and Computer Vision to extract insights from images or videos." },
  { title: "Data Analysis & Visualization", desc: "We turn messy datasets into insightful dashboards, reports, and visual narratives." },
  { title: "Data Warehousing & Database Mgt", desc: "We organize your data into reliable, queryable, and scalable databases." },
  { title: "Data Engineering", desc: "We build backend pipelines that automate the flow of data from source → clean data → dashboard." },
  { title: "Data Strategy & Governance", desc: "We help you get your data enterprise systems-ready with strict models and RBAC." },
  { title: "Web & App Development", desc: "We build fast, modern web apps and internal tools that are clean to use and easy to scale." }
];

const Services = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.service-card');
      
      // Initially, put all cards off-screen to the bottom-right
      gsap.set(cards, { y: "100vh", x: "30vw" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${cards.length * 100}%`, // Extended duration
          pin: true,
          scrub: 1,
          pinSpacing: true
        }
      });

      // Title cut effect from bottom
      gsap.fromTo(".services-title",
        { yPercent: 120 },
        {
          yPercent: 0,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%"
          }
        }
      );

      // Animate each card sliding in from the bottom-right one by one
      cards.forEach((card, i) => {
        tl.to(card, {
          y: 0,
          x: 0,
          duration: 1,
          ease: "power2.out"
        });
      });
      
      // Add a buffer at the end so the pin holds after the 9th card arrives
      tl.to({}, { duration: 1.5 });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="services" className="relative w-full h-screen overflow-hidden z-30 bg-transparent">
      
      {/* Background Fixed Header - Moved higher and wrapped for cut effect */}
      <div className="absolute top-2 md:top-6 right-4 md:right-16 flex flex-col items-end z-40 pointer-events-none opacity-90">
        <div className="overflow-hidden pb-2">
          <div className="services-title">
            <Shuffle text="OUR SERVICES" className="text-[2rem] md:text-[3rem] lg:text-[3.5rem] font-black tracking-[-0.02em] text-white uppercase leading-[0.85] text-right" />
          </div>
        </div>
      </div>

      {/* Cards Deck Container */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center pl-4 md:pl-12">
        <div className="relative w-full h-full flex items-center">
          
          {servicesData.map((service, i) => (
            <div 
              key={i} 
              // Perfectly square with sharp edges
              className="service-card absolute w-[260px] md:w-[350px] aspect-square bg-[#0c0c10] border border-white/20 flex flex-col justify-between p-4 md:p-6 shadow-[10px_10px_30px_rgba(0,0,0,0.9)] transition-transform duration-300 hover:-translate-y-4 rounded-none"
              style={{
                left: `${i * 100}px`, // Tighter horizontal stack
                top: `calc(50% - 175px + ${i * 8}px)`, // Slight diagonal downward step
                zIndex: i + 1
              }}
            >
              {/* Top-Left Number in Deep Purple */}
              <div className="text-[5rem] md:text-[6.5rem] font-black text-purple-500 leading-[0.8] tracking-tighter">
                {String(i + 1).padStart(2, '0')}
              </div>

              {/* Bottom-Left Bold Text */}
              <div className="flex flex-col gap-2 md:gap-3">
                <h3 className="text-xl md:text-2xl font-black text-white uppercase leading-none tracking-tight pr-4">
                  {service.title}
                </h3>
                {/* Description added for context, keeping it clean and bold */}
                <p className="text-white/60 text-[0.7rem] md:text-sm font-light leading-snug pr-4">
                  {service.desc}
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>

    </section>
  );
};

export default Services;
