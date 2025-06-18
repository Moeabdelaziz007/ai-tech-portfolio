import { Gate, CircuitStats, ExampleCircuit } from '../types';

export interface CircuitData {
  id: string;
  name: string;
  description: string;
  qubits: number;
  gates: Gate[];
  createdAt: string;
  updatedAt: string;
  tags: string[];
  category: 'basic' | 'entanglement' | 'algorithm' | 'custom';
  metadata?: {
    author?: string;
    version?: string;
    complexity?: number;
  };
}

export interface CircuitExport {
  version: '1.0';
  circuit: CircuitData;
  timestamp: string;
  exportFormat: 'json' | 'qasm' | 'qiskit';
}

// Local Storage Keys
const STORAGE_KEYS = {
  CIRCUITS: 'quantum_circuits',
  FAVORITES: 'quantum_favorites',
  RECENT: 'quantum_recent'
};

// Circuit Storage Class
export class CircuitStorage {
  private static instance: CircuitStorage;
  
  private constructor() {}

  static getInstance(): CircuitStorage {
    if (!CircuitStorage.instance) {
      CircuitStorage.instance = new CircuitStorage();
    }
    return CircuitStorage.instance;
  }

  // Save circuit to local storage
  saveCircuit(circuit: CircuitData): void {
    try {
      const circuits = this.getAllCircuits();
      const existingIndex = circuits.findIndex(c => c.id === circuit.id);
      
      if (existingIndex >= 0) {
        circuits[existingIndex] = {
          ...circuit,
          updatedAt: new Date().toISOString()
        };
      } else {
        circuits.push({
          ...circuit,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      }

      localStorage.setItem(STORAGE_KEYS.CIRCUITS, JSON.stringify(circuits));
      this.addToRecent(circuit.id);
    } catch (error) {
      console.error('Error saving circuit:', error);
      throw new Error('Failed to save circuit');
    }
  }

  // Load circuit from local storage
  loadCircuit(id: string): CircuitData | null {
    try {
      const circuits = this.getAllCircuits();
      return circuits.find(c => c.id === id) || null;
    } catch (error) {
      console.error('Error loading circuit:', error);
      return null;
    }
  }

  // Get all saved circuits
  getAllCircuits(): CircuitData[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CIRCUITS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading circuits:', error);
      return [];
    }
  }

  // Delete circuit
  deleteCircuit(id: string): boolean {
    try {
      const circuits = this.getAllCircuits();
      const filtered = circuits.filter(c => c.id !== id);
      localStorage.setItem(STORAGE_KEYS.CIRCUITS, JSON.stringify(filtered));
      this.removeFromRecent(id);
      return true;
    } catch (error) {
      console.error('Error deleting circuit:', error);
      return false;
    }
  }

  // Export circuit to JSON
  exportCircuit(circuit: CircuitData, format: 'json' | 'qasm' | 'qiskit' = 'json'): string {
    const exportData: CircuitExport = {
      version: '1.0',
      circuit,
      timestamp: new Date().toISOString(),
      exportFormat: format
    };

    switch (format) {
      case 'json':
        return JSON.stringify(exportData, null, 2);
      case 'qasm':
        return this.toQASM(circuit);
      case 'qiskit':
        return this.toQiskit(circuit);
      default:
        return JSON.stringify(exportData, null, 2);
    }
  }

  // Import circuit from JSON
  importCircuit(data: string): CircuitData {
    try {
      const parsed = JSON.parse(data);
      
      if (parsed.version && parsed.circuit) {
        // Validate circuit data
        if (!parsed.circuit.id || !parsed.circuit.name || !parsed.circuit.gates) {
          throw new Error('Invalid circuit data format');
        }
        
        // Generate new ID to avoid conflicts
        const circuit = {
          ...parsed.circuit,
          id: this.generateId(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        return circuit;
      } else {
        throw new Error('Invalid export format');
      }
    } catch (error) {
      console.error('Error importing circuit:', error);
      throw new Error('Failed to import circuit');
    }
  }

  // Convert to QASM format
  private toQASM(circuit: CircuitData): string {
    let qasm = `// Quantum Assembly Language (QASM) Export\n`;
    qasm += `// Circuit: ${circuit.name}\n`;
    qasm += `// Generated: ${new Date().toISOString()}\n\n`;
    
    qasm += `OPENQASM 2.0;\n`;
    qasm += `include "qelib1.inc";\n\n`;
    qasm += `qreg q[${circuit.qubits}];\n`;
    qasm += `creg c[${circuit.qubits}];\n\n`;

    // Sort gates by position
    const sortedGates = [...circuit.gates].sort((a, b) => a.position - b.position);
    
    sortedGates.forEach((gate, index) => {
      switch (gate.type) {
        case 'X':
          qasm += `x q[${gate.targetQubit}];\n`;
          break;
        case 'Y':
          qasm += `y q[${gate.targetQubit}];\n`;
          break;
        case 'Z':
          qasm += `z q[${gate.targetQubit}];\n`;
          break;
        case 'H':
          qasm += `h q[${gate.targetQubit}];\n`;
          break;
        case 'CNOT':
          qasm += `cx q[${gate.controlQubit}], q[${gate.targetQubit}];\n`;
          break;
        case 'SWAP':
          qasm += `swap q[${gate.controlQubit}], q[${gate.targetQubit}];\n`;
          break;
        case 'CZ':
          qasm += `cz q[${gate.controlQubit}], q[${gate.targetQubit}];\n`;
          break;
        case 'CX':
          qasm += `cx q[${gate.controlQubit}], q[${gate.targetQubit}];\n`;
          break;
      }
    });

    qasm += `\n// Measurement\n`;
    for (let i = 0; i < circuit.qubits; i++) {
      qasm += `measure q[${i}] -> c[${i}];\n`;
    }

    return qasm;
  }

  // Convert to Qiskit format
  private toQiskit(circuit: CircuitData): string {
    let qiskit = `# Qiskit Circuit Export\n`;
    qiskit += `# Circuit: ${circuit.name}\n`;
    qiskit += `# Generated: ${new Date().toISOString()}\n\n`;
    
    qiskit += `from qiskit import QuantumCircuit, QuantumRegister, ClassicalRegister\n`;
    qiskit += `from qiskit import execute, Aer\n\n`;
    
    qiskit += `# Create quantum and classical registers\n`;
    qiskit += `q = QuantumRegister(${circuit.qubits}, 'q')\n`;
    qiskit += `c = ClassicalRegister(${circuit.qubits}, 'c')\n`;
    qiskit += `qc = QuantumCircuit(q, c)\n\n`;

    // Sort gates by position
    const sortedGates = [...circuit.gates].sort((a, b) => a.position - b.position);
    
    sortedGates.forEach((gate, index) => {
      switch (gate.type) {
        case 'X':
          qiskit += `qc.x(q[${gate.targetQubit}])\n`;
          break;
        case 'Y':
          qiskit += `qc.y(q[${gate.targetQubit}])\n`;
          break;
        case 'Z':
          qiskit += `qc.z(q[${gate.targetQubit}])\n`;
          break;
        case 'H':
          qiskit += `qc.h(q[${gate.targetQubit}])\n`;
          break;
        case 'CNOT':
          qiskit += `qc.cx(q[${gate.controlQubit}], q[${gate.targetQubit}])\n`;
          break;
        case 'SWAP':
          qiskit += `qc.swap(q[${gate.controlQubit}], q[${gate.targetQubit}])\n`;
          break;
        case 'CZ':
          qiskit += `qc.cz(q[${gate.controlQubit}], q[${gate.targetQubit}])\n`;
          break;
        case 'CX':
          qiskit += `qc.cx(q[${gate.controlQubit}], q[${gate.targetQubit}])\n`;
          break;
      }
    });

    qiskit += `\n# Add measurements\n`;
    qiskit += `qc.measure(q, c)\n\n`;
    
    qiskit += `# Execute the circuit\n`;
    qiskit += `backend = Aer.get_backend('qasm_simulator')\n`;
    qiskit += `job = execute(qc, backend, shots=1000)\n`;
    qiskit += `result = job.result()\n`;
    qiskit += `counts = result.get_counts(qc)\n`;
    qiskit += `print(counts)\n`;

    return qiskit;
  }

  // Generate unique ID
  private generateId(): string {
    return `circuit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Recent circuits management
  private addToRecent(circuitId: string): void {
    try {
      const recent = this.getRecentCircuits();
      const filtered = recent.filter(id => id !== circuitId);
      const updated = [circuitId, ...filtered].slice(0, 10); // Keep last 10
      localStorage.setItem(STORAGE_KEYS.RECENT, JSON.stringify(updated));
    } catch (error) {
      console.error('Error updating recent circuits:', error);
    }
  }

  private removeFromRecent(circuitId: string): void {
    try {
      const recent = this.getRecentCircuits();
      const filtered = recent.filter(id => id !== circuitId);
      localStorage.setItem(STORAGE_KEYS.RECENT, JSON.stringify(filtered));
    } catch (error) {
      console.error('Error removing from recent:', error);
    }
  }

  getRecentCircuits(): string[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.RECENT);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading recent circuits:', error);
      return [];
    }
  }

  // Favorites management
  toggleFavorite(circuitId: string): boolean {
    try {
      const favorites = this.getFavorites();
      const isFavorite = favorites.includes(circuitId);
      
      if (isFavorite) {
        const filtered = favorites.filter(id => id !== circuitId);
        localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(filtered));
      } else {
        favorites.push(circuitId);
        localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
      }
      
      return !isFavorite;
    } catch (error) {
      console.error('Error toggling favorite:', error);
      return false;
    }
  }

  getFavorites(): string[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading favorites:', error);
      return [];
    }
  }

  // Search circuits
  searchCircuits(query: string): CircuitData[] {
    const circuits = this.getAllCircuits();
    const lowerQuery = query.toLowerCase();
    
    return circuits.filter(circuit => 
      circuit.name.toLowerCase().includes(lowerQuery) ||
      circuit.description.toLowerCase().includes(lowerQuery) ||
      circuit.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }

  // Get circuit statistics
  getCircuitStats(circuit: CircuitData): CircuitStats {
    const depth = Math.max(...circuit.gates.map(g => g.position)) + 1;
    const width = circuit.qubits;
    const complexity = circuit.gates.length * depth * width;
    
    return {
      qubits: circuit.qubits,
      gates: circuit.gates.length,
      depth,
      width,
      complexity
    };
  }
}

// Export singleton instance
export const circuitStorage = CircuitStorage.getInstance(); 