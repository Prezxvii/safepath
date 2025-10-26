import React from 'react';
import { Box } from '@mui/material';

// Components
import HeroSection from '../components/HeroSection';
import MissionSection from '../components/MissionSection'; // <-- NEW: Import the actual MissionSection component
import AIAssessmentForm from '../components/AIAssessmentForm'; 

const Home = () => {
  return (
    <Box>
      {/* 1. HERO SECTION */}
      <HeroSection />
      
      {/* 2. MISSION SECTION: Predict. Protect. Inform. */}
      {/* Replaces the old MISSION SECTION Placeholder with the actual component */}
      <MissionSection /> 

      {/* 3. AI ASSESSMENT FORM (The core user tool) */}
      <AIAssessmentForm />
      
      {/* 4. Placeholder for future content (e.g., Quick Insights Preview / CTA Footer) */}
      <Box sx={{ minHeight: '30vh', p: 5, textAlign: 'center' }}>
        {/* You can build out the "Quick Insights Preview" dashboard summary here */}
      </Box>
    </Box>
  );
};

export default Home;