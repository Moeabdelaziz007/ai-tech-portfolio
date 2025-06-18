import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ChevronDown,
  Download,
  Github,
  Linkedin,
  Instagram,
  Globe,
} from "lucide-react";

const HeroSection = () => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullText = "Cybersecurity Engineer & AI Developer";

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + fullText[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const socialLinks = [
    {
      icon: Github,
      url: "https://github.com/moeabdelaziz007",
      label: "GitHub",
    },
    {
      icon: Linkedin,
      url: "https://linkedin.com/in/mohamed-abdelaziz-815797347",
      label: "LinkedIn",
    },
    {
      icon: Instagram,
      url: "https://instagram.com/amrikyy",
      label: "Instagram",
    },
    {
      icon: Globe,
      url: "https://moeabdelaziz007.github.io/amrikyy/",
      label: "Portfolio",
    },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      data-oid="yv8--w."
    >
      {/* Hero Background */}
      <div className="absolute inset-0 z-0" data-oid="7fwfb7p">
        <img
          src="/images/hero-background.jpg"
          alt="AI Neural Network Background"
          loading="lazy"
          className="w-full h-full object-cover opacity-20"
          data-oid="9x2_z_."
        />

        <div
          className="absolute inset-0 bg-gradient-to-b from-dark-bg/70 via-dark-bg/50 to-dark-bg"
          data-oid="glrib_:"
        />
      </div>

      <div
        className="relative z-10 container mx-auto px-4 text-center"
        data-oid="31d8qtv"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
          data-oid="7x8app7"
        >
          {/* Profile Image */}
          <motion.div
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, type: "spring", stiffness: 100 }}
            className="mb-8"
            data-oid="z6sacnn"
          >
            <div className="relative w-32 h-32 mx-auto" data-oid="pu1n-bs">
              <img
                src="/images/profile-avatar.jpg"
                alt="Mohamed H. Abdelaziz"
                loading="lazy"
                className="w-full h-full rounded-full object-cover neon-border"
                data-oid="g3_:eeh"
              />

              <div
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-neon-green/20 to-quantum-blue/20 animate-pulse-glow"
                data-oid="oj9g14e"
              ></div>
            </div>
          </motion.div>

          {/* Name and Title */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mb-6"
            data-oid="lsz:sid"
          >
            <h1
              className="text-4xl md:text-6xl font-bold mb-4"
              data-oid="w:q9s59"
            >
              <span className="text-tech-white" data-oid="k9.ay-p">
                Mohamed H.{" "}
              </span>
              <span className="text-neon-green holographic" data-oid="2_sq096">
                Abdelaziz
              </span>
            </h1>
            <div
              className="text-xl md:text-2xl text-medium-gray mb-2"
              data-oid="zwvo5ju"
            >
              <span className="text-quantum-blue" data-oid="d5.25j-">
                (
              </span>
              <span className="text-neon-green font-mono" data-oid="ytr-tfz">
                Amrikyy
              </span>
              <span className="text-quantum-blue" data-oid="gsrz2tt">
                )
              </span>
            </div>
          </motion.div>

          {/* Typing Effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mb-8"
            data-oid="ni:3zec"
          >
            <h2
              className="text-xl md:text-3xl font-light text-tech-white"
              data-oid="9hi:.2f"
            >
              <span className="font-mono text-neon-green" data-oid="iaio:9k">
                &gt;{" "}
              </span>
              {displayText}
              <span
                className="animate-blink border-r-2 border-neon-green ml-1"
                data-oid="c8_itgh"
              ></span>
            </h2>
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="text-lg md:text-xl text-medium-gray mb-8 max-w-3xl mx-auto leading-relaxed"
            data-oid="_-x8kji"
          >
            26-year-old Egyptian-American innovator based in Cairo, specializing
            in AI solutions and cybersecurity engineering. Currently pursuing
            Cybersecurity Engineering at Kennesaw State University with
            experience at
            <span className="text-neon-green" data-oid="rzp5..e">
              {" "}
              OpenAI
            </span>
            ,
            <span className="text-quantum-blue" data-oid=".o.c6be">
              {" "}
              Intel
            </span>
            , and
            <span className="text-bitcoin-orange" data-oid="71sp1ly">
              {" "}
              L'Oréal
            </span>
            .
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            data-oid="9g7b.h6"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px #00FF00" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-neon-green text-dark-bg font-semibold rounded-lg hover:bg-neon-green/90 transition-colors flex items-center justify-center space-x-2"
              onClick={scrollToAbout}
              data-oid="cvtnkf0"
            >
              <span data-oid="bd_u:f:">Explore My Work</span>
              <ChevronDown size={20} data-oid="g61kpey" />
            </motion.button>

            <motion.a
              href="/cv/Mohamed_Abdelaziz_CV.pdf"
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border border-neon-green text-neon-green hover:bg-neon-green hover:text-dark-bg transition-colors rounded-lg flex items-center justify-center space-x-2"
              data-oid="r8t0q3e"
            >
              <Download size={20} data-oid="nrk4:y2" />
              <span data-oid="xji_4g.">Download CV</span>
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 0.8 }}
            className="flex justify-center space-x-6"
            data-oid="ypu4bcp"
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
                    boxShadow: "0 5px 15px rgba(0, 255, 0, 0.4)",
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 glass-effect rounded-full text-tech-white hover:text-neon-green transition-colors group"
                  aria-label={social.label}
                  data-oid="59c85s-"
                >
                  <Icon size={24} data-oid="l06enrd" />
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
          data-oid="jh-zar1"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center text-medium-gray"
            data-oid="9khohrx"
          >
            <span className="text-sm mb-2 font-mono" data-oid="s8kuxw5">
              scroll down
            </span>
            <ChevronDown
              size={24}
              className="animate-bounce"
              data-oid="ml-_wzh"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Tech Elements */}
      <div className="absolute inset-0 pointer-events-none" data-oid="z4sbepq">
        {/* Bitcoin Symbol */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 right-1/4 text-6xl text-bitcoin-orange/20"
          data-oid="sl0qkvc"
        >
          ₿
        </motion.div>

        {/* AI Chip */}
        <motion.div
          animate={{
            y: [0, 15, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-1/3 left-1/4 w-16 h-16 border border-neon-green/30 rounded-lg flex items-center justify-center"
          data-oid="oxyc9dy"
        >
          <div
            className="w-8 h-8 bg-neon-green/20 rounded"
            data-oid="4u1emd4"
          ></div>
        </motion.div>

        {/* Quantum Orb */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-1/3 left-1/6 w-12 h-12 bg-gradient-to-r from-quantum-blue to-neon-green rounded-full opacity-30"
          data-oid="5.v77jp"
        />
      </div>
    </section>
  );
};

export default HeroSection;
