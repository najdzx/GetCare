-- Supabase SQL schema for GetCare system
-- This script creates all main tables for users, patients, doctors, clinics, appointments, messaging, notifications, and more.

-- USERS
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  middle_name text,
  suffix text,
  nickname text,
  full_name text NOT NULL,
  role text NOT NULL DEFAULT 'PATIENT', -- 'PATIENT', 'DOCTOR', 'ADMIN'
  phone_number text,
  primary_mobile text,
  date_of_birth date,
  age integer,
  sex text, -- 'MALE', 'FEMALE', 'OTHER'
  profile_image_url text,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- PATIENT PROFILES
CREATE TABLE patient_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  first_name text NOT NULL,
  last_name text NOT NULL,
  suffix text,
  nickname text,
  date_of_birth date,
  age integer,
  sex text,
  blood_type text,
  civil_status text, -- 'SINGLE', 'MARRIED', etc.
  philhealth_no text,
  medical_conditions text,
  allergies text,
  surgeries text,
  family_history text,
  medications text,
  supplements text,
  primary_mobile text,
  tag text NOT NULL DEFAULT 'ongoing', -- ongoing, pending, completed
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- DOCTOR PROFILES
CREATE TABLE doctor_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  specialty text NOT NULL,
  experience_years integer,
  license_number text UNIQUE,
  rating float NOT NULL DEFAULT 0.0,
  total_reviews integer NOT NULL DEFAULT 0,
  is_available boolean NOT NULL DEFAULT true,
  consultation_fee float,
  bio text,
  education text,
  certifications text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- CLINICS
CREATE TABLE clinics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text NOT NULL,
  city text,
  state text,
  postal_code text,
  phone text,
  email text,
  operating_hours jsonb,
  facilities text[],
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- APPOINTMENTS
CREATE TABLE appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES patient_profiles(id) ON DELETE CASCADE,
  doctor_id uuid REFERENCES doctor_profiles(id) ON DELETE CASCADE,
  clinic_id uuid REFERENCES clinics(id) ON DELETE SET NULL,
  appointment_date date NOT NULL,
  appointment_time text NOT NULL,
  duration_minutes integer NOT NULL DEFAULT 30,
  type text NOT NULL, -- 'CONSULTATION', 'FOLLOW_UP', etc.
  status text NOT NULL DEFAULT 'PENDING', -- 'PENDING', 'CONFIRMED', etc.
  is_online boolean NOT NULL DEFAULT false,
  meet_link text,
  chief_complaint text,
  notes text,
  admin_notes text,
  cancellation_reason text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- MESSAGING
