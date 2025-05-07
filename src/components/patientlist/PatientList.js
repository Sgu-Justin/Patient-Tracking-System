import React from 'react';
import './PatientList.css';

const patients = [
    { id: '04', name: 'Justin Chi Cheng sye', triage: 5, time: '15:47' },
    { id: '02', name: 'Bryant Effendi', triage: 4, time: '03:47' },
    { id: '06', name: 'Joshua Darren Chandra', triage: 3, time: '01:47' },
    { id: '08', name: 'Kayden Ciazaria', triage: 2, time: '01:47' },
    { id: '03', name: 'Troy Devdan', triage: 1, time: '01:47' },
    { id: '04', name: 'Justin Chi Cheng sye', triage: 5, time: '15:47' },
    { id: '02', name: 'Bryant Effendi', triage: 4, time: '03:47' },
    { id: '06', name: 'Joshua Darren Chandra', triage: 3, time: '01:47' },
    { id: '08', name: 'Kayden Ciazaria', triage: 2, time: '01:47' },
    { id: '03', name: 'Troy Devdan', triage: 1, time: '01:47' },
    { id: '04', name: 'Justin Chi Cheng sye', triage: 5, time: '15:47' },
    { id: '02', name: 'Bryant Effendi', triage: 4, time: '03:47' },
    { id: '06', name: 'Joshua Darren Chandra', triage: 3, time: '01:47' },
    { id: '08', name: 'Kayden Ciazaria', triage: 2, time: '01:47' },
    { id: '03', name: 'Troy Devdan', triage: 1, time: '01:47' },
    { id: '02', name: 'Bryant Effendi', triage: 4, time: '03:47' },
    { id: '06', name: 'Joshua Darren Chandra', triage: 3, time: '01:47' },
    { id: '08', name: 'Kayden Ciazaria', triage: 2, time: '01:47' },
    { id: '03', name: 'Troy Devdan', triage: 1, time: '01:47' },
];

const getTriageColor = (level) => {
  const colors = ['#c62828', '#ef6c00', '#fdd835', '#9ccc65', '#66bb6a'];
  return colors[5 - level];
};

const PatientList = () => {
  return (
    <div className="patient-list-container">
      <div className="patient-list">
        {/* Box 1: Title Header */}
        <div className="list-header">
          <h2>Patient Waiting List</h2>
          <button className="add-button">+ Add Patient</button>
        </div>

        {/* Box 2: Column Headers */}
        <div className="column-header">
          <div>P.ID</div>
          <div>Name</div>
          <div>Triage Level</div>
          <div>Time Elapsed</div>
          <div>Edit</div>
        </div>

        {/* Box 3: Scrollable Rows */}
        <div className="patient-rows-container">
          <div className="patient-rows-scrollable">
            {patients.map((p) => (
              <div className="patient-row" key={p.id}>
                <div>{p.id}</div>
                <div>{p.name}</div>
                <div>
                  <span
                    className="triage-circle"
                    style={{ backgroundColor: getTriageColor(p.triage) }}
                  >
                    {p.triage}
                  </span>
                </div>
                <div>{p.time}</div>
                <div>
                  <button className="icon-button">✎</button>
                  <button className="admit-button">Admit</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientList;