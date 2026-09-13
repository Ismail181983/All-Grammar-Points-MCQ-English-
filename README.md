# MCQ from all Grammar Points 🎓✨

[![React](https://img.shields.io/badge/React-19-blue.svg?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF.svg?logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC.svg?logo=tailwind-css)](https://tailwindcss.com/)
[![PWA](https://img.shields.io/badge/PWA-Offline%20Ready-success.svg)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

An interactive, modern English Grammar Model Question testing and learning platform featuring **45 comprehensive Model Sets** (**1,125 high-yield MCQs**), detailed grammatical breakdowns for every question, Smart Replay for missed questions, Adaptive Difficulty recommendations, side-by-side quiz comparisons, a 13-stage sequential Study Roadmap, simulated Global Leaderboard, digital trophies & badges, Web Speech API read-aloud support, customizable dual-timer countdowns, an animated aquarium login interface, score progression analytics, and offline PWA support.

Curated and designed for competitive examinations (BCS, Primary Teacher Recruitment, University Admission, Bank & Govt. Recruitment, and Advanced English Competence).

---

## 🌟 Key Highlights & Features

- **45 Model Question Sets (1,125 MCQs)**: Complete coverage of all foundational, intermediate, and advanced grammatical & literary dimensions:
  - Subject-Verb Agreement & Head Noun Rules
  - Articles (Phonetic vowel vs. consonant rules, unique nouns, glide consonants)
  - Appropriate Prepositions & Collocations
  - Conditional Sentences (Zero, 1, 2, 3 & Inverted Conditionals with *Had*, *Were*, *Should*)
  - Subjunctive Mood (Mandative subjunctive, preferences with *would rather*, unreal *as if/as though*)
  - Active & Passive Voice Transformations (including modal perfects and causative verbs)
  - Direct to Indirect Speech (Assertive, Interrogative, Imperative, Optative, Exclamatory)
  - Clauses & Phrases (Noun, Adverbial, Relative/Adjective Clauses)
  - Non-Finite Verbs (Gerunds vs. Present Participles vs. Infinitives)
  - Degrees of Comparison & Comparative Absolutes
  - Inversion after negative adverbs (*Never*, *Little*, *Scarcely*, *Under no circumstances*)
  - English & American Literature (Chaucer, Shakespeare, Marlowe, Milton, Pope, Shelley, Keats, Orwell, Joyce, Hemingway)
- **Smart Replay**: Instantly generates a targeted retake session containing exclusively the questions answered incorrectly in any previous quiz attempt.
- **Adaptive Difficulty Mode**: Analyzes real-time performance, accuracy trajectory, and topic strengths to suggest the optimal learning module from the Study Roadmap.
- **Side-by-Side Quiz Comparison**: Compare any two past quiz attempts with a performance delta card and a category-by-category accuracy matrix.
- **13-Stage Study Roadmap**: Structured progression path spanning from Basic Sentence Structure to Literary Criticism.
- **Comprehensive Explanations**: Every question includes a clear explanation detailing why the correct answer is right and why other options are invalid.
- **Web Speech API Read-Aloud & Voice Controls**: Interactive audio synthesis to listen to questions, options, and full grammar explanations aloud with adjustable speed, pitch, and voice choice.
- **Configurable Dual-Timer Engine**:
  - **Total Exam Countdown**: Configurable total minutes (e.g., 15–20 minutes) with auto-lock upon expiration.
  - **Per-Question Countdown**: Configurable timer per question (e.g., 30–60s) with auto-progression.
- **Score Progression Line Chart**: Visualizes historical exam trends, score milestones, and speed across attempts using Recharts.
- **Simulated Global Leaderboard**: Top 10 high-achievers ranking based on accuracy and completion speed.
- **Digital Trophies & Badges**: Earn achievements like First Perfect Score, Speed Demon, Night Owl, and Grammar Master.
- **Interactive Aquarium Login**: Fluid, animated underwater aquarium canvas featuring swimming fish, bubble physics, and student credential inputs.
- **100% Client-Side & PWA Offline Ready**: Zero backend required for quiz taking; Service Worker caching enables offline learning anywhere.

---

## 🚀 GitHub Publishing & Deployment Guide

This project is built and configured out-of-the-box for **GitHub Pages** deployment with relative asset links (`base: './'`) and an automated GitHub Actions CI/CD workflow.

### Option 1: Automatic Deployment via GitHub Actions (Recommended)

1. **Initialize and Push to your GitHub Repository**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of MCQ from all Grammar Points"
   git branch -M main
   git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPOSITORY-NAME>.git
   git push -u origin main
   ```

2. **Enable GitHub Pages via Actions**:
   - Open your repository on GitHub.
   - Go to **Settings** > **Pages** (under "Code and automation").
   - Under **Build and deployment** > **Source**, select **GitHub Actions**.
   - *(Note: Do NOT select `Deploy from a branch` with `main`, because `main` contains the raw source files. GitHub Actions will build `dist/` and publish the static website).*

3. **Ensure Workflow Permissions**:
   - Go to **Settings** > **Actions** > **General**.
   - Under **Workflow permissions**, select **Read and write permissions**.
   - Click **Save**.

4. **Trigger Deployment**:
   - Every push to `main` automatically runs `.github/workflows/deploy.yml`.
   - You can also run it manually: Go to the **Actions** tab > **Deploy to GitHub Pages** > **Run workflow**.
   - When the workflow finishes with a green checkmark, your app will be live at:
   ```
   https://<YOUR-USERNAME>.github.io/<YOUR-REPOSITORY-NAME>/
   ```

---

### Option 2: 1-Click Terminal Deployment via `gh-pages`

If you prefer deploying via the `gh-pages` branch:

1. **Run the deploy script**:
   ```bash
   npm run deploy
   ```
   *(This builds the project to `dist/` and pushes it directly to the `gh-pages` branch on GitHub).*

2. **Set Pages Source**:
   - Go to repository **Settings** > **Pages**.
   - Set **Source** to `Deploy from a branch`.
   - Select the `gh-pages` branch and `/ (root)` folder.
   - Click **Save**.

---

## 💻 Local Development Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- `npm` (bundled with Node.js)

### Quick Start

1. **Clone the repository**:
   ```bash
   git clone https://github.com/<YOUR-USERNAME>/<YOUR-REPOSITORY-NAME>.git
   cd <YOUR-REPOSITORY-NAME>
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your web browser.

4. **Lint and Typecheck**:
   ```bash
   npm run lint
   ```

5. **Build for production**:
   ```bash
   npm run build
   ```
   The compiled, optimized production files will be placed in the `dist/` directory.

6. **Preview the production build locally**:
   ```bash
   npm run preview
   ```

---

## 📂 Project Structure

```
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions CI/CD for automated Pages deployment
├── public/
│   ├── .nojekyll                   # Prevents Jekyll processing on GitHub Pages
│   ├── 404.html                    # SPA route fallback for GitHub Pages
│   ├── apple-touch-icon.png        # PWA Apple touch icon
│   ├── favicon.svg                 # Vector browser favicon
│   ├── pwa-192x192.png             # PWA app icon (192px)
│   ├── pwa-512x512.png             # PWA app icon (512px)
│   ├── pwa-maskable-512x512.png    # PWA adaptive maskable icon
│   └── robots.txt                  # Search engine crawl rules
├── src/
│   ├── components/                 # UI components and view controllers
│   │   ├── AquariumBackground.tsx  # Animated canvas fish and bubble particle engine
│   │   ├── BadgeIcon.tsx           # Achievement badge visualizer
│   │   ├── DailyChallengeModal.tsx # 24-hour daily challenge modal
│   │   ├── FlashcardsModal.tsx     # Diagnostic grammar flashcards
│   │   ├── Footer.tsx              # Modern footer with quick stats
│   │   ├── HeaderClock.tsx         # Live digital clock
│   │   ├── LeaderboardView.tsx     # Global top 10 leaderboard
│   │   ├── LoginPage.tsx           # Aquarium-themed candidate login
│   │   ├── ModelQuestionDashboard.tsx # 45-set selection grid with filter & search
│   │   ├── QuizView.tsx            # Active test screen with dual timers & speech
│   │   ├── ResultView.tsx          # Result evaluation with Smart Replay action
│   │   ├── ScoreBoardModal.tsx     # Score history & side-by-side quiz comparison
│   │   ├── ScoreProgressionChart.tsx # Historical score line chart (Recharts)
│   │   ├── SettingsModal.tsx       # Sound, speech, timer, and theme settings
│   │   ├── StudentInfoModal.tsx    # Candidate profile editor
│   │   ├── StudyRoadmap.tsx        # 13-stage sequential roadmap with adaptive mode
│   │   └── TrophiesModal.tsx       # Digital trophies & badges display
│   ├── data/                       # 45 Curated Model Question Sets (1,125 MCQs)
│   │   ├── questions.ts            # Master questions aggregator & Sets 1–5
│   │   ├── sets6and7.ts            # Sets 6 & 7
│   │   ├── sets8to10.ts            # Sets 8 to 10
│   │   ├── sets11to15.ts           # Sets 11 to 15
│   │   ├── sets16to20.ts           # Sets 16 to 20
│   │   ├── sets21to25.ts           # Sets 21 to 25
│   │   ├── sets26to30.ts           # Sets 26 to 30
│   │   ├── sets31to35.ts           # Sets 31 to 35
│   │   ├── sets36to40.ts           # Sets 36 to 40
│   │   └── sets41to45.ts           # Sets 41 to 45
│   ├── utils/
│   │   ├── adaptiveDifficulty.ts   # Adaptive difficulty calculator
│   │   ├── categories.ts           # Grammar topic categorization & metadata
│   │   ├── sound.ts                # Web Audio API procedural sound effects
│   │   └── speech.ts               # Web Speech API speech synthesis controller
│   ├── App.tsx                     # Root application coordinator & state management
│   ├── index.css                   # Global Tailwind CSS entry point
│   ├── main.tsx                    # React DOM root entry point
│   └── types.ts                    # Global TypeScript interfaces
├── .gitignore                      # Git ignore rules for node_modules and builds
├── index.html                      # HTML entry point with metadata, icons, and fonts
├── LICENSE                         # MIT License
├── metadata.json                   # AI Studio Application manifest
├── package.json                    # Project dependencies and deployment scripts
├── tsconfig.json                   # TypeScript compiler configuration
└── vite.config.ts                  # Vite config with relative base ('./') & PWA plugin
```

---

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev/)
- **Build System**: [Vite 6](https://vitejs.dev/)
- **Language**: [TypeScript 5.8](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **Animations**: [Motion](https://motion.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Offline / PWA**: [vite-plugin-pwa](https://vite-pwa-org.netlify.app/)
- **Audio & Speech**: Web Audio API & Web Speech API (`SpeechSynthesis`)
- **Effects**: HTML5 Canvas & [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Deployment**: [GitHub Pages](https://pages.github.com/) with GitHub Actions & `gh-pages`

---

## 📝 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.

---

## 👤 Author & Credits

**Designed & Curated by Md. Ismail Hossain**
- Email: `Ismaildbbbbb777@gmail.com`
- Platform: **MCQ from all Grammar Points**
