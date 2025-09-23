import React from 'react';

const AboutPage = () => {
  return (
    <div style={{ 
      padding: '2rem', 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      color: 'white'
    }}>
      <h1>📖 About Page</h1>
      <p>This page demonstrates the text loading animation with custom message.</p>
      
      <div style={{ 
        marginTop: '2rem', 
        padding: '1rem', 
        background: 'rgba(255,255,255,0.1)', 
        borderRadius: '10px',
        backdropFilter: 'blur(10px)'
      }}>
        <h3>About React CSS Page Loader:</h3>
        <p>
          A beautiful and customizable React component for page loading animations 
          with CSS-based animations instead of Lottie. Perfect for modern web applications 
          that need smooth, lightweight loading experiences.
        </p>
        
        <h4>Animation Types:</h4>
        <ul>
          <li><strong>Circle:</strong> Spinning circle with smooth rotation</li>
          <li><strong>Text:</strong> Pulsing text with animated dots</li>
        </ul>
      </div>
    </div>
  );
};

export default AboutPage;
