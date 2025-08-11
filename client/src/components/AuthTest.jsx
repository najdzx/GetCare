import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const AuthTest = () => {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  // Test if users table exists
  const testTableExists = async () => {
    setLoading(true);
    setResult('Testing if users table exists...');
    
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .limit(1);
      
      if (error) {
        setResult(`❌ Users table error: ${error.message}\n\n🔧 You need to create the users table first!\n\n1. Go to Supabase Dashboard\n2. Click SQL Editor\n3. Run the SQL script from SETUP_DATABASE.sql`);
      } else {
        setResult(`✅ Users table exists! Found ${data.length} users.`);
      }
    } catch (error) {
      setResult(`❌ Error: ${error.message}`);
    }
    setLoading(false);
  };

  // Create admin account
  const createAdmin = async () => {
    setLoading(true);
    setResult('Creating admin account...');
    
    try {
      // Step 1: Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: 'admin@getcare.com',
        password: 'Admin123!',
        options: {
          data: {
            first_name: 'Admin',
            last_name: 'User',
            full_name: 'Admin User',
            role: 'admin'
          }
        }
      });

      if (authError) {
        setResult(`❌ Auth error: ${authError.message}`);
        setLoading(false);
        return;
      }

      // Step 2: Insert into users table
      if (authData.user) {
        const { error: dbError } = await supabase
          .from('users')
          .insert([
            {
              id: authData.user.id,
              email: 'admin@getcare.com',
              first_name: 'Admin',
              last_name: 'User',
              full_name: 'Admin User',
              role: 'admin'
            }
          ]);

        if (dbError) {
          setResult(`❌ Database insert error: ${dbError.message}\n\nAuth user was created but database insert failed.`);
        } else {
          setResult('✅ Admin account created successfully!\n\nCredentials:\nEmail: admin@getcare.com\nPassword: Admin123!\nRole: admin');
        }
      }
    } catch (error) {
      setResult(`❌ Error: ${error.message}`);
    }
    setLoading(false);
  };

  // Test patient registration
  const testPatientRegistration = async () => {
    setLoading(true);
    setResult('Testing patient registration...');
    
    const testEmail = `test.patient.${Date.now()}@example.com`;
    
    try {
      // Step 1: Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: testEmail,
        password: 'TestPass123',
        options: {
          data: {
            first_name: 'Test',
            last_name: 'Patient',
            full_name: 'Test Patient',
            role: 'patient'
          }
        }
      });

      if (authError) {
        setResult(`❌ Auth error: ${authError.message}`);
        setLoading(false);
        return;
      }

      // Step 2: Insert into users table
      if (authData.user) {
        const { error: dbError } = await supabase
          .from('users')
          .insert([
            {
              id: authData.user.id,
              email: testEmail,
              first_name: 'Test',
              last_name: 'Patient',
              full_name: 'Test Patient',
              role: 'patient'
            }
          ]);

        if (dbError) {
          setResult(`❌ Database insert error: ${dbError.message}\n\nAuth user was created but database insert failed.`);
        } else {
          setResult(`✅ Patient registration successful!\n\nEmail: ${testEmail}\nPassword: TestPass123\nRole: patient\n\n✅ Data saved to both auth.users and public.users tables!`);
        }
      }
    } catch (error) {
      setResult(`❌ Error: ${error.message}`);
    }
    setLoading(false);
  };

  // Check all users
  const checkAllUsers = async () => {
    setLoading(true);
    setResult('Checking all users in database...');
    
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        setResult(`❌ Error: ${error.message}`);
      } else {
        const usersList = data.map(user => 
          `- ${user.full_name} (${user.email}) - Role: ${user.role} - Created: ${new Date(user.created_at).toLocaleDateString()}`
        ).join('\n');
        
        setResult(`✅ Found ${data.length} users in database:\n\n${usersList || 'No users found.'}`);
      }
    } catch (error) {
      setResult(`❌ Error: ${error.message}`);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>🧪 GetCare Database & Authentication Test</h2>
      
      <div style={{ marginBottom: '20px', padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
        <h3>📋 Setup Checklist:</h3>
        <ol>
          <li>✅ Supabase project created</li>
          <li>❓ Run SQL script to create users table</li>
          <li>❓ Test table exists</li>
          <li>❓ Create admin account</li>
          <li>❓ Test patient registration</li>
        </ol>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>🔧 Test Functions:</h3>
        
        <button 
          onClick={testTableExists} 
          disabled={loading}
          style={{ margin: '5px', padding: '10px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          1. Test Table Exists
        </button>
        
        <button 
          onClick={createAdmin} 
          disabled={loading}
          style={{ margin: '5px', padding: '10px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          2. Create Admin Account
        </button>
        
        <button 
          onClick={testPatientRegistration} 
          disabled={loading}
          style={{ margin: '5px', padding: '10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          3. Test Patient Registration
        </button>
        
        <button 
          onClick={checkAllUsers} 
          disabled={loading}
          style={{ margin: '5px', padding: '10px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          4. Check All Users
        </button>
      </div>

      {loading && <div style={{ color: '#007bff' }}>⏳ Loading...</div>}
      
      {result && (
        <div style={{ 
          padding: '15px', 
          background: result.includes('✅') ? '#d4edda' : '#f8d7da',
          border: `1px solid ${result.includes('✅') ? '#c3e6cb' : '#f5c6cb'}`,
          borderRadius: '4px',
          whiteSpace: 'pre-line',
          fontFamily: 'monospace',
          fontSize: '14px'
        }}>
          {result}
        </div>
      )}

      <div style={{ marginTop: '30px', padding: '15px', background: '#e9ecef', borderRadius: '8px' }}>
        <h3>📖 Instructions:</h3>
        <ol>
          <li><strong>First time setup:</strong> Go to Supabase SQL Editor and run the SQL from <code>SETUP_DATABASE.sql</code></li>
          <li><strong>Test the table:</strong> Click "Test Table Exists" to verify the table was created</li>
          <li><strong>Create admin:</strong> Click "Create Admin Account" (only do this once)</li>
          <li><strong>Test registration:</strong> Click "Test Patient Registration" to verify the flow works</li>
          <li><strong>Check results:</strong> Click "Check All Users" to see all registered users</li>
        </ol>
        
        <h4>Manual Testing:</h4>
        <ul>
          <li>Go to <code>/register</code> and create a patient account</li>
          <li>Go to <code>/login</code> and login with those credentials</li>
          <li>Should redirect to <code>/patient/dashboard</code></li>
        </ul>
      </div>
    </div>
  );
};

export default AuthTest;
