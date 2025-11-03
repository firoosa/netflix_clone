# 🚀 Deploy to Render - Step by Step Guide

This guide will help you deploy your Netflix clone to Render using your GitHub repository: **https://github.com/firoosa/netflix_clone**

## Prerequisites

✅ Your code is on GitHub at https://github.com/firoosa/netflix_clone  
✅ You have a Render account (sign up at https://render.com if needed)

## Method 1: Quick Deploy with render.yaml (Easiest!)

I've created a `render.yaml` file that will automatically set up everything for you.

### Steps:

1. **Commit and push render.yaml to GitHub:**
   ```bash
   git add render.yaml
   git commit -m "Add render.yaml for automated deployment"
   git push origin master
   ```

2. **Go to Render Dashboard:**
   - Visit https://dashboard.render.com
   - Sign in or create account

3. **Create Blueprint:**
   - Click **"New +"** → **"Blueprint"**
   - Connect your GitHub repository: `firoosa/netflix_clone`
   - Select the repository
   - Render will automatically detect `render.yaml`
   - Click **"Apply"**
   - Render will create:
     - PostgreSQL database (`netflix-db`)
     - Backend service (`netflix-backend`)
     - Frontend service (`netflix-frontend`)

4. **Wait for deployment** (5-10 minutes)
   - All services will build and deploy automatically
   - Watch the logs to ensure everything builds correctly

5. **Update CORS after frontend deploys:**
   - Once frontend is deployed, copy its URL
   - Go to `netflix-backend` service → Environment
   - Update `CORS_ALLOWED_ORIGINS` to include your actual frontend URL
   - Save changes (will auto-redeploy)

6. **Test your app!**
   - Visit your frontend URL
   - Try registering and logging in

---

## Method 2: Manual Deployment (Step-by-Step)

If you prefer to set up manually or if the blueprint doesn't work:

### Step 1: Create PostgreSQL Database

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"PostgreSQL"**
3. Settings:
   - **Name**: `netflix-db`
   - **Database**: `netflix_db`
   - **User**: `netflix_user` (or leave default)
   - **Region**: `Oregon` (or closest to you)
   - **PostgreSQL Version**: 16
   - **Plan**: Free
4. Click **"Create Database"**
5. Wait 1-2 minutes for it to be ready
6. **Copy the "Internal Database URL"** - you'll need this!

### Step 2: Deploy Backend Service

1. Click **"New +"** → **"Web Service"**
2. Connect GitHub and select repository: `firoosa/netflix_clone`
3. Configure:
   - **Name**: `netflix-backend`
   - **Region**: Same as database
   - **Branch**: `master`
   - **Root Directory**: `backend` ⚠️ **IMPORTANT!**
   - **Runtime**: `Python 3`
   - **Build Command**: 
     ```bash
     pip install -r requirements.txt && python manage.py migrate && python manage.py collectstatic --no-input
     ```
   - **Start Command**: 
     ```bash
     gunicorn netflix_backend.wsgi:application --bind 0.0.0.0:$PORT
     ```

4. **Environment Variables** (click "Add Environment Variable"):
   
   | Key | Value |
   |-----|-------|
   | `PYTHON_VERSION` | `3.11.0` |
   | `SECRET_KEY` | Generate: Run `python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"` |
   | `DEBUG` | `False` |
   | `DATABASE_URL` | Paste Internal Database URL from Step 1 |
   | `ALLOWED_HOSTS` | `netflix-backend.onrender.com` |
   | `CORS_ALLOWED_ORIGINS` | `https://netflix-frontend.onrender.com` (update after frontend deploys) |

5. Click **"Create Web Service"**
6. Wait for deployment (3-5 minutes)
7. **Copy your backend URL** (e.g., `https://netflix-backend.onrender.com`)

### Step 3: Deploy Frontend Service

1. Click **"New +"** → **"Static Site"**
2. Connect GitHub and select repository: `firoosa/netflix_clone`
3. Configure:
   - **Name**: `netflix-frontend`
   - **Region**: Same as others
   - **Branch**: `master`
   - **Root Directory**: Leave blank (root)
   - **Build Command**: 
     ```bash
     npm install && npm run build
     ```
   - **Publish Directory**: `dist`

4. **Environment Variables**:
   
   | Key | Value |
   |-----|-------|
   | `VITE_API_URL` | `https://netflix-backend.onrender.com/api` (use your backend URL from Step 2) |

5. Click **"Create Static Site"**
6. Wait for deployment (2-3 minutes)
7. **Copy your frontend URL** (e.g., `https://netflix-frontend.onrender.com`)

### Step 4: Update CORS Settings

1. Go back to **Backend Service** → **Environment**
2. Update `CORS_ALLOWED_ORIGINS` to your actual frontend URL:
   ```
   https://netflix-frontend.onrender.com
   ```
   (Replace with your actual URL if different)
3. Click **"Save Changes"**
4. Wait for redeployment (1-2 minutes)

### Step 5: Test Your Deployment! 🎉

1. Visit your frontend URL: `https://netflix-frontend.onrender.com`
2. Try these:
   - ✅ Register a new account
   - ✅ Login with your account
   - ✅ Browse movies
   - ✅ Logout

---

## Troubleshooting

### 🔴 Backend Build Fails

**Check:**
- Root Directory is set to `backend`
- Build command includes `cd backend` or Root Directory is correct
- All dependencies in `requirements.txt`
- Check logs in Render dashboard for specific errors

**Common fixes:**
```bash
# If collectstatic fails, make sure STATIC_ROOT is set in settings.py
# If migrations fail, check DATABASE_URL is correct
```

### 🔴 Frontend Build Fails

**Check:**
- Build command: `npm install && npm run build`
- Publish directory: `dist`
- Environment variable `VITE_API_URL` is set correctly
- Check logs for specific npm/node errors

### 🔴 CORS Errors

**Symptoms:** Frontend loads but API calls fail with CORS error

**Fix:**
1. Go to backend service → Environment
2. Verify `CORS_ALLOWED_ORIGINS` includes your exact frontend URL
3. No trailing slash: `https://netflix-frontend.onrender.com` ✅
   Not: `https://netflix-frontend.onrender.com/` ❌
4. Save and wait for redeploy

### 🔴 Database Connection Errors

**Check:**
- `DATABASE_URL` is set correctly in backend environment variables
- Database service is running (green status)
- URL format: `postgresql://user:pass@host:port/dbname`

### 🔴 500 Internal Server Error

**Check backend logs:**
1. Go to backend service → Logs
2. Look for specific error messages
3. Common issues:
   - Missing `SECRET_KEY`
   - `DEBUG=True` in production (should be `False`)
   - Database migration errors
   - Missing environment variables

### 🔴 Frontend Shows Blank Page

**Check:**
- Build completed successfully (check logs)
- `VITE_API_URL` environment variable is set
- Browser console for JavaScript errors
- Network tab to see if API calls are working

---

## Your Deployment URLs

After deployment, you'll have:

- **Frontend**: `https://netflix-frontend.onrender.com`
- **Backend API**: `https://netflix-backend.onrender.com`
- **Admin Panel**: `https://netflix-backend.onrender.com/admin` (if you created superuser)

---

## Next Steps

✅ Your app is live!  
✅ Share your frontend URL  
✅ Monitor logs in Render dashboard  
✅ Set up custom domain (optional - in service settings)

---

## Quick Reference

### Generate Django Secret Key:
```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

### Test Backend API:
```bash
curl https://netflix-backend.onrender.com/api/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123","password2":"test123"}'
```

### View Backend Logs:
Render Dashboard → Your Service → Logs tab

---

**Need help?** Check the full [HOSTING_GUIDE.md](HOSTING_GUIDE.md) for more details and alternative hosting options.

**Happy Deploying! 🚀**

