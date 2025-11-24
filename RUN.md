# 🚀 How to Run Frontend and Backend

## Quick Start Guide

### Prerequisites
- Python 3.10+ installed
- Node.js 18+ installed
- PostgreSQL installed and running

---

## Step 1: Setup Backend

### 1.1 Navigate to backend folder
```bash
cd backend
```

### 1.2 Activate Virtual Environment
**Windows:**
```bash
venv\Scripts\activate
```

**Mac/Linux:**
```bash
source venv/bin/activate
```

### 1.3 Install Dependencies (if not already installed)
```bash
pip install -r requirements.txt
```

### 1.4 Run Database Migrations
```bash
python manage.py migrate
```

### 1.5 Start Backend Server
```bash
python manage.py runserver
```

✅ Backend will run at: **http://localhost:8000**

**Keep this terminal window open!**

---

## Step 2: Setup Frontend (Open a NEW Terminal)

### 2.1 Navigate to frontend folder
```bash
cd C:\Users\Fairuza\Desktop\netflix\Netflix\frontend
```

### 2.2 Install Dependencies (if not already installed)
```bash
npm install
```

### 2.3 Start Frontend Server
```bash
npm run dev
```

✅ Frontend will run at: **http://localhost:5173**

---

## Summary

You need **TWO terminal windows**:

**Terminal 1 (Backend):**
```bash
cd backend
venv\Scripts\activate
python manage.py runserver
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

---

## Common Issues

### Backend Issues:

1. **"No module named 'django'"**
   - Make sure virtual environment is activated
   - Run: `pip install -r requirements.txt`

2. **Database connection error**
   - Make sure PostgreSQL is running
   - Check database credentials in settings.py

3. **Port 8000 already in use**
   - Use a different port: `python manage.py runserver 8001`

### Frontend Issues:

1. **"Cannot find module"**
   - Run: `npm install`

2. **Port 5173 already in use**
   - Vite will automatically use the next available port

3. **CORS errors**
   - Make sure backend is running on port 8000
   - Check CORS settings in `backend/netflix_backend/settings.py`

---

## Testing

1. Open browser: http://localhost:5173
2. Try to register a new account
3. Login with your credentials
4. Browse movies on the home page

---

**Note:** Make sure PostgreSQL is running before starting the backend!

