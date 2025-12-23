# Vercel Deployment Guide for Emotion Ledger

## 🎯 Deployment Strategy

**Frontend (React)**: Deploy to Vercel ✅ (Perfect fit!)
**Backend (FastAPI)**: Deploy to Render or Fly.io (Vercel is not ideal for FastAPI)

---

## Part 1: Deploy Frontend to Vercel

### Step 1: Sign Up / Sign In

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" or "Log In"
3. **Sign in with your GitHub account** (recommended)

### Step 2: Create New Project

1. Click **"Add New..."** → **"Project"**
2. You'll see a list of your GitHub repositories
3. Find and click **"Import"** next to `emotion-ledger`

### Step 3: Configure Project

Vercel will auto-detect it's a React app. Configure:

1. **Project Name**: `emotion-ledger-frontend` (or any name)
2. **Framework Preset**: Should auto-detect "Create React App" ✅
3. **Root Directory**: 
   - Click "Edit" next to Root Directory
   - Set to: `emotion-ledger-frontend` ⚠️ **IMPORTANT!**
4. **Build Command**: `npm run build` (auto-filled)
5. **Output Directory**: `build` (auto-filled)
6. **Install Command**: `npm install` (auto-filled)

### Step 4: Add Environment Variables

**Before deploying**, add environment variable:

1. Scroll down to **"Environment Variables"** section
2. Click **"Add"**
3. Add:
   - **Key**: `REACT_APP_API_URL`
   - **Value**: 
     - For now: `http://localhost:8000` (for testing)
     - Later: `https://your-backend.onrender.com` (after backend is deployed)
   - **Environment**: Production, Preview, Development (select all)

### Step 5: Deploy!

1. Click **"Deploy"** button
2. Wait 1-2 minutes for build
3. Vercel will provide a URL like: `https://emotion-ledger-frontend.vercel.app`

### Step 6: Test Your Deployment

1. Visit your Vercel URL
2. Check browser console for any errors
3. Test the app functionality

---

## Part 2: Deploy Backend (Render Recommended)

Since Vercel is optimized for frontend/serverless, deploy your FastAPI backend to Render:

### Quick Render Setup:

1. Go to [render.com](https://render.com) → Sign up
2. New → Web Service → Connect GitHub repo
3. Configure:
   - **Root Directory**: `backend`
   - **Build**: `pip install -r requirements.txt`
   - **Start**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
4. Deploy and get URL

### Update Frontend Environment Variable:

1. Go back to Vercel dashboard
2. Your project → Settings → Environment Variables
3. Update `REACT_APP_API_URL` to your Render backend URL
4. Redeploy (automatic on next push, or click Redeploy)

---

## Part 3: Update CORS on Backend

After deploying backend, update CORS to allow your Vercel domain:

**In Render (or your backend platform)**:
- Add environment variable: `ALLOWED_ORIGINS`
- Value: `http://localhost:3000,https://your-frontend.vercel.app`

---

## ✅ Complete Setup Checklist

### Frontend (Vercel):
- [ ] Signed up for Vercel
- [ ] Imported GitHub repository
- [ ] Set Root Directory to `emotion-ledger-frontend`
- [ ] Added `REACT_APP_API_URL` environment variable
- [ ] Deployed successfully
- [ ] Tested frontend URL

### Backend (Render):
- [ ] Signed up for Render
- [ ] Created Web Service
- [ ] Set Root Directory to `backend`
- [ ] Configured build and start commands
- [ ] Deployed successfully
- [ ] Got backend URL

### Final Steps:
- [ ] Updated `REACT_APP_API_URL` in Vercel with backend URL
- [ ] Updated `ALLOWED_ORIGINS` in Render with frontend URL
- [ ] Tested full application

---

## 🔄 Auto-Deployment

Both Vercel and Render auto-deploy on every GitHub push:

```bash
git add .
git commit -m "Update app"
git push
```

Both platforms will automatically:
- Detect the push
- Build your app
- Deploy the new version

---

## 📝 Vercel Configuration Files

Your project already has:
- ✅ `emotion-ledger-frontend/vercel.json` - Vercel configuration
- ✅ `emotion-ledger-frontend/package.json` - Dependencies and scripts

These are already configured correctly!

---

## 🆘 Troubleshooting

### Build Fails on Vercel?

1. **Check Logs**: Vercel dashboard → Your project → Deployments → Click latest → View logs
2. **Common Issues**:
   - Wrong Root Directory (should be `emotion-ledger-frontend`)
   - Missing dependencies in `package.json`
   - Build errors in React code

### Frontend Can't Connect to Backend?

1. **Check Environment Variable**: Make sure `REACT_APP_API_URL` is set correctly
2. **Check CORS**: Backend must allow your Vercel domain
3. **Check Backend URL**: Verify backend is running and accessible

### Environment Variables Not Working?

- Environment variables must start with `REACT_APP_` to be available in React
- After adding/changing variables, you need to redeploy
- Check that variable is set for the correct environment (Production/Preview/Development)

---

## 🎉 Success!

Once deployed:
- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-backend.onrender.com`
- Both auto-update on every GitHub push!

---

## 📚 Additional Resources

- **Vercel Docs**: https://vercel.com/docs
- **Render Docs**: https://render.com/docs
- **React Environment Variables**: https://create-react-app.dev/docs/adding-custom-environment-variables/

---

## 💡 Pro Tips

1. **Custom Domain**: Vercel allows free custom domains
2. **Preview Deployments**: Every PR gets a preview URL automatically
3. **Analytics**: Vercel provides built-in analytics
4. **Speed**: Vercel's CDN makes your app super fast globally

---

Need help with backend deployment to Render? Check `RENDER_QUICKSTART.md`!

