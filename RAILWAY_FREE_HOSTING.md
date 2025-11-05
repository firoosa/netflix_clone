# 🚀 Free Hosting on Railway (No Card Required!)

Railway offers free hosting without requiring a payment card!

## ✅ Why Railway?
- ✅ **No credit card required** for free tier
- ✅ PostgreSQL database included
- ✅ Automatic deployments from GitHub
- ✅ Easy setup
- ✅ Free tier includes $5 credit/month

## Step 1: Sign Up for Railway

1. Go to https://railway.app
2. Click **"Start a New Project"** or **"Login"**
3. Sign in with GitHub (same account as your repo)

## Step 2: Create PostgreSQL Database

1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. For now, click **"Empty Project"** (we'll add services one by one)
4. Click **"+ New"** → **"Database"** → **"Add PostgreSQL"**
5. Wait 1-2 minutes for database to be created
6. Click on the database → **"Variables"** tab
7. Copy the `DATABASE_URL` - you'll need this!

## Step 3: Deploy Backend

1. In your Railway project, click **"+ New"** → **"GitHub Repo"**
2. Select: `firoosa/netflix_clone`
3. After it's added, click on the service
4. Click **"Settings"** tab
5. Set **"Root Directory"** to: `backend`
6. Go to **"Variables"** tab and add:

| Key | Value |
|-----|-------|
| `PYTHON_VERSION` | `3.11.0` |
| `SECRET_KEY` | Click "Generate" or use: `@xny6xo)u#^inr2x0lerxk0nb)vt2w3wy6%hluc_qml4^1#^km` |
| `DEBUG` | `False` |
| `DATABASE_URL` | Paste the DATABASE_URL from Step 2 |
| `ALLOWED_HOSTS` | `netflix-backend.up.railway.app` |
| `CORS_ALLOWED_ORIGINS` | `https://netflix-frontend.up.railway.app` |

7. Go to **"Settings"** → **"Deploy"** section
8. Set **"Start Command"** to:
   ```
   cd backend && gunicorn netflix_backend.wsgi:application
   ```
9. Railway will auto-detect and deploy! Wait 3-5 minutes
10. Copy your backend URL (e.g., `https://netflix-backend.up.railway.app`)

## Step 4: Deploy Frontend

1. Click **"+ New"** → **"GitHub Repo"**
2. Select same repo: `firoosa/netflix_clone`
3. Click on the new service → **"Settings"**
4. Set **"Root Directory"** to: `.` (root, or leave blank)
5. In **"Variables"** tab, add:
   - `VITE_API_URL` = `https://netflix-backend.up.railway.app/api` (use your backend URL)
6. In **"Settings"** → **"Deploy"** section:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npx serve -s dist -l $PORT`
7. Railway will auto-deploy! Wait 2-3 minutes
8. Copy your frontend URL

## Step 5: Update CORS

1. Go back to backend service → **"Variables"**
2. Update `CORS_ALLOWED_ORIGINS` with your actual frontend URL
3. Save (will auto-redeploy)

## Step 6: Test! 🎉

Visit your frontend URL and test registration/login!

---

## Alternative: Separate Hosting (Also Free!)

### Option A: Frontend on Vercel + Backend on Railway
- **Frontend**: Vercel (free, no card) - https://vercel.com
- **Backend**: Railway (free, no card)

### Option B: Frontend on Netlify + Backend on Railway
- **Frontend**: Netlify (free, no card) - https://netlify.com
- **Backend**: Railway (free, no card)

---

## Railway Quick Links

- **Sign Up**: https://railway.app
- **Dashboard**: https://railway.app/dashboard
- **Your Backend**: `https://netflix-backend.up.railway.app`
- **Your Frontend**: `https://netflix-frontend.up.railway.app`

---

**Railway is completely free and doesn't require a card!** 🎉

