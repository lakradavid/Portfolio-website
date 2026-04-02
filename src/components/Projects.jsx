import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Monitor, Dumbbell, Star, GitFork, BookOpen, ArrowUpRight, Users, Code2 } from 'lucide-react';
import TiltCard from './TiltCard';
import corewatchImg from '../assets/corewatch.png';
import trainxImg from '../assets/trainX.png';

const projects = [
  {
    id: 1,
    title: 'CoreWatch',
    subtitle: 'Real-Time System Monitoring Dashboard',
    category: 'fullstack',
    icon: Monitor,
    image: corewatchImg,
    color: '#818cf8',
    accentColor: '#6366f1',
    mockupBg: 'from-indigo-950/80 to-slate-950/80',
    features: [
      'Tracks CPU, RAM, disk usage & temperature',
      'WebSocket real-time updates every 2 seconds',
      'Intelligent alert thresholds & notifications',
      'Historical system data visualization',
    ],
    tech: ['React.js', 'Node.js', 'Express.js', 'WebSocket', 'Recharts'],
    github: 'https://github.com/lakradavid/CoreWatch',
    demo: 'https://lakradavid.github.io/CoreWatch/',
    stats: [{ label: 'Update Rate', value: '2s' }, { label: 'Metrics', value: '8+' }],
  },
  {
    id: 2,
    title: 'TrainX',
    subtitle: 'Virtual Trainer Platform',
    category: 'frontend',
    icon: Dumbbell,
    image: trainxImg,
    color: '#34d399',
    accentColor: '#22c55e',
    mockupBg: 'from-green-950/80 to-slate-950/80',
    features: [
      'Structured workout plans & programs',
      'Trainer profiles & discovery system',
      'Fully responsive UI across all devices',
      'Optimized loading with lazy loading',
    ],
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Flexbox'],
    github: 'https://github.com/lakradavid/TrainX',
    demo: 'https://virtual-personal-trainer.vercel.app/dashboard',
    stats: [{ label: 'Responsive', value: '100%' }, { label: 'Load Time', value: '<1s' }],
  },
];

const filters = [
  { label: 'All Projects', value: 'all' },
  { label: 'Full Stack', value: 'fullstack' },
  { label: 'Frontend', value: 'frontend' },
];

const repos = [
  { name: 'CoreWatch', desc: 'Real-time system monitoring dashboard', lang: 'JavaScript', color: '#f7df1e', stars: 2, forks: 0, url: 'https://github.com/lakradavid/CoreWatch' },
  { name: 'TrainX', desc: 'Virtual personal trainer platform', lang: 'HTML', color: '#e34c26', stars: 1, forks: 0, url: 'https://github.com/lakradavid/TrainX' },
  { name: 'Portfolio', desc: 'Personal developer portfolio website', lang: 'JavaScript', color: '#f7df1e', stars: 0, forks: 0, url: 'https://github.com/lakradavid' },
];

