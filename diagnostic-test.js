// Detailed diagnostic test for Supabase database
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: './client/.env' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function diagnosticTest() {
    console.log('🔍 Running detailed database diagnostics...\n');
    
    // Test 1: Check if users table exists and get its structure
    console.log('1. Checking users table structure...');
    try {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .limit(1);
        
        if (error) {
            console.log('❌ Users table error:', error.message);
            console.log('   Error code:', error.code);
            console.log('   Error details:', error.details);
        } else {
            console.log('✅ Users table accessible');
            console.log('   Sample data structure:', data);
        }
    } catch (err) {
        console.log('❌ Unexpected error accessing users table:', err.message);
    }

    // Test 2: Check existing users count
    console.log('\n2. Checking existing users...');
    try {
        const { count, error } = await supabase
            .from('users')
            .select('*', { count: 'exact', head: true });
        
        if (error) {
            console.log('❌ Error counting users:', error.message);
        } else {
            console.log('✅ Current users count:', count);
        }
    } catch (err) {
        console.log('❌ Error in count query:', err.message);
    }

    // Test 3: Check auth users
    console.log('\n3. Checking auth.users access...');
    try {
        const { data: { users }, error } = await supabase.auth.admin.listUsers();
        if (error) {
            console.log('❌ Cannot access auth users (this is normal with anon key)');
        } else {
            console.log('✅ Auth users count:', users.length);
        }
    } catch (err) {
        console.log('❌ Auth users access error (expected with anon key):', err.message);
    }

    // Test 4: Try creating a user with a unique email
    console.log('\n4. Testing user creation with unique email...');
    const testEmail = `test_${Date.now()}@example.com`;
    try {
        const { data, error } = await supabase.auth.signUp({
            email: testEmail,
            password: 'testpassword123',
            options: {
                data: {
                    first_name: 'Test',
                    last_name: 'User',
                    full_name: 'Test User',
                    role: 'patient'
                }
            }
        });
        
        if (error) {
            console.log('❌ User creation failed:', error.message);
            console.log('   Error code:', error.code);
            console.log('   Error status:', error.status);
            
            // Check if it's a specific database error
            if (error.message.includes('duplicate key') || error.message.includes('already exists')) {
                console.log('   → This appears to be a duplicate email error');
            } else if (error.message.includes('Database error')) {
                console.log('   → This appears to be a database constraint or trigger error');
            }
        } else {
            console.log('✅ User creation succeeded!');
            console.log('   User ID:', data.user?.id);
            console.log('   User email:', data.user?.email);
            console.log('   Confirmation sent:', data.user?.email_confirmed_at ? 'No' : 'Yes');
        }
    } catch (err) {
        console.log('❌ Unexpected error in user creation:', err.message);
    }

    // Test 5: Check if the user was created in the users table
    if (testEmail) {
        console.log('\n5. Checking if user appears in users table...');
        try {
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('email', testEmail)
                .single();
            
            if (error) {
                if (error.code === 'PGRST116') {
                    console.log('❌ No user found in users table (trigger may have failed)');
                } else {
                    console.log('❌ Error checking users table:', error.message);
                }
            } else {
                console.log('✅ User found in users table:', data);
            }
        } catch (err) {
            console.log('❌ Error querying users table:', err.message);
        }
    }
}

diagnosticTest().catch(console.error);
