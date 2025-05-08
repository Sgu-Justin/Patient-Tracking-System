import React from 'react';
import './ClearHistory.css';

const ClearHistory = ({ onClose, onConfirm }) => {
  return (
    <div className="clear-history-overlay">
      <div className="clear-history-modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Clear Patient History?</h2>
        <p>This will permanently remove all admitted patient records.</p>
        
        <div className="confirmation-buttons">
          <button 
            className="confirm-btn"
            onClick={onConfirm}
          >
            Yes
          </button>
          <button 
            className="cancel-btn"
            onClick={onClose}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClearHistory;