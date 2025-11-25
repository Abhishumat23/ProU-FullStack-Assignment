@echo off
REM ProU Employee & Task Management - Quick Start Script (Windows)
REM This script helps you start both backend and frontend servers

echo =========================================
echo ProU Employee ^& Task Management System
echo Quick Start Script (Windows)
echo =========================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo X Python is not installed. Please install Python 3.9 or higher.
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo X Node.js is not installed. Please install Node.js 16 or higher.
    exit /b 1
)

echo / Prerequisites check passed
echo.

echo Starting ProU Management System...
echo.
echo Choose an option:
echo 1. Start Backend only
echo 2. Start Frontend only
echo 3. Setup Backend (first time)
echo 4. Setup Frontend (first time)
echo 5. Exit
echo.

set /p choice="Enter your choice (1-5): "

if "%choice%"=="1" goto backend
if "%choice%"=="2" goto frontend
if "%choice%"=="3" goto setup_backend
if "%choice%"=="4" goto setup_frontend
if "%choice%"=="5" goto end
goto invalid

:backend
echo.
echo Starting Backend Server...
cd backend

REM Activate virtual environment
if exist venv\Scripts\activate.bat (
    call venv\Scripts\activate.bat
    echo Backend server starting on http://localhost:8000
    python main.py
) else (
    echo X Virtual environment not found. Please run option 3 first.
    pause
)
goto end

:frontend
echo.
echo Starting Frontend Server...
cd frontend

if exist node_modules (
    echo Frontend server starting on http://localhost:5173
    npm run dev
) else (
    echo X Node modules not found. Please run option 4 first.
    pause
)
goto end

:setup_backend
echo.
echo Setting up Backend...
cd backend

echo Creating Python virtual environment...
python -m venv venv

echo Activating virtual environment...
call venv\Scripts\activate.bat

echo Installing Python dependencies...
pip install -r requirements.txt

echo.
echo / Backend setup complete!
echo   Run option 1 to start the backend server.
pause
goto end

:setup_frontend
echo.
echo Setting up Frontend...
cd frontend

echo Installing Node.js dependencies...
npm install

echo.
echo / Frontend setup complete!
echo   Run option 2 to start the frontend server.
pause
goto end

:invalid
echo Invalid choice. Please run the script again.
pause
goto end

:end
