import React, { useState, useCallback } from "react";
import {
  FaTimes,
  FaWaveSquare,
  FaCaretUp,
  FaCaretDown,
  FaLink,
  FaPlusSquare,
  FaExchangeAlt,
  FaSquare,
  FaClock,
  FaStopwatch,
  FaRoute,
  FaBolt,
} from "react-icons/fa";
import { Gate, GateType, QubitLaneProps, GateComponentProps } from "../types";

// Gate Icons Mapping
const GATE_ICONS: Record<GateType, JSX.Element> = {
  X: <FaTimes className="text-red-500 text-xl" data-oid="v8jnjg0" />,
  Y: <FaCaretUp className="text-yellow-500 text-xl" data-oid="kk2m:m0" />,
  Z: <FaCaretDown className="text-blue-500 text-xl" data-oid="qzmarhf" />,
  H: <FaWaveSquare className="text-green-500 text-xl" data-oid="h3f_p0_" />,
  CNOT: <FaLink className="text-purple-500 text-xl" data-oid="ju6pijr" />,
  SWAP: (
    <FaExchangeAlt className="text-orange-500 text-xl" data-oid="rra2xuv" />
  ),

  CZ: <FaPlusSquare className="text-teal-500 text-xl" data-oid="e.w-:qt" />,
  CX: <FaLink className="text-indigo-500 text-xl" data-oid="891_soc" />,
  S: <FaClock className="text-cyan-500 text-xl" data-oid="kqff9bw" />,
  T: <FaStopwatch className="text-pink-500 text-xl" data-oid="bu-jckw" />,
  Sdg: <FaClock className="text-cyan-500 text-xl" data-oid="f73tns1" />,
  Tdg: <FaStopwatch className="text-pink-500 text-xl" data-oid="kzjvvg7" />,
  RX: <FaRoute className="text-red-500 text-xl" data-oid="vnq.k.n" />,
  RY: <FaRoute className="text-yellow-500 text-xl" data-oid=".02tb_d" />,
  RZ: <FaRoute className="text-blue-500 text-xl" data-oid=":rydnxq" />,
  CRX: <FaLink className="text-red-500 text-xl" data-oid="57u.uta" />,
  CRY: <FaLink className="text-yellow-500 text-xl" data-oid="8i41ne5" />,
  CRZ: <FaLink className="text-blue-500 text-xl" data-oid="_b6fovu" />,
  CCX: <FaBolt className="text-purple-500 text-xl" data-oid="un_6u-g" />,
  CCZ: <FaBolt className="text-teal-500 text-xl" data-oid=":ltzle_" />,
  CSWAP: <FaBolt className="text-orange-500 text-xl" data-oid="uoq.zcd" />,
  U1: <FaSquare className="text-gray-500 text-xl" data-oid="mq96sis" />,
  U2: <FaSquare className="text-gray-600 text-xl" data-oid="piwgrs4" />,
  U3: <FaSquare className="text-gray-700 text-xl" data-oid="7.gxd_v" />,
};

// Gate Tooltips Mapping
const GATE_TOOLTIPS: Record<GateType, string> = {
  X: "Pauli-X Gate (NOT) - Flips qubit state",
  Y: "Pauli-Y Gate - Phase flip with bit flip",
  Z: "Pauli-Z Gate - Phase flip",
  H: "Hadamard Gate - Creates superposition",
  CNOT: "Controlled NOT Gate - Entangles qubits",
  SWAP: "SWAP Gate - Exchanges qubit states",
  CZ: "Controlled Z Gate - Controlled phase flip",
  CX: "Controlled X Gate - Alternative CNOT",
  S: "S Gate - π/2 phase shift (sqrt(Z))",
  T: "T Gate - π/4 phase shift (sqrt(S))",
  Sdg: "S† Gate - -π/2 phase shift (inverse of S)",
  Tdg: "T† Gate - -π/4 phase shift (inverse of T)",
  RX: "RX Gate - Rotation around X-axis by given angle",
  RY: "RY Gate - Rotation around Y-axis by given angle",
  RZ: "RZ Gate - Rotation around Z-axis by given angle",
  CRX: "Controlled RX Gate - Controlled rotation around X-axis",
  CRY: "Controlled RY Gate - Controlled rotation around Y-axis",
  CRZ: "Controlled RZ Gate - Controlled rotation around Z-axis",
  CCX: "CCX Gate (Toffoli) - Controlled-controlled NOT",
  CCZ: "CCZ Gate - Controlled-controlled Z",
  CSWAP: "CSWAP Gate - Controlled SWAP",
  U1: "U1 Gate - Single parameter phase gate",
  U2: "U2 Gate - Two parameter gate",
  U3: "U3 Gate - Universal single-qubit gate (3 parameters)",
};

const GateComponent: React.FC<GateComponentProps> = ({ gate, onRemove }) => {
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onRemove();
    },
    [onRemove],
  );

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.stopPropagation();
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      e.stopPropagation();
      onRemove();
    },
    [onRemove],
  );

  return (
    <div
      className="absolute w-10 h-10 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-md gate-component touch-none"
      style={{ left: `${gate.position * 60 + 20}px` }}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      title={`${GATE_TOOLTIPS[gate.type]} - Click to remove`}
      data-oid="jj5eiyd"
    >
      {GATE_ICONS[gate.type]}
    </div>
  );
};

