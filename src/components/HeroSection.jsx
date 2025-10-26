import React from 'react';
import { Box, Typography, Button, Container, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // Essential for navigation

const HeroSection = () => {
  const theme = useTheme();

  // Framer Motion variants for animated elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Delay between children animations
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <Box
      sx={{
        // Mimic the background effect: NYC map backdrop (dimmed overlay)
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.9)), url("/nyc-skyline-bg.jpg")', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '90vh', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: theme.palette.text.primary,
        // NOTE: Ensure you have an image named 'nyc-skyline-bg.jpg' 
        // in your public folder for the background to show up.
      }}
    >
      <Container maxWidth="md">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Title: AI-Powered Safety for the Next Generation */}
          <motion.div variants={itemVariants}>
            <Typography
              variant="h1"
              component="h1"
              sx={{
                mb: 2,
                fontWeight: 800,
                color: theme.palette.primary.main, 
                textShadow: '0 2px 4px rgba(0,0,0,0.05)',
              }}
            >
              AI-Powered Safety for the Next Generation
            </Typography>
          </motion.div>

          {/* Subtitle / Mission Statement */}
          <motion.div variants={itemVariants}>
            <Typography
              variant="h5"
              sx={{
                mb: 4,
                fontWeight: 300,
                color: theme.palette.text.secondary,
              }}
            >
              Providing NYC students, parents, and schools with insights for the safest path forward.
            </Typography>
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            variants={itemVariants} 
            style={{ display: 'flex', justifyContent: 'center', gap: theme.spacing(3) }}
          >
            
            {/* 1. View Insights Button (Interactive link to the map/transportation page) */}
            <Button
              variant="contained"
              color="primary"
              size="large"
              component={Link} 
              to="/transportation" // Links to the map page
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              sx={{ py: 1.5, px: 4, fontWeight: 600 }}
            >
              View Route Insights
            </Button>
            
            {/* 2. Ask the AI Button (Interactive link to the new AI Chat page) */}
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              component={Link} 
              to="/chat" // Links to the new AI Chat page
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              sx={{ py: 1.5, px: 4, fontWeight: 600, borderColor: theme.palette.secondary.main }}
            >
              Ask the AI
            </Button>
          </motion.div>

        </motion.div>
      </Container>
    </Box>
  );
};

export default HeroSection;