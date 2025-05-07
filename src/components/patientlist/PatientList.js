// src/components/patientlist/PatientList.js
import React from 'react';
import './PatientList.css';

const patients = [
  { id: '04', name: 'Justin Chi Cheng sye', triage: 5, time: '15:47' },
  { id: '02', name: 'Bryant Effendi', triage: 4, time: '03:47' },
  { id: '06', name: 'Joshua Darren Chandra', triage: 3, time: '01:47' },
  { id: '08', name: 'Kayden Ciazaria', triage: 2, time: '01:47' },
  { id: '03', name: 'Troy Devdan', triage: 1, time: '01:47' },
];

const getTriageColor = (level) => {
  const colors = ['#c62828', '#ef6c00', '#fdd835', '#9ccc65', '#66bb6a'];
  return colors[5 - level]; // Map level 5 to green, 1 to red
};

const PatientList = () => {
  return (
    <div className="patient-list">
      <div className="list-header">
        <h2>Patient Waiting List</h2>
        <button className="add-button">+ Add Patient</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>P.ID</th>
            <th>Name</th>
            <th>Triage Level</th>
            <th>Time Elapsed</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>
                <span
                  className="triage-circle"
                  style={{ backgroundColor: getTriageColor(p.triage) }}
                >
                  {p.triage}
                </span>
              </td>
              <td>{p.time}</td>
              <td>
                <button className="icon-button">✎</button>
                <button className="admit-button">Admit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientList;
