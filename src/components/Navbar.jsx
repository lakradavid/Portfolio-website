import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code2, Sun, Moon } from 'lucide-react';
import { useTheme } from '../App';

const WEATHER_MODES = ['off', 'snow', 'rain', 'thunder', 'fireflies', 'stars', 'matrix', 'leaves'];

const WeatherIcon = ({ mode, size = 16 }) => {
  if (mode === 'snow') return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="2" x2="12" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/>
      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/><line x1="19.07" y1="4.93" x2="4.93" y2="19.07"/>
      <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none"/>
    </svg>
  );
  if (mode === 'rain') return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"/>
      <line x1="8" y1="19" x2="8" y2="21"/><line x1="8" y1="13" x2="8" y2="15"/>
      <line x1="16" y1="19" x2="16" y2="21"/><line x1="16" y1="13" x2="16" y2="15"/>
      <line x1="12" y1="21" x2="12" y2="23"/><line x1="12" y1="15" x2="12" y2="17"/>
    </svg>
  );
  if (mode === 'thunder') return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"/>
      <polyline points="13 11 9 17 15 17 11 23"/>
    </svg>
  );
  if (mode === 'fireflies') return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none"/>
      <circle cx="5" cy="6" r="1.5" fill="currentColor" stroke="none" opacity="0.6"/>
      <circle cx="19" cy="7" r="1.5" fill="currentColor" stroke="none" opacity="0.6"/>
      <circle cx="7" cy="18" r="1.5" fill="currentColor" stroke="none" opacity="0.6"/>
      <circle cx="17" cy="17" r="1.5" fill="currentColor" stroke="none" opacity="0.6"/>
      <circle cx="3" cy="13" r="1" fill="currentColor" stroke="none" opacity="0.4"/>
      <circle cx="21" cy="13" r="1" fill="currentColor" stroke="none" opacity="0.4"/>
    </svg>
  );
  if (mode === 'stars') return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="currentColor" stroke="none"/>
    </svg>
  );
  if (mode === 'matrix') return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>
    </svg>
  );
  if (mode === 'leaves') return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
    </svg>
  );
  // off
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
    </svg>
  );
};

const weatherColor = {
  off:        '#94a3b8',
  snow:       '#7dd3fc',
  rain:       '#818cf8',
  thunder:    '#c084fc',
  fireflies:  '#86efac',
  stars:      '#fde68a',
  matrix:     '#4ade80',
  leaves:     '#fb923c',
};
const weatherLabel = {
  off:        'Effects off',
  snow:       'Snow',
  rain:       'Rain',
  thunder:    'Thunderstorm',
  fireflies:  'Fireflies',
  stars:      'Stars',
  matrix:     'Matrix',
  leaves:     'Autumn Leaves',
};

