# Deployment Guide for Emotion Ledger

This guide covers how to deploy your full-stack application (FastAPI backend + React frontend).

## Table of Contents
1. [Pushing to GitHub](#pushing-to-github)
2. [Deployment Options](#deployment-options)
3. [Recommended: Separate Deployments](#recommended-separate-deployments)
4. [Alternative: Full-Stack Platforms](#alternative-full-stack-platforms)

---

## Pushing to GitHub

### Initial Setup

1. **Initialize Git repository** (if not already done):
```bash
git init
git add .
git commit -m "Initial commit"
```

2. **Create a new repository on GitHub** and connect it:
```bash
git remote add origin https://github.com/YOUR_USERNAME/emotion-ledger.git
git branch -M main
git push -u origin main
```

---

## Deployment Options

### Option 1: Separate Deployments (Recommended)

Deploy frontend and backend separately for better flexibility and scalability.

#### Frontend Deployment

**A. Vercel** (Recommended for React)
- ✅ Free tier available
- ✅ Automatic deployments from GitHub
- ✅ Easy setup

**Steps:**
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click "New Project" → Import your repository
4. Set **Root Directory** to `emotion-ledger-frontend`
5. Build Command: `npm run build`
6. Output Directory: `build`
7. Add environment variable: `REACT_APP_API_URL` = your backend URL
8. Deploy!

**B. Netlify**
- Similar to Vercel
- Go to [netlify.com](https://netlify.com)
- Drag & drop your `build` folder or connect GitHub repo
- Set build command: `npm run build` (in `emotion-ledger-frontend` directory)
- Publish directory: `build`

**C. GitHub Pages**
- Free but requires some configuration
- Good for static sites

#### Backend Deployment

**A. Railway** (Recommended)
- ✅ Free tier ($5 credit/month)
- ✅ Easy Python/FastAPI deployment
- ✅ Automatic deployments from GitHub
- ✅ Built-in database options

**Steps:**
1. Go to [railway.app](https://railway.app) and sign in with GitHub
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Railway will auto-detect Python
5. Set **Root Directory** to `backend`
6. Add start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
7. Railway will provide a URL like `https://your-app.railway.app`
8. Update your frontend's `API_BASE` to this URL

**B. Render**
- ✅ Free tier available (with limitations)
- Similar to Railway

**Steps:**
1. Go to [render.com](https://render.com)
2. Create a new "Web Service"
3. Connect your GitHub repo
4. Set:
   - **Root Directory**: `backend`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Add environment variables if needed

**C. Fly.io**
- ✅ Free tier available
- Good for Docker deployments

**D. Heroku**
- ⚠️ No longer has free tier, but still popular

---

### Option 2: Full-Stack Platforms

Deploy both frontend and backend together.

**A. Render (Full-Stack)**
- Deploy backend as a Web Service
- Deploy frontend as a Static Site
- Both from the same repo

**B. Railway (Full-Stack)**
- Can deploy multiple services from one repo
- Set up backend and frontend as separate services

**C. Vercel (with Serverless Functions)**
- Can convert FastAPI to serverless functions
- More complex setup

---

## Configuration Files Needed

### For Frontend (Vercel/Netlify)

Create `vercel.json` in `emotion-ledger-frontend/`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ]
}
```

### For Backend (Railway/Render)

Create `Procfile` in `backend/`:
```
web: uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

Or create `railway.json` in `backend/`:
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "uvicorn app.main:app --host 0.0.0.0 --port $PORT",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### Update Frontend API URL

Before deploying, update `emotion-ledger-frontend/src/App.js`:
```javascript
// For production, use environment variable
const API_BASE = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";
```

Create `.env.production` in `emotion-ledger-frontend/`:
```
REACT_APP_API_URL=https://your-backend-url.railway.app
```

---

## Quick Start: Railway + Vercel (Recommended)

### Backend on Railway:
1. Push code to GitHub
2. Go to railway.app → New Project → Deploy from GitHub
3. Select repo → Set root directory to `backend`
4. Railway auto-detects and deploys
5. Copy the generated URL

### Frontend on Vercel:
1. Go to vercel.com → New Project → Import GitHub repo
2. Set root directory to `emotion-ledger-frontend`
3. Add environment variable: `REACT_APP_API_URL` = Railway backend URL
4. Deploy!

---

## Important Notes

1. **CORS Configuration**: Your backend already has CORS configured for `localhost:3000`. Update it in production to include your frontend domain:
   ```python
   allow_origins=["http://localhost:3000", "https://your-frontend.vercel.app"]
   ```

2. **Database**: SQLite works for development, but consider PostgreSQL for production (Railway/Render provide this)

3. **Environment Variables**: Never commit `.env` files. Use platform-specific environment variable settings.

4. **Build Commands**: Make sure your build commands work in the deployment environment.

---

## Need Help?

- **Vercel Docs**: https://vercel.com/docs
- **Railway Docs**: https://docs.railway.app
- **Render Docs**: https://render.com/docs
- **FastAPI Deployment**: https://fastapi.tiangolo.com/deployment/

