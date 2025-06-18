// Quantum Gate Types
export type GateType = 'X' | 'Y' | 'Z' | 'H' | 'CNOT' | 'SWAP' | 'CZ' | 'CX' | 'S' | 'T' | 'Sdg' | 'Tdg' | 'RX' | 'RY' | 'RZ' | 'CRX' | 'CRY' | 'CRZ' | 'CCX' | 'CCZ' | 'CSWAP' | 'U1' | 'U2' | 'U3';

// Advanced Gate Types
export type AdvancedGateType = 'S' | 'T' | 'Sdg' | 'Tdg' | 'RX' | 'RY' | 'RZ' | 'CRX' | 'CRY' | 'CRZ' | 'CCX' | 'CCZ' | 'CSWAP' | 'U1' | 'U2' | 'U3';

// Quantum Gate Interface
export interface Gate {
  id: string;
  type: GateType;
  position: number;
  targetQubit?: number;
  controlQubit?: number;
}

// Circuit Editor Props
export interface CircuitEditorProps {
  qubits: number;
  gates: Gate[];
  onQubitChange: (count: number) => void;
  onGatesChange: (gates: Gate[]) => void;
}

// Qubit Lane Props
export interface QubitLaneProps {
  qubitIndex: number;
  gates: Gate[];
  onAddGate: (gate: Gate) => void;
  onRemoveGate: (index: number) => void;
  maxSteps: number;
}

// Gate Component Props
export interface GateComponentProps {
  gate: Gate;
  onRemove: () => void;
}

// Result Chart Props
export interface ResultChartProps {
  counts: { [key: string]: number };
  title?: string;
}

// Error Display Props
export interface ErrorDisplayProps {
  errors: ValidationError[];
  onClear?: () => void;
}

// Validation Error Interface
export interface ValidationError {
  type: 'error' | 'warning';
  message: string;
  gateIndex?: number;
}

// Simulation Results Interface
export interface SimulationResults {
  counts: { [key: string]: number };
  probabilities: { [key: string]: number };
  totalShots: number;
  uniqueStates: number;
}

// Circuit Statistics Interface
export interface CircuitStats {
  qubits: number;
  gates: number;
  depth: number;
  width: number;
  complexity: number;
}

// Example Circuit Interface
export interface ExampleCircuit {
  id: string;
  name: string;
  description: string;
  gates: Gate[];
  qubits: number;
  category: 'basic' | 'entanglement' | 'algorithm';
}

// Simulation Settings Interface
export interface SimulationSettings {
  type: 'exact' | 'sampling';
  shots: number;
  maxDepth: number;
  maxQubits: number;
}

// UI State Interface
export interface UIState {
  selectedGateType: GateType;
  isSimulating: boolean;
  showErrors: boolean;
  showHelp: boolean;
  theme: 'light' | 'dark';
}

// Performance Metrics Interface
export interface PerformanceMetrics {
  simulationTime: number;
  memoryUsage: number;
  gateCount: number;
  circuitDepth: number;
} 