import React from 'react';
import notfound from '../assets/notfound.jpg';
import './NotFound.css'; // Import the CSS file

const NotFound = () => {
  return (
    <div className="notfound-container">
      <img src={notfound} alt="Page Not Found" />
      <div className="notfound-message">
        <h1 className="notfound-header">404 Page Not Found</h1>
        <p className="notfound-text">The page you are looking for does not exist.</p>
      </div>
    </div>
  );
};

export default NotFound;
