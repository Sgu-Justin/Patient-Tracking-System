import React, { useState } from 'react';
import './PatientList.css';
import AddPatient from '../../popups/addpatient/AddPatient';
import EditPatient from '../../popups/editpatient/EditPatient';
import AdmitPatient from '../../popups/admitpatient/AdmitPatient';

const getTriageColor = (level) => {
  const colors = ['#66bb6a', '#9ccc65', '#fdd835', '#ef6c00', '#c62828']
  //  const colors = ['#c62828', '#ef6c00', '#fdd835', '#9ccc65', '#66bb6a'];
  return colors[5 - level];
};

const PatientList = ({ patients, onAddPatient, onAdmitPatient, onUpdateTriage }) => {
  const [showAddPatient, setShowAddPatient] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [admittingPatient, setAdmittingPatient] = useState(null);

  // Map backend data structure to frontend structure
  const mappedPatients = patients.map(p => ({
    id: p.id,
    name: p.patientName,
    triage: parseInt(p.triageLevel),
    injury: p.injuryType,
    time: p.formattedWaitTime || '00:00:00',
    waitTime: p.waitTime
  }));

  const handleAdmitSubmit = (patient, doctorName) => {
    // Pass the patient object and doctor name as separate parameters
    onAdmitPatient(patient, doctorName);
  };
  const handleEditPatient = (updatedPatient) => {
    // Update triage level via API
    if (editingPatient && editingPatient.id) {
      onUpdateTriage(editingPatient.id, updatedPatient.triage);
    }
    setEditingPatient(null);
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
            {mappedPatients.length === 0 ? (
              <div className="pl-no-patients">No patients in waiting list</div>
            ) : (
              mappedPatients.map((p) => (
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
                    <button 
                      className="pl-icon-btn"
                      onClick={() => setEditingPatient(p)}
                    >
                      ✎
                    </button>
                    <button 
                      className="pl-admit-btn"
                      onClick={() => setAdmittingPatient(p)}
                    >
                      Admit
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Add Patient Popup */}
      {showAddPatient && (
        <AddPatient
          onClose={() => setShowAddPatient(false)}
          onAddPatient={onAddPatient}
        />
      )}

      {/* Edit Patient Popup */}
      {editingPatient && (
        <EditPatient
          patient={editingPatient}
          onClose={() => setEditingPatient(null)}
          onSave={handleEditPatient}
        />
      )}

      {/* Admit Patient Popup */}
      {admittingPatient && (
        <AdmitPatient
        patient={admittingPatient}
        onClose={() => setAdmittingPatient(null)}
        onAdmit={handleAdmitSubmit}  // Using the new function instead of passing onAdmitPatient directly
      />
      )}
    </div>
  );
};

export default PatientList;