export const QubitLane: React.FC<QubitLaneProps> = ({
  qubitIndex,
  gates,
  onAddGate,
  onRemoveGate,
  maxSteps,
}) => {
  const [selectedGateType, setSelectedGateType] = useState<GateType>("X");

  const handleLaneClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const step = Math.floor((x - 20) / 60);

      if (step >= 0 && step < maxSteps) {
        const newGate: Gate = {
          id: `${qubitIndex}-${step}-${Date.now()}`,
          type: selectedGateType,
          position: step,
          targetQubit: qubitIndex,
        };
        onAddGate(newGate);
      }
    },
    [selectedGateType, qubitIndex, maxSteps, onAddGate],
  );

  const handleLaneTouch = useCallback(
    (event: React.TouchEvent<HTMLDivElement>) => {
      event.preventDefault();
      const rect = event.currentTarget.getBoundingClientRect();
      const touch = event.touches[0];
      const x = touch.clientX - rect.left;
      const step = Math.floor((x - 20) / 60);

      if (step >= 0 && step < maxSteps) {
        const newGate: Gate = {
          id: `${qubitIndex}-${step}-${Date.now()}`,
          type: selectedGateType,
          position: step,
          targetQubit: qubitIndex,
        };
        onAddGate(newGate);
      }
    },
    [selectedGateType, qubitIndex, maxSteps, onAddGate],
  );

  const handleGateRemove = useCallback(
    (gateIndex: number) => {
      onRemoveGate(gateIndex);
    },
    [onRemoveGate],
  );

  return (
    <div
      className="flex items-center h-16 border-b border-gray-300 relative qubit-lane"
      data-oid="i3t66_e"
    >
      {/* Qubit label with icon */}
      <div
        className="w-20 text-center font-mono text-sm text-gray-600 flex items-center justify-center"
        data-oid=":tfzatx"
      >
        <FaSquare className="text-blue-500 mr-2" data-oid="_i.60_7" />
        <span className="hidden sm:inline" data-oid="nyr2ex-">
          q[{qubitIndex}]
        </span>
        <span className="sm:hidden" data-oid="ff945ke">
          q{qubitIndex}
        </span>
      </div>

      {/* Gate type selector */}
      <div className="w-24 px-2 gate-selector" data-oid="60:c_lb">
        <select
          value={selectedGateType}
          onChange={(e) => setSelectedGateType(e.target.value as GateType)}
          className="w-full text-xs p-1 border rounded bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent focus-ring"
          data-oid="6rrjr-g"
        >
          <option value="X" data-oid="g8zsxtq">
            X (NOT)
          </option>
          <option value="Y" data-oid="qnnhjrb">
            Y
          </option>
          <option value="Z" data-oid="lg31acc">
            Z
          </option>
          <option value="H" data-oid="pzyffi7">
            H (Hadamard)
          </option>
          <option value="CNOT" data-oid="00zxgf:">
            CNOT
          </option>
          <option value="SWAP" data-oid="f2jqsrz">
            SWAP
          </option>
          <option value="CZ" data-oid="6y77_xc">
            CZ
          </option>
          <option value="CX" data-oid="wn.s.xf">
            CX
          </option>
          <option value="S" data-oid="8-2jfju">
            S
          </option>
          <option value="T" data-oid="i3iy_35">
            T
          </option>
          <option value="Sdg" data-oid="..u15rt">
            Sdg
          </option>
          <option value="Tdg" data-oid="3u0bvaa">
            Tdg
          </option>
          <option value="RX" data-oid="5pm2949">
            RX
          </option>
          <option value="RY" data-oid="k3ygxky">
            RY
          </option>
          <option value="RZ" data-oid="v:20vv4">
            RZ
          </option>
          <option value="CRX" data-oid="ndvtzq5">
            CRX
          </option>
          <option value="CRY" data-oid="-ei40xh">
            CRY
          </option>
          <option value="CRZ" data-oid="i.ldd09">
            CRZ
          </option>
          <option value="CCX" data-oid="mdw:dx2">
            CCX
          </option>
          <option value="CCZ" data-oid="oe0a01t">
            CCZ
          </option>
          <option value="CSWAP" data-oid="wop562a">
            CSWAP
          </option>
          <option value="U1" data-oid="hst227z">
            U1
          </option>
          <option value="U2" data-oid="zd6f9mi">
            U2
          </option>
          <option value="U3" data-oid="0jqu-jf">
            U3
          </option>
        </select>
      </div>

      {/* Circuit lane */}
      <div
        className="flex-1 h-8 border-b-2 border-gray-400 relative cursor-pointer hover:bg-gray-50 transition-colors touch-pan-y circuit-lane"
        onClick={handleLaneClick}
        onTouchStart={handleLaneTouch}
        title="Click or tap to add gate"
        data-oid="3oeoihd"
      >
        {/* Step markers */}
        {Array.from({ length: maxSteps }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-8 bg-gray-300"
            style={{ left: `${i * 60 + 20}px` }}
            data-oid="ycsd3p7"
          />
        ))}

        {/* Gates */}
        {gates.map((gate, index) => (
          <GateComponent
            key={gate.id}
            gate={gate}
            onRemove={() => handleGateRemove(index)}
            data-oid="znnjt1s"
          />
        ))}
      </div>
    </div>
  );
};
