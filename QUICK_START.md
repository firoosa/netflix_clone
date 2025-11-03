# 🚀 Quick Start Guide

Get your Netflix clone running in 5 minutes!

## Prerequisites Checklist

- [ ] Python 3.10+ installed
- [ ] PostgreSQL installed
- [ ] Node.js 18+ installed
- [ ] Git installed

## Step-by-Step Setup

### 1️⃣ Database Setup (2 minutes)

```bash
# Start PostgreSQL (if not running)
# Then create database:
psql -U postgres
CREATE DATABASE netflix_db;
\q
```

### 2️⃣ Backend Setup (2 minutes)

```bash
cd backend

# Windows:
python -m venv venv
venv\Scripts\activate

# Mac/Linux:
python3 -m venv venv
source venv/bin/activate

# Install packages
pip install -r requirements.txt

# Setup database
python manage.py migrate

# Start server
python manage.py runserver
```

✅ Backend running at: http://localhost:8000

### 3️⃣ Frontend Setup (1 minute)

Open a NEW terminal:

```bash
# From project root
npm install
npm run dev
```

✅ Frontend running at: http://localhost:5173

## 🎉 You're Done!

1. Open browser: http://localhost:5173
2. Click "Sign up now"
3. Create account
4. Start browsing movies!

## ⚙️ Environment Setup (Optional but Recommended)

### Backend: `backend/.env`
```env
SECRET_KEY=django-insecure-change-this-in-production
DEBUG=True
DB_NAME=netflix_db
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
```

### Frontend: `.env`
```env
VITE_API_URL=http://localhost:8000/api
VITE_TMDB_API_KEY=your_tmdb_key
```

## ❓ Troubleshooting

**Problem:** Can't connect to database  
**Fix:** Make sure PostgreSQL is running

**Problem:** Port 8000 already in use  
**Fix:** `python manage.py runserver 8001`

**Problem:** CORS error  
**Fix:** Make sure both servers are running

## 📖 Need More Help?

- See [README.md](README.md) for full documentation
- See [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md) for detailed migration guide
- See [backend/README.md](backend/README.md) for backend-specific docs

---

**Happy Coding! 🎬**

