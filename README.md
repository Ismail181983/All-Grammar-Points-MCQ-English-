# MCQ from all Grammar Points 🎓✨

[![React](https://img.shields.io/badge/React-19-blue.svg?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF.svg?logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC.svg?logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

An interactive, modern English Grammar Model Question testing and learning platform featuring **35 comprehensive Model Sets** (**875 high-yield MCQs**), detailed grammatical explanations for every question, Web Speech API read-aloud support, customizable dual-timer countdowns, an animated aquarium login interface, and persistent score tracking.

Curated and designed for competitive examinations (BCS, Primary, University Admission, Job Recruitment, and Higher Secondary English Competence).

---

## 🌟 Key Highlights & Features

- **35 Model Question Sets (875 MCQs)**: Complete coverage of all foundational and advanced grammatical dimensions:
  - Parts of Speech & Syntactic Analysis
  - Articles (Phonetic vowel vs. consonant rules, unique nouns)
  - Appropriate Prepositions & Collocations
  - Subject-Verb Agreement & Proximity Rules
  - Conditional Sentences (Types 1, 2, 3 & Inverted Conditionals)
  - Causative Verbs & Bare Infinitives
  - Active & Passive Voice Transformations
  - Direct to Indirect Speech (Narration Shifts)
  - Clauses & Phrases (Noun, Adverbial, Relative/Adjective Clauses)
  - Non-Finite Verbs (Gerunds vs. Present Participles vs. Infinitives)
  - Idioms, Phrases & Literary Terms
  - High-frequency Vocabulary, Synonyms, Antonyms & Spelling Rules
- **Comprehensive Explanations for Every MCQ**: Every question includes a grammatical breakdown explaining the exact grammatical rule, why the correct answer is right, and why the other options are incorrect.
- **Web Speech API Read-Aloud**: Interactive audio synthesis to listen to questions, options, and full grammar explanations aloud with adjustable rate, pitch, and volume.
- **Configurable Dual-Timer Engine**:
  - **Total Exam Countdown**: Configurable total minutes (e.g. 15–20 minutes for 25 MCQs) with auto-lock upon expiration.
  - **Per-Question Countdown**: Configurable timer per question (e.g. 30–60s) with individual question auto-lock.
- **Interactive Aquarium Login**: Fluid, animated underwater aquarium background featuring swimming fish, bubble physics, student credentials entry (Name, Roll, Institution), and synthesized soundscapes.
- **Instant Result & Scorecard**:
  - Real-time scoring, percentage, and candidate assessment.
  - Filter questions by **All (25)**, **Correct**, and **Incorrect**.
  - Confetti celebration for high scores.
- **Scoreboard & History**: Local persistence via browser `localStorage` to review all previous test attempts, dates, and highest scores without requiring any external database.
- **100% Client-Side & Offline Ready**: Works completely in the browser with zero backend latency. Ideal for GitHub Pages hosting.

---

## 🚀 Live Demo & GitHub Pages Deployment

This project is configured out-of-the-box for **GitHub Pages** deployment with relative asset resolution (`base: './'`) and an automated GitHub Actions workflow.

### Quick Deploy via GitHub Actions (Recommended)

1. **Push this repository to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of MCQ from all Grammar Points"
   git branch -M main
   git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPOSITORY-NAME>.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub.
   - Navigate to **Settings** > **Pages** (under the "Code and automation" section).
   - Under **Build and deployment** > **Source**, change it from `Deploy from a branch` to **GitHub Actions**.
   *(⚠️ Important: Do NOT choose `main` branch under "Deploy from a branch", because `main` contains raw React `.tsx` source code. Selecting **GitHub Actions** automatically runs the build and deploys the compiled JavaScript/CSS).*

3. **Check Workflow Permissions (If needed)**:
   - In your repo, go to **Settings** > **Actions** > **General**.
   - Under **Workflow permissions**, choose **Read and write permissions**.
   - Click **Save**.

4. **Trigger Deployment**:
   - Go to the **Actions** tab in your repository.
   - Click on **Deploy to GitHub Pages** in the left sidebar.
   - Click **Run workflow** > **Run workflow** (or simply make any commit).
   - Once the green checkmark appears, your site is live at:
   ```
   https://<YOUR-USERNAME>.github.io/<YOUR-REPOSITORY-NAME>/
   ```

### Alternative: 1-Click Terminal Deploy via `gh-pages`

If you prefer using branch deployment (`Deploy from a branch` -> `gh-pages`):
```bash
npm run deploy
```
*(This builds the project and pushes the compiled `dist/` directory to the `gh-pages` branch on GitHub).*


---

## 💻 Local Development Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18.0.0 or higher recommended)
- `npm` (bundled with Node.js)

### Installation & Execution

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

4. **Typecheck & Lint**:
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

## 📂 Project Architecture

```
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow for zero-config Pages deployment
├── public/                     # Static assets and media files
├── src/
│   ├── components/             # Reusable UI modules & view controllers
│   │   ├── AquariumBackground.tsx  # Animated canvas fish and bubble particle engine
│   │   ├── Footer.tsx              # Modern footer with branding and quick stats
│   │   ├── HeaderClock.tsx         # Live digital clock with formatted display
│   │   ├── LoginPage.tsx           # Aquarium-themed candidate login
│   │   ├── ModelQuestionDashboard.tsx # 35-set selection grid with performance metrics
│   │   ├── ProfileModal.tsx        # Candidate profile manager
│   │   ├── QuizView.tsx            # Test screen with timers, audio, and question cards
│   │   ├── ResultView.tsx          # Result evaluation with filterable explanations
│   │   ├── ScoreBoardModal.tsx     # Comprehensive score history modal
│   │   └── SettingsModal.tsx       # Sound, speech, and timer configuration modal
│   ├── data/                   # Curated Grammar Model Sets (35 sets, 875 MCQs)
│   │   ├── questions.ts        # Master questions aggregator and Sets 1–5
│   │   ├── sets6and7.ts        # Model Question Sets 6 & 7
│   │   ├── sets8to10.ts        # Model Question Sets 8, 9 & 10
│   │   ├── sets11to15.ts       # Model Question Sets 11 to 15
│   │   ├── sets16to20.ts       # Model Question Sets 16 to 20
│   │   ├── sets21to25.ts       # Model Question Sets 21 to 25
│   │   ├── sets26to30.ts       # Model Question Sets 26 to 30
│   │   └── sets31to35.ts       # Model Question Sets 31 to 35
│   ├── utils/
│   │   ├── sound.ts            # Web Audio API procedural sound synthesizer
│   │   └── speech.ts           # Web Speech API speech synthesis controller
│   ├── App.tsx                 # Root application router & state manager
│   ├── index.css               # Tailwind CSS entry point
│   ├── main.tsx                # React DOM entry point
│   └── types.ts                # TypeScript interfaces and type definitions
├── .gitignore                  # Git ignore rules for node_modules and builds
├── index.html                  # HTML entry point with metadata, icons, and fonts
├── metadata.json               # Application configuration manifest
├── package.json                # Project dependencies and script definitions
├── tsconfig.json               # TypeScript compiler options
└── vite.config.ts              # Vite configuration with relative base path
```

---

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Motion (Framer Motion)](https://motion.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Audio & Speech**: Web Audio API (procedural effects) & Web Speech API (SpeechSynthesis)
- **Visuals**: HTML5 Canvas (Aquarium simulation) & Canvas Confetti

---

## 📝 License

Distributed under the **MIT License**. Feel free to use, modify, and distribute this platform for personal or educational purposes.

---

## 👤 Author & Credits

**Designed & Curated by Md. Ismail Hossain**
- Email: `Ismaildbbbbb777@gmail.com`
- Platform: **MCQ from all Grammar Points**
