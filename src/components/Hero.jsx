import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Phone, ArrowDown, Download, ExternalLink, Sparkles } from 'lucide-react';
import profilePhoto from '../assets/IMG_20240204_131336_107.jpg';
import { useTheme } from '../App';
import MagneticButton from './MagneticButton';

/* ── Aurora Background (dark mode only) ─────────────────── */
function AuroraBackground() {
  const ref = useRef(null);
  const mouse = useRef({ x: 0.5, y: 0.5 });
  const current = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const onMove = (e) => {
      mouse.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    let animId;
    const tick = () => {
      // Lerp toward mouse
      current.current.x += (mouse.current.x - current.current.x) * 0.04;
      current.current.y += (mouse.current.y - current.current.y) * 0.04;
      if (ref.current) {
        ref.current.style.setProperty('--mx', current.current.x);
        ref.current.style.setProperty('--my', current.current.y);
      }
      animId = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div ref={ref} className="aurora-bg absolute inset-0 pointer-events-none overflow-hidden">
      {/* Slow drifting blobs */}
      <div className="aurora-blob aurora-blob-1" />
      <div className="aurora-blob aurora-blob-2" />
      <div className="aurora-blob aurora-blob-3" />
      <div className="aurora-blob aurora-blob-4" />
      {/* Mouse spotlight */}
      <div className="aurora-spotlight" />
    </div>
  );
}

const roles = ['Full Stack Developer', 'React Specialist', 'Node.js Engineer', 'CS Engineer'];

/* ── Particle Canvas ─────────────────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const COLORS = ['#6366f1', '#38bdf8', '#22c55e', '#a78bfa'];
    class Particle {
      constructor() { this.reset(true); }
      reset(init = false) {
        this.x = Math.random() * canvas.width;
        this.y = init ? Math.random() * canvas.height : canvas.height + 10;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = -(Math.random() * 0.4 + 0.1);
        this.r = Math.random() * 1.8 + 0.4;
        this.alpha = Math.random() * 0.4 + 0.05;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.life = 0;
        this.maxLife = Math.random() * 300 + 200;
      }
      update() {
        this.x += this.vx; this.y += this.vy; this.life++;
        if (this.life > this.maxLife || this.y < -10) this.reset();
      }
      draw() {
        const fade = this.life < 30 ? this.life / 30 : this.life > this.maxLife - 30 ? (this.maxLife - this.life) / 30 : 1;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha * fade;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    const particles = Array.from({ length: 100 }, () => new Particle());

    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 90) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(99,102,241,${0.06 * (1 - d / 90)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      drawConnections();
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} id="particles-canvas" style={{ width: '100%', height: '100%' }} />;
}

/* ── Typing Text ─────────────────────────────────────────── */
function TypingText() {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[idx];
    let t;
    if (!deleting && text.length < current.length)
      t = setTimeout(() => setText(current.slice(0, text.length + 1)), 75);
    else if (!deleting && text.length === current.length)
      t = setTimeout(() => setDeleting(true), 2200);
    else if (deleting && text.length > 0)
      t = setTimeout(() => setText(current.slice(0, text.length - 1)), 35);
    else { setDeleting(false); setIdx((idx + 1) % roles.length); }
    return () => clearTimeout(t);
  }, [text, deleting, idx]);

  return <span className="gradient-text-2 typing-cursor font-bold">{text}</span>;
}

