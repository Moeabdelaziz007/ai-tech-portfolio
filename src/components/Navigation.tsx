import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, User, Briefcase, BarChart3, Mail } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { id: "hero", label: "Home", icon: Home },
    { id: "about", label: "About", icon: User },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "dashboard", label: "Analytics", icon: BarChart3 },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section, index) => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;

          if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
          ) {
            setActiveSection(navItems[index].id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glass-effect" : "bg-transparent"
        }`}
        data-oid="8vqegfq"
      >
        <div className="container mx-auto px-4" data-oid="lwnbspu">
          <div
            className="flex items-center justify-between h-16"
            data-oid="gun06tr"
          >
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-xl font-bold font-mono"
              data-oid="z:7_ew5"
            >
              <span className="text-neon-green" data-oid="pw46dpz">
                &lt;
              </span>
              <span className="text-tech-white" data-oid="7sfb3k:">
                Amrikyy
              </span>
              <span className="text-neon-green" data-oid="4j3n-az">
                /&gt;
              </span>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8" data-oid="8nib_.o">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? "text-neon-green"
                      : "text-tech-white hover:text-neon-green"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  data-oid="y33bafd"
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon-green"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                      data-oid=".jchtyo"
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 text-tech-white hover:text-neon-green"
              onClick={() => setIsOpen(!isOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-oid="akh5dju"
            >
              {isOpen ? (
                <X size={24} data-oid="ybqoddh" />
              ) : (
                <Menu size={24} data-oid="s9qb-a:" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence data-oid="79:_a0u">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 z-40 md:hidden"
            data-oid="1kd2g5m"
          >
            <div
              className="fixed inset-0 bg-dark-bg/90 backdrop-blur-sm"
              data-oid="tbh7u-s"
            />

            <motion.div
              className="fixed right-0 top-0 h-full w-64 glass-effect border-l border-neon-green/20"
              data-oid="o_vkn:e"
            >
              <div className="flex flex-col pt-20 px-6" data-oid="nppd9qa">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => scrollToSection(item.id)}
                      className={`flex items-center space-x-3 py-3 px-4 mb-2 rounded-lg transition-colors ${
                        activeSection === item.id
                          ? "bg-neon-green/20 text-neon-green"
                          : "text-tech-white hover:bg-neon-green/10 hover:text-neon-green"
                      }`}
                      data-oid="ky9vfm5"
                    >
                      <Icon size={20} data-oid="-qghko0" />
                      <span data-oid="y0siw47">{item.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
