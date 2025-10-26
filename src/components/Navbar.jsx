import React from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';

// Define your main navigation links
const navLinks = [
  { title: 'Home', path: '/' },
  { title: 'Safety Insights', path: '/insights' },
  { title: 'Transportation', path: '/transportation' },
  { title: 'Mental Health', path: '/mental-health' },
  { title: 'FAQ', path: '/faq' },
];

const Navbar = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1, // Allows the nav to take up available space
      }}
    >
      {navLinks.map((link) => (
        <Button
          key={link.title}
          component={RouterLink} // Use React Router Link
          to={link.path}
          sx={{
            mx: 2,
            color: theme.palette.text.primary,
            fontSize: '1rem',
            fontWeight: 500,
            position: 'relative', // Necessary for the animated underline
            '&:hover': {
              backgroundColor: 'transparent',
              color: theme.palette.secondary.main, // Cyan accent on hover
            },
          }}
        >
          <Typography variant="button">
            {link.title}
          </Typography>

          {/* Framer Motion Underline on Hover (Simulated) */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '2px',
              backgroundColor: theme.palette.secondary.main,
              transformOrigin: 'bottom center',
            }}
          />
        </Button>
      ))}
    </Box>
  );
};

export default Navbar;