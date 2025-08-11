import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../supabaseClient';
import styles from './PatientProfile.module.css';
import '../../components/Layout/toast.css';

const PatientProfile = () => {
  const { user } = useAuth();
  // State for profile picture
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // State for personal information
  const [personalData, setPersonalData] = useState({
    firstName: '',
    lastName: '',
    suffix: '',
    nickName: '',
    dateOfBirth: '',
    age: '',
    sex: '',
    bloodType: '',
    civilStatus: '',
    philHealthNo: '',
    email: '',
    primaryMobile: ''
  });

  // State for medical background
  const [medicalData, setMedicalData] = useState({
    medicalConditions: '',
    allergies: '',
    previousSurgeries: '',
    familyHistory: '',
    currentMedications: '',
    supplements: ''
  });

  // Edit mode states
  const [isPersonalEditMode, setIsPersonalEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Toast notification state
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  // Toast functions
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' });
    }, 3000); // Hide after 3 seconds
  };

  // Generate patient ID from user ID and account creation date
  const generatePatientId = (userId, createdAt) => {
    if (!userId || !createdAt) return 'PXXXXXXXXXXXX';
    const date = new Date(createdAt);
    const MM = String(date.getMonth() + 1).padStart(2, '0');
    const DD = String(date.getDate()).padStart(2, '0');
    const YYYY = date.getFullYear();
    const shortId = userId.substring(0, 8).toUpperCase();
    return `P${MM}${DD}${YYYY}${shortId}`;
  };

  // Get full name for avatar
  const getFullName = () => {
    const firstName = personalData.firstName || '';
    const lastName = personalData.lastName || '';
    return `${firstName} ${lastName}`.trim() || 'Patient';
  };

  // Fetch profile data from database
  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user || isSaving || isPersonalEditMode) return; // Don't refetch while saving or editing

      try {
        console.log('Fetching profile data from database...');
        // Fetch profile data from database
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
          console.error('Error fetching profile:', error);
          setLoading(false);
          return;
        }

        if (profile) {
          console.log('Profile data fetched:', profile);
          // Update personal data
          setPersonalData({
            firstName: profile.first_name || user.user_metadata?.firstName || '',
            lastName: profile.last_name || user.user_metadata?.lastName || '',
            suffix: profile.suffix || '',
            nickName: profile.nickname || user.user_metadata?.nickname || '',
            dateOfBirth: profile.date_of_birth || '',
            age: profile.age ? `${profile.age} years old` : '',
            sex: profile.sex || '',
            bloodType: profile.blood_type || '',
            civilStatus: profile.civil_status || '',
            philHealthNo: profile.philhealth_no || '',
            email: profile.email || user.email || '',
            primaryMobile: profile.primary_mobile || ''
          });

          // Update medical data
          setMedicalData({
            medicalConditions: profile.medical_conditions || '',
            allergies: profile.allergies || '',
            previousSurgeries: profile.surgeries || '',
            familyHistory: profile.family_history || '',
            currentMedications: profile.medications || '',
            supplements: profile.supplements || ''
          });
        } else {
          console.log('No profile found, using auth metadata');
          // If no profile found, use auth metadata as fallback
          setPersonalData(prev => ({
            ...prev,
            firstName: user.user_metadata?.firstName || '',
            lastName: user.user_metadata?.lastName || '',
            email: user.email || '',
            nickName: user.user_metadata?.nickname || ''
          }));
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [user, isSaving, isPersonalEditMode]);

  // Handle photo upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfilePic(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Calculate age based on date of birth
  const calculateAge = (dateString) => {
    if (!dateString) return '';

    const birthDate = new Date(dateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return `${age} years old`;
  };

  // Handle date of birth change
  const handleDateOfBirthChange = (e) => {
    const newDate = e.target.value;
    const age = calculateAge(newDate);
    
    setPersonalData(prev => ({
      ...prev,
      dateOfBirth: newDate,
      age: age
    }));
  };

  // Personal information handlers
  const handlePersonalEditSave = () => {
    if (isPersonalEditMode) {
      // Save both personal and medical data
      saveBothPersonalAndMedical();
    } else {
      togglePersonalEditMode();
    }
  };

  // Combined save function for both personal and medical data
  const saveBothPersonalAndMedical = async () => {
    if (!user || isSaving) return;
    
    console.log('Starting save process...');
    setIsSaving(true);
    
    try {
      // Prepare combined profile data
      const profileData = {
        user_id: user.id,
        // Personal data
        first_name: personalData.firstName,
        last_name: personalData.lastName,
        suffix: personalData.suffix,
        nickname: personalData.nickName,
        date_of_birth: personalData.dateOfBirth,
        age: personalData.age ? parseInt(personalData.age) : null,
        sex: personalData.sex,
        blood_type: personalData.bloodType,
        civil_status: personalData.civilStatus,
        philhealth_no: personalData.philHealthNo,
        email: personalData.email,
        primary_mobile: personalData.primaryMobile,
        // Medical data
        medical_conditions: medicalData.medicalConditions,
        allergies: medicalData.allergies,
        surgeries: medicalData.previousSurgeries,
        family_history: medicalData.familyHistory,
        medications: medicalData.currentMedications,
        supplements: medicalData.supplements,
        updated_at: new Date().toISOString()
      };
      
      console.log('Saving profile data:', profileData);
      
      const { error, data } = await supabase
        .from('profiles')
        .upsert(profileData, { onConflict: 'user_id', ignoreDuplicates: false })
        .select();
        
      if (error) {
        console.error('Database error:', error);
        showToast('Error saving profile information!', 'error');
      } else {
        console.log('Save successful, returned data:', data);
        // Update local states with saved data
        if (data && data[0]) {
          setPersonalData({
            firstName: data[0].first_name || '',
            lastName: data[0].last_name || '',
            suffix: data[0].suffix || '',
            nickName: data[0].nickname || '',
            dateOfBirth: data[0].date_of_birth || '',
            age: data[0].age ? `${data[0].age} years old` : '',
            sex: data[0].sex || '',
            bloodType: data[0].blood_type || '',
            civilStatus: data[0].civil_status || '',
            philHealthNo: data[0].philhealth_no || '',
            email: data[0].email || user.email || '',
            primaryMobile: data[0].primary_mobile || ''
          });

          setMedicalData({
            medicalConditions: data[0].medical_conditions || '',
            allergies: data[0].allergies || '',
            previousSurgeries: data[0].surgeries || '',
            familyHistory: data[0].family_history || '',
            currentMedications: data[0].medications || '',
            supplements: data[0].supplements || ''
          });
        }
        showToast('Profile information saved successfully!', 'success');
        setIsPersonalEditMode(false);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      showToast('Unexpected error saving profile information!', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const togglePersonalEditMode = () => {
    setIsPersonalEditMode(!isPersonalEditMode);
  };

  const cancelPersonalEdit = () => {
    togglePersonalEditMode();
  };

  const savePersonalChanges = async () => {
    if (!user) return;
    try {
      const profileData = {
        user_id: user.id,
        first_name: personalData.firstName,
        last_name: personalData.lastName,
        suffix: personalData.suffix,
        nickname: personalData.nickName,
        date_of_birth: personalData.dateOfBirth,
        age: personalData.age ? parseInt(personalData.age) : null,
        sex: personalData.sex,
        blood_type: personalData.bloodType,
        civil_status: personalData.civilStatus,
        philhealth_no: personalData.philHealthNo,
        email: personalData.email,
        primary_mobile: personalData.primaryMobile,
        updated_at: new Date().toISOString()
      };
      const { error } = await supabase
        .from('profiles')
        .upsert(profileData, { onConflict: 'user_id', ignoreDuplicates: false });
      if (error) {
        showToast('Error saving personal info!', 'error');
        console.error(error);
      } else {
        showToast('Personal information saved successfully!', 'success');
        setIsPersonalEditMode(false);
      }
    } catch (err) {
      showToast('Unexpected error saving personal info!', 'error');
      console.error(err);
    }
  };

  // Handle input changes
  const handlePersonalInputChange = (e) => {
    const { id, value } = e.target;
    setPersonalData(prev => ({ ...prev, [id]: value }));
  };

  const handleMedicalInputChange = (e) => {
    const { id, value } = e.target;
    setMedicalData(prev => ({ ...prev, [id]: value }));
  };

  // Show loading state
  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <div style={{ textAlign: 'center', padding: '50px' }}>
              <p>Loading profile...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          {/* Profile Form */}
          <div className={styles.profileForm}>
            {/* Personal Information */}
            <div className={styles.formSection}>
              <div className={styles.sectionContent}>
                {/* View Mode */}
                <div 
                  id="personalViewMode" 
                  className={styles.personalView} 
                  style={{ display: isPersonalEditMode ? 'none' : 'block' }}
                >
                  <div className={styles.avatarSection}>
                    <div className={styles.avatarLeft}>
                      <div className={styles.doctorProfilePicContainer}>
                        <div className={styles.doctorProfilePic}>
                          {profilePic ? (
                            <img
                              src={profilePic}
                              alt="Profile"
                              style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                            />
                          ) : (
                            '👤'
                          )}
                        </div>
                      </div>
                      <div className={styles.avatarInfo}>
                        <div className={styles.avatarName}>{getFullName()}</div>
                        <div className={styles.avatarId}>Patient ID: {generatePatientId(user?.id, user?.created_at)}</div>
                      </div>
                    </div>
                    <div className={styles.avatarRight}>
                      <button 
                        id="personalEditSaveBtn" 
                        className="global-btn2" 
                        onClick={handlePersonalEditSave}
                        disabled={isSaving}
                      >
                        <span id="personalEditModeText">{isSaving ? 'Saving...' : 'Edit'}</span>
                        <svg id="personalEditIcon" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708L10.5 8.207l-3-3L12.146.146zM11.207 9.5L7 13.707V10.5a.5.5 0 0 1 .5-.5h3.707zM1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                        </svg>
                      </button>
                    </div>
                  </div>

                  <h3 className={styles.inlineSectionTitle}>Personal Information</h3>
                  <div className={styles.viewGrid}>
                    <div className={styles.viewGroup}>
                      <label className={styles.formLabel}>First Name</label>
                      <div className={styles.viewField}>{personalData.firstName}</div>
                    </div>
                    <div className={styles.viewGroup}>
                      <label className={styles.formLabel}>Last Name</label>
                      <div className={styles.viewField}>{personalData.lastName}</div>
                    </div>
                    <div className={styles.viewGroup}>
                      <label className={styles.formLabel}>Suffix</label>
                      <div className={styles.viewField}>{personalData.suffix}</div>
                    </div>
                    <div className={styles.viewGroup}>
                      <label className={styles.formLabel}>Nickname</label>
                      <div className={styles.viewField}>{personalData.nickName}</div>
                    </div>
                    <div className={styles.viewGroup}>
                      <label className={styles.formLabel}>Date of Birth</label>
                      <div className={styles.viewField}>{new Date(personalData.dateOfBirth).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                    </div>
                    <div className={styles.viewGroup}>
                      <label className={styles.formLabel}>Age</label>
                      <div className={styles.viewField}>{personalData.age}</div>
                    </div>
                    <div className={styles.viewGroup}>
                      <label className={styles.formLabel}>Sex</label>
                      <div className={styles.viewField}>{personalData.sex}</div>
                    </div>
                    <div className={styles.viewGroup}>
                      <label className={styles.formLabel}>Blood Type</label>
                      <div className={styles.viewField}>{personalData.bloodType}</div>
                    </div>
                    <div className={styles.viewGroup}>
                      <label className={styles.formLabel}>Civil Status</label>
                      <div className={styles.viewField}>{personalData.civilStatus}</div>
                    </div>
                    
                    <div className={styles.viewGroup}>
                      <label className={styles.formLabel}>PhilHealth No.</label>
                      <div className={styles.viewField}>{personalData.philHealthNo}</div>
                    </div>
                    <div className={styles.viewGroup}>
                      <label className={styles.formLabel}>Email Address</label>
                      <div className={styles.viewField}>{personalData.email}</div>
                    </div>
                    <div className={styles.viewGroup}>
                      <label className={styles.formLabel}>Primary Mobile</label>
                      <div className={styles.viewField}>{personalData.primaryMobile}</div>
                    </div>
                  </div>
                </div>

                {/* Edit Mode */}
                <div 
                  id="personalEditMode" 
                  className={styles.personalEdit} 
                  style={{ display: isPersonalEditMode ? 'block' : 'none' }}
                >
                  <div className={styles.avatarSection}>
                    <div className={styles.avatarLeft}>
                      <div className={styles.doctorProfilePicContainer}>
                        <div className={styles.doctorProfilePic}>
                          {profilePic ? (
                            <img
                              src={profilePic}
                              alt="Profile"
                              style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                            />
                          ) : (
                            '👤'
                          )}
                        </div>
                        <div
                          className={styles.doctorProfilePicUpload}
                          onClick={() => document.getElementById('patientProfilePicInput').click()}
                        >
                          <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                          </svg>
                        </div>
                        <input
                          type="file"
                          id="patientProfilePicInput"
                          className={styles.doctorProfilePicInput}
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                      </div>
                      <div className={styles.avatarInfo}>
                        <div className={styles.avatarName}>{getFullName()}</div>
                        <div className={styles.avatarId}>Patient ID: {generatePatientId(user?.id, user?.created_at)}</div>
                      </div>
                    </div>
                    <div className={styles.avatarRight}>
                      <div className={styles.formActions}>
                        <button 
                          id="personalCancelBtn" 
                          className="global-btn2" 
                          onClick={cancelPersonalEdit}
                        >
                          <span>Cancel</span>
                          <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                          </svg>
                        </button>
                        <button 
                          id="personalEditSaveBtn" 
                          className="global-btn2" 
                          onClick={saveBothPersonalAndMedical}
                          disabled={isSaving}
                        >
                          <span id="personalEditModeText">{isSaving ? 'Saving...' : 'Save'}</span>
                          <svg id="personalSaveIcon" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  <h3 className={styles.inlineSectionTitle}>Personal Information</h3>
                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel} htmlFor="firstName">First Name</label>
                      <input 
                        type="text" 
                        id="firstName" 
                        className={styles.formInput} 
                        value={personalData.firstName} 
                        onChange={handlePersonalInputChange}
                        placeholder="Enter first name" 
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel} htmlFor="lastName">Last Name</label>
                      <input 
                        type="text" 
                        id="lastName" 
                        className={styles.formInput} 
                        value={personalData.lastName} 
                        onChange={handlePersonalInputChange}
                        placeholder="Enter last name" 
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel} htmlFor="suffix">Suffix</label>
                      <select 
                        id="suffix" 
                        className={styles.formSelect}
                        value={personalData.suffix}
                        onChange={handlePersonalInputChange}
                      >
                        <option value="">Select suffix</option>
                        <option value="Jr.">Jr.</option>
                        <option value="Sr.">Sr.</option>
                        <option value="II">II</option>
                        <option value="III">III</option>
                        <option value="IV">IV</option>
                      </select>
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel} htmlFor="nickName">Nick Name</label>
                      <input 
                        type="text" 
                        id="nickName" 
                        className={styles.formInput} 
                        value={personalData.nickName} 
                        onChange={handlePersonalInputChange}
                        placeholder="Enter nickname" 
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel} htmlFor="dateOfBirth">Date of Birth</label>
                      <input 
                        type="date" 
                        id="dateOfBirth" 
                        className={styles.formInput} 
                        value={personalData.dateOfBirth} 
                        onChange={handleDateOfBirthChange}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel} htmlFor="age">Age</label>
                      <input 
                        type="text" 
                        id="age" 
                        className={styles.formInput} 
                        value={personalData.age} 
                        readOnly 
                        style={{ background: 'transparent', color: '#666' }} 
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel} htmlFor="sex">Sex</label>
                      <select 
                        id="sex" 
                        className={styles.formSelect}
                        value={personalData.sex}
                        onChange={handlePersonalInputChange}
                      >
                        <option value="">Select sex</option>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel} htmlFor="bloodType">Blood Type</label>
                      <select 
                        id="bloodType" 
                        className={styles.formSelect}
                        value={personalData.bloodType}
                        onChange={handlePersonalInputChange}
                      >
                        <option value="">Select blood type</option>
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
                      <label className={styles.formLabel} htmlFor="civilStatus">Civil Status</label>
                      <select 
                        id="civilStatus" 
                        className={styles.formSelect}
                        value={personalData.civilStatus}
                        onChange={handlePersonalInputChange}
                      >
                        <option value="">Select civil status</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Divorced">Divorced</option>
                        <option value="Widowed">Widowed</option>
                        <option value="Separated">Separated</option>
                      </select>
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel} htmlFor="philHealthNo">PhilHealth No.</label>
                      <input 
                        type="text" 
                        id="philHealthNo" 
                        className={styles.formInput} 
                        value={personalData.philHealthNo} 
                        onChange={handlePersonalInputChange}
                        placeholder="Enter PhilHealth number" 
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel} htmlFor="email">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        className={styles.formInput} 
                        value={personalData.email} 
                        onChange={handlePersonalInputChange}
                        placeholder="Enter email address" 
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel} htmlFor="primaryMobile">Primary Mobile</label>
                      <input 
                        type="tel" 
                        id="primaryMobile" 
                        className={styles.formInput} 
                        value={personalData.primaryMobile} 
                        onChange={handlePersonalInputChange}
                        placeholder="Enter mobile number" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Medical Background */}
            <div className={styles.formSection}>
              <div className={styles.sectionContent}>
                {/* View Mode */}
                <div 
                  id="medicalViewMode" 
                  className={styles.medicalView} 
                  style={{ display: isPersonalEditMode ? 'none' : 'block' }}
                >
                  <h3 className={styles.inlineSectionTitle}>Medical Background</h3>
                  <div className={styles.viewGrid}>
                    <div className={`${styles.viewGroup} ${styles.fullWidth}`}>
                      <label className={styles.formLabel}>Known Medical Conditions</label>
                      <div className={styles.viewField}>
                        {medicalData.medicalConditions.split('\n').map((condition, index) => (
                          <div key={index}>{condition}</div>
                        ))}
                      </div>
                    </div>
                    <div className={`${styles.viewGroup} ${styles.fullWidth}`}>
                      <label className={styles.formLabel}>Allergies</label>
                      <div className={styles.viewField}>
                        {medicalData.allergies.split('\n').map((allergy, index) => (
                          <div key={index}>{allergy}</div>
                        ))}
                      </div>
                    </div>
                    <div className={`${styles.viewGroup} ${styles.fullWidth}`}>
                      <label className={styles.formLabel}>Previous Surgeries</label>
                      <div className={styles.viewField}>
                        {medicalData.previousSurgeries.split('\n').map((surgery, index) => (
                          <div key={index}>{surgery}</div>
                        ))}
                      </div>
                    </div>
                    <div className={`${styles.viewGroup} ${styles.fullWidth}`}>
                      <label className={styles.formLabel}>Family History</label>
                      <div className={styles.viewField}>
                        {medicalData.familyHistory.split('\n').map((history, index) => (
                          <div key={index}>{history}</div>
                        ))}
                      </div>
                    </div>
                    <div className={`${styles.viewGroup} ${styles.fullWidth}`}>
                      <label className={styles.formLabel}>Current Medications</label>
                      <div className={styles.viewField}>
                        {medicalData.currentMedications.split('\n').map((med, index) => (
                          <div key={index}>{med}</div>
                        ))}
                      </div>
                    </div>
                    <div className={`${styles.viewGroup} ${styles.fullWidth}`}>
                      <label className={styles.formLabel}>Supplements</label>
                      <div className={styles.viewField}>
                        {medicalData.supplements.split('\n').map((supplement, index) => (
                          <div key={index}>{supplement}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Edit Mode */}
                <div 
                  id="medicalEditMode" 
                  className={styles.medicalEdit} 
                  style={{ display: isPersonalEditMode ? 'block' : 'none' }}
                >
                  <h3 className={styles.inlineSectionTitle}>Medical Background</h3>
                  <div className={styles.formGrid}>
                    <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                      <label className={styles.formLabel} htmlFor="medicalConditions">Known Medical Conditions</label>
                      <textarea 
                        id="medicalConditions" 
                        className={styles.formTextarea} 
                        rows="3" 
                        value={medicalData.medicalConditions}
                        onChange={handleMedicalInputChange}
                        placeholder="Enter known medical conditions (one per line)" 
                      />
                    </div>
                    <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                      <label className={styles.formLabel} htmlFor="allergies">Allergies</label>
                      <textarea 
                        id="allergies" 
                        className={styles.formTextarea} 
                        rows="3" 
                        value={medicalData.allergies}
                        onChange={handleMedicalInputChange}
                        placeholder="Enter allergies (one per line)" 
                      />
                    </div>
                    <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                      <label className={styles.formLabel} htmlFor="previousSurgeries">Previous Surgeries</label>
                      <textarea 
                        id="previousSurgeries" 
                        className={styles.formTextarea} 
                        rows="3" 
                        value={medicalData.previousSurgeries}
                        onChange={handleMedicalInputChange}
                        placeholder="Enter previous surgeries with dates" 
                      />
                    </div>
                    <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                      <label className={styles.formLabel} htmlFor="familyHistory">Family History</label>
                      <textarea 
                        id="familyHistory" 
                        className={styles.formTextarea} 
                        rows="4" 
                        value={medicalData.familyHistory}
                        onChange={handleMedicalInputChange}
                        placeholder="Enter family medical history" 
                      />
                    </div>
                    <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                      <label className={styles.formLabel} htmlFor="currentMedications">Current Medications</label>
                      <textarea 
                        id="currentMedications" 
                        className={styles.formTextarea} 
                        rows="4" 
                        value={medicalData.currentMedications}
                        onChange={handleMedicalInputChange}
                        placeholder="Enter current medications with dosage and frequency" 
                      />
                    </div>
                    <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                      <label className={styles.formLabel} htmlFor="supplements">Supplements</label>
                      <textarea 
                        id="supplements" 
                        className={styles.formTextarea} 
                        rows="3" 
                        value={medicalData.supplements}
                        onChange={handleMedicalInputChange}
                        placeholder="Enter supplements with dosage and frequency" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Toast Notification */}
      {toast.show && (
        <div className={`toast show ${toast.type}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default PatientProfile;