@echo off
REM Django Backend Startup Script for Windows

cd /d c:\Users\hp\Desktop\VIR\workshop_booking

echo ========================================
echo Django Backend Startup
echo ========================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    pause
    exit /b 1
)

echo Installing dependencies...
pip install -r requirements.txt -q
if errorlevel 1 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo Running database migrations...
python manage.py migrate --noinput
if errorlevel 1 (
    echo ERROR: Migration failed
    pause
    exit /b 1
)

echo.
echo ========================================
echo Starting Django Development Server
echo ========================================
echo.
echo Server will be available at: http://localhost:8000
echo Admin panel at: http://localhost:8000/admin
echo.
echo Press Ctrl+C to stop the server
echo.

python manage.py runserver

pause
