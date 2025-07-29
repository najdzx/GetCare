import React, { useState } from 'react';
import { Box, Button, TextField, Paper, Avatar, MenuItem, Grid, Divider, Typography, Chip, Fade } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/Badge';
import LanguageIcon from '@mui/icons-material/Language';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import ScheduleIcon from '@mui/icons-material/Schedule';
import './Profile.css';
import '../../../components/Layout/Scrollbar.css';

const initialProfile = {
  id: 'D-0001',
  picture: '', // URL or base64
  firstName: 'John',
  middleName: 'A.',
  lastName: 'Doe',
  sex: 'Male',
  dateOfBirth: '1980-01-01',
  phone: '+63 912 345 6789',
  email: 'dr.johndoe@email.com',
  address: '123 Main St, City',
  licenseNumber: 'PRC-123456',
  specialization: 'General Medicine',
  subSpecialization: 'Cardiology',
  affiliatedHospital: 'City Hospital',
  training: 'Residency at City Hospital',
  bio: 'Passionate about patient care and cardiology.',
  languages: 'English, Filipino',
  yearsOfExperience: '15',
  certifications: 'Board Certified Cardiologist',
  clinicSchedule: 'Mon-Fri 9:00am-5:00pm',
};

const sexOptions = ['Male', 'Female', 'Other'];

const getProfileCompletion = (profile) => {
  const requiredFields = [
    'firstName', 'lastName', 'sex', 'dateOfBirth', 'phone', 'email', 'address',
    'licenseNumber', 'specialization', 'affiliatedHospital', 'training', 'bio', 'languages', 'yearsOfExperience', 'certifications', 'clinicSchedule'
  ];
  const filled = requiredFields.filter(f => profile[f] && String(profile[f]).trim() !== '').length;
  return Math.round((filled / requiredFields.length) * 100);
};

