'use client';
import { usePattern } from '../app/context/PatternContext';

function ClientSidePatternSelector() {
  const { selectedPattern, setSelectedPattern } = usePattern();

  const patterns = [
    { id: 'vortex', name: 'Vortex Pattern' },
    { id: 'mathPattern', name: 'Mathematical Flow' },
    { id: 'auroraWaves', name: 'Aurora Waves' },
    { id: 'matrix', name: 'Matrix Rain' },
  ];

  return (
    <nav>
      <ul className="space-y-2">
        {patterns.map((pattern) => (
          <li key={pattern.id}>
            <button
              className={`w-full text-left py-2 px-3 rounded transition-colors ${
                selectedPattern === pattern.id
                  ? 'bg-gray-700 text-white'
                  : 'hover:bg-gray-700 text-gray-300'
              }`}
              onClick={() => setSelectedPattern(pattern.id)}
            >
              {pattern.name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
export default ClientSidePatternSelector;
