import { Gate, ValidationError } from '../types';

export const validateCircuit = (gates: Gate[], qubits: number): ValidationError[] => {
  const errors: ValidationError[] = [];
  
  // Check if we have any gates
  if (gates.length === 0) {
    errors.push({
      type: 'warning',
      message: 'No gates in circuit. Add some gates to run simulation.'
    });
    return errors;
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

    // Check if position exceeds max steps (assuming 10 steps max)
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

    // Check control qubit for CNOT gates
    if (gate.type === 'CNOT') {
      if (gate.controlQubit === undefined) {
        errors.push({
          type: 'error',
          message: `Gate ${index + 1}: CNOT gate requires a control qubit.`,
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
          message: `Gate ${index + 1}: CNOT gate control and target qubits must be different.`,
          gateIndex: index
        });
      }
    }

    // Check CZ gates
    if (gate.type === 'CZ') {
      if (gate.controlQubit === undefined) {
        errors.push({
          type: 'error',
          message: `Gate ${index + 1}: CZ gate requires a control qubit.`,
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
          message: `Gate ${index + 1}: CZ gate control and target qubits must be different.`,
          gateIndex: index
        });
      }
    }

    // Check CX gates
    if (gate.type === 'CX') {
      if (gate.controlQubit === undefined) {
        errors.push({
          type: 'error',
          message: `Gate ${index + 1}: CX gate requires a control qubit.`,
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
          message: `Gate ${index + 1}: CX gate control and target qubits must be different.`,
          gateIndex: index
        });
      }
    }

    // Check SWAP gates
    if (gate.type === 'SWAP') {
      if (gate.controlQubit === undefined) {
        errors.push({
          type: 'error',
          message: `Gate ${index + 1}: SWAP gate requires two qubits to swap.`,
          gateIndex: index
        });
      } else if (gate.targetQubit === gate.controlQubit) {
        errors.push({
          type: 'error',
          message: `Gate ${index + 1}: SWAP gate qubits must be different.`,
          gateIndex: index
        });
      }
    }
  });

  // Check for overlapping gates
  const gatePositions = new Map<string, number>();
  gates.forEach((gate, index) => {
    const key = `${gate.targetQubit}-${gate.position}`;
    if (gatePositions.has(key)) {
      errors.push({
        type: 'error',
        message: `Gates ${gatePositions.get(key)! + 1} and ${index + 1}: Multiple gates at same position on qubit ${gate.targetQubit}.`,
        gateIndex: index
      });
    } else {
      gatePositions.set(key, index);
    }
  });

  return errors;
};

export const validateSimulation = (gates: Gate[], qubits: number, shots: number): ValidationError[] => {
  const errors = validateCircuit(gates, qubits);
  
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

  return errors;
};

export const getCircuitDepth = (gates: Gate[]): number => {
  if (gates.length === 0) return 0;
  return Math.max(...gates.map(g => g.position)) + 1;
};

export const getCircuitWidth = (gates: Gate[]): number => {
  if (gates.length === 0) return 0;
  const qubits = new Set<number>();
  gates.forEach(gate => {
    if (gate.targetQubit !== undefined) qubits.add(gate.targetQubit);
    if (gate.controlQubit !== undefined) qubits.add(gate.controlQubit);
  });
  return qubits.size;
}; 