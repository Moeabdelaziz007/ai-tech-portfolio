import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import DashboardSection from "./components/DashboardSection";
import ContactSection from "./components/ContactSection";
import Navigation from "./components/Navigation";
import BackgroundEffects from "./components/BackgroundEffects";
import Chatbot from "./components/Chatbot";
import { QuantumSimulatorPage } from "./projects/quantum-simulator/pages/QuantumSimulatorPage";
import { CodeAssistantPage } from "./projects/code-assistant/pages/CodeAssistantPage";

// Main Portfolio Component
const Portfolio: React.FC = () => {
  return (
    <>
      <BackgroundEffects data-oid="6_g2uru" />
      <Navigation data-oid="w32lp-n" />

      <main className="relative z-10" data-oid="_2_ywd4">
        <HeroSection data-oid="5kekv4v" />
        <AboutSection data-oid="0go-qt3" />
        <ProjectsSection data-oid="cuusx5r" />
        <DashboardSection data-oid="dsht4y2" />
        <ContactSection data-oid="tti1mt1" />
      </main>

      <Chatbot data-oid="8mma173" />

      {/* Footer */}
      <footer
        className="relative z-10 bg-black py-8 border-t border-neon-green/20"
        data-oid="bijl2z2"
      >
        <div className="container mx-auto px-4 text-center" data-oid="5-lcigy">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-medium-gray"
            data-oid="pdf.0_9"
          >
            <p className="mb-2" data-oid="4co_16u">
              © {new Date().getFullYear()} Mohamed H. Abdelaziz (Amrikyy). All
              rights reserved.
            </p>
            <p className="text-sm text-neon-green" data-oid="2txouh8">
              Crafted with 🤖 AI • ⚡ Tech • 🔮 Quantum Innovation
            </p>
          </motion.div>
        </div>
      </footer>
    </>
  );
};

function App() {
  return (
    <Router data-oid="5wu14r_">
      <div
        className="min-h-screen bg-dark-bg text-tech-white relative overflow-x-hidden"
        data-oid="1onhz6c"
      >
        <Routes data-oid="_3gsg60">
          <Route
            path="/"
            element={<Portfolio data-oid="zjdw5:l" />}
            data-oid="zsg_vhk"
          />

          <Route
            path="/projects/quantum-simulator"
            element={<QuantumSimulatorPage data-oid="mqm7.4b" />}
            data-oid="h9f25pv"
          />

          <Route
            path="/projects/code-assistant"
            element={<CodeAssistantPage data-oid="nvb24hw" />}
            data-oid="-oazyvr"
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
