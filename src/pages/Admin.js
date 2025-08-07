import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Save, 
  X, 
  Upload, 
  Search,
  Shield,
  LogOut,
  User
} from 'lucide-react';
import { blogAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const Admin = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    description: ''
  });
  const [uploadingImage, setUploadingImage] = useState(false);

  // Fetch posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await blogAPI.getAllPosts();
      console.log('Fetched posts response:', response);
      if (response.data && response.data.data) {
        setPosts(response.data.data);
        console.log('Posts loaded:', response.data.data.length, 'posts');
      } else if (response.data && response.data.message) {
        console.log('No posts found:', response.data.message);
        setPosts([]);
      } else {
        console.log('Unexpected response format:', response.data);
        setPosts([]);
      }
    } catch (err) {
      console.error('Error fetching posts:', err);
      alert('Failed to load posts. Please check if the backend server is running.');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      if (editingPost) {
        await blogAPI.updatePost({ ...formData, id: editingPost.id });
      } else {
        await blogAPI.createPost(formData);
      }
      
      setFormData({ title: '', image: '', description: '' });
      setShowForm(false);
      setEditingPost(null);
      fetchPosts();
    } catch (err) {
      console.error('Error saving post:', err);
      alert('Error saving post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      image: post.image,
      description: post.description
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    console.log('🗑️ Delete button clicked for post ID:', id);
    console.log('🔐 Token available:', localStorage.getItem('auth_token') ? 'Yes' : 'No');
    
    if (window.confirm('Are you sure you want to delete this post?')) {
      console.log('✅ User confirmed deletion');
      try {
        console.log('🔄 Setting loading state...');
        setLoading(true);
        
        console.log('📡 Calling deletePost API...');
        const response = await blogAPI.deletePost(id);
        console.log('📡 Delete API response:', response);
        
        console.log('🔄 Refreshing posts list...');
        fetchPosts();
        
        console.log('✅ Delete operation completed successfully');
      } catch (err) {
        console.error('❌ Error deleting post:', err);
        console.error('❌ Error details:', err.response?.data || err.message);
        alert('Error deleting post: ' + (err.response?.data?.message || err.message || 'Unknown error'));
      } finally {
        console.log('🔄 Clearing loading state...');
        setLoading(false);
      }
    } else {
      console.log('❌ User cancelled deletion');
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      setUploadingImage(true);
      const response = await blogAPI.uploadImage(formData);
      if (response.data.success) {
        setFormData(prev => ({ ...prev, image: response.data.filename }));
      } else {
        alert('Error uploading image: ' + response.data.message);
      }
    } catch (err) {
      console.error('Error uploading image:', err);
      alert('Error uploading image. Please try again.');
    } finally {
      setUploadingImage(false);
    }
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const stripHtml = (html) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  // Quill editor modules
  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['blockquote', 'code-block'],
      ['link'],
      ['clean']
    ],
  };

  // Handle logout
  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to logout?')) {
      await logout();
      navigate('/login');
    }
  };

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

      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '0 2rem',
        position: 'relative', 
        zIndex: 2 
      }}>
        {/* User Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          padding: '1rem 2rem',
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(57, 255, 20, 0.3)',
          borderRadius: '15px',
          boxShadow: '0 0 30px rgba(57, 255, 20, 0.2)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '50px',
              height: '50px',
              background: 'linear-gradient(135deg, #39ff14, #00ffe7)',
              borderRadius: '50%',
              boxShadow: '0 0 20px rgba(57, 255, 20, 0.4)'
            }}>
              <User size={24} color="#000" />
            </div>
            <div>
              <h2 style={{
                color: '#39ff14',
                fontSize: '1.2rem',
                fontFamily: 'JetBrains Mono, monospace',
                margin: 0,
                fontWeight: 'bold'
              }}>
                Welcome, Admin
              </h2>
              <p style={{
                color: '#8b949e',
                fontSize: '0.9rem',
                fontFamily: 'Inter, sans-serif',
                margin: 0
              }}>
                System Administrator
              </p>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              background: 'linear-gradient(135deg, rgba(255, 87, 87, 0.2), rgba(255, 0, 64, 0.2))',
              border: '1px solid rgba(255, 87, 87, 0.3)',
              borderRadius: '10px',
              color: '#ff5757',
              fontSize: '0.9rem',
              fontFamily: 'JetBrains Mono, monospace',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontWeight: '500'
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'linear-gradient(135deg, rgba(255, 87, 87, 0.3), rgba(255, 0, 64, 0.3))';
              e.target.style.borderColor = '#ff5757';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 5px 20px rgba(255, 87, 87, 0.3)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'linear-gradient(135deg, rgba(255, 87, 87, 0.2), rgba(255, 0, 64, 0.2))';
              e.target.style.borderColor = 'rgba(255, 87, 87, 0.3)';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
        {/* Header */}
        <div 
          style={{ 
            textAlign: 'center', 
            marginBottom: '4rem',
            animation: 'slideUp 0.8s ease-out'
          }}
        >
          {/* Terminal Window */}
          <div
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
                fontFamily: 'JetBrains Mono, monospace',
                marginLeft: '1rem'
              }}>
                root@admin-panel:~
              </span>
            </div>
            
            {/* Terminal Content */}
            <div style={{ padding: '1.5rem' }}>
              <div style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '1rem',
                lineHeight: 1.6
              }}>
                <div style={{ color: '#00ffe7', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#39ff14' }}>$</span> sudo access granted
                </div>
                <div style={{ color: '#baffc9' }}>
                  {'>'} Admin privileges activated
                </div>
              </div>
            </div>
          </div>
          
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #39ff14 0%, #00ffe7 50%, #39ff14 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1.5rem',
              lineHeight: 1.1,
              animation: 'slideUp 1s ease-out'
            }}
          >
            Admin Panel
          </h1>
          
          <p
            style={{
              fontSize: '1.25rem',
              color: '#baffc9',
              fontFamily: 'Inter, sans-serif',
              lineHeight: 1.6,
              maxWidth: '600px',
              margin: '0 auto 2.5rem',
              animation: 'slideUp 1.2s ease-out'
            }}
          >
            Manage your blog posts and cybersecurity content
          </p>
        </div>

        {/* Controls */}
        <div 
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '3rem',
            gap: '2rem',
            flexWrap: 'wrap',
            animation: 'slideUp 1.5s ease-out'
          }}
        >
          <button 
            onClick={() => {
              navigate('/admin/create-post');
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '1rem 2rem',
              background: 'linear-gradient(135deg, #39ff14 0%, #00ffe7 100%)',
              color: '#000',
              border: 'none',
              borderRadius: '12px',
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: 600,
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
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
            <Plus size={16} />
            New Post
          </button>
          
          <div style={{
            position: 'relative',
            maxWidth: '400px',
            flex: 1,
            background: 'linear-gradient(145deg, rgba(24, 28, 31, 0.9) 0%, rgba(17, 20, 23, 0.9) 100%)',
            borderRadius: '12px',
            border: '1px solid rgba(57, 255, 20, 0.3)',
            boxShadow: '0 4px 20px rgba(0, 255, 174, 0.1)',
            backdropFilter: 'blur(10px)'
          }}>
            <Search 
              size={16} 
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
              placeholder="Search posts..."
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
        </div>

        {/* Post Form Modal */}
        {showForm && (
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '2rem',
              animation: 'fadeIn 0.3s ease-out'
            }}
          >
            <div 
              style={{
                background: 'linear-gradient(145deg, rgba(24, 28, 31, 0.98) 0%, rgba(17, 20, 23, 0.98) 100%)',
                borderRadius: '20px',
                border: '1px solid rgba(57, 255, 20, 0.3)',
                boxShadow: '0 20px 60px rgba(0, 255, 174, 0.3)',
                backdropFilter: 'blur(20px)',
                width: '100%',
                maxWidth: '800px',
                maxHeight: '90vh',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                animation: 'slideUp 0.4s ease-out'
              }}
            >
              {/* Modal Header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '2rem',
                borderBottom: '1px solid rgba(57, 255, 20, 0.2)',
                background: 'linear-gradient(90deg, rgba(57, 255, 20, 0.05) 0%, rgba(0, 255, 231, 0.05) 100%)'
              }}>
                <h2 style={{
                  fontSize: '1.8rem',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #39ff14 0%, #00ffe7 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  margin: 0
                }}>
                  {editingPost ? 'Edit Post' : 'Create New Post'}
                </h2>
                <button 
                  onClick={() => setShowForm(false)}
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(255, 87, 87, 0.3)',
                    borderRadius: '8px',
                    color: '#ff5757',
                    cursor: 'pointer',
                    padding: '0.5rem',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onMouseOver={e => {
                    e.target.style.borderColor = '#ff5757';
                    e.target.style.background = 'rgba(255, 87, 87, 0.1)';
                  }}
                  onMouseOut={e => {
                    e.target.style.borderColor = 'rgba(255, 87, 87, 0.3)';
                    e.target.style.background = 'transparent';
                  }}
                >
                  <X size={20} />
                </button>
              </div>
              
              {/* Modal Content */}
              <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '2rem'
              }}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  {/* Title Field */}
                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      color: '#39ff14',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '1rem',
                      fontWeight: 600
                    }}>Title</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      required
                      style={{
                        width: '100%',
                        padding: '1rem',
                        background: 'rgba(17, 20, 23, 0.8)',
                        border: '1px solid rgba(57, 255, 20, 0.3)',
                        borderRadius: '8px',
                        color: '#fff',
                        fontFamily: 'Noto Sans Myanmar, Padauk, Myanmar3, Inter, sans-serif',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={e => {
                        e.target.style.borderColor = '#39ff14';
                        e.target.style.boxShadow = '0 0 10px rgba(57, 255, 20, 0.3)';
                      }}
                      onBlur={e => {
                        e.target.style.borderColor = 'rgba(57, 255, 20, 0.3)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                  
                  {/* Image Upload */}
                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      color: '#39ff14',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '1rem',
                      fontWeight: 600
                    }}>Featured Image</label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                        id="image-upload"
                      />
                      <label 
                        htmlFor="image-upload" 
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '1rem 1.5rem',
                          background: 'linear-gradient(135deg, rgba(0, 255, 231, 0.2) 0%, rgba(57, 255, 20, 0.2) 100%)',
                          border: '1px solid rgba(0, 255, 231, 0.3)',
                          borderRadius: '8px',
                          color: '#00ffe7',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          fontFamily: 'JetBrains Mono, monospace',
                          alignSelf: 'flex-start'
                        }}
                        onMouseOver={e => {
                          e.target.style.borderColor = '#00ffe7';
                          e.target.style.background = 'linear-gradient(135deg, rgba(0, 255, 231, 0.3) 0%, rgba(57, 255, 20, 0.3) 100%)';
                        }}
                        onMouseOut={e => {
                          e.target.style.borderColor = 'rgba(0, 255, 231, 0.3)';
                          e.target.style.background = 'linear-gradient(135deg, rgba(0, 255, 231, 0.2) 0%, rgba(57, 255, 20, 0.2) 100%)';
                        }}
                      >
                        <Upload size={16} />
                        {uploadingImage ? 'Uploading...' : 'Upload Image'}
                      </label>
                      {formData.image && (
                        <div style={{
                          maxWidth: '200px',
                          border: '1px solid rgba(57, 255, 20, 0.3)',
                          borderRadius: '8px',
                          overflow: 'hidden'
                        }}>
                          <img 
                            src={`http://sheinhtutoo-backend.infinityfree.me/serve-image.php?file=${formData.image}`} 
                            alt="Preview" 
                            style={{
                              width: '100%',
                              height: 'auto',
                              display: 'block'
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Content Editor */}
                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      color: '#39ff14',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '1rem',
                      fontWeight: 600
                    }}>Content</label>
                    <div style={{
                      border: '1px solid rgba(57, 255, 20, 0.3)',
                      borderRadius: '8px',
                      overflow: 'hidden'
                    }}>
                      <ReactQuill
                        theme="snow"
                        value={formData.description}
                        onChange={(value) => setFormData(prev => ({ ...prev, description: value }))}
                        modules={quillModules}
                        style={{
                          background: 'rgba(17, 20, 23, 0.8)',
                          color: '#fff'
                        }}
                      />
                    </div>
                  </div>
                  
                  {/* Form Actions */}
                  <div style={{
                    display: 'flex',
                    gap: '1rem',
                    justifyContent: 'flex-end',
                    paddingTop: '1rem',
                    borderTop: '1px solid rgba(57, 255, 20, 0.2)'
                  }}>
                    <button 
                      type="submit" 
                      disabled={loading}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '1rem 2rem',
                        background: loading ? 'rgba(57, 255, 20, 0.3)' : 'linear-gradient(135deg, #39ff14 0%, #00ffe7 100%)',
                        color: '#000',
                        border: 'none',
                        borderRadius: '8px',
                        fontFamily: 'JetBrains Mono, monospace',
                        fontWeight: 600,
                        fontSize: '1rem',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        transition: 'all 0.3s ease',
                        opacity: loading ? 0.6 : 1
                      }}
                    >
                      <Save size={16} />
                      {loading ? 'Saving...' : (editingPost ? 'Update' : 'Create')}
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setShowForm(false)}
                      style={{
                        padding: '1rem 2rem',
                        background: 'rgba(255, 87, 87, 0.2)',
                        border: '1px solid rgba(255, 87, 87, 0.3)',
                        borderRadius: '8px',
                        color: '#ff5757',
                        fontFamily: 'JetBrains Mono, monospace',
                        fontWeight: 600,
                        fontSize: '1rem',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseOver={e => {
                        e.target.style.borderColor = '#ff5757';
                        e.target.style.background = 'rgba(255, 87, 87, 0.3)';
                      }}
                      onMouseOut={e => {
                        e.target.style.borderColor = 'rgba(255, 87, 87, 0.3)';
                        e.target.style.background = 'rgba(255, 87, 87, 0.2)';
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Posts List */}
        <div 
          style={{ 
            paddingBottom: '4rem',
            animation: 'slideUp 1.8s ease-out'
          }}
        >
          {loading && !showForm ? (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '300px'
            }}>
              <div
                style={{
                  background: 'linear-gradient(145deg, rgba(24, 28, 31, 0.95) 0%, rgba(17, 20, 23, 0.95) 100%)',
                  borderRadius: '20px',
                  padding: '2rem',
                  border: '1px solid rgba(57, 255, 20, 0.3)',
                  boxShadow: '0 8px 32px rgba(0, 255, 174, 0.2)',
                  backdropFilter: 'blur(10px)',
                  textAlign: 'center',
                  maxWidth: '400px'
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  border: '3px solid #39ff14',
                  borderTop: '3px solid transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  margin: '0 auto 1rem'
                }} />
                <p style={{
                  color: '#39ff14',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '1.1rem',
                  margin: 0
                }}>
                  Loading posts...
                </p>
              </div>
            </div>
          ) : (
            <div style={{
              background: 'linear-gradient(145deg, rgba(24, 28, 31, 0.95) 0%, rgba(17, 20, 23, 0.95) 100%)',
              borderRadius: '20px',
              border: '1px solid rgba(57, 255, 20, 0.3)',
              boxShadow: '0 8px 32px rgba(0, 255, 174, 0.2)',
              backdropFilter: 'blur(10px)',
              overflow: 'hidden'
            }}>
              {/* Table Header */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto auto auto',
                gap: '2rem',
                padding: '1.5rem 2rem',
                background: 'linear-gradient(90deg, rgba(57, 255, 20, 0.1) 0%, rgba(0, 255, 231, 0.1) 100%)',
                borderBottom: '1px solid rgba(57, 255, 20, 0.2)',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: '#39ff14',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                <span>Title</span>
                <span>Views</span>
                <span>Date</span>
                <span>Actions</span>
              </div>
              
              {/* Posts */}
              {filteredPosts.map((post, index) => (
                <div 
                  key={post.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr auto auto auto',
                    gap: '2rem',
                    padding: '2rem',
                    borderBottom: index < filteredPosts.length - 1 ? '1px solid rgba(57, 255, 20, 0.1)' : 'none',
                    alignItems: 'center',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.background = 'rgba(57, 255, 20, 0.05)';
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  {/* Post Info */}
                  <div>
                    <h3 style={{
                      fontSize: '1.2rem',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontWeight: 600,
                      color: '#39ff14',
                      marginBottom: '0.5rem',
                      lineHeight: 1.3
                    }}>
                      {post.title}
                    </h3>
                    <p style={{
                      color: '#baffc9',
                      fontSize: '0.9rem',
                      fontFamily: 'Inter, sans-serif',
                      lineHeight: 1.5,
                      margin: 0,
                      opacity: 0.8
                    }}>
                      {stripHtml(post.description).substring(0, 100)}...
                    </p>
                  </div>
                  
                  {/* Views */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#00ffe7',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.9rem',
                    fontWeight: 600
                  }}>
                    <Eye size={14} />
                    {post.views}
                  </div>
                  
                  {/* Date */}
                  <div style={{
                    color: '#8b949e',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.85rem'
                  }}>
                    {formatDate(post.created_at)}
                  </div>
                  
                  {/* Actions */}
                  <div style={{
                    display: 'flex',
                    gap: '0.5rem'
                  }}>
                    <button 
                      onClick={() => navigate(`/admin/edit-post/${post.id}`)}
                      style={{
                        padding: '0.5rem',
                        border: '1px solid rgba(0, 255, 231, 0.3)',
                        background: 'rgba(0, 255, 231, 0.1)',
                        borderRadius: '6px',
                        color: '#00ffe7',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      onMouseOver={e => {
                        e.target.style.borderColor = '#00ffe7';
                        e.target.style.background = 'rgba(0, 255, 231, 0.2)';
                        e.target.style.transform = 'translateY(-2px)';
                      }}
                      onMouseOut={e => {
                        e.target.style.borderColor = 'rgba(0, 255, 231, 0.3)';
                        e.target.style.background = 'rgba(0, 255, 231, 0.1)';
                        e.target.style.transform = 'translateY(0)';
                      }}
                    >
                      <Edit size={14} />
                    </button>
                    <button 
                      onClick={() => handleDelete(post.id)}
                      style={{
                        padding: '0.5rem',
                        border: '1px solid rgba(255, 87, 87, 0.3)',
                        background: 'rgba(255, 87, 87, 0.1)',
                        borderRadius: '6px',
                        color: '#ff5757',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      onMouseOver={e => {
                        e.target.style.borderColor = '#ff5757';
                        e.target.style.background = 'rgba(255, 87, 87, 0.2)';
                        e.target.style.transform = 'translateY(-2px)';
                      }}
                      onMouseOut={e => {
                        e.target.style.borderColor = 'rgba(255, 87, 87, 0.3)';
                        e.target.style.background = 'rgba(255, 87, 87, 0.1)';
                        e.target.style.transform = 'translateY(0)';
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
              
              {/* No Posts Message */}
              {filteredPosts.length === 0 && (
                <div style={{
                  textAlign: 'center',
                  padding: '4rem 2rem',
                  color: '#8b949e'
                }}>
                  <div
                    style={{
                      animation: 'slideUp 0.6s ease-out'
                    }}
                  >
                    <p style={{
                      fontSize: '1.1rem',
                      fontFamily: 'JetBrains Mono, monospace',
                      margin: 0
                    }}>
                      {searchTerm ? `No posts match "${searchTerm}"` : 'No posts found. Create your first post!'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        
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
        
        @media (max-width: 768px) {
          .admin-controls {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          
          .search-box {
            max-width: none !important;
          }
          
          .posts-table .table-header {
            display: none !important;
          }
          
          .posts-table .table-row {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
            padding: 1rem !important;
          }
          
          .post-actions {
            justify-content: flex-end !important;
            margin-top: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Admin;
