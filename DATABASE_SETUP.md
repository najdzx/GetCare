# 🚀 GetCare Database Setup Guide

## � **Complete Setup Checklist**

### **Step 1: Create Database Table**
1. Go to your **Supabase Dashboard** → [supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your GetCare project
3. Click **SQL Editor** (left sidebar)
4. Click **New Query**
5. Copy the entire content from `SETUP_DATABASE.sql` 
6. Click **Run** to execute

✅ **Expected Result:** Table `public.users` created with proper schema and policies

---

### **Step 2: Test Setup**
1. Start your development server: `npm run dev` (in client folder)
2. Go to: `http://localhost:5173/auth-test`
3. Click **"1. Test Table Exists"** - should show ✅ success
4. Click **"2. Create Admin Account"** - creates admin user
5. Click **"3. Test Patient Registration"** - tests registration flow
6. Click **"4. Check All Users"** - shows all registered users

---

### **Step 3: Manual Testing**
1. Go to: `http://localhost:5173/register`
2. Fill out patient registration form
3. Submit registration
4. Go to: `http://localhost:5173/login`
5. Login with your credentials
6. Should redirect to `/patient/dashboard`

---

## 🔍 **Verify Registration Works**

### **Check in Supabase:**
1. **Authentication → Users** - see auth users
2. **Table Editor → users** - see profile data

### **Expected Data Flow:**
```
Registration Form
    ↓
Supabase Auth (auth.users table)
    ↓
Custom Users Table (public.users)
    ↓
Login Success → Role-based redirect
```

---

## 🔑 **Default Admin Credentials**
- **Email:** `admin@getcare.com`
- **Password:** `Admin123!`
- **Role:** `admin`
- **Redirects to:** `/admin/dashboard`

---

## 🛠️ **Troubleshooting**

### **Problem: Table is empty**
- ✅ Make sure you ran the SQL script first
- ✅ Check browser console for errors during registration
- ✅ Verify Supabase project URL and keys are correct

### **Problem: Registration fails**
- ✅ Check Row Level Security policies
- ✅ Verify table schema matches insert data
- ✅ Check Supabase logs for detailed errors

### **Problem: Login doesn't redirect**
- ✅ Check user metadata contains role
- ✅ Verify routing is set up correctly
- ✅ Check browser console for navigation errors

---

## � **Database Schema**

```sql
public.users {
  id: UUID (references auth.users.id)
  email: VARCHAR(255) UNIQUE
  first_name: VARCHAR(100)
  last_name: VARCHAR(100)
  full_name: VARCHAR(200)
  role: VARCHAR(20) ['patient', 'doctor', 'admin']
  phone_number: VARCHAR(20) [optional]
  date_of_birth: DATE [optional]
  profile_image_url: TEXT [optional]
  is_active: BOOLEAN [default: true]
  created_at: TIMESTAMP [auto]
  updated_at: TIMESTAMP [auto]
}
```

---

## 🎯 **Success Indicators**

- ✅ Users table exists in Supabase
- ✅ Registration saves to both auth.users and public.users
- ✅ Login redirects based on user role
- ✅ Admin account works
- ✅ Patient registration works
- ✅ Data visible in Supabase Table Editor

---

**🎉 Once all steps are complete, your authentication system is fully functional!**
