-- GetCare Healthcare Management System Database Schema
-- Comprehensive schema based on system analysis

-- =============================================================================
-- AUTHENTICATION & USER MANAGEMENT
-- =============================================================================

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  middle_name VARCHAR(100),
  suffix VARCHAR(20),
  nickname VARCHAR(50),
  full_name VARCHAR(200) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'patient' CHECK (role IN ('patient', 'doctor', 'admin')),
  phone_number VARCHAR(20),
  primary_mobile VARCHAR(20),
  date_of_birth DATE,
  age INTEGER,
  sex VARCHAR(10) CHECK (sex IN ('male', 'female', 'other')),
  profile_image_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================================================
-- PATIENT PROFILES & MEDICAL INFORMATION
-- =============================================================================

-- Patient profiles with medical background
CREATE TABLE public.patient_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE UNIQUE,
  blood_type VARCHAR(5),
  civil_status VARCHAR(20),
  philhealth_no VARCHAR(50),
  emergency_contact_name VARCHAR(200),
  emergency_contact_phone VARCHAR(20),
  emergency_contact_relationship VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Medical background information
CREATE TABLE public.medical_backgrounds (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID REFERENCES public.patient_profiles(id) ON DELETE CASCADE,
  known_conditions TEXT,
  allergies TEXT,
  previous_surgeries TEXT,
  family_history TEXT,
  current_medications TEXT,
  supplements TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================================================
-- DOCTOR PROFILES & CLINICS
-- =============================================================================

-- Doctor profiles
CREATE TABLE public.doctor_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE UNIQUE,
  specialty VARCHAR(100) NOT NULL,
  experience_years INTEGER,
  license_number VARCHAR(100) UNIQUE,
  rating DECIMAL(2,1) DEFAULT 0.0,
  total_reviews INTEGER DEFAULT 0,
  is_available BOOLEAN DEFAULT TRUE,
  consultation_fee DECIMAL(10,2),
  bio TEXT,
  education TEXT,
  certifications TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Clinics
CREATE TABLE public.clinics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  address TEXT NOT NULL,
  city VARCHAR(100),
  state VARCHAR(100),
  postal_code VARCHAR(20),
  phone VARCHAR(20),
  email VARCHAR(255),
  operating_hours JSONB, -- Store hours in JSON format
  facilities TEXT[], -- Array of available facilities
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Doctor-Clinic relationships (many-to-many)
CREATE TABLE public.doctor_clinics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  doctor_id UUID REFERENCES public.doctor_profiles(id) ON DELETE CASCADE,
  clinic_id UUID REFERENCES public.clinics(id) ON DELETE CASCADE,
  is_primary BOOLEAN DEFAULT FALSE,
  available_days TEXT[], -- Array of days like ['monday', 'tuesday']
  start_time TIME,
  end_time TIME,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(doctor_id, clinic_id)
);

-- =============================================================================
-- APPOINTMENTS & SCHEDULING
-- =============================================================================

-- Appointments
CREATE TABLE public.appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID REFERENCES public.patient_profiles(id) ON DELETE CASCADE,
  doctor_id UUID REFERENCES public.doctor_profiles(id) ON DELETE CASCADE,
  clinic_id UUID REFERENCES public.clinics(id),
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  duration_minutes INTEGER DEFAULT 30,
  type VARCHAR(50) NOT NULL CHECK (type IN ('consultation', 'follow-up', 'online-consultation', 'emergency')),
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed', 'no-show')),
  is_online BOOLEAN DEFAULT FALSE,
  meet_link TEXT,
  chief_complaint TEXT,
  notes TEXT,
  admin_notes TEXT,
  cancellation_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Doctor availability
