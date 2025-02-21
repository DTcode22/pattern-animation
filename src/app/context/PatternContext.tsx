// src/context/PatternContext.tsx
'use client';

import React, { createContext, useContext, useState } from 'react';

type PatternContextType = {
  selectedPattern: string;
  setSelectedPattern: (pattern: string) => void;
};

const PatternContext = createContext<PatternContextType | undefined>(undefined);

export function PatternProvider({ children }: { children: React.ReactNode }) {
  const [selectedPattern, setSelectedPattern] = useState('vortex');

  return (
    <PatternContext.Provider value={{ selectedPattern, setSelectedPattern }}>
      {children}
    </PatternContext.Provider>
  );
}

export function usePattern() {
  const context = useContext(PatternContext);
  if (context === undefined) {
    throw new Error('usePattern must be used within a PatternProvider');
  }
  return context;
}
