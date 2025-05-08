import React, { useState } from 'react';
import './PatientList.css';
import AddPatient from '../../popups/addpatient/AddPatient';

const initialPatients = [
  { id: '04', name: 'Justin', triage: 5, injury: 'Fractured arm', time: '15:47' },
  { id: '02', name: 'Bryant', triage: 4, injury: 'Head trauma', time: '03:47' },
  { id: '06', name: 'Joshua', triage: 3, injury: 'Sprained ankle', time: '01:47' },
  { id: '08', name: 'Kayden', triage: 2, injury: 'Minor burns', time: '01:47' },
  { id: '03', name: 'Troy', triage: 1, injury: 'Chest pain', time: '01:47' },
];

const getTriageColor = (level) => {
  const colors = ['#c62828', '#ef6c00', '#fdd835', '#9ccc65', '#66bb6a'];
  return colors[5 - level];
};

const PatientList = () => {
  const [patients, setPatients] = useState(initialPatients);
  const [showAddPatient, setShowAddPatient] = useState(false);

  const handleAddPatient = (newPatient) => {
    // Generate a simple ID (last 3 digits of timestamp)
    const id = Date.now().toString().slice(-3);
    // Add the new patient to the list
    setPatients([...patients, {
      ...newPatient,
      id,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setShowAddPatient(false);
  };

  return (
    <div className="pl-container">
      <div className="pl-list">
        {/* Title Header */}
        <div className="pl-header">
          <h2>Patient Waiting List</h2>
          <button 
            className="pl-add-btn" 
            onClick={() => setShowAddPatient(true)}
          >
            + Add Patient
          </button>
        </div>

        {/* Column Headers */}
        <div className="pl-col-header">
          <div className="pl-col-pid">P.ID</div>
          <div className="pl-col-name">Name</div>
          <div className="pl-col-triage">Triage</div>
          <div className="pl-col-injury">Injury Type</div>
          <div className="pl-col-time">Time Elapsed</div>
          <div className="pl-col-edit">Edit</div>
        </div>

        {/* Patient Rows */}
        <div className="pl-rows-container">
          <div className="pl-rows-scrollable">
            {patients.map((p) => (
              <div className="pl-row" key={p.id}>
                <div className="pl-col-pid">{p.id}</div>
                <div className="pl-col-name">{p.name}</div>
                <div className="pl-col-triage">
                  <span
                    className="pl-triage-circle"
                    style={{ backgroundColor: getTriageColor(p.triage) }}
                  >
                    {p.triage}
                  </span>
                </div>
                <div className="pl-col-injury">{p.injury}</div>
                <div className="pl-col-time">{p.time}</div>
                <div className="pl-col-edit">
                  <button className="pl-icon-btn">✎</button>
                  <button className="pl-admit-btn">Admit</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Patient Popup */}
      {showAddPatient && (
        <AddPatient
          onClose={() => setShowAddPatient(false)}
          onAddPatient={handleAddPatient}
        />
      )}
    </div>
  );
};

export default PatientList;