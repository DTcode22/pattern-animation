'use client';

import React from 'react';
import { usePattern } from '../app/context/PatternContext';
import {
  usePatternParameters,
  defaultParameters,
} from '../app/context/PatternParametersContext';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

// Define a union type for the valid pattern names
type Pattern = 'vortex' | 'mathPattern' | 'auroraWaves' | 'warpingCircle';

// Define the shape for a single control configuration
interface ControlConfig {
  key: string;
  label: string;
  min: number;
  max: number;
  step: number;
}

// Explicitly type controlConfigs as a record using the Pattern type as keys
const controlConfigs: Record<Pattern, ControlConfig[]> = {
  vortex: [
    { key: 'speed', label: 'Speed', min: 0.01, max: 0.1, step: 0.01 },
    { key: 'density', label: 'Density', min: 1, max: 4, step: 0.1 },
    { key: 'scale', label: 'Scale', min: 0.5, max: 2, step: 0.1 },
    { key: 'intensity', label: 'Intensity', min: 0.5, max: 2, step: 0.1 },
  ],
  mathPattern: [
    { key: 'speed', label: 'Speed', min: 0.01, max: 0.1, step: 0.01 },
    { key: 'density', label: 'Density', min: 0.5, max: 2, step: 0.1 },
    { key: 'scale', label: 'Scale', min: 0.5, max: 2, step: 0.1 },
    { key: 'complexity', label: 'Complexity', min: 0.5, max: 2, step: 0.1 },
  ],
  auroraWaves: [
    { key: 'speed', label: 'Speed', min: 0.01, max: 0.1, step: 0.01 },
    { key: 'density', label: 'Density', min: 1, max: 6, step: 0.5 },
    { key: 'waveHeight', label: 'Wave Height', min: 0.5, max: 2, step: 0.1 },
    { key: 'opacity', label: 'Opacity', min: 0.5, max: 2, step: 0.1 },
  ],
  warpingCircle: [
    { key: 'speed', label: 'Speed', min: 0.5, max: 2, step: 0.1 },
    { key: 'density', label: 'Density', min: 0.05, max: 0.2, step: 0.01 },
    {
      key: 'warpIntensity',
      label: 'Warp Intensity',
      min: 0.5,
      max: 2,
      step: 0.1,
    },
    { key: 'scale', label: 'Scale', min: 0.5, max: 2, step: 0.1 },
  ],
};

const PatternControls = () => {
  const { selectedPattern } = usePattern();
  const { parameters, setParameters, resetParameters } = usePatternParameters();

  // Ensure that selectedPattern exists and is one of our keys.
  if (!selectedPattern || !((selectedPattern as Pattern) in controlConfigs)) {
    return <div>No pattern selected or invalid pattern.</div>;
  }

  const patternKey = selectedPattern as Pattern;
  // Assert that the parameters for the current pattern can be indexed by string.
  const patternParams = parameters[patternKey] as Record<string, number>;

  const handleSliderChange = (key: string, value: number) => {
    setParameters((prev) => ({
      ...prev,
      [patternKey]: {
        ...prev[patternKey],
        [key]: value,
      },
    }));
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Pattern Controls</h3>
        <Button
          onClick={resetParameters}
          variant="outline"
          className="bg-gray-700 text-white hover:bg-gray-600"
        >
          Reset to Default
        </Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {controlConfigs[patternKey].map(({ key, label, min, max, step }) => (
          <div key={key} className="flex flex-col gap-2">
            <label className="text-sm text-gray-300">{label}</label>
            <Slider
              min={min}
              max={max}
              step={step}
              value={[patternParams[key]]}
              onValueChange={([value]) => handleSliderChange(key, value)}
              className="w-full"
            />
            <span className="text-xs text-gray-400">
              {patternParams[key].toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatternControls;
