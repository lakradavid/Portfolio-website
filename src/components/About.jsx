import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Layers, Zap, Monitor, Palette, ArrowRight } from 'lucide-react';

const focusAreas = [
  { icon: Layers, title: 'Full Stack Dev', desc: 'End-to-end apps with React & Node.js', color: '#818cf8' },
  { icon: Zap, title: 'Real-Time Apps', desc: 'WebSocket-powered live dashboards', color: '#38bdf8' },
  { icon: Monitor, title: 'System Monitoring', desc: 'CPU, RAM & disk tracking tools', color: '#34d399' },
  { icon: Palette, title: 'UI/UX Focus', desc: 'Pixel-perfect, delightful interfaces', color: '#f59e0b' },
];

const stats = [
  { value: '2+', label: 'Years Coding', color: '#818cf8' },
  { value: '5+', label: 'Projects Built', color: '#38bdf8' },
  { value: '3', label: 'Certifications', color: '#34d399' },
  { value: '7.08', label: 'CGPA', color: '#f59e0b' },
];

const tags = ['React.js', 'Node.js', 'WebSockets', 'MongoDB', 'Express.js', 'Tailwind CSS', 'MySQL', 'Git'];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 32 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section id="about" className="py-28 relative overflow-hidden" ref={ref}>
      <div className="orb w-96 h-96 bg-indigo-600 top-0 right-0" style={{ opacity: 0.05 }} />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div {...fadeUp()} className="text-center mb-20">
          <div className="section-label mx-auto w-fit">About Me</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
            Who I <span className="gradient-text">Am</span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-[15px]">
            A passionate developer who turns complex problems into elegant, scalable solutions.
          </p>
        </motion.div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-5 gap-10 items-start mb-16">
          {/* Bio card — 3 cols */}
          <motion.div {...fadeUp(0.1)} className="lg:col-span-3">
            <div className="glass-strong rounded-3xl p-8 gradient-border h-full">
              <p className="text-slate-300 text-[15px] leading-[1.85] mb-5">
                David Lakra is a Computer Science Engineering student at{' '}
                <span className="text-indigo-400 font-semibold">Lovely Professional University</span>{' '}
                with strong skills in full-stack web development, real-time applications, and modern frontend technologies.
              </p>
              <p className="text-slate-500 text-[14px] leading-relaxed mb-7">
                He enjoys building scalable systems, optimizing performance, and creating user-friendly digital products.
                From architecting backend APIs to crafting pixel-perfect UIs, David brings a holistic approach to every project.
              </p>
              <div className="flex flex-wrap gap-2 mb-7">
                {tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              <motion.a
                href="#projects"
                onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="inline-flex items-center gap-2 text-indigo-400 text-sm font-semibold hover:text-indigo-300 transition-colors group"
                whileHover={{ x: 4 }}
              >
                See my work <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </div>
          </motion.div>

          {/* Stats — 2 cols */}
          <motion.div {...fadeUp(0.2)} className="lg:col-span-2 grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.25 + i * 0.08, ease: [0.34, 1.56, 0.64, 1] }}
                className="glass-strong rounded-2xl p-6 text-center card-hover gradient-border-hover relative overflow-hidden group"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                  style={{ background: `radial-gradient(circle at 50% 100%, ${stat.color}10, transparent 70%)` }}
                />
                <div className="text-3xl font-black mb-1.5" style={{ color: stat.color }}>{stat.value}</div>
                <div className="text-slate-500 text-xs font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Focus areas */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {focusAreas.map((area, i) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.35 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              className="glass rounded-2xl p-5 card-hover group relative overflow-hidden"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at 0% 100%, ${area.color}08, transparent 60%)` }}
              />
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                style={{ background: `${area.color}12`, border: `1px solid ${area.color}25` }}
              >
                <area.icon size={20} style={{ color: area.color }} />
              </div>
              <h3 className="text-white font-semibold text-sm mb-1.5">{area.title}</h3>
              <p className="text-slate-600 text-xs leading-relaxed">{area.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
