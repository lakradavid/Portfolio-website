import { useState, useEffect, createContext, useContext } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Achievements from './components/Achievements';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import LoadingScreen from './components/LoadingScreen';
import CursorFollower from './components/CursorFollower';
import CommandPalette from './components/CommandPalette';
import ClickParticles from './components/ClickParticles';
import EasterEgg from './components/EasterEgg';
import WeatherEffect from './components/WeatherEffect';

export const ThemeContext = createContext({ dark: true, toggle: () => {}, weather: 'off', cycleWeather: () => {} });
export const useTheme = () => useContext(ThemeContext);

export default function App() {
  const [loading, setLoading] = useState(true);
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });
  const [weather, setWeather] = useState('off');
  const MODES = ['off', 'snow', 'rain', 'thunder', 'fireflies', 'stars', 'matrix', 'leaves'];
  const cycleWeather = () => setWeather(w => MODES[(MODES.indexOf(w) + 1) % MODES.length]);

  useEffect(() => {
    localStorage.setItem('theme', dark ? 'dark' : 'light');
    if (dark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);

  const toggle = () => setDark(d => !d);

  return (
    <ThemeContext.Provider value={{ dark, toggle, weather, cycleWeather }}>
      {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      <CursorFollower />
      <ClickParticles />
      <CommandPalette />
      <EasterEgg />
      <WeatherEffect mode={weather} dark={dark} />
      <div className={`min-h-screen relative overflow-x-hidden transition-colors duration-500 ${
        dark
          ? 'bg-[#020817] text-slate-100'
          : 'bg-[#f8fafc] text-slate-800'
      }`}>
        {dark && <div className="noise-overlay" />}
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Certifications />
          <Achievements />
          <Education />
          <Contact />
        </main>
        <Footer />
        <BackToTop />
      </div>
    </ThemeContext.Provider>
  );
}
