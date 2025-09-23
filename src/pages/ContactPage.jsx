import React from 'react';

const ContactPage = () => {
  return (
    <div style={{ 
      padding: '2rem', 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      color: 'white'
    }}>
      <h1>📞 Contact Page</h1>
      <p>This page demonstrates the circle animation with custom background color.</p>
      
      <div style={{ 
        marginTop: '2rem', 
        padding: '1rem', 
        background: 'rgba(255,255,255,0.1)', 
        borderRadius: '10px',
        backdropFilter: 'blur(10px)'
      }}>
        <h3>Get in Touch:</h3>
        <p>Feel free to reach out if you have any questions about the React CSS Page Loader!</p>
        
        <div style={{ marginTop: '1rem' }}>
          <h4>Package Info:</h4>
          <ul>
            <li><strong>NPM:</strong> react-css-page-loader</li>
            <li><strong>GitHub:</strong> https://github.com/divindvm/React-CSS-Page-Loader</li>
            <li><strong>License:</strong> MIT</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
