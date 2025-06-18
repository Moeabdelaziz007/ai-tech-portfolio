import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';

interface QuantumStateVizProps {
  counts: Record<string, number>;
}

interface QubitStateProps {
  state: string;
  probability: number;
  position: THREE.Vector3;
}

const QubitState: React.FC<QubitStateProps> = ({ state, probability, position }) => {
  const radius = 0.3 + probability * 0.7;
  const color = new THREE.Color(`hsl(${probability * 360}, 80%, 60%)`);

  return (
    <group position={position.toArray() as [number, number, number]}>
      {/* Sphere representing probability */}
      <mesh>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial color={color} transparent opacity={0.8} roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Label */}
      <Text
        position={[0, radius + 0.35, 0]}
        fontSize={0.3}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {`${state}\n${Math.round(probability * 100)}%`}
      </Text>

      {/* Phase / rotation indicator */}
      {probability > 0.1 && (
        <mesh rotation={[0, 0, Math.PI * probability]}>
          <boxGeometry args={[0.1, 0.1, radius * 1.5]} />
          <meshStandardMaterial color="white" transparent opacity={0.5} />
        </mesh>
      )}
    </group>
  );
};

export const QuantumStateViz: React.FC<QuantumStateVizProps> = ({ counts }) => {
  const { states, probabilities } = useMemo(() => {
    const stateKeys = Object.keys(counts);
    const total = stateKeys.reduce((sum, key) => sum + counts[key], 0);

    return {
      states: stateKeys,
      probabilities: stateKeys.map((state) => ({
        state,
        value: total ? counts[state] / total : 0,
      })),
    };
  }, [counts]);

  return (
    <div className="w-full h-96">
      <Canvas camera={{ position: [0, 2, 5], fov: 50 }} shadows>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />

        {/* Grid helper */}
        <primitive object={new THREE.GridHelper(10, 10, '#444', '#444')} />

        {/* States */}
        {probabilities.map((prob, i) => (
          <QubitState
            key={prob.state}
            state={prob.state}
            probability={prob.value}
            position={new THREE.Vector3(i * 2 - (states.length - 1), 0, 0)}
          />
        ))}

        <OrbitControls enablePan={false} />
      </Canvas>
    </div>
  );
}; 