# Railway Quick Start Guide

## 🚀 Deploy Your Backend in 5 Minutes

### Step 1: Sign Up / Sign In
1. Go to [railway.app](https://railway.app)
2. Click "Start a New Project"
3. Sign in with your **GitHub account**

### Step 2: Connect Your Repository
1. Click **"Deploy from GitHub repo"**
2. Select your `emotion-ledger` repository
3. Click **"Deploy Now"**

### Step 3: Configure Backend
1. Click on the service that was created
2. Go to **Settings** tab
3. Set **Root Directory** to: `backend`
4. Railway will automatically:
   - Detect Python
   - Install dependencies
   - Start the server

### Step 4: Get Your URL
1. Go to **Settings** → **Networking**
2. Click **"Generate Domain"**
3. Copy the URL (e.g., `https://emotion-ledger-production.up.railway.app`)

### Step 5: Update Frontend (If deploying frontend separately)
1. In your frontend deployment (Vercel/Netlify), add environment variable:
   - `REACT_APP_API_URL` = your Railway backend URL

### Step 6: Set CORS (Optional but Recommended)
1. In Railway, go to your backend service
2. Click **Variables** tab
3. Add new variable:
   - Key: `ALLOWED_ORIGINS`
   - Value: `http://localhost:3000,https://your-frontend-url.vercel.app`

## ✅ That's It!

Your backend is now live! Test it by visiting:
- `https://your-app.up.railway.app/docs` (FastAPI auto-generated docs)

## 📝 Notes

- Railway auto-detects Python and uses your `requirements.txt`
- The `railway.json` file configures the start command
- Your database (SQLite) will be created automatically
- Check the **Logs** tab if something goes wrong

## 🔄 Updating Your App

Just push to GitHub! Railway automatically redeploys:
```bash
git add .
git commit -m "Update app"
git push
```

---

For detailed instructions, see `RAILWAY_DEPLOYMENT.md`

