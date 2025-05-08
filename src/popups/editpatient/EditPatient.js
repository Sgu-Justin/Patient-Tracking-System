import React, { useState } from 'react';
import './EditPatient.css';

const EditPatient = ({ patient, onClose, onSave }) => {
  const [triage, setTriage] = useState(patient.triage.toString());

  const triageLevels = [
    { value: '1', label: '1 - Immediate' },
    { value: '2', label: '2 - Emergency' },
    { value: '3', label: '3 - Urgent' },
    { value: '4', label: '4 - Semi-urgent' },
    { value: '5', label: '5 - Non-urgent' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...patient,
      triage: parseInt(triage)
    });
    onClose();
  };

  return (
    <div className="edit-patient-overlay">
      <div className="edit-patient-modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Edit Triage Level</h2>
        
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
            <label htmlFor="triage">Triage Level:</label>
            <select
              id="triage"
              value={triage}
              onChange={(e) => setTriage(e.target.value)}
              className="triage-select"
            >
              {triageLevels.map(level => (
                <option key={level.value} value={level.value}>{level.label}</option>
              ))}
            </select>
          </div>
          
          <button type="submit" className="submit-btn">Done</button>
        </form>
      </div>
    </div>
  );
};

export default EditPatient;