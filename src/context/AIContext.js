import React, { createContext, useState, useContext } from 'react';

// Define the Context structure
export const AIContext = createContext({
  persona: 'teenager', 
  setPersona: () => {},
  // openRouterKey is removed/empty for security
});

// AI Provider Component
export function AIProvider({ children }) {
  const [persona, setPersona] = useState('teenager'); 

  // CRITICAL: The API key is fully removed from client-side code for security.
  // It is now securely managed by the Render backend proxy.
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