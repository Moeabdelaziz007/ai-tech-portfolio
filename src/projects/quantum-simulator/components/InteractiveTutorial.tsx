import React, { useState, useCallback } from 'react';
import { Gate, GateType } from '../types';
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaRedo, FaCheck, FaTimes } from 'react-icons/fa';

interface TutorialStep {
  id: string;
  title: string;
  description: string;
  circuit: Gate[];
  qubits: number;
  expectedResult?: { [key: string]: number };
  hints: string[];
  completed: boolean;
  explanation: string;
}

interface InteractiveTutorialProps {
  isVisible: boolean;
  onClose: () => void;
  onCircuitLoad: (gates: Gate[], qubits: number) => void;
}

const TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: 'superposition',
    title: 'Quantum Superposition',
    description: 'Learn how quantum bits can exist in multiple states simultaneously.',
    circuit: [
      {
        id: 'tutorial-h-0',
        type: 'H',
        position: 0,
        targetQubit: 0
      }
    ],
    qubits: 1,
    expectedResult: { '0': 0.5, '1': 0.5 },
    hints: [
      'Add a Hadamard gate to qubit 0',
      'The Hadamard gate creates equal superposition of |0⟩ and |1⟩',
      'Run the simulation to see 50/50 probability distribution'
    ],
    completed: false,
    explanation: 'The Hadamard gate transforms |0⟩ into (|0⟩ + |1⟩)/√2, creating a superposition where the qubit has equal probability of being measured as 0 or 1.'
  },
  {
    id: 'bell-state',
    title: 'Bell State - Quantum Entanglement',
    description: 'Create the famous Bell state to understand quantum entanglement.',
    circuit: [
      {
        id: 'tutorial-h-0',
        type: 'H',
        position: 0,
        targetQubit: 0
      },
      {
        id: 'tutorial-cnot-1',
        type: 'CNOT',
        position: 1,
        targetQubit: 1,
        controlQubit: 0
      }
    ],
    qubits: 2,
    expectedResult: { '00': 0.5, '11': 0.5 },
    hints: [
      'First add a Hadamard gate to qubit 0',
      'Then add a CNOT gate with control on qubit 0 and target on qubit 1',
      'This creates the Bell state (|00⟩ + |11⟩)/√2'
    ],
    completed: false,
    explanation: 'The Bell state demonstrates quantum entanglement - when you measure one qubit, the other instantly collapses to a correlated state, regardless of distance.'
  },
  {
    id: 'ghz-state',
    title: 'GHZ State - Multi-qubit Entanglement',
    description: 'Extend entanglement to three qubits with the GHZ state.',
    circuit: [
      {
        id: 'tutorial-h-0',
        type: 'H',
        position: 0,
        targetQubit: 0
      },
      {
        id: 'tutorial-cnot-1',
        type: 'CNOT',
        position: 1,
        targetQubit: 1,
        controlQubit: 0
      },
      {
        id: 'tutorial-cnot-2',
        type: 'CNOT',
        position: 2,
        targetQubit: 2,
        controlQubit: 0
      }
    ],
    qubits: 3,
    expectedResult: { '000': 0.5, '111': 0.5 },
    hints: [
      'Start with Hadamard on qubit 0',
      'Add CNOT gates from qubit 0 to both qubits 1 and 2',
      'This creates (|000⟩ + |111⟩)/√2'
    ],
    completed: false,
    explanation: 'The GHZ state shows how quantum entanglement can scale to multiple qubits, with all qubits being perfectly correlated.'
  },
  {
    id: 'quantum-fourier',
    title: 'Quantum Fourier Transform',
    description: 'Learn about the quantum version of the Fourier transform.',
    circuit: [
      {
        id: 'tutorial-h-0',
        type: 'H',
        position: 0,
        targetQubit: 0
      },
      {
        id: 'tutorial-h-1',
        type: 'H',
        position: 1,
        targetQubit: 1
      },
      {
        id: 'tutorial-cnot-2',
        type: 'CNOT',
        position: 2,
        targetQubit: 1,
        controlQubit: 0
      }
    ],
    qubits: 2,
    hints: [
      'Apply Hadamard gates to both qubits',
      'Add a CNOT gate between them',
      'This is a simplified version of QFT'
    ],
    completed: false,
    explanation: 'The Quantum Fourier Transform is a key component in many quantum algorithms, including Shor\'s algorithm for factoring.'
  }
];

