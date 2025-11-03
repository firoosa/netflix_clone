# Firebase to Django + PostgreSQL Migration Guide

This guide will help you migrate your Netflix clone from Firebase authentication to Django backend with PostgreSQL database.

## What Changed?

### Before (Firebase)
- Firebase Authentication for user login/signup
- User data stored in Firebase
- Client-side authentication state management

### After (Django + PostgreSQL)
- Django REST Framework backend
- JWT token-based authentication
- PostgreSQL database for user data
- Custom API endpoints for all auth operations

## Migration Benefits

✅ **Full Control**: Complete control over your backend and database  
✅ **Cost Effective**: No Firebase billing, just PostgreSQL hosting  
✅ **Learning**: Learn full-stack development with Django  
✅ **Scalability**: Easier to scale and customize  
✅ **Security**: Enhanced security with JWT tokens  

## Setup Instructions

### Backend Setup (Django + PostgreSQL)

#### Step 1: Install PostgreSQL

**Windows:**
1. Download PostgreSQL from [postgresql.org](https://www.postgresql.org/download/)
2. Run the installer
3. Remember the password you set for the `postgres` user
4. Add PostgreSQL to your PATH

**macOS:**
```bash
brew install postgresql@14
brew services start postgresql@14
```

**Linux:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

#### Step 2: Create Database

Open PostgreSQL command line:

**Windows:** Search for "SQL Shell (psql)" in Start menu

**macOS/Linux:**
```bash
sudo -u postgres psql
```

Then run:
```sql
CREATE DATABASE netflix_db;
\q
```

#### Step 3: Install Python Dependencies

```bash
cd backend
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

#### Step 4: Configure Environment

Create `.env` file in `backend` directory:

```env
SECRET_KEY=your-generated-secret-key
DEBUG=True

DB_NAME=netflix_db
DB_USER=postgres
DB_PASSWORD=your_postgres_password
DB_HOST=localhost
DB_PORT=5432
```

Generate a secret key:
```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

#### Step 5: Run Migrations

```bash
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser  # Optional: for admin access
```

#### Step 6: Start Django Server

```bash
python manage.py runserver
```

The backend will run at `http://localhost:8000`

### Frontend Setup (React)

#### Step 1: Remove Firebase Package

The Firebase package has already been removed from `package.json`. Install dependencies:

```bash
npm install
```

#### Step 2: Configure API URL

Create or update `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:8000/api
VITE_TMDB_API_KEY=your_tmdb_api_key
```

#### Step 3: Start React Development Server

```bash
npm run dev
```

The frontend will run at `http://localhost:5173`

## Code Changes Overview

### 1. New API Service (`src/services/api.js`)

Handles all API communication with Django backend:
- Register user
- Login user
- Logout user
- Get/update user profile
- Automatic token refresh

### 2. Updated AuthContext (`src/context/AuthContext.jsx`)

Now uses Django API instead of Firebase:
- `login(email, password)` - Login with Django
- `register(email, password)` - Register with Django
- `logout()` - Logout and clear tokens
- `currentUser` - Current user state

### 3. Updated Login Page (`src/pages/Login.jsx`)

- Uses new `useAuth` hook
- Handles Django API responses
- Better error handling

### 4. Updated Register Page (`src/pages/Register.jsx`)

- Uses new `useAuth` hook
- Validates password requirements
- Shows appropriate error messages

## Testing the Migration

### 1. Test Registration

1. Go to `http://localhost:5173/register`
2. Enter email and password
3. Click "Sign Up"
4. You should be redirected to `/home`

### 2. Test Login

1. Go to `http://localhost:5173/`
2. Enter registered email and password
3. Click "Sign In"
4. You should be redirected to `/home`

### 3. Test Logout

1. On the home page, find the logout button
2. Click logout
3. You should be redirected to login page

### 4. Verify Database

Check PostgreSQL to see your user:

```sql
psql -U postgres -d netflix_db
SELECT * FROM users;
```

## Authentication Flow

### Registration Flow:
```
1. User fills registration form
2. React sends POST to /api/auth/register/
3. Django creates user in PostgreSQL
4. Django returns user data + JWT tokens
5. Frontend stores tokens in localStorage
6. User is logged in automatically
```

### Login Flow:
```
1. User fills login form
2. React sends POST to /api/auth/login/
3. Django validates credentials
4. Django returns user data + JWT tokens
5. Frontend stores tokens in localStorage
6. User is redirected to home
```

### Authenticated Requests:
```
1. Frontend gets access_token from localStorage
2. Adds "Authorization: Bearer <token>" header
3. Django verifies JWT token
4. If valid, processes request
5. If expired, frontend refreshes token automatically
```

## Troubleshooting

### Backend Issues

**Problem:** Can't connect to PostgreSQL
```bash
# Check if PostgreSQL is running
# Windows:
Get-Service -Name postgresql*

# macOS/Linux:
sudo systemctl status postgresql
```

**Problem:** Migration errors
```bash
# Reset migrations
python manage.py migrate --run-syncdb
```

**Problem:** CORS errors
- Make sure Django server is running on port 8000
- Check that `CORS_ALLOWED_ORIGINS` in `settings.py` includes your frontend URL

### Frontend Issues

**Problem:** Login/Register not working
- Check browser console for errors
- Verify Django backend is running
- Check network tab for API response

**Problem:** 401 Unauthorized errors
- Clear localStorage: `localStorage.clear()`
- Login again

**Problem:** Can't see user data
- Check if tokens are in localStorage
- Verify API URL in `.env` file

## API Documentation

### Register
```http
POST /api/auth/register/
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepass123",
  "password2": "securepass123"
}
```

### Login
```http
POST /api/auth/login/
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepass123"
}
```

### Get Profile
```http
GET /api/auth/profile/
Authorization: Bearer <access_token>
```

### Logout
```http
POST /api/auth/logout/
Authorization: Bearer <access_token>

{
  "refresh_token": "<refresh_token>"
}
```

## Next Steps

Now that you have Django backend working:

1. **Add Password Reset**: Implement forgot password functionality
2. **Add Email Verification**: Verify user emails on registration
3. **Add User Profiles**: Store additional user data
4. **Add Favorites**: Create API to save favorite movies
5. **Add Watch History**: Track what users watch
6. **Add Subscriptions**: Implement subscription plans

## Resources

- [Django Documentation](https://docs.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [JWT Authentication](https://django-rest-framework-simplejwt.readthedocs.io/)

## Need Help?

If you encounter any issues:
1. Check the error messages carefully
2. Look at Django server logs
3. Check browser console for frontend errors
4. Verify all environment variables are set correctly

Happy coding! 🚀

