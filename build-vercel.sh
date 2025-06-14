#!/bin/bash
# Special build script for Vercel with CI=false to prevent treating warnings as errors

# Set CI to false to prevent treating warnings as errors
export CI=false

# Run the build command
npm run build
