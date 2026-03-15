import { useEffect, useRef } from 'react';

const COLORS = ['#818cf8', '#38bdf8', '#34d399', '#f472b6', '#fbbf24', '#a78bfa'];

export default function ClickParticles() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    const burst = (e) => {
      // Skip if clicking on interactive elements to avoid double-feel
      const tag = e.target.tagName.toLowerCase();
      if (['input', 'textarea', 'select', 'button', 'a'].includes(tag)) return;

      const count = 10;
      for (let i = 0; i < count; i++) {
        const dot = document.createElement('div');
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        const size = Math.random() * 6 + 3;
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
        const speed = Math.random() * 80 + 40;
        const dx = Math.cos(angle) * speed;
        const dy = Math.sin(angle) * speed;

        dot.style.cssText = `
          position: fixed;
          left: ${e.clientX}px;
          top: ${e.clientY}px;
          width: ${size}px;
          height: ${size}px;
          border-radius: 50%;
          background: ${color};
          pointer-events: none;
          z-index: 99998;
          transform: translate(-50%, -50%);
          box-shadow: 0 0 ${size * 2}px ${color};
          transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.6s ease;
        `;

        document.body.appendChild(dot);

        requestAnimationFrame(() => {
          dot.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(0)`;
          dot.style.opacity = '0';
        });

        setTimeout(() => dot.remove(), 650);
      }
    };

    window.addEventListener('click', burst);
    return () => window.removeEventListener('click', burst);
  }, []);

  return <div ref={containerRef} className="pointer-events-none" />;
}
