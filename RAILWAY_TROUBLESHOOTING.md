# Railway Deployment Troubleshooting Guide

## Common Issues and Solutions

### Issue 1: "Module not found" or Import Errors

**Problem**: Railway can't find your Python modules.

**Solution**: Make sure:
1. ✅ Root Directory is set to `backend` in Railway settings
2. ✅ All files are in the correct structure:
   ```
   backend/
   ├── app/
   │   ├── __init__.py
   │   ├── main.py
   │   ├── database.py
   │   └── ...
   ├── requirements.txt
   ├── railway.json
   └── runtime.txt
   ```

### Issue 2: "Port already in use" or Port Binding Errors

**Problem**: The app isn't binding to the correct port.

**Solution**: 
- ✅ Your `railway.json` already uses `$PORT` correctly
- ✅ Make sure Railway's root directory is set to `backend`
- ✅ Check that the start command is: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

### Issue 3: Build Fails - "No module named 'fastapi'"

**Problem**: Dependencies aren't being installed.

**Solution**:
1. Check `requirements.txt` exists in `backend/` directory
2. Make sure it contains:
   ```
   fastapi
   uvicorn
   sqlalchemy
   pydantic
   ```
3. Railway should auto-detect and install dependencies

### Issue 4: Database Path Errors

**Problem**: SQLite database path issues in Railway's environment.

**Solution**: The current setup should work, but if you get database errors:
- Railway uses an ephemeral filesystem
- Consider using Railway's PostgreSQL addon for production
- Or ensure the database path uses absolute paths (already configured)

### Issue 5: "Command not found: uvicorn"

**Problem**: uvicorn isn't installed or not in PATH.

**Solution**:
1. Verify `uvicorn` is in `requirements.txt` ✅ (it is)
2. Check Railway logs to see if pip install ran successfully
3. Try adding explicit path: `python -m uvicorn app.main:app --host 0.0.0.0 --port $PORT`

### Issue 6: Deployment Hangs or Times Out

**Problem**: The app starts but doesn't respond.

**Solution**:
1. Check Railway logs for errors
2. Verify the app is listening on `0.0.0.0` (not `127.0.0.1`)
3. Make sure port is `$PORT` (Railway sets this automatically)

## Step-by-Step Railway Setup Checklist

### In Railway Dashboard:

1. ✅ **Root Directory**: Set to `backend`
   - Service → Settings → Root Directory → `backend`

2. ✅ **Start Command**: Should auto-detect from `railway.json`
   - If not, manually set: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

3. ✅ **Environment Variables** (Optional):
   - `ALLOWED_ORIGINS` = `http://localhost:3000,https://your-frontend.vercel.app`

4. ✅ **Check Logs**: 
   - Go to Deployments → Click latest → View Logs
   - Look for errors during build or runtime

## Verification Steps

After deployment, test your API:

1. **Check Health**: Visit `https://your-app.up.railway.app/docs`
   - Should show FastAPI auto-generated docs

2. **Test Endpoint**: 
   ```bash
   curl https://your-app.up.railway.app/expenses
   ```
   - Should return `[]` (empty list) if no data

3. **Check Logs**:
   - Railway Dashboard → Your Service → Logs
   - Should show: `Uvicorn running on...`

## Common Error Messages

### "src refspec main does not match any"
- **Cause**: No commits in repository
- **Fix**: Make sure you've committed and pushed to GitHub

### "ModuleNotFoundError: No module named 'app'"
- **Cause**: Wrong root directory or missing `__init__.py`
- **Fix**: Set root directory to `backend`, ensure `app/__init__.py` exists

### "Address already in use"
- **Cause**: Port binding issue
- **Fix**: Use `$PORT` variable, bind to `0.0.0.0`

### "Database locked" or SQLite errors
- **Cause**: SQLite concurrency issues
- **Fix**: Use PostgreSQL (Railway addon) for production

## Still Having Issues?

1. **Check Railway Logs**: Most errors are visible in the logs
2. **Verify File Structure**: Make sure all files are in the right place
3. **Test Locally First**: Run `uvicorn app.main:app` locally to verify it works
4. **Railway Support**: Check Railway docs or Discord community

## Quick Fixes to Try

1. **Redeploy**: Sometimes a fresh deployment fixes issues
2. **Clear Build Cache**: Railway → Settings → Clear Build Cache
3. **Check Python Version**: Ensure `runtime.txt` specifies compatible version
4. **Verify Dependencies**: Make sure all imports are in `requirements.txt`

