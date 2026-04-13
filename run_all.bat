@echo off
REM Quick Start Script for Frontend-Backend Integration (Windows)
REM Run this from the workshop_booking directory

echo.
echo 🚀 FOSSEE Workshop Platform - Quick Start (Windows)
echo ====================================================
echo.

REM Check if running from correct directory
if not exist "manage.py" (
    echo ⚠️  Warning: Please run this from the workshop_booking directory
    echo Usage: cd workshop_booking ^&^& run_all.bat
    pause
    exit /b 1
)

REM Check Python
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python not found
    echo Please install Python 3.6+ and try again
    pause
    exit /b 1
)

REM Check npm
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm not found
    echo Please install Node.js and npm, then run:
    echo   cd frontend ^&^& npm install
    pause
    exit /b 1
)

echo ✅ All dependencies found
echo.
echo Choose which service to start:
echo.
echo 1) Both (Backend + Frontend) - Each in separate terminal
echo 2) Backend only (port 8000)
echo 3) Frontend only (port 3000)
echo.

set /p choice="Enter choice (1-3): "

if "%choice%"=="1" (
    echo.
    echo Starting Backend in a new terminal...
    start cmd /k "cd /d %cd% && python manage.py runserver && pause"
    
    timeout /t 2 /nobreak
    
    echo Starting Frontend in a new terminal...
    start cmd /k "cd /d %cd%\frontend && npm start && pause"
    
    echo.
    echo ✅ Services started in separate terminals
    echo.
    echo Backend:  http://localhost:8000
    echo Frontend: http://localhost:3000
    echo.
    pause
) else if "%choice%"=="2" (
    echo.
    echo 📍 Backend URL: http://localhost:8000
    echo.
    python manage.py runserver
) else if "%choice%"=="3" (
    echo.
    echo 📍 Frontend URL: http://localhost:3000
    echo.
    cd frontend
    npm start
) else (
    echo Invalid choice
    pause
    exit /b 1
)
