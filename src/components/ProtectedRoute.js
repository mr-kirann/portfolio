import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Shield, Lock } from 'lucide-react';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Effects */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 50%, rgba(57, 255, 20, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(0, 255, 231, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(186, 255, 201, 0.1) 0%, transparent 50%)
          `,
          pointerEvents: 'none'
        }} />

        {/* Loading Content */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(57, 255, 20, 0.3)',
          borderRadius: '20px',
          padding: '3rem',
          textAlign: 'center',
          boxShadow: '0 0 50px rgba(57, 255, 20, 0.2)'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #39ff14, #00ffe7)',
            borderRadius: '50%',
            marginBottom: '1.5rem',
            boxShadow: '0 0 30px rgba(57, 255, 20, 0.5)',
            animation: 'pulse 2s infinite'
          }}>
            <Shield size={40} color="#000" />
          </div>
          
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid rgba(57, 255, 20, 0.3)',
            borderTop: '3px solid #39ff14',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }} />
          
          <p style={{
            color: '#39ff14',
            fontSize: '1.1rem',
            fontFamily: 'JetBrains Mono, monospace',
            margin: 0
          }}>
            Verifying authentication...
          </p>
        </div>

        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
        `}</style>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated, render the protected component
  return children;
};

export default ProtectedRoute;
