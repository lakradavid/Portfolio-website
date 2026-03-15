import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const categories = [
  {
    title: 'Languages',
    color: '#818cf8',
    glow: 'rgba(129,140,248,0.3)',
    skills: [
      { name: 'JavaScript', level: 90 },
      { name: 'Python', level: 85 },
      { name: 'C++', level: 75 },
      { name: 'Java', level: 70 },
      { name: 'C', level: 72 },
      { name: 'PHP', level: 60 },
    ],
  },
  {
    title: 'Frameworks',
    color: '#38bdf8',
    glow: 'rgba(56,189,248,0.3)',
    skills: [
      { name: 'React.js', level: 92 },
      { name: 'Node.js', level: 88 },
      { name: 'Express.js', level: 85 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'Bootstrap', level: 80 },
      { name: 'Vite', level: 82 },
    ],
  },
  {
    title: 'Tools & DBs',
    color: '#34d399',
    glow: 'rgba(52,211,153,0.3)',
    skills: [
      { name: 'Git & GitHub', level: 88 },
      { name: 'MongoDB', level: 80 },
      { name: 'MySQL', level: 75 },
      { name: 'HTML5 & CSS3', level: 95 },
      { name: 'VS Code', level: 92 },
      { name: 'Thunder Client', level: 78 },
    ],
  },
];

const techBadges = [
  { name: 'React', abbr: 'Re', color: '#61DAFB' },
  { name: 'Node.js', abbr: 'No', color: '#22C55E' },
  { name: 'JavaScript', abbr: 'JS', color: '#F7DF1E' },
  { name: 'Python', abbr: 'Py', color: '#3B82F6' },
  { name: 'MongoDB', abbr: 'Mg', color: '#47A248' },
  { name: 'Express', abbr: 'Ex', color: '#818cf8' },
  { name: 'Tailwind', abbr: 'Tw', color: '#38BDF8' },
  { name: 'Git', abbr: 'Gt', color: '#F05028' },
  { name: 'MySQL', abbr: 'My', color: '#00758F' },
  { name: 'HTML5', abbr: 'H5', color: '#E34F26' },
  { name: 'CSS3', abbr: 'C3', color: '#1572B6' },
  { name: 'PHP', abbr: 'Ph', color: '#777BB4' },
];

function SkillBar({ name, level, color, inView, delay }) {
  return (
    <div className="mb-4 group">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-slate-400 text-[13px] font-medium group-hover:text-slate-200 transition-colors">{name}</span>
        <motion.span
          className="text-[11px] font-bold tabular-nums"
          style={{ color }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.8 }}
        >
          {level}%
        </motion.span>
      </div>
      <div className="skill-track">
        <motion.div
          className="h-full rounded-full relative"
          style={{ background: `linear-gradient(90deg, ${color}cc, ${color})` }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.3, delay, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/80 shadow-sm" />
        </motion.div>
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" className="py-28 relative" ref={ref}>
      <div className="section-divider mb-0" />
      <div className="orb w-80 h-80 bg-sky-500 bottom-0 left-0" style={{ opacity: 0.05 }} />

      <div className="max-w-7xl mx-auto px-6 pt-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="section-label mx-auto w-fit">Technical Skills</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            My <span className="gradient-text">Toolkit</span>
          </h2>
          <p className="text-slate-500 max-w-lg mx-auto text-[15px]">
            Technologies I use to build modern, scalable applications.
          </p>
        </motion.div>

        {/* Tech badge cloud */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {techBadges.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, scale: 0.6, y: 10 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.04, ease: [0.34, 1.56, 0.64, 1] }}
              whileHover={{ scale: 1.12, y: -4 }}
              className="glass rounded-2xl px-4 py-2.5 flex items-center gap-2.5 cursor-default group"
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-black flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${t.color}18`, color: t.color, border: `1px solid ${t.color}30` }}
              >
                {t.abbr}
              </div>
              <span className="text-slate-400 text-[13px] font-medium group-hover:text-slate-200 transition-colors">{t.name}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Skill bar cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + ci * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="glass-strong rounded-3xl p-7 card-hover relative overflow-hidden group"
            >
              {/* Top glow line */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-60"
                style={{ background: `linear-gradient(90deg, transparent, ${cat.color}, transparent)` }}
              />
              {/* Corner glow */}
              <div
                className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: cat.color }}
              />

              <div className="flex items-center gap-3 mb-7 relative z-10">
                <div
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ background: cat.color, boxShadow: `0 0 12px ${cat.glow}` }}
                />
                <h3 className="text-white font-bold text-base">{cat.title}</h3>
              </div>

              <div className="relative z-10">
                {cat.skills.map((skill, si) => (
                  <SkillBar
                    key={skill.name}
                    {...skill}
                    color={cat.color}
                    inView={inView}
                    delay={0.3 + ci * 0.1 + si * 0.07}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
