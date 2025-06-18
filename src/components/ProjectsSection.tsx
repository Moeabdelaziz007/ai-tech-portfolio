import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import {
  Github,
  ExternalLink,
  Calendar,
  TrendingUp,
  Filter,
  X,
  Play,
} from "lucide-react";

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

  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    // Load projects data
    fetch("/data/projects.json")
      .then((response) => response.json())
      .then((data) => {
        setProjects(data);
        setFilteredProjects(data);
      })
      .catch((error) => console.error("Error loading projects:", error));
  }, []);

  const categories = [
    "All",
    "AI/ML",
    "Blockchain",
    "Quantum",
    "Web Development",
  ];

  const filterProjects = (category: string) => {
    setActiveFilter(category);
    if (category === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((project) => project.category === category),
      );
    }
  };

  const handleProjectClick = (project: Project) => {
    // Check if it's an internal route
    if (project.demoUrl.startsWith("/")) {
      navigate(project.demoUrl);
    } else {
      setSelectedProject(project);
    }
  };

  const getTechColor = (tech: string) => {
    const colors: { [key: string]: string } = {
      Python: "bg-blue-500",
      React: "bg-cyan-500",
      TensorFlow: "bg-orange-500",
      TypeScript: "bg-blue-600",
      "Node.js": "bg-green-500",
      Docker: "bg-blue-400",
      Kubernetes: "bg-purple-500",
      "Three.js": "bg-red-500",
      WebGL: "bg-yellow-500",
      PyTorch: "bg-red-600",
      FastAPI: "bg-green-600",
      Redis: "bg-red-400",
      PostgreSQL: "bg-blue-700",
      "D3.js": "bg-orange-400",
      Flask: "bg-gray-500",
      "Quantum.js": "bg-purple-600",
      "Math.js": "bg-indigo-500",
      "Chart.js": "bg-pink-500",
      "Quantum Computing": "bg-purple-700",
    };
    return colors[tech] || "bg-medium-gray";
  };

  return (
    <section id="projects" className="py-20 relative" data-oid="7xi-0v.">
      <div className="container mx-auto px-4" ref={ref} data-oid="ui60kqe">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
          data-oid="oo5qudg"
        >
          <h2
            className="text-4xl md:text-5xl font-bold mb-6"
            data-oid="5b4pwvy"
          >
            <span className="text-tech-white" data-oid="_19uzv3">
              Featured{" "}
            </span>
            <span className="text-neon-green" data-oid="4y81t9t">
              Projects
            </span>
          </h2>
          <p
            className="text-xl text-medium-gray max-w-3xl mx-auto"
            data-oid="x5hu4qh"
          >
            Innovative solutions at the intersection of AI, cybersecurity, and
            emerging technologies.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
          data-oid=":182_46"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => filterProjects(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeFilter === category
                  ? "bg-neon-green text-dark-bg shadow-lg shadow-neon-green/25"
                  : "glass-effect text-tech-white hover:text-neon-green border border-neon-green/20"
              }`}
              data-oid="eqium5o"
            >
              <Filter className="inline mr-2" size={16} data-oid="bc.xz28" />
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait" data-oid="s5-wfxp">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            data-oid="vdc5pj7"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="glass-effect rounded-xl overflow-hidden group cursor-pointer"
                onClick={() => handleProjectClick(project)}
                data-oid="nwcfq:c"
              >
                {/* Project Image */}
                <div
                  className="relative h-48 overflow-hidden"
                  data-oid="s.g.1e2"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    data-oid="t5juxdp"
                  />

                  <div
                    className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent opacity-60"
                    data-oid="e390o43"
                  />

                  {/* Featured Badge */}
                  {project.featured && (
                    <div
                      className="absolute top-4 right-4 bg-neon-green text-dark-bg px-3 py-1 rounded-full text-sm font-semibold"
                      data-oid="_g2irqe"
                    >
                      Featured
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div
                    className="absolute inset-0 bg-dark-bg/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                    data-oid="25tj.nh"
                  >
                    <Play
                      className="text-neon-green"
                      size={48}
                      data-oid="46oh_u2"
                    />
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6" data-oid="2b2g:9b">
                  <div
                    className="flex items-center justify-between mb-3"
                    data-oid="ouu_j-d"
                  >
                    <span
                      className="text-neon-green text-sm font-semibold"
                      data-oid="nqpwlyi"
                    >
                      {project.category}
                    </span>
                    <span
                      className="text-medium-gray text-sm flex items-center"
                      data-oid=".emsr.j"
                    >
                      <Calendar size={14} className="mr-1" data-oid="yor4os0" />
                      {project.completion}
                    </span>
                  </div>

                  <h3
                    className="text-xl font-bold text-tech-white mb-3 group-hover:text-neon-green transition-colors"
                    data-oid=".zeg_fk"
                  >
                    {project.title}
                  </h3>

                  <p
                    className="text-medium-gray mb-4 line-clamp-3"
                    data-oid="gw-5l3m"
                  >
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4" data-oid="unz7w4_">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className={`px-2 py-1 text-xs rounded-full text-white ${getTechColor(tech)}`}
                        data-oid="ox7yi6k"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span
                        className="px-2 py-1 text-xs rounded-full bg-medium-gray text-white"
                        data-oid="0h.:sax"
                      >
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3" data-oid="hnxo7i.">
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (project.demoUrl.startsWith("/")) {
                          navigate(project.demoUrl);
                        } else {
                          window.open(project.demoUrl, "_blank");
                        }
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 bg-neon-green text-dark-bg py-2 px-4 rounded-lg font-medium hover:bg-neon-green/90 transition-colors flex items-center justify-center text-sm"
                      data-oid="r7tn-vh"
                    >
                      <ExternalLink
                        size={16}
                        className="mr-2"
                        data-oid="-p4ov2g"
                      />
                      Demo
                    </motion.button>
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 border border-neon-green text-neon-green py-2 px-4 rounded-lg font-medium hover:bg-neon-green hover:text-dark-bg transition-colors flex items-center justify-center text-sm"
                      onClick={(e) => e.stopPropagation()}
                      data-oid="ygvcohl"
                    >
                      <Github size={16} className="mr-2" data-oid="n54qnk2" />
                      Code
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Project Modal */}
        <AnimatePresence data-oid="7okhu:5">
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-bg/90 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
              data-oid="e-c4bht"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-dark-bg border border-neon-green/20 rounded-xl p-8 max-w-4xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
                data-oid="jz5v0rw"
              >
                <div
                  className="flex justify-between items-start mb-6"
                  data-oid="w2gwv:t"
                >
                  <div data-oid="fv3_pph">
                    <h3
                      className="text-3xl font-bold text-tech-white mb-2"
                      data-oid="22pc3hu"
                    >
                      {selectedProject.title}
                    </h3>
                    <span
                      className="text-neon-green font-semibold"
                      data-oid="f1w87v5"
                    >
                      {selectedProject.category}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="text-medium-gray hover:text-tech-white transition-colors"
                    data-oid="9xscn45"
                  >
                    <X size={24} data-oid="6i1sj2o" />
                  </button>
                </div>

                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  loading="lazy"
                  className="w-full h-64 object-cover rounded-lg mb-6"
                  data-oid="8diuy3c"
                />

                <p
                  className="text-medium-gray text-lg leading-relaxed mb-6"
                  data-oid="gby.pnz"
                >
                  {selectedProject.longDescription}
                </p>

                <div
                  className="grid md:grid-cols-2 gap-6 mb-6"
                  data-oid="qhz5:yi"
                >
                  <div data-oid="1776qq-">
                    <h4
                      className="text-lg font-semibold text-tech-white mb-3"
                      data-oid="u5f2-wd"
                    >
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2" data-oid="4einuil">
                      {selectedProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className={`px-3 py-1 text-sm rounded-full text-white ${getTechColor(tech)}`}
                          data-oid="b8mmo:b"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div data-oid="s2vdfh4">
                    <h4
                      className="text-lg font-semibold text-tech-white mb-3"
                      data-oid=":d:7.1z"
                    >
                      Impact
                    </h4>
                    <p
                      className="text-medium-gray flex items-start"
                      data-oid="8ul6i3j"
                    >
                      <TrendingUp
                        className="text-neon-green mr-2 mt-1 flex-shrink-0"
                        size={16}
                        data-oid="q_ho_wl"
                      />

                      {selectedProject.impact}
                    </p>
                  </div>
                </div>

                <div className="flex space-x-4" data-oid="yvamdra">
                  <motion.button
                    onClick={() => {
                      if (selectedProject.demoUrl.startsWith("/")) {
                        navigate(selectedProject.demoUrl);
                      } else {
                        window.open(selectedProject.demoUrl, "_blank");
                      }
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-neon-green text-dark-bg py-3 px-6 rounded-lg font-medium hover:bg-neon-green/90 transition-colors flex items-center"
                    data-oid="_k.rk2p"
                  >
                    <ExternalLink
                      size={20}
                      className="mr-2"
                      data-oid="_:lgd.k"
                    />
                    View Live Demo
                  </motion.button>
                  <motion.a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border border-neon-green text-neon-green py-3 px-6 rounded-lg font-medium hover:bg-neon-green hover:text-dark-bg transition-colors flex items-center"
                    data-oid="_penj3:"
                  >
                    <Github size={20} className="mr-2" data-oid="bnlxwf." />
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
