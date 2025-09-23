import React from 'react';

const HomePage = () => {
  return (
    <div style={{ 
      padding: '2rem', 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white'
    }}>
      <h1>🏠 Home Page</h1>
      <p>Welcome to the React CSS Page Loader Demo!</p>
      <p>This page demonstrates the circle loading animation.</p>
      
      <div style={{ 
        marginTop: '2rem', 
        padding: '1rem', 
        background: 'rgba(255,255,255,0.1)', 
        borderRadius: '10px',
        backdropFilter: 'blur(10px)'
      }}>
        <h3>Features:</h3>
        <ul>
          <li>CSS-based loading animations</li>
          <li>No external animation libraries</li>
          <li>Lightweight and fast</li>
          <li>Customizable duration and text</li>
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
