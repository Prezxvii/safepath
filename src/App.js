import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

// Core Components
import Header from './components/Header';
import ChatWidget from './components/ChatWidget';
import Footer from './components/Footer'; 

// Page Components
import Home from './pages/Home';
import FAQ from './pages/FAQ'; 
import Insights from './pages/Insights'; 
import Transportation from './pages/Transportation'; 
import EmergencyPlanning from './pages/EmergencyPlanning';
import MentalHealth from './pages/MentalHealth'; 
import AIChat from './pages/AIChat'; 
// --- NEW CRITICAL IMPORT ---
import Contact from './pages/Contact'; // Import the new Contact page component

function App() {
  return (
    <Router>
      <Header /> 
      
      <Box 
        component="main" 
        sx={{ 
          pt: '64px',
          minHeight: '100vh', 
          display: 'flex', 
          flexDirection: 'column'
        }}
      > 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/transportation" element={<Transportation />} />
          <Route path="/emergency-planning" element={<EmergencyPlanning />} />
          <Route path="/mental-health" element={<MentalHealth />} />
          <Route path="/faq" element={<FAQ />} /> 
          <Route path="/chat" element={<AIChat />} /> 
          
          {/* --- ADDED ROUTE FOR THE HEADER'S CONTACT BUTTON --- */}
          <Route path="/contact" element={<Contact />} /> 
          
          <Route path="*" element={<Box p={10} textAlign="center"><Typography variant="h4" color="error">404 - Page Not Found</Typography></Box>} />
        </Routes>

        <Footer /> 
      </Box>
      
      <ChatWidget /> 
    </Router>
  );
}

export default App;
