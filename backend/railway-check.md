# Railway Deployment Checklist

## Before Deploying

- [x] `requirements.txt` exists with all dependencies
- [x] `railway.json` exists with correct start command
- [x] `runtime.txt` exists (Python version)
- [x] `app/__init__.py` exists
- [x] All Python files are in `backend/app/` directory
- [x] Code is pushed to GitHub

## Railway Dashboard Settings

### Service Configuration:
- [ ] **Root Directory**: Must be set to `backend`
  - Go to: Service → Settings → Root Directory
  - Enter: `backend`
  
- [ ] **Start Command**: Should auto-detect from `railway.json`
  - If not, manually set: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
  - Go to: Service → Settings → Deploy → Start Command

- [ ] **Build Command**: Leave empty (Railway auto-detects)
  - Or set: `pip install -r requirements.txt`

### Environment Variables (Optional):
- [ ] `ALLOWED_ORIGINS` = `http://localhost:3000,https://your-frontend.vercel.app`

## Common Mistakes

❌ **Wrong Root Directory**: If set to root (`/`), Railway won't find `app/` module
✅ **Correct**: Root Directory = `backend`

❌ **Missing __init__.py**: Python won't recognize `app` as a package
✅ **Correct**: `backend/app/__init__.py` exists

❌ **Wrong Port**: Using hardcoded port instead of `$PORT`
✅ **Correct**: Using `$PORT` environment variable

❌ **Wrong Host**: Binding to `127.0.0.1` instead of `0.0.0.0`
✅ **Correct**: Binding to `0.0.0.0` (all interfaces)

## Verify Deployment

After deployment, check:

1. **Logs**: Should show "Uvicorn running on..."
2. **URL**: Visit `https://your-app.up.railway.app/docs`
3. **Health**: Should see FastAPI documentation page

## If Deployment Fails

1. Check Railway logs (most important!)
2. Verify Root Directory is `backend`
3. Verify all files are committed to GitHub
4. Check `requirements.txt` has all dependencies
5. See `RAILWAY_TROUBLESHOOTING.md` for detailed solutions

