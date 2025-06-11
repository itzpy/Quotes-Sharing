import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://uhidlfgeddmvvhqqlitz.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVoaWRsZmdlZGRtdnZocXFsaXR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2NDQzMjksImV4cCI6MjA2NTIyMDMyOX0.HNKXbkfsidCyr72qpIDwuOYcQfe7ZshnJgYNN3YQ4Io'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