export const InteractiveTutorial: React.FC<InteractiveTutorialProps> = ({
  isVisible,
  onClose,
  onCircuitLoad
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showHints, setShowHints] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [isPlaying, setIsPlaying] = useState(false);

  const currentTutorial = TUTORIAL_STEPS[currentStep];

  const loadCurrentCircuit = useCallback(() => {
    onCircuitLoad(currentTutorial.circuit, currentTutorial.qubits);
  }, [currentTutorial, onCircuitLoad]);

  const nextStep = useCallback(() => {
    if (currentStep < TUTORIAL_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
      setShowHints(false);
    }
  }, [currentStep]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setShowHints(false);
    }
  }, [currentStep]);

  const markCompleted = useCallback(() => {
    setCompletedSteps(prev => new Set([...prev, currentTutorial.id]));
  }, [currentTutorial.id]);

  const resetTutorial = useCallback(() => {
    setCurrentStep(0);
    setCompletedSteps(new Set());
    setShowHints(false);
    setIsPlaying(false);
  }, []);

  const autoPlay = useCallback(() => {
    setIsPlaying(true);
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < TUTORIAL_STEPS.length - 1) {
          return prev + 1;
        } else {
          setIsPlaying(false);
          clearInterval(interval);
          return prev;
        }
      });
    }, 3000);
  }, []);

  if (!isVisible) return null;

  const progress = ((currentStep + 1) / TUTORIAL_STEPS.length) * 100;
  const isCompleted = completedSteps.has(currentTutorial.id);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Interactive Quantum Computing Tutorial</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <FaTimes size={24} />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Step {currentStep + 1} of {TUTORIAL_STEPS.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Step Title and Description */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {currentTutorial.title}
              {isCompleted && (
                <FaCheck className="inline ml-2 text-green-500" />
              )}
            </h3>
            <p className="text-gray-600">{currentTutorial.description}</p>
          </div>

          {/* Circuit Preview */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">Circuit Preview:</h4>
            <div className="text-sm text-gray-600 mb-3">
              <p><strong>Qubits:</strong> {currentTutorial.qubits}</p>
              <p><strong>Gates:</strong> {currentTutorial.circuit.length}</p>
            </div>
            <button
              onClick={loadCurrentCircuit}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Load This Circuit
            </button>
          </div>

          {/* Hints */}
          <div className="mb-6">
            <button
              onClick={() => setShowHints(!showHints)}
              className="text-blue-600 hover:text-blue-800 font-medium mb-2"
            >
              {showHints ? 'Hide Hints' : 'Show Hints'}
            </button>
            {showHints && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">Hints:</h4>
                <ul className="list-disc list-inside space-y-1 text-yellow-700">
                  {currentTutorial.hints.map((hint, index) => (
                    <li key={index}>{hint}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Explanation */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-800 mb-2">Explanation:</h4>
            <p className="text-gray-600 leading-relaxed">
              {currentTutorial.explanation}
            </p>
          </div>

          {/* Expected Results */}
          {currentTutorial.expectedResult && (
            <div className="mb-6">
              <h4 className="font-semibold text-gray-800 mb-2">Expected Results:</h4>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {Object.entries(currentTutorial.expectedResult).map(([state, prob]) => (
                    <div key={state} className="flex justify-between">
                      <span className="font-mono">|{state}⟩</span>
                      <span>{(prob * 100).toFixed(1)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Controls */}
        <div className="bg-gray-50 p-6 border-t">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <button
                onClick={resetTutorial}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <FaRedo size={16} />
                Reset
              </button>
              <button
                onClick={autoPlay}
                disabled={isPlaying}
                className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
                {isPlaying ? 'Playing...' : 'Auto Play'}
              </button>
            </div>

            <div className="flex gap-2">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <FaStepBackward size={16} />
                Previous
              </button>
              <button
                onClick={markCompleted}
                className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <FaCheck size={16} />
                Mark Complete
              </button>
              <button
                onClick={nextStep}
                disabled={currentStep === TUTORIAL_STEPS.length - 1}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                Next
                <FaStepForward size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 