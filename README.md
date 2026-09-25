# Full Stack & Systems Engineer Portfolio Template

A modern, high-performance developer portfolio built with **React 19, Three.js (WebGL 3D Interactive Vector Mesh), Vite, and Precision CSS**, designed for free automated deployment to **GitHub Pages (`github.io`)** via **GitHub Actions**.

Live Demo: [https://chiku97.github.io/portfolio/](https://chiku97.github.io/portfolio/)

---

## ⚡ Signature Features

- **🎭 Dual-Tone Switcher**: Toggle seamlessly between **Recruiter Safe** (clean corporate CV metrics) and **Honest Dev Mode** (unfiltered engineering war stories and candid commentary).
- **👾 3D Interactive Chibi Avatar**: Real-time 3D mouse parallax tilt card with specular glare, interactive thought bubble cycler, and confetti triggers.
- **🔍 Hybrid RAG & Vector Engine Sandbox**: Live interactive simulator demonstrating BM25 keyword fuzzy matching + PostgreSQL pgvector cosine semantic search fused with Reciprocal Rank Fusion (RRF).
- **💻 Interactive Developer Terminal**: Functional command-line shell supporting custom commands (`why-hire`, `git-blame`, `deploy-prod`, `skills`, `sudo hire`, etc.).
- **📄 Containerized Resume & PDF Export**: In-app responsive modal with zoom controls (75%–130%) and clean A4 print styles.
- **🧭 Interactive Feature Walkthrough**: Guided onboarding modal highlighting key capabilities with spotlight focus.
- **🚀 Free GitHub Pages CI/CD**: Pre-configured with `.github/workflows/deploy.yml` for automated zero-cost hosting.

---

## 🚀 Clone & Deploy Your Own Portfolio in 5 Minutes

Want to copy this portfolio and make it your own? Follow these simple steps:

### 1. Clone or Fork the Repository
Click the **Fork** button at the top right of this page, or clone it locally:

```bash
git clone https://github.com/chiku97/portfolio.git my-portfolio
cd my-portfolio
npm install
```

### 2. Personalize Your Data & Images (Takes 5 Mins)
You don't need to rebuild any components — all portfolio content is neatly driven by a single data file:

1. **Edit profile data**: Open `src/data/portfolioData.js` and update:
   - `personalInfo`: Your name, role, bio, social links (GitHub, LinkedIn, Email).
   - `experiences`: Your employment history, metrics, and tech stacks.
   - `projects`: Your projects, architectural notes, and live/demo links.
   - `skillsList`: Your backend, frontend, database, and devops proficiencies.
   - `educationList`: Your academic qualifications.

2. **Replace photos (optional)**:
   - `public/uttam_avatar.jpg` → Place your own portrait or workplace photo.
   - `public/uttam_chibi.jpg` → Place your 3D chibi avatar or custom illustration.

3. **Preview locally**:
```bash
npm run dev
```
Open `http://localhost:5173` to see your changes live with instant hot-reloading!

### 3. Push to Your Own GitHub Repository
Create an empty repository on your GitHub account at [github.com/new](https://github.com/new):
- **Option A (Root domain)**: Name your repository `<your-username>.github.io` (e.g. `alex.github.io`).
- **Option B (Project subpath)**: Name your repository `portfolio` or anything you like.

Link your local repository to your new GitHub repo and push:

```bash
# Set origin to your own repository
git remote set-url origin https://github.com/<your-username>/<your-repo-name>.git

# Ensure default branch is main
git branch -M main

# Commit and push
git add .
git commit -m "feat: launch my custom portfolio"
git push -u origin main
```

### 4. Enable Free GitHub Pages in 1 Click
1. Open your repository on GitHub.
2. Click **Settings** (top navigation tab).
3. In the left sidebar, click **Pages**.
4. Under **Build and deployment** → **Source**, change the dropdown to **GitHub Actions**.
5. That's it! GitHub Actions will automatically run the included workflow (`.github/workflows/deploy.yml`), build your bundle with Vite, and publish your portfolio at:
   - `https://<your-username>.github.io/<your-repo-name>/` (or `https://<your-username>.github.io/`)

---

## 🛠️ Tech Stack & Structure

```
portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automated GitHub Pages CI/CD workflow
├── public/
│   ├── favicon.svg             # Terminal icon favicon
│   ├── uttam_avatar.jpg        # Profile portrait photo
│   └── uttam_chibi.jpg         # 3D interactive Chibi avatar
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Responsive nav + Dual-tone switcher + Tour trigger
│   │   ├── Hero.jsx            # Hero banner & introduction
│   │   ├── HeroFace.jsx        # 3D mouse parallax chibi avatar with thought bubble
│   │   ├── PortfolioWalkthrough.jsx # Spotlight step-by-step tour modal
│   │   ├── RagArchitectureDemo.jsx  # Hybrid RAG & Vector similarity simulator
│   │   ├── InteractiveTerminal.jsx  # Developer CLI console emulator
│   │   ├── ResumeModal.jsx     # Viewport-fitted resume with print/PDF support
│   │   ├── GitHubDeployGuideModal.jsx # In-app clone & deployment instructions
│   │   ├── Experience.jsx      # Career timeline with Safe vs. Honest toggles
│   │   ├── Projects.jsx        # Production engineering case studies
│   │   ├── SkillsMatrix.jsx    # Categorized skill badges
│   │   └── Footer.jsx          # Footer with social links & deploy guide trigger
│   ├── data/
│   │   └── portfolioData.js    # Single source of truth for all content & text
│   ├── index.css               # Global theme tokens, typography & animations
│   ├── App.jsx                 # Main layout & modal controller
│   └── main.jsx                # Application root
├── index.html                  # HTML entry with SEO metadata
├── vite.config.js              # Vite configuration (configured with base: './')
└── package.json
```

---

## ⚙️ Configuration Notes

- **Zero-Path Broken Assets**: `vite.config.js` is set to `base: './'`. All CSS, JavaScript, and image assets resolve relatively, ensuring the app works perfectly whether deployed at a root domain (`username.github.io`) or inside a repository subdirectory (`username.github.io/my-portfolio`).
- **Production Build Validation**:
  ```bash
  npm run build
  ```
  Generates an optimized bundle in `dist/` ready for any static web host (GitHub Pages, Cloudflare Pages, Vercel, Netlify, or AWS S3).

---

## 📄 License

MIT License — Feel free to fork, clone, customize, and deploy your own version! A star ⭐ on the repository is appreciated if you find this template helpful.
