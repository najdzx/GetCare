import { AuthService } from '../services/authService';

// Script to create admin account
// Run this once after setting up Supabase

const createAdminAccount = async () => {
  console.log('Creating admin account...');
  
  try {
    const result = await AuthService.createAdminAccount();
    
    if (result.success) {
      console.log('✅ Admin account created successfully!');
      console.log('Email: admin@getcare.com');
      console.log('Password: Admin123!');
      console.log('Role: admin');
      console.log('\n⚠️  Please change the password after first login!');
    } else {
      console.error('❌ Failed to create admin account:', result.error);
    }
  } catch (error) {
    console.error('❌ Error creating admin account:', error);
  }
};

// Export for use in other scripts or components
export { createAdminAccount };

// Run if this file is executed directly
if (typeof window !== 'undefined') {
  // Browser environment
  console.log('To create admin account, call createAdminAccount() function');
} else {
  // Node environment
  createAdminAccount();
}