/* ── Code Snippet ────────────────────────────────────────── */
const codeLines = [
  { num: '01', content: <><span className="code-keyword">const</span> <span className="code-variable">david</span> <span className="code-operator">=</span> {'{'}</> },
  { num: '02', content: <><span className="code-variable">{'  '}name</span><span className="code-operator">:</span> <span className="code-string">"David Lakra"</span>,</> },
  { num: '03', content: <><span className="code-variable">{'  '}role</span><span className="code-operator">:</span> <span className="code-string">"Full Stack Dev"</span>,</> },
  { num: '04', content: <><span className="code-variable">{'  '}stack</span><span className="code-operator">:</span> [<span className="code-string">"React"</span>, <span className="code-string">"Node"</span>],</> },
  { num: '05', content: <><span className="code-variable">{'  '}db</span><span className="code-operator">:</span> [<span className="code-string">"MongoDB"</span>, <span className="code-string">"MySQL"</span>],</> },
  { num: '06', content: <><span className="code-variable">{'  '}realtime</span><span className="code-operator">:</span> <span className="code-string">"WebSockets"</span>,</> },
  { num: '07', content: <><span className="code-function">{'  '}available</span><span className="code-operator">:</span> () <span className="code-operator">=&gt;</span> <span className="code-keyword">true</span>,</> },
  { num: '08', content: <>{'}'}<span className="code-operator">;</span></> },
  { num: '09', content: <></> },
  { num: '10', content: <><span className="code-comment">// 🚀 Open to opportunities</span></> },
];

function CodeSnippet({ dark }) {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute -inset-3 bg-gradient-to-r from-indigo-600/15 via-sky-500/10 to-transparent rounded-2xl blur-xl" />
      <div className={`relative rounded-2xl p-5 font-mono text-[12px] leading-relaxed border ${
        dark
          ? 'bg-[#020817]/90 border-indigo-500/15'
          : 'bg-white/90 border-indigo-200/60 shadow-lg shadow-indigo-50'
      }`}>
        {/* Window chrome */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          <div className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[10px] ${dark ? 'bg-white/5 text-slate-500' : 'bg-slate-100 text-slate-400'}`}>
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            david.config.js
          </div>
          <span className={`text-[10px] ${dark ? 'text-slate-600' : 'text-slate-400'}`}>JS</span>
        </div>
        {/* Lines */}
        <div className="space-y-0.5">
          {codeLines.map((line, i) => (
            <motion.div
              key={i}
              className={`flex items-start gap-3 px-1 rounded transition-colors ${dark ? 'hover:bg-white/3' : 'hover:bg-slate-50'}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.05 }}
            >
              <span className={`w-4 text-right flex-shrink-0 mt-0.5 text-[10px] select-none ${dark ? 'text-slate-700' : 'text-slate-300'}`}>{line.num}</span>
              <span className="flex-1">{line.content}</span>
            </motion.div>
          ))}
        </div>
        {/* Status bar */}
        <div className={`mt-4 pt-3 border-t flex items-center justify-between ${dark ? 'border-white/5' : 'border-slate-100'}`}>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
            <span className={`text-[10px] ${dark ? 'text-slate-600' : 'text-slate-400'}`}>No errors</span>
          </div>
          <span className={`text-[10px] ${dark ? 'text-slate-600' : 'text-slate-400'}`}>UTF-8 · JS</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Profile Photo ───────────────────────────────────────── */
