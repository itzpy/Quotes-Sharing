# Deployment Script for QuoteShare App
# This script automates the deployment process for different platforms

# Variables
PLATFORM=$1  # First argument is the deployment platform

# Check if platform argument is provided
if [ -z "$PLATFORM" ]; then
  echo "Usage: ./deploy.sh <platform>"
  echo "Available platforms: vercel, netlify, github-pages, firebase"
  exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
  if [ $? -ne 0 ]; then
    echo "Failed to install dependencies. Exiting."
    exit 1
  fi
fi

# Build the project
echo "Building project..."
npm run build
if [ $? -ne 0 ]; then
  echo "Build failed. Exiting."
  exit 1
fi

# Deploy based on platform
case $PLATFORM in
  vercel)
    echo "Deploying to Vercel..."
    npx vercel --prod
    ;;
  netlify)
    echo "Deploying to Netlify..."
    npx netlify deploy --prod
    ;;
  github-pages)
    echo "Deploying to GitHub Pages..."
    npm run deploy
    ;;
  firebase)
    echo "Deploying to Firebase..."
    npx firebase deploy --only hosting
    ;;
  *)
    echo "Unknown platform: $PLATFORM"
    echo "Available platforms: vercel, netlify, github-pages, firebase"
    exit 1
    ;;
esac

echo "Deployment completed!"
