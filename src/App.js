import React, { useState } from 'react';
import Header from './components/header/Header';
import PatientList from './components/patientlist/PatientList';
import AdmittedList from './components/admittedlist/AdmittedList';
import './App.css';

function App() {
  const [waitingPatients, setWaitingPatients] = useState([
    { id: '04', name: 'Justin', triage: 5, injury: 'Fractured arm', time: '15:47' },
    { id: '02', name: 'Bryant', triage: 4, injury: 'Head trauma', time: '03:47' },
    { id: '06', name: 'Joshua', triage: 3, injury: 'Sprained ankle', time: '01:47' },
    { id: '08', name: 'Kayden', triage: 2, injury: 'Minor burns', time: '01:47' },
    { id: '03', name: 'Troy', triage: 1, injury: 'Chest pain', time: '01:47' },
  ]);

  const [admittedPatients, setAdmittedPatients] = useState([
    { id: '101', name: 'Sarah Johnson', triage: 2, waitTime: '04:39', injury: 'Fractured arm', doctor: 'Dr. Smith' },
    { id: '102', name: 'Michael Chen', triage: 1, waitTime: '34:20', injury: 'Head trauma', doctor: 'Dr. Patel' },
    { id: '103', name: 'Emily Rodriguez', triage: 3, waitTime: '03:04:38', injury: 'Sprained ankle', doctor: 'Dr. Lee' },
    { id: '104', name: 'David Kim', triage: 4, waitTime: '02:38:47', injury: 'Minor burns', doctor: 'Dr. Johnson' },
    { id: '105', name: 'Jessica Wong', triage: 2, waitTime: '84:38:09', injury: 'Broken wrist', doctor: 'Dr. Garcia' },
  ]);

  const handleAdmitPatient = (patient) => {
    setAdmittedPatients([...admittedPatients, patient]);
    setWaitingPatients(waitingPatients.filter(p => p.id !== patient.id));
  };

  const handleAddPatient = (newPatient) => {
    const id = Date.now().toString().slice(-3);
    setWaitingPatients([...waitingPatients, {
      ...newPatient,
      id,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
  };

  const handleClearHistory = () => {
    setAdmittedPatients([]);
  };

  return (
    <div className="app">
      <Header />
      <div className="main-container">
        <div className="left-panel">
          <PatientList 
            patients={waitingPatients}
            onAddPatient={handleAddPatient}
            onAdmitPatient={handleAdmitPatient}
          />
        </div>
        <div className="right-panel">
          <AdmittedList 
            patients={admittedPatients}
            onClearHistory={handleClearHistory}
          />
        </div>
      </div>
    </div>
  );
}

export default App;