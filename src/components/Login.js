import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Eye, EyeOff, Shield, AlertCircle } from 'lucide-react';
import { authAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    token: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user types
  };

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Attempting login with token:', formData.token);
      const result = await login(formData);
      
      if (result.success) {
        console.log('Login successful, navigating to admin...');
        // Navigate to admin panel
        navigate('/admin');
      } else {
        console.error('Login failed:', result.message);
        setError(result.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(
        err.response?.data?.message || 
        err.message ||
        'Login failed. Please check your credentials and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
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

      {/* Grid Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          linear-gradient(rgba(57, 255, 20, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(57, 255, 20, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        opacity: 0.3,
        pointerEvents: 'none'
      }} />

      {/* Login Form */}
      <div style={{
        background: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(57, 255, 20, 0.3)',
        borderRadius: '20px',
        padding: '3rem',
        width: '100%',
        maxWidth: '400px',
        position: 'relative',
        boxShadow: `
          0 0 50px rgba(57, 255, 20, 0.2),
          inset 0 1px 0 rgba(255, 255, 255, 0.1)
        `,
        animation: 'slideUp 0.8s ease-out'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '2rem'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #39ff14, #00ffe7)',
            borderRadius: '50%',
            marginBottom: '1rem',
            boxShadow: '0 0 30px rgba(57, 255, 20, 0.5)'
          }}>
            <Shield size={40} color="#000" />
          </div>
          
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #39ff14, #00ffe7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: '0 0 0.5rem 0',
            fontFamily: 'JetBrains Mono, monospace'
          }}>
            Admin Access
          </h1>
          
          <p style={{
            color: '#8b949e',
            fontSize: '0.9rem',
            margin: 0,
            fontFamily: 'Inter, sans-serif'
          }}>
            Enter your access token to access the admin panel
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            background: 'rgba(255, 87, 87, 0.1)',
            border: '1px solid rgba(255, 87, 87, 0.3)',
            borderRadius: '10px',
            padding: '1rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#ff5757'
          }}>
            <AlertCircle size={20} />
            <span style={{ fontSize: '0.9rem' }}>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          {/* Access Token Field */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{
              display: 'block',
              color: '#39ff14',
              fontSize: '0.9rem',
              fontWeight: '500',
              marginBottom: '0.5rem',
              fontFamily: 'JetBrains Mono, monospace'
            }}>
              Access Token
            </label>
            <div style={{ position: 'relative' }}>
              <Lock 
                size={20} 
                style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#8b949e',
                  zIndex: 1
                }}
              />
              <input
                type={showPassword ? 'text' : 'password'}
                name="token"
                value={formData.token}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '1rem 1rem 1rem 3rem',
                  background: 'rgba(0, 0, 0, 0.5)',
                  border: '1px solid rgba(57, 255, 20, 0.3)',
                  borderRadius: '10px',
                  color: '#fff',
                  fontSize: '1rem',
                  fontFamily: 'Inter, sans-serif',
                  transition: 'all 0.3s ease',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#39ff14';
                  e.target.style.boxShadow = '0 0 20px rgba(57, 255, 20, 0.3)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(57, 255, 20, 0.3)';
                  e.target.style.boxShadow = 'none';
                }}
                placeholder="Enter your access token"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#8b949e',
                  cursor: 'pointer',
                  padding: '0.25rem',
                  borderRadius: '4px',
                  transition: 'color 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.color = '#39ff14'}
                onMouseOut={(e) => e.target.style.color = '#8b949e'}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>



          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '1rem',
              background: loading 
                ? 'rgba(57, 255, 20, 0.3)' 
                : 'linear-gradient(135deg, #39ff14, #00ffe7)',
              border: 'none',
              borderRadius: '10px',
              color: '#000',
              fontSize: '1rem',
              fontWeight: 'bold',
              fontFamily: 'JetBrains Mono, monospace',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: loading 
                ? 'none' 
                : '0 0 30px rgba(57, 255, 20, 0.3)',
              transform: loading ? 'none' : 'translateY(0)',
              opacity: loading ? 0.7 : 1
            }}
            onMouseOver={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 0 40px rgba(57, 255, 20, 0.5)';
              }
            }}
            onMouseOut={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 0 30px rgba(57, 255, 20, 0.3)';
              }
            }}
          >
            {loading ? (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  border: '2px solid rgba(0, 0, 0, 0.3)',
                  borderTop: '2px solid #000',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
                Authenticating...
              </div>
            ) : (
              'Access Admin Panel'
            )}
          </button>
        </form>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          0% {
            opacity: 0;
            transform: translateY(50px) scale(0.9);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Login;
