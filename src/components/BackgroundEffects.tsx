import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const BackgroundEffects = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Neural network nodes
    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      connections: number[];
    }> = [];

    // Create nodes
    const nodeCount = 50;
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        connections: [],
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update node positions
      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x <= 0 || node.x >= canvas.width) node.vx *= -1;
        if (node.y <= 0 || node.y >= canvas.height) node.vy *= -1;

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 255, 0, 0.6)";
        ctx.fill();

        // Find connections
        node.connections = [];
        nodes.forEach((otherNode, j) => {
          if (i !== j) {
            const distance = Math.sqrt(
              Math.pow(node.x - otherNode.x, 2) +
                Math.pow(node.y - otherNode.y, 2),
            );
            if (distance < 150) {
              node.connections.push(j);
            }
          }
        });

        // Draw connections
        node.connections.forEach((connectionIndex) => {
          const connectedNode = nodes[connectionIndex];
          const distance = Math.sqrt(
            Math.pow(node.x - connectedNode.x, 2) +
              Math.pow(node.y - connectedNode.y, 2),
          );
          const opacity = 1 - distance / 150;

          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(connectedNode.x, connectedNode.y);
          ctx.strokeStyle = `rgba(0, 255, 0, ${opacity * 0.3})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  // Quantum particles
  const quantumParticles = Array.from({ length: 20 }, (_, i) => (
    <motion.div
      key={i}
      className="quantum-particle"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
      animate={{
        x: [0, Math.random() * 200 - 100, 0],
        y: [0, Math.random() * 200 - 100, 0],
        opacity: [0.3, 0.8, 0.3],
      }}
      transition={{
        duration: Math.random() * 10 + 5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: Math.random() * 2,
      }}
    />
  ));

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Neural Network Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 opacity-20" />

      {/* Cyber Grid */}
      <div className="absolute inset-0 cyber-grid opacity-10" />

      {/* Quantum Particles */}
      <div className="absolute inset-0 overflow-hidden">{quantumParticles}</div>

      {/* Matrix Rain Effect */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        {Array.from({ length: 50 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-px bg-neon-green"
            style={{
              left: `${Math.random() * 100}%`,
              height: `${Math.random() * 100 + 50}px`,
            }}
            animate={{
              y: ["-100vh", "100vh"],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Holographic Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-neon-green/5 to-quantum-blue/5 opacity-30" />
    </div>
  );
};

export default BackgroundEffects;
