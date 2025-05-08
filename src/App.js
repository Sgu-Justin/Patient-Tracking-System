import React, { useState, useEffect } from 'react';
import Header from './components/header/Header';
import PatientList from './components/patientlist/PatientList';
import AdmittedList from './components/admittedlist/AdmittedList';
import { io } from 'socket.io-client';
import './App.css';

// API base URL
const API_BASE_URL = 'https://clever-preferably-bird.ngrok-free.app';

function App() {
  const [waitingPatients, setWaitingPatients] = useState([]);
  const [admittedPatients, setAdmittedPatients] = useState([]);
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState('connecting');
  const [activeView, setActiveView] = useState('waiting'); // 'waiting' or 'admitted'
  const [editingPatient, setEditingPatient] = useState(null);

  useEffect(() => {
    const socketConnection = io(API_BASE_URL, {
      transports: ['websocket'],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
    setSocket(socketConnection);

    socketConnection.on('connect', () => {
      console.log('Connected to server:', socketConnection.id);
      setLoading(false);
      setConnectionStatus('connected');
    });

    socketConnection.on('update', (data) => {
      console.log('Received update:', data);
      if (data.list) setWaitingPatients(data.list);
      if (data.history) setAdmittedPatients(data.history);
    });

    socketConnection.on('disconnect', () => {
      console.log('Disconnected from server');
      setConnectionStatus('disconnected');
      setLoading(true);
    });

    socketConnection.on('connect_error', (error) => {
      console.error('Connection error:', error);
      setConnectionStatus('error');
      setLoading(true);
    });

    return () => {
      socketConnection.disconnect();
    };
  }, []);

  const handleAddPatient = async (newPatient) => {
    try {
      // Convert the patient data to match the backend API
      const patientData = {
        patientName: newPatient.name,
        triageLevel: newPatient.triage,
        injuryType: newPatient.injury
      };

      // Make API call to add a patient
      const response = await fetch(`${API_BASE_URL}/addList`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(patientData),
      });

      if (!response.ok) {
        throw new Error('Failed to add patient');
      }

      // No need to update state manually - socket will handle the update
      console.log('Patient added successfully');
    } catch (error) {
      console.error('Error adding patient:', error);
      // You could add error handling UI here
    }
  };

  const handleAdmitPatient = async (patient,doctor) => {
    try {
      if (!doctor) {
        return; // User cancelled
      }

      // Make API call to admit a patient
      const response = await fetch(`${API_BASE_URL}/admitPatient/${patient.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ enteredDoctor: doctor }),
      });

      if (!response.ok) {
        throw new Error('Failed to admit patient');
      }

      // No need to update state manually - socket will handle the update
      console.log('Patient admitted successfully');
    } catch (error) {
      console.error('Error admitting patient:', error);
      // You could add error handling UI here
    }
  };

  const handleClearHistory = async () => {
    try {
      // Make API call to clear history
      const response = await fetch(`${API_BASE_URL}/clearhistory`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to clear history');
      }

      console.log('History cleared successfully');
      // Socket will handle updating the state
    } catch (error) {
      console.error('Error clearing history:', error);
    }
  };

  const handleDownloadHistory = () => {
    // Redirect to download endpoint
    window.open(`${API_BASE_URL}/downloadhistory`, '_blank');
  };

  const handleUpdateTriage = async (patientId, newTriageLevel) => {
    try {
      const response = await fetch(`${API_BASE_URL}/updateTriageLevelById/${patientId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ triageLevel: newTriageLevel }),
      });

      if (!response.ok) {
        throw new Error('Failed to update triage level');
      }

      console.log('Triage level updated successfully');
      // Socket will handle updating the state
    } catch (error) {
      console.error('Error updating triage level:', error);
    }
  };

  return (
    <div className="app">
      <Header connectionStatus={connectionStatus} />
      <div className="main-container">
        <div className="left-panel">
          <PatientList 
            patients={waitingPatients}
            onAddPatient={handleAddPatient}
            onAdmitPatient={handleAdmitPatient}
            onUpdateTriage={handleUpdateTriage}
          />
        </div>
        <div className="right-panel">
          <AdmittedList 
            patients={admittedPatients}
            onClearHistory={handleClearHistory}
            onDownloadHistory={handleDownloadHistory}
          />
        </div>
      </div>
      {loading && <div className="loading-indicator">Connecting to server...</div>}
    </div>
  );
}

export default App;