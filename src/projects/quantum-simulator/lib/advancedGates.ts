import * as math from 'mathjs';
import { Gate, GateType } from '../types';

// Extended gate types
export type AdvancedGateType = GateType | 
  'S' | 'T' | 'Sdg' | 'Tdg' | 
  'RX' | 'RY' | 'RZ' | 
  'CRX' | 'CRY' | 'CRZ' |
  'CCX' | 'CCZ' | 'CSWAP' |
  'U1' | 'U2' | 'U3';

// Advanced gate interface
export interface AdvancedGate extends Gate {
  type: AdvancedGateType;
  angle?: number; // For rotation gates
  phase?: number; // For phase gates
  params?: number[]; // For U gates
}

// Advanced gate matrices
export const ADVANCED_GATES = {
  // Phase gates
  S: math.matrix([[1, 0], [0, math.i]]) as math.Matrix, // π/2 phase
  T: math.matrix([[1, 0], [0, math.exp(math.i * Math.PI / 4)]]) as math.Matrix, // π/4 phase
  Sdg: math.matrix([[1, 0], [0, -math.i]]) as math.Matrix, // -π/2 phase
  Tdg: math.matrix([[1, 0], [0, math.exp(-math.i * Math.PI / 4)]]) as math.Matrix, // -π/4 phase

  // Identity (already defined)
  I: math.matrix([[1, 0], [0, 1]]) as math.Matrix,
};

// Rotation gate factory
export function createRotationGate(type: 'RX' | 'RY' | 'RZ', angle: number): math.Matrix {
  const halfAngle = angle / 2;
  
  switch (type) {
    case 'RX':
      return math.matrix([
        [Math.cos(halfAngle), -math.i * Math.sin(halfAngle)],
        [-math.i * Math.sin(halfAngle), Math.cos(halfAngle)]
      ]) as math.Matrix;
    
    case 'RY':
      return math.matrix([
        [Math.cos(halfAngle), -Math.sin(halfAngle)],
        [Math.sin(halfAngle), Math.cos(halfAngle)]
      ]) as math.Matrix;
    
    case 'RZ':
      return math.matrix([
        [math.exp(-math.i * halfAngle), 0],
        [0, math.exp(math.i * halfAngle)]
      ]) as math.Matrix;
    
    default:
      throw new Error(`Unknown rotation gate type: ${type}`);
  }
}

// U gate factory (universal single-qubit gate)
export function createUGate(params: number[]): math.Matrix {
  if (params.length === 1) {
    // U1 gate (phase gate)
    const lambda = params[0];
    return math.matrix([
      [1, 0],
      [0, math.exp(math.i * lambda)]
    ]) as math.Matrix;
  } else if (params.length === 2) {
    // U2 gate
    const [phi, lambda] = params;
    return math.matrix([
      [1, -math.exp(math.i * lambda)],
      [math.exp(math.i * phi), math.exp(math.i * (phi + lambda))]
    ]) as math.Matrix * (1 / Math.sqrt(2));
  } else if (params.length === 3) {
    // U3 gate (most general single-qubit gate)
    const [theta, phi, lambda] = params;
    return math.matrix([
      [Math.cos(theta / 2), -math.exp(math.i * lambda) * Math.sin(theta / 2)],
      [math.exp(math.i * phi) * Math.sin(theta / 2), math.exp(math.i * (phi + lambda)) * Math.cos(theta / 2)]
    ]) as math.Matrix;
  } else {
    throw new Error('U gate requires 1, 2, or 3 parameters');
  }
}

// Multi-qubit gate matrices
export function createMultiQubitGate(type: 'CCX' | 'CCZ' | 'CSWAP', controlQubits: number[], targetQubit: number): math.Matrix {
  const numQubits = Math.max(...controlQubits, targetQubit) + 1;
  const size = Math.pow(2, numQubits);
  const matrix = math.zeros(size, size) as math.Matrix;
  
  // Set identity elements
  for (let i = 0; i < size; i++) {
    matrix.set([i, i], 1);
  }
  
  // Apply controlled operations
  for (let i = 0; i < size; i++) {
    const binary = i.toString(2).padStart(numQubits, '0');
    
    // Check if all control qubits are 1
    const allControlsActive = controlQubits.every(qubit => 
      binary[numQubits - 1 - qubit] === '1'
    );
    
    if (allControlsActive) {
      const targetBit = numQubits - 1 - targetQubit;
      const targetValue = binary[targetBit];
      
      if (type === 'CCX') {
        // Toffoli gate: flip target if both controls are 1
        const newBinary = binary.split('');
        newBinary[targetBit] = targetValue === '0' ? '1' : '0';
        const newIndex = parseInt(newBinary.join(''), 2);
        matrix.set([i, i], 0);
        matrix.set([i, newIndex], 1);
      } else if (type === 'CCZ') {
        // CCZ gate: apply Z to target if both controls are 1
        if (targetValue === '1') {
          matrix.set([i, i], -1);
        }
      } else if (type === 'CSWAP') {
        // CSWAP gate: swap target with another qubit if control is 1
        // This is a simplified version - would need additional target qubit
        // For now, just apply a phase
        matrix.set([i, i], math.i);
      }
    }
  }
  
  return matrix;
}

