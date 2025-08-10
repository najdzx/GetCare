import { supabase } from '../lib/supabase';

export class AuthService {
  // Sign up new user
  static async signUp({ email, password, firstName, lastName, role = 'patient' }) {
    try {
      // Step 1: Create auth user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            full_name: `${firstName} ${lastName}`,
            role
          }
        }
      });

      if (error) throw error;

      // Step 2: Save to users table
      if (data.user) {
        const { error: dbError } = await supabase
          .from('users')
          .insert([
            {
              id: data.user.id,
              email,
              first_name: firstName,
              last_name: lastName,
              full_name: `${firstName} ${lastName}`,
              role,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            }
          ]);

        if (dbError) {
          console.error('Database insert error:', dbError);
          // Return success even if DB insert fails since auth user was created
          return { 
            success: true, 
            data, 
            warning: 'Account created but there was an issue saving additional data.'
          };
        }
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Sign in user
  static async signIn({ email, password }) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Sign out user
  static async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Get current user
  static async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Get current session
  static async getSession() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      return { success: true, session };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Reset password
  static async resetPassword(email) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Create admin account (run once)
  static async createAdminAccount() {
    const adminEmail = 'admin@getcare.com';
    const adminPassword = 'Admin123!'; // Change this to a secure password

    try {
      // Step 1: Create auth user
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

      if (error) throw error;

      // Step 2: Insert into users table
      if (data.user) {
        const { error: dbError } = await supabase
          .from('users')
          .insert([
            {
              id: data.user.id,
              email: adminEmail,
              first_name: 'Admin',
              last_name: 'User',
              full_name: 'Admin User',
              role: 'admin',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            }
          ]);

        if (dbError) {
          console.error('Database insert error:', dbError);
          // Auth user was still created even if DB insert fails
        }
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