function GitHubCard({ inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="glass-strong rounded-3xl overflow-hidden relative group h-fit"
    >
      <div className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: 'linear-gradient(90deg, transparent, #f1f5f9, #6366f1, transparent)' }}
      />
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center border border-white/10">
              <Github size={18} className="text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm leading-none mb-0.5">lakradavid</h3>
              <p className="text-slate-500 text-[11px]">github.com/lakradavid</p>
            </div>
          </div>
          <motion.a
            href="https://github.com/lakradavid"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 glass rounded-xl flex items-center justify-center text-slate-500 hover:text-white transition-colors"
            whileHover={{ scale: 1.1, rotate: 8 }}
            whileTap={{ scale: 0.9 }}
            aria-label="View GitHub profile"
          >
            <ArrowUpRight size={14} />
          </motion.a>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          {[
            { icon: BookOpen, label: 'Repos', value: '6+', color: '#818cf8' },
            { icon: Users, label: 'Followers', value: '5+', color: '#38bdf8' },
            { icon: Code2, label: 'Languages', value: '6+', color: '#34d399' },
          ].map((s) => (
            <div key={s.label} className="glass rounded-xl p-2.5 text-center">
              <s.icon size={13} className="mx-auto mb-1" style={{ color: s.color }} />
              <div className="text-white text-sm font-black leading-none mb-0.5">{s.value}</div>
              <div className="text-slate-600 text-[10px]">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Repo list */}
        <div className="space-y-2.5 mb-5">
          {repos.map((repo, i) => (
            <motion.a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5 + i * 0.08 }}
              className="flex items-start gap-3 p-3 glass rounded-xl hover:bg-white/5 transition-all group/repo"
              whileHover={{ x: 3 }}
            >
              <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: `${repo.color}18`, border: `1px solid ${repo.color}30` }}>
                <BookOpen size={12} style={{ color: repo.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <span className="text-slate-200 text-[12px] font-semibold truncate group-hover/repo:text-white transition-colors">{repo.name}</span>
                  <ArrowUpRight size={11} className="text-slate-600 group-hover/repo:text-slate-400 flex-shrink-0 transition-colors" />
                </div>
                <p className="text-slate-600 text-[11px] leading-snug truncate mb-1.5">{repo.desc}</p>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-[10px] text-slate-600">
                    <span className="w-2 h-2 rounded-full inline-block" style={{ background: repo.color }} />
                    {repo.lang}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-slate-600">
                    <Star size={9} /> {repo.stars}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-slate-600">
                    <GitFork size={9} /> {repo.forks}
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Contribution graph */}
        <div className="mb-5">
          <p className="text-slate-600 text-[10px] font-medium uppercase tracking-wider mb-2">Activity</p>
          <div className="grid gap-0.5" style={{ gridTemplateColumns: 'repeat(26, 1fr)' }}>
            {Array.from({ length: 104 }).map((_, i) => {
              const intensity = Math.random();
              const opacity = intensity < 0.5 ? 0.08 : intensity < 0.75 ? 0.3 : intensity < 0.9 ? 0.6 : 1;
              return (
                <div
                  key={i}
                  className="aspect-square rounded-[2px]"
                  style={{ background: `rgba(99,102,241,${opacity})` }}
                />
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.a
          href="https://github.com/lakradavid?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-[12px] font-semibold text-slate-400 border border-white/8 hover:border-white/15 hover:text-white transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Github size={13} /> View all repositories
        </motion.a>
      </div>
    </motion.div>
  );
}

function MockupPreview({ project }) {
  return (
    <div className="relative rounded-xl overflow-hidden mb-6 group/preview bg-slate-900/60" style={{ aspectRatio: '16/9' }}>
      {/* Screenshot */}
      <img
        src={project.image}
        alt={`${project.title} preview`}
        className="w-full h-full object-contain transition-transform duration-700 group-hover/preview:scale-105"
      />
      {/* Overlay with stats on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover/preview:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <div className="flex gap-2">
          {project.stats.map(s => (
            <div key={s.label} className="glass rounded-lg px-2.5 py-1.5 text-center">
              <div className="text-xs font-bold" style={{ color: project.color }}>{s.value}</div>
              <div className="text-[9px] text-slate-400">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Browser chrome bar */}
      <div className="absolute top-0 left-0 right-0 h-6 bg-black/60 backdrop-blur-sm flex items-center px-2.5 gap-1.5">
        <div className="w-2 h-2 rounded-full bg-red-500/70" />
        <div className="w-2 h-2 rounded-full bg-yellow-500/70" />
        <div className="w-2 h-2 rounded-full bg-green-500/70" />
        <div className="flex-1 mx-2 h-3 rounded bg-white/10 flex items-center px-2">
          <span className="text-[8px] text-slate-500 truncate">{project.demo}</span>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, inView, index }) {
  return (
    <TiltCard intensity={8} className="h-full">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.55, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
        className="glass-strong rounded-3xl overflow-hidden card-hover group relative h-full flex flex-col"
      >
      <div className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }}
      />
      <div className="p-7 flex flex-col flex-1">
        <MockupPreview project={project} />
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-white text-xl font-black mb-0.5">{project.title}</h3>
            <p className="text-slate-500 text-xs">{project.subtitle}</p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <motion.a href={project.github} target="_blank" rel="noopener noreferrer"
              className="w-8 h-8 glass rounded-xl flex items-center justify-center text-slate-500 hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} aria-label="GitHub">
              <Github size={14} />
            </motion.a>
            <motion.a href={project.demo} target="_blank" rel="noopener noreferrer"
              className="w-8 h-8 glass rounded-xl flex items-center justify-center text-slate-500 hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} aria-label="Live Demo">
              <ExternalLink size={14} />
            </motion.a>
          </div>
        </div>
        <ul className="space-y-2 mb-5">
          {project.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-[13px] text-slate-400">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: project.color }} />
              {f}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tech.map((t) => (
            <span key={t} className="text-[11px] px-2.5 py-1 rounded-lg font-semibold"
              style={{ background: `${project.color}12`, color: project.color, border: `1px solid ${project.color}25` }}>
              {t}
            </span>
          ))}
        </div>
        <div className="flex gap-3 mt-auto">
          <motion.a href={project.github} target="_blank" rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[13px] font-semibold text-slate-400 border border-white/8 hover:border-white/15 hover:text-white transition-all"
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Github size={14} /> GitHub
          </motion.a>
          <motion.a href={project.demo} target="_blank" rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[13px] font-semibold text-white transition-all"
            style={{ background: `linear-gradient(135deg, ${project.accentColor}, ${project.color})` }}
            whileHover={{ scale: 1.02, boxShadow: `0 8px 25px ${project.color}40` }}
            whileTap={{ scale: 0.98 }}>
            <ExternalLink size={14} /> Live Demo
          </motion.a>
        </div>
      </div>
    </motion.div>
    </TiltCard>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('all');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-28 relative" ref={ref}>
      <div className="section-divider mb-0" />
      <div className="orb w-96 h-96 bg-indigo-600 top-1/2 right-0" style={{ opacity: 0.05 }} />

      <div className="max-w-7xl mx-auto px-6 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="section-label mx-auto w-fit">Featured Work</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            My <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-slate-500 max-w-lg mx-auto text-[15px]">
            Real-world applications built with modern technologies.
          </p>
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center gap-2 mb-12"
        >
          {filters.map((f) => (
            <button key={f.value} onClick={() => setFilter(f.value)}
              className={`px-5 py-2 rounded-xl text-[13px] font-semibold transition-all duration-300 ${
                filter === f.value
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                  : 'glass text-slate-500 hover:text-slate-200 hover:bg-white/5'
              }`}>
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Main layout: project cards left, GitHub card right */}
        <div className="grid lg:grid-cols-3 gap-7 items-start">
          <div className="lg:col-span-2 grid md:grid-cols-2 gap-7 items-stretch">
            <AnimatePresence mode="wait">
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} inView={inView} index={i} />
              ))}
            </AnimatePresence>
          </div>
          <div className="lg:col-span-1">
            <GitHubCard inView={inView} />
          </div>
        </div>
      </div>
    </section>
  );
}