CREATE TABLE public.doctor_availability (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  doctor_id UUID REFERENCES public.doctor_profiles(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6), -- 0=Sunday, 6=Saturday
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  clinic_id UUID REFERENCES public.clinics(id),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================================================
-- MEDICAL RECORDS & SOAP NOTES
-- =============================================================================

-- Patient visits
CREATE TABLE public.patient_visits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID REFERENCES public.patient_profiles(id) ON DELETE CASCADE,
  doctor_id UUID REFERENCES public.doctor_profiles(id) ON DELETE CASCADE,
  appointment_id UUID REFERENCES public.appointments(id),
  visit_date DATE NOT NULL,
  visit_type VARCHAR(50) NOT NULL,
  chief_complaint TEXT,
  diagnosis TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- SOAP Notes
CREATE TABLE public.soap_notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  visit_id UUID REFERENCES public.patient_visits(id) ON DELETE CASCADE,
  patient_id UUID REFERENCES public.patient_profiles(id) ON DELETE CASCADE,
  doctor_id UUID REFERENCES public.doctor_profiles(id) ON DELETE CASCADE,
  
  -- SOAP Components
  subjective TEXT, -- Chief complaint, history of present illness
  chief_complaint TEXT,
  history_of_illness TEXT,
  
  objective TEXT, -- Physical examination, vital signs
  vital_signs JSONB, -- Store vitals in structured format
  
  assessment TEXT, -- Diagnosis, differential diagnosis
  diagnosis TEXT,
  
  plan TEXT, -- Treatment plan, follow-up
  prescription TEXT,
  test_requests TEXT,
  
  -- Additional fields
  remarks TEXT,
  remarks_template VARCHAR(50),
  follow_up_date DATE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================================================
-- PRESCRIPTIONS & MEDICATIONS
-- =============================================================================

-- Prescriptions
CREATE TABLE public.prescriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  soap_note_id UUID REFERENCES public.soap_notes(id) ON DELETE CASCADE,
  patient_id UUID REFERENCES public.patient_profiles(id) ON DELETE CASCADE,
  doctor_id UUID REFERENCES public.doctor_profiles(id) ON DELETE CASCADE,
  medication_name VARCHAR(200) NOT NULL,
  dosage VARCHAR(100),
  frequency VARCHAR(100),
  duration VARCHAR(100),
  quantity VARCHAR(50),
  instructions TEXT,
  is_sent_to_patient BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================================================
-- LAB TESTS & DIAGNOSTICS
-- =============================================================================

-- Lab test requests
CREATE TABLE public.lab_test_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  soap_note_id UUID REFERENCES public.soap_notes(id) ON DELETE CASCADE,
  patient_id UUID REFERENCES public.patient_profiles(id) ON DELETE CASCADE,
  doctor_id UUID REFERENCES public.doctor_profiles(id) ON DELETE CASCADE,
  test_name VARCHAR(200) NOT NULL,
  test_type VARCHAR(100),
  instructions TEXT,
  urgency VARCHAR(20) DEFAULT 'routine' CHECK (urgency IN ('routine', 'urgent', 'stat')),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'cancelled')),
  is_sent_to_patient BOOLEAN DEFAULT FALSE,
  requested_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Lab results
CREATE TABLE public.lab_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  test_request_id UUID REFERENCES public.lab_test_requests(id) ON DELETE CASCADE,
  patient_id UUID REFERENCES public.patient_profiles(id) ON DELETE CASCADE,
  result_data JSONB, -- Store structured lab data
  result_file_url TEXT,
  result_date DATE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================================================
-- MESSAGING & COMMUNICATION
-- =============================================================================

-- Chat conversations
CREATE TABLE public.conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID REFERENCES public.patient_profiles(id) ON DELETE CASCADE,
  doctor_id UUID REFERENCES public.doctor_profiles(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'archived', 'blocked')),
  last_message_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Chat messages
CREATE TABLE public.messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  message_type VARCHAR(20) DEFAULT 'text' CHECK (message_type IN ('text', 'file', 'image', 'prescription', 'lab-request')),
  content TEXT,
  file_url TEXT,
  file_name VARCHAR(255),
  file_size INTEGER,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- System notifications
CREATE TABLE public.notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(200),
  message TEXT,
  data JSONB, -- Additional data for the notification
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================================================
-- NOTES & FILES
-- =============================================================================

-- Patient notes (general notes not tied to visits)
CREATE TABLE public.patient_notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID REFERENCES public.patient_profiles(id) ON DELETE CASCADE,
  doctor_id UUID REFERENCES public.doctor_profiles(id) ON DELETE CASCADE,
  subject VARCHAR(255),
  content TEXT NOT NULL,
  note_type VARCHAR(50) DEFAULT 'general',
  visibility VARCHAR(20) DEFAULT 'all' CHECK (visibility IN ('all', 'patient', 'doctors')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- File attachments
CREATE TABLE public.file_attachments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  entity_type VARCHAR(50) NOT NULL, -- 'soap_note', 'message', 'patient_note', etc.
  entity_id UUID NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  file_url TEXT NOT NULL,
  file_size INTEGER,
  file_type VARCHAR(100),
  uploaded_by UUID REFERENCES public.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================================================
-- SHARED CASES & DOCTOR COLLABORATION
-- =============================================================================

-- Shared patient cases between doctors
CREATE TABLE public.shared_cases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID REFERENCES public.patient_profiles(id) ON DELETE CASCADE,
  sharing_doctor_id UUID REFERENCES public.doctor_profiles(id) ON DELETE CASCADE,
  receiving_doctor_id UUID REFERENCES public.doctor_profiles(id) ON DELETE CASCADE,
  case_description TEXT,
  shared_data JSONB, -- What data is being shared
  permissions JSONB, -- What the receiving doctor can do
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined', 'revoked')),
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================================================
-- ADMIN & AUDIT TRAILS
-- =============================================================================

-- Admin activity logs
CREATE TABLE public.admin_activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50), -- 'appointment', 'user', 'doctor', etc.
  entity_id UUID,
  description TEXT,
  details JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- System audit trail
