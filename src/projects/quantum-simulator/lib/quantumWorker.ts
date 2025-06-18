// Web Worker for quantum computations
// This file runs in a separate thread to avoid blocking the main UI

import * as math from 'mathjs';

interface WorkerMessage {
  type: 'SIMULATE' | 'VALIDATE' | 'ANALYZE';
  data: any;
  id: string;
}

interface SimulationRequest {
  gates: any[];
  qubits: number;
  shots: number;
  type: 'exact' | 'sampling';
}

interface ValidationRequest {
  gates: any[];
  qubits: number;
  shots: number;
}

interface AnalysisRequest {
  gates: any[];
  qubits: number;
}

// Quantum gate matrices
const GATES = {
  X: math.matrix([[0, 1], [1, 0]]) as math.Matrix,
  Y: math.matrix([[0, -math.i], [math.i, 0]]) as math.Matrix,
  Z: math.matrix([[1, 0], [0, -1]]) as math.Matrix,
  H: math.matrix([[1/Math.sqrt(2), 1/Math.sqrt(2)], [1/Math.sqrt(2), -1/Math.sqrt(2)]]) as math.Matrix,
  I: math.matrix([[1, 0], [0, 1]]) as math.Matrix,
  CZ: math.matrix([[1, 0], [0, -1]]) as math.Matrix,
  CX: math.matrix([[0, 1], [1, 0]]) as math.Matrix
};

class QuantumWorkerSimulator {
  private qubits: number;
  private state: math.Matrix;