// Gate validation for advanced gates
export function validateAdvancedGate(gate: AdvancedGate, qubits: number): string[] {
  const errors: string[] = [];
  
  // Validate angle parameter for rotation gates
  if (['RX', 'RY', 'RZ', 'CRX', 'CRY', 'CRZ'].includes(gate.type)) {
    if (gate.angle === undefined) {
      errors.push(`${gate.type} gate requires an angle parameter`);
    } else if (typeof gate.angle !== 'number') {
      errors.push(`${gate.type} gate angle must be a number`);
    }
  }
  
  // Validate phase parameter for phase gates
  if (['U1'].includes(gate.type)) {
    if (gate.phase === undefined) {
      errors.push(`${gate.type} gate requires a phase parameter`);
    } else if (typeof gate.phase !== 'number') {
      errors.push(`${gate.type} gate phase must be a number`);
    }
  }
  
  // Validate parameters for U gates
  if (['U1', 'U2', 'U3'].includes(gate.type)) {
    if (!gate.params || !Array.isArray(gate.params)) {
      errors.push(`${gate.type} gate requires parameters array`);
    } else {
      const requiredParams = gate.type === 'U1' ? 1 : gate.type === 'U2' ? 2 : 3;
      if (gate.params.length !== requiredParams) {
        errors.push(`${gate.type} gate requires ${requiredParams} parameters`);
      }
    }
  }
  
  // Validate multi-qubit gates
  if (['CCX', 'CCZ', 'CSWAP'].includes(gate.type)) {
    if (!gate.controlQubit) {
      errors.push(`${gate.type} gate requires control qubit`);
    }
    if (gate.targetQubit === undefined) {
      errors.push(`${gate.type} gate requires target qubit`);
    }
  }
  
  return errors;
}

// Gate tooltips for advanced gates
export const ADVANCED_GATE_TOOLTIPS: Record<AdvancedGateType, string> = {
  // Basic gates (from original)
  X: 'Pauli-X Gate (NOT) - Flips qubit state',
  Y: 'Pauli-Y Gate - Phase flip with bit flip',
  Z: 'Pauli-Z Gate - Phase flip',
  H: 'Hadamard Gate - Creates superposition',
  CNOT: 'Controlled NOT Gate - Entangles qubits',
  SWAP: 'SWAP Gate - Exchanges qubit states',
  CZ: 'Controlled Z Gate - Controlled phase flip',
  CX: 'Controlled X Gate - Alternative CNOT',
  
  // Phase gates
  S: 'S Gate - π/2 phase shift (sqrt(Z))',
  T: 'T Gate - π/4 phase shift (sqrt(S))',
  Sdg: 'S† Gate - -π/2 phase shift (inverse of S)',
  Tdg: 'T† Gate - -π/4 phase shift (inverse of T)',
  
  // Rotation gates
  RX: 'RX Gate - Rotation around X-axis by given angle',
  RY: 'RY Gate - Rotation around Y-axis by given angle',
  RZ: 'RZ Gate - Rotation around Z-axis by given angle',
  
  // Controlled rotation gates
  CRX: 'Controlled RX Gate - Controlled rotation around X-axis',
  CRY: 'Controlled RY Gate - Controlled rotation around Y-axis',
  CRZ: 'Controlled RZ Gate - Controlled rotation around Z-axis',
  
  // Multi-qubit gates
  CCX: 'CCX Gate (Toffoli) - Controlled-controlled NOT',
  CCZ: 'CCZ Gate - Controlled-controlled Z',
  CSWAP: 'CSWAP Gate - Controlled SWAP',
  
  // Universal gates
  U1: 'U1 Gate - Single parameter phase gate',
  U2: 'U2 Gate - Two parameter gate',
  U3: 'U3 Gate - Universal single-qubit gate (3 parameters)',
};

// Gate icons for advanced gates (extend the original)
export const ADVANCED_GATE_ICONS: Record<AdvancedGateType, string> = {
  // Basic gates
  X: '❌',
  Y: '▲',
  Z: '▼',
  H: '〰️',
  CNOT: '🔗',
  SWAP: '⇄',
  CZ: '⬜',
  CX: '🔗',
  
  // Phase gates
  S: '⏰',
  T: '⏱️',
  Sdg: '⏰↺',
  Tdg: '⏱️↺',
  
  // Rotation gates
  RX: '🔄X',
  RY: '🔄Y',
  RZ: '🔄Z',
  
  // Controlled rotation gates
  CRX: '🔗🔄X',
  CRY: '🔗🔄Y',
  CRZ: '🔗🔄Z',
  
  // Multi-qubit gates
  CCX: '⚡',
  CCZ: '⚡Z',
  CSWAP: '⚡⇄',
  
  // Universal gates
  U1: 'U₁',
  U2: 'U₂',
  U3: 'U₃',
};

// Example circuits using advanced gates
export const ADVANCED_EXAMPLES = {
  quantumFourier: {
    name: 'Quantum Fourier Transform (2 qubits)',
    description: 'Simplified QFT using phase gates',
    qubits: 2,
    gates: [
      { id: 'qft-h-0', type: 'H', position: 0, targetQubit: 0 },
      { id: 'qft-s-1', type: 'S', position: 1, targetQubit: 1 },
      { id: 'qft-cnot-2', type: 'CNOT', position: 2, targetQubit: 1, controlQubit: 0 },
      { id: 'qft-h-3', type: 'H', position: 3, targetQubit: 1 }
    ]
  },
  
  toffoli: {
    name: 'Toffoli Gate (CCX)',
    description: 'Three-qubit controlled-controlled NOT gate',
    qubits: 3,
    gates: [
      { id: 'toffoli-ccx-0', type: 'CCX', position: 0, targetQubit: 2, controlQubit: 0 }
    ]
  },
  
  phaseEstimation: {
    name: 'Phase Estimation',
    description: 'Estimate phase using controlled rotations',
    qubits: 2,
    gates: [
      { id: 'phase-h-0', type: 'H', position: 0, targetQubit: 0 },
      { id: 'phase-crz-1', type: 'CRZ', position: 1, targetQubit: 1, controlQubit: 0, angle: Math.PI / 2 },
      { id: 'phase-h-2', type: 'H', position: 2, targetQubit: 0 }
    ]
  }
}; 