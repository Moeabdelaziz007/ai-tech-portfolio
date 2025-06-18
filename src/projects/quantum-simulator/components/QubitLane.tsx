import React, { useState, useCallback } from 'react';
import { 
  FaTimes, 
  FaWaveSquare, 
  FaCaretUp, 
  FaCaretDown,
  FaLink,
  FaPlusSquare,
  FaExchangeAlt,
  FaSquare
} from 'react-icons/fa';
import { Gate, GateType, QubitLaneProps, GateComponentProps } from '../types';

// Gate Icons Mapping
const GATE_ICONS: Record<GateType, JSX.Element> = {
  X: <FaTimes className="text-red-500 text-xl" />,
  Y: <FaCaretUp className="text-yellow-500 text-xl" />,
  Z: <FaCaretDown className="text-blue-500 text-xl" />,
  H: <FaWaveSquare className="text-green-500 text-xl" />,
  CNOT: <FaLink className="text-purple-500 text-xl" />,
  SWAP: <FaExchangeAlt className="text-orange-500 text-xl" />,
  CZ: <FaPlusSquare className="text-teal-500 text-xl" />,
  CX: <FaLink className="text-indigo-500 text-xl" />
};

// Gate Tooltips Mapping
const GATE_TOOLTIPS: Record<GateType, string> = {
  X: 'Pauli-X Gate (NOT) - Flips qubit state',
  Y: 'Pauli-Y Gate - Phase flip with bit flip',
  Z: 'Pauli-Z Gate - Phase flip',
  H: 'Hadamard Gate - Creates superposition',
  CNOT: 'Controlled NOT Gate - Entangles qubits',
  SWAP: 'SWAP Gate - Exchanges qubit states',
  CZ: 'Controlled Z Gate - Controlled phase flip',
  CX: 'Controlled X Gate - Alternative CNOT'
};

const GateComponent: React.FC<GateComponentProps> = ({ gate, onRemove }) => {
  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove();
  }, [onRemove]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.stopPropagation();
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    e.stopPropagation();
    onRemove();
  }, [onRemove]);

  return (
    <div 
      className="absolute w-10 h-10 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-md gate-component touch-none"
      style={{ left: `${gate.position * 60 + 20}px` }}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      title={`${GATE_TOOLTIPS[gate.type]} - Click to remove`}
    >
      {GATE_ICONS[gate.type]}
    </div>
  );
};

export const QubitLane: React.FC<QubitLaneProps> = ({ 
  qubitIndex, 
  gates, 
  onAddGate, 
  onRemoveGate,
  maxSteps 
}) => {
  const [selectedGateType, setSelectedGateType] = useState<GateType>('X');

  const handleLaneClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const step = Math.floor((x - 20) / 60);
    
    if (step >= 0 && step < maxSteps) {
      const newGate: Gate = {
        id: `${qubitIndex}-${step}-${Date.now()}`,
        type: selectedGateType,
        position: step,
        targetQubit: qubitIndex
      };
      onAddGate(newGate);
    }
  }, [selectedGateType, qubitIndex, maxSteps, onAddGate]);

  const handleLaneTouch = useCallback((event: React.TouchEvent<HTMLDivElement>) => {
    event.preventDefault();
    const rect = event.currentTarget.getBoundingClientRect();
    const touch = event.touches[0];
    const x = touch.clientX - rect.left;
    const step = Math.floor((x - 20) / 60);
    
    if (step >= 0 && step < maxSteps) {
      const newGate: Gate = {
        id: `${qubitIndex}-${step}-${Date.now()}`,
        type: selectedGateType,
        position: step,
        targetQubit: qubitIndex
      };
      onAddGate(newGate);
    }
  }, [selectedGateType, qubitIndex, maxSteps, onAddGate]);

  const handleGateRemove = useCallback((gateIndex: number) => {
    onRemoveGate(gateIndex);
  }, [onRemoveGate]);

  return (
    <div className="flex items-center h-16 border-b border-gray-300 relative qubit-lane">
      {/* Qubit label with icon */}
      <div className="w-20 text-center font-mono text-sm text-gray-600 flex items-center justify-center">
        <FaSquare className="text-blue-500 mr-2" />
        <span className="hidden sm:inline">q[{qubitIndex}]</span>
        <span className="sm:hidden">q{qubitIndex}</span>
      </div>
      
      {/* Gate type selector */}
      <div className="w-24 px-2 gate-selector">
        <select 
          value={selectedGateType}
          onChange={(e) => setSelectedGateType(e.target.value as GateType)}
          className="w-full text-xs p-1 border rounded bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent focus-ring"
        >
          <option value="X">X (NOT)</option>
          <option value="Y">Y</option>
          <option value="Z">Z</option>
          <option value="H">H (Hadamard)</option>
          <option value="CNOT">CNOT</option>
          <option value="SWAP">SWAP</option>
          <option value="CZ">CZ</option>
          <option value="CX">CX</option>
        </select>
      </div>
      
      {/* Circuit lane */}
      <div 
        className="flex-1 h-8 border-b-2 border-gray-400 relative cursor-pointer hover:bg-gray-50 transition-colors touch-pan-y circuit-lane"
        onClick={handleLaneClick}
        onTouchStart={handleLaneTouch}
        title="Click or tap to add gate"
      >
        {/* Step markers */}
        {Array.from({ length: maxSteps }).map((_, i) => (
          <div 
            key={i}
            className="absolute w-1 h-8 bg-gray-300"
            style={{ left: `${i * 60 + 20}px` }}
          />
        ))}
        
        {/* Gates */}
        {gates.map((gate, index) => (
          <GateComponent 
            key={gate.id}
            gate={gate}
            onRemove={() => handleGateRemove(index)}
          />
        ))}
      </div>
    </div>
  );
}; 