function LiveClock({ dark }) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const date = now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  const time = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });

  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.8 }}
      className={`hidden lg:flex flex-col items-end leading-none gap-0.5 font-mono select-none ${
        dark ? 'text-slate-500' : 'text-slate-400'
      }`}
    >
      <span className="text-[13px] font-semibold tracking-wide" style={{ color: dark ? '#818cf8' : '#6366f1' }}>
        {time}
      </span>
      <span className="text-[11px] tracking-wider">{date}</span>
    </motion.div>
  );
}

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certs', href: '#certifications' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');
  const { dark, toggle, weather, cycleWeather } = useTheme();

  useEffect(() => {
    // Scroll progress + scrolled state
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const el = document.getElementById('scroll-progress');
      if (el) {
        const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        el.style.width = Math.min(pct, 100) + '%';
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Active section via IntersectionObserver
    const sections = navLinks.map(l => document.querySelector(l.href)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive('#' + entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach(s => observer.observe(s));

    return () => {
      window.removeEventListener('scroll', onScroll);
      sections.forEach(s => observer.unobserve(s));
    };
  }, []);

  const handleNav = (href) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div id="scroll-progress" />
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? dark
              ? 'glass-strong shadow-2xl shadow-black/30 border-b border-white/5'
              : 'bg-white/80 backdrop-blur-xl shadow-lg shadow-slate-200/50 border-b border-slate-200/60'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-2.5 group"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="relative w-9 h-9">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500 to-sky-400 opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500 to-sky-400 blur-md opacity-40 group-hover:opacity-70 transition-opacity" />
              <div className="relative w-9 h-9 rounded-xl flex items-center justify-center">
                <Code2 size={17} className="text-white" />
              </div>
            </div>
            <span className={`font-bold text-[17px] tracking-tight ${dark ? 'text-white' : 'text-slate-800'}`}>
              David<span className="text-indigo-500">.</span>
            </span>
          </motion.a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
                className={`nav-link ${active === link.href ? 'active' : ''} ${!dark ? 'nav-link-light' : ''}`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA + Theme Toggle */}
          <div className="hidden md:flex items-center gap-4">
            <LiveClock dark={dark} />
            {/* Theme toggle */}
            <motion.button
              onClick={toggle}
              aria-label="Toggle theme"
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${
                dark
                  ? 'glass text-slate-400 hover:text-yellow-300'
                  : 'bg-slate-100 border border-slate-200 text-slate-500 hover:text-indigo-500'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={dark ? 'moon' : 'sun'}
                  initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                >
                  {dark ? <Sun size={16} /> : <Moon size={16} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>

            {/* Weather toggle */}
            <motion.button
              onClick={cycleWeather}
              aria-label={`Weather effect: ${weatherLabel[weather]}`}
              title={weatherLabel[weather]}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${
                dark
                  ? 'glass'
                  : 'bg-slate-100 border border-slate-200'
              }`}
              style={{ color: weatherColor[weather] }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={weather}
                  initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                >
                  <WeatherIcon mode={weather} size={16} />
                </motion.div>
              </AnimatePresence>
            </motion.button>
            <motion.a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNav('#contact'); }}
              className="btn-primary text-[13px] py-2.5 px-5 gap-1.5"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              Hire Me
            </motion.a>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <motion.button
              onClick={toggle}
              aria-label="Toggle theme"
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                dark
                  ? 'glass text-slate-400 hover:text-yellow-300'
                  : 'bg-slate-100 border border-slate-200 text-slate-500'
              }`}
              whileTap={{ scale: 0.9 }}
            >
              {dark ? <Sun size={15} /> : <Moon size={15} />}
            </motion.button>
            <motion.button
              onClick={cycleWeather}
              aria-label="Weather effect"
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                dark ? 'glass' : 'bg-slate-100 border border-slate-200'
              }`}
              style={{ color: weatherColor[weather] }}
              whileTap={{ scale: 0.9 }}
            >
              <WeatherIcon mode={weather} size={15} />
            </motion.button>
            <motion.button
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                dark ? 'glass text-slate-300 hover:text-white' : 'bg-slate-100 border border-slate-200 text-slate-600'
              }`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={menuOpen ? 'x' : 'menu'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {menuOpen ? <X size={18} /> : <Menu size={18} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className={`md:hidden overflow-hidden border-t ${
                dark ? 'glass-strong border-white/5' : 'bg-white/95 backdrop-blur-xl border-slate-200/60'
              }`}
            >
              <div className="px-6 py-5 flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      active === link.href
                        ? 'text-indigo-500 bg-indigo-500/10'
                        : dark
                          ? 'text-slate-400 hover:text-white hover:bg-white/5'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    {link.label}
                  </motion.a>
                ))}
                <div className="pt-2 mt-1 border-t border-white/5">
                  <a
                    href="#contact"
                    onClick={(e) => { e.preventDefault(); handleNav('#contact'); }}
                    className="btn-primary w-full text-center text-sm py-3"
                  >
                    Hire Me
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
