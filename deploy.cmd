@echo off
echo === Starting Vercel Deployment ===

REM Check for npm
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo npm not found. Please install Node.js and npm.
    exit /b 1
)

REM Install dependencies
echo Installing dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo Failed to install dependencies.
    exit /b 1
)

REM Build the project
echo Building project (CI=false)...
set CI=false
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo Build failed.
    exit /b 1
)

REM Deploy to Vercel
echo Deploying to Vercel...
call npx vercel --prod

echo === Deployment Complete ===
