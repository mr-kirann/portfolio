import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Facebook, Mail, Terminal } from 'lucide-react';

// CDN-based colorful icons for each skill
const skills = [
  { name: 'HTML', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'JavaScript', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'Bootstrap', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
  { name: 'Tailwind CSS', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Vue.js', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
  { name: 'React.js', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Node.js', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'PHP', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
  { name: 'Python', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'C', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg' },
  { name: 'C++', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
  { name: 'C#', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg' },
  { name: 'Linux', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
  { name: 'Docker', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'MySQL', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'MongoDB', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'Git', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' }
];

const projects = [
  {
    title: 'Kirann - Designs Studio',
    description: 'A modern branding studio site built with ReactJS and Tailwind CSS, showcasing design and printing services.',
    tech: ['React', 'Tailwind CSS', 'Farmer Motion'],
    github: '#',
    demo: '#'
  },
  {
    title: 'WebSentry',
    description: 'A cross-platform GUI Web Vulnerability Scanning Tool with a hacking-style interface. (Built for Windows, Linux, macOS)',
    tech: ['Python', 'PyQt5', 'Web Security', 'PDF Reports'],
    github: '#',
    demo: '#'
  },
  {
    title: 'Personal Blog',
    description: 'Full-stack blog platform using ReactJS, Tailwind CSS, PHP, and MySQL with a clean, responsive UI and full CRUD functionality.',
    tech: ['React', 'Tailwind CSS', 'PHP', 'MySQL', 'Framer Motion'],
    github: '#',
    demo: '#'
  }
];

const socialLinks = [
  { icon: Github, url: 'https://github.com/mr-kirann', label: 'GitHub' },
  { icon: Linkedin, url: 'https://www.linkedin.com/in/shein-htut-oo-4872a0379', label: 'LinkedIn' },
  { icon: Facebook, url: 'https://www.facebook.com/sheinhtutoo.kds', label: 'Facebook' },
  { icon: Mail, url: 'mailto:sheinhtutoo471@gmail.com', label: 'Email' }
];

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero" style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated Background Elements */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 80%, rgba(0, 255, 174, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(57, 255, 20, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(0, 255, 231, 0.05) 0%, transparent 50%)
          `,
          zIndex: 1
        }} />
        
        {/* Grid Pattern Overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(rgba(0, 255, 174, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 174, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          zIndex: 1
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              minHeight: '100vh',
              gap: '4rem',
              flexWrap: 'wrap'
            }}
          >
            {/* Left Side - Text Content */}
            <div className="hero-text" style={{ 
              flex: '1 1 500px', 
              maxWidth: '600px',
              display: 'flex', 
              flexDirection: 'column'
            }}>
              {/* Terminal Window */}
              <motion.div 
                className="terminal-window"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                style={{
                  background: 'rgba(24, 28, 31, 0.95)',
                  borderRadius: '12px',
                  padding: '0',
                  marginBottom: '2rem',
                  border: '1px solid rgba(57, 255, 20, 0.3)',
                  boxShadow: '0 8px 32px rgba(0, 255, 174, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  overflow: 'hidden'
                }}
              >
                {/* Terminal Header */}
                <div style={{
                  background: 'linear-gradient(90deg, #2a2d31 0%, #1e2124 100%)',
                  padding: '0.8rem 1.2rem',
                  borderBottom: '1px solid rgba(57, 255, 20, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }} />
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27ca3f' }} />
                  </div>
                  <span style={{ 
                    color: '#8b949e', 
                    fontSize: '0.85rem', 
                    fontFamily: 'Fira Mono, monospace',
                    marginLeft: '1rem'
                  }}>
                    user@portfolio:~
                  </span>
                </div>
                
                {/* Terminal Content */}
                <div style={{ padding: '1.5rem' }}>
                  <div style={{
                    fontFamily: 'Fira Mono, monospace',
                    fontSize: '1rem',
                    lineHeight: 1.6
                  }}>
                    <div style={{ color: '#00ffe7', marginBottom: '0.5rem' }}>
                      <span style={{ color: '#39ff14' }}>$</span> whoami
                    </div>
                    <div style={{ color: '#baffc9', marginBottom: '1rem' }}>
                      {'>'} Full-Stack Developer & Cybersecurity Enthusiast
                    </div>
                    <div style={{ color: '#00ffe7', marginBottom: '0.5rem' }}>
                      <span style={{ color: '#39ff14' }}>$</span> cat skills.txt
                    </div>
                    <div style={{ color: '#baffc9' }}>
                      {'>'} React.js • Node.js • PHP • Python • MySQL • Cybersecurity
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontWeight: 700,
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  background: 'linear-gradient(135deg, #39ff14 0%, #00ffe7 50%, #39ff14 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '1.5rem',
                  lineHeight: 1.1,
                  textShadow: '0 0 30px rgba(57, 255, 20, 0.5)'
                }}
              >
                Crafting Digital
                <br />
                <span style={{ color: '#00ffe7' }}>Experiences</span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                style={{
                  fontSize: '1.25rem',
                  color: '#baffc9',
                  marginBottom: '2.5rem',
                  fontFamily: 'Inter, sans-serif',
                  lineHeight: 1.6,
                  maxWidth: '500px'
                }}
              >
                Building secure, scalable web applications while exploring the fascinating world of cybersecurity and ethical hacking.
              </motion.p>

              {/* Action Buttons */}
              <motion.div 
                className="hero-buttons"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.8 }}
                style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}
              >
                <Link 
                  to="/blog" 
                  style={{
                    padding: '1rem 2rem',
                    background: 'linear-gradient(135deg, #39ff14 0%, #00ffe7 100%)',
                    color: '#000',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontWeight: 600,
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 20px rgba(57, 255, 20, 0.3)'
                  }}
                  onMouseOver={e => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 8px 30px rgba(57, 255, 20, 0.5)';
                  }}
                  onMouseOut={e => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 20px rgba(57, 255, 20, 0.3)';
                  }}
                >
                  View Blog
                </Link>
                <a 
                  href="#projects"
                  style={{
                    padding: '1rem 2rem',
                    background: 'transparent',
                    color: '#39ff14',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontWeight: 600,
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    border: '2px solid #39ff14',
                    cursor: 'pointer'
                  }}
                  onMouseOver={e => {
                    e.target.style.background = 'rgba(57, 255, 20, 0.1)';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={e => {
                    e.target.style.background = 'transparent';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  View Projects
                </a>
              </motion.div>
            </div>
            
            {/* Right Side - Visual Element */}
            <motion.div 
              className="hero-visual"
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 1, duration: 1, type: 'spring', stiffness: 100 }}
              style={{ 
                flex: '0 1 400px', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                position: 'relative'
              }}
            >
              {/* Animated Circles */}
              <div style={{ position: 'relative' }}>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  style={{
                    width: '300px',
                    height: '300px',
                    border: '2px solid rgba(57, 255, 20, 0.3)',
                    borderRadius: '50%',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                  style={{
                    width: '250px',
                    height: '250px',
                    border: '2px solid rgba(0, 255, 231, 0.3)',
                    borderRadius: '50%',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    borderStyle: 'dashed'
                  }}
                />
                
                {/* Central Icon */}
                <div style={{
                  width: '200px',
                  height: '200px',
                  background: 'linear-gradient(135deg, rgba(24, 28, 31, 0.9) 0%, rgba(17, 20, 23, 0.9) 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '3px solid #39ff14',
                  boxShadow: '0 0 50px rgba(57, 255, 20, 0.4), inset 0 0 50px rgba(0, 255, 231, 0.1)',
                  position: 'relative',
                  zIndex: 2
                }}>
                  <Terminal size={80} style={{ color: '#00ffe7' }} />
                </div>
                
                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    position: 'absolute',
                    top: '20%',
                    right: '-20%',
                    width: '60px',
                    height: '60px',
                    background: 'rgba(57, 255, 20, 0.1)',
                    borderRadius: '12px',
                    border: '2px solid #39ff14',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem'
                  }}
                >
                  {'<>'}
                </motion.div>
                
                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    position: 'absolute',
                    bottom: '20%',
                    left: '-20%',
                    width: '50px',
                    height: '50px',
                    background: 'rgba(0, 255, 231, 0.1)',
                    borderRadius: '50%',
                    border: '2px solid #00ffe7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    color: '#00ffe7'
                  }}
                >
                  🔒
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="skills" style={{
        padding: '6rem 0',
        background: 'linear-gradient(180deg, #0a0a0a 0%, #111417 50%, #0a0a0a 100%)',
        position: 'relative'
      }}>
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(57, 255, 20, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(0, 255, 231, 0.05) 0%, transparent 50%)
          `,
          zIndex: 1
        }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '4rem' }}
          >
            <h2 style={{
              fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #39ff14 0%, #00ffe7 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1rem'
            }}>
              Technical Arsenal
            </h2>
            <p style={{
              fontSize: '1.1rem',
              color: '#baffc9',
              fontFamily: 'Inter, sans-serif',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Technologies and tools I use to build secure, scalable applications
            </p>
          </motion.div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '1.5rem',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.6, type: 'spring', stiffness: 100 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 5,
                  boxShadow: '0 10px 40px rgba(57, 255, 20, 0.3)'
                }}
                style={{
                  background: 'linear-gradient(145deg, rgba(24, 28, 31, 0.9) 0%, rgba(17, 20, 23, 0.9) 100%)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  border: '1px solid rgba(57, 255, 20, 0.2)',
                  boxShadow: '0 4px 20px rgba(0, 255, 174, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, rgba(57, 255, 20, 0.1) 0%, rgba(0, 255, 231, 0.1) 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(57, 255, 20, 0.3)'
                }}>
                  <img
                    src={skill.url}
                    alt={skill.name + ' icon'}
                    style={{ width: '40px', height: '40px', objectFit: 'contain' }}
                    onError={e => { 
                      e.currentTarget.onerror = null; 
                      e.currentTarget.src = 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/code.svg'; 
                    }}
                  />
                </div>
                <span style={{
                  color: '#00ffe7',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  textAlign: 'center'
                }}>
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects" style={{
        padding: '6rem 0',
        background: 'linear-gradient(180deg, #0a0a0a 0%, #16213e 50%, #0a0a0a 100%)',
        position: 'relative'
      }}>
        {/* Background Effects */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            radial-gradient(circle at 30% 20%, rgba(0, 255, 231, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 70% 80%, rgba(57, 255, 20, 0.08) 0%, transparent 50%)
          `,
          zIndex: 1
        }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '4rem' }}
          >
            <h2 style={{
              fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #39ff14 0%, #00ffe7 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1rem'
            }}>
              Featured Projects
            </h2>
            <p style={{
              fontSize: '1.1rem',
              color: '#baffc9',
              fontFamily: 'Inter, sans-serif',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              A showcase of my recent work in web development and cybersecurity
            </p>
          </motion.div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6, type: 'spring', stiffness: 100 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.02, 
                  y: -5,
                  boxShadow: '0 20px 60px rgba(57, 255, 20, 0.2)'
                }}
                style={{
                  background: 'linear-gradient(145deg, rgba(24, 28, 31, 0.95) 0%, rgba(17, 20, 23, 0.95) 100%)',
                  borderRadius: '20px',
                  padding: '2rem',
                  border: '1px solid rgba(57, 255, 20, 0.2)',
                  boxShadow: '0 8px 32px rgba(0, 255, 174, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Subtle glow effect */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent 0%, #39ff14 50%, transparent 100%)',
                  opacity: 0.6
                }} />
                
                <div>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontWeight: 600,
                    color: '#39ff14',
                    marginBottom: '1rem',
                    textShadow: '0 0 10px rgba(57, 255, 20, 0.3)'
                  }}>
                    {project.title}
                  </h3>
                  <p style={{
                    fontSize: '1rem',
                    color: '#baffc9',
                    lineHeight: 1.6,
                    fontFamily: 'Inter, sans-serif'
                  }}>
                    {project.description}
                  </p>
                </div>
                
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem'
                }}>
                  {project.tech.map((tech) => (
                    <span 
                      key={tech} 
                      style={{
                        padding: '0.4rem 0.8rem',
                        background: 'rgba(0, 255, 231, 0.1)',
                        border: '1px solid rgba(0, 255, 231, 0.3)',
                        borderRadius: '20px',
                        fontSize: '0.85rem',
                        color: '#00ffe7',
                        fontFamily: 'JetBrains Mono, monospace',
                        fontWeight: 500
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  gap: '1rem',
                  marginTop: 'auto'
                }}>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: '0.8rem 1.5rem',
                      background: 'linear-gradient(135deg, #39ff14 0%, #00ffe7 100%)',
                      color: '#000',
                      textDecoration: 'none',
                      borderRadius: '8px',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      transition: 'all 0.3s ease',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 4px 15px rgba(57, 255, 20, 0.3)',
                      flex: 1,
                      textAlign: 'center'
                    }}
                    onMouseOver={e => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 6px 25px rgba(57, 255, 20, 0.5)';
                    }}
                    onMouseOut={e => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 4px 15px rgba(57, 255, 20, 0.3)';
                    }}
                  >
                    GitHub
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: '0.8rem 1.5rem',
                      background: 'transparent',
                      color: '#39ff14',
                      textDecoration: 'none',
                      borderRadius: '8px',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      transition: 'all 0.3s ease',
                      border: '2px solid #39ff14',
                      cursor: 'pointer',
                      flex: 1,
                      textAlign: 'center'
                    }}
                    onMouseOver={e => {
                      e.target.style.background = 'rgba(57, 255, 20, 0.1)';
                      e.target.style.transform = 'translateY(-2px)';
                    }}
                    onMouseOut={e => {
                      e.target.style.background = 'transparent';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    Demo
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* Contact Section */}
      <section id="contact" className="contact" style={{
        padding: '6rem 0',
        background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)',
        position: 'relative'
      }}>
        {/* Background Effects */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(57, 255, 20, 0.05) 0%, transparent 70%),
            radial-gradient(circle at 20% 80%, rgba(0, 255, 231, 0.05) 0%, transparent 70%)
          `,
          zIndex: 1
        }} />
        
        <div className="container" style={{ 
          maxWidth: '800px', 
          margin: '0 auto', 
          position: 'relative', 
          zIndex: 2 
        }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '3rem' }}
          >
            <h2 style={{
              fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #39ff14 0%, #00ffe7 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1rem'
            }}>
              Get In Touch
            </h2>
            <p style={{
              fontSize: '1.1rem',
              color: '#baffc9',
              fontFamily: 'Inter, sans-serif',
              maxWidth: '500px',
              margin: '0 auto',
              lineHeight: 1.6
            }}>
              Ready to collaborate? Drop me a message and let's build something amazing together.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
            style={{
              background: 'linear-gradient(145deg, rgba(24, 28, 31, 0.95) 0%, rgba(17, 20, 23, 0.95) 100%)',
              borderRadius: '20px',
              padding: '2.5rem',
              border: '1px solid rgba(57, 255, 20, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 255, 174, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Top glow line */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '2px',
              background: 'linear-gradient(90deg, transparent 0%, #39ff14 50%, transparent 100%)',
              opacity: 0.6
            }} />
            
            <form style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '1.5rem' 
            }}>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                gap: '1.5rem' 
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    color: '#00ffe7',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.9rem',
                    marginBottom: '0.5rem',
                    fontWeight: 500
                  }}>
                    Name
                  </label>
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="Your Name" 
                    required 
                    style={{ 
                      width: '100%',
                      padding: '1rem', 
                      borderRadius: '12px', 
                      border: '1px solid rgba(57, 255, 20, 0.3)', 
                      background: 'rgba(24, 28, 31, 0.8)', 
                      color: '#fff', 
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease',
                      outline: 'none'
                    }}
                    onFocus={e => {
                      e.target.style.borderColor = '#39ff14';
                      e.target.style.boxShadow = '0 0 20px rgba(57, 255, 20, 0.2)';
                    }}
                    onBlur={e => {
                      e.target.style.borderColor = 'rgba(57, 255, 20, 0.3)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
                
                <div>
                  <label style={{
                    display: 'block',
                    color: '#00ffe7',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.9rem',
                    marginBottom: '0.5rem',
                    fontWeight: 500
                  }}>
                    Email
                  </label>
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="your.email@example.com" 
                    required 
                    style={{ 
                      width: '100%',
                      padding: '1rem', 
                      borderRadius: '12px', 
                      border: '1px solid rgba(57, 255, 20, 0.3)', 
                      background: 'rgba(24, 28, 31, 0.8)', 
                      color: '#fff', 
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease',
                      outline: 'none'
                    }}
                    onFocus={e => {
                      e.target.style.borderColor = '#39ff14';
                      e.target.style.boxShadow = '0 0 20px rgba(57, 255, 20, 0.2)';
                    }}
                    onBlur={e => {
                      e.target.style.borderColor = 'rgba(57, 255, 20, 0.3)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>
              
              <div>
                <label style={{
                  display: 'block',
                  color: '#00ffe7',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.9rem',
                  marginBottom: '0.5rem',
                  fontWeight: 500
                }}>
                  Message
                </label>
                <textarea 
                  name="message" 
                  rows="5" 
                  placeholder="Tell me about your project or just say hello!" 
                  required 
                  style={{ 
                    width: '100%',
                    padding: '1rem', 
                    borderRadius: '12px', 
                    border: '1px solid rgba(57, 255, 20, 0.3)', 
                    background: 'rgba(24, 28, 31, 0.8)', 
                    color: '#fff', 
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '1rem',
                    resize: 'vertical',
                    minHeight: '120px',
                    transition: 'all 0.3s ease',
                    outline: 'none'
                  }}
                  onFocus={e => {
                    e.target.style.borderColor = '#39ff14';
                    e.target.style.boxShadow = '0 0 20px rgba(57, 255, 20, 0.2)';
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = 'rgba(57, 255, 20, 0.3)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
              
              <button 
                type="submit" 
                style={{ 
                  width: 'fit-content',
                  alignSelf: 'flex-end',
                  padding: '1rem 2.5rem',
                  background: 'linear-gradient(135deg, #39ff14 0%, #00ffe7 100%)',
                  color: '#000',
                  border: 'none',
                  borderRadius: '12px',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontWeight: 600,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 20px rgba(57, 255, 20, 0.3)'
                }}
                onMouseOver={e => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 30px rgba(57, 255, 20, 0.5)';
                }}
                onMouseOut={e => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 20px rgba(57, 255, 20, 0.3)';
                }}
              >
                Send Message
              </button>
            </form>
            
            {/* Alternative contact info */}
            <div style={{
              marginTop: '2rem',
              paddingTop: '2rem',
              borderTop: '1px solid rgba(57, 255, 20, 0.2)',
              textAlign: 'center'
            }}>
              <p style={{
                color: '#baffc9',
                fontFamily: 'Inter, sans-serif',
                marginBottom: '1rem'
              }}>
                Or reach out directly:
              </p>
              <a 
                href="mailto:sheinhtutoo471@gmail.com" 
                style={{
                  color: '#39ff14',
                  textDecoration: 'none',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={e => {
                  e.target.style.textShadow = '0 0 10px rgba(57, 255, 20, 0.5)';
                }}
                onMouseOut={e => {
                  e.target.style.textShadow = 'none';
                }}
              >
                sheinhtutoo471@gmail.com
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Section */}
      <footer style={{
        background: 'linear-gradient(180deg, #0a0a0a 0%, #16213e 50%, #0a0a0a 100%)',
        position: 'relative',
        padding: '3rem 0 2rem',
        borderTop: '1px solid rgba(57, 255, 20, 0.2)'
      }}>
        {/* Background Effects */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            radial-gradient(circle at 50% 0%, rgba(57, 255, 20, 0.05) 0%, transparent 70%)
          `,
          zIndex: 1
        }} />
        
        <div className="container" style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '0 2rem',
          position: 'relative', 
          zIndex: 2 
        }}>
          {/* Top glow line */}
          <div style={{
            width: '100%',
            height: '1px',
            background: 'linear-gradient(90deg, transparent 0%, #39ff14 50%, transparent 100%)',
            marginBottom: '2rem',
            opacity: 0.6
          }} />
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            marginBottom: '2rem'
          }}>
            {/* Brand Section */}
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1rem'
              }}>
                <Terminal size={24} style={{ color: '#00ffe7' }} />
                <span style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: '#39ff14',
                  textShadow: '0 0 10px rgba(57, 255, 20, 0.5)'
                }}>
                  root@sheinhtutoo:~$
                </span>
              </div>
              <p style={{
                color: '#baffc9',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.9rem',
                lineHeight: 1.6,
                margin: 0
              }}>
                Full-Stack Developer & Cybersecurity Enthusiast crafting secure, modern web experiences.
              </p>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 style={{
                color: '#00ffe7',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '1rem',
                fontWeight: 600,
                marginBottom: '1rem',
                margin: '0 0 1rem 0'
              }}>
                Quick Links
              </h4>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
              }}>
                <a href="#projects" style={{
                  color: '#baffc9',
                  textDecoration: 'none',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.9rem',
                  transition: 'color 0.3s ease'
                }} onMouseOver={e => e.target.style.color = '#39ff14'} onMouseOut={e => e.target.style.color = '#baffc9'}>
                  Projects
                </a>
                <a href="/blog" style={{
                  color: '#baffc9',
                  textDecoration: 'none',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.9rem',
                  transition: 'color 0.3s ease'
                }} onMouseOver={e => e.target.style.color = '#39ff14'} onMouseOut={e => e.target.style.color = '#baffc9'}>
                  Blog
                </a>
                <a href="#contact" style={{
                  color: '#baffc9',
                  textDecoration: 'none',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.9rem',
                  transition: 'color 0.3s ease'
                }} onMouseOver={e => e.target.style.color = '#39ff14'} onMouseOut={e => e.target.style.color = '#baffc9'}>
                  Contact
                </a>
              </div>
            </div>
            
            {/* Social Links */}
            <div>
              <h4 style={{
                color: '#00ffe7',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '1rem',
                fontWeight: 600,
                marginBottom: '1rem',
                margin: '0 0 1rem 0'
              }}>
                Connect
              </h4>
              <div style={{
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap'
              }}>
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '44px',
                      height: '44px',
                      background: 'rgba(24, 28, 31, 0.8)',
                      borderRadius: '12px',
                      border: '1px solid rgba(0, 255, 231, 0.3)',
                      color: '#00ffe7',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 15px rgba(0, 255, 231, 0.1)'
                    }}
                    onMouseOver={e => {
                      e.currentTarget.style.background = 'rgba(0, 255, 231, 0.1)';
                      e.currentTarget.style.borderColor = '#00ffe7';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 255, 231, 0.3)';
                    }}
                    onMouseOut={e => {
                      e.currentTarget.style.background = 'rgba(24, 28, 31, 0.8)';
                      e.currentTarget.style.borderColor = 'rgba(0, 255, 231, 0.3)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 255, 231, 0.1)';
                    }}
                  >
                    <link.icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          {/* Bottom Section */}
          <div style={{
            borderTop: '1px solid rgba(57, 255, 20, 0.2)',
            paddingTop: '1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div style={{
              color: '#baffc9',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.9rem'
            }}>
              &copy; {new Date().getFullYear()} Kirann's Portfolio. All rights reserved.
            </div>
            <div style={{
              color: '#00ffe7',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span>Built with</span>
              <span style={{ color: '#39ff14' }}>React</span>
              <span>&</span>
              <span style={{ color: '#39ff14' }}>Cyberpunk vibes</span>
              <Terminal size={16} style={{ color: '#00ffe7' }} />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;