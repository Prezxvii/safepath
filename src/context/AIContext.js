import React, { createContext, useState, useContext } from 'react';

// Define the Context structure
export const AIContext = createContext({
  persona: 'teenager', 
  setPersona: () => {},
  openRouterKey: '', 
});

// AI Provider Component
export function AIProvider({ children }) {
  const [persona, setPersona] = useState('teenager'); 

  // WARNING: This key is now exposed publicly in the browser's source code.
  // It is only included here because you requested it.
  const openRouterKey = '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'; 

  const contextValue = {
    persona,
    setPersona,
    openRouterKey,
  };

  return (
    <AIContext.Provider value={contextValue}>
      {children}
    </AIContext.Provider>
  );
}

// Custom hook for easy access
export const useAI = () => useContext(AIContext);