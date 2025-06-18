import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Download, Github, Linkedin, Instagram, Globe } from 'lucide-react';

const HeroSection = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullText = "Cybersecurity Engineer & AI Developer";

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const socialLinks = [
    { icon: Github, url: 'https://github.com/moeabdelaziz007', label: 'GitHub' },
    { icon: Linkedin, url: 'https://linkedin.com/in/mohamed-abdelaziz-815797347', label: 'LinkedIn' },
    { icon: Instagram, url: 'https://instagram.com/amrikyy', label: 'Instagram' },
    { icon: Globe, url: 'https://moeabdelaziz007.github.io/amrikyy/', label: 'Portfolio' },
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/hero-background.jpg" 
          alt="AI Neural Network Background"
          loading="lazy"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/70 via-dark-bg/50 to-dark-bg" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Profile Image */}
          <motion.div
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, type: "spring", stiffness: 100 }}
            className="mb-8"
          >
            <div className="relative w-32 h-32 mx-auto">
              <img
                src="/images/profile-avatar.jpg"
                alt="Mohamed H. Abdelaziz"
                loading="lazy"
                className="w-full h-full rounded-full object-cover neon-border"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-neon-green/20 to-quantum-blue/20 animate-pulse-glow"></div>
            </div>
          </motion.div>

          {/* Name and Title */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mb-6"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="text-tech-white">Mohamed H. </span>
              <span className="text-neon-green holographic">Abdelaziz</span>
            </h1>
            <div className="text-xl md:text-2xl text-medium-gray mb-2">
              <span className="text-quantum-blue">(</span>
              <span className="text-neon-green font-mono">Amrikyy</span>
              <span className="text-quantum-blue">)</span>
            </div>
          </motion.div>

          {/* Typing Effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mb-8"
          >
            <h2 className="text-xl md:text-3xl font-light text-tech-white">
              <span className="font-mono text-neon-green">&gt; </span>
              {displayText}
              <span className="animate-blink border-r-2 border-neon-green ml-1"></span>
            </h2>
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="text-lg md:text-xl text-medium-gray mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            26-year-old Egyptian-American innovator based in Cairo, specializing in AI solutions and cybersecurity engineering. 
            Currently pursuing Cybersecurity Engineering at Kennesaw State University with experience at 
            <span className="text-neon-green"> OpenAI</span>, 
            <span className="text-quantum-blue"> Intel</span>, and 
            <span className="text-bitcoin-orange"> L'Oréal</span>.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 25px #00FF00' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-neon-green text-dark-bg font-semibold rounded-lg hover:bg-neon-green/90 transition-colors flex items-center justify-center space-x-2"
              onClick={scrollToAbout}
            >
              <span>Explore My Work</span>
              <ChevronDown size={20} />
            </motion.button>
            
            <motion.a
              href="/cv/Mohamed_Abdelaziz_CV.pdf"
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border border-neon-green text-neon-green hover:bg-neon-green hover:text-dark-bg transition-colors rounded-lg flex items-center justify-center space-x-2"
            >
              <Download size={20} />
              <span>Download CV</span>
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 0.8 }}
            className="flex justify-center space-x-6"
          >
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.5 + index * 0.1, duration: 0.5 }}
                  whileHover={{ 
                    scale: 1.2, 
                    y: -5,
                    boxShadow: '0 5px 15px rgba(0, 255, 0, 0.4)'
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 glass-effect rounded-full text-tech-white hover:text-neon-green transition-colors group"
                  aria-label={social.label}
                >
                  <Icon size={24} />
                </motion.a>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center text-medium-gray"
          >
            <span className="text-sm mb-2 font-mono">scroll down</span>
            <ChevronDown size={24} className="animate-bounce" />
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Tech Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Bitcoin Symbol */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-1/4 right-1/4 text-6xl text-bitcoin-orange/20"
        >
          ₿
        </motion.div>

        {/* AI Chip */}
        <motion.div
          animate={{ 
            y: [0, 15, 0],
            x: [0, 10, 0]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-1/3 left-1/4 w-16 h-16 border border-neon-green/30 rounded-lg flex items-center justify-center"
        >
          <div className="w-8 h-8 bg-neon-green/20 rounded"></div>
        </motion.div>

        {/* Quantum Orb */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-1/3 left-1/6 w-12 h-12 bg-gradient-to-r from-quantum-blue to-neon-green rounded-full opacity-30"
        />
      </div>
    </section>
  );
};

export default HeroSection;