CREATE TABLE conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES patient_profiles(id) ON DELETE CASCADE,
  doctor_id uuid REFERENCES doctor_profiles(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'ACTIVE', -- 'ACTIVE', 'ARCHIVED', 'BLOCKED'
  last_message_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id uuid REFERENCES users(id) ON DELETE CASCADE,
  message_type text NOT NULL DEFAULT 'TEXT',
  content text,
  file_url text,
  file_name text,
  file_size integer,
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- NOTIFICATIONS
CREATE TABLE notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  type text NOT NULL,
  title text,
  message text,
  data jsonb,
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- ADMIN ACTIVITIES
CREATE TABLE admin_activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id uuid REFERENCES users(id) ON DELETE CASCADE,
  action text NOT NULL,
  entity_type text,
  entity_id uuid,
  description text,
  details jsonb,
  ip_address text,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Add more tables as needed for your system (lab results, notes, etc.)
-- MEDICAL BACKGROUNDS
CREATE TABLE medical_backgrounds (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid UNIQUE REFERENCES patient_profiles(id) ON DELETE CASCADE,
  known_conditions text,
  allergies text,
  previous_surgeries text,
  family_history text,
  current_medications text,
  supplements text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- DOCTOR AVAILABILITY
CREATE TABLE doctor_availability (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id uuid REFERENCES doctor_profiles(id) ON DELETE CASCADE,
  day_of_week integer NOT NULL, -- 0=Sunday, 6=Saturday
  start_time text NOT NULL,
  end_time text NOT NULL,
  clinic_id uuid REFERENCES clinics(id) ON DELETE SET NULL,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- DOCTOR CLINICS
CREATE TABLE doctor_clinics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id uuid REFERENCES doctor_profiles(id) ON DELETE CASCADE,
  clinic_id uuid REFERENCES clinics(id) ON DELETE CASCADE,
  is_primary boolean NOT NULL DEFAULT false,
  available_days text[],
  start_time text,
  end_time text,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (doctor_id, clinic_id)
);

-- PATIENT VISITS
CREATE TABLE patient_visits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES patient_profiles(id) ON DELETE CASCADE,
  doctor_id uuid REFERENCES doctor_profiles(id) ON DELETE CASCADE,
  appointment_id uuid UNIQUE REFERENCES appointments(id) ON DELETE SET NULL,
  visit_date date NOT NULL,
  visit_type text NOT NULL, -- 'SCHEDULED', 'WALK_IN', etc.
  chief_complaint text,
  diagnosis text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- SOAP NOTES
CREATE TABLE soap_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  visit_id uuid REFERENCES patient_visits(id) ON DELETE SET NULL,
  patient_id uuid REFERENCES patient_profiles(id) ON DELETE CASCADE,
  doctor_id uuid REFERENCES doctor_profiles(id) ON DELETE CASCADE,
  date date NOT NULL,
  subjective text,
  chief_complaint text,
  history_of_illness text,
  objective text,
  vital_signs jsonb,
  assessment text,
  diagnosis text,
  plan text,
  prescription text,
  test_request text,
  remarks text,
  remarks_note text,
  remarks_template text,
  follow_up_date date,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- PRESCRIPTIONS
CREATE TABLE prescriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  soap_note_id uuid REFERENCES soap_notes(id) ON DELETE SET NULL,
  patient_id uuid REFERENCES patient_profiles(id) ON DELETE CASCADE,
  doctor_id uuid REFERENCES doctor_profiles(id) ON DELETE CASCADE,
  medication_name text NOT NULL,
  dosage text,
  frequency text,
  duration text,
  quantity text,
  instructions text,
  is_sent_to_patient boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- LAB TEST REQUESTS
CREATE TABLE lab_test_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  soap_note_id uuid REFERENCES soap_notes(id) ON DELETE SET NULL,
  patient_id uuid REFERENCES patient_profiles(id) ON DELETE CASCADE,
  doctor_id uuid REFERENCES doctor_profiles(id) ON DELETE CASCADE,
  test_name text NOT NULL,
  test_type text,
  instructions text,
  urgency text NOT NULL DEFAULT 'ROUTINE',
  status text NOT NULL DEFAULT 'PENDING',
  is_sent_to_patient boolean NOT NULL DEFAULT false,
  requested_date date NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- LAB RESULTS
CREATE TABLE lab_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  test_request_id uuid REFERENCES lab_test_requests(id) ON DELETE CASCADE,
  patient_id uuid REFERENCES patient_profiles(id) ON DELETE CASCADE,
  result_data jsonb,
  result_file_url text,
  result_date date,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- PATIENT NOTES
CREATE TABLE patient_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES patient_profiles(id) ON DELETE CASCADE,
  doctor_id uuid REFERENCES doctor_profiles(id) ON DELETE CASCADE,
  subject text,
  content text NOT NULL,
  note_type text NOT NULL DEFAULT 'general',
  visibility text NOT NULL DEFAULT 'ALL',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- FILE ATTACHMENTS
CREATE TABLE file_attachments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type text NOT NULL, -- 'soap_note', 'message', 'patient_note', etc.
  entity_id uuid NOT NULL,
  file_name text NOT NULL,
  file_url text NOT NULL,
  file_size integer,
  file_type text,
  uploaded_by_id uuid REFERENCES users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- SHARED CASES
CREATE TABLE shared_cases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES patient_profiles(id) ON DELETE CASCADE,
  sharing_doctor_id uuid REFERENCES doctor_profiles(id) ON DELETE CASCADE,
  receiving_doctor_id uuid REFERENCES doctor_profiles(id) ON DELETE CASCADE,
  case_description text,
  shared_data jsonb,
  permissions jsonb,
  status text NOT NULL DEFAULT 'PENDING',
  expires_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
