import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gsfenzwxltwdocktyvhd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzZmVuend4bHR3ZG9ja3R5dmhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3ODU4MjgsImV4cCI6MjA3MDM2MTgyOH0.m2nIrvDz4UsIDT7uQYMmy__dloGKBhrzSvmOonRMuGE';

export const supabase = createClient(supabaseUrl, supabaseKey);