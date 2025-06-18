import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Sphere, Line } from "@react-three/drei";
import * as THREE from "three";
import { Gate, GateType } from "../types";

interface QuantumState3DProps {
  gates: Gate[];
  qubits: number;
  results: { [key: string]: number } | null;
  isVisible: boolean;
}

interface BlochSphereProps {
  qubitIndex: number;
  state: { theta: number; phi: number; probability: number };
  color: string;
}

const BlochSphere: React.FC<BlochSphereProps> = ({
  qubitIndex,
  state,
  color,
}) => {
  const sphereRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Calculate position on Bloch sphere
  const position = useMemo(() => {
    const x = Math.sin(state.theta) * Math.cos(state.phi);
    const y = Math.sin(state.theta) * Math.sin(state.phi);
    const z = Math.cos(state.theta);
    return new THREE.Vector3(x, y, z);
  }, [state.theta, state.phi]);

  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group position={[qubitIndex * 4 - 4, 0, 0]}>
      {/* Bloch sphere wireframe */}
      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial
          color="#f0f0f0"
          wireframe
          opacity={0.3}
          transparent
        />
      </mesh>

      {/* State vector */}
      <mesh
        ref={sphereRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>

      {/* State line */}
      <Line
        points={[new THREE.Vector3(0, 0, 0), position]}
        color={color}
        lineWidth={2}
        opacity={0.6}
        transparent
      />

      {/* Qubit label */}
      <Text
        position={[0, -2.5, 0]}
        fontSize={0.3}
        color="#333"
        anchorX="center"
        anchorY="middle"
      >
        {`q[${qubitIndex}]`}
      </Text>

      {/* State info on hover */}
      {hovered && (
        <Text
          position={[0, 2.5, 0]}
          fontSize={0.2}
          color="#666"
          anchorX="center"
          anchorY="middle"
        >
          {`θ: ${((state.theta * 180) / Math.PI).toFixed(1)}°\nφ: ${((state.phi * 180) / Math.PI).toFixed(1)}°`}
        </Text>
      )}

      {/* Basis states labels */}
      <Text
        position={[0, 0, 1.8]}
        fontSize={0.2}
        color="#999"
        anchorX="center"
        anchorY="middle"
      >
        |0⟩
      </Text>
      <Text
        position={[0, 0, -1.8]}
        fontSize={0.2}
        color="#999"
        anchorX="center"
        anchorY="middle"
      >
        |1⟩
      </Text>
    </group>
  );
};

const calculateBlochState = (gates: Gate[], qubitIndex: number) => {
  // Simplified Bloch sphere calculation
  // In a real implementation, this would calculate the actual quantum state
  let theta = 0;
  let phi = 0;
  let probability = 1;

  gates.forEach((gate) => {
    if (gate.targetQubit === qubitIndex) {
      switch (gate.type) {
        case "X":
          theta = Math.PI;
          phi = 0;
          break;
        case "Y":
          theta = Math.PI / 2;
          phi = Math.PI / 2;
          break;
        case "Z":
          theta = 0;
          phi = 0;
          break;
        case "H":
          theta = Math.PI / 2;
          phi = 0;
          break;
      }
    }
  });

  return { theta, phi, probability };
};

const QuantumState3DScene: React.FC<QuantumState3DProps> = ({
  gates,
  qubits,
  results,
}) => {
  const colors = [
    "#ff6b6b",
    "#4ecdc4",
    "#45b7d1",
    "#96ceb4",
    "#feca57",
    "#ff9ff3",
    "#54a0ff",
    "#5f27cd",
  ];

  return (
    <div
      className="h-96 w-full bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg overflow-hidden"
    >
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.6} />
        <pointLight
          position={[10, 10, 10]}
          intensity={0.8}
        />

        <pointLight
          position={[-10, -10, -10]}
          intensity={0.4}
        />

        {/* Bloch spheres for each qubit */}
        {Array.from({ length: qubits }).map((_, i) => {
          const state = calculateBlochState(gates, i);
          return (
            <BlochSphere
              key={i}
              qubitIndex={i}
              state={state}
              color={colors[i % colors.length]}
            />
          );
        })}

        {/* Grid for reference */}
        <gridHelper args={[20, 20, "#ddd", "#ddd"]} />

        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          maxDistance={20}
          minDistance={2}
        />
      </Canvas>
    </div>
  );
};

export const QuantumState3D: React.FC<QuantumState3DProps> = (props) => {
  if (!props.isVisible) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        Quantum State Visualization (3D)
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        Interactive 3D representation of quantum states on Bloch spheres. Hover
        over state vectors to see detailed information.
      </p>

      <QuantumState3DScene {...props} />

      <div className="mt-4 text-xs text-gray-500">
        <p>
          <strong>Instructions:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>Drag to rotate the view</li>
          <li>Scroll to zoom in/out</li>
          <li>Hover over state vectors for details</li>
          <li>Each sphere represents one qubit</li>
        </ul>
      </div>
    </div>
  );
};
