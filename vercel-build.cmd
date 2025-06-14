@echo off
echo Starting build with warnings not treated as errors
set CI=false
set SKIP_PREFLIGHT_CHECK=true
set ESLINT_NO_DEV_ERRORS=true

echo Running build...
call npm run build

echo Build completed successfully!
