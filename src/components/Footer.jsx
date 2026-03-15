import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Code2, Heart, ArrowUp } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-sky-400 flex items-center justify-center">
              <Code2 size={15} className="text-white" />
            </div>
            <span className="font-bold text-white">David<span className="text-indigo-400">.</span></span>
          </div>

          <p className="text-slate-600 text-[13px] flex items-center gap-1.5">
            Crafted with <Heart size={12} className="text-red-400 fill-red-400" /> by David Lakra · {new Date().getFullYear()}
          </p>

          <div className="flex items-center gap-2.5">
            {[
              { icon: Github, href: 'https://github.com/lakradavid', label: 'GitHub' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/david-lakra', label: 'LinkedIn' },
              { icon: Mail, href: 'mailto:lakradavid396@gmail.com', label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 glass rounded-xl flex items-center justify-center text-slate-600 hover:text-indigo-400 transition-colors"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon size={15} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
