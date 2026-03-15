import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const letters = ['D', 'a', 'v', 'i', 'd', ' ', 'L', 'a', 'k', 'r', 'a'];

export default function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading'); // 'loading' | 'reveal' | 'exit'

  useEffect(() => {
    // Animate progress bar to 100 over ~1.8s
    const start = performance.now();
    const duration = 1800;

    const tick = (now) => {
      const elapsed = now - start;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(Math.floor(pct));
      if (pct < 100) {
        requestAnimationFrame(tick);
      } else {
        // Brief pause then reveal name
        setTimeout(() => setPhase('reveal'), 200);
        // Then exit
        setTimeout(() => {
          setPhase('exit');
          setTimeout(onDone, 700);
        }, 1400);
      }
    };
    requestAnimationFrame(tick);
  }, [onDone]);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#020817] overflow-hidden"
        >
          {/* Background grid */}
          <div className="absolute inset-0 grid-bg opacity-40" />

          {/* Orbs */}
          <div className="absolute w-96 h-96 rounded-full bg-indigo-600 blur-[120px] opacity-10 -top-20 -left-20" />
          <div className="absolute w-80 h-80 rounded-full bg-sky-500 blur-[100px] opacity-8 bottom-0 right-0" />

          {/* Center content */}
          <div className="relative flex flex-col items-center gap-10">
            {/* Logo mark */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative"
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-sky-400 flex items-center justify-center shadow-2xl shadow-indigo-500/40">
                <span className="text-white font-black text-3xl">D</span>
              </div>
              {/* Spinning ring */}
              <motion.div
                className="absolute -inset-2 rounded-3xl border-2 border-transparent"
                style={{
                  background: 'linear-gradient(#020817, #020817) padding-box, linear-gradient(135deg, #6366f1, #38bdf8, #22c55e) border-box',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />
            </motion.div>

            {/* Name letters — revealed one by one in phase 'reveal' */}
            <div className="flex items-center gap-0.5 h-12 overflow-hidden">
              {phase === 'reveal' || phase === 'exit'
                ? letters.map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className={`font-black text-3xl tracking-tight ${
                        char === ' ' ? 'w-3' :
                        i < 5 ? 'text-white' : 'gradient-text'
                      }`}
                    >
                      {char}
                    </motion.span>
                  ))
                : null}
            </div>

            {/* Progress bar */}
            <div className="w-64 flex flex-col items-center gap-3">
              <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, #6366f1, #38bdf8, #22c55e)',
                    boxShadow: '0 0 12px rgba(99,102,241,0.8)',
                  }}
                  transition={{ ease: 'linear' }}
                />
              </div>
              <motion.span
                className="text-slate-600 text-xs font-mono tabular-nums"
                animate={{ opacity: phase === 'reveal' ? 0 : 1 }}
                transition={{ duration: 0.3 }}
              >
                {progress}%
              </motion.span>
            </div>
          </div>

          {/* Bottom tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-10 text-slate-600 text-xs tracking-[0.2em] uppercase font-medium"
          >
            Full Stack Developer
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
