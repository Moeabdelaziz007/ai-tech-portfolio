import * as math from 'mathjs';
import { Gate, GateType } from '../types';

// Quantum gate matrices
const GATES = {
  X: math.matrix([[0, 1], [1, 0]]) as math.Matrix,
  Y: math.matrix([[0, -math.i], [math.i, 0]]) as math.Matrix,
  Z: math.matrix([[1, 0], [0, -1]]) as math.Matrix,
  H: math.matrix([[1/Math.sqrt(2), 1/Math.sqrt(2)], [1/Math.sqrt(2), -1/Math.sqrt(2)]]) as math.Matrix,
  I: math.matrix([[1, 0], [0, 1]]) as math.Matrix, // Identity
  // CZ and CX are the same as CNOT for single qubit operations
  CZ: math.matrix([[1, 0], [0, -1]]) as math.Matrix,
  CX: math.matrix([[0, 1], [1, 0]]) as math.Matrix
};

export class QuantumSimulator {
  private qubits: number;
  private state: math.Matrix;

  constructor(qubits: number) {
    this.qubits = qubits;
    // Initialize to |0⟩^⊗n
    this.state = math.zeros(Math.pow(2, qubits), 1) as math.Matrix;
    this.state.set([0, 0], 1);
  }

  private tensorProduct(matrices: math.Matrix[]): math.Matrix {
    let result = matrices[0];
    for (let i = 1; i < matrices.length; i++) {
      result = math.kron(result, matrices[i]) as math.Matrix;
    }
    return result;
  }

  private applyGate(gate: Gate): void {
    const gateMatrices: math.Matrix[] = [];
    
    for (let i = 0; i < this.qubits; i++) {
      if (gate.type === 'CNOT' && i === gate.controlQubit) {
        // Control qubit - apply identity
        gateMatrices.push(GATES.I);
      } else if (gate.type === 'CNOT' && i === gate.targetQubit) {
        // Target qubit - apply X gate
        gateMatrices.push(GATES.X);
      } else if (gate.type === 'CZ' && i === gate.controlQubit) {
        // Control qubit - apply identity
        gateMatrices.push(GATES.I);
      } else if (gate.type === 'CZ' && i === gate.targetQubit) {
        // Target qubit - apply Z gate
        gateMatrices.push(GATES.Z);
      } else if (gate.type === 'CX' && i === gate.controlQubit) {
        // Control qubit - apply identity
        gateMatrices.push(GATES.I);
      } else if (gate.type === 'CX' && i === gate.targetQubit) {
        // Target qubit - apply X gate (same as CNOT)
        gateMatrices.push(GATES.X);
      } else if (gate.type === 'SWAP' && (i === gate.targetQubit || i === gate.controlQubit)) {
        // For SWAP, we'll handle it specially
        gateMatrices.push(GATES.I);
      } else if (i === gate.position) {
        // Apply the specified gate
        gateMatrices.push(GATES[gate.type as keyof typeof GATES]);
      } else {
        // Identity for other qubits
        gateMatrices.push(GATES.I);
      }
    }

    const circuitMatrix = this.tensorProduct(gateMatrices);
    this.state = math.multiply(circuitMatrix, this.state) as math.Matrix;
  }

  public runCircuit(gates: Gate[]): { [key: string]: number } {
    // Reset to initial state
    this.state = math.zeros(Math.pow(2, this.qubits), 1) as math.Matrix;
    this.state.set([0, 0], 1);

    // Apply gates in order
    gates.forEach(gate => {
      this.applyGate(gate);
    });

    // Calculate measurement probabilities
    const probabilities: { [key: string]: number } = {};
    const size = this.state.size()[0];
    
    for (let i = 0; i < size; i++) {
      const amplitude = this.state.get([i, 0]);
      const realPart = (math.re(amplitude) as any).valueOf();
      const imagPart = (math.im(amplitude) as any).valueOf();
      const probability = realPart * realPart + imagPart * imagPart;
      const binary = i.toString(2).padStart(this.qubits, '0');
      probabilities[binary] = probability;
    }

    return probabilities;
  }

  public getStateVector(): math.Matrix {
    return this.state;
  }

  public measure(): string {
    const probabilities = this.runCircuit([]);
    const random = Math.random();
    let cumulative = 0;
    
    for (const [state, prob] of Object.entries(probabilities)) {
      cumulative += prob;
      if (random <= cumulative) {
        return state;
      }
    }
    
    return '0'.repeat(this.qubits);
  }
}

export const simulateCircuit = (gates: Gate[], qubits: number): { [key: string]: number } => {
  const simulator = new QuantumSimulator(qubits);
  return simulator.runCircuit(gates);
};

export const runMultipleMeasurements = (gates: Gate[], qubits: number, shots: number = 1000): { [key: string]: number } => {
  const simulator = new QuantumSimulator(qubits);
  const counts: { [key: string]: number } = {};
  
  for (let i = 0; i < shots; i++) {
    const result = simulator.measure();
    counts[result] = (counts[result] || 0) + 1;
  }
  
  return counts;
}; 