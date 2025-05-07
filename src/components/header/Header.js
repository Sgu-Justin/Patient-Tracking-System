import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <img src="/assets/SiloamAgoraLogo.png" alt="Siloam Agora Logo" className="logo" />
      <h1 className="header-title">Emergency Department: Patient Tracking System</h1>
    </header>
  );
};

export default Header;
