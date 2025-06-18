import { validateCircuit, validateSimulation } from '../lib/validator';
import { Gate } from '../types';

describe('Circuit Validation', () => {
  const validGate: Gate = {
    id: '1',
    type: 'X',
    position: 0,
    targetQubit: 0
  };

  test('validates correct circuit', () => {
    const gates: Gate[] = [
      { ...validGate, position: 0 },
      { ...validGate, position: 1, type: 'H', id: '2' }
    ];
    expect(validateCircuit(gates, 2)).toHaveLength(0);
  });

  test('detects position overflow', () => {
    const gates: Gate[] = [
      { ...validGate, position: 3 }
    ];
    const errors = validateCircuit(gates, 2);
    expect(errors.some(e => e.message.includes('exceeds maximum circuit depth'))).toBe(true);
  });

  test('validates CNOT requirements', () => {
    const gates: Gate[] = [
      { 
        id: '1',
        type: 'CNOT',
        position: 0,
        targetQubit: 1,
        controlQubit: 0
      }
    ];
    expect(validateCircuit(gates, 2)).toHaveLength(0);
  });

  test('detects invalid CNOT', () => {
    const gates: Gate[] = [
      { 
        id: '1',
        type: 'CNOT',
        position: 0,
        targetQubit: 1
        // Missing controlQubit
      }
    ];
    const errors = validateCircuit(gates, 2);
    expect(errors.some(e => e.message.includes('CNOT gate requires a control qubit'))).toBe(true);
  });

  test('validates CZ requirements', () => {
    const gates: Gate[] = [
      { 
        id: '1',
        type: 'CZ',
        position: 0,
        targetQubit: 1,
        controlQubit: 0
      }
    ];
    expect(validateCircuit(gates, 2)).toHaveLength(0);
  });

  test('detects invalid CZ', () => {
    const gates: Gate[] = [
      { 
        id: '1',
        type: 'CZ',
        position: 0,
        targetQubit: 1
        // Missing controlQubit
      }
    ];
    const errors = validateCircuit(gates, 2);
    expect(errors.some(e => e.message.includes('CZ gate requires a control qubit'))).toBe(true);
  });

  test('validates CX requirements', () => {
    const gates: Gate[] = [
      { 
        id: '1',
        type: 'CX',
        position: 0,
        targetQubit: 1,
        controlQubit: 0
      }
    ];
    expect(validateCircuit(gates, 2)).toHaveLength(0);
  });

  test('detects invalid CX', () => {
    const gates: Gate[] = [
      { 
        id: '1',
        type: 'CX',
        position: 0,
        targetQubit: 1
        // Missing controlQubit
      }
    ];
    const errors = validateCircuit(gates, 2);
    expect(errors.some(e => e.message.includes('CX gate requires a control qubit'))).toBe(true);
  });

  test('validates SWAP requirements', () => {
    const gates: Gate[] = [
      { 
        id: '1',
        type: 'SWAP',
        position: 0,
        targetQubit: 1,
        controlQubit: 0
      }
    ];
    expect(validateCircuit(gates, 2)).toHaveLength(0);
  });

  test('detects invalid SWAP', () => {
    const gates: Gate[] = [
      { 
        id: '1',
        type: 'SWAP',
        position: 0,
        targetQubit: 1
        // Missing controlQubit
      }
    ];
    const errors = validateCircuit(gates, 2);
    expect(errors.some(e => e.message.includes('SWAP gate requires two qubits to swap'))).toBe(true);
  });

  test('detects overlapping gates', () => {
    const gates: Gate[] = [
      { ...validGate, position: 0, targetQubit: 0 },
      { ...validGate, position: 0, targetQubit: 0, id: '2' } // Same position and qubit
    ];
    const errors = validateCircuit(gates, 2);
    expect(errors.some(e => e.message.includes('Multiple gates at same position'))).toBe(true);
  });

  test('validates simulation settings', () => {
    const gates: Gate[] = [validGate];
    const errors = validateSimulation(gates, 2, 1000);
    expect(errors.length).toBe(0);
  });

  test('detects invalid shots', () => {
    const gates: Gate[] = [validGate];
    const errors = validateSimulation(gates, 2, 0);
    expect(errors.some(e => e.message.includes('Number of shots must be at least 1'))).toBe(true);
  });

  test('warns about large shots', () => {
    const gates: Gate[] = [validGate];
    const errors = validateSimulation(gates, 2, 15000);
    expect(errors.some(e => e.message.includes('Large number of shots may take a while'))).toBe(true);
  });

  test('handles empty circuit', () => {
    const errors = validateCircuit([], 2);
    expect(errors.some(e => e.type === 'warning' && e.message.includes('No gates in circuit'))).toBe(true);
  });
}); 