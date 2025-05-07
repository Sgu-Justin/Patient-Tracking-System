import React from 'react';
import './AdmittedList.css';

// Mock data for admitted patients
const admittedPatients = [
  { id: '101', name: 'Sarah Johnson', triage: 2, waitTime: '2h 15m', injury: 'Fractured arm' },
  { id: '102', name: 'Michael Chen', triage: 1, waitTime: '1h 45m', injury: 'Head trauma' },
  { id: '103', name: 'Emily Rodriguez', triage: 3, waitTime: '3h 30m', injury: 'Sprained ankle' },
  { id: '104', name: 'David Kim', triage: 4, waitTime: '45m', injury: 'Minor burns' },
  { id: '105', name: 'Jessica Wong', triage: 2, waitTime: '2h 05m', injury: 'Broken wrist' },
  { id: '106', name: 'Robert Smith', triage: 1, waitTime: '1h 20m', injury: 'Chest pain' },
  { id: '107', name: 'Amanda Lee', triage: 3, waitTime: '2h 50m', injury: 'Deep cut' },
  { id: '108', name: 'Daniel Brown', triage: 5, waitTime: '30m', injury: 'Allergic reaction' },
  { id: '109', name: 'Olivia Davis', triage: 2, waitTime: '2h 25m', injury: 'Concussion' },
  { id: '110', name: 'James Wilson', triage: 4, waitTime: '50m', injury: 'Eye injury' },
  { id: '111', name: 'Sophia Martinez', triage: 1, waitTime: '1h 15m', injury: 'Severe bleeding' },
  { id: '112', name: 'William Taylor', triage: 3, waitTime: '3h 10m', injury: 'Dislocated shoulder' },
  { id: '113', name: 'Emma Anderson', triage: 2, waitTime: '2h 00m', injury: 'Broken leg' },
  { id: '114', name: 'Benjamin Thomas', triage: 5, waitTime: '25m', injury: 'Mild fever' },
  { id: '115', name: 'Ava Jackson', triage: 1, waitTime: '1h 30m', injury: 'Stroke symptoms' },
];

const getTriageColor = (level) => {
  const colors = ['#c62828', '#ef6c00', '#fdd835', '#9ccc65', '#66bb6a'];
  return colors[5 - level];
};

const AdmittedList = () => {
  return (
    <div className="admitted-list-container">
      <div className="admitted-list">
        {/* Box 1: Title Header */}
        <div className="list-header">
          <h2>Admitted Patient History</h2>
          <div className="header-buttons">
            <button className="download-button">
              <span className="download-icon">↓</span> Download
            </button>
            <button className="clear-button">Clear History</button>
          </div>
        </div>

        {/* Box 2: Column Headers */}
        <div className="column-header">
          <div>P.ID</div>
          <div>Patient Name</div>
          <div>Triage</div>
          <div>Total Wait Time</div>
          <div>Injury Type</div>
        </div>

        {/* Box 3: Scrollable Rows */}
        <div className="patient-rows-container">
          <div className="patient-rows-scrollable">
            {admittedPatients.map((p) => (
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
                <div>{p.waitTime}</div>
                <div>{p.injury}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmittedList;