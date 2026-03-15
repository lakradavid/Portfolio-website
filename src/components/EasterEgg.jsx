import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SECRET = 'david';
const COLORS = ['#818cf8', '#38bdf8', '#34d399', '#f472b6', '#fbbf24', '#a78bfa', '#fb923c'];

function Confetti({ id }) {
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];
  const x = Math.random() * 100;
  const delay = Math.random() * 0.5;
  const duration = Math.random() * 1.5 + 1.5;
  const size = Math.random() * 8 + 4;
  const rotate = Math.random() * 720 - 360;
  const shape = Math.random() > 0.5 ? '50%' : '2px';

  return (
    <motion.div
      key={id}
      className="fixed pointer-events-none z-[99997]"
      style={{
        left: `${x}vw`,
        top: '-20px',
        width: size,
        height: size,
        background: color,
        borderRadius: shape,
        boxShadow: `0 0 ${size}px ${color}`,
      }}
      initial={{ y: -20, opacity: 1, rotate: 0 }}
      animate={{ y: '110vh', opacity: [1, 1, 0], rotate }}
      transition={{ duration, delay, ease: 'easeIn' }}
    />
  );
}

export default function EasterEgg() {
  const [typed, setTyped] = useState('');
  const [triggered, setTriggered] = useState(false);
  const [confetti, setConfetti] = useState([]);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName.toLowerCase() === 'input' || e.target.tagName.toLowerCase() === 'textarea') return;
      const next = (typed + e.key.toLowerCase()).slice(-SECRET.length);
      setTyped(next);
      if (next === SECRET) {
        setTriggered(true);
        setShowBanner(true);
        setConfetti(Array.from({ length: 80 }, (_, i) => i + Date.now()));
        setTimeout(() => setShowBanner(false), 4000);
        setTimeout(() => setConfetti([]), 4000);
        setTimeout(() => setTriggered(false), 4500);
        setTyped('');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [typed]);

  return (
    <>
      {confetti.map(id => <Confetti key={id} id={id} />)}

      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ opacity: 0, y: -60, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[99996] px-8 py-4 rounded-2xl text-center pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, #6366f1, #38bdf8)',
              boxShadow: '0 20px 60px rgba(99,102,241,0.5), 0 0 0 1px rgba(255,255,255,0.15)',
            }}
          >
            <p className="text-white font-black text-xl mb-0.5">🎉 You found the easter egg!</p>
            <p className="text-indigo-100 text-sm font-medium">David is open to work — let's build something great!</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
