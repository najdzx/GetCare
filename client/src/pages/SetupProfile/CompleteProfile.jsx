import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../supabaseClient';
import styles from './CompleteProfile.module.css';

const CompleteProfile = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    suffix: 'N/A',
    nickname: '',
    dateOfBirth: '',
    age: '',
    sex: '',
    bloodType: 'N/A',
    civilStatus: 'N/A',
    philhealthNo: '',
    email: '',
    primaryMobile: '',
    medicalConditions: '',
    allergies: '',
    surgeries: '',
    familyHistory: '',
    medications: '',
    supplements: ''
  });
  const [showModal, setShowModal] = useState(false);

  // Populate form with existing user data
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        firstName: user.user_metadata?.firstName || user.user_metadata?.first_name || '',
        lastName: user.user_metadata?.lastName || user.user_metadata?.last_name || '',
        email: user.email || '',
        // Also populate any other existing metadata
        nickname: user.user_metadata?.nickname || '',
        sex: user.user_metadata?.sex || '',
        bloodType: user.user_metadata?.bloodType || 'N/A',
        civilStatus: user.user_metadata?.civilStatus || 'N/A',
        philhealthNo: user.user_metadata?.philhealthNo || '',
        primaryMobile: user.user_metadata?.primaryMobile || '',
        dateOfBirth: user.user_metadata?.dateOfBirth || '',
        age: user.user_metadata?.age || '',
        suffix: user.user_metadata?.suffix || 'N/A',
        medicalConditions: user.user_metadata?.medicalConditions || '',
        allergies: user.user_metadata?.allergies || '',
        surgeries: user.user_metadata?.surgeries || '',
        familyHistory: user.user_metadata?.familyHistory || '',
        medications: user.user_metadata?.medications || '',
        supplements: user.user_metadata?.supplements || ''
      }));
    }
  }, [user]);

  // Populate form with existing user data
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        firstName: user.user_metadata?.firstName || user.user_metadata?.first_name || '',
        lastName: user.user_metadata?.lastName || user.user_metadata?.last_name || '',
        email: user.email || '',
        // Also populate any other existing metadata
        nickname: user.user_metadata?.nickname || '',
        sex: user.user_metadata?.sex || '',
        bloodType: user.user_metadata?.bloodType || 'N/A',
        civilStatus: user.user_metadata?.civilStatus || 'N/A',
        philhealthNo: user.user_metadata?.philhealthNo || '',
        primaryMobile: user.user_metadata?.primaryMobile || '',
        dateOfBirth: user.user_metadata?.dateOfBirth || '',
        age: user.user_metadata?.age || '',
        suffix: user.user_metadata?.suffix || 'N/A',
        medicalConditions: user.user_metadata?.medicalConditions || '',
        allergies: user.user_metadata?.allergies || '',
        surgeries: user.user_metadata?.surgeries || '',
        familyHistory: user.user_metadata?.familyHistory || '',
        medications: user.user_metadata?.medications || '',
        supplements: user.user_metadata?.supplements || ''
      }));
    }
  }, [user]);

  // Calculate age when date of birth changes
  useEffect(() => {
    if (formData.dateOfBirth) {
      const dob = new Date(formData.dateOfBirth);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
      }
      
      setFormData(prev => ({
        ...prev,
        age: age >= 0 ? age.toString() : ''
      }));
    }
  }, [formData.dateOfBirth]);

  // Format PhilHealth number input
  const formatPhilhealthNo = (value) => {
    let formatted = value.replace(/\D/g, '');
    if (formatted.length >= 2) {
      formatted = formatted.substring(0, 2) + '-' + formatted.substring(2);
    }
    if (formatted.length >= 12) {
      formatted = formatted.substring(0, 12) + '-' + formatted.substring(12, 13);
    }
    return formatted;
  };

  // Format mobile number input
  const formatMobileNo = (value) => {
    let formatted = value.replace(/\D/g, '');
    if (formatted.startsWith('63')) {
      formatted = '+' + formatted;
    } else if (formatted.startsWith('9') && formatted.length === 10) {
      formatted = '+63' + formatted;
    }
    return formatted;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'philhealthNo') {
      setFormData(prev => ({
        ...prev,
        [name]: formatPhilhealthNo(value)
      }));
    } else if (name === 'primaryMobile') {
      setFormData(prev => ({
        ...prev,
        [name]: formatMobileNo(value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const nextStep = () => {
    if (currentStep === 1) {
      if (validatePersonalInfo()) {
        setCurrentStep(2);
      }
    } else if (currentStep === 2) {
      submitProfile();
    }
  };

  const previousStep = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    }
  };

  const validatePersonalInfo = () => {
    const requiredFields = ['firstName', 'lastName', 'dateOfBirth', 'sex', 'civilStatus', 'email', 'primaryMobile'];
    let isValid = true;
    
    for (const field of requiredFields) {
      if (!formData[field]) {
        isValid = false;
        break;
      }
    }
    
    if (!isValid) {
      alert('Please fill in all required fields marked with *');
    }
    
    return isValid;
  };

  const submitProfile = async () => {
    console.log('Form data submitted:', formData);
    
    try {
      // 1. Update user metadata to mark profile as completed
      const { error: authError } = await supabase.auth.updateUser({
        data: { 
          profile_completed: true,
          firstName: formData.firstName,
          lastName: formData.lastName,
          nickname: formData.nickname,
          sex: formData.sex,
          primaryMobile: formData.primaryMobile
        }
      });
      
      if (authError) {
        console.error('Error updating user auth metadata:', authError);
        alert('Error updating profile. Please try again.');
        return;
      }

      // 2. Save detailed profile data to profiles table
      const profileData = {
        user_id: user.id,
        first_name: formData.firstName,
        last_name: formData.lastName,
        suffix: formData.suffix !== 'N/A' ? formData.suffix : null,
        nickname: formData.nickname,
        date_of_birth: formData.dateOfBirth,
        age: parseInt(formData.age) || null,
        sex: formData.sex,
        blood_type: formData.bloodType !== 'N/A' ? formData.bloodType : null,
        civil_status: formData.civilStatus !== 'N/A' ? formData.civilStatus : null,
        philhealth_no: formData.philhealthNo,
        email: formData.email,
        primary_mobile: formData.primaryMobile,
        medical_conditions: formData.medicalConditions,
        allergies: formData.allergies,
        surgeries: formData.surgeries,
        family_history: formData.familyHistory,
        medications: formData.medications,
        supplements: formData.supplements,
        updated_at: new Date().toISOString()
      };

      // Use upsert to insert or update the profile
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert(profileData, { 
          onConflict: 'user_id',
          ignoreDuplicates: false 
        });
      
      if (profileError) {
        console.error('Error saving profile to database:', profileError);
        alert('Profile metadata updated, but detailed profile could not be saved. Please try again.');
        return;
      }

      console.log('Profile successfully saved to database');
      setShowModal(true);
      
    } catch (error) {
      console.error('Error submitting profile:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  const goToDashboard = () => {
    navigate('/patient/dashboard');
    setShowModal(false);
  }

  const handleSkip = async () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else {
      // Mark profile as completed even when skipping and save basic info
      try {
        // Update auth metadata
        await supabase.auth.updateUser({
          data: { 
            profile_completed: true,
            firstName: formData.firstName,
            lastName: formData.lastName,
            primaryMobile: formData.primaryMobile
          }
        });

        // Save basic profile data to database even when skipping
        if (formData.firstName || formData.lastName || formData.email) {
          const basicProfileData = {
            user_id: user.id,
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            primary_mobile: formData.primaryMobile,
            updated_at: new Date().toISOString()
          };

          await supabase
            .from('profiles')
            .upsert(basicProfileData, { 
              onConflict: 'user_id',
              ignoreDuplicates: false 
            });
        }

        goToDashboard();
      } catch (error) {
        console.error('Error updating user profile:', error);
        goToDashboard(); // Still redirect even if update fails
      }
    }
  }

  const progressFillStyle = {
    width: currentStep === 1 ? '50%' : '100%'
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.welcomeSection}>
            <h1>Welcome! Let's Complete Your Profile</h1>
            <p>Please fill out your information to help us provide better healthcare services</p>
          </div>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={progressFillStyle}></div>
          </div>
          <div className={styles.progressText}>
            <span>
              {currentStep === 1 ? 'Step 1 of 2 - Personal Information' : 'Step 2 of 2 - Medical Background'}
            </span>
          </div>
        </div>

        {/* Main Content */}
        <main className={styles.mainContent}>
          <div className={styles.formContainer}>
            {/* Step 1: Personal Information */}
            <div className={`${styles.stepContent} ${currentStep === 1 ? styles.active : ''}`} id="step1">
              <div className={styles.sectionHeader}>
                <h2>Personal Information</h2>
                <p>Tell us about yourself</p>
              </div>

              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label htmlFor="firstName">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="lastName">Last Name *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="suffix">Suffix</label>
                  <select
                    id="suffix"
                    name="suffix"
                    value={formData.suffix}
                    onChange={handleChange}
                  >
                    <option value="N/A">N/A</option>
                    <option value="Jr.">Jr.</option>
                    <option value="Sr.">Sr.</option>
                    <option value="II">II</option>
                    <option value="III">III</option>
                    <option value="IV">IV</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="nickname">Nickname</label>
                  <input
                    type="text"
                    id="nickname"
                    name="nickname"
                    value={formData.nickname}
                    onChange={handleChange}
                    placeholder="What should we call you?"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="dateOfBirth">Date of Birth *</label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="age">Age</label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    readOnly
                    placeholder=""
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="sex">Sex *</label>
                  <select
                    id="sex"
                    name="sex"
                    value={formData.sex}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select sex</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="bloodType">Blood Type</label>
                  <select
                    id="bloodType"
                    name="bloodType"
                    value={formData.bloodType}
                    onChange={handleChange}
                  >
                    <option value="N/A">N/A</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="civilStatus">Civil Status *</label>
                  <select
                    id="civilStatus"
                    name="civilStatus"
                    value={formData.civilStatus}
                    onChange={handleChange}
                    required
                  >
                    <option value="N/A">N/A</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                    <option value="Separated">Separated</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="philhealthNo">PhilHealth Number</label>
                  <input
                    type="text"
                    id="philhealthNo"
                    name="philhealthNo"
                    value={formData.philhealthNo}
                    onChange={handleChange}
                    placeholder="XX-XXXXXXXXX-X"
                    maxLength="14"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    readOnly
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="primaryMobile">Primary Mobile Number *</label>
                  <input
                    type="tel"
                    id="primaryMobile"
                    name="primaryMobile"
                    value={formData.primaryMobile}
                    onChange={handleChange}
                    required
                    placeholder="+63 XXX XXX XXXX"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Medical Background */}
            <div className={`${styles.stepContent} ${currentStep === 2 ? styles.active : ''}`} id="step2">
              <div className={styles.sectionHeader}>
                <h2>Medical Background</h2>
                <p>Help us understand your medical history</p>
              </div>

              <div className={styles.medicalSection}>
                <h3>Known Medical Conditions</h3>
                <p className={styles.sectionDescription}>
                  Please list any medical conditions you currently have or have been diagnosed with
                </p>
                <textarea
                  id="medicalConditions"
                  name="medicalConditions"
                  value={formData.medicalConditions}
                  onChange={handleChange}
                  rows="4"
                  placeholder="List any medical conditions (e.g., Diabetes, Hypertension, Heart Disease, Asthma, etc.)"
                ></textarea>
              </div>

              <div className={styles.medicalSection}>
                <h3>Allergies</h3>
                <p className={styles.sectionDescription}>
                  List any known allergies (medications, food, environmental, etc.)
                </p>
                <textarea
                  id="allergies"
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  rows="4"
                  placeholder="List any allergies and their reactions (e.g., Penicillin - rash, Shellfish - swelling, etc.)"
                ></textarea>
              </div>

              <div className={styles.medicalSection}>
                <h3>Previous Surgeries</h3>
                <p className={styles.sectionDescription}>
                  List any surgeries or major medical procedures you've had
                </p>
                <textarea
                  id="surgeries"
                  name="surgeries"
                  value={formData.surgeries}
                  onChange={handleChange}
                  rows="4"
                  placeholder="List surgeries with dates and locations (e.g., Appendectomy - 2020, St. Mary's Hospital)"
                ></textarea>
              </div>

              <div className={styles.medicalSection}>
                <h3>Family History</h3>
                <p className={styles.sectionDescription}>
                  Medical conditions that run in your family
                </p>
                <textarea
                  id="familyHistory"
                  name="familyHistory"
                  value={formData.familyHistory}
                  onChange={handleChange}
                  rows="4"
                  placeholder="List family medical history (e.g., Mother - diabetes, Father - heart disease, etc.)"
                ></textarea>
              </div>

              <div className={styles.medicalSection}>
                <h3>Current Medications</h3>
                <p className={styles.sectionDescription}>
                  List all medications you are currently taking
                </p>
                <textarea
                  id="medications"
                  name="medications"
                  value={formData.medications}
                  onChange={handleChange}
                  rows="4"
                  placeholder="List current medications with dosage and frequency (e.g., Metformin 500mg twice daily, Lisinopril 10mg once daily)"
                ></textarea>
              </div>

              <div className={styles.medicalSection}>
                <h3>Supplements</h3>
                <p className={styles.sectionDescription}>
                  List any vitamins, supplements, or herbal remedies you take
                </p>
                <textarea
                  id="supplements"
                  name="supplements"
                  value={formData.supplements}
                  onChange={handleChange}
                  rows="4"
                  placeholder="List supplements and vitamins (e.g., Vitamin D 1000IU daily, Omega-3 fish oil twice daily)"
                ></textarea>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className={styles.formNavigation}>
              {currentStep === 2 && (
                <button type="button" className={styles.btnSecondary} onClick={previousStep}>
                  Previous
                </button>
              )}
              <button
                type="button"
                className={styles.btnPrimary}
                onClick={nextStep}
                style={{ marginRight: '8px' }}
              >
                {currentStep === 1 ? 'Next' : 'Complete Profile'}
              </button>
              <button
                type="button"
                className={styles.btnSecondary}
                onClick={handleSkip}
              >
                Skip
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className={styles.modal} onClick={() => setShowModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div className={styles.successIcon}>
                <svg width="48" height="48" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.061L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                </svg>
              </div>
              <h2>Profile Complete!</h2>
              <p>Your profile has been successfully created. You can now access all hospital services.</p>
            </div>
            <div className={styles.modalActions}>
              <button className={styles.btnPrimary} onClick={goToDashboard}>
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompleteProfile;