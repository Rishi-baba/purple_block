import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap-trial';

const CustomCursor = () => {
  const wrapperRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const inner = innerRef.current;
    if (!wrapper || !inner) return;

    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    
    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const onMouseOver = (e) => {
      if (e.target.closest('a, button, .hoverable')) {
        gsap.to(wrapper, { scale: 3, duration: 0.3, force3D: false });
      }
    };

    const onMouseOut = (e) => {
      const hoverable = e.target.closest('a, button, .hoverable');
      if (hoverable) {
        // Only scale down if the mouse actually left the hoverable boundary
        if (!e.relatedTarget || !hoverable.contains(e.relatedTarget)) {
          gsap.to(wrapper, { scale: 1, duration: 0.3, force3D: false });
        }
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    gsap.set(wrapper, { x: mouse.x, y: mouse.y, force3D: false });

    let currentAngle = 0;

    const ticker = () => {
      const dt = 1.0 - Math.pow(1.0 - 0.25, gsap.ticker.deltaRatio()); 
      
      pos.x += (mouse.x - pos.x) * dt;
      pos.y += (mouse.y - pos.y) * dt;

      const dx = mouse.x - pos.x;
      const dy = mouse.y - pos.y;
      
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance > 2) {
         currentAngle = Math.atan2(dy, dx) * (180 / Math.PI);
      }
      
      const stretch = 1 + Math.min(distance * 0.02, 1.5);
      const squash = 1 - Math.min(distance * 0.005, 0.4);

      // We apply force3D: false so it uses standard 2D transforms, 
      // ensuring mix-blend-difference can blend with the rest of the page.
      gsap.set(wrapper, { 
        x: pos.x, 
        y: pos.y, 
        rotation: currentAngle, 
        scaleX: stretch, 
        scaleY: squash,
        force3D: false 
      });
    };
    
    gsap.ticker.add(ticker);

    return () => {
      gsap.ticker.remove(ticker);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  return (
    <div 
      ref={wrapperRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference w-5 h-5 -translate-x-1/2 -translate-y-1/2 origin-center"
    >
      <div 
        ref={innerRef}
        className="w-full h-full bg-white rounded-full"
      />
    </div>
  );
};

export default CustomCursor;
