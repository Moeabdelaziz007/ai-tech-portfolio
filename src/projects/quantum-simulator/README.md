# Quantum Circuit Simulator

A comprehensive, interactive quantum computing simulator built with React, TypeScript, and advanced mathematical libraries. This simulator allows users to design, build, and simulate quantum circuits with real-time visualization and educational examples.

## 🌟 Features

### **Core Functionality**
- **Visual Circuit Editor** - Drag-and-drop interface for building quantum circuits
- **Real-time Simulation** - Instant quantum state calculations and measurements
- **Multiple Gate Types** - Support for X, Y, Z, H, CNOT, SWAP, CZ, CX gates
- **Dual Simulation Modes** - Exact state vector calculations and sampling simulations
- **Interactive Results** - Charts and statistics for measurement outcomes

### **Educational Features**
- **Pre-built Examples** - Bell states, GHZ states, superposition demonstrations
- **Gate Tooltips** - Detailed explanations of each quantum gate's function
- **Circuit Validation** - Real-time error checking and helpful error messages
- **Visual Feedback** - Color-coded gates with intuitive icons

### **Advanced Features**
- **Mobile Support** - Touch-friendly interface for tablets and phones
- **Type Safety** - Comprehensive TypeScript interfaces and validation
- **Performance Optimized** - Efficient mathematical operations using Math.js
- **Accessibility** - Keyboard navigation and screen reader support

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+
- pnpm (recommended) or npm

### **Installation**
```bash
# Navigate to the quantum simulator directory
cd src/projects/quantum-simulator

# Install dependencies (if not already installed)
pnpm install
```

### **Running the Simulator**
```bash
# Start the development server
pnpm dev

# Open in browser
# Navigate to http://localhost:5173/projects/quantum-simulator
```

## 🎯 Usage Guide

### **Building Circuits**
1. **Select a Gate Type** - Choose from the dropdown menu in each qubit lane
2. **Add Gates** - Click on a step position to place the selected gate
3. **Remove Gates** - Click on any gate to remove it
4. **Adjust Circuit Size** - Use "Add Qubit" or "Remove Qubit" buttons

### **Running Simulations**
1. **Choose Simulation Type**:
   - **Exact Mode**: Calculates exact probabilities (faster, limited to small circuits)
   - **Sampling Mode**: Runs multiple measurements (slower, handles larger circuits)
2. **Set Number of Shots** (for sampling mode): 100-10,000 measurements
3. **Click "Run Simulation"** to execute the circuit

### **Understanding Results**
- **Bar Chart**: Shows measurement counts and probabilities
- **Results Table**: Detailed breakdown of each quantum state
- **Statistics**: Total measurements and unique states found

## 🔧 Technical Architecture

### **Project Structure**
```
src/projects/quantum-simulator/
├── components/           # React components
│   ├── CircuitEditor.tsx    # Main circuit builder
│   ├── QubitLane.tsx        # Individual qubit lanes
│   ├── ResultChart.tsx      # Results visualization
│   └── ErrorDisplay.tsx     # Error handling UI
├── lib/                  # Core logic
│   ├── simulator.ts         # Quantum simulation engine
│   └── validator.ts         # Circuit validation
├── types.ts              # TypeScript interfaces
├── pages/                # Page components
│   └── QuantumSimulatorPage.tsx
└── __tests__/            # Unit tests
    └── validator.test.ts
```

### **Key Technologies**
- **React 18** - UI framework with hooks and functional components
- **TypeScript** - Type safety and developer experience
- **Math.js** - Mathematical operations and matrix calculations
- **Chart.js** - Data visualization for results
- **React Icons** - Icon library for quantum gates
- **Tailwind CSS** - Utility-first styling

### **Quantum Simulation Engine**
The simulator uses a state vector approach:
1. **Initialization**: Start with |0⟩^⊗n state
2. **Gate Application**: Apply quantum gates as unitary matrices
3. **Tensor Products**: Calculate multi-qubit operations
4. **Measurement**: Compute probabilities for each basis state

## 🧪 Testing

### **Running Tests**
```bash
# Run all tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Run tests in watch mode
pnpm test:watch
```

### **Test Coverage**
- **Circuit Validation** - Tests for all gate types and error conditions
- **Simulation Logic** - Mathematical correctness of quantum operations
- **UI Components** - Component rendering and user interactions
- **Type Safety** - TypeScript interface compliance

## 📚 Educational Examples

### **Bell State (|00⟩ + |11⟩)**
```
q[0]: H ──●──
q[1]:     │
         X
```
- **Purpose**: Demonstrates quantum entanglement
- **Expected Result**: 50% |00⟩, 50% |11⟩

### **GHZ State (|000⟩ + |111⟩)**
```
q[0]: H ──●──●──
q[1]:     │  │
         X  │
q[2]:       │
           X
```
- **Purpose**: Three-qubit entanglement
- **Expected Result**: 50% |000⟩, 50% |111⟩

### **Superposition (|0⟩ + |1⟩)**
```
q[0]: H
```
- **Purpose**: Basic quantum superposition
- **Expected Result**: 50% |0⟩, 50% |1⟩

## 🔍 Gate Reference

| Gate | Symbol | Function | Matrix |
|------|--------|----------|---------|
| X | ❌ | Pauli-X (NOT) | [[0,1],[1,0]] |
| Y | ▲ | Pauli-Y | [[0,-i],[i,0]] |
| Z | ▼ | Pauli-Z | [[1,0],[0,-1]] |
| H | 〰️ | Hadamard | [[1,1],[1,-1]]/√2 |
| CNOT | 🔗 | Controlled NOT | Multi-qubit |
| SWAP | ⇄ | SWAP | Multi-qubit |
| CZ | ⬜ | Controlled Z | Multi-qubit |
| CX | 🔗 | Controlled X | Multi-qubit |

## 🚧 Error Handling

### **Validation Errors**
- **Position Errors**: Gates placed outside valid range
- **Qubit Errors**: Invalid qubit indices
- **Gate Conflicts**: Multiple gates at same position
- **Missing Parameters**: Required qubits for controlled gates

### **Simulation Errors**
- **Mathematical Errors**: Invalid circuit configurations
- **Performance Warnings**: Large circuits or shot counts
- **Memory Errors**: Circuits exceeding computational limits

## 🔮 Future Enhancements

### **Planned Features**
- **3D Visualization** - Bloch sphere representations
- **Circuit Export/Import** - Save and load circuit designs
- **Advanced Gates** - Phase gates, rotation gates
- **Quantum Algorithms** - Grover's, Shor's, QFT
- **Performance Optimization** - Web Workers for heavy calculations

### **Educational Improvements**
- **Interactive Tutorials** - Step-by-step learning
- **Algorithm Library** - Pre-built quantum algorithms
- **Visualization Tools** - State vector animations
- **Collaboration Features** - Share circuits with others

## 🤝 Contributing

### **Development Setup**
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

### **Code Standards**
- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting and formatting
- **Testing**: Minimum 80% test coverage
- **Documentation**: JSDoc comments for all functions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../../LICENSE) file for details.

## 🙏 Acknowledgments

- **Quantum Computing Community** - For educational resources and algorithms
- **Math.js Team** - For the excellent mathematical library
- **React Team** - For the powerful UI framework
- **Open Source Contributors** - For inspiration and code examples

---

**Built with 🤖 AI • ⚡ Tech • 🔮 Quantum Innovation** 