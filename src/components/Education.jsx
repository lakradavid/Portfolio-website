import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, MapPin, Calendar, BookOpen, Code2, Award } from 'lucide-react';

const highlights = [
  { icon: Code2, label: 'Specialization', value: 'Full Stack Dev', color: '#818cf8' },
  { icon: BookOpen, label: 'Degree', value: 'B.Tech CSE', color: '#38bdf8' },
  { icon: Award, label: 'Status', value: 'Pursuing', color: '#34d399' },
];

const schoolRecords = [
  {
    level: 'Intermediate (Class XII)',
    school: "St Paul's School",
    location: 'Rourkela, Odisha',
    percentage: '78.25%',
    period: 'Apr 2021 – Mar 2022',
    color: '#818cf8',
  },
  {
    level: 'Matriculation (Class X)',
    school: "St Paul's School",
    location: 'Rourkela, Odisha',
    percentage: '78.20%',
    period: 'Apr 2019 – Mar 2020',
    color: '#38bdf8',
  },
];

export default function Education() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="education" className="py-28 relative" ref={ref}>
      <div className="section-divider mb-0" />
      <div className="orb w-80 h-80 bg-indigo-600 top-1/2 left-0" style={{ opacity: 0.05 }} />

      <div className="max-w-7xl mx-auto px-6 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="section-label mx-auto w-fit">Academic Background</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            <span className="gradient-text">Education</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {/* University card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="glass-strong rounded-3xl p-8 gradient-border card-hover relative overflow-hidden group mb-6"
          >
            {/* Top accent */}
            <div className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ background: 'linear-gradient(90deg, transparent, #6366f1, #38bdf8, transparent)' }}
            />
            {/* Glow */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none group-hover:opacity-150 transition-opacity" />

            <div className="relative z-10">
              <div className="flex items-start gap-6 mb-7">
                {/* Icon */}
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-sky-500 flex items-center justify-center shadow-xl shadow-indigo-500/30">
                    <GraduationCap size={28} className="text-white" />
                  </div>
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-indigo-600 to-sky-500 blur-md opacity-30" />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="text-white text-xl font-black mb-1 leading-tight">
                        Lovely Professional University
                      </h3>
                      <p className="text-indigo-400 font-semibold text-[14px]">
                        Bachelor of Technology – Computer Science Engineering
                      </p>
                    </div>
                    {/* CGPA badge */}
                    <div className="glass rounded-2xl px-5 py-3 text-center flex-shrink-0 gradient-border">
                      <div className="text-3xl font-black gradient-text leading-none mb-0.5">7.08</div>
                      <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">CGPA</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-5 text-[13px] text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <MapPin size={13} className="text-indigo-400" />
                      Phagwara, Punjab
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar size={13} className="text-sky-400" />
                      2022 – 2026
                    </span>
                  </div>
                </div>
              </div>

              {/* Highlight cards */}
              <div className="grid grid-cols-3 gap-4">
                {highlights.map((h, i) => (
                  <motion.div
                    key={h.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    className="glass rounded-2xl p-4 text-center group/card hover:scale-105 transition-transform duration-300"
                  >
                    <h.icon size={16} className="mx-auto mb-2" style={{ color: h.color }} />
                    <div className="text-white text-[13px] font-bold">{h.value}</div>
                    <div className="text-slate-600 text-[10px] mt-0.5">{h.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* School cards */}
          <div className="grid md:grid-cols-2 gap-5">
            {schoolRecords.map((s, i) => (
              <motion.div
                key={s.level}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.25 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="glass-strong rounded-2xl p-6 card-hover relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{ background: `linear-gradient(90deg, transparent, ${s.color}, transparent)` }}
                />
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl pointer-events-none"
                  style={{ background: `${s.color}15` }}
                />
                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${s.color}18`, border: `1px solid ${s.color}30` }}>
                      <GraduationCap size={20} style={{ color: s.color }} />
                    </div>
                    <div className="glass rounded-xl px-3 py-2 text-center flex-shrink-0">
                      <div className="text-lg font-black leading-none" style={{ color: s.color }}>{s.percentage}</div>
                      <div className="text-[9px] text-slate-500 font-semibold uppercase tracking-wider mt-0.5">Score</div>
                    </div>
                  </div>
                  <h3 className="text-white font-black text-[15px] mb-0.5">{s.school}</h3>
                  <p className="text-[13px] font-semibold mb-3" style={{ color: s.color }}>{s.level}</p>
                  <div className="flex flex-col gap-1.5 text-[12px] text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <MapPin size={11} style={{ color: s.color }} /> {s.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar size={11} className="text-sky-400" /> {s.period}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
