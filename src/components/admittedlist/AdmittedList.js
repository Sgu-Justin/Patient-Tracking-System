import React, { useState } from 'react';
import './AdmittedList.css';
import ClearHistory from '../../popups/clearhistory/ClearHistory';

const getTriageColor = (level) => {
  const colors = ['#66bb6a', '#9ccc65', '#fdd835', '#ef6c00', '#c62828']
  return colors[5 - level];
};

const AdmittedList = ({ patients, onClearHistory, onDownloadHistory }) => {
  const [showClearHistory, setShowClearHistory] = useState(false);

  // Map backend data structure to frontend structure
  const mappedPatients = patients.map(p => ({
    id: p.HistoryId,
    name: p.patientName,
    triage: parseInt(p.triageLevel),
    injury: p.injuryType,
    doctor: p.Doctor,
    waitTime: p.formattedWaitTime || '00:00:00'
  }));

  return (
    <div className="al-container">
      <div className="al-list">
        {/* Title Header */}
        <div className="al-header">
          <h2>Admitted Patient History</h2>
          <div className="al-header-btns">
            <button 
              className="al-download-btn" 
              onClick={onDownloadHistory}
            >
              <span className="al-download-icon">↓</span> Download
            </button>
            <button 
              className="al-clear-btn"
              onClick={() => setShowClearHistory(true)}
            >
              Clear History
            </button>
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
            {mappedPatients.length === 0 ? (
              <div className="al-no-patients">No admitted patients in history</div>
            ) : (
              mappedPatients.map((p) => (
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
              ))
            )}
          </div>
        </div>
      </div>

      {/* Clear History Popup */}
      {showClearHistory && (
        <ClearHistory
          onClose={() => setShowClearHistory(false)}
          onConfirm={() => {
            onClearHistory();
            setShowClearHistory(false);
          }}
        />
      )}
    </div>
  );
};

export default AdmittedList;