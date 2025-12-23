# Railway.app Deployment Guide

This guide will help you deploy your Emotion Ledger application to Railway.

## Prerequisites

1. ✅ Your code is pushed to GitHub
2. ✅ Railway account (sign up at [railway.app](https://railway.app) - free tier available)

---

## Option 1: Deploy Backend Only (Recommended)

Deploy the FastAPI backend to Railway, and deploy the frontend separately to Vercel/Netlify.

### Step 1: Deploy Backend to Railway

1. **Go to Railway.app**
   - Visit [railway.app](https://railway.app)
   - Sign in with your GitHub account

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your `emotion-ledger` repository

3. **Configure Backend Service**
   - Railway will auto-detect it's a Python project
   - Click on the service → Settings
   - Set **Root Directory** to: `backend`
   - Railway will automatically:
     - Detect Python
     - Install dependencies from `requirements.txt`
     - Use the start command from `railway.json`

4. **Get Your Backend URL**
   - After deployment, Railway will provide a URL like: `https://your-app.railway.app`
   - Copy this URL - you'll need it for the frontend

5. **Set Environment Variables (Optional)**
   - Go to Variables tab
   - Add `ALLOWED_ORIGINS` = `http://localhost:3000,https://your-frontend.vercel.app`
   - This allows your frontend to make API calls

### Step 2: Deploy Frontend to Vercel (Recommended)

1. **Go to Vercel.com**
   - Sign in with GitHub
   - Click "New Project"
   - Import your `emotion-ledger` repository

2. **Configure Frontend**
   - Set **Root Directory** to: `emotion-ledger-frontend`
   - Add Environment Variable:
     - Key: `REACT_APP_API_URL`
     - Value: `https://your-backend.railway.app` (from Step 1)

3. **Deploy**
   - Click Deploy
   - Vercel will build and deploy your React app

---

## Option 2: Deploy Both to Railway

Deploy both backend and frontend as separate services on Railway.

### Step 1: Deploy Backend

Follow the same steps as Option 1, Step 1.

### Step 2: Deploy Frontend to Railway

1. **Add New Service**
   - In your Railway project, click "+ New"
   - Select "GitHub Repo"
   - Choose the same repository

2. **Configure Frontend Service**
   - Set **Root Directory** to: `emotion-ledger-frontend`
   - Railway will detect it's a Node.js project
   - Add Environment Variable:
     - Key: `REACT_APP_API_URL`
     - Value: `https://your-backend.railway.app`

3. **Configure Build Settings**
   - Build Command: `npm install && npm run build`
   - Start Command: `npx serve -s build -l $PORT`
   - You may need to install `serve`: Add to `package.json` devDependencies

4. **Update package.json** (if needed)
   ```json
   {
     "scripts": {
       "start": "react-scripts start",
       "build": "react-scripts build",
       "serve": "serve -s build -l $PORT"
     },
     "devDependencies": {
       "serve": "^14.2.0"
     }
   }
   ```

---

## Quick Start: Backend Deployment

### 1. Connect GitHub Repository

```
Railway Dashboard → New Project → Deploy from GitHub repo
→ Select: emotion-ledger
```

### 2. Configure Service

```
Service Settings:
- Root Directory: backend
- Build Command: (auto-detected)
- Start Command: (from railway.json)
```

### 3. Get Your URL

After deployment completes, Railway provides:
- Public URL: `https://your-app.up.railway.app`
- Use this as your API base URL

### 4. Update Frontend

Update `emotion-ledger-frontend/src/App.js` or set environment variable:
```javascript
const API_BASE = process.env.REACT_APP_API_URL || "https://your-app.up.railway.app";
```

---

## Environment Variables

### Backend Variables

| Variable | Value | Description |
|----------|-------|-------------|
| `ALLOWED_ORIGINS` | `http://localhost:3000,https://your-frontend.vercel.app` | CORS allowed origins |
| `PORT` | (auto-set by Railway) | Server port |

### Frontend Variables

| Variable | Value | Description |
|----------|-------|-------------|
| `REACT_APP_API_URL` | `https://your-backend.up.railway.app` | Backend API URL |

---

## Troubleshooting

### Backend Issues

1. **Port Error**
   - Railway automatically sets `$PORT`
   - Make sure your start command uses `$PORT` (already configured in `railway.json`)

2. **Database Issues**
   - SQLite works for development
   - For production, consider Railway's PostgreSQL addon
   - Update `database.py` to use PostgreSQL connection string

3. **CORS Errors**
   - Add your frontend URL to `ALLOWED_ORIGINS` environment variable
   - Format: `http://localhost:3000,https://your-frontend.vercel.app`

### Frontend Issues

1. **Build Fails**
   - Check that `package.json` has all dependencies
   - Ensure Node.js version is compatible (Railway auto-detects)

2. **API Connection Fails**
   - Verify `REACT_APP_API_URL` is set correctly
   - Check backend is running and accessible
   - Verify CORS settings on backend

---

## Database Upgrade (Optional)

For production, consider using PostgreSQL instead of SQLite:

1. **Add PostgreSQL to Railway**
   - In Railway project, click "+ New" → Database → PostgreSQL
   - Railway provides connection string automatically

2. **Update database.py**
   ```python
   DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./emotion_ledger.db")
   ```

3. **Update requirements.txt**
   ```
   fastapi
   uvicorn
   sqlalchemy
   pydantic
   psycopg2-binary  # Add this for PostgreSQL
   ```

---

## Monitoring

- Railway provides logs in real-time
- Check the "Deployments" tab for deployment history
- Use "Metrics" tab to monitor resource usage

---

## Cost

- **Free Tier**: $5 credit/month
- Backend (Python): ~$0.01-0.05/hour
- Frontend (Node.js): ~$0.01-0.05/hour
- PostgreSQL: ~$0.01-0.02/hour

With free tier, you can run small projects for free!

---

## Next Steps

1. ✅ Deploy backend to Railway
2. ✅ Get backend URL
3. ✅ Deploy frontend (Railway or Vercel)
4. ✅ Set environment variables
5. ✅ Test your deployed application!

Need help? Check Railway docs: https://docs.railway.app

