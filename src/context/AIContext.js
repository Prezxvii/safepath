import React, { createContext, useState, useContext } from 'react';

// Define the Context structure
export const AIContext = createContext({
  persona: 'teenager', 
  setPersona: () => {},
  openRouterKey: '', // Key is no longer provided here
});

// AI Provider Component
export function AIProvider({ children }) {
  const [persona, setPersona] = useState('teenager'); 

  // CRITICAL FIX: The API key must be removed from client-side code for security.
  // It is now handled exclusively and securely by the Vercel function (api/chat.js).
  const openRouterKey = ''; 

  const contextValue = {
    persona,
    setPersona,
    openRouterKey, // Still passed, but now an empty string
  };

  return (
    <AIContext.Provider value={contextValue}>
      {children}
    </AIContext.Provider>
  );
}

// Custom hook for easy access
export const useAI = () => useContext(AIContext);