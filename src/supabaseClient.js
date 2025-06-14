import { createClient } from '@supabase/supabase-js'

// Use environment variables if available, otherwise use hardcoded values
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://uhidlfgeddmvvhqqlitz.supabase.co'
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVoaWRsZmdlZGRtdnZocXFsaXR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2NDQzMjksImV4cCI6MjA2NTIyMDMyOX0.HNKXbkfsidCyr72qpIDwuOYcQfe7ZshnJgYNN3YQ4Io'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
