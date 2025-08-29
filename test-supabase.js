// Simple test to check Supabase connection and database state
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables from client directory
dotenv.config({ path: './client/.env' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testDatabase() {
    console.log('Testing Supabase connection...');
    
    // Test 1: Check if public.users table has any records
    try {
        const { data: usersList, error } = await supabase.from('users').select('*');
        if (error) {
            console.log('❌ Users table check failed:', error.message);
        } else {
            console.log('✅ Successfully connected to public.users table');
            console.log('Current users in public.users table:', usersList.length);
            if (usersList.length > 0) {
                console.log('Sample user:', usersList[0]);
            }
        }
    } catch (err) {
        console.log('Connection test failed:', err.message);
    }

    // Test 2: Check auth.users table (this will show all authenticated users)
    try {
        const { data: authData, error: authError } = await supabase.auth.admin.listUsers();
        if (authError) {
            console.log('❌ Cannot access auth users (expected with anon key)');
        } else {
            console.log('✅ Auth users found:', authData.users.length);
        }
    } catch (err) {
        console.log('Auth check failed (expected):', err.message);
    }

    // Test 3: Get current user session
    try {
        const { data: sessionData, error: sessionError } = await supabase.auth.getUser();
        if (sessionError) {
            console.log('No active session (expected for test)');
        } else {
            console.log('Current user session:', sessionData.user?.id);
        }
    } catch (err) {
        console.log('Session check failed:', err.message);
    }
}

testDatabase().catch(console.error);
