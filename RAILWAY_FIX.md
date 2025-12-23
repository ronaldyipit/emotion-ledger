# Railway Build Error Fix

## Error: "Railpack could not determine how to build the app"

This error occurs when Railway can't detect your project type. Here's how to fix it:

## ✅ Solution 1: Set Root Directory (MOST IMPORTANT!)

**In Railway Dashboard:**
1. Go to your service
2. Click **Settings**
3. Find **Root Directory**
4. Set it to: `backend`
5. Click **Save**

This is the #1 cause of this error!

## ✅ Solution 2: Configuration Files Added

I've created these files to help Railway detect your project:

- ✅ `backend/nixpacks.toml` - Explicit build configuration
- ✅ `backend/runtime.txt` - Python version
- ✅ `backend/.python-version` - Python version (alternative format)
- ✅ `backend/railway.json` - Railway-specific config

## Step-by-Step Fix

### 1. Verify Files Are Committed

Make sure these files are in your GitHub repository:
```bash
git add backend/nixpacks.toml
git add backend/.python-version
git commit -m "Add Railway build configuration"
git push
```

### 2. In Railway Dashboard

1. **Go to your service**
2. **Settings → Root Directory**
   - Change from `/` (root) to `backend`
   - This tells Railway where your Python code is

3. **Settings → Deploy**
   - Start Command should be: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - Or leave empty to use `railway.json` or `nixpacks.toml`

4. **Redeploy**
   - Go to Deployments
   - Click "Redeploy" or push a new commit

### 3. Verify Build Detection

After setting root directory, Railway should:
- ✅ Detect Python from `requirements.txt`
- ✅ Use `nixpacks.toml` for build instructions
- ✅ Install dependencies automatically
- ✅ Start the server

## What Each File Does

### `nixpacks.toml`
- Explicitly tells Railway/Nixpacks how to build
- Defines Python version, install commands, and start command

### `runtime.txt`
- Standard Python version file
- Format: `python-3.11`

### `.python-version`
- Alternative Python version indicator
- Some tools prefer this format

### `railway.json`
- Railway-specific configuration
- Defines start command and restart policy

## Still Not Working?

### Check Railway Logs:
1. Go to **Deployments** → Latest deployment
2. Click **View Logs**
3. Look for:
   - "Detected Python project" ✅
   - "Installing dependencies" ✅
   - "Starting application" ✅

### Common Issues:

1. **Root Directory not set to `backend`**
   - This is 90% of the problem!
   - Railway tries to build from repo root
   - Can't find `requirements.txt` or `app/` directory

2. **Files not committed to GitHub**
   - Railway only sees what's in GitHub
   - Make sure `nixpacks.toml` is committed

3. **Wrong branch**
   - Railway might be deploying from wrong branch
   - Check Settings → Source → Branch

## Quick Checklist

- [ ] Root Directory = `backend` (in Railway Settings)
- [ ] `backend/nixpacks.toml` exists and is committed
- [ ] `backend/requirements.txt` exists
- [ ] `backend/app/` directory exists with Python files
- [ ] Code is pushed to GitHub
- [ ] Railway service is connected to correct GitHub repo

## After Fix

Once deployed successfully, you should see:
- ✅ Build logs showing Python detection
- ✅ Dependencies installing
- ✅ Server starting on port
- ✅ Your API accessible at `https://your-app.up.railway.app`

Test it: Visit `https://your-app.up.railway.app/docs`

