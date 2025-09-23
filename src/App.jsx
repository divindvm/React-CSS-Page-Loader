import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageLoader from 'react-css-page-loader';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import GalleryPage from './pages/GalleryPage';
import './App.css';

// Navigation Component
const Navigation = () => {
  const location = useLocation();
  
  const navStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    background: 'rgba(0, 0, 0, 0.9)',
    backdropFilter: 'blur(10px)',
    padding: '1rem',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem'
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '5px',
    transition: 'all 0.3s ease',
    background: 'transparent'
  };

  const activeLinkStyle = {
    ...linkStyle,
    background: 'rgba(255, 255, 255, 0.2)',
    transform: 'scale(1.05)'
  };

  return (
    <nav style={navStyle}>
      <Link 
        to="/" 
        style={location.pathname === '/' ? activeLinkStyle : linkStyle}
      >
        🏠 Home
      </Link>
      <Link 
        to="/about" 
        style={location.pathname === '/about' ? activeLinkStyle : linkStyle}
      >
        📖 About
      </Link>
      <Link 
        to="/contact" 
        style={location.pathname === '/contact' ? activeLinkStyle : linkStyle}
      >
        📞 Contact
      </Link>
      <Link 
        to="/gallery" 
        style={location.pathname === '/gallery' ? activeLinkStyle : linkStyle}
      >
        🖼️ Gallery
      </Link>
    </nav>
  );
};

// Animated Routes Component
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode='wait'>
      <Routes location={location} key={location.pathname}>
        <Route 
          path="/" 
          element={
            <PageLoader 
              animationType="circle" 
              duration={2000}
              backgroundColor="#667eea"
            >
              <HomePage />
            </PageLoader>
          } 
        />
        <Route 
          path="/about" 
          element={
            <PageLoader 
              animationType="text" 
              loadingText="Loading About..." 
              duration={2500}
              backgroundColor="#f093fb"
            >
              <AboutPage />
            </PageLoader>
          } 
        />
        <Route 
          path="/contact" 
          element={
            <PageLoader 
              animationType="circle" 
              backgroundColor="#4facfe"
              duration={2000}
            >
              <ContactPage />
            </PageLoader>
          } 
        />
        <Route 
          path="/gallery" 
          element={
            <PageLoader 
              animationType="text" 
              loadingText="Loading Gallery..." 
              duration={3000}
              backgroundColor="#fa709a"
            >
              <GalleryPage />
            </PageLoader>
          } 
        />
      </Routes>
    </AnimatePresence>
  );
}

// Main App Component
function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <div style={{ marginTop: '80px' }}>
          <AnimatedRoutes />
        </div>
      </div>
    </Router>
  );
}

export default App;
