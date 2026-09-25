# Uttam Kumar Mahto — Full Stack & Systems Engineer Portfolio

A modern, high-performance portfolio website built with **React, Three.js (WebGL 3D Interactive Vector Mesh), Vite, and Precision CSS**, designed for free deployment to **GitHub Pages (`github.io`)**.

---

## ⚡ Tech Stack & Features

- **Frontend Core**: React 19 + Vite (superfast HMR and bundle compilation)
- **3D Graphics & WebGL**: Three.js interactive 3D Vector Embedding Space with dynamic neural particle graph & mouse parallax tilt
- **Design System**: Editorial precision styling (inspired by Linear, Paco Coursey, and Vercel) with carbon slate tones, zero AI-slop tropes, and high typographic legibility
- **Flagship Showcase**: Interactive **Hybrid RAG & Vector Search Engine** sandbox (Elasticsearch BM25 fuzzy matching + PostgreSQL pgvector cosine similarity)
- **Career & Systems Case Studies**: Sanpbizz CloudTech (IRCTC & Axis Bank retail workflows), INCANUS Tech (10k+ concurrent examinee sandbox), Cerner (Oracle) HealtheIntent platform
- **Printable Resume**: In-app modal with print & PDF export support
- **Free GitHub Pages Deployment**: Pre-configured with `.github/workflows/deploy.yml` for automated CI/CD builds

---

## 🚀 How to Deploy to GitHub Pages for Free (github.io)

### Step 1: Create a Repository on GitHub
1. Log into your GitHub account: [github.com/new](https://github.com/new)
2. Create a repository named either:
   - `chiku97.github.io` *(will host at `https://chiku97.github.io/`)*
   - OR `portfolio` *(will host at `https://chiku97.github.io/portfolio/`)*
3. Keep it **Public**.

### Step 2: Push Your Code
Open your terminal in this project directory (`c:\Users\Snapbizz\Documents\portfolio`) and run:

```bash
# 1. Initialize git
git init
git branch -M main

# 2. Stage and commit all files
git add .
git commit -m "feat: launch modern full-stack & RAG engineer portfolio"

# 3. Connect to your GitHub repository (replace with your repo URL)
git remote add origin https://github.com/chiku97/portfolio.git

# 4. Push to main
git push -u origin main
```

*(If you created `chiku97.github.io`, replace `portfolio.git` with `chiku97.github.io.git`)*

### Step 3: Enable Free GitHub Pages in 1 Click
1. On GitHub, navigate to your repository's **Settings** tab.
2. In the left sidebar, click **Pages**.
3. Under **Build and deployment** → **Source**, select **GitHub Actions**.
4. That's it! GitHub will immediately trigger the included `.github/workflows/deploy.yml` workflow, build the bundle, and publish your portfolio to the web for free.

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build production bundle
npm run build
```
