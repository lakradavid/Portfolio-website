# Portfolio Features — David Lakra

## Tech Stack
- React 19 + Vite 8
- Tailwind CSS v4 (CSS-first, no config file)
- Framer Motion — animations & transitions
- Lucide React — icons

---

## Sections

| Section | Description |
|---|---|
| Hero | Name, role typewriter, profile photo, code snippet, social links, CTA buttons |
| About | Personal intro and background |
| Skills | Tech stack with animated skill bars |
| Projects | Featured projects with live demo + GitHub links, GitHub profile card |
| Certifications | NPTEL, IBM, Google, OOPs C++ certificates with links |
| Achievements | Coding achievements + Codolio profile card |
| Education | Academic background at LPU |
| Contact | Contact form with email, phone, LinkedIn |
| Footer | Links and credits |

---

## Visual & UI Features

### Dark / Light Mode
- Toggle between dark (`#020817`) and light (`#f8fafc`) themes
- Persisted to `localStorage`, defaults to dark
- Sun/Moon icon with animated spin transition
- All components fully adapt — glass cards, text, borders, shadows

### Aurora Hero Background *(dark mode only, when no weather effect is active)*
- 4 slow-drifting gradient blobs (indigo, sky, violet, green) on independent 18–26s animation loops
- Mouse-reactive spotlight — soft radial glow follows cursor with smooth lag
- Automatically disabled when a weather effect is running

### Glassmorphism Cards
- `.glass` and `.glass-strong` utility classes
- Multi-layer box shadows in both dark and light mode
- Sky-blue gradient borders in light mode

### Gradient System
- Primary: `#6366F1` (Indigo)
- Secondary: `#22C55E` (Green)
- Accent: `#38BDF8` (Sky Blue)
- Shimmer text animation on hero name

### Scroll Progress Bar
- Fixed top bar that fills as you scroll
- Indigo → sky → green gradient with glow

---

## Interactive Features

### Custom Cursor
- Dual-layer cursor: outer ring + inner dot
- Spring physics — outer ring lags, inner dot snaps
- Ring expands and shifts to sky-blue on hoverable elements
- Dot disappears on hover for clean feel
- Auto-disabled on touch/mobile devices

### Click Particles
- Colorful dot burst from every click anywhere on the page
- 10 particles per click, radial spread with fade-out

### Magnetic Buttons
- Hero CTA buttons (View Projects, Resume, Contact) pull toward the cursor when nearby
- Spring-based movement, snaps back on mouse leave

### Tilt Cards
- Project cards tilt in 3D following mouse position
- Glare overlay moves with cursor for holographic effect

### Command Palette *(Ctrl+K / Cmd+K)*
- Spotlight-style search overlay
- Navigate to any section, open external links, toggle theme
- Keyboard navigation: ↑↓ to move, Enter to select, Esc to close
- Hint button in bottom-left corner

### Easter Egg
- Type `david` anywhere on the page (not in an input)
- Triggers a confetti explosion + animated banner

---

## Weather / Atmosphere Effects

Cycle through 8 modes via the cloud button in the navbar (between dark mode toggle and Hire Me):

| Mode | Icon Color | Effect |
|---|---|---|
| Off | Grey | No effect (aurora background active in dark mode) |
| Snow | Sky blue | Drifting snowflakes with glow |
| Rain | Indigo | Angled rain streaks (darker/thicker in light mode) |
| Thunderstorm | Purple | Heavy rain + lightning bolts + screen flash |
| Fireflies | Green | Glowing pulsing dots with organic float (dark-adapted colors in light mode) |
| Stars | Yellow | Twinkling stars + shooting stars (dark indigo in light mode) |
| Matrix | Green | Falling katakana/hex characters in indigo |
| Autumn Leaves | Orange | Rotating colored leaves drifting down |

---

## Loading Screen
- Animated intro on every page load
- Spinning gradient ring around "D" logo
- Progress bar counts 0→100%
- Name reveals letter by letter after loading
- Fades out with scale transition

---

## Navbar
- Fixed with blur/glass on scroll
- Active section highlight via IntersectionObserver
- Scroll progress bar at top
- Live clock (IST) — time + date, updates every second
- Dark/Light toggle
- Weather effect toggle (8 modes)
- Hire Me CTA button
- Responsive mobile menu with animations

---

## Projects Section
- CoreWatch — real-time system monitoring dashboard (React, Node, WebSocket)
- TrainX — virtual personal trainer platform (HTML, CSS, JS)
- GitHub profile card — repos, stats, activity graph, links
- Filter by category (All / Full Stack / Frontend)

---

## Certifications
- NPTEL (Drive link)
- Introduction to Hardware & OS — IBM / Coursera
- Bits and Bytes of Computer Networking — Google / Coursera
- OOPs Using C++ (Drive link)

---

## Links
- GitHub: https://github.com/lakradavid
- LinkedIn: https://www.linkedin.com/in/david-lakra
- Codolio: https://codolio.com/profile/David22/card
- Resume: Google Drive PDF
