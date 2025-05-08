import React, { useState } from 'react';
import './PatientList.css';
import AddPatient from '../../popups/addpatient/AddPatient';
import EditPatient from '../../popups/editpatient/EditPatient';
import AdmitPatient from '../../popups/admitpatient/AdmitPatient';

const getTriageColor = (level) => {
  const colors = ['#c62828', '#ef6c00', '#fdd835', '#9ccc65', '#66bb6a'];
  return colors[5 - level];
};

const PatientList = ({ patients, onAddPatient, onAdmitPatient }) => {
  const [showAddPatient, setShowAddPatient] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [admittingPatient, setAdmittingPatient] = useState(null);

  const handleEditPatient = (updatedPatient) => {
    onAddPatient(updatedPatient); // This will update the existing patient
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
            ))}
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
          onAdmit={onAdmitPatient}
        />
      )}
    </div>
  );
};

export default PatientList;