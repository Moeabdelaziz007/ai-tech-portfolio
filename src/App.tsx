import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import DashboardSection from './components/DashboardSection';
import ContactSection from './components/ContactSection';
import Navigation from './components/Navigation';
import BackgroundEffects from './components/BackgroundEffects';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <div className="min-h-screen bg-dark-bg text-tech-white relative overflow-x-hidden">
      <BackgroundEffects />
      <Navigation />
      
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <DashboardSection />
        <ContactSection />
      </main>
      
      <Chatbot />
      
      {/* Footer */}
      <footer className="relative z-10 bg-black py-8 border-t border-neon-green/20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-medium-gray"
          >
            <p className="mb-2">
              © {new Date().getFullYear()} Mohamed H. Abdelaziz (Amrikyy). All rights reserved.
            </p>
            <p className="text-sm text-neon-green">
              Crafted with 🤖 AI • ⚡ Tech • 🔮 Quantum Innovation
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}

export default App;
