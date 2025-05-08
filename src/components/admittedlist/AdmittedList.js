import React from 'react';
import './AdmittedList.css';

const getTriageColor = (level) => {
  const colors = ['#c62828', '#ef6c00', '#fdd835', '#9ccc65', '#66bb6a'];
  return colors[5 - level];
};

const AdmittedList = ({ patients }) => {
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
            {patients.map((p) => (
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