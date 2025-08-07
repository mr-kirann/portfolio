import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Server } from 'lucide-react';
import { blogAPI } from '../services/api';

const BackendStatus = () => {
  const [status, setStatus] = useState('checking'); // 'checking', 'online', 'offline'
  const [lastCheck, setLastCheck] = useState(null);

  const checkBackendStatus = async () => {
    try {
      setStatus('checking');
      const response = await fetch('http://sheinhtutoo-backend.infinityfree.me/test-connection.php');
      if (response.ok) {
        setStatus('online');
      } else {
        setStatus('offline');
      }
    } catch (error) {
      setStatus('offline');
    }
    setLastCheck(new Date().toLocaleTimeString());
  };

  useEffect(() => {
    checkBackendStatus();
    // Check every 30 seconds
    const interval = setInterval(checkBackendStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    switch (status) {
      case 'online': return '#39ff14';
      case 'offline': return '#ff5757';
      default: return '#00ffe7';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'online': return <CheckCircle size={16} />;
      case 'offline': return <AlertCircle size={16} />;
      default: return <Server size={16} />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'online': return 'Backend Online';
      case 'offline': return 'Backend Offline';
      default: return 'Checking...';
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: '1rem',
      right: '1rem',
      background: 'rgba(24, 28, 31, 0.95)',
      border: `1px solid ${getStatusColor()}`,
      borderRadius: '8px',
      padding: '0.75rem 1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      color: getStatusColor(),
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: '0.85rem',
      backdropFilter: 'blur(10px)',
      zIndex: 1000,
      boxShadow: `0 4px 15px rgba(${status === 'online' ? '57, 255, 20' : status === 'offline' ? '255, 87, 87' : '0, 255, 231'}, 0.2)`
    }}>
      {getStatusIcon()}
      <span>{getStatusText()}</span>
      {lastCheck && (
        <span style={{ 
          fontSize: '0.75rem', 
          opacity: 0.7,
          marginLeft: '0.5rem'
        }}>
          {lastCheck}
        </span>
      )}
      {status === 'offline' && (
        <button
          onClick={checkBackendStatus}
          style={{
            background: 'none',
            border: `1px solid ${getStatusColor()}`,
            borderRadius: '4px',
            color: getStatusColor(),
            padding: '0.25rem 0.5rem',
            fontSize: '0.75rem',
            cursor: 'pointer',
            marginLeft: '0.5rem',
            fontFamily: 'JetBrains Mono, monospace'
          }}
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default BackendStatus;
