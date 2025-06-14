@echo off
REM Deployment script for Vercel

echo === Starting Vercel Deployment ===

REM Check if Vercel CLI is installed
where vercel >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Vercel CLI not found. Installing...
    npm i -g vercel
    if %ERRORLEVEL% NEQ 0 (
        echo Failed to install Vercel CLI. Please install manually with 'npm i -g vercel'
        exit /b 1
    )
)

REM Build the project
echo Building project...
npm run build
if %ERRORLEVEL% NEQ 0 (
    echo Build failed.
    exit /b 1
)

REM Deploy to Vercel
echo Deploying to Vercel...
vercel --prod

echo === Deployment Complete ===
