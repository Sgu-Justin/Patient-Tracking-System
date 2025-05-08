import React, { useState } from 'react';
import './AdmitPatient.css';

const AdmitPatient = ({ patient, onClose, onAdmit }) => {
  const [doctor, setDoctor] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    onAdmit(patient,doctor);
    onClose();
  };

  return (
    <div className="admit-patient-overlay">
      <div className="admit-patient-modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Admit Patient</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Patient Name:</label>
            <div className="patient-info">{patient.name}</div>
          </div>
          
          <div className="form-group">
            <label>Injury Type:</label>
            <div className="patient-info">{patient.injury}</div>
          </div>
          
          <div className="form-group">
            <label>Triage Level:</label>
            <div className="patient-info">{patient.triage}</div>
          </div>
          
          <div className="form-group">
            <label htmlFor="doctor">Doctor's Name:</label>
            <input
              type="text"
              id="doctor"
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
              placeholder="Enter doctor's name"
              required
            />
          </div>
          
          <button type="submit" className="submit-btn">Done</button>
        </form>
      </div>
    </div>
  );
};

export default AdmitPatient;