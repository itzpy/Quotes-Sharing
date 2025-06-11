# Deployment Script for QuoteShare App (PowerShell version)
# This script automates the deployment process for different platforms

param(
    [Parameter(Mandatory=$true)]
    [string]$Platform
)

# Check if platform argument is valid
$ValidPlatforms = @("vercel", "netlify", "github-pages", "firebase")
if ($ValidPlatforms -notcontains $Platform) {
    Write-Host "Unknown platform: $Platform"
    Write-Host "Available platforms: vercel, netlify, github-pages, firebase"
    exit 1
}

# Install dependencies if node_modules doesn't exist
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..."
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Failed to install dependencies. Exiting."
        exit 1
    }
}

# Build the project
Write-Host "Building project..."
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed. Exiting."
    exit 1
}

# Deploy based on platform
switch ($Platform) {
    "vercel" {
        Write-Host "Deploying to Vercel..."
        npx vercel --prod
    }
    "netlify" {
        Write-Host "Deploying to Netlify..."
        npx netlify deploy --prod
    }
    "github-pages" {
        Write-Host "Deploying to GitHub Pages..."
        npm run deploy
    }
    "firebase" {
        Write-Host "Deploying to Firebase..."
        npx firebase deploy --only hosting
    }
}

Write-Host "Deployment completed!"
