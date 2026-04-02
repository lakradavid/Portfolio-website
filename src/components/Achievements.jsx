import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, Trophy, Zap, ExternalLink } from 'lucide-react';
import hackerrankImg from '../assets/Hackerrank.png';
import codechefImg from '../assets/codechef.png';
import codolioImg from '../assets/Codolio.png';

const achievements = [
  {
    icon: Star,
    title: '5 Star Python Badge',
    platform: 'HackerRank',
    platformColor: '#00EA64',
    desc: 'Earned the prestigious 5-star Python badge by solving advanced algorithmic challenges and competitive programming problems.',
    color: '#34d399',
    metric: '5★',
    metricLabel: 'Rating',
    image: hackerrankImg,
    link: null,
  },
  {
    icon: Trophy,
    title: '2500 Points – Python Quiz',
    platform: 'CodeChef',
    platformColor: '#F7A800',
    desc: 'Accumulated 2500 points in the CodeChef Python Quiz, demonstrating strong Python proficiency and problem-solving skills.',
    color: '#f59e0b',
    metric: '2500',
    metricLabel: 'Points',
    image: codechefImg,
    link: null,
  },
  {
    icon: Trophy,
    title: 'Codolio Dev Profile',
    platform: 'Codolio',
    platformColor: '#818cf8',
    desc: 'Consolidated coding profile on Codolio showcasing competitive programming stats, solved problems, and overall developer activity.',
    color: '#818cf8',
    metric: 'View',
    metricLabel: 'Profile',
    image: codolioImg,
    link: 'https://codolio.com/profile/David22/card',
  },
];

export default function Achievements() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="achievements" className="py-28 relative" ref={ref}>
      <div className="section-divider mb-0" />
      <div className="orb w-72 h-72 bg-green-500 bottom-0 right-0" style={{ opacity: 0.05 }} />

      <div className="max-w-7xl mx-auto px-6 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="section-label mx-auto w-fit">Recognition</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            <span className="gradient-text">Achievements</span>
          </h2>
          <p className="text-slate-500 max-w-lg mx-auto text-[15px]">
            Milestones that reflect dedication and technical excellence.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {achievements.map((ach, i) => (
            <motion.div
              key={ach.title}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.15, ease: [0.34, 1.56, 0.64, 1] }}
              className="glass-strong rounded-3xl p-7 card-hover group relative overflow-hidden"
            >
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: `linear-gradient(90deg, transparent, ${ach.color}, transparent)` }}
              />
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600 rounded-3xl"
                style={{ background: `radial-gradient(circle at 50% 100%, ${ach.color}08, transparent 65%)` }}
              />

              <div className="relative z-10">
                {/* Platform heading above image */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${ach.color}12`, border: `1px solid ${ach.color}25` }}
                      whileHover={{ rotate: 8, scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <ach.icon size={16} style={{ color: ach.color }} />
                    </motion.div>
                    <div>
                      <h3 className="text-white font-bold text-[15px] leading-none">{ach.platform}</h3>
                      <p className="text-slate-500 text-[11px] mt-0.5">{ach.title}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-black leading-none" style={{ color: ach.color }}>{ach.metric}</div>
                    <div className="text-[10px] text-slate-600">{ach.metricLabel}</div>
                  </div>
                </div>

                {/* Image thumbnail */}
                <div className="relative rounded-xl overflow-hidden mb-5 bg-slate-900/60" style={{ aspectRatio: '16/9' }}>
                  <img
                    src={ach.image}
                    alt={`${ach.platform} achievement`}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                </div>

                <p className="text-slate-500 text-[13px] leading-relaxed mb-1">{ach.desc}</p>

                {/* Progress bar decoration */}
                <div className="mt-5 pt-4 border-t border-white/5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Zap size={12} style={{ color: ach.color }} />
                      <span className="text-[11px] text-slate-600">Competitive Programming Achievement</span>
                    </div>
                    {ach.link && (
                      <motion.a
                        href={ach.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[11px] font-semibold transition-colors"
                        style={{ color: ach.color }}
                        whileHover={{ scale: 1.05, x: 2 }}
                      >
                        Visit <ExternalLink size={10} />
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
