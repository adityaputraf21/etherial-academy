// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mpwfsilhyfznosqosmhy.supabase.co'  // Ganti dengan URL kamu
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wd2ZzaWxoeWZ6bm9zcW9zbWh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2MzI5MTQsImV4cCI6MjA2OTIwODkxNH0.y3y7yLr79ypZcMp_e83S5wKH5yHn6VErpFnooGxGDeI'      // Ganti dengan anon key kamu

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
