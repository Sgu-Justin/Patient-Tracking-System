import React, { useState } from 'react';
import './AddPatient.css';

const AddPatient = ({ onClose, onAddPatient }) => {
  const [formData, setFormData] = useState({
    name: '',
    triage: '3',
    injury: 'Blunt Trauma'
  });

  const triageLevels = [
    { value: '1', label: '1 - Immediate' },
    { value: '2', label: '2 - Emergency' },
    { value: '3', label: '3 - Urgent' },
    { value: '4', label: '4 - Semi-urgent' },
    { value: '5', label: '5 - Non-urgent' }
  ];

  const injuryTypes = [
    'Blunt Trauma',
    'Penetrating Trauma',
    'Burn Trauma',
    'Toxic Inhalation',
    'Radiation'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    
    const newPatient = {
      id: Date.now().toString().slice(-3), // Simple ID generation
      name: formData.name,
      triage: parseInt(formData.triage),
      injury: formData.injury,
      doctor: 'Dr. Smith', // Default doctor, can be made dynamic later
      waitTime: '0m' // Initial wait time
    };
    
    onAddPatient(newPatient);
    onClose();
  };

  return (
    <div className="add-patient-overlay">
      <div className="add-patient-modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Add New Patient</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Patient Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="triage">Triage Level:</label>
            <select
              id="triage"
              name="triage"
              value={formData.triage}
              onChange={handleChange}
            >
              {triageLevels.map(level => (
                <option key={level.value} value={level.value}>{level.label}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="injury">Injury Type:</label>
            <select
              id="injury"
              name="injury"
              value={formData.injury}
              onChange={handleChange}
            >
              {injuryTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          <button type="submit" className="submit-btn">Done</button>
        </form>
      </div>
    </div>
  );
};

export default AddPatient;