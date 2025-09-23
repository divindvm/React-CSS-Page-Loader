import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageLoader from 'react-css-page-loader';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Contact from './pages/Contact';
import Test from './pages/Test';
import './App.css';

function App() {
  return (
    <Router>
      <div style={{ 
        backgroundColor: 'white', 
        height: '100vh',
        fontFamily: 'Arial, sans-serif',
        width: '100vw',
        margin: 0,
        padding: 0,
        overflow: 'hidden'
      }}>
        <Navigation />
        <main style={{ 
          backgroundColor: 'white',
          width: '100vw',
          margin: 0,
          padding: 0
        }}>
          <Routes>
            <Route path="/" element={
              <PageLoader loadingText="Loading Home..." duration={2000}>
                <Home />
              </PageLoader>
            } />
            <Route path="/about" element={
              <PageLoader loadingText="Loading About..." duration={2000}>
                <About />
              </PageLoader>
            } />
            <Route path="/products" element={
              <PageLoader loadingText="Loading Products..." duration={2000}>
                <Products />
              </PageLoader>
            } />
            <Route path="/contact" element={
              <PageLoader loadingText="Loading Contact..." duration={2000}>
                <Contact />
              </PageLoader>
            } />
            <Route path="/test" element={
              <PageLoader loadingText="Loading Test..." duration={2000}>
                <Test />
              </PageLoader>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
