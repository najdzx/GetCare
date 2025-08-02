import React, { useState } from 'react';
import styles from './Patients.module.css';


const Doctors = ({ patient }) => {
  // Determine if current user is primary doctor (not a shared case)
  // For demo, if patient.sharedBy exists, user is NOT primary
  const isPrimaryDoctor = !patient.sharedBy;
  const currentDoctorName = 'You (Dr. Daniel)';

  // Build doctors list with roles
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctors, setDoctors] = useState(() => {
    let docList = [];
    // Primary doctor always first
    docList.push({ name: currentDoctorName, role: 'Primary Doctor' });
    if (patient.sharedBy) {
      docList.push({ name: patient.sharedBy, role: 'Referring Doctor' });
    }
    // Add many dummy doctors for scroll demo
    const dummyDoctors = [
      { name: 'Dr. Jane Doe', role: 'Referring Doctor', specialization: 'Cardiology', email: 'jane.doe@email.com' },
      { name: 'Dr. John Smith', role: 'Referring Doctor', specialization: 'Neurology', email: 'john.smith@email.com' },
      { name: 'Dr. Alice Brown', role: 'Referring Doctor', specialization: 'Pediatrics', email: 'alice.brown@email.com' },
      { name: 'Dr. Bob White', role: 'Referring Doctor', specialization: 'Orthopedics', email: 'bob.white@email.com' },
      { name: 'Dr. Carol Black', role: 'Referring Doctor', specialization: 'Dermatology', email: 'carol.black@email.com' },
      { name: 'Dr. David Green', role: 'Referring Doctor', specialization: 'Oncology', email: 'david.green@email.com' },
      { name: 'Dr. Emily Blue', role: 'Referring Doctor', specialization: 'Psychiatry', email: 'emily.blue@email.com' },
      { name: 'Dr. Frank Red', role: 'Referring Doctor', specialization: 'Radiology', email: 'frank.red@email.com' },
      { name: 'Dr. Grace Yellow', role: 'Referring Doctor', specialization: 'Endocrinology', email: 'grace.yellow@email.com' },
      { name: 'Dr. Henry Purple', role: 'Referring Doctor', specialization: 'Gastroenterology', email: 'henry.purple@email.com' },
      { name: 'Dr. Irene Orange', role: 'Referring Doctor', specialization: 'Pulmonology', email: 'irene.orange@email.com' },
      { name: 'Dr. Jack Pink', role: 'Referring Doctor', specialization: 'Nephrology', email: 'jack.pink@email.com' },
      { name: 'Dr. Kelly Gray', role: 'Referring Doctor', specialization: 'Urology', email: 'kelly.gray@email.com' },
      { name: 'Dr. Liam Cyan', role: 'Referring Doctor', specialization: 'Ophthalmology', email: 'liam.cyan@email.com' },
      { name: 'Dr. Mona Magenta', role: 'Referring Doctor', specialization: 'Rheumatology', email: 'mona.magenta@email.com' },
      { name: 'Dr. Nick Lime', role: 'Referring Doctor', specialization: 'Hematology', email: 'nick.lime@email.com' },
      { name: 'Dr. Olivia Teal', role: 'Referring Doctor', specialization: 'Immunology', email: 'olivia.teal@email.com' },
      { name: 'Dr. Paul Indigo', role: 'Referring Doctor', specialization: 'Pathology', email: 'paul.indigo@email.com' },
      { name: 'Dr. Quinn Violet', role: 'Referring Doctor', specialization: 'Anesthesiology', email: 'quinn.violet@email.com' },
      { name: 'Dr. Rose Gold', role: 'Referring Doctor', specialization: 'Obstetrics', email: 'rose.gold@email.com' },
      { name: 'Dr. Steve Silver', role: 'Referring Doctor', specialization: 'Gynecology', email: 'steve.silver@email.com' },
      { name: 'Dr. Tina Bronze', role: 'Referring Doctor', specialization: 'Surgery', email: 'tina.bronze@email.com' },
      { name: 'Dr. Uma Copper', role: 'Referring Doctor', specialization: 'Plastic Surgery', email: 'uma.copper@email.com' },
      { name: 'Dr. Vince Jade', role: 'Referring Doctor', specialization: 'ENT', email: 'vince.jade@email.com' },
      { name: 'Dr. Wendy Ruby', role: 'Referring Doctor', specialization: 'Dentistry', email: 'wendy.ruby@email.com' },
      { name: 'Dr. Xavier Pearl', role: 'Referring Doctor', specialization: 'Family Medicine', email: 'xavier.pearl@email.com' },
      { name: 'Dr. Yara Sapphire', role: 'Referring Doctor', specialization: 'Internal Medicine', email: 'yara.sapphire@email.com' },
      { name: 'Dr. Zack Amber', role: 'Referring Doctor', specialization: 'Emergency Medicine', email: 'zack.amber@email.com' }
    ];
    docList = docList.concat(dummyDoctors);
    if (patient.doctors && Array.isArray(patient.doctors)) {
      docList = docList.concat(
        patient.doctors.map(name => ({ name, role: 'Referring Doctor' }))
      );
    }
    return docList;
  });

  const [newDoctor, setNewDoctor] = useState('');
  const handleAddDoctor = () => {
    if (
      isPrimaryDoctor &&
      newDoctor.trim() &&
      !doctors.some(d => d.name.toLowerCase() === newDoctor.trim().toLowerCase())
    ) {
      setDoctors(prev => [...prev, { name: newDoctor.trim(), role: 'Referring Doctor' }]);
      setNewDoctor('');
      // Optionally update patient.doctors in parent state here
    }
  };
  const handleRemoveDoctor = (idx) => {
    if (!isPrimaryDoctor) return;
    if (idx === 0) return;
    setDoctors(prev => prev.filter((_, i) => i !== idx));
    // Optionally update patient.doctors in parent state here
  };
  return (
    <div className={styles['doctors-section']}>
      <div className={styles['doctors-header']}>
        <h3 className={styles['doctors-title']}>Doctors</h3>
      </div>
      <div className={styles['doctors-cards-area'] + ' custom-scrollbar'}>
        <ul className={styles['doctors-list']}>
          {doctors.map((doc, idx) => {
            const initials = doc.name
              .replace(/\(.*\)/, '')
              .split(' ')
              .filter(Boolean)
              .map(word => word[0])
              .join('')
              .toUpperCase()
              .slice(0, 2);
            return (
              <li
                key={idx}
                className={styles['doctor-card']}
                onClick={() => setSelectedDoctor(doc)}
                style={{ cursor: 'pointer' }}
              >
                <div className={styles['doctor-avatar']}>{initials}</div>
                <div className={styles['doctor-info']}>
                  <div className={styles['doctor-name']}>{doc.name}</div>
                  <div className={styles['doctor-role']}>{doc.role}</div>
                  {doc.specialization && (
                    <div className={styles['doctor-specialization']}>{doc.specialization}</div>
                  )}
                  {doc.email && (
                    <div className={styles['doctor-email']}>{doc.email}</div>
                  )}
                </div>
                {isPrimaryDoctor && idx !== 0 && (
                  <button
                    className={styles['doctor-remove-btn']}
                    title="Remove doctor"
                    onClick={e => { e.stopPropagation(); handleRemoveDoctor(idx); }}
                  >
                    Remove
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      {/* Doctor Profile Modal */}
      {selectedDoctor && (
        <div className={styles['doctor-modal-overlay']} onClick={() => setSelectedDoctor(null)}>
          <div className={styles['doctor-modal']} onClick={e => e.stopPropagation()}>
            <div className={styles['doctor-modal-header']}>
              <div className={styles['doctor-avatar']} style={{ width: 56, height: 56, fontSize: 24 }}>
                {selectedDoctor.name.replace(/\(.*\)/, '').split(' ').filter(Boolean).map(word => word[0]).join('').toUpperCase().slice(0, 2)}
              </div>
              <div>
                <div className={styles['doctor-name']} style={{ fontSize: 18 }}>{selectedDoctor.name}</div>
                <div className={styles['doctor-role']} style={{ fontSize: 13 }}>{selectedDoctor.role}</div>
              </div>
            </div>
            <div className={styles['doctor-modal-body']}>
              {selectedDoctor.specialization && (
                <div><b>Specialization:</b> {selectedDoctor.specialization}</div>
              )}
              {selectedDoctor.email && (
                <div><b>Email:</b> {selectedDoctor.email}</div>
              )}
              {/* Add more fields as needed */}
            </div>
            <div className={styles['doctor-modal-footer']}>
              <button className="global-btn2" onClick={() => setSelectedDoctor(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
      {/* end doctors-cards-area and modal */}
      {isPrimaryDoctor && (
        <div className={styles['doctors-add-row']}>
          <button
            className="global-btn2"
            onClick={handleAddDoctor}
          >
            Add Doctor
          </button>
        </div>
      )}
      {!isPrimaryDoctor && (
        <div className={styles['doctors-info-msg']}>
          Only the primary doctor can add or remove doctors.
        </div>
      )}
    </div>
  );
};

export default Doctors;
