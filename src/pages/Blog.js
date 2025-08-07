import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Eye, ArrowRight, Search } from 'lucide-react';
import { blogAPI } from '../services/api';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await blogAPI.getAllPosts();
      if (response.data.data) {
        setPosts(response.data.data);
      }
    } catch (err) {
      setError('Failed to fetch blog posts');
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const stripHtml = (html) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const truncateText = (text, maxLength = 150) => {
    const stripped = stripHtml(text);
    if (stripped.length <= maxLength) return stripped;
    return stripped.substr(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
            radial-gradient(circle at 20% 80%, rgba(0, 255, 174, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(57, 255, 20, 0.1) 0%, transparent 50%)
          `,
          zIndex: 1
        }} />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          style={{
            background: 'linear-gradient(145deg, rgba(24, 28, 31, 0.95) 0%, rgba(17, 20, 23, 0.95) 100%)',
            borderRadius: '20px',
            padding: '2rem',
            border: '1px solid rgba(57, 255, 20, 0.3)',
            boxShadow: '0 8px 32px rgba(0, 255, 174, 0.2)',
            backdropFilter: 'blur(10px)',
            position: 'relative',
            zIndex: 2,
            maxWidth: '400px',
            textAlign: 'center'
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '1rem'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '3px solid #39ff14',
              borderTop: '3px solid transparent',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
            <span style={{
              color: '#39ff14',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '1.1rem',
              fontWeight: 600
            }}>
              Loading Posts...
            </span>
          </div>
          <p style={{
            color: '#baffc9',
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.9rem',
            margin: 0
          }}>
            Fetching cybersecurity insights from the database
          </p>
        </motion.div>
        
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            background: 'linear-gradient(145deg, rgba(24, 28, 31, 0.95) 0%, rgba(17, 20, 23, 0.95) 100%)',
            borderRadius: '20px',
            padding: '2rem',
            border: '1px solid rgba(255, 87, 87, 0.3)',
            boxShadow: '0 8px 32px rgba(255, 87, 87, 0.2)',
            backdropFilter: 'blur(10px)',
            maxWidth: '400px',
            textAlign: 'center'
          }}
        >
          <h3 style={{
            color: '#ff5757',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '1.2rem',
            marginBottom: '1rem'
          }}>
            Error Loading Posts
          </h3>
          <p style={{
            color: '#baffc9',
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.9rem',
            margin: 0
          }}>
            {error}
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
      position: 'relative',
      paddingTop: '6rem'
    }}>
      {/* Background Effects */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
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

      <div className="container" style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '0 2rem',
        position: 'relative', 
        zIndex: 2 
      }}>
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ 
            textAlign: 'center', 
            marginBottom: '4rem' 
          }}
        >
          {/* Terminal Window */}
          <motion.div 
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
              overflow: 'hidden',
              maxWidth: '600px',
              margin: '0 auto 2rem'
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
                root@security-blog:~
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
                  <span style={{ color: '#39ff14' }}>$</span> ls -la /blog/posts/
                </div>
                <div style={{ color: '#baffc9' }}>
                  {'>'} Found {filteredPosts.length} cybersecurity insights
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #39ff14 0%, #00ffe7 50%, #39ff14 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1.5rem',
              lineHeight: 1.1
            }}
          >
            Security Blog
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            style={{
              fontSize: '1.25rem',
              color: '#baffc9',
              fontFamily: 'Inter, sans-serif',
              lineHeight: 1.6,
              maxWidth: '600px',
              margin: '0 auto 2.5rem'
            }}
          >
            Insights, tutorials, and research in cybersecurity and ethical hacking
          </motion.p>
          
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              maxWidth: '500px',
              margin: '0 auto'
            }}
          >
            <div style={{
              position: 'relative',
              width: '100%',
              background: 'linear-gradient(145deg, rgba(24, 28, 31, 0.9) 0%, rgba(17, 20, 23, 0.9) 100%)',
              borderRadius: '12px',
              border: '1px solid rgba(57, 255, 20, 0.3)',
              boxShadow: '0 4px 20px rgba(0, 255, 174, 0.1)',
              backdropFilter: 'blur(10px)'
            }}>
              <Search 
                size={20} 
                style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#00ffe7',
                  zIndex: 1
                }} 
              />
              <input
                type="text"
                placeholder="Search cybersecurity posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '1rem 1rem 1rem 3rem',
                  background: 'transparent',
                  border: 'none',
                  borderRadius: '12px',
                  color: '#fff',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
                onFocus={e => {
                  e.target.parentElement.style.borderColor = '#39ff14';
                  e.target.parentElement.style.boxShadow = '0 0 20px rgba(57, 255, 20, 0.3)';
                }}
                onBlur={e => {
                  e.target.parentElement.style.borderColor = 'rgba(57, 255, 20, 0.3)';
                  e.target.parentElement.style.boxShadow = '0 4px 20px rgba(0, 255, 174, 0.1)';
                }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Blog Posts Grid */}
        <div style={{ paddingBottom: '4rem' }}>
          {filteredPosts.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '300px'
              }}
            >
              <div style={{
                background: 'linear-gradient(145deg, rgba(24, 28, 31, 0.95) 0%, rgba(17, 20, 23, 0.95) 100%)',
                borderRadius: '20px',
                padding: '2rem',
                border: '1px solid rgba(57, 255, 20, 0.3)',
                boxShadow: '0 8px 32px rgba(0, 255, 174, 0.2)',
                backdropFilter: 'blur(10px)',
                textAlign: 'center',
                maxWidth: '400px'
              }}>
                <h3 style={{
                  color: '#39ff14',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '1.2rem',
                  marginBottom: '1rem'
                }}>
                  No Posts Found
                </h3>
                <p style={{
                  color: '#baffc9',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.9rem',
                  margin: 0
                }}>
                  {searchTerm ? `No posts match "${searchTerm}"` : 'No blog posts available yet. Check back soon for cybersecurity insights!'}
                </p>
              </div>
            </motion.div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
              gap: '2rem',
              maxWidth: '1200px',
              margin: '0 auto'
            }}>
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.6, type: 'spring', stiffness: 100 }}
                  whileHover={{ 
                    scale: 1.02, 
                    y: -5,
                    boxShadow: '0 20px 60px rgba(57, 255, 20, 0.2)'
                  }}
                  style={{
                    background: 'linear-gradient(145deg, rgba(24, 28, 31, 0.95) 0%, rgba(17, 20, 23, 0.95) 100%)',
                    borderRadius: '20px',
                    border: '1px solid rgba(57, 255, 20, 0.2)',
                    boxShadow: '0 8px 32px rgba(0, 255, 174, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column'
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
                  
                  {/* Post Image */}
                  {post.image && (
                    <div style={{
                      width: '100%',
                      height: '200px',
                      overflow: 'hidden',
                      position: 'relative'
                    }}>
                      <img 
                        src={`http://sheinhtutoo-backend.infinityfree.me/serve-image.php?file=${post.image}`} 
                        alt={post.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease'
                        }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                        onMouseOver={e => {
                          e.target.style.transform = 'scale(1.05)';
                        }}
                        onMouseOut={e => {
                          e.target.style.transform = 'scale(1)';
                        }}
                      />
                      {/* Image overlay */}
                      <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '50px',
                        background: 'linear-gradient(transparent, rgba(17, 20, 23, 0.8))'
                      }} />
                    </div>
                  )}
                  
                  {/* Post Content */}
                  <div style={{
                    padding: '2rem',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem'
                  }}>
                    <h2 style={{
                      fontSize: '1.4rem',
                      fontFamily: 'Noto Sans Myanmar, Padauk, Myanmar3, JetBrains Mono, monospace',
                      fontWeight: 600,
                      color: '#39ff14',
                      marginBottom: '0.5rem',
                      lineHeight: 1.3,
                      textShadow: '0 0 10px rgba(57, 255, 20, 0.3)'
                    }}>
                      <Link 
                        to={`/blog/posts/${post.slug}`}
                        style={{
                          color: 'inherit',
                          textDecoration: 'none',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseOver={e => {
                          e.target.style.color = '#00ffe7';
                          e.target.style.textShadow = '0 0 15px rgba(0, 255, 231, 0.5)';
                        }}
                        onMouseOut={e => {
                          e.target.style.color = '#39ff14';
                          e.target.style.textShadow = '0 0 10px rgba(57, 255, 20, 0.3)';
                        }}
                      >
                        {post.title}
                      </Link>
                    </h2>
                    
                    <div style={{
                      display: 'flex',
                      gap: '1.5rem',
                      fontSize: '0.85rem',
                      color: '#8b949e',
                      fontFamily: 'JetBrains Mono, monospace',
                      marginBottom: '0.5rem'
                    }}>
                      <span style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: '#00ffe7'
                      }}>
                        <Calendar size={14} />
                        {formatDate(post.created_at)}
                      </span>
                      <span style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: '#baffc9'
                      }}>
                        <Eye size={14} />
                        {post.views} views
                      </span>
                    </div>
                    
                    <p style={{
                      fontSize: '1rem',
                      color: '#baffc9',
                      lineHeight: 1.6,
                      fontFamily: 'Noto Sans Myanmar, Padauk, Myanmar3, Inter, sans-serif',
                      flex: 1,
                      marginBottom: '1rem',
                      wordSpacing: '0.1em'
                    }}>
                      {truncateText(post.description)}
                    </p>
                    
                    <Link 
                      to={`/blog/posts/${post.slug}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.75rem 1.5rem',
                        background: 'linear-gradient(135deg, #39ff14 0%, #00ffe7 100%)',
                        color: '#000',
                        textDecoration: 'none',
                        borderRadius: '8px',
                        fontFamily: 'JetBrains Mono, monospace',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        transition: 'all 0.3s ease',
                        alignSelf: 'flex-start',
                        boxShadow: '0 4px 15px rgba(57, 255, 20, 0.3)'
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
                      Read More
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </div>


    </div>
  );
};

export default Blog;
