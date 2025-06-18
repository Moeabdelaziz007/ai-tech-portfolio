import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  GraduationCap, 
  Building, 
  Award, 
  Code, 
  Shield, 
  Brain,
  Database,
  Globe,
  User
} from 'lucide-react';

const AboutSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skills = [
    { name: 'Python', level: 95, category: 'Programming' },
    { name: 'AI/ML', level: 90, category: 'Artificial Intelligence' },
    { name: 'Cybersecurity', level: 88, category: 'Security' },
    { name: 'Firebase', level: 85, category: 'Backend' },
    { name: 'Java', level: 80, category: 'Programming' },
    { name: 'Data Analysis', level: 85, category: 'Analytics' },
    { name: 'React/Web Dev', level: 82, category: 'Frontend' },
    { name: 'Excel/Automation', level: 88, category: 'Analytics' },
  ];

  const experience = [
    {
      company: 'OpenAI',
      role: 'AI Research Intern',
      period: '2024',
      description: 'Contributed to cutting-edge AI research and development projects',
      icon: Brain,
      color: 'text-neon-green'
    },
    {
      company: 'Intel Corporation',
      role: 'Cybersecurity Intern',
      period: '2023',
      description: 'Developed security protocols and vulnerability assessment tools',
      icon: Shield,
      color: 'text-quantum-blue'
    },
    {
      company: 'L\'Oréal',
      role: 'Technology Intern',
      period: '2023',
      description: 'Implemented data analytics solutions for business intelligence',
      icon: Database,
      color: 'text-bitcoin-orange'
    },
    {
      company: 'BlackRock',
      role: 'Talent Community Member',
      period: 'Ongoing',
      description: 'Part of exclusive talent network for future opportunities',
      icon: Building,
      color: 'text-medium-gray'
    },
  ];

  const projects = [
    'AMRIKYY AI Solutions - Comprehensive AI platform',
    'Codex AI - Advanced code generation system',
    'Digital Persona - AI-powered identity management',
    'Charity: water Landing Page - Responsive web design'
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-tech-white">About </span>
            <span className="text-neon-green">Me</span>
          </h2>
          <p className="text-xl text-medium-gray max-w-3xl mx-auto">
            Passionate about bridging the gap between artificial intelligence and cybersecurity, 
            creating innovative solutions for tomorrow's digital challenges.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Personal Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-effect p-8 rounded-xl"
          >
            <h3 className="text-2xl font-bold text-neon-green mb-6 flex items-center">
              <User className="mr-3" size={24} />
              Profile
            </h3>
            
            <div className="space-y-4 text-tech-white">
              <div className="flex items-center space-x-3">
                <GraduationCap className="text-quantum-blue" size={20} />
                <div>
                  <p className="font-semibold">Education</p>
                  <p className="text-medium-gray">Cybersecurity Engineering, Kennesaw State University (2026)</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Globe className="text-neon-green" size={20} />
                <div>
                  <p className="font-semibold">Location</p>
                  <p className="text-medium-gray">Cairo, Egypt</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Building className="text-bitcoin-orange" size={20} />
                <div>
                  <p className="font-semibold">Experience</p>
                  <p className="text-medium-gray">OpenAI, Intel, L'Oréal, BlackRock</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Award className="text-quantum-blue" size={20} />
                <div>
                  <p className="font-semibold">Specialization</p>
                  <p className="text-medium-gray">AI Development & Cybersecurity</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-neon-green/20">
              <h4 className="text-lg font-semibold text-tech-white mb-3">Key Projects</h4>
              <ul className="space-y-2">
                {projects.map((project, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="text-medium-gray flex items-center"
                  >
                    <span className="text-neon-green mr-2">▸</span>
                    {project}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass-effect p-8 rounded-xl"
          >
            <h3 className="text-2xl font-bold text-neon-green mb-6 flex items-center">
              <Code className="mr-3" size={24} />
              Technical Skills
            </h3>
            
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-tech-white font-medium">{skill.name}</span>
                    <span className="text-medium-gray text-sm">{skill.category}</span>
                  </div>
                  <div className="relative h-2 bg-dark-bg rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${skill.level}%` } : {}}
                      transition={{ delay: 0.8 + index * 0.1, duration: 1, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-neon-green to-quantum-blue rounded-full relative"
                    >
                      <div className="absolute inset-0 bg-neon-green animate-pulse-glow"></div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Experience Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="glass-effect p-8 rounded-xl"
        >
          <h3 className="text-2xl font-bold text-neon-green mb-8 text-center">Professional Experience</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {experience.map((exp, index) => {
              const Icon = exp.icon;
              return (
                <motion.div
                  key={exp.company}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8 + index * 0.2 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-dark-bg/50 p-6 rounded-lg border border-neon-green/20 hover:border-neon-green/40 transition-all"
                >
                  <div className="flex items-center mb-4">
                    <Icon className={`${exp.color} mr-3`} size={24} />
                    <span className="text-medium-gray text-sm">{exp.period}</span>
                  </div>
                  <h4 className="text-lg font-semibold text-tech-white mb-2">{exp.company}</h4>
                  <p className="text-neon-green font-medium mb-3">{exp.role}</p>
                  <p className="text-medium-gray text-sm">{exp.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-12"
        >
          <div className="glass-effect p-6 rounded-xl inline-block">
            <h4 className="text-lg font-semibold text-tech-white mb-4">Get In Touch</h4>
            <div className="flex flex-col sm:flex-row gap-4 text-medium-gray">
              <a 
                href="mailto:amrikyy@gmail.com" 
                className="hover:text-neon-green transition-colors"
              >
                📧 amrikyy@gmail.com
              </a>
              <span className="hidden sm:inline">|</span>
              <a 
                href="tel:+201094228044" 
                className="hover:text-neon-green transition-colors"
              >
                📱 +20 109 422 8044
              </a>
              <span className="hidden sm:inline">|</span>
              <a 
                href="tel:+17706160211" 
                className="hover:text-neon-green transition-colors"
              >
                📱 +1 770 616 0211
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
