# Supabase Setup Guide for QuoteShare

This document provides detailed instructions for setting up Supabase for your QuoteShare application.

## 1. Create a Supabase Account and Project

1. Go to [supabase.com](https://supabase.com) and sign up for an account
2. Once logged in, click "New project"
3. Enter a project name (e.g., "QuoteShare")
4. Set a secure database password (save this for your records)
5. Choose the region closest to your target audience
6. Click "Create new project"
7. Wait for your project to be provisioned (this may take a few minutes)

## 2. Get Your Project Credentials

1. In your Supabase project dashboard, click on the settings icon (gear) in the left sidebar
2. Select "API" from the settings menu
3. Look for the "Project URL" and "anon public" key
4. Copy these values as you'll need them for your application

## 3. Update Your Application Configuration

1. Open `src/supabaseClient.js` in your code editor
2. Replace the placeholder values with your actual Supabase credentials:
   ```javascript
   const supabaseUrl = 'https://your-project-id.supabase.co'
   const supabaseAnonKey = 'your-anon-key'
   ```

## 4. Set Up Database Tables

1. In your Supabase dashboard, click on "SQL Editor" in the left sidebar
2. Click "New query"
3. Copy and paste the contents of `supabase_schema.sql` into the SQL editor
4. Click "Run" to execute the SQL and set up your tables
5. Verify the tables were created by going to "Table Editor" in the left sidebar

## 5. Configure Authentication

1. Click on "Authentication" in the left sidebar
2. Go to "Settings" -> "Auth Providers"
3. Make sure "Email" provider is enabled
4. (Optional) Add other providers if desired

## 6. Create an Admin User

1. In the Supabase dashboard, go to "Authentication" -> "Users"
2. Click "Invite user"
3. Enter your email address and click "Invite"
4. Check your email for the invitation and set a password
5. This user will be your admin account for adding quotes

## 7. Test Your Setup

1. Install the required npm packages using:
   ```
   npm install
   ```
2. Start the development server:
   ```
   npm start
   ```
3. Try logging in with your admin account
4. Add a quote and verify it gets saved to Supabase
5. Try adding comments as a non-authenticated user

## 8. Production Considerations

- Set up proper CORS configuration in Supabase settings if needed
- Consider adding more authentication options for your admin users
- Review Row Level Security policies for production use
- Set up automatic database backups
