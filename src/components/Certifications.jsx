import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, CheckCircle, ExternalLink } from 'lucide-react';
import nptelImg from '../assets/NPTEL.png';
import ibmImg from '../assets/IBM.png';
import googleImg from '../assets/Google.png';
import oopsImg from '../assets/oops.png';

const certs = [
  {
    title: 'Cloud Computing',
    issuer: 'NPTEL',
    desc: 'Cloud architecture, deployment models, IaaS, PaaS, SaaS, and cloud security fundamentals.',
    color: '#f59e0b',
    issuerColor: '#fbbf24',
    badge: 'NPTEL',
    image: nptelImg,
    year: '2024',
    skills: ['Cloud Architecture', 'AWS Basics', 'Deployment'],
    link: 'https://drive.google.com/file/d/1BNezNp4j-7o4a8o1F3CG7iiRcLp9XG6R/view',
  },
  {
    title: 'Intro to Hardware & Operating Systems',
    issuer: 'IBM',
    desc: 'Computer hardware components, OS concepts, file systems, and system administration basics.',
    color: '#818cf8',
    issuerColor: '#a5b4fc',
    badge: 'IBM',
    image: ibmImg,
    year: '2024',
    skills: ['Hardware', 'OS Concepts', 'File Systems'],
    link: 'https://www.coursera.org/account/accomplishments/verify/IQFSVGP9BOJE',
  },
  {
    title: 'Bits and Bytes of Computer Networking',
    issuer: 'Google',
    desc: 'Networking fundamentals, TCP/IP, DNS, protocols, and internet infrastructure.',
    color: '#38bdf8',
    issuerColor: '#7dd3fc',
    badge: 'Google',
    image: googleImg,
    year: '2024',
    skills: ['TCP/IP', 'DNS', 'Protocols'],
    link: 'https://www.coursera.org/account/accomplishments/verify/G0L3YK73E4U6',
  },
  {
    title: 'OOPs Using C++',
    issuer: 'Coursera',
    desc: 'Object-oriented programming concepts including classes, inheritance, polymorphism, and encapsulation in C++.',
    color: '#34d399',
    issuerColor: '#6ee7b7',
    badge: 'C++',
    image: oopsImg,
    year: '2024',
    skills: ['OOP', 'C++', 'Inheritance'],
    link: 'https://drive.google.com/file/d/1jtwNlQYv1aRY9B66IJuP926QfxfuKSsB/view',
  },
];

export default function Certifications() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="certifications" className="py-28 relative" ref={ref}>
      <div className="section-divider mb-0" />
      <div className="orb w-80 h-80 bg-amber-500 top-0 right-1/4" style={{ opacity: 0.04 }} />

      <div className="max-w-7xl mx-auto px-6 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="section-label mx-auto w-fit">Credentials</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            <span className="gradient-text">Certifications</span>
          </h2>
          <p className="text-slate-500 max-w-lg mx-auto text-[15px]">
            Industry-recognized certifications from top global organizations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certs.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.13, ease: [0.22, 1, 0.36, 1] }}
              className="glass-strong rounded-3xl p-6 card-hover group relative overflow-hidden"
            >
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: `linear-gradient(90deg, transparent, ${cert.color}, transparent)` }}
              />
              {/* Glow orb */}
              <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700"
                style={{ background: cert.color }}
              />

              <div className="relative z-10">
                {/* Certificate image thumbnail */}
                {cert.image && (
                  <div className="relative rounded-xl overflow-hidden mb-5 group/thumb" style={{ aspectRatio: '4/3' }}>
                    <img
                      src={cert.image}
                      alt={`${cert.title} certificate`}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/thumb:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-2 right-2">
                      <div className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold"
                        style={{ background: `${cert.color}25`, color: cert.color, border: `1px solid ${cert.color}40` }}>
                        <CheckCircle size={8} /> Verified
                      </div>
                    </div>
                  </div>
                )}

                {/* Header row */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-[10px] font-black transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                    style={{ background: `${cert.color}15`, color: cert.color, border: `1px solid ${cert.color}30` }}
                  >
                    {cert.badge}
                  </div>
                  <span className="text-[11px] font-semibold" style={{ color: cert.issuerColor }}>{cert.year}</span>
                </div>

                <h3 className="text-white font-bold text-[15px] leading-snug mb-1">{cert.title}</h3>
                <p className="text-[13px] font-semibold mb-3" style={{ color: cert.issuerColor }}>
                  {cert.issuer} · {cert.year}
                </p>
                <p className="text-slate-500 text-[12px] leading-relaxed mb-5">{cert.desc}</p>

                {/* Skill tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {cert.skills.map(s => (
                    <span key={s} className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                      style={{ background: `${cert.color}10`, color: cert.color, border: `1px solid ${cert.color}20` }}>
                      {s}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Award size={13} className="text-slate-600" />
                    <span className="text-[11px] text-slate-600">Certificate of Completion</span>
                  </div>
                  <motion.a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[11px] font-semibold transition-colors"
                    style={{ color: cert.color }}
                    whileHover={{ scale: 1.05, x: 2 }}
                  >
                    View <ExternalLink size={10} />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
