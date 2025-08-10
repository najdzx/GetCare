import { supabase } from '../supabaseClient';

// This function should be run once to create the admin account
export async function createAdminAccount() {
  const adminEmail = 'admin@getcare.com';
  const adminPassword = 'Admin123!'; // Change this to a secure password

  try {
    // Sign up admin user
    const { data, error } = await supabase.auth.signUp({
      email: adminEmail,
      password: adminPassword,
      options: {
        data: {
          first_name: 'Admin',
          last_name: 'User',
          full_name: 'Admin User',
          role: 'admin'
        }
      }
    });

    if (error) {
      console.error('Error creating admin account:', error.message);
      return { success: false, error: error.message };
    }

    console.log('Admin account created successfully:', data);
    return { success: true, data };
  } catch (err) {
    console.error('Unexpected error:', err);
    return { success: false, error: 'Unexpected error occurred' };
  }
}

// Admin credentials for reference:
// Email: admin@getcare.com
// Password: Admin123!
