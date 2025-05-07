import React from 'react';
import Header from './components/header/Header';
import PatientList from './components/patientlist/PatientList';
import AdmittedList from './components/admittedlist/AdmittedList';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <div className="main-container">
        <div className="left-panel">
          <PatientList />
        </div>
        <div className="right-panel">
          <AdmittedList />
        </div>
      </div>
    </div>
  );
}

export default App;