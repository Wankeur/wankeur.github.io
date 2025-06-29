@echo off
echo Starting DAEDALE Admin Panel...
echo.
echo Installing dependencies...
call npm install
echo.
echo Starting server...
echo.
echo Admin panel will be available at: http://localhost:3001/admin.html
echo Login: admin / password
echo.
echo Press Ctrl+C to stop the server
echo.
node server.js
pause