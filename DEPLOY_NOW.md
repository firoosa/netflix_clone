# 🚀 Quick Deploy Guide - Follow These Steps Now!

This is a step-by-step guide to deploy your Netflix clone RIGHT NOW using Render (easiest option).

## Step 1: Commit and Push Your Code

```bash
git add .
git commit -m "Prepare for deployment - add hosting configs and production settings"
git push origin master
```

## Step 2: Deploy Backend on Render

### 2.1 Create PostgreSQL Database

1. Go to https://render.com and sign up/login
2. Click **"New +"** → **"PostgreSQL"**
3. Settings:
   - **Name**: `netflix-db`
   - **Database**: `netflix_db`
   - **User**: Leave default
   - **Region**: Choose closest to you
   - **PostgreSQL Version**: 16 (or latest)
   - **Plan**: Free (for testing)
4. Click **"Create Database"**
5. Wait for it to be ready (1-2 minutes)
6. **Copy the "Internal Database URL"** - you'll need this!

### 2.2 Deploy Backend Service

1. Still in Render dashboard, click **"New +"** → **"Web Service"**
2. Connect your GitHub repository: `firoosa/netflix_clone`
3. Select the repository
4. Configure settings:
   - **Name**: `netflix-backend`
   - **Region**: Same as database
   - **Branch**: `master`
   - **Root Directory**: `backend` (important!)
   - **Environment**: `Python 3`
   - **Build Command**: 
     ```
     pip install -r requirements.txt && python manage.py migrate && python manage.py collectstatic --no-input
     ```
   - **Start Command**: 
     ```
     gunicorn netflix_backend.wsgi:application --bind 0.0.0.0:$PORT
     ```

5. **Environment Variables** (click "Add Environment Variable" for each):
   
   | Key | Value |
   |-----|-------|
   | `SECRET_KEY` | Generate one: Run `python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"` |
   | `DEBUG` | `False` |
   | `DATABASE_URL` | Paste the Internal Database URL from step 2.1 |
   | `ALLOWED_HOSTS` | `netflix-backend.onrender.com` (we'll update this after frontend deploys) |
   | `CORS_ALLOWED_ORIGINS` | Leave blank for now, we'll add frontend URL after |

6. Click **"Create Web Service"**
7. Wait for deployment (3-5 minutes)
8. **Copy your backend URL** (e.g., `https://netflix-backend.onrender.com`)

### 2.3 Update Backend Environment Variables

After you get your backend URL:

1. Go back to your backend service settings
2. Update `CORS_ALLOWED_ORIGINS` to: `https://netflix-frontend.onrender.com` (we'll create this next)
3. Also update `ALLOWED_HOSTS` to include your backend URL
4. Click **"Save Changes"** - it will redeploy automatically

## Step 3: Deploy Frontend on Render

1. In Render dashboard, click **"New +"** → **"Static Site"**
2. Connect same GitHub repository: `firoosa/netflix_clone`
3. Configure settings:
   - **Name**: `netflix-frontend`
   - **Region**: Same as others
   - **Branch**: `master`
   - **Root Directory**: Leave blank (root)
   - **Build Command**: 
     ```
     npm install && npm run build
     ```
   - **Publish Directory**: `dist`

4. **Environment Variables**:
   
   | Key | Value |
   |-----|-------|
   | `VITE_API_URL` | `https://netflix-backend.onrender.com/api` (use your backend URL from step 2.2) |

5. Click **"Create Static Site"**
6. Wait for deployment (2-3 minutes)
7. **Copy your frontend URL** (e.g., `https://netflix-frontend.onrender.com`)

## Step 4: Update CORS Settings

1. Go back to your **backend service** settings
2. Update `CORS_ALLOWED_ORIGINS` environment variable to:
   ```
   https://netflix-frontend.onrender.com
   ```
   (Replace with your actual frontend URL)
3. Click **"Save Changes"**
4. It will automatically redeploy

## Step 5: Test Your Deployment! 🎉

1. Visit your frontend URL: `https://netflix-frontend.onrender.com`
2. Try registering a new account
3. Try logging in
4. If you see any CORS errors, double-check the `CORS_ALLOWED_ORIGINS` setting

## Troubleshooting

### Backend won't start?
- Check the logs in Render dashboard
- Make sure `DATABASE_URL` is correct
- Verify `SECRET_KEY` is set

### CORS errors?
- Make sure `CORS_ALLOWED_ORIGINS` in backend includes your frontend URL exactly
- Check for trailing slashes (should be: `https://netflix-frontend.onrender.com` not `https://netflix-frontend.onrender.com/`)

### Frontend can't connect to backend?
- Check `VITE_API_URL` is set correctly: `https://your-backend-url.onrender.com/api`
- Make sure backend is deployed and running (check logs)

### Database errors?
- Make sure PostgreSQL database is running
- Check `DATABASE_URL` is correct (should start with `postgresql://`)

## 🎊 You're Live!

Your Netflix clone should now be accessible at your frontend URL!

---

**Need help?** Check the full [HOSTING_GUIDE.md](HOSTING_GUIDE.md) for more details and alternative hosting options.

