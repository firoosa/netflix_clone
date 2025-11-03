# Netflix Clone - Django Backend

This is the Django REST API backend for the Netflix clone application, providing user authentication and authorization using JWT tokens.

## Features

- User Registration & Login
- JWT Authentication with access and refresh tokens
- PostgreSQL database
- Django REST Framework
- CORS enabled for React frontend
- User profile management

## Tech Stack

- **Django 5.0.1**
- **Django REST Framework**
- **Simple JWT** for token-based authentication
- **PostgreSQL** database
- **Django CORS Headers** for cross-origin requests

## Prerequisites

Before you begin, ensure you have the following installed:

- Python 3.10 or higher
- PostgreSQL 14 or higher
- pip (Python package manager)
- virtualenv (recommended)

## Installation & Setup

### 1. Create and Activate Virtual Environment

**Windows:**
```bash
cd backend
python -m venv venv
venv\Scripts\activate
```

**macOS/Linux:**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Set Up PostgreSQL Database

1. Install PostgreSQL if you haven't already
2. Create a new database:

```sql
CREATE DATABASE netflix_db;
CREATE USER postgres WITH PASSWORD 'your_password';
ALTER ROLE postgres SET client_encoding TO 'utf8';
ALTER ROLE postgres SET default_transaction_isolation TO 'read committed';
ALTER ROLE postgres SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE netflix_db TO postgres;
```

### 4. Configure Environment Variables

Create a `.env` file in the `backend` directory:

```bash
cp .env.example .env
```

Edit `.env` and update the following variables:

```env
# Django Settings
SECRET_KEY=your-secret-key-here-change-this-in-production
DEBUG=True

# PostgreSQL Database Settings
DB_NAME=netflix_db
DB_USER=postgres
DB_PASSWORD=your_password_here
DB_HOST=localhost
DB_PORT=5432
```

**To generate a secure SECRET_KEY:**
```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

### 5. Run Database Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### 6. Create a Superuser (Optional)

```bash
python manage.py createsuperuser
```

### 7. Run the Development Server

```bash
python manage.py runserver
```

The backend API will be available at: `http://localhost:8000`

## API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register/` | Register a new user | No |
| POST | `/api/auth/login/` | Login user | No |
| POST | `/api/auth/logout/` | Logout user | Yes |
| GET | `/api/auth/profile/` | Get user profile | Yes |
| PUT | `/api/auth/profile/` | Update user profile | Yes |
| POST | `/api/auth/token/refresh/` | Refresh access token | No |

### API Request Examples

**Register:**
```bash
curl -X POST http://localhost:8000/api/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "username": "user123",
    "password": "securepassword123",
    "password2": "securepassword123"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securepassword123"
  }'
```

**Response:**
```json
{
  "user": {
    "id": 1,
    "username": "user123",
    "email": "user@example.com",
    "first_name": "",
    "last_name": "",
    "created_at": "2024-01-01T12:00:00Z"
  },
  "tokens": {
    "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc...",
    "access": "eyJ0eXAiOiJKV1QiLCJhbGc..."
  },
  "message": "Login successful"
}
```

## Project Structure

```
backend/
├── accounts/                # User authentication app
│   ├── admin.py            # Admin configuration
│   ├── models.py           # User model
│   ├── serializers.py      # DRF serializers
│   ├── views.py            # API views
│   └── urls.py             # App URLs
├── netflix_backend/        # Main project directory
│   ├── settings.py         # Django settings
│   ├── urls.py             # Main URL configuration
│   ├── wsgi.py            # WSGI config
│   └── asgi.py            # ASGI config
├── manage.py              # Django management script
├── requirements.txt       # Python dependencies
├── .env.example          # Environment variables example
└── README.md             # This file
```

## Testing the API

You can use the Django REST Framework browsable API:

1. Go to `http://localhost:8000/api/auth/register/`
2. You'll see a user-friendly interface to test the endpoints

Alternatively, use tools like:
- **Postman**
- **Insomnia**
- **curl** (command line)
- **httpie** (command line)

## Django Admin Panel

Access the admin panel at: `http://localhost:8000/admin/`

Use the superuser credentials you created earlier.

## Common Issues & Solutions

### Issue: Database connection error
**Solution:** Make sure PostgreSQL is running and credentials in `.env` are correct.

### Issue: Port already in use
**Solution:** Stop any other Django servers or use a different port:
```bash
python manage.py runserver 8001
```

### Issue: Migrations not applying
**Solution:** Delete migration files (except `__init__.py`) and rerun:
```bash
python manage.py makemigrations
python manage.py migrate
```

## Production Deployment

For production deployment:

1. Set `DEBUG=False` in `.env`
2. Update `ALLOWED_HOSTS` in `settings.py`
3. Use a production-grade server (Gunicorn, uWSGI)
4. Set up proper database backups
5. Use environment variables for sensitive data
6. Enable HTTPS
7. Set up proper logging

## License

This project is for educational purposes.

