import { useEffect, useRef } from 'react';

export default function WeatherEffect({ mode, dark = true }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (mode === 'off') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    // ── Snow ────────────────────────────────────────────────
    if (mode === 'snow') {
      const flakes = Array.from({ length: 130 }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 3 + 1,
        speed: Math.random() * 1 + 0.3,
        drift: Math.random() * 0.5 - 0.25,
        opacity: Math.random() * 0.5 + 0.3,
        wobble: Math.random() * Math.PI * 2,
      }));
      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        flakes.forEach(f => {
          f.wobble += 0.02;
          f.x += f.drift + Math.sin(f.wobble) * 0.3;
          f.y += f.speed;
          if (f.y > canvas.height + 10) { f.y = -10; f.x = Math.random() * canvas.width; }
          if (f.x > canvas.width + 10) f.x = -10;
          if (f.x < -10) f.x = canvas.width + 10;
          ctx.beginPath();
          ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(200,220,255,${f.opacity})`;
          ctx.shadowBlur = 6; ctx.shadowColor = 'rgba(180,210,255,0.6)';
          ctx.fill(); ctx.shadowBlur = 0;
        });
        animId = requestAnimationFrame(draw);
      };
      draw();
    }

    // ── Rain ────────────────────────────────────────────────
    if (mode === 'rain') {
      const dropColor = dark ? '147,197,253' : '30,80,160';
      const dropOpacityBase = dark ? 0.08 : 0.25;
      const dropOpacityRange = dark ? 0.25 : 0.35;
      const drops = Array.from({ length: 200 }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        len: Math.random() * 18 + 8,
        speed: Math.random() * 8 + 10,
        opacity: Math.random() * dropOpacityRange + dropOpacityBase,
        width: dark ? Math.random() * 0.8 + 0.3 : Math.random() * 1.2 + 0.6,
      }));
      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drops.forEach(d => {
          d.y += d.speed; d.x -= d.speed * 0.15;
          if (d.y > canvas.height + d.len) { d.y = -d.len; d.x = Math.random() * canvas.width; }
          ctx.beginPath();
          ctx.moveTo(d.x, d.y);
          ctx.lineTo(d.x - d.speed * 0.15, d.y + d.len);
          ctx.strokeStyle = `rgba(${dropColor},${d.opacity})`;
          ctx.lineWidth = d.width; ctx.stroke();
        });
        animId = requestAnimationFrame(draw);
      };
      draw();
    }

    // ── Thunderstorm ────────────────────────────────────────
    if (mode === 'thunder') {
      const dropColor = dark ? '147,197,253' : '20,60,140';
      const dropOpacityBase = dark ? 0.1 : 0.3;
      const dropOpacityRange = dark ? 0.3 : 0.4;
      const drops = Array.from({ length: 220 }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        len: Math.random() * 22 + 10,
        speed: Math.random() * 12 + 14,
        opacity: Math.random() * dropOpacityRange + dropOpacityBase,
        width: dark ? Math.random() * 1 + 0.4 : Math.random() * 1.4 + 0.7,
      }));
      let flash = 0;
      let nextFlash = 2000 + Math.random() * 4000;
      let elapsed = 0;
      let lastTime = performance.now();

      const draw = (now) => {
        const dt = now - lastTime; lastTime = now; elapsed += dt;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Lightning flash overlay
        if (elapsed > nextFlash) {
          flash = 8;
          nextFlash = elapsed + 3000 + Math.random() * 5000;
        }
        if (flash > 0) {
          ctx.fillStyle = `rgba(200,210,255,${flash * 0.012})`;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          flash--;
          // Draw a lightning bolt
          if (flash === 7) {
            const bx = Math.random() * canvas.width;
            ctx.beginPath();
            ctx.moveTo(bx, 0);
            let cy = 0;
            while (cy < canvas.height * 0.6) {
              const nx = bx + (Math.random() - 0.5) * 80;
              cy += Math.random() * 60 + 30;
              ctx.lineTo(nx, cy);
            }
            ctx.strokeStyle = 'rgba(220,230,255,0.9)';
            ctx.lineWidth = 1.5;
            ctx.shadowBlur = 20; ctx.shadowColor = '#a5b4fc';
            ctx.stroke(); ctx.shadowBlur = 0;
          }
        }

        drops.forEach(d => {
          d.y += d.speed; d.x -= d.speed * 0.2;
          if (d.y > canvas.height + d.len) { d.y = -d.len; d.x = Math.random() * canvas.width; }
          ctx.beginPath();
          ctx.moveTo(d.x, d.y);
          ctx.lineTo(d.x - d.speed * 0.2, d.y + d.len);
          ctx.strokeStyle = `rgba(${dropColor},${d.opacity})`;
          ctx.lineWidth = d.width; ctx.stroke();
        });
        animId = requestAnimationFrame(draw);
      };
      animId = requestAnimationFrame(draw);
    }

    // ── Fireflies ───────────────────────────────────────────
    if (mode === 'fireflies') {
      const lightColors = ['34,120,40', '180,100,0', '100,30,180', '0,100,180'];
      const darkColors  = ['180,255,120', '255,230,100'];
      const colorPool   = dark ? darkColors : lightColors;
      const flies = Array.from({ length: 60 }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: dark ? Math.random() * 2.5 + 1 : Math.random() * 3.5 + 2,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.02 + 0.01,
        color: colorPool[Math.floor(Math.random() * colorPool.length)],
      }));
      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        flies.forEach(f => {
          f.phase += f.speed;
          f.x += f.vx + Math.sin(f.phase * 1.3) * 0.4;
          f.y += f.vy + Math.cos(f.phase) * 0.4;
          if (f.x < 0) f.x = canvas.width;
          if (f.x > canvas.width) f.x = 0;
          if (f.y < 0) f.y = canvas.height;
          if (f.y > canvas.height) f.y = 0;
          const glow = (Math.sin(f.phase * 3) + 1) / 2;
          const alpha = dark ? 0.3 + glow * 0.7 : 0.55 + glow * 0.45;
          ctx.beginPath();
          ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${f.color},${alpha})`;
          ctx.shadowBlur = dark ? 12 + glow * 14 : 16 + glow * 10;
          ctx.shadowColor = `rgba(${f.color},${dark ? 0.8 : 1})`;
          ctx.fill(); ctx.shadowBlur = 0;
        });
        animId = requestAnimationFrame(draw);
      };
      draw();
    }

    // ── Stars + Shooting Stars ──────────────────────────────
    if (mode === 'stars') {
      const starColor  = dark ? '220,230,255' : '60,40,160';
      const starShadow = dark ? 'rgba(180,200,255,0.6)' : 'rgba(99,102,241,0.7)';
      const starAlphaBase = dark ? 0.3 : 0.5;
      const starAlphaRange = dark ? 0.5 : 0.5;
      const stars = Array.from({ length: 180 }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: dark ? Math.random() * 1.5 + 0.3 : Math.random() * 2.5 + 1,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.02 + 0.005,
      }));
      const shooters = [];
      let nextShooter = 1500;
      let elapsed = 0;
      let lastTime = performance.now();

      const draw = (now) => {
        const dt = now - lastTime; lastTime = now; elapsed += dt;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        stars.forEach(s => {
          s.phase += s.speed;
          const alpha = starAlphaBase + (Math.sin(s.phase) + 1) / 2 * starAlphaRange;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${starColor},${alpha})`;
          ctx.shadowBlur = dark ? 4 : 8;
          ctx.shadowColor = starShadow;
          ctx.fill(); ctx.shadowBlur = 0;
        });

        if (elapsed > nextShooter) {
          shooters.push({
            x: Math.random() * canvas.width * 0.7,
            y: Math.random() * canvas.height * 0.4,
            vx: 6 + Math.random() * 6,
            vy: 3 + Math.random() * 3,
            len: 80 + Math.random() * 80,
            life: 1,
          });
          nextShooter = elapsed + 1800 + Math.random() * 3000;
        }
        for (let i = shooters.length - 1; i >= 0; i--) {
          const s = shooters[i];
          s.x += s.vx; s.y += s.vy; s.life -= 0.025;
          if (s.life <= 0) { shooters.splice(i, 1); continue; }
          const trailColor = dark ? '255,255,255' : '80,50,200';
          const grad = ctx.createLinearGradient(s.x - s.vx * 8, s.y - s.vy * 8, s.x, s.y);
          grad.addColorStop(0, `rgba(${trailColor},0)`);
          grad.addColorStop(1, `rgba(${trailColor},${s.life * 0.9})`);
          ctx.beginPath();
          ctx.moveTo(s.x - s.vx * (s.len / s.vx), s.y - s.vy * (s.len / s.vx));
          ctx.lineTo(s.x, s.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = dark ? 1.5 : 2.5; ctx.stroke();
        }
        animId = requestAnimationFrame(draw);
      };
      animId = requestAnimationFrame(draw);
    }

    // ── Matrix ──────────────────────────────────────────────
    if (mode === 'matrix') {
      const fontSize = 13;
      const cols = Math.floor(canvas.width / fontSize);
      const drops = Array.from({ length: cols }, () => Math.random() * -canvas.height / fontSize);
      const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEF</>{}[]';

      const draw = () => {
        ctx.fillStyle = 'rgba(2,8,23,0.06)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drops.forEach((y, i) => {
          const char = chars[Math.floor(Math.random() * chars.length)];
          const x = i * fontSize;
          // Head char — bright
          ctx.fillStyle = '#a5f3fc';
          ctx.shadowBlur = 8; ctx.shadowColor = '#38bdf8';
          ctx.font = `${fontSize}px "Fira Code", monospace`;
          ctx.fillText(char, x, y * fontSize);
          ctx.shadowBlur = 0;
          // Trail
          ctx.fillStyle = `rgba(99,102,241,0.7)`;
          ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x, (y - 1) * fontSize);
          drops[i] = y > canvas.height / fontSize + Math.random() * 20 ? 0 : y + 0.5;
        });
        animId = requestAnimationFrame(draw);
      };
      draw();
    }

    // ── Leaves ──────────────────────────────────────────────
    if (mode === 'leaves') {
      const LEAF_COLORS = ['#f97316','#ef4444','#eab308','#84cc16','#f59e0b','#dc2626'];
      const leaves = Array.from({ length: 40 }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 12 + 6,
        speed: Math.random() * 1.5 + 0.5,
        drift: Math.random() * 1.5 - 0.75,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.06,
        wobble: Math.random() * Math.PI * 2,
        color: LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)],
        opacity: Math.random() * 0.5 + 0.4,
      }));

      const drawLeaf = (x, y, size, rot, color, opacity) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rot);
        ctx.globalAlpha = opacity;
        ctx.beginPath();
        ctx.moveTo(0, -size / 2);
        ctx.bezierCurveTo(size / 2, -size / 2, size / 2, size / 2, 0, size / 2);
        ctx.bezierCurveTo(-size / 2, size / 2, -size / 2, -size / 2, 0, -size / 2);
        ctx.fillStyle = color;
        ctx.shadowBlur = 4; ctx.shadowColor = color;
        ctx.fill(); ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
        ctx.restore();
      };

      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        leaves.forEach(l => {
          l.wobble += 0.03;
          l.x += l.drift + Math.sin(l.wobble) * 0.8;
          l.y += l.speed;
          l.rot += l.rotSpeed;
          if (l.y > canvas.height + 20) { l.y = -20; l.x = Math.random() * canvas.width; }
          drawLeaf(l.x, l.y, l.size, l.rot, l.color, l.opacity);
        });
        animId = requestAnimationFrame(draw);
      };
      draw();
    }

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [mode]);

  if (mode === 'off') return null;

  // Matrix needs a persistent dark overlay — use a slightly opaque canvas bg
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[45]"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
}
