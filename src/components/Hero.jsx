import React, { useRef } from 'react';
import { gsap } from 'gsap-trial';
import { SplitText } from 'gsap-trial/SplitText';
import { useGSAP } from '@gsap/react';
import StarBorder from './StarBorder';

gsap.registerPlugin(SplitText);

const Hero = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Split the text twice: the parent acts as the overflow-hidden mask, the child animates up
    const titleChildSplit = new SplitText(".hero-title", { type: "lines", linesClass: "split-child" });
    const titleParentSplit = new SplitText(".hero-title", { type: "lines", linesClass: "split-parent overflow-hidden" });

    const pChildSplit = new SplitText(".hero-p", { type: "lines", linesClass: "split-child" });
    const pParentSplit = new SplitText(".hero-p", { type: "lines", linesClass: "split-parent overflow-hidden pt-1" });

    const tl = gsap.timeline();

    // Initial hidden state - push elements exactly 100% down out of their masks
    gsap.set(titleChildSplit.lines, { y: "100%" });
    gsap.set(pChildSplit.lines, { y: "100%" });
    gsap.set(".hero-btn", { y: "100%" });

    // Slow, cinematic staggered reveal from the bottom cuts
    tl.to(titleChildSplit.lines, {
      y: "0%",
      duration: 1.4,
      stagger: 0.15,
      ease: "power4.out",
      delay: 0.2
    })
    .to(pChildSplit.lines, {
      y: "0%",
      duration: 1.2,
      stagger: 0.1,
      ease: "power4.out"
    }, "-=1.0")
    .to(".hero-btn", {
      y: "0%",
      duration: 1.2,
      stagger: 0.1,
      ease: "power4.out"
    }, "-=1.0");

    return () => {
      titleParentSplit.revert();
      pParentSplit.revert();
    };
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="relative z-10 text-center select-none px-4 flex flex-col items-center justify-center w-full">
      <h1 className="hero-title text-2xl md:text-[2rem] tracking-[0.06em] mb-4 text-white w-full max-w-4xl mx-auto leading-[1.3] mix-blend-plus-lighter uppercase">
        <span className="font-bold">AI</span> <span className="font-light">FOR GROWTH,</span><br />
        <span className="font-light">AUTOMATION AND SCALE</span>
      </h1>
      
      <p className="hero-p text-sm md:text-[0.95rem] text-white/60 font-light max-w-2xl mx-auto leading-relaxed mb-10">
        We build intelligent systems that help businesses move faster and operate smarter.
      </p>
      
      <div className="flex flex-wrap items-center justify-center gap-4">
        {/* Mask wrapper for cut effect */}
        <div className="overflow-hidden rounded-full p-1 -m-1">
          <StarBorder
            as="button"
            className="hero-btn group transition-transform duration-300 hover:scale-105 cursor-pointer"
            color="#a855f7"
            speed="3s"
            thickness={1.5}
          >
            <div className="px-9 py-3.5 flex items-center gap-2 text-white font-semibold text-[0.75rem] tracking-wider uppercase">
              Free Consultation
              <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </StarBorder>
        </div>

        {/* Mask wrapper for cut effect */}
        <div className="overflow-hidden rounded-full p-1 -m-1">
          <button className="hero-btn group relative px-9 py-3.5 border border-white/20 text-white font-semibold text-[0.75rem] tracking-wider uppercase rounded-full overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-white/50 hover:scale-105 cursor-pointer">
            <span className="relative z-10">
              Contact Us
            </span>
          </button>
        </div>
      </div>
    </main>
  );
};

export default Hero;
