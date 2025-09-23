import React from 'react';

const GalleryPage = () => {
  return (
    <div style={{ 
      padding: '2rem', 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      color: 'white'
    }}>
      <h1>🖼️ Gallery Page</h1>
      <p>This page demonstrates the text animation with custom loading message.</p>
      
      <div style={{ 
        marginTop: '2rem', 
        padding: '1rem', 
        background: 'rgba(255,255,255,0.1)', 
        borderRadius: '10px',
        backdropFilter: 'blur(10px)'
      }}>
        <h3>Gallery Features:</h3>
        <p>This page showcases how the loader works with different content types.</p>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '1rem',
          marginTop: '1rem'
        }}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} style={{
              height: '150px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem'
            }}>
              🖼️
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
