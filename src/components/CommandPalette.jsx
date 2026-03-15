import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Hash, ExternalLink, Sun, Moon, Github, Linkedin, Mail, Download, X } from 'lucide-react';
import { useTheme } from '../App';

const sections = [
  { id: 'about',         label: 'About',         icon: Hash,         type: 'nav' },
  { id: 'skills',        label: 'Skills',         icon: Hash,         type: 'nav' },
  { id: 'projects',      label: 'Projects',       icon: Hash,         type: 'nav' },
  { id: 'certifications',label: 'Certifications', icon: Hash,         type: 'nav' },
  { id: 'education',     label: 'Education',      icon: Hash,         type: 'nav' },
  { id: 'contact',       label: 'Contact',        icon: Hash,         type: 'nav' },
];

const links = [
  { label: 'GitHub',    icon: Github,       href: 'https://github.com/lakradavid',                                              type: 'link' },
  { label: 'LinkedIn',  icon: Linkedin,     href: 'https://www.linkedin.com/in/david-lakra',                                    type: 'link' },
  { label: 'Email',     icon: Mail,         href: 'mailto:lakradavid396@gmail.com',                                             type: 'link' },
  { label: 'Resume',    icon: Download,     href: 'https://drive.google.com/file/d/1kZld4cI5bzZBkMpqC1UiZeVQNv8YCPfq/view',   type: 'link' },
  { label: 'Codolio',   icon: ExternalLink, href: 'https://codolio.com/profile/David22/card',                                   type: 'link' },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const inputRef = useRef(null);
  const { dark, toggle } = useTheme();

  const allItems = [
    ...sections,
    ...links,
    { label: dark ? 'Switch to Light Mode' : 'Switch to Dark Mode', icon: dark ? Sun : Moon, type: 'action', action: toggle },
  ];

  const filtered = query.trim()
    ? allItems.filter(i => i.label.toLowerCase().includes(query.toLowerCase()))
    : allItems;

  const close = useCallback(() => { setOpen(false); setQuery(''); setSelected(0); }, []);

  const run = useCallback((item) => {
    if (item.type === 'nav') {
      document.querySelector(`#${item.id}`)?.scrollIntoView({ behavior: 'smooth' });
    } else if (item.type === 'link') {
      window.open(item.href, '_blank', 'noopener noreferrer');
    } else if (item.type === 'action') {
      item.action();
    }
    close();
  }, [close]);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(o => !o);
      }
      if (!open) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowDown') setSelected(s => Math.min(s + 1, filtered.length - 1));
      if (e.key === 'ArrowUp') setSelected(s => Math.max(s - 1, 0));
      if (e.key === 'Enter' && filtered[selected]) run(filtered[selected]);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, filtered, selected, close, run]);

  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 50); }, [open]);
  useEffect(() => { setSelected(0); }, [query]);

  const typeColor = (type) => {
    if (type === 'nav') return '#818cf8';
    if (type === 'link') return '#38bdf8';
    return '#34d399';
  };

  return (
    <>
      {/* Trigger hint — bottom left */}
      <motion.button
        onClick={() => setOpen(true)}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3 }}
        className={`fixed bottom-6 left-6 z-40 hidden md:flex items-center gap-2 px-3 py-2 rounded-xl text-[11px] font-medium transition-all ${
          dark
            ? 'glass text-slate-500 hover:text-slate-300 border border-white/5'
            : 'bg-white border border-slate-200 text-slate-400 hover:text-slate-600 shadow-sm'
        }`}
        aria-label="Open command palette"
      >
        <Search size={11} />
        <span>Command</span>
        <kbd className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${dark ? 'bg-white/8 text-slate-500' : 'bg-slate-100 text-slate-400'}`}>
          ⌘K
        </kbd>
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-[9990] bg-black/60 backdrop-blur-sm"
              onClick={close}
            />

            {/* Palette */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className={`fixed top-[20%] left-1/2 -translate-x-1/2 z-[9991] w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl ${
                dark
                  ? 'bg-[#0d1526] border border-white/10'
                  : 'bg-white border border-slate-200'
              }`}
              style={{ boxShadow: '0 25px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.15)' }}
            >
              {/* Search input */}
              <div className={`flex items-center gap-3 px-4 py-3.5 border-b ${dark ? 'border-white/8' : 'border-slate-100'}`}>
                <Search size={16} className={dark ? 'text-slate-500' : 'text-slate-400'} />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search sections, links, actions..."
                  className={`flex-1 bg-transparent outline-none text-sm font-medium placeholder:font-normal ${
                    dark ? 'text-slate-100 placeholder:text-slate-600' : 'text-slate-800 placeholder:text-slate-400'
                  }`}
                />
                <button onClick={close} className={`p-1 rounded-lg transition-colors ${dark ? 'text-slate-600 hover:text-slate-400' : 'text-slate-400 hover:text-slate-600'}`}>
                  <X size={14} />
                </button>
              </div>

              {/* Results */}
              <div className="max-h-72 overflow-y-auto py-2">
                {filtered.length === 0 ? (
                  <p className={`text-center py-8 text-sm ${dark ? 'text-slate-600' : 'text-slate-400'}`}>No results found</p>
                ) : (
                  filtered.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.label}
                        onClick={() => run(item)}
                        onMouseEnter={() => setSelected(i)}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                          selected === i
                            ? dark ? 'bg-indigo-600/20' : 'bg-indigo-50'
                            : 'bg-transparent'
                        }`}
                      >
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: `${typeColor(item.type)}15`, border: `1px solid ${typeColor(item.type)}25` }}>
                          <Icon size={13} style={{ color: typeColor(item.type) }} />
                        </div>
                        <span className={`text-sm font-medium flex-1 ${dark ? 'text-slate-200' : 'text-slate-700'}`}>
                          {item.label}
                        </span>
                        <span className={`text-[10px] uppercase tracking-wider font-semibold ${dark ? 'text-slate-600' : 'text-slate-400'}`}>
                          {item.type}
                        </span>
                      </button>
                    );
                  })
                )}
              </div>

              {/* Footer */}
              <div className={`px-4 py-2.5 border-t flex items-center gap-4 ${dark ? 'border-white/8' : 'border-slate-100'}`}>
                {[['↑↓', 'navigate'], ['↵', 'select'], ['esc', 'close']].map(([key, label]) => (
                  <span key={key} className={`flex items-center gap-1.5 text-[10px] ${dark ? 'text-slate-600' : 'text-slate-400'}`}>
                    <kbd className={`px-1.5 py-0.5 rounded font-mono text-[10px] ${dark ? 'bg-white/8 text-slate-500' : 'bg-slate-100 text-slate-500'}`}>{key}</kbd>
                    {label}
                  </span>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
