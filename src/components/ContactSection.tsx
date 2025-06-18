import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  Instagram,
  Facebook,
  Globe,
  MessageSquare,
  User,
  FileText,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const ContactSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");

    // Simulate form submission
    setTimeout(() => {
      setFormStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Reset status after 3 seconds
      setTimeout(() => setFormStatus("idle"), 3000);
    }, 2000);
  };

  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/moeabdelaziz007",
      color: "hover:text-tech-white",
      description: "View my code repositories",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://linkedin.com/in/mohamed-abdelaziz-815797347",
      color: "hover:text-blue-400",
      description: "Professional networking",
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://instagram.com/amrikyy",
      color: "hover:text-pink-400",
      description: "Follow my journey",
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://facebook.com/share/17qHw2N9PG",
      color: "hover:text-blue-500",
      description: "Connect on Facebook",
    },
    {
      name: "Portfolio",
      icon: Globe,
      url: "https://moeabdelaziz007.github.io/amrikyy/",
      color: "hover:text-neon-green",
      description: "Visit my portfolio site",
    },
  ];

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "amrikyy@gmail.com",
      href: "mailto:amrikyy@gmail.com",
      color: "text-neon-green",
    },
    {
      icon: Phone,
      label: "Egypt",
      value: "+20 109 422 8044",
      href: "tel:+201094228044",
      color: "text-quantum-blue",
    },
    {
      icon: Phone,
      label: "USA",
      value: "+1 770 616 0211",
      href: "tel:+17706160211",
      color: "text-bitcoin-orange",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Cairo, Egypt",
      href: "#",
      color: "text-medium-gray",
    },
  ];

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            <span className="text-tech-white">
              Get In{" "}
            </span>
            <span className="text-neon-green">
              Touch
            </span>
          </h2>
          <p
            className="text-xl text-medium-gray max-w-3xl mx-auto"
          >
            Ready to collaborate on cutting-edge AI and cybersecurity projects?
            Let's connect and build the future together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-effect p-8 rounded-xl"
          >
            <h3
              className="text-2xl font-bold text-tech-white mb-6 flex items-center"
            >
              <MessageSquare
                className="text-neon-green mr-3"
                size={24}
              />
              Send a Message
            </h3>

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <div className="relative">
                  <User
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-medium-gray"
                    size={20}
                  />

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    required
                    className="w-full pl-12 pr-4 py-3 bg-dark-bg/50 border border-neon-green/20 rounded-lg text-tech-white placeholder-medium-gray focus:border-neon-green focus:outline-none transition-colors"
                  />
                </div>

                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-medium-gray"
                    size={20}
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your Email"
                    required
                    className="w-full pl-12 pr-4 py-3 bg-dark-bg/50 border border-neon-green/20 rounded-lg text-tech-white placeholder-medium-gray focus:border-neon-green focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="relative">
                <FileText
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-medium-gray"
                  size={20}
                />

                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Subject"
                  required
                  className="w-full pl-12 pr-4 py-3 bg-dark-bg/50 border border-neon-green/20 rounded-lg text-tech-white placeholder-medium-gray focus:border-neon-green focus:outline-none transition-colors"
                />
              </div>

              <div className="relative">
                <MessageSquare
                  className="absolute left-3 top-4 text-medium-gray"
                  size={20}
                />

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your Message"
                  required
                  rows={5}
                  className="w-full pl-12 pr-4 py-3 bg-dark-bg/50 border border-neon-green/20 rounded-lg text-tech-white placeholder-medium-gray focus:border-neon-green focus:outline-none transition-colors resize-none"
                />
              </div>

              <motion.button
                type="submit"
                disabled={formStatus === "sending"}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 ${
                  formStatus === "sending"
                    ? "bg-medium-gray cursor-not-allowed"
                    : formStatus === "success"
                      ? "bg-green-500 text-white"
                      : formStatus === "error"
                        ? "bg-red-500 text-white"
                        : "bg-neon-green text-dark-bg hover:bg-neon-green/90"
                }`}
              >
                {formStatus === "sending" && (
                  <>
                    <div
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                    />

                    <span>Sending...</span>
                  </>
                )}
                {formStatus === "success" && (
                  <>
                    <CheckCircle size={20} />
                    <span>Message Sent!</span>
                  </>
                )}
                {formStatus === "error" && (
                  <>
                    <AlertCircle size={20} />
                    <span>Error. Try Again</span>
                  </>
                )}
                {formStatus === "idle" && (
                  <>
                    <Send size={20} />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info & Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Contact Information */}
            <div className="glass-effect p-8 rounded-xl">
              <h3
                className="text-2xl font-bold text-tech-white mb-6"
              >
                Contact Information
              </h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <motion.a
                      key={info.label}
                      href={info.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      whileHover={{ x: 5 }}
                      className={`flex items-center space-x-4 p-3 rounded-lg hover:bg-dark-bg/30 transition-all group ${
                        info.href === "#" ? "cursor-default" : "cursor-pointer"
                      }`}
                    >
                      <Icon
                        className={`${info.color} group-hover:scale-110 transition-transform`}
                        size={24}
                      />

                      <div>
                        <div
                          className="text-medium-gray text-sm"
                        >
                          {info.label}
                        </div>
                        <div
                          className="text-tech-white font-medium"
                        >
                          {info.value}
                        </div>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Social Media Links */}
            <div className="glass-effect p-8 rounded-xl">
              <h3
                className="text-2xl font-bold text-tech-white mb-6"
              >
                Connect With Me
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      whileHover={{
                        scale: 1.05,
                        y: -5,
                        boxShadow: "0 10px 25px rgba(0, 255, 0, 0.2)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex flex-col items-center p-4 bg-dark-bg/50 rounded-lg border border-neon-green/20 hover:border-neon-green/40 transition-all group text-center ${social.color}`}
                    >
                      <Icon
                        size={32}
                        className="mb-2 text-medium-gray group-hover:text-current transition-colors"
                      />

                      <span
                        className="text-tech-white font-medium mb-1"
                      >
                        {social.name}
                      </span>
                      <span
                        className="text-xs text-medium-gray group-hover:text-current transition-colors"
                      >
                        {social.description}
                      </span>
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Professional Quote */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="glass-effect p-8 rounded-xl text-center"
            >
              <div className="text-4xl text-neon-green mb-4">
                "
              </div>
              <p
                className="text-lg text-tech-white mb-4 italic"
              >
                Innovation happens when artificial intelligence meets
                cybersecurity, creating solutions that protect and empower the
                digital future.
              </p>
              <div className="text-medium-gray">
                — Mohamed H. Abdelaziz (Amrikyy)
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="text-center mt-16"
        >
          <div className="glass-effect p-8 rounded-xl">
            <h3
              className="text-2xl font-bold text-tech-white mb-4"
            >
              Ready to Start a Project?
            </h3>
            <p
              className="text-medium-gray mb-6 max-w-2xl mx-auto"
            >
              Whether you need AI solutions, cybersecurity consulting, or
              innovative web applications, I'm here to help bring your ideas to
              life with cutting-edge technology.
            </p>
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.a
                href="mailto:amrikyy@gmail.com?subject=Project Collaboration"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-neon-green text-dark-bg font-semibold rounded-lg hover:bg-neon-green/90 transition-colors flex items-center justify-center space-x-2"
              >
                <Mail size={20} />
                <span>Start a Conversation</span>
              </motion.a>

              <motion.a
                href="/cv/Mohamed_Abdelaziz_CV.pdf"
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border border-neon-green text-neon-green hover:bg-neon-green hover:text-dark-bg transition-colors rounded-lg flex items-center justify-center space-x-2"
              >
                <FileText size={20} />
                <span>Download Resume</span>
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
