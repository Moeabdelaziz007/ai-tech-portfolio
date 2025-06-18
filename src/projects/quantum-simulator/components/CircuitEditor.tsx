import React, { useState } from "react";
import { QubitLane } from "./QubitLane";
import { Gate, CircuitEditorProps } from "../types";

export const CircuitEditor: React.FC<CircuitEditorProps> = ({
  qubits,
  gates,
  onQubitChange,
  onGatesChange,
}) => {
  const [maxSteps] = useState(10);

  const addGate = (gate: Gate) => {
    // Check if there's already a gate at this position and qubit
    const existingGateIndex = gates.findIndex(
      (g) => g.position === gate.position && g.targetQubit === gate.targetQubit,
    );

    if (existingGateIndex !== -1) {
      // Replace existing gate
      const newGates = [...gates];
      newGates[existingGateIndex] = gate;
      onGatesChange(newGates);
    } else {
      // Add new gate
      onGatesChange([...gates, gate]);
    }
  };

  const removeGate = (gateIndex: number) => {
    const newGates = gates.filter((_, index) => index !== gateIndex);
    onGatesChange(newGates);
  };

  const clearCircuit = () => {
    onGatesChange([]);
  };

  const getGatesForQubit = (qubitIndex: number): Gate[] => {
    return gates.filter((gate) => gate.targetQubit === qubitIndex);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-lg p-6 circuit-editor"
      data-oid="l1gnlnp"
    >
      <div
        className="flex justify-between items-center mb-6"
        data-oid="wr55fiy"
      >
        <h3 className="text-xl font-bold text-gray-800" data-oid="-_vzhdw">
          Quantum Circuit Editor
        </h3>
        <div className="flex gap-2" data-oid="cciqc_:">
          <button
            onClick={() => onQubitChange(qubits + 1)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors"
            disabled={qubits >= 8}
            data-oid="0q3jolk"
          >
            Add Qubit
          </button>
          <button
            onClick={() => onQubitChange(Math.max(1, qubits - 1))}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
            disabled={qubits <= 1}
            data-oid=":evzcxn"
          >
            Remove Qubit
          </button>
          <button
            onClick={clearCircuit}
            className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm transition-colors"
            data-oid="6z4_7jf"
          >
            Clear Circuit
          </button>
        </div>
      </div>

      {/* Circuit header */}
      <div className="flex mb-4" data-oid="vn5r840">
        <div
          className="w-20 text-center font-bold text-gray-600"
          data-oid="lqu8ayz"
        >
          Qubit
        </div>
        <div
          className="w-24 text-center font-bold text-gray-600"
          data-oid="em-o-cb"
        >
          Gate Type
        </div>
        <div className="flex-1" data-oid="d6497zc">
          <div className="flex" data-oid="irehq4p">
            {Array.from({ length: maxSteps }).map((_, i) => (
              <div
                key={i}
                className="flex-1 text-center text-xs text-gray-500 font-mono"
                style={{ width: "60px" }}
                data-oid="wr-s1mc"
              >
                {i}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Circuit lanes */}
      <div
        className="border-2 border-gray-300 rounded-lg overflow-hidden circuit-container"
        data-oid="d7dc4lz"
      >
        {Array.from({ length: qubits }).map((_, i) => (
          <QubitLane
            key={i}
            qubitIndex={i}
            gates={getGatesForQubit(i)}
            onAddGate={addGate}
            onRemoveGate={removeGate}
            maxSteps={maxSteps}
            data-oid="1s98qba"
          />
        ))}
      </div>

      {/* Circuit info */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg" data-oid="owltph8">
        <div className="text-sm text-gray-600" data-oid="g5:y16o">
          <p data-oid="1ixsw0e">
            <strong data-oid="q8ec6hs">Qubits:</strong> {qubits}
          </p>
          <p data-oid="_agzwf-">
            <strong data-oid="ck0zslg">Gates:</strong> {gates.length}
          </p>
          <p data-oid="mp6osj:">
            <strong data-oid="r2y31w9">Steps:</strong> {maxSteps}
          </p>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg" data-oid="p-tsv4t">
        <h4 className="font-semibold text-blue-800 mb-2" data-oid="kp3_ey.">
          Instructions:
        </h4>
        <ul className="text-sm text-blue-700 space-y-1" data-oid="4zd_h9a">
          <li data-oid="buy6:yo">• Select a gate type from the dropdown</li>
          <li data-oid="h2yr335">• Click on a step position to add the gate</li>
          <li data-oid="dv918g9">• Click on a gate to remove it</li>
          <li data-oid="ztukhq6">
            • Use Add/Remove Qubit to adjust circuit size
          </li>
        </ul>
      </div>
    </div>
  );
};
