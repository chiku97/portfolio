# Uttam Kumar Mahto - Portfolio Backend API

A production-ready Node.js & Express backend for Uttam's software engineering portfolio.

## 🚀 Features

1. **Intelligent AI Assistant & RAG Retrieval (`/api/chat`)**:
   - Hybrid lexical BM25 + dense semantic matching engine.
   - Authoritative knowledge corpus covering Uttam's experience at **SnapBizz**, **INCANUS**, **Cerner**, architecture decisions, and disaster recovery drills.
   - Dual-personality engine: **Brutally Honest Mode** vs **Professional Technical Mode**.
   - Optional plug-and-play support for OpenAI / Gemini LLMs if keys are provided in `.env`.

2. **Persistent Portfolio Store (`/api/stats`, `/api/contact`)**:
   - Atomic file-backed database (`backend/data/store.json`) with zero external DB dependencies required.
   - Real persistent project like counters (`POST /api/stats/projects/:id/like`).
   - Real pageview telemetry and terminal executions.
   - Real contact message storage with timestamp, sender metadata, and status.

3. **High-Intensity System Simulations (`/api/simulations/*`)**:
   - `POST /api/simulations/sql-explain`: Computes PostgreSQL planner costs (sequential scan vs composite covering B-Tree index across 10,000,000 rows).
   - `POST /api/simulations/chaos-test`: Computes token-bucket rate limiting drop rates and circuit breaker trips under traffic spikes.
   - `POST /api/simulations/rag-query`: Computes exact Reciprocal Rank Fusion (RRF with k=60) mathematical rank merging.

---

## 💻 Local Setup & Development

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment (Optional)
```bash
cp .env.example .env
```

### 3. Start Server
```bash
npm run dev
# Server will start on http://localhost:5000
```

Verify it's running:
```bash
curl http://localhost:5000/health
```

---

## 🌐 Free Cloud Deployment (e.g. Render.com)

You can host this backend for **100% free** on Render while keeping your frontend on GitHub Pages:

1. Create a free account on [Render.com](https://render.com/).
2. Click **New +** -> **Web Service**.
3. Connect your GitHub repository `chiku97/portfolio`.
4. In settings:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Environment Variables**:
     - `CORS_ORIGIN`: `https://chiku97.github.io,http://localhost:5173`
     - `ADMIN_EMAIL`: `uttamkumar9708@gmail.com`
5. Click **Deploy Web Service**.
6. Render will assign you a free URL like: `https://uttam-portfolio-api.onrender.com`.
7. In your React frontend, set `VITE_API_URL=https://uttam-portfolio-api.onrender.com`.
