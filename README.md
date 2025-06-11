# QuoteShare - Deployment Guide

This repository contains a React application for sharing and discussing quotes. Follow these steps to deploy it.

## Prerequisites

- Node.js and npm installed on your machine
- A deployment platform (like Vercel, Netlify, or GitHub Pages)

## Local Development

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Building for Production

To create a production build, run:
```
npm run build
```

This will create a `build` folder with all the optimized production files.

## Deployment Options

### Automated Deployment

This project includes deployment scripts to simplify the process:

**For Unix/Linux/Mac (bash):**
```
./deploy.sh <platform>
```

**For Windows (PowerShell):**
```
.\deploy.ps1 -Platform <platform>
```

Replace `<platform>` with one of: `vercel`, `netlify`, `github-pages`, or `firebase`.

### Manual Deployment Options

#### Option 1: Deploy to Vercel

1. Create an account on [Vercel](https://vercel.com/)
2. Install the Vercel CLI:
   ```
   npm install -g vercel
   ```
3. Deploy using:
   ```
   vercel
   ```

#### Option 2: Deploy to Netlify

1. Create an account on [Netlify](https://www.netlify.com/)
2. Install the Netlify CLI:
   ```
   npm install -g netlify-cli
   ```
3. Deploy using:
   ```
   netlify deploy
   ```

#### Option 3: Deploy to GitHub Pages

1. Add GitHub Pages dependency:
   ```
   npm install --save gh-pages
   ```

2. Add these scripts to your package.json:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d build"
   ```

3. Add homepage field to package.json:
   ```json
   "homepage": "https://yourusername.github.io/quotes-for-nat"
   ```

4. Deploy using:
   ```
   npm run deploy
   ```

#### Option 4: Firebase Hosting

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Install the Firebase CLI:
   ```
   npm install -g firebase-tools
   ```
3. Initialize Firebase:
   ```
   firebase init
   ```
4. Deploy using:
   ```
   firebase deploy
   ```

## Project Structure

- `public/` - Static files like HTML, images, and manifest
- `src/` - React source code
  - `components/` - React components including QuotesApp
  - `App.js` - Main App component
  - `index.js` - Entry point

## Technology Stack

- React.js - Frontend library
- Tailwind CSS - Styling
- Lucide React - Icons

## Required Assets

Before deploying, add the following files to your `public` directory:

- `favicon.ico` - Website favicon (16x16, 32x32 or 48x48 px)
- `logo192.png` - A 192x192 px logo for PWA and app icons
- `logo512.png` - A 512x512 px logo for PWA and app icons

Placeholder text files have been added to remind you to create these assets.

## Supabase Setup Instructions

This app uses Supabase for data storage and authentication. Follow these steps to set up your Supabase backend:

1. **Create a Supabase account** at [supabase.com](https://supabase.com)
2. **Create a new project** and note your project URL and anon/public API key
3. **Update the credentials** in `src/supabaseClient.js`:
   ```javascript
   const supabaseUrl = 'YOUR_SUPABASE_URL'
   const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY'
   ```
4. **Set up your database tables** by running the SQL in `supabase_schema.sql` in the Supabase SQL editor
5. **Create an admin user** in the Authentication section of your Supabase dashboard
6. **Install the Supabase package** by running:
   ```
   npm install @supabase/supabase-js
   ```

Note: Only you (with admin credentials) can add new quotes, while anyone can read quotes and add comments.
