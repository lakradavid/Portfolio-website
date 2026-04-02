import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CursorFollower() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  // Outer ring — laggy spring
  const springX = useSpring(cursorX, { stiffness: 120, damping: 22, mass: 0.5 });
  const springY = useSpring(cursorY, { stiffness: 120, damping: 22, mass: 0.5 });

  // Inner dot — snappy spring
  const dotSpringX = useSpring(dotX, { stiffness: 400, damping: 28 });
  const dotSpringY = useSpring(dotY, { stiffness: 400, damping: 28 });

  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Hide on mobile
    if (window.matchMedia('(pointer: coarse)').matches) return;

    // rAF-throttled mousemove — avoids flooding motion values every pixel
    let rafPending = false;
    let lastX = -100, lastY = -100;
    const move = (e) => {
      lastX = e.clientX; lastY = e.clientY;
      if (rafPending) return;
      rafPending = true;
      requestAnimationFrame(() => {
        cursorX.set(lastX); cursorY.set(lastY);
        dotX.set(lastX);    dotY.set(lastY);
        rafPending = false;
      });
    };

    const onEnter = () => setHidden(false);
    const onLeave = () => setHidden(true);
    const onDown = () => setClicked(true);
    const onUp = () => setClicked(false);

    // Use event delegation instead of attaching to every element
    const onMouseOver = (e) => {
      if (e.target.closest('a, button, [role="button"], input, textarea, select, label')) {
        setHovered(true);
      }
    };
    const onMouseOut = (e) => {
      if (e.target.closest('a, button, [role="button"], input, textarea, select, label')) {
        setHovered(false);
      }
    };

    window.addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('mouseleave', onLeave);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    // Hide default cursor
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      document.body.style.cursor = '';
    };
  }, [cursorX, cursorY, dotX, dotY]);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999]"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          willChange: 'transform',
        }}
        animate={{
          opacity: hidden ? 0 : 1,
          scale: clicked ? 0.7 : hovered ? 1.6 : 1,
        }}
        transition={{ scale: { type: 'spring', stiffness: 300, damping: 20 }, opacity: { duration: 0.2 } }}
      >
        <div
          className="rounded-full"
          style={{
            width: 36,
            height: 36,
            border: hovered
              ? '1.5px solid rgba(56,189,248,0.8)'
              : '1.5px solid rgba(99,102,241,0.6)',
            background: hovered
              ? 'rgba(56,189,248,0.06)'
              : 'rgba(99,102,241,0.04)',
            boxShadow: hovered
              ? '0 0 16px rgba(56,189,248,0.3)'
              : '0 0 10px rgba(99,102,241,0.2)',
            transition: 'border-color 0.2s, background 0.2s, box-shadow 0.2s',
          }}
        />
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999]"
        style={{
          x: dotSpringX,
          y: dotSpringY,
          translateX: '-50%',
          translateY: '-50%',
          willChange: 'transform',
        }}
        animate={{
          opacity: hidden ? 0 : 1,
          scale: clicked ? 0.5 : hovered ? 0 : 1,
        }}
        transition={{ scale: { type: 'spring', stiffness: 400, damping: 25 }, opacity: { duration: 0.2 } }}
      >
        <div
          className="w-[6px] h-[6px] rounded-full"
          style={{
            background: 'linear-gradient(135deg, #818cf8, #38bdf8)',
            boxShadow: '0 0 8px rgba(99,102,241,0.8)',
          }}
        />
      </motion.div>
    </>
  );
}
