import React, { useState } from 'react';
import styles from './DoctorProfile.module.css';
import '../../../components/Layout/Button.css';

const DoctorProfile = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [formData, setFormData] = useState({
    doctorId: '',
    firstName: '',
    middleName: '',
    lastName: '',
    sex: '',
    dateOfBirth: '',
    phoneNumber: '',
    email: '',
    address: '',
    licenseNumber: '',
    specialization: '',
    subSpecialization: '',
    yearsOfExperience: '',
    affiliatedHospital: '',
    training: '',
    certifications: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'yearsOfExperience') {
      // Only allow up to 2 digits and value <= 99
      if (!/^\d{0,2}$/.test(value)) return;
      if (value && parseInt(value, 10) > 99) return;
    }
    setFormData(prev => ({ ...prev, [name]: value }));
  };

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

  const handleSave = (e) => {
    e.preventDefault();
    // Validate phone number (Philippines format: starts with +63 or 09, 11 digits for 09, 13 for +63)
    const phone = formData.phoneNumber.trim();
    const phPhoneRegex = /^(\+63|0)9\d{9}$/;
    if (phone && !phPhoneRegex.test(phone)) {
      alert('Please enter a valid Philippine phone number (e.g., 09171234567 or +639171234567).');
      return;
    }

    // Validate years of experience (must be a number and not negative)
    const years = formData.yearsOfExperience.trim();
    if (years && (!/^\d{1,2}$/.test(years) || parseInt(years, 10) < 0 || parseInt(years, 10) > 99)) {
      alert('Years of experience must be a non-negative number.');
      return;
    }

    setIsEditMode(false);
    alert('Profile updated successfully!');
  };

  const toggleEditMode = () => setIsEditMode(!isEditMode);
  const cancelEdit = () => setIsEditMode(false);

  const doctorName = formData.firstName || formData.lastName 
    ? `Dr. ${formData.firstName} ${formData.middleName} ${formData.lastName}`.replace(/\s+/g, ' ')
    : 'Dr. [Name]';

  return (
    <div className={styles['doctor-profile-container']}>
      <div className={`${styles['doctor-profile-wrapper']} ${isEditMode ? styles['doctor-edit-mode'] : ''}`}>
        {/* Header Section */}
        <div className={styles['doctor-profile-header']}>
          <div className={styles['doctor-profile-pic-container']}>
            <div className={styles['doctor-profile-pic']}>
              {profilePic ? (
                <img 
                  src={profilePic} 
                  alt="Profile" 
                  style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} 
                />
              ) : (
                '👨‍⚕️'
              )}
            </div>
            <div 
              className={styles['doctor-profile-pic-upload']} 
              onClick={() => document.getElementById('doctorProfilePicInput').click()}
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
              </svg>
            </div>
            <input 
              type="file" 
              id="doctorProfilePicInput" 
              className={styles['doctor-profile-pic-input']} 
              accept="image/*" 
              onChange={handleFileChange}
            />
          </div>
          
          <div className={styles['doctor-profile-basic-info']}>
            <h1>{doctorName}</h1>
            <p>{formData.specialization || '[Specialization]'}</p>
            <p>{formData.affiliatedHospital?.split(',')[0] || '[Hospital]'}</p>
            <p>
              {formData.yearsOfExperience 
                ? `${formData.yearsOfExperience} years of experience` 
                : '[Experience]'
              }
            </p>
          </div>

          {!isEditMode && (
            <button className={`global-btn2 ${styles['doctor-profile-edit-btn']}`}
  onClick={toggleEditMode}
>
              Edit Profile
            </button>
          )}
        </div>

        {/* Content Section */}
        <div className={styles['doctor-profile-content']}>
          {/* Personal Information */}
          <div className={styles['doctor-profile-section']}>
            <h2 className={styles['doctor-profile-section-title']}>Personal Information</h2>
            <div className={styles['doctor-profile-fields-grid']}>
              <div className={`${styles['doctor-profile-field']} ${styles['doctor-profile-field-readonly']}`}>
                <label className={styles['doctor-profile-field-label']}>Doctor ID</label>
                <div className={styles['doctor-profile-field-value']}>
                  {formData.doctorId || '[ID]'}
                </div>
              </div>

              {[
                { label: 'First Name', name: 'firstName', type: 'text' },
                { label: 'Middle Name', name: 'middleName', type: 'text' },
                { label: 'Last Name', name: 'lastName', type: 'text' },
                { 
                  label: 'Sex', 
                  name: 'sex', 
                  type: 'select',
                  options: ['', 'Male', 'Female', 'Other']
                },
                { label: 'Date of Birth', name: 'dateOfBirth', type: 'date' },
                { label: 'Phone Number', name: 'phoneNumber', type: 'tel' },
                { label: 'Email', name: 'email', type: 'email' },
                { label: 'Address', name: 'address', type: 'textarea', fullWidth: true }
              ].map((field) => (
                <div 
                  key={field.name} 
                  className={`${styles['doctor-profile-field']} ${field.fullWidth ? styles['doctor-profile-field-full'] : ''}`}
                >
                  <label className={styles['doctor-profile-field-label']}>{field.label}</label>
                  {!isEditMode ? (
                    <div className={styles['doctor-profile-field-value']}>
                      {formData[field.name]}
                    </div>
                  ) : field.type === 'select' ? (
                    <select
                      className={styles['doctor-profile-field-select']}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                    >
                      {field.options.map(option => (
                        <option key={option} value={option}>
                          {option || 'Select...'}
                        </option>
                      ))}
                    </select>
                  ) : field.type === 'textarea' ? (
                    <textarea
                      className={styles['doctor-profile-field-textarea']}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <input
                      type={field.type}
                      className={styles['doctor-profile-field-input']}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Professional Information */}
          <div className={styles['doctor-profile-section']}>
            <h2 className={styles['doctor-profile-section-title']}>Professional Information</h2>
            <div className={styles['doctor-profile-fields-grid']}>
              {[
                { label: 'License Number', name: 'licenseNumber', type: 'text' },
                { label: 'Specialization', name: 'specialization', type: 'text' },
                { label: 'Sub Specialization', name: 'subSpecialization', type: 'text' },
                { label: 'Years of Experience', name: 'yearsOfExperience', type: 'number' },
                { label: 'Affiliated Hospital', name: 'affiliatedHospital', type: 'textarea', fullWidth: true },
                { label: 'Training', name: 'training', type: 'textarea', fullWidth: true },
                { label: 'Certifications', name: 'certifications', type: 'textarea', fullWidth: true }
              ].map((field) => (
                <div 
                  key={field.name} 
                  className={`${styles['doctor-profile-field']} ${field.fullWidth ? styles['doctor-profile-field-full'] : ''}`}
                >
                  <label className={styles['doctor-profile-field-label']}>{field.label}</label>
                  {!isEditMode ? (
                    <div className={styles['doctor-profile-field-value']}>
                      {formData[field.name]}
                    </div>
                  ) : field.type === 'textarea' ? (
                    <textarea
                      className={styles['doctor-profile-field-textarea']}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                    />
                  ) : field.type === 'number' ? (
                    <input
                      type="number"
                      className={styles['doctor-profile-field-input']}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      min="0"
                      max="99"
                      maxLength="2"
                    />
                  ) : (
                    <input
                      type={field.type}
                      className={styles['doctor-profile-field-input']}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {isEditMode && (
          <div className={styles['doctor-profile-actions']}>
            <button 
              className="global-btn" 
              onClick={handleSave}
              type="button"
            >
              Save Changes
            </button>
            <button 
              className="global-btn" 
              onClick={cancelEdit}
              type="button"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorProfile;