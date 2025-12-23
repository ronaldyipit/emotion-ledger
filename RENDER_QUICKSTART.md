# Render.com Quick Start Guide

## 🚀 Deploy in 5 Minutes

### Step 1: Sign Up
1. Go to [render.com](https://render.com)
2. Click "Get Started for Free"
3. Sign up with your **GitHub account**

### Step 2: Deploy Backend

1. **Create Web Service**:
   - Click "New +" button (top right)
   - Select "Web Service"

2. **Connect Repository**:
   - Click "Connect account" if not connected
   - Select your `emotion-ledger` repository
   - Click "Connect"

3. **Configure Service**:
   - **Name**: `emotion-ledger-backend` (or any name)
   - **Region**: Choose closest to you
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: `backend` ⚠️ **IMPORTANT!**
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - **Plan**: Free (or choose paid)

4. **Environment Variables** (Optional):
   - Click "Advanced"
   - Add variable:
     - Key: `ALLOWED_ORIGINS`
     - Value: `http://localhost:3000,https://your-frontend.vercel.app`

5. **Deploy**:
   - Click "Create Web Service"
   - Wait 2-3 minutes for build
   - Get your URL: `https://emotion-ledger-backend.onrender.com`

### Step 3: Test Backend

Visit: `https://your-app.onrender.com/docs`
- Should see FastAPI documentation page ✅

### Step 4: Deploy Frontend (Vercel - Recommended)

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. New Project → Import `emotion-ledger` repo
4. Configure:
   - **Root Directory**: `emotion-ledger-frontend`
   - **Framework Preset**: Create React App
   - **Environment Variable**:
     - Key: `REACT_APP_API_URL`
     - Value: `https://your-backend.onrender.com` (from Step 2)
5. Deploy!

## ✅ That's It!

Your app is now live!

- Backend: `https://your-backend.onrender.com`
- Frontend: `https://your-frontend.vercel.app`

## 📝 Notes

- **Render Free Tier**: Backend spins down after 15 min inactivity (wakes on first request)
- **Auto-Deploy**: Every push to GitHub automatically redeploys
- **Logs**: View in Render dashboard → Your service → Logs

## 🔄 Updating

Just push to GitHub:
```bash
git add .
git commit -m "Update app"
git push
```

Both Render and Vercel will auto-deploy!

## 🆘 Troubleshooting

### Backend not starting?
- Check Logs in Render dashboard
- Verify Root Directory is `backend`
- Verify Start Command is correct

### CORS errors?
- Add frontend URL to `ALLOWED_ORIGINS` environment variable

### Build fails?
- Check `requirements.txt` has all dependencies
- Check logs for specific error

---

**Need help?** Check `DEPLOYMENT_ALTERNATIVES.md` for more options!