CREATE TABLE public.audit_trail (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id),
  table_name VARCHAR(100) NOT NULL,
  operation VARCHAR(20) NOT NULL CHECK (operation IN ('INSERT', 'UPDATE', 'DELETE')),
  old_values JSONB,
  new_values JSONB,
  changed_fields TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================================================
-- INDEXES FOR PERFORMANCE
-- =============================================================================

-- User indexes
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_role ON public.users(role);
CREATE INDEX idx_users_active ON public.users(is_active);

-- Patient indexes
CREATE INDEX idx_patient_profiles_user_id ON public.patient_profiles(user_id);

-- Doctor indexes
CREATE INDEX idx_doctor_profiles_user_id ON public.doctor_profiles(user_id);
CREATE INDEX idx_doctor_profiles_specialty ON public.doctor_profiles(specialty);
CREATE INDEX idx_doctor_profiles_available ON public.doctor_profiles(is_available);

-- Appointment indexes
CREATE INDEX idx_appointments_patient_id ON public.appointments(patient_id);
CREATE INDEX idx_appointments_doctor_id ON public.appointments(doctor_id);
CREATE INDEX idx_appointments_date ON public.appointments(appointment_date);
CREATE INDEX idx_appointments_status ON public.appointments(status);
CREATE INDEX idx_appointments_date_time ON public.appointments(appointment_date, appointment_time);

-- SOAP notes indexes
CREATE INDEX idx_soap_notes_patient_id ON public.soap_notes(patient_id);
CREATE INDEX idx_soap_notes_doctor_id ON public.soap_notes(doctor_id);
CREATE INDEX idx_soap_notes_visit_id ON public.soap_notes(visit_id);

-- Message indexes
CREATE INDEX idx_messages_conversation_id ON public.messages(conversation_id);
CREATE INDEX idx_messages_sender_id ON public.messages(sender_id);
CREATE INDEX idx_messages_created_at ON public.messages(created_at);

-- Conversation indexes
CREATE INDEX idx_conversations_patient_id ON public.conversations(patient_id);
CREATE INDEX idx_conversations_doctor_id ON public.conversations(doctor_id);

-- =============================================================================
-- ROW LEVEL SECURITY POLICIES
-- =============================================================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patient_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doctor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.soap_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all users" ON public.users
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
  );

-- Patient profiles policies
CREATE POLICY "Patients can view own profile" ON public.patient_profiles
  FOR SELECT USING (
    user_id = auth.uid() OR
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('doctor', 'admin'))
  );

-- Doctor profiles policies
CREATE POLICY "Anyone can view doctor profiles" ON public.doctor_profiles
  FOR SELECT USING (true);

CREATE POLICY "Doctors can update own profile" ON public.doctor_profiles
  FOR UPDATE USING (user_id = auth.uid());

-- Appointments policies
CREATE POLICY "Users can view own appointments" ON public.appointments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.patient_profiles pp 
      WHERE pp.id = patient_id AND pp.user_id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM public.doctor_profiles dp 
      WHERE dp.id = doctor_id AND dp.user_id = auth.uid()
    ) OR
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
  );

-- =============================================================================
-- FUNCTIONS AND TRIGGERS
-- =============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers to relevant tables
CREATE TRIGGER update_users_updated_at 
  BEFORE UPDATE ON public.users 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_patient_profiles_updated_at 
  BEFORE UPDATE ON public.patient_profiles 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_doctor_profiles_updated_at 
  BEFORE UPDATE ON public.doctor_profiles 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at 
  BEFORE UPDATE ON public.appointments 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to calculate age from date of birth
CREATE OR REPLACE FUNCTION calculate_age(birth_date DATE)
RETURNS INTEGER AS $$
BEGIN
  RETURN EXTRACT(YEAR FROM AGE(birth_date));
END;
$$ LANGUAGE plpgsql;

-- Function to automatically update patient age when date_of_birth changes
CREATE OR REPLACE FUNCTION update_patient_age()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.date_of_birth IS NOT NULL THEN
    NEW.age = calculate_age(NEW.date_of_birth);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_patient_age_trigger
  BEFORE INSERT OR UPDATE OF date_of_birth ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION update_patient_age();

-- =============================================================================
-- INITIAL DATA (OPTIONAL)
-- =============================================================================

-- Insert default admin user (uncomment and modify as needed)
/*
INSERT INTO public.users (id, email, first_name, last_name, full_name, role)
VALUES (
  'uuid-of-admin-user-from-auth-users',
  'admin@getcare.com',
  'Admin',
  'User',
  'Admin User',
  'admin'
);
*/
