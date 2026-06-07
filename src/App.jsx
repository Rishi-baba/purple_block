import React, { useRef, useEffect } from 'react';
import DarkVeil from './components/DarkVeil';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import TrustedBy from './components/TrustedBy';
import Stats from './components/Stats';
import Services from './components/Services';
import Work from './components/Work';
import AboutUs from './components/AboutUs';
import { gsap } from 'gsap-trial';
import { ScrollTrigger } from 'gsap-trial/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const appRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 2.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    let ctx = gsap.context(() => {
      // Fade out TrustedBy and Stats beautifully when scrolling down
      ScrollTrigger.create({
        trigger: ".hero-section",
        start: "top top",
        end: "bottom 50%",
        animation: gsap.to(".scroll-fade", { opacity: 0, duration: 0.5, ease: "power2.inOut" }),
        scrub: true
      });
    }, appRef);

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={appRef} className="w-full min-h-screen text-white font-sans relative overflow-x-hidden bg-[#07070a]">
      <CustomCursor />
      
      {/* Background stays completely fixed */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <DarkVeil
          hueShift={0}
          noiseIntensity={0}
          scanlineIntensity={0.03}
          speed={0.4}
          scanlineFrequency={2.5}
          warpAmount={0.06}
          resolutionScale={1.0}
        />
      </div>

      <Navbar />
      
      {/* Content wrapper */}
      <div className="relative z-10 w-full flex flex-col">
        {/* First Screen (Hero) */}
        <section className="hero-section relative w-full h-screen flex flex-col items-center justify-center">
          <Hero />
          
          <div className="scroll-fade">
            <TrustedBy />
          </div>
          <div className="scroll-fade">
            <Stats />
          </div>
        </section>
        
        {/* Scrollable About Us Section */}
        <Services />
        <Work />
        <AboutUs />
      </div>
    </div>
  );
}

export default App;
