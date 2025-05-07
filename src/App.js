// src/App.js
import React from 'react';
import Header from './components/header/Header';
import PatientList from './components/patientlist/PatientList';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <div className="main-container">
        <div className="patient-list-wrapper">
          <PatientList />
        </div>
        {/* Right-side panel for admitted history can go here */}
      </div>
    </div>
  );
}

export default App;