const Profile = () => {
  const [profile, setProfile] = useState(initialProfile);
  const [editProfile, setEditProfile] = useState(profile);
  const [editing, setEditing] = useState(false);
  const [picturePreview, setPicturePreview] = useState(profile.picture);
  const [fadeKey, setFadeKey] = useState(0);
  const handleEdit = () => { setEditing(true); setFadeKey(fadeKey + 1); };
  const handleCancel = () => { setEditing(false); setFadeKey(fadeKey + 1); };
  const handleSave = (e) => { e.preventDefault(); setProfile(editProfile); setEditing(false); setFadeKey(fadeKey + 1); };

  const handleChange = (field) => (e) => {
    setEditProfile({ ...editProfile, [field]: e.target.value });
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPicturePreview(reader.result);
        setEditProfile({ ...editProfile, picture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Profile completion
  const completion = getProfileCompletion(editing ? editProfile : profile);

  // Language chips
  const languageChips = (profile.languages || '').split(',').map(l => l.trim()).filter(Boolean);

  return (
    <Box className="profile-center-wrapper">
      <Paper elevation={3} className="profile-page-card profile-scrollable-card custom-scrollbar">
        <Fade in={true} key={fadeKey} timeout={400}>
          <Box>
            <h2 className="profile-page-title">My Profile</h2>
            <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
              <Avatar
                src={editing ? picturePreview : profile.picture}
                alt="Profile"
                className="profile-avatar"
              />
              {editing && (
                <Button variant="outlined" component="label" size="small" className="profile-upload-btn">
                  Upload Picture
                  <input type="file" accept="image/*" hidden onChange={handlePictureChange} />
                </Button>
              )}
            </Box>
            {editing ? (
              <div className="profile-scrollable-card custom-scrollbar">
                <form onSubmit={handleSave}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Typography className="profile-section-title"><PersonIcon fontSize="small" sx={{mr:1}}/>Personal Information</Typography>
                      <TextField label="ID" fullWidth margin="normal" value={editProfile.id} disabled />
                      <TextField label="First Name" fullWidth margin="normal" value={editProfile.firstName} onChange={handleChange('firstName')} />
                      <TextField label="Middle Name" fullWidth margin="normal" value={editProfile.middleName} onChange={handleChange('middleName')} />
                      <TextField label="Last Name" fullWidth margin="normal" value={editProfile.lastName} onChange={handleChange('lastName')} />
                      <TextField label="Sex" select fullWidth margin="normal" value={editProfile.sex} onChange={handleChange('sex')}>
                        {sexOptions.map((option) => (<MenuItem key={option} value={option}>{option}</MenuItem>))}
                      </TextField>
                      <TextField label="Date of Birth" type="date" fullWidth margin="normal" value={editProfile.dateOfBirth} onChange={handleChange('dateOfBirth')} InputLabelProps={{ shrink: true }} />
                      <TextField label="Phone Number" fullWidth margin="normal" value={editProfile.phone} onChange={handleChange('phone')} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography className="profile-section-title"><EmailIcon fontSize="small" sx={{mr:1}}/>Contact</Typography>
                      <TextField label="Email" fullWidth margin="normal" value={editProfile.email} onChange={handleChange('email')} />
                      <TextField label="Address" fullWidth margin="normal" value={editProfile.address} onChange={handleChange('address')} />
                      <TextField label="Bio/About" fullWidth margin="normal" value={editProfile.bio} onChange={handleChange('bio')} multiline minRows={2} />
                      <TextField label="Languages Spoken" fullWidth margin="normal" value={editProfile.languages} onChange={handleChange('languages')} helperText="Comma separated" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography className="profile-section-title"><BadgeIcon fontSize="small" sx={{mr:1}}/>Professional Details</Typography>
                      <TextField label="License Number" fullWidth margin="normal" value={editProfile.licenseNumber} onChange={handleChange('licenseNumber')} />
                      <TextField label="Specialization" fullWidth margin="normal" value={editProfile.specialization} onChange={handleChange('specialization')} />
                      <TextField label="Sub Specialization" fullWidth margin="normal" value={editProfile.subSpecialization} onChange={handleChange('subSpecialization')} />
                      <TextField label="Years of Experience" fullWidth margin="normal" value={editProfile.yearsOfExperience} onChange={handleChange('yearsOfExperience')} type="number" inputProps={{ min: 0 }} />
                      <TextField label="Affiliated Hospital" fullWidth margin="normal" value={editProfile.affiliatedHospital} onChange={handleChange('affiliatedHospital')} />
                      <TextField label="Training" fullWidth margin="normal" value={editProfile.training} onChange={handleChange('training')} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography className="profile-section-title"><SchoolIcon fontSize="small" sx={{mr:1}}/>Schedule & Certifications</Typography>
                      <TextField label="Certifications" fullWidth margin="normal" value={editProfile.certifications} onChange={handleChange('certifications')} multiline minRows={2} />
                      <TextField label="Clinic Schedule" fullWidth margin="normal" value={editProfile.clinicSchedule} onChange={handleChange('clinicSchedule')} multiline minRows={2} />
                    </Grid>
                  </Grid>
                  <Box className="profile-action-bar">
                    <Button onClick={handleCancel} sx={{ mr: 1 }} className="doctor-primary-btn">Cancel</Button>
                    <Button type="submit" className="doctor-primary-btn">Save</Button>
                  </Box>
                </form>
              </div>
            ) : (
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography className="profile-section-title"><PersonIcon fontSize="small" sx={{mr:1}}/>Personal Information</Typography>
                  <div className="profile-label">ID</div>
                  <div className="profile-value">{profile.id}</div>
                  <div className="profile-label">First Name</div>
                  <div className="profile-value">{profile.firstName}</div>
                  <div className="profile-label">Middle Name</div>
                  <div className="profile-value">{profile.middleName}</div>
                  <div className="profile-label">Last Name</div>
                  <div className="profile-value">{profile.lastName}</div>
                  <div className="profile-label">Sex</div>
                  <div className="profile-value">{profile.sex}</div>
                  <div className="profile-label">Date of Birth</div>
                  <div className="profile-value">{profile.dateOfBirth}</div>
                  <div className="profile-label">Phone Number</div>
                  <div className="profile-value">{profile.phone}</div>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography className="profile-section-title"><EmailIcon fontSize="small" sx={{mr:1}}/>Contact</Typography>
                  <div className="profile-label">Email</div>
                  <div className="profile-value">{profile.email}</div>
                  <div className="profile-label">Address</div>
                  <div className="profile-value">{profile.address}</div>
                  <div className="profile-label">Bio/About</div>
                  <div className="profile-value">{profile.bio}</div>
                  <div className="profile-label"><LanguageIcon fontSize="small" style={{marginRight:4}}/>Languages Spoken</div>
                  <div className="profile-value">
                    {languageChips.length ? languageChips.map((lang, i) => (
                      <Chip key={i} label={lang} size="small" sx={{mr:1, mb:0.5}} />
                    )) : <span style={{color:'#aaa'}}>None</span>}
                  </div>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography className="profile-section-title"><BadgeIcon fontSize="small" sx={{mr:1}}/>Professional Details</Typography>
                  <div className="profile-label">License Number</div>
                  <div className="profile-value">{profile.licenseNumber}</div>
                  <div className="profile-label">Specialization</div>
                  <div className="profile-value">{profile.specialization}</div>
                  <div className="profile-label">Sub Specialization</div>
                  <div className="profile-value">{profile.subSpecialization}</div>
                  <div className="profile-label">Years of Experience</div>
                  <div className="profile-value">{profile.yearsOfExperience}</div>
                  <div className="profile-label">Affiliated Hospital</div>
                  <div className="profile-value">{profile.affiliatedHospital}</div>
                  <div className="profile-label">Training</div>
                  <div className="profile-value">{profile.training}</div>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography className="profile-section-title"><SchoolIcon fontSize="small" sx={{mr:1}}/>Schedule & Certifications</Typography>
                  <div className="profile-label">Certifications</div>
                  <div className="profile-value">{profile.certifications}</div>
                  <div className="profile-label">Clinic Schedule</div>
                  <div className="profile-value">{profile.clinicSchedule}</div>
                </Grid>
                <Grid item xs={12}>
                  <Box className="profile-action-bar">
                    <Button className="doctor-primary-btn" onClick={handleEdit}>Edit</Button>
                  </Box>
                </Grid>
              </Grid>
            )}
          </Box>
        </Fade>
      </Paper>
    </Box>
  );
};

export default Profile; 