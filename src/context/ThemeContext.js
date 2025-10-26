import React, { createContext, useMemo, useState } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';

// 1. Define the Context
export const ThemeContext = createContext({
  toggleColorMode: () => {},
  mode: 'light',
});

// 2. Define the Custom Color Palette
const getDesignTokens = (mode) => ({
  palette: {
    mode,
    // Define the core color palette based on your design choice
    ...(mode === 'light'
      ? {
          // White/Light Mode (Clean, Glossy Look)
          primary: {
            // Deep Blue for reliability (used for main buttons, app bar)
            main: '#003366', 
            light: '#0059b3',
            dark: '#001a33',
          },
          secondary: {
            // Soft Cyan for AI highlights/accents
            main: '#00BFFF', 
            light: '#66d9ff',
            dark: '#0099e6',
          },
          background: {
            default: '#F8F9FA', // Very light gray (Background)
            paper: '#FFFFFF',    // Pure White (Cards, Panels)
          },
          text: {
            primary: '#1A1A1A', // Near Black
            secondary: '#4F4F4F', // Dark Gray
          },
        }
      : {
          // Dark/Black Mode (For potential future Dark Mode Toggle)
          primary: {
            main: '#00BFFF',
          },
          secondary: {
            main: '#003366',
          },
          background: {
            default: '#121212',
            paper: '#1E1E1E',
          },
          text: {
            primary: '#E0E0E0',
            secondary: '#A0A0A0',
          },
        }),
  },
  // 3. Define Typography (Using Inter and Roboto as specified)
  typography: {
    fontFamily: ['Inter', 'Roboto', 'sans-serif'].join(','),
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    button: {
      textTransform: 'none', // Keep button text clean
    }
  },
  // 4. Define Component Overrides (For the 'Glossy' effect later)
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Subtle rounding
        },
      },
    },
    MuiPaper: {
        styleOverrides: {
            // We can add the glass/gloss effect here later using backdropFilter
            root: {
                boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.05)', // Subtle shadow
            }
        }
    }
  }
});

// 5. Theme Provider Component
export function ThemeProvider({ children }) {
  // Start with 'light' mode (the white/black glossy design)
  const [mode, setMode] = useState('light'); 

  const colorMode = useMemo(
    () => ({
      // Function to allow toggling the mode
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
      mode,
    }),
    [mode],
  );

  // Create the theme object based on the current mode
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeContext.Provider value={colorMode}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline enableColorScheme /> 
        {/* CssBaseline resets styles and applies the theme's background color */}
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}