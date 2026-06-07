import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap-trial';
import { ScrollTrigger } from 'gsap-trial/ScrollTrigger';
import SplitType from 'split-type';
import Shuffle from './Shuffle';

gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  const containerRef = useRef(null);
  const visionTextRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 0. About Us Header Cut-from-bottom Effect (Triggered, not scrubbed)
      gsap.fromTo(".about-title", 
        { yPercent: 120 },
        {
          yPercent: 0,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".about-title-container",
            start: "top 85%",
          }
        }
      );

      // 1. Vision Scroll Reading Effect
      const visionSplit = new SplitType(".vision-text", { types: "words,lines" });
      gsap.set(visionSplit.words, { opacity: 0.2 });

      ScrollTrigger.create({
        trigger: ".vision-section",
        start: "top 80%",
        end: "center 60%", 
        animation: gsap.to(visionSplit.words, {
          opacity: 1,
          stagger: 0.1,
          ease: "none"
        }),
        scrub: 0.5
      });

      // 2. Timeline Line Drawing Effect
      gsap.fromTo(".milestone-line",
        { height: "0%" },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: ".milestones-container",
            start: "top 60%",
            end: "bottom 80%",
            scrub: 0.5
          }
        }
      );

      // 3. Milestones Reveal
      const milestoneItems = gsap.utils.toArray('.milestone-item');
      gsap.set(milestoneItems, { opacity: 0, x: -20 });

      ScrollTrigger.create({
        trigger: ".milestones-section",
        start: "top 70%",
        animation: gsap.to(milestoneItems, { opacity: 1, x: 0, duration: 0.8, stagger: 0.2, ease: "power3.out" })
      });

      // 4. Founders Quote Reveal
      const quoteText = new SplitType(".quote-text", { types: "lines" });
      gsap.set(quoteText.lines, { opacity: 0, y: 15 });
      gsap.set(".quote-author", { opacity: 0 });

      ScrollTrigger.create({
        trigger: ".quote-section",
        start: "top 80%",
        animation: gsap.timeline()
          .to(quoteText.lines, { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out" })
          .to(".quote-author", { opacity: 1, duration: 1, ease: "power3.out" }, "-=0.5")
      });
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const milestones = [
    { year: "2022", title: "Founded", desc: "Purple Block was founded with a vision to democratize enterprise AI solutions." },
    { year: "2023", title: "First Enterprise Client", desc: "Secured our first major enterprise client and delivered transformative results." },
    { year: "2024", title: "Team Expansion", desc: "Expanded our team of AI experts and data scientists to meet growing demand." },
    { year: "2025", title: "International Growth", desc: "Began serving international clients and expanded our global footprint." }
  ];

  return (
    <section id="about" ref={containerRef} className="relative z-20 w-full max-w-7xl mx-auto px-6 mt-12 pb-32 flex flex-col gap-16">
      
      {/* Huge Section Header with Cut-from-bottom effect */}
      <div className="w-full flex justify-center mb-4">
        <div className="about-title-container overflow-hidden pb-2 z-10 relative">
          <div className="about-title">
            <Shuffle text="ABOUT US" className="text-[3rem] md:text-[5rem] font-bold tracking-[0.1em] text-white/50 uppercase select-none pointer-events-none leading-none" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">
        {/* Left Column: Our Vision */}
        <div className="vision-section flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-[1px] bg-white/20"></div>
            <h3 className="text-white/50 text-[0.7rem] uppercase tracking-[0.2em] font-medium">Our Vision</h3>
          </div>
          
          <div className="flex flex-col gap-6 text-white font-['Poppins'] font-light text-base md:text-lg lg:text-[1.35rem] leading-[1.65] pl-6 lg:pl-8 border-l border-white/5">
            <p className="vision-text">
              At Purple Block, we're on a mission to democratize AI for enterprises of all sizes. Our expertise in AI, machine learning, and data science powers innovative solutions that drive real business impact.
            </p>
            <p className="vision-text">
              We've partnered and served global clients - from India's biggest corporations to SMBs in the US & Latin America. We began with a vision to bridge the gap between cutting-edge AI technologies and practical business applications.
            </p>
            <p className="vision-text">
              What sets us apart is our commitment to delivering solutions that not only leverage advanced technology but are also accessible, transparent, and aligned with our clients' specific objectives.
            </p>
          </div>
        </div>

        {/* Right Column: Our Milestones */}
        <div className="milestones-section flex flex-col gap-12 mt-12 lg:mt-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-[1px] bg-white/20"></div>
            <h3 className="text-white/50 text-[0.7rem] uppercase tracking-[0.2em] font-medium">Our Milestones</h3>
          </div>
          
          <div className="milestones-container flex flex-col ml-6 pl-8 gap-12 relative">
            
            {/* Background static line */}
            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/10"></div>
            
            {/* Animated drawing line */}
            <div className="milestone-line absolute left-0 top-0 w-[1px] bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.8)] z-10 origin-top"></div>

            {milestones.map((m, i) => (
              <div key={i} className="milestone-item relative flex flex-col gap-1.5 z-20">
                {/* Glowing dot marker */}
                <div className="absolute -left-[2.35rem] top-1.5 w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)] border-2 border-[#07070a]"></div>
                
                <span className="text-purple-400 font-mono text-xs tracking-wider">{m.year}</span>
                <h4 className="text-white text-lg font-medium tracking-wide">{m.title}</h4>
                <p className="text-white/50 font-light max-w-sm leading-relaxed text-sm">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Founders Quote (Overlapping Layout) */}
      <div className="quote-section relative w-full max-w-5xl mx-auto mt-32 mb-16 flex flex-col md:flex-row items-center">
        
        {/* Founders Image Base */}
        <div className="relative w-full md:w-[60%] aspect-square md:aspect-[4/3] rounded-sm overflow-hidden bg-white/5">
           <img 
             src="/founders.png" 
             alt="Purple Block Founders" 
             className="w-full h-full object-cover grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-700" 
           />
           {/* Dark gradient to blend the image into the background seamlessly */}
           <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#07070a] via-transparent to-transparent opacity-80"></div>
        </div>

        {/* Overlapping Frosted Glass Quote Box */}
        <div className="relative md:absolute md:right-0 lg:-right-12 md:w-[55%] bg-white/[0.02] backdrop-blur-xl border border-white/10 p-10 lg:p-14 rounded-sm -mt-16 md:mt-0 z-10 shadow-2xl">
           <div className="absolute -top-10 -left-6 text-[8rem] leading-none text-white/5 font-serif select-none pointer-events-none">"</div>
           
           <p className="quote-text text-white/90 italic text-xl lg:text-2xl font-light leading-relaxed tracking-wide relative z-10">
             Gone are the days where SMBs couldn't afford enterprise grade technology. With AI, all businesses can now thrive on the back of AI agents and automation.
           </p>
           
           <div className="mt-8 flex items-center justify-end gap-4">
             <div className="w-10 h-[1px] bg-purple-500/50"></div>
             <span className="quote-author text-purple-400 uppercase tracking-[0.3em] text-[0.65rem] font-bold">
               Founders
             </span>
           </div>
        </div>
      </div>

    </section>
  );
};

export default AboutUs;
