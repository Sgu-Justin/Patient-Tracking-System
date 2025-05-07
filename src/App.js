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
        <PatientList />
        {/* Right-side panel for admitted history will go here later */}
      </div>
    </div>
  );
}

export default App;
