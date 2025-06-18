import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  GraduationCap,
  Building,
  Award,
  Code,
  Shield,
  Brain,
  Database,
  Globe,
  User,
} from "lucide-react";

const AboutSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skills = [
    { name: "Python", level: 95, category: "Programming" },
    { name: "AI/ML", level: 90, category: "Artificial Intelligence" },
    { name: "Cybersecurity", level: 88, category: "Security" },
    { name: "Firebase", level: 85, category: "Backend" },
    { name: "Java", level: 80, category: "Programming" },
    { name: "Data Analysis", level: 85, category: "Analytics" },
    { name: "React/Web Dev", level: 82, category: "Frontend" },
    { name: "Excel/Automation", level: 88, category: "Analytics" },
  ];

  const experience = [
    {
      company: "OpenAI",
      role: "AI Research Intern",
      period: "2024",
      description:
        "Contributed to cutting-edge AI research and development projects",
      icon: Brain,
      color: "text-neon-green",
    },
    {
      company: "Intel Corporation",
      role: "Cybersecurity Intern",
      period: "2023",
      description:
        "Developed security protocols and vulnerability assessment tools",
      icon: Shield,
      color: "text-quantum-blue",
    },
    {
      company: "L'Oréal",
      role: "Technology Intern",
      period: "2023",
      description:
        "Implemented data analytics solutions for business intelligence",
      icon: Database,
      color: "text-bitcoin-orange",
    },
    {
      company: "BlackRock",
      role: "Talent Community Member",
      period: "Ongoing",
      description: "Part of exclusive talent network for future opportunities",
      icon: Building,
      color: "text-medium-gray",
    },
  ];

  const projects = [
    "AMRIKYY AI Solutions - Comprehensive AI platform",
    "Codex AI - Advanced code generation system",
    "Digital Persona - AI-powered identity management",
    "Charity: water Landing Page - Responsive web design",
  ];

  return (
    <section id="about" className="py-20 relative" data-oid="t49czx9">
      <div className="container mx-auto px-4" ref={ref} data-oid=":xs3:i8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
          data-oid="hdpf_3p"
        >
          <h2
            className="text-4xl md:text-5xl font-bold mb-6"
            data-oid="l3xw41k"
          >
            <span className="text-tech-white" data-oid="k7uswt0">
              About{" "}
            </span>
            <span className="text-neon-green" data-oid="_v.yt78">
              Me
            </span>
          </h2>
          <p
            className="text-xl text-medium-gray max-w-3xl mx-auto"
            data-oid="d:.k_rr"
          >
            Passionate about bridging the gap between artificial intelligence
            and cybersecurity, creating innovative solutions for tomorrow's
            digital challenges.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16" data-oid="srrwz_2">
          {/* Personal Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-effect p-8 rounded-xl"
            data-oid="-i3d2c."
          >
            <h3
              className="text-2xl font-bold text-neon-green mb-6 flex items-center"
              data-oid="0hb6gxe"
            >
              <User className="mr-3" size={24} data-oid="4g91y.u" />
              Profile
            </h3>

            <div className="space-y-4 text-tech-white" data-oid="wrguxn5">
              <div className="flex items-center space-x-3" data-oid="a.rga9h">
                <GraduationCap
                  className="text-quantum-blue"
                  size={20}
                  data-oid="1i7pqjt"
                />

                <div data-oid="vrsue8v">
                  <p className="font-semibold" data-oid="2lrm036">
                    Education
                  </p>
                  <p className="text-medium-gray" data-oid="319s_.k">
                    Cybersecurity Engineering, Kennesaw State University (2026)
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3" data-oid="v:-8d4p">
                <Globe
                  className="text-neon-green"
                  size={20}
                  data-oid="do4rts:"
                />

                <div data-oid=":jlo7me">
                  <p className="font-semibold" data-oid="jvc31mo">
                    Location
                  </p>
                  <p className="text-medium-gray" data-oid="1jnc9d6">
                    Cairo, Egypt
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3" data-oid="kanlzvx">
                <Building
                  className="text-bitcoin-orange"
                  size={20}
                  data-oid="hgq_trk"
                />

                <div data-oid="a.9v83l">
                  <p className="font-semibold" data-oid="h3.6gdl">
                    Experience
                  </p>
                  <p className="text-medium-gray" data-oid="jkcg2.9">
                    OpenAI, Intel, L'Oréal, BlackRock
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3" data-oid="1r81ho1">
                <Award
                  className="text-quantum-blue"
                  size={20}
                  data-oid="i:rdx41"
                />

                <div data-oid="_:es.ak">
                  <p className="font-semibold" data-oid="sw6vt.j">
                    Specialization
                  </p>
                  <p className="text-medium-gray" data-oid="1umgbp9">
                    AI Development & Cybersecurity
                  </p>
                </div>
              </div>
            </div>

            <div
              className="mt-6 pt-6 border-t border-neon-green/20"
              data-oid="o7ib9nu"
            >
              <h4
                className="text-lg font-semibold text-tech-white mb-3"
                data-oid=":_2.4h2"
              >
                Key Projects
              </h4>
              <ul className="space-y-2" data-oid="yqx-h3t">
                {projects.map((project, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="text-medium-gray flex items-center"
                    data-oid="mfx.c.d"
                  >
                    <span className="text-neon-green mr-2" data-oid="wxloklf">
                      ▸
                    </span>
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
            data-oid="if54-ws"
          >
            <h3
              className="text-2xl font-bold text-neon-green mb-6 flex items-center"
              data-oid="8hlg-qn"
            >
              <Code className="mr-3" size={24} data-oid="f9u6o_y" />
              Technical Skills
            </h3>

            <div className="space-y-4" data-oid="93naz8-">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="space-y-2"
                  data-oid="nz_epoc"
                >
                  <div
                    className="flex justify-between items-center"
                    data-oid="9stafg5"
                  >
                    <span
                      className="text-tech-white font-medium"
                      data-oid="fgveqlw"
                    >
                      {skill.name}
                    </span>
                    <span
                      className="text-medium-gray text-sm"
                      data-oid="q1ppb00"
                    >
                      {skill.category}
                    </span>
                  </div>
                  <div
                    className="relative h-2 bg-dark-bg rounded-full overflow-hidden"
                    data-oid="79v-lbe"
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${skill.level}%` } : {}}
                      transition={{
                        delay: 0.8 + index * 0.1,
                        duration: 1,
                        ease: "easeOut",
                      }}
                      className="h-full bg-gradient-to-r from-neon-green to-quantum-blue rounded-full relative"
                      data-oid="8hrk39s"
                    >
                      <div
                        className="absolute inset-0 bg-neon-green animate-pulse-glow"
                        data-oid="xevyqs4"
                      ></div>
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
          data-oid="1ifd0g4"
        >
          <h3
            className="text-2xl font-bold text-neon-green mb-8 text-center"
            data-oid=".ne75.t"
          >
            Professional Experience
          </h3>

          <div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            data-oid="1tyry.q"
          >
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
                  data-oid="2lea6f9"
                >
                  <div className="flex items-center mb-4" data-oid="d:jeebi">
                    <Icon
                      className={`${exp.color} mr-3`}
                      size={24}
                      data-oid="op11en9"
                    />

                    <span
                      className="text-medium-gray text-sm"
                      data-oid="seru3v9"
                    >
                      {exp.period}
                    </span>
                  </div>
                  <h4
                    className="text-lg font-semibold text-tech-white mb-2"
                    data-oid="80..s:i"
                  >
                    {exp.company}
                  </h4>
                  <p
                    className="text-neon-green font-medium mb-3"
                    data-oid="_ksu39y"
                  >
                    {exp.role}
                  </p>
                  <p className="text-medium-gray text-sm" data-oid="rw22.60">
                    {exp.description}
                  </p>
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
          data-oid=":dh.hcp"
        >
          <div
            className="glass-effect p-6 rounded-xl inline-block"
            data-oid="pk00slf"
          >
            <h4
              className="text-lg font-semibold text-tech-white mb-4"
              data-oid="izykcep"
            >
              Get In Touch
            </h4>
            <div
              className="flex flex-col sm:flex-row gap-4 text-medium-gray"
              data-oid="l5imr5u"
            >
              <a
                href="mailto:amrikyy@gmail.com"
                className="hover:text-neon-green transition-colors"
                data-oid="9uwck.w"
              >
                📧 amrikyy@gmail.com
              </a>
              <span className="hidden sm:inline" data-oid="4ei8hlp">
                |
              </span>
              <a
                href="tel:+201094228044"
                className="hover:text-neon-green transition-colors"
                data-oid="0y4w:b1"
              >
                📱 +20 109 422 8044
              </a>
              <span className="hidden sm:inline" data-oid="kozo2wu">
                |
              </span>
              <a
                href="tel:+17706160211"
                className="hover:text-neon-green transition-colors"
                data-oid="v-oj88_"
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
