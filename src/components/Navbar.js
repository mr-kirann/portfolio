import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Terminal, Code, User, Mail, FolderOpen } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Terminal },
    { path: '#projects', label: 'Projects', icon: FolderOpen, isAnchor: true },
    { path: '/blog', label: 'Blog', icon: Code },
    { path: '#contact', label: 'Contact', icon: Mail, isAnchor: true }
  ];

  const handleNavClick = (item) => {
    if (item.isAnchor) {
      const element = document.querySelector(item.path);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  return (
    <motion.nav 
      className="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: 'rgba(10, 10, 10, 0.95)',
        backdropFilter: 'blur(15px)',
        borderBottom: '1px solid rgba(57, 255, 20, 0.2)',
        zIndex: 1000,
        padding: '0'
      }}
    >
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 0'
        }}>
          <Link to="/" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontFamily: 'JetBrains Mono, monospace',
            fontWeight: 600,
            color: '#39ff14',
            textDecoration: 'none',
            fontSize: '1.1rem',
            textShadow: '0 0 10px rgba(57, 255, 20, 0.5)'
          }}>
            <Terminal size={24} style={{ color: '#00ffe7' }} />
            <span>root@sheinhtutoo:~$</span>
          </Link>

          {/* Desktop Navigation */}
          <div style={{
            display: 'flex',
            gap: '2rem',
            alignItems: 'center'
          }} className="desktop-nav">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.isAnchor ? false : location.pathname === item.path;
              
              if (item.isAnchor) {
                return (
                  <button
                    key={item.path}
                    onClick={() => handleNavClick(item)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.75rem 1.25rem',
                      background: 'transparent',
                      border: '1px solid rgba(57, 255, 20, 0.3)',
                      borderRadius: '8px',
                      color: '#baffc9',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      textTransform: 'none'
                    }}
                    onMouseOver={e => {
                      e.target.style.background = 'rgba(57, 255, 20, 0.1)';
                      e.target.style.borderColor = '#39ff14';
                      e.target.style.color = '#39ff14';
                      e.target.style.boxShadow = '0 0 15px rgba(57, 255, 20, 0.3)';
                    }}
                    onMouseOut={e => {
                      e.target.style.background = 'transparent';
                      e.target.style.borderColor = 'rgba(57, 255, 20, 0.3)';
                      e.target.style.color = '#baffc9';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </button>
                );
              }
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1.25rem',
                    background: isActive ? 'linear-gradient(135deg, #39ff14 0%, #00ffe7 100%)' : 'transparent',
                    border: '1px solid rgba(57, 255, 20, 0.3)',
                    borderRadius: '8px',
                    color: isActive ? '#000' : '#baffc9',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    textDecoration: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={e => {
                    if (!isActive) {
                      e.target.style.background = 'rgba(57, 255, 20, 0.1)';
                      e.target.style.borderColor = '#39ff14';
                      e.target.style.color = '#39ff14';
                      e.target.style.boxShadow = '0 0 15px rgba(57, 255, 20, 0.3)';
                    }
                  }}
                  onMouseOut={e => {
                    if (!isActive) {
                      e.target.style.background = 'transparent';
                      e.target.style.borderColor = 'rgba(57, 255, 20, 0.3)';
                      e.target.style.color = '#baffc9';
                      e.target.style.boxShadow = 'none';
                    }
                  }}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            style={{
              display: 'none',
              background: 'transparent',
              border: '1px solid rgba(57, 255, 20, 0.3)',
              borderRadius: '6px',
              color: '#39ff14',
              padding: '0.5rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            className="mobile-toggle"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <motion.div 
          initial={false}
          animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            overflow: 'hidden',
            borderTop: isOpen ? '1px solid rgba(57, 255, 20, 0.2)' : 'none'
          }}
          className="mobile-nav"
        >
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            padding: '1rem 0'
          }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.isAnchor ? false : location.pathname === item.path;
              
              if (item.isAnchor) {
                return (
                  <button
                    key={item.path}
                    onClick={() => handleNavClick(item)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '1rem',
                      background: 'transparent',
                      border: '1px solid rgba(57, 255, 20, 0.2)',
                      borderRadius: '8px',
                      color: '#baffc9',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      textAlign: 'left',
                      width: '100%'
                    }}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </button>
                );
              }
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '1rem',
                    background: isActive ? 'rgba(57, 255, 20, 0.1)' : 'transparent',
                    border: '1px solid rgba(57, 255, 20, 0.2)',
                    borderRadius: '8px',
                    color: isActive ? '#39ff14' : '#baffc9',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    textDecoration: 'none',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }

          .mobile-toggle {
            display: block !important;
          }
          
          .mobile-nav {
            display: block !important;
          }
        }
        
        @media (min-width: 769px) {
          .mobile-nav {
            display: none !important;
          }
        }
      `}</style>
    </motion.nav>
  );
};

export default Navbar;
