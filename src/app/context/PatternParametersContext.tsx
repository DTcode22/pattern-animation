// src/context/PatternParametersContext.tsx
'use client';

import React, { createContext, useContext, useState } from 'react';

interface PatternParameters {
  vortex: {
    speed: number;
    density: number;
    scale: number;
    intensity: number;
  };
  mathPattern: {
    speed: number;
    density: number;
    scale: number;
    complexity: number;
  };
  auroraWaves: {
    speed: number;
    density: number;
    waveHeight: number;
    opacity: number;
  };
  warpingCircle: {
    speed: number;
    density: number;
    warpIntensity: number;
    scale: number;
  };
}

const defaultParameters: PatternParameters = {
  vortex: {
    speed: 0.03,
    density: 2,
    scale: 1,
    intensity: 1,
  },
  mathPattern: {
    speed: 0.03,
    density: 1,
    scale: 1,
    complexity: 1,
  },
  auroraWaves: {
    speed: 0.03,
    density: 3,
    waveHeight: 1,
    opacity: 1,
  },
  warpingCircle: {
    speed: 1,
    density: 0.1,
    warpIntensity: 1,
    scale: 1,
  },
};

interface PatternParametersContextType {
  parameters: PatternParameters;
  setParameters: React.Dispatch<React.SetStateAction<PatternParameters>>;
  resetParameters: () => void;
}

const PatternParametersContext = createContext<
  PatternParametersContextType | undefined
>(undefined);

export function PatternParametersProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [parameters, setParameters] =
    useState<PatternParameters>(defaultParameters);

  const resetParameters = () => {
    setParameters(defaultParameters);
  };

  return (
    <PatternParametersContext.Provider
      value={{ parameters, setParameters, resetParameters }}
    >
      {children}
    </PatternParametersContext.Provider>
  );
}

export function usePatternParameters() {
  const context = useContext(PatternParametersContext);
  if (context === undefined) {
    throw new Error(
      'usePatternParameters must be used within a PatternParametersProvider'
    );
  }
  return context;
}

export { defaultParameters };