function ProfilePhoto({ dark }) {
  return (
    <motion.div
      className="flex justify-center lg:justify-end"
      initial={{ opacity: 0, x: 60, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative">
        {/* Outer glow ring */}
        <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-indigo-500/30 via-sky-400/20 to-green-400/20 blur-2xl" />

        {/* Spinning gradient border */}
        <div className="absolute -inset-[3px] rounded-full bg-gradient-to-br from-indigo-500 via-sky-400 to-green-400 spin-slow opacity-70" />

        {/* Photo container */}
        <div className={`relative w-64 h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 ${
          dark ? 'border-[#020817]' : 'border-[#f8fafc]'
        }`}>
          <img
            src={profilePhoto}
            alt="David Lakra"
            className="w-full h-full object-cover object-top"
          />
          {/* Subtle overlay for dark mode depth */}
          {dark && (
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/20 to-transparent" />
          )}
        </div>

        {/* Floating badge — top right */}
        <motion.div
          className={`absolute -top-2 -right-2 px-3 py-1.5 rounded-full text-[11px] font-bold flex items-center gap-1.5 shadow-lg ${
            dark
              ? 'bg-[#020817] border border-indigo-500/40 text-indigo-300'
              : 'bg-white border border-indigo-200 text-indigo-600 shadow-indigo-100'
          }`}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
          Open to work
        </motion.div>

        {/* Floating badge — bottom left */}
        <motion.div
          className={`absolute -bottom-2 -left-2 px-3 py-1.5 rounded-full text-[11px] font-bold shadow-lg ${
            dark
              ? 'bg-[#020817] border border-sky-500/40 text-sky-300'
              : 'bg-white border border-sky-200 text-sky-600 shadow-sky-100'
          }`}
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        >
          Full Stack Dev
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ── Hero ────────────────────────────────────────────────── */
export default function Hero() {
  const { dark, weather } = useTheme();
  const showAurora = dark && weather === 'off';

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section id="home" className={`relative min-h-screen flex items-center overflow-hidden ${dark ? 'grid-bg' : 'grid-bg-light'}`}>
      {dark && <ParticleCanvas />}
      {showAurora && <AuroraBackground />}

      {/* Ambient orbs — dimmed when aurora is active */}
      <div className="orb w-[600px] h-[600px] bg-indigo-600 top-[-100px] left-[-100px]" style={{ opacity: showAurora ? 0.04 : (dark ? 0.08 : 0.04) }} />
      <div className="orb w-[500px] h-[500px] bg-sky-500 bottom-[-50px] right-[-50px]" style={{ opacity: showAurora ? 0.04 : (dark ? 0.07 : 0.04) }} />
      <div className="orb w-[300px] h-[300px] bg-violet-600 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ opacity: showAurora ? 0.03 : (dark ? 0.05 : 0.03) }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── Left Content ── */}
          <motion.div variants={containerVariants} initial="hidden" animate="visible">

            {/* Status badge */}
            <motion.div variants={itemVariants} className="mb-7">
              <div className="status-badge w-fit">
                <span className="status-dot" />
                Available for opportunities
              </div>
            </motion.div>

            {/* Name */}
            <motion.div variants={itemVariants}>
              <h1 className="text-[clamp(3rem,8vw,5.5rem)] font-black leading-[0.95] tracking-tight mb-5">
                <span className={`block ${dark ? 'text-white' : 'text-slate-900'}`}>David</span>
                <span className="shimmer-text block">Lakra</span>
              </h1>
            </motion.div>

            {/* Role */}
            <motion.div variants={itemVariants} className={`text-xl md:text-2xl font-semibold mb-3 h-9 flex items-center gap-2 ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
              <Sparkles size={18} className="text-indigo-400 flex-shrink-0" />
              <TypingText />
            </motion.div>

            {/* Tagline */}
            <motion.p variants={itemVariants} className={`text-[15px] leading-relaxed mb-9 max-w-lg ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
              I build <span className={`font-medium ${dark ? 'text-slate-200' : 'text-slate-800'}`}>scalable web applications</span>,{' '}
              <span className={`font-medium ${dark ? 'text-slate-200' : 'text-slate-800'}`}>real-time dashboards</span>, and modern digital experiences
              that make a real impact.
            </motion.p>

            {/* Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mb-10">
              <MagneticButton>
                <motion.a
                  href="#projects"
                  onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="btn-primary gap-2"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <ExternalLink size={15} /> View Projects
                </motion.a>
              </MagneticButton>
              <MagneticButton>
                <motion.a
                  href="https://drive.google.com/file/d/1kZld4cI5bzZBkMpqC1UiZeVQNv8YCPfq/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline gap-2"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <Download size={15} /> Resume
                </motion.a>
              </MagneticButton>
              <MagneticButton>
                <motion.a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="btn-outline gap-2"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <Mail size={15} /> Contact
                </motion.a>
              </MagneticButton>
            </motion.div>

            {/* Social Icons */}
            <motion.div variants={itemVariants} className="flex items-center gap-3 flex-wrap">
              {[
                { icon: Github, href: 'https://github.com/lakradavid', label: 'GitHub', color: '#f1f5f9' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/david-lakra', label: 'LinkedIn', color: '#0A66C2' },
                { icon: Mail, href: 'mailto:lakradavid396@gmail.com', label: 'Email', color: '#6366f1' },
                { icon: Phone, href: 'tel:+917205187469', label: 'Phone', color: '#22c55e' },
                { icon: ExternalLink, href: 'https://codolio.com/profile/David22/card', label: 'Codolio', color: '#818cf8' },
              ].map(({ icon: Icon, href, label, color }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    dark
                      ? 'glass text-slate-500'
                      : 'bg-slate-100 border border-slate-200 text-slate-500 hover:border-indigo-300'
                  }`}
                  whileHover={{ scale: 1.15, y: -3, color }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.08 }}
                >
                  <Icon size={17} />
                </motion.a>
              ))}
              <span className={`text-xs ml-1 font-medium ${dark ? 'text-slate-600' : 'text-slate-400'}`}>Let's connect</span>
            </motion.div>
          </motion.div>

          {/* ── Right: Photo + Code Snippet ── */}
          <div className="flex flex-col gap-6">
            <ProfilePhoto dark={dark} />
            <CodeSnippet dark={dark} />
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className={`text-[11px] font-medium tracking-widest uppercase ${dark ? 'text-slate-600' : 'text-slate-400'}`}>Scroll</span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            className={dark ? 'text-slate-600' : 'text-slate-400'}
          >
            <ArrowDown size={14} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
