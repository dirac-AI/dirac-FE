import React, { useRef, useState, useEffect } from 'react';
import "./CustomCursor.css";

export const CustomCursor = () => {
  const outerCursorRef = useRef<HTMLDivElement>(null);
  const innerCursorRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const isHoveringRef = useRef(false);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const animationFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    const checkDevice = () => {
      const isTouchDevice = 'ontouchstart' in window || 
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(max-width: 1024px)").matches;
      
      setIsMobileOrTablet(isTouchDevice);
      document.body.style.cursor = isTouchDevice ? 'auto' : 'none';
    };

    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkDevice, 250);
    };

    checkDevice();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  useEffect(() => {
    if (isMobileOrTablet) return;

    let lastMoveTime = 0;
    const MOVE_THROTTLE = 5;

    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastMoveTime < MOVE_THROTTLE) return;
      
      lastMoveTime = now;
      positionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isHoverable = target.closest('button, a, [data-cursor-hover]') !== null;
      
      if (isHoverable !== isHoveringRef.current) {
        isHoveringRef.current = isHoverable;
        
        if (innerCursorRef.current) {
          innerCursorRef.current.classList.toggle('cursor-inner--hover', isHoverable);
        }
      }
    };

    const animate = () => {
      if (outerCursorRef.current && innerCursorRef.current) {
        const { x, y } = positionRef.current;
        
        outerCursorRef.current.style.transform = `translate(${x}px, ${y}px)`;
        innerCursorRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    animationFrameIdRef.current = requestAnimationFrame(animate);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleHover, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener('mouseover', handleHover);
      
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
        animationFrameIdRef.current = null;
      }
    };
  }, [isMobileOrTablet]);

  if (isMobileOrTablet) return null;

  return (
    <>
      <div ref={outerCursorRef} className="cursor-outer" />
      <div ref={innerCursorRef} className="cursor-inner" />
    </>
  );
};