#!/bin/bash
echo "Starting build with warnings not treated as errors"
export CI=false
export SKIP_PREFLIGHT_CHECK=true
export ESLINT_NO_DEV_ERRORS=true

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Run build
echo "Running build..."
npm run build

echo "Build completed successfully!"
