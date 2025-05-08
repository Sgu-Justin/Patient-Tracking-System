import React from 'react';
import './AdmittedList.css';

const admittedPatients = [
  { id: '101', name: 'Sarah Johnson', triage: 2, waitTime: '04:39', injury: 'Fractured arm', doctor: 'Dr. Smith' },
  { id: '102', name: 'Michael Chen', triage: 1, waitTime: '34:20', injury: 'Head trauma', doctor: 'Dr. Patel' },
  { id: '103', name: 'Emily Rodriguez', triage: 3, waitTime: '03:04:38', injury: 'Sprained ankle', doctor: 'Dr. Lee' },
  { id: '104', name: 'David Kim', triage: 4, waitTime: '02:38:47', injury: 'Minor burns', doctor: 'Dr. Johnson' },
  { id: '105', name: 'Jessica Wong', triage: 2, waitTime: '84:38:09', injury: 'Broken wrist', doctor: 'Dr. Garcia' },
];

const getTriageColor = (level) => {
  const colors = ['#c62828', '#ef6c00', '#fdd835', '#9ccc65', '#66bb6a'];
  return colors[5 - level];
};

const AdmittedList = () => {
  return (
    <div className="al-container">
      <div className="al-list">
        {/* Title Header */}
        <div className="al-header">
          <h2>Admitted Patient History</h2>
          <div className="al-header-btns">
            <button className="al-download-btn">
              <span className="al-download-icon">↓</span> Download
            </button>
            <button className="al-clear-btn">Clear History</button>
          </div>
        </div>

        {/* Column Headers */}
        <div className="al-col-header">
          <div className="al-col-pid">P.ID</div>
          <div className="al-col-name">Patient Name</div>
          <div className="al-col-triage">Triage</div>
          <div className="al-col-doctor">Doctor</div>
          <div className="al-col-injury">Injury Type</div>
          <div className="al-col-time">Total Wait</div>
        </div>

        {/* Patient Rows */}
        <div className="al-rows-container">
          <div className="al-rows-scrollable">
            {admittedPatients.map((p) => (
              <div className="al-row" key={p.id}>
                <div className="al-col-pid">{p.id}</div>
                <div className="al-col-name">{p.name}</div>
                <div className="al-col-triage">
                  <span
                    className="al-triage-circle"
                    style={{ backgroundColor: getTriageColor(p.triage) }}
                  >
                    {p.triage}
                  </span>
                </div>
                <div className="al-col-doctor">{p.doctor}</div>
                <div className="al-col-injury">{p.injury}</div>
                <div className="al-col-time">{p.waitTime}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmittedList;