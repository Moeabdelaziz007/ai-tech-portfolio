import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Github, 
  ExternalLink, 
  Calendar, 
  TrendingUp,
  Filter,
  X,
  Play
} from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  category: string;
  demoUrl: string;
  githubUrl: string;
  featured: boolean;
  completion: string;
  impact: string;
}

const ProjectsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    // Load projects data
    fetch('/data/projects.json')
      .then(response => response.json())
      .then(data => {
        setProjects(data);
        setFilteredProjects(data);
      })
      .catch(error => console.error('Error loading projects:', error));
  }, []);

  const categories = ['All', 'AI/ML', 'Blockchain', 'Quantum', 'Web Development'];

  const filterProjects = (category: string) => {
    setActiveFilter(category);
    if (category === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === category));
    }
  };

  const getTechColor = (tech: string) => {
    const colors: { [key: string]: string } = {
      'Python': 'bg-blue-500',
      'React': 'bg-cyan-500',
      'TensorFlow': 'bg-orange-500',
      'TypeScript': 'bg-blue-600',
      'Node.js': 'bg-green-500',
      'Docker': 'bg-blue-400',
      'Kubernetes': 'bg-purple-500',
      'Three.js': 'bg-red-500',
      'WebGL': 'bg-yellow-500',
      'PyTorch': 'bg-red-600',
      'FastAPI': 'bg-green-600',
      'Redis': 'bg-red-400',
      'PostgreSQL': 'bg-blue-700',
      'D3.js': 'bg-orange-400',
      'Flask': 'bg-gray-500',
      'Quantum.js': 'bg-purple-600',
    };
    return colors[tech] || 'bg-medium-gray';
  };

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-tech-white">Featured </span>
            <span className="text-neon-green">Projects</span>
          </h2>
          <p className="text-xl text-medium-gray max-w-3xl mx-auto">
            Innovative solutions at the intersection of AI, cybersecurity, and emerging technologies.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => filterProjects(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeFilter === category
                  ? 'bg-neon-green text-dark-bg shadow-lg shadow-neon-green/25'
                  : 'glass-effect text-tech-white hover:text-neon-green border border-neon-green/20'
              }`}
            >
              <Filter className="inline mr-2" size={16} />
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="glass-effect rounded-xl overflow-hidden group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent opacity-60" />
                  
                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 right-4 bg-neon-green text-dark-bg px-3 py-1 rounded-full text-sm font-semibold">
                      Featured
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-dark-bg/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Play className="text-neon-green" size={48} />
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-neon-green text-sm font-semibold">{project.category}</span>
                    <span className="text-medium-gray text-sm flex items-center">
                      <Calendar size={14} className="mr-1" />
                      {project.completion}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-tech-white mb-3 group-hover:text-neon-green transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-medium-gray mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className={`px-2 py-1 text-xs rounded-full text-white ${getTechColor(tech)}`}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 text-xs rounded-full bg-medium-gray text-white">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <motion.a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 bg-neon-green text-dark-bg py-2 px-4 rounded-lg font-medium hover:bg-neon-green/90 transition-colors flex items-center justify-center text-sm"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink size={16} className="mr-2" />
                      Demo
                    </motion.a>
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 border border-neon-green text-neon-green py-2 px-4 rounded-lg font-medium hover:bg-neon-green hover:text-dark-bg transition-colors flex items-center justify-center text-sm"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github size={16} className="mr-2" />
                      Code
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-bg/90 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-dark-bg border border-neon-green/20 rounded-xl p-8 max-w-4xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-3xl font-bold text-tech-white mb-2">{selectedProject.title}</h3>
                    <span className="text-neon-green font-semibold">{selectedProject.category}</span>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="text-medium-gray hover:text-tech-white transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />

                <p className="text-medium-gray text-lg leading-relaxed mb-6">
                  {selectedProject.longDescription}
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="text-lg font-semibold text-tech-white mb-3">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className={`px-3 py-1 text-sm rounded-full text-white ${getTechColor(tech)}`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-tech-white mb-3">Impact</h4>
                    <p className="text-medium-gray flex items-start">
                      <TrendingUp className="text-neon-green mr-2 mt-1 flex-shrink-0" size={16} />
                      {selectedProject.impact}
                    </p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <motion.a
                    href={selectedProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-neon-green text-dark-bg py-3 px-6 rounded-lg font-medium hover:bg-neon-green/90 transition-colors flex items-center"
                  >
                    <ExternalLink size={20} className="mr-2" />
                    View Live Demo
                  </motion.a>
                  <motion.a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border border-neon-green text-neon-green py-3 px-6 rounded-lg font-medium hover:bg-neon-green hover:text-dark-bg transition-colors flex items-center"
                  >
                    <Github size={20} className="mr-2" />
                    View Source Code
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProjectsSection;
