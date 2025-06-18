import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Upload, BookOpen, Settings } from "lucide-react";
import { CircuitEditor } from "../components/CircuitEditor";
import { ResultChart } from "../components/ResultChart";
import { ErrorDisplay } from "../components/ErrorDisplay";
import { QuantumState3D } from "../components/QuantumState3D";
import { InteractiveTutorial } from "../components/InteractiveTutorial";
import { simulateCircuit, runMultipleMeasurements } from "../lib/simulator";
import { validateSimulation } from "../lib/validator";
import { circuitStorage, CircuitData } from "../lib/circuitStorage";
import { Gate, ValidationError, GateType, AdvancedGateType } from "../types";
import {
  ADVANCED_GATE_TOOLTIPS,
  ADVANCED_EXAMPLES,
} from "../lib/advancedGates";

export const QuantumSimulatorPage: React.FC = () => {
  const navigate = useNavigate();
  const [qubits, setQubits] = useState(3);
  const [gates, setGates] = useState<Gate[]>([]);
  const [results, setResults] = useState<{ [key: string]: number } | null>(
    null,
  );
  const [isSimulating, setIsSimulating] = useState(false);
  const [shots, setShots] = useState(1000);
  const [simulationType, setSimulationType] = useState<"exact" | "sampling">(
    "sampling",
  );
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [simulationError, setSimulationError] = useState<string | null>(null);

  // New features state
  const [show3D, setShow3D] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [savedCircuits, setSavedCircuits] = useState<CircuitData[]>([]);
  const [showCircuitManager, setShowCircuitManager] = useState(false);
  const [selectedCircuit, setSelectedCircuit] = useState<CircuitData | null>(
    null,
  );

  // Load saved circuits on mount
  useEffect(() => {
    const circuits = circuitStorage.getAllCircuits();
    setSavedCircuits(circuits);
  }, []);

  // Validate circuit whenever gates or qubits change
  useEffect(() => {
    const validationErrors = validateSimulation(gates, qubits, shots);
    setErrors(validationErrors);
  }, [gates, qubits, shots]);

  const runSimulation = async () => {
    setSimulationError(null);

    const validationErrors = validateSimulation(gates, qubits, shots);
    const hasErrors = validationErrors.some((e) => e.type === "error");

    if (hasErrors) {
      setErrors(validationErrors);
      return;
    }

    if (gates.length === 0) {
      setSimulationError("Please add some gates to the circuit first!");
      return;
    }

    setIsSimulating(true);

    try {
      let simulationResults: { [key: string]: number };

      if (simulationType === "exact") {
        simulationResults = simulateCircuit(gates, qubits);
      } else {
        simulationResults = runMultipleMeasurements(gates, qubits, shots);
      }

      setResults(simulationResults);
      setErrors([]);
    } catch (error) {
      console.error("Simulation error:", error);
      setSimulationError(
        "Error running simulation. Please check your circuit configuration.",
      );
    } finally {
      setIsSimulating(false);
    }
  };

  const loadExampleCircuit = (example: string) => {
    setGates([]);
    setResults(null);
    setSimulationError(null);

    switch (example) {
      case "bell":
        setQubits(2);
        setGates([
          { id: "bell-h-0", type: "H", position: 0, targetQubit: 0 },
          {
            id: "bell-cnot-1",
            type: "CNOT",
            position: 1,
            targetQubit: 1,
            controlQubit: 0,
          },
        ]);
        break;
      case "ghz":
        setQubits(3);
        setGates([
          { id: "ghz-h-0", type: "H", position: 0, targetQubit: 0 },
          {
            id: "ghz-cnot-1",
            type: "CNOT",
            position: 1,
            targetQubit: 1,
            controlQubit: 0,
          },
          {
            id: "ghz-cnot-2",
            type: "CNOT",
            position: 2,
            targetQubit: 2,
            controlQubit: 0,
          },
        ]);
        break;
      case "superposition":
        setQubits(1);
        setGates([
          { id: "superposition-h-0", type: "H", position: 0, targetQubit: 0 },
        ]);
        break;
      case "quantumFourier":
        const qftExample = ADVANCED_EXAMPLES.quantumFourier;
        setQubits(qftExample.qubits);
        setGates(qftExample.gates as Gate[]);
        break;
      case "toffoli":
        const toffoliExample = ADVANCED_EXAMPLES.toffoli;
        setQubits(toffoliExample.qubits);
        setGates(toffoliExample.gates as Gate[]);
        break;
      case "phaseEstimation":
        const phaseExample = ADVANCED_EXAMPLES.phaseEstimation;
        setQubits(phaseExample.qubits);
        setGates(phaseExample.gates as Gate[]);
        break;
    }
  };

  const saveCircuit = () => {
    const circuitName = prompt("Enter circuit name:");
    if (!circuitName) return;

    const circuit: CircuitData = {
      id: `circuit_${Date.now()}`,
      name: circuitName,
      description: `Circuit with ${gates.length} gates on ${qubits} qubits`,
      qubits,
      gates,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: ["custom"],
      category: "custom",
    };

    circuitStorage.saveCircuit(circuit);
    setSavedCircuits(circuitStorage.getAllCircuits());
  };

  const loadCircuit = (circuit: CircuitData) => {
    setQubits(circuit.qubits);
    setGates(circuit.gates);
    setResults(null);
    setSimulationError(null);
    setSelectedCircuit(circuit);
    setShowCircuitManager(false);
  };

  const exportCircuit = (format: "json" | "qasm" | "qiskit" = "json") => {
    const circuit: CircuitData = {
      id: `export_${Date.now()}`,
      name: "Exported Circuit",
      description: "Circuit exported from simulator",
      qubits,
      gates,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: ["exported"],
      category: "custom",
    };

    const exportData = circuitStorage.exportCircuit(circuit, format);
    const blob = new Blob([exportData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `quantum_circuit.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importCircuit = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const circuit = circuitStorage.importCircuit(content);
        setQubits(circuit.qubits);
        setGates(circuit.gates);
        setResults(null);
        setSimulationError(null);
      } catch (error) {
        alert("Error importing circuit: " + error);
      }
    };
    reader.readAsText(file);
  };

  const clearErrors = () => {
    setErrors([]);
    setSimulationError(null);
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4"
    >
      <div className="container mx-auto max-w-7xl">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg shadow-md transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Portfolio
          </button>
        </div>

        <div className="text-center mb-8">
          <h1
            className="text-4xl font-bold text-gray-800 mb-4"
          >
            Quantum Circuit Simulator v2.0
          </h1>
          <p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Advanced quantum computing simulator with 3D visualization,
            tutorials, and circuit management.
          </p>
        </div>

        {/* Feature Buttons */}
        <div
          className="mb-6 flex flex-wrap gap-2 justify-center"
        >
          <button
            onClick={() => setShowTutorial(true)}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2"
          >
            <BookOpen size={16} />
            Interactive Tutorial
          </button>
          <button
            onClick={() => setShow3D(!show3D)}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2"
          >
            {show3D ? "Hide 3D View" : "Show 3D View"}
          </button>
          <button
            onClick={() => setShowCircuitManager(!showCircuitManager)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2"
          >
            <Settings size={16} />
            Circuit Manager
          </button>
        </div>

        {/* Example Circuits */}
        <div className="mb-6">
          <h3
            className="text-lg font-semibold text-gray-800 mb-3"
          >
            Example Circuits
          </h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => loadExampleCircuit("bell")}
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
            >
              Bell State
            </button>
            <button
              onClick={() => loadExampleCircuit("ghz")}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
            >
              GHZ State
            </button>
            <button
              onClick={() => loadExampleCircuit("superposition")}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
            >
              Superposition
            </button>
            <button
              onClick={() => loadExampleCircuit("quantumFourier")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
            >
              Quantum Fourier
            </button>
            <button
              onClick={() => loadExampleCircuit("toffoli")}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
            >
              Toffoli Gate
            </button>
            <button
              onClick={() => loadExampleCircuit("phaseEstimation")}
              className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
            >
              Phase Estimation
            </button>
          </div>
        </div>

        {/* Circuit Manager Modal */}
        {showCircuitManager && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <div
              className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden"
            >
              <div className="bg-blue-500 text-white p-4">
                <h3 className="text-xl font-bold">
                  Circuit Manager
                </h3>
              </div>

              <div
                className="p-6 overflow-y-auto max-h-[60vh]"
              >
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">
                    Save Current Circuit
                  </h4>
                  <button
                    onClick={saveCircuit}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    Save Circuit
                  </button>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold mb-2">
                    Import/Export
                  </h4>
                  <div className="flex gap-2">
                    <label
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-colors cursor-pointer"
                    >
                      <Upload
                        size={16}
                        className="inline mr-1"
                      />
                      Import JSON
                      <input
                        type="file"
                        accept=".json"
                        onChange={importCircuit}
                        className="hidden"
                      />
                    </label>
                    <button
                      onClick={() => exportCircuit("json")}
                      className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-1"
                    >
                      <Download size={16} />
                      Export JSON
                    </button>
                    <button
                      onClick={() => exportCircuit("qasm")}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-1"
                    >
                      <Download size={16} />
                      Export QASM
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">
                    Saved Circuits
                  </h4>
                  {savedCircuits.length === 0 ? (
                    <p className="text-gray-500">
                      No saved circuits
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {savedCircuits.map((circuit) => (
                        <div
                          key={circuit.id}
                          className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                          onClick={() => loadCircuit(circuit)}
                        >
                          <div
                            className="flex justify-between items-center"
                          >
                            <div>
                              <h5 className="font-medium">
                                {circuit.name}
                              </h5>
                              <p
                                className="text-sm text-gray-600"
                              >
                                {circuit.qubits} qubits, {circuit.gates.length}{" "}
                                gates
                              </p>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                circuitStorage.deleteCircuit(circuit.id);
                                setSavedCircuits(
                                  circuitStorage.getAllCircuits(),
                                );
                              }}
                              className="text-red-500 hover:text-red-700"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 p-4 border-t">
                <button
                  onClick={() => setShowCircuitManager(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Error Display */}
        <ErrorDisplay
          errors={errors}
          onClear={clearErrors}
        />

        {/* Simulation Error */}
        {simulationError && (
          <div
            className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <span className="font-semibold">
                Simulation Error:
              </span>
              <span>{simulationError}</span>
            </div>
          </div>
        )}

        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <div>
            <CircuitEditor
              qubits={qubits}
              gates={gates}
              onQubitChange={setQubits}
              onGatesChange={setGates}
            />
          </div>

          <div className="space-y-6">
            <div
              className="bg-white rounded-lg shadow-lg p-6 simulation-controls"
            >
              <h3
                className="text-xl font-bold text-gray-800 mb-4"
              >
                Simulation Controls
              </h3>

              <div className="space-y-4">
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Simulation Type
                  </label>
                  <select
                    value={simulationType}
                    onChange={(e) =>
                      setSimulationType(e.target.value as "exact" | "sampling")
                    }
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="sampling">
                      Sampling (Multiple Measurements)
                    </option>
                    <option value="exact">
                      Exact (State Vector)
                    </option>
                  </select>
                </div>

                {simulationType === "sampling" && (
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Number of Shots
                    </label>
                    <input
                      type="number"
                      value={shots}
                      onChange={(e) =>
                        setShots(
                          Math.max(100, parseInt(e.target.value) || 1000),
                        )
                      }
                      min="100"
                      max="10000"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                )}

                <button
                  onClick={runSimulation}
                  disabled={
                    isSimulating || errors.some((e) => e.type === "error")
                  }
                  className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
                >
                  {isSimulating ? (
                    <>
                      <div
                        className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"
                      ></div>
                      Running Simulation...
                    </>
                  ) : (
                    "Run Simulation"
                  )}
                </button>
              </div>
            </div>

            {results && (
              <ResultChart
                counts={results}
                title={
                  simulationType === "exact"
                    ? "Exact Probabilities"
                    : "Measurement Results"
                }
              />
            )}
          </div>
        </div>

        {/* 3D Visualization */}
        <QuantumState3D
          gates={gates}
          qubits={qubits}
          results={results}
          isVisible={show3D}
        />

        {/* Interactive Tutorial */}
        <InteractiveTutorial
          isVisible={showTutorial}
          onClose={() => setShowTutorial(false)}
          onCircuitLoad={(gates, qubits) => {
            setGates(gates);
            setQubits(qubits);
            setResults(null);
            setSimulationError(null);
          }}
        />
      </div>
    </div>
  );
};
