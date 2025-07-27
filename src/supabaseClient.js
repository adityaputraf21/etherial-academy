// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mskxwrrhttqomnhdwemw.supabase.co'  // Ganti dengan URL kamu
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1za3h3cnJodHRxb21uaGR3ZW13Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1Mzg4MzgsImV4cCI6MjA2OTExNDgzOH0.4vi58z6q1hh4enMGKqjF9hAA2Mb38b4uJYFxwInOB8Q'      // Ganti dengan anon key kamu

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
