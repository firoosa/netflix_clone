# 🚀 Hosting Guide for Netflix Clone

This guide covers multiple hosting options for your React + Django Netflix clone application.

## 📋 Table of Contents

1. [Hosting Strategy Overview](#hosting-strategy-overview)
2. [Option 1: Render (Recommended for Beginners)](#option-1-render-recommended-for-beginners)
3. [Option 2: Railway (Easy Full-Stack Hosting)](#option-2-railway-easy-full-stack-hosting)
4. [Option 3: Separate Hosting (Frontend + Backend)](#option-3-separate-hosting-frontend--backend)
5. [Option 4: VPS Deployment (DigitalOcean, AWS EC2)](#option-4-vps-deployment-digitalocean-aws-ec2)
6. [Production Checklist](#production-checklist)
7. [Troubleshooting](#troubleshooting)

---

## Hosting Strategy Overview

Your application consists of:
- **Frontend**: React + Vite (static files after build)
- **Backend**: Django REST API
- **Database**: PostgreSQL

You can host:
- **Option A**: Everything on one platform (Render, Railway, Heroku)
- **Option B**: Separate hosting (Frontend on Vercel/Netlify, Backend on Railway/Render)

---

## Option 1: Render (Recommended for Beginners)

Render offers free PostgreSQL databases and easy deployment.

### Step 1: Prepare Backend for Production

1. **Update Django Settings** - Add production settings:

```python
# backend/netflix_backend/settings.py
import os
import dj_database_url

# ... existing code ...

# Production settings
if os.environ.get('RENDER'):
    DEBUG = False
    ALLOWED_HOSTS = ['your-backend.onrender.com', 'yourdomain.com']
    
    # Database from Render PostgreSQL
    DATABASES = {
        'default': dj_database_url.config(
            default=os.environ.get('DATABASE_URL'),
            conn_max_age=600,
            conn_health_checks=True,
        )
    }
    
    # Static files
    STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
    STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
    
    # Security settings
    SECURE_SSL_REDIRECT = True
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SECURE_BROWSER_XSS_FILTER = True
    SECURE_CONTENT_TYPE_NOSNIFF = True
```

2. **Update requirements.txt**:

```txt
Django==5.0.1
djangorestframework==3.14.0
djangorestframework-simplejwt==5.3.1
django-cors-headers==4.3.1
psycopg2-binary==2.9.9
gunicorn==21.2.0
whitenoise==6.6.0
dj-database-url==2.1.0
```

3. **Create build script** (`backend/build.sh`):

```bash
#!/usr/bin/env bash
# Exit on error
set -o errexit

# Run migrations
python manage.py migrate

# Collect static files
python manage.py collectstatic --no-input
```

4. **Create render.yaml** (in root directory):

```yaml
services:
  # Backend Service
  - type: web
    name: netflix-backend
    env: python
    plan: free
    buildCommand: cd backend && pip install -r requirements.txt && python manage.py migrate && python manage.py collectstatic --no-input
    startCommand: cd backend && gunicorn netflix_backend.wsgi:application
    envVars:
      - key: PYTHON_VERSION
        value: 3.11.0
      - key: SECRET_KEY
        generateValue: true
      - key: DEBUG
        value: False
      - key: DATABASE_URL
        fromDatabase:
          name: netflix-db
          property: connectionString
      - key: CORS_ALLOWED_ORIGINS
        value: https://your-frontend.onrender.com

  # Frontend Service
  - type: web
    name: netflix-frontend
    env: static
    buildCommand: npm install && npm run build
    staticPublishPath: ./dist
    envVars:
      - key: VITE_API_URL
        value: https://netflix-backend.onrender.com/api

  # PostgreSQL Database
  - type: pg
    name: netflix-db
    plan: free
```

### Step 2: Deploy to Render

1. **Push code to GitHub**
2. **Go to Render Dashboard** → New → PostgreSQL
   - Name: `netflix-db`
   - Plan: Free
   - Create Database
3. **New → Web Service** → Connect GitHub repo
   - **For Backend:**
     - Name: `netflix-backend`
     - Environment: Python 3
     - Build Command: `cd backend && pip install -r requirements.txt && python manage.py migrate && python manage.py collectstatic --no-input`
     - Start Command: `cd backend && gunicorn netflix_backend.wsgi:application --bind 0.0.0.0:$PORT`
     - Environment Variables:
       - `SECRET_KEY`: Generate a secure key
       - `DEBUG`: `False`
       - `DATABASE_URL`: From your PostgreSQL service
       - `CORS_ALLOWED_ORIGINS`: `https://netflix-frontend.onrender.com`
   - **For Frontend:**
     - Name: `netflix-frontend`
     - Environment: Static Site
     - Build Command: `npm install && npm run build`
     - Publish Directory: `dist`
     - Environment Variables:
       - `VITE_API_URL`: `https://netflix-backend.onrender.com/api`

4. **Update CORS settings** in your backend to allow your frontend URL

---

## Option 2: Railway (Easy Full-Stack Hosting)

Railway provides seamless PostgreSQL and easy deployment.

### Step 1: Update Backend for Railway

1. **Create `Procfile`** in `backend/` directory:

```
web: gunicorn netflix_backend.wsgi:application --bind 0.0.0.0:$PORT
```

2. **Create `railway.json`** in root:

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "cd backend && pip install -r requirements.txt && python manage.py migrate && python manage.py collectstatic --no-input"
  },
  "deploy": {
    "startCommand": "cd backend && gunicorn netflix_backend.wsgi:application --bind 0.0.0.0:$PORT",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### Step 2: Deploy to Railway

1. **Install Railway CLI**: `npm i -g @railway/cli`
2. **Login**: `railway login`
3. **Initialize**: `railway init`
4. **Add PostgreSQL**: `railway add postgresql`
5. **Set Environment Variables**:
   ```bash
   railway variables set SECRET_KEY=your-secret-key-here
   railway variables set DEBUG=False
   railway variables set DATABASE_URL=${{Postgres.DATABASE_URL}}
   ```
6. **Deploy Backend**: `railway up`
7. **Deploy Frontend**: Create new service, connect GitHub, set build command: `npm run build`

---

## Option 3: Separate Hosting (Frontend + Backend)

This approach gives you more flexibility and often better performance.

### Backend: Railway or Render

Follow the backend steps from Option 1 or 2.

### Frontend: Vercel or Netlify

#### Using Vercel:

1. **Install Vercel CLI**: `npm i -g vercel`
2. **Create `vercel.json`** in root:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "env": {
    "VITE_API_URL": "https://your-backend-url.com/api"
  }
}
```

3. **Deploy**:
   - Push to GitHub
   - Go to vercel.com → New Project
   - Import your repo
   - Set Environment Variable: `VITE_API_URL` = your backend URL
   - Deploy

#### Using Netlify:

1. **Create `netlify.toml`** in root:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  VITE_API_URL = "https://your-backend-url.com/api"
```

2. **Deploy**:
   - Push to GitHub
   - Go to netlify.com → New site from Git
   - Connect repository
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Add environment variable: `VITE_API_URL`

---

## Option 4: VPS Deployment (DigitalOcean, AWS EC2)

For full control, deploy on a VPS.

### Step 1: Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install dependencies
sudo apt install python3-pip python3-venv postgresql nginx nodejs npm git -y

# Install Node.js 18+ (if needed)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
```

### Step 2: Setup PostgreSQL

```bash
# Switch to postgres user
sudo -u postgres psql

# Create database and user
CREATE DATABASE netflix_db;
CREATE USER netflix_user WITH PASSWORD 'your_secure_password';
ALTER ROLE netflix_user SET client_encoding TO 'utf8';
ALTER ROLE netflix_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE netflix_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE netflix_db TO netflix_user;
\q
```

### Step 3: Deploy Backend

```bash
# Clone repository
git clone <your-repo-url> /var/www/netflix
cd /var/www/netflix/backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
pip install gunicorn

# Create .env file
nano .env
```

Add to `.env`:
```env
SECRET_KEY=your-secret-key-here
DEBUG=False
DB_NAME=netflix_db
DB_USER=netflix_user
DB_PASSWORD=your_secure_password
DB_HOST=localhost
DB_PORT=5432
ALLOWED_HOSTS=your-domain.com,www.your-domain.com
```

```bash
# Run migrations
python manage.py migrate
python manage.py collectstatic --no-input
python manage.py createsuperuser

# Test server
gunicorn netflix_backend.wsgi:application --bind 0.0.0.0:8000
```

### Step 4: Setup Gunicorn Service

Create `/etc/systemd/system/netflix-backend.service`:

```ini
[Unit]
Description=Netflix Backend Gunicorn
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/var/www/netflix/backend
Environment="PATH=/var/www/netflix/backend/venv/bin"
ExecStart=/var/www/netflix/backend/venv/bin/gunicorn --workers 3 --bind unix:/var/www/netflix/backend/netflix.sock netflix_backend.wsgi:application

[Install]
WantedBy=multi-user.target
```

```bash
# Start service
sudo systemctl start netflix-backend
sudo systemctl enable netflix-backend
```

### Step 5: Setup Nginx

Create `/etc/nginx/sites-available/netflix`:

```nginx
# Backend
server {
    listen 80;
    server_name api.your-domain.com;

    location / {
        proxy_pass http://unix:/var/www/netflix/backend/netflix.sock;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /static/ {
        alias /var/www/netflix/backend/staticfiles/;
    }
}

# Frontend
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    root /var/www/netflix/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/netflix /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 6: Build and Deploy Frontend

```bash
cd /var/www/netflix
npm install
npm run build

# Copy dist folder
sudo cp -r dist/* /var/www/netflix/dist/
```

### Step 7: Setup SSL with Certbot

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d your-domain.com -d www.your-domain.com -d api.your-domain.com
```

---

## Production Checklist

Before going live, ensure:

### Backend
- [ ] Set `DEBUG=False` in production
- [ ] Generate secure `SECRET_KEY` (use: `python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"`)
- [ ] Configure `ALLOWED_HOSTS` with your domain
- [ ] Update `CORS_ALLOWED_ORIGINS` with frontend URL
- [ ] Setup PostgreSQL database
- [ ] Run migrations: `python manage.py migrate`
- [ ] Collect static files: `python manage.py collectstatic --no-input`
- [ ] Configure environment variables
- [ ] Use Gunicorn/uWSGI for production server
- [ ] Setup proper logging

### Frontend
- [ ] Build production bundle: `npm run build`
- [ ] Set `VITE_API_URL` environment variable to backend URL
- [ ] Update CORS settings in backend to match frontend URL
- [ ] Test all API endpoints
- [ ] Verify authentication flow works

### Security
- [ ] Use HTTPS (SSL certificates)
- [ ] Enable CSRF protection
- [ ] Secure cookie settings
- [ ] Use environment variables for secrets
- [ ] Regularly update dependencies
- [ ] Setup proper CORS configuration
- [ ] Implement rate limiting (consider django-ratelimit)

### Database
- [ ] Backup strategy in place
- [ ] Database migrations completed
- [ ] Connection pooling configured
- [ ] Database credentials secured

---

## Troubleshooting

### CORS Errors
**Problem**: Frontend can't connect to backend

**Solution**:
1. Update `CORS_ALLOWED_ORIGINS` in `settings.py`:
```python
CORS_ALLOWED_ORIGINS = [
    "https://your-frontend-domain.com",
    "https://www.your-frontend-domain.com",
]
```

### Database Connection Errors
**Problem**: Can't connect to PostgreSQL

**Solution**:
1. Verify database credentials in environment variables
2. Check if PostgreSQL is running
3. Verify database exists and user has permissions
4. For cloud databases, check firewall/security group settings

### Static Files Not Loading
**Problem**: CSS/JS files return 404

**Solution**:
1. Run `python manage.py collectstatic --no-input`
2. Configure static files serving in production (use WhiteNoise or Nginx)
3. Check `STATIC_ROOT` and `STATIC_URL` settings

### Build Failures
**Problem**: Frontend or backend build fails

**Solution**:
1. Check Node.js and Python versions match requirements
2. Verify all dependencies are in `package.json` and `requirements.txt`
3. Check build logs for specific error messages
4. Ensure environment variables are set correctly

### 500 Internal Server Error
**Problem**: Backend returns 500 errors

**Solution**:
1. Check server logs
2. Verify database connection
3. Ensure all migrations are run
4. Check environment variables are set
5. Temporarily set `DEBUG=True` to see error details (remove in production!)

---

## Quick Deploy Commands Reference

### Render
```bash
# No CLI needed, use web interface
# Just connect GitHub and configure
```

### Railway
```bash
railway login
railway init
railway add postgresql
railway up
```

### Vercel
```bash
vercel login
vercel
```

### Netlify
```bash
netlify login
netlify init
netlify deploy --prod
```

---

## Support Resources

- [Render Documentation](https://render.com/docs)
- [Railway Documentation](https://docs.railway.app)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
- [Django Deployment Checklist](https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/)

---

**Good luck with your deployment! 🚀**

