@echo off
echo.
echo ========================================
echo   DAEDALE Admin Panel Startup
echo ========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ ERROR: Node.js is not installed!
    echo.
    echo Please install Node.js first:
    echo 1. Go to: https://nodejs.org/
    echo 2. Download and install the LTS version
    echo 3. Restart your computer
    echo 4. Run this script again
    echo.
    pause
    exit /b 1
)

REM Check if npm is available
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ ERROR: npm is not available!
    echo Please reinstall Node.js from https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo ✅ Node.js detected!
echo.
echo Installing dependencies...
call npm install

if errorlevel 1 (
    echo ❌ Failed to install dependencies
    echo.
    pause
    exit /b 1
)

echo.
echo ✅ Dependencies installed!
echo.
echo Starting DAEDALE Admin Server...
echo.
echo 🌐 Admin panel: http://localhost:3001/admin.html
echo 🔑 Login: admin / password
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

node server.js

echo.
echo Server stopped.
pause