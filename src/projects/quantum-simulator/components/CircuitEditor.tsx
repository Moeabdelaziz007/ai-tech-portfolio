import React, { useState } from 'react';
import { QubitLane } from './QubitLane';
import { Gate, CircuitEditorProps } from '../types';

export const CircuitEditor: React.FC<CircuitEditorProps> = ({
  qubits,
  gates,
  onQubitChange,
  onGatesChange
}) => {
  const [maxSteps] = useState(10);

  const addGate = (gate: Gate) => {
    // Check if there's already a gate at this position and qubit
    const existingGateIndex = gates.findIndex(
      g => g.position === gate.position && g.targetQubit === gate.targetQubit
    );
    
    if (existingGateIndex !== -1) {
      // Replace existing gate
      const newGates = [...gates];
      newGates[existingGateIndex] = gate;
      onGatesChange(newGates);
    } else {
      // Add new gate
      onGatesChange([...gates, gate]);
    }
  };

  const removeGate = (gateIndex: number) => {
    const newGates = gates.filter((_, index) => index !== gateIndex);
    onGatesChange(newGates);
  };

  const clearCircuit = () => {
    onGatesChange([]);
  };

  const getGatesForQubit = (qubitIndex: number): Gate[] => {
    return gates.filter(gate => gate.targetQubit === qubitIndex);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 circuit-editor">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">Quantum Circuit Editor</h3>
        <div className="flex gap-2">
          <button
            onClick={() => onQubitChange(qubits + 1)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors"
            disabled={qubits >= 8}
          >
            Add Qubit
          </button>
          <button
            onClick={() => onQubitChange(Math.max(1, qubits - 1))}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
            disabled={qubits <= 1}
          >
            Remove Qubit
          </button>
          <button
            onClick={clearCircuit}
            className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm transition-colors"
          >
            Clear Circuit
          </button>
        </div>
      </div>

      {/* Circuit header */}
      <div className="flex mb-4">
        <div className="w-20 text-center font-bold text-gray-600">Qubit</div>
        <div className="w-24 text-center font-bold text-gray-600">Gate Type</div>
        <div className="flex-1">
          <div className="flex">
            {Array.from({ length: maxSteps }).map((_, i) => (
              <div 
                key={i}
                className="flex-1 text-center text-xs text-gray-500 font-mono"
                style={{ width: '60px' }}
              >
                {i}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Circuit lanes */}
      <div className="border-2 border-gray-300 rounded-lg overflow-hidden circuit-container">
        {Array.from({ length: qubits }).map((_, i) => (
          <QubitLane
            key={i}
            qubitIndex={i}
            gates={getGatesForQubit(i)}
            onAddGate={addGate}
            onRemoveGate={removeGate}
            maxSteps={maxSteps}
          />
        ))}
      </div>

      {/* Circuit info */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <div className="text-sm text-gray-600">
          <p><strong>Qubits:</strong> {qubits}</p>
          <p><strong>Gates:</strong> {gates.length}</p>
          <p><strong>Steps:</strong> {maxSteps}</p>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2">Instructions:</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Select a gate type from the dropdown</li>
          <li>• Click on a step position to add the gate</li>
          <li>• Click on a gate to remove it</li>
          <li>• Use Add/Remove Qubit to adjust circuit size</li>
        </ul>
      </div>
    </div>
  );
}; 