  constructor(qubits: number) {
    this.qubits = qubits;
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

  private applyGate(gate: any): void {
    const gateMatrices: math.Matrix[] = [];
    
    for (let i = 0; i < this.qubits; i++) {
      if (gate.type === 'CNOT' && i === gate.controlQubit) {
        gateMatrices.push(GATES.I);
      } else if (gate.type === 'CNOT' && i === gate.targetQubit) {
        gateMatrices.push(GATES.X);
      } else if (gate.type === 'CZ' && i === gate.controlQubit) {
        gateMatrices.push(GATES.I);
      } else if (gate.type === 'CZ' && i === gate.targetQubit) {
        gateMatrices.push(GATES.Z);
      } else if (gate.type === 'CX' && i === gate.controlQubit) {
        gateMatrices.push(GATES.I);
      } else if (gate.type === 'CX' && i === gate.targetQubit) {
        gateMatrices.push(GATES.X);
      } else if (gate.type === 'SWAP' && (i === gate.targetQubit || i === gate.controlQubit)) {
        gateMatrices.push(GATES.I);
      } else if (i === gate.position) {
        gateMatrices.push(GATES[gate.type as keyof typeof GATES]);
      } else {
        gateMatrices.push(GATES.I);
      }
    }

    const circuitMatrix = this.tensorProduct(gateMatrices);
    this.state = math.multiply(circuitMatrix, this.state) as math.Matrix;
  }

  public runCircuit(gates: any[]): { [key: string]: number } {
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

// Handle messages from main thread
self.addEventListener('message', (event: MessageEvent<WorkerMessage>) => {
  const { type, data, id } = event.data;

  try {
    switch (type) {
      case 'SIMULATE':
        handleSimulation(data as SimulationRequest, id);
        break;
      case 'VALIDATE':
        handleValidation(data as ValidationRequest, id);
        break;
      case 'ANALYZE':
        handleAnalysis(data as AnalysisRequest, id);
        break;
      default:
        throw new Error(`Unknown message type: ${type}`);
    }
  } catch (error) {
    // Send error back to main thread
    (self as any).postMessage({
      type: 'ERROR',
      error: error instanceof Error ? error.message : 'Unknown error',
      id
    });
  }
});

function handleSimulation(request: SimulationRequest, id: string) {
  const { gates, qubits, shots, type } = request;
  
  if (type === 'exact') {
    const simulator = new QuantumWorkerSimulator(qubits);
    const results = simulator.runCircuit(gates);
    
    (self as any).postMessage({
      type: 'SIMULATION_RESULT',
      data: results,
      id
    });
  } else {
    // Sampling mode
    const simulator = new QuantumWorkerSimulator(qubits);
    const counts: { [key: string]: number } = {};
    
    for (let i = 0; i < shots; i++) {
      const result = simulator.measure();
      counts[result] = (counts[result] || 0) + 1;
    }
    
    (self as any).postMessage({
      type: 'SIMULATION_RESULT',
      data: counts,
      id
    });
  }
}

function handleValidation(request: ValidationRequest, id: string) {
  const { gates, qubits, shots } = request;
  const errors: any[] = [];
  
  // Check if we have any gates
  if (gates.length === 0) {
    errors.push({
      type: 'warning',
      message: 'No gates in circuit. Add some gates to run simulation.'
    });
  }

  // Validate each gate
  gates.forEach((gate, index) => {
    // Check gate position
    if (gate.position < 0) {
      errors.push({
        type: 'error',
        message: `Gate ${index + 1}: Invalid position ${gate.position}. Position must be non-negative.`,
        gateIndex: index
      });
    }

    // Check if position exceeds max steps
    if (gate.position >= 10) {
      errors.push({
        type: 'error',
        message: `Gate ${index + 1}: Position ${gate.position} exceeds maximum circuit depth (10).`,
        gateIndex: index
      });
    }

    // Check target qubit
    if (gate.targetQubit !== undefined) {
      if (gate.targetQubit < 0 || gate.targetQubit >= qubits) {
        errors.push({
          type: 'error',
          message: `Gate ${index + 1}: Target qubit ${gate.targetQubit} is out of range (0-${qubits - 1}).`,
          gateIndex: index
        });
      }
    }

    // Check control qubit for controlled gates
    if (['CNOT', 'CZ', 'CX'].includes(gate.type)) {
      if (gate.controlQubit === undefined) {
        errors.push({
          type: 'error',
          message: `Gate ${index + 1}: ${gate.type} gate requires a control qubit.`,
          gateIndex: index
        });
      } else if (gate.controlQubit < 0 || gate.controlQubit >= qubits) {
        errors.push({
          type: 'error',
          message: `Gate ${index + 1}: Control qubit ${gate.controlQubit} is out of range (0-${qubits - 1}).`,
          gateIndex: index
        });
      }
      
      if (gate.targetQubit === gate.controlQubit) {
        errors.push({
          type: 'error',
          message: `Gate ${index + 1}: ${gate.type} gate control and target qubits must be different.`,
          gateIndex: index
        });
      }
    }
  });

  // Check shots parameter
  if (shots < 1) {
    errors.push({
      type: 'error',
      message: 'Number of shots must be at least 1.'
    });
  }
  
  if (shots > 10000) {
    errors.push({
      type: 'warning',
      message: 'Large number of shots may take a while to compute.'
    });
  }

  (self as any).postMessage({
    type: 'VALIDATION_RESULT',
    data: errors,
    id
  });
}

function handleAnalysis(request: AnalysisRequest, id: string) {
  const { gates, qubits } = request;
  
  const depth = gates.length > 0 ? Math.max(...gates.map((g: any) => g.position)) + 1 : 0;
  const width = qubits;
  const complexity = gates.length * depth * width;
  
  const qubitUsage = new Set<number>();
  gates.forEach((gate: any) => {
    if (gate.targetQubit !== undefined) qubitUsage.add(gate.targetQubit);
    if (gate.controlQubit !== undefined) qubitUsage.add(gate.controlQubit);
  });
  
  const analysis = {
    qubits,
    gates: gates.length,
    depth,
    width: qubitUsage.size,
    complexity,
    qubitUsage: Array.from(qubitUsage),
    gateTypes: gates.reduce((acc: any, gate: any) => {
      acc[gate.type] = (acc[gate.type] || 0) + 1;
      return acc;
    }, {})
  };

  (self as any).postMessage({
    type: 'ANALYSIS_RESULT',
    data: analysis,
    id
  });
}

// Notify that worker is ready
(self as any).postMessage({ type: 'WORKER_READY' }); 