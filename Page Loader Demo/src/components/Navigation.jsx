import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/products', label: 'Products' },
    { path: '/contact', label: 'Contact' },
    { path: '/test', label: 'Test' }
  ];

  return (
    <nav style={{
      backgroundColor: 'white',
      borderBottom: '1px solid #e0e0e0',
      padding: '0 20px',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      width: '100vw',
      margin: 0,
      boxSizing: 'border-box'
    }}>
      <div style={{
        width: '100%',
        margin: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '60px'
      }}>
        <div style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#333'
        }}>
          Page Loader Demo
        </div>
        <ul style={{
          display: 'flex',
          listStyle: 'none',
          margin: 0,
          padding: 0,
          gap: '20px'
        }}>
          {navItems.map(item => (
            <li key={item.path}>
              <Link 
                to={item.path} 
                style={{
                  textDecoration: 'none',
                  color: location.pathname === item.path ? '#000' : '#666',
                  fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  transition: 'all 0.2s ease',
                  borderBottom: location.pathname === item.path ? '2px solid #000' : '2px solid transparent'
                }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
