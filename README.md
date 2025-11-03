# Netflix Clone - Full Stack Application

A full-featured Netflix clone built with React, Django, and PostgreSQL. This application features user authentication, movie browsing, and a beautiful Netflix-inspired UI.

## 🎬 Features

- ✅ User Authentication (Register, Login, Logout)
- ✅ JWT Token-based Security
- ✅ Movie Browsing with TMDB API
- ✅ Responsive Netflix-style UI
- ✅ PostgreSQL Database
- ✅ Django REST API Backend
- ✅ React + Vite Frontend
- ✅ Redux State Management

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI Library
- **Vite** - Build Tool
- **Redux Toolkit** - State Management
- **React Router** - Routing
- **Axios** - HTTP Client
- **Bootstrap** - Styling

### Backend
- **Django 5** - Web Framework
- **Django REST Framework** - API Framework
- **PostgreSQL** - Database
- **Simple JWT** - Authentication
- **Django CORS Headers** - CORS Support

## 📋 Prerequisites

Before you begin, ensure you have installed:

- **Node.js** (v18 or higher)
- **Python** (v3.10 or higher)
- **PostgreSQL** (v14 or higher)
- **npm** or **yarn**
- **Git**

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd Netflix
```

### 2. Backend Setup

#### Install PostgreSQL and Create Database

```bash
# After installing PostgreSQL, create database:
psql -U postgres
CREATE DATABASE netflix_db;
\q
```

#### Set Up Django Backend

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env
# Edit .env and add your database credentials

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser (optional)
python manage.py createsuperuser

# Start Django server
python manage.py runserver
```

Backend will run at: `http://localhost:8000`

### 3. Frontend Setup

```bash
# From the root directory (not backend folder)
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:8000/api" > .env
echo "VITE_TMDB_API_KEY=your_tmdb_api_key_here" >> .env

# Start development server
npm run dev
```

Frontend will run at: `http://localhost:5173`

## 📁 Project Structure

```
Netflix/
├── backend/                    # Django Backend
│   ├── accounts/              # User authentication app
│   │   ├── models.py         # User model
│   │   ├── serializers.py    # DRF serializers
│   │   ├── views.py          # API views
│   │   └── urls.py           # Auth endpoints
│   ├── netflix_backend/       # Main Django project
│   │   ├── settings.py       # Django settings
│   │   └── urls.py           # Main URL config
│   ├── manage.py
│   ├── requirements.txt
│   └── README.md
├── src/                       # React Frontend
│   ├── components/           # React components
│   │   ├── Banner.jsx
│   │   ├── Header.jsx
│   │   └── MovieRow.jsx
│   ├── context/             # React Context
│   │   └── AuthContext.jsx
│   ├── features/            # Redux features
│   │   └── movies/
│   │       └── movieSlice.js
│   ├── pages/               # Page components
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── services/            # API services
│   │   └── api.js
│   ├── App.jsx
│   └── main.jsx
├── package.json
├── vite.config.js
├── MIGRATION_GUIDE.md        # Firebase to Django migration guide
└── README.md                 # This file
```

## 🔐 Environment Variables

### Backend (.env in backend/)

```env
SECRET_KEY=your-django-secret-key
DEBUG=True
DB_NAME=netflix_db
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
```

### Frontend (.env in root/)

```env
VITE_API_URL=http://localhost:8000/api
VITE_TMDB_API_KEY=your_tmdb_api_key
```

## 📡 API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register/` | Register new user | No |
| POST | `/api/auth/login/` | Login user | No |
| POST | `/api/auth/logout/` | Logout user | Yes |
| GET | `/api/auth/profile/` | Get user profile | Yes |
| PUT | `/api/auth/profile/` | Update profile | Yes |
| POST | `/api/auth/token/refresh/` | Refresh token | No |

## 🎯 Usage

### Register a New Account

1. Navigate to `http://localhost:5173/register`
2. Enter your email and password
3. Click "Sign Up"
4. You'll be automatically logged in and redirected to home

### Login

1. Navigate to `http://localhost:5173/`
2. Enter your registered email and password
3. Click "Sign In"
4. Browse movies on the home page

### Browse Movies

- Scroll through different categories
- Click on movie posters for more info
- Enjoy the Netflix-style UI!

## 🔧 Development

### Run Frontend in Development Mode

```bash
npm run dev
```

### Run Backend in Development Mode

```bash
cd backend
python manage.py runserver
```

### Build for Production

```bash
# Frontend
npm run build
# Output will be in the 'dist' directory

# Backend
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic --no-input

# Run with Gunicorn (production server)
gunicorn netflix_backend.wsgi:application
```

**Note:** For detailed deployment instructions, see the [Hosting Guide](HOSTING_GUIDE.md)

## 🧪 Testing

### Test API with curl

**Register:**
```bash
curl -X POST http://localhost:8000/api/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123","password2":"test123"}'
```

**Login:**
```bash
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'
```

## 🚀 Deployment & Hosting

Ready to deploy your Netflix clone? Check out the comprehensive [Hosting Guide](HOSTING_GUIDE.md) which covers:

- **Render** - Easy full-stack hosting (recommended for beginners)
- **Railway** - Seamless PostgreSQL and deployment
- **Separate Hosting** - Frontend on Vercel/Netlify + Backend on Railway/Render
- **VPS Deployment** - DigitalOcean, AWS EC2 for full control
- Production checklist and troubleshooting

The project is already configured with:
- ✅ Production-ready Django settings
- ✅ Gunicorn WSGI server setup
- ✅ WhiteNoise for static files
- ✅ Environment variable configuration
- ✅ CORS configuration
- ✅ Security settings for production

## 📚 Documentation

- [Backend README](backend/README.md) - Detailed backend documentation
- [Migration Guide](MIGRATION_GUIDE.md) - Firebase to Django migration guide
- [Hosting Guide](HOSTING_GUIDE.md) - Complete deployment instructions

## 🐛 Common Issues

### CORS Errors
- Ensure Django backend is running on port 8000
- Check `CORS_ALLOWED_ORIGINS` in `backend/netflix_backend/settings.py`

### Database Connection Error
- Verify PostgreSQL is running
- Check database credentials in `.env`

### JWT Token Errors
- Clear browser localStorage: `localStorage.clear()`
- Login again to get fresh tokens

## 📝 License

This project is for educational purposes.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

For questions or support, please open an issue in the repository.

---

**Happy Coding! 🚀**
