<div align="center">

# 🔥 Discipline Tracker

**A visual workout dashboard to track fitness episodes from Instagram creator [@thedisciplined_guyy](https://www.instagram.com/thedisciplined_guyy/) (Bhavesh)**

[![Live Demo](https://img.shields.io/badge/▶_Live_Demo-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://workout-tracker-snowy-chi-34.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/MajeedZeeshan/workout-tracker)
[![MIT License](https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge)](LICENSE)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

---

*Track your progress through 50+ curated fitness episodes — from science-based fat loss to bodybuilding wisdom — all in a sleek dark-themed dashboard.*

</div>

## 📺 Content Series

| Series | Episodes | Description |
|--------|----------|-------------|
| 🔥 **Fat to Fit** | 12 episodes | Science-based fat loss tips backed by research and years of experience |
| 💪 **Muscle Building & Discipline** | 41 episodes | A decade of bodybuilding wisdom covering diet, training, and periodization |
| 🧠 **Motivation & Mindset** | 6 episodes | Transformation stories, discipline mantras, and mindset shifts |

## ✨ Features

- 📊 **Dashboard with Stats** — See your total completed, remaining, and overall progress at a glance
- ✅ **Episode Tracking** — Mark episodes as complete with satisfying checkmark animations
- 🎯 **Progress Rings** — Animated SVG progress rings for each series
- 📅 **Calendar & Timeline** — Browse all episodes sorted by date with series filters
- 🔥 **Streak Tracking** — Build daily streaks to stay consistent
- 🔔 **Toast Notifications** — Instant feedback when you complete or uncheck episodes
- 📱 **Responsive Design** — Mobile-first layout with bottom navigation on smaller screens
- 🌙 **Dark Theme + Glassmorphism** — Sleek glassmorphic cards on a dark gradient background
- 💾 **Persistent Progress** — All data saved to `localStorage` — no account needed
- 🔍 **Episode Detail Modals** — View full captions, like counts, comment counts, and direct Instagram links

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Markup** | HTML5 — semantic, accessible |
| **Styling** | CSS3 — custom properties, glassmorphism, animations, responsive grid |
| **Logic** | Vanilla JavaScript — zero dependencies, IIFE pattern |
| **Fonts** | [Inter](https://fonts.google.com/specimen/Inter) + [Outfit](https://fonts.google.com/specimen/Outfit) via Google Fonts |
| **Storage** | Browser `localStorage` |
| **Hosting** | [Vercel](https://vercel.com) |

> **No frameworks. No build tools. No npm.** Just clean HTML, CSS, and JS.

## 🚀 Getting Started

### Option 1 — Open directly

Simply open `index.html` in your browser:

```
index.html
```

### Option 2 — Local development server

Use any static file server. For example:

```bash
# Python
python -m http.server 8000

# Node.js (npx)
npx serve .

# VS Code
# Install the "Live Server" extension and click "Go Live"
```

Then visit `http://localhost:8000` (or whichever port your server uses).

## 🌐 Deployment

This project is deployed on **Vercel** with zero configuration:

1. Fork or clone the repository
2. Import the project in [Vercel](https://vercel.com/new)
3. Deploy — that's it! No build step required.

Alternatively, push to GitHub and connect to Vercel for automatic deployments on every commit.

> **Live URL →** [workout-tracker-snowy-chi-34.vercel.app](https://workout-tracker-snowy-chi-34.vercel.app)

## 📁 Project Structure

```
workout-tracker/
├── index.html      # Main HTML — dashboard, tabs, modals, toast container
├── styles.css      # All styles — dark theme, glassmorphism, responsive layout
├── app.js          # App logic — episode data, state management, rendering
└── .gitignore
```

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Ideas for contributions

- 🎨 Additional themes (light mode, AMOLED)
- 📊 Weekly/monthly analytics charts
- 🔄 Import/export progress data
- 🏆 Achievement badges and milestones
- 📲 PWA support for offline use

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with ❤️ to track the grind**

Follow Bhavesh → [@thedisciplined_guyy](https://www.instagram.com/thedisciplined_guyy/)

</div>
