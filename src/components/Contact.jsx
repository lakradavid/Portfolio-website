import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Github, Linkedin, Mail, Phone, Send, CheckCircle, ArrowRight } from 'lucide-react';

const socials = [
  { icon: Github, label: 'GitHub', value: 'github.com/lakradavid', href: 'https://github.com/lakradavid', color: '#f1f5f9' },
  { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/david-lakra', href: 'https://www.linkedin.com/in/david-lakra', color: '#0A66C2' },
  { icon: Mail, label: 'Email', value: 'lakradavid396@gmail.com', href: 'mailto:lakradavid396@gmail.com', color: '#818cf8' },
  { icon: Phone, label: 'Phone', value: '+91-7205187469', href: 'tel:+917205187469', color: '#34d399' },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setSent(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section id="contact" className="py-28 relative" ref={ref}>
      <div className="section-divider mb-0" />
      <div className="orb w-96 h-96 bg-indigo-600 bottom-0 left-1/4" style={{ opacity: 0.06 }} />

      <div className="max-w-7xl mx-auto px-6 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="section-label mx-auto w-fit">Get In Touch</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-slate-500 max-w-lg mx-auto text-[15px]">
            Have a project in mind or want to collaborate? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="text-white font-bold text-lg mb-2">Reach me directly</h3>
            <p className="text-slate-500 text-[13px] mb-7">
              I'm always open to discussing new projects, creative ideas, or opportunities.
            </p>
            <div className="space-y-3">
              {socials.map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                  className="flex items-center gap-4 glass rounded-2xl p-4 group card-hover"
                  whileHover={{ x: 5 }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                    style={{ background: `${s.color}12`, border: `1px solid ${s.color}25` }}
                  >
                    <s.icon size={17} style={{ color: s.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] text-slate-600 mb-0.5 font-medium uppercase tracking-wider">{s.label}</div>
                    <div className="text-slate-300 text-[13px] font-medium group-hover:text-white transition-colors truncate">{s.value}</div>
                  </div>
                  <ArrowRight size={14} className="text-slate-700 group-hover:text-slate-400 transition-colors flex-shrink-0" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 36 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="glass-strong rounded-3xl p-8 gradient-border relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: 'linear-gradient(90deg, transparent, #6366f1, #38bdf8, transparent)' }}
              />

              <h3 className="text-white font-bold text-lg mb-6">Send a message</h3>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="flex flex-col items-center justify-center py-14 text-center"
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.5 }}
                  >
                    <CheckCircle size={52} className="text-green-400 mb-4" />
                  </motion.div>
                  <h4 className="text-white font-bold text-lg mb-2">Message Sent!</h4>
                  <p className="text-slate-500 text-[13px]">Thanks for reaching out. I'll get back to you soon.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    { id: 'name', label: 'Your Name', type: 'text', placeholder: 'David Smith' },
                    { id: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com' },
                  ].map(field => (
                    <div key={field.id}>
                      <label className="block text-[12px] font-semibold text-slate-500 mb-1.5 uppercase tracking-wider" htmlFor={field.id}>
                        {field.label}
                      </label>
                      <input
                        id={field.id}
                        name={field.id}
                        type={field.type}
                        required
                        value={form[field.id]}
                        onChange={handleChange}
                        onFocus={() => setFocused(field.id)}
                        onBlur={() => setFocused('')}
                        placeholder={field.placeholder}
                        className="input-field"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-[12px] font-semibold text-slate-500 mb-1.5 uppercase tracking-wider" htmlFor="message">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused('')}
                      placeholder="Tell me about your project or idea..."
                      className="input-field resize-none"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary gap-2 py-3.5 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <><Send size={15} /> Send Message</>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
