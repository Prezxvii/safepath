import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // <--- NEW IMPORT
import Navbar from './Navbar'; 

const Header = () => {
  const theme = useTheme();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      component={motion.header}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, delay: 0.1 }}
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', maxWidth: 'lg', width: '100%', margin: '0 auto', py: 1 }}>
        
        {/* Logo / Website Name (Top Left) */}
        <Box sx={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
            <Typography 
                variant="h6" 
                component="div" 
                sx={{ 
                    fontWeight: 700, 
                    color: theme.palette.primary.main,
                    letterSpacing: 0.5 
                }}
            >
                SafePath AI
            </Typography>
            <Typography 
                variant="caption"
                sx={{
                    ml: 1,
                    color: theme.palette.text.secondary,
                    fontWeight: 300
                }}
            >
                NYC Safety Insights
            </Typography>
        </Box>

        {/* Centered Navigation Links */}
        <Navbar />

        {/* Contact Button (Top Right) */}
        <Button 
          variant="outlined" 
          color="secondary"
          // --- FIX: Use Link component and 'to' prop ---
          component={Link}
          to="/contact" // <--- The new route for the Contact page
          // ------------------------------------------
          sx={{ 
            color: theme.palette.secondary.main,
            borderColor: theme.palette.secondary.main,
            '&:hover': {
                backgroundColor: theme.palette.secondary.light,
                color: theme.palette.background.paper,
                borderColor: theme.palette.secondary.light,
            }
          }}
        >
          Contact
        </Button>

      </Toolbar>
    </AppBar>
  );
};

export default Header;