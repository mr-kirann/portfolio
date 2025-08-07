import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, X, Upload, ArrowLeft, Loader, Edit } from 'lucide-react';
import { blogAPI } from '../services/api';

import ImageEditor from '../components/ImageEditor';
import QuillWithImageEditor from '../components/QuillWithImageEditor';

const EditPost = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    content: '',
    content_burmese: '',
    image: ''
  });
  const [loading, setLoading] = useState(false);
  const [loadingPost, setLoadingPost] = useState(true);
  const [imagePreview, setImagePreview] = useState('');
  const [showImageEditor, setShowImageEditor] = useState(false);
  const [originalImageFile, setOriginalImageFile] = useState(null);
  const [originalImageUrl, setOriginalImageUrl] = useState('');

  // Load post data
  useEffect(() => {
    const loadPost = async () => {
      try {
        const response = await blogAPI.getAllPosts();
        const posts = response.data.data || [];
        const post = posts.find(p => p.id === parseInt(id));
        
        if (post) {
          setFormData({
            id: post.id,
            title: post.title,
            description: post.description,
            content: post.description || '', // Load description into content for editing
            content_burmese: post.content_burmese || '',
            image: post.image || ''
          });
          setImagePreview(post.image ? `http://sheinhtutoo-backend.infinityfree.me/serve-image.php?file=${post.image}` : '');
        } else {
          alert('Post not found');
          navigate('/admin');
        }
      } catch (error) {
        console.error('Error loading post:', error);
        alert('Failed to load post');
        navigate('/admin');
      } finally {
        setLoadingPost(false);
      }
    };

    if (id) {
      loadPost();
    }
  }, [id, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContentChange = (content) => {
    setFormData(prev => ({
      ...prev,
      content
    }));
  };

  const handleBurmeseContentChange = (content) => {
    setFormData(prev => ({
      ...prev,
      content_burmese: content
    }));
  };



  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Store original file for editing
    setOriginalImageFile(file);
    
    // Create preview URL for editing
    const reader = new FileReader();
    reader.onload = (event) => {
      setOriginalImageUrl(event.target.result);
      setShowImageEditor(true);
    };
    reader.readAsDataURL(file);
  };

  const handleImageEditSave = async (editedImageBlob) => {
    const formDataUpload = new FormData();
    formDataUpload.append('image', editedImageBlob, 'edited-image.jpg');

    try {
      const response = await blogAPI.uploadImage(formDataUpload);
      if (response.data && response.data.filename) {
        const imageUrl = `http://sheinhtutoo-backend.infinityfree.me/uploads/${response.data.filename}`;
        setFormData(prev => ({
          ...prev,
          image: imageUrl
        }));
        setImagePreview(imageUrl);
        setShowImageEditor(false);
      }
    } catch (error) {
      console.error('Image upload failed:', error);
      alert('Failed to upload image. Please try again.');
    }
  };

  const handleImageEditCancel = () => {
    setShowImageEditor(false);
    setOriginalImageFile(null);
    setOriginalImageUrl('');
  };

  const handleEditExistingImage = () => {
    if (imagePreview) {
      setOriginalImageUrl(imagePreview);
      setShowImageEditor(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Please fill in all required fields (Title and Content)');
      return;
    }

    setLoading(true);
    try {
      // Generate slug from title
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      const postData = {
        id: formData.id,
        title: formData.title,
        slug: slug,
        description: formData.content, // Use rich content as description
        content_burmese: formData.content_burmese,
        image: formData.image
      };

      await blogAPI.updatePost(postData);
      alert('Post updated successfully!');
      navigate('/admin');
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Failed to update post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin');
  };



  if (loadingPost) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          color: '#39ff14',
          fontFamily: 'JetBrains Mono, monospace'
        }}>
          <Loader size={40} style={{ animation: 'spin 1s linear infinite' }} />
          <p>Loading post...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
      position: 'relative',
      padding: '2rem'
    }}>
      {/* Background Effects */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          radial-gradient(circle at 20% 80%, rgba(57, 255, 20, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(0, 255, 231, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(186, 255, 201, 0.05) 0%, transparent 50%)
        `,
        zIndex: 1
      }} />

      <div style={{
        position: 'relative',
        zIndex: 2,
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '3rem',
          gap: '1rem'
        }}>
          <button
            onClick={handleCancel}
            style={{
              background: 'rgba(57, 255, 20, 0.1)',
              border: '1px solid rgba(57, 255, 20, 0.3)',
              borderRadius: '8px',
              padding: '0.75rem',
              color: '#39ff14',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.9rem',
              fontFamily: 'JetBrains Mono, monospace',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={e => {
              e.target.style.background = 'rgba(57, 255, 20, 0.2)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={e => {
              e.target.style.background = 'rgba(57, 255, 20, 0.1)';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            <ArrowLeft size={16} />
            Back to Admin
          </button>

          <h1 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontFamily: 'JetBrains Mono, monospace',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #39ff14 0%, #00ffe7 50%, #39ff14 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0
          }}>
            Edit Post
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{
            background: 'linear-gradient(145deg, rgba(24, 28, 31, 0.95) 0%, rgba(17, 20, 23, 0.95) 100%)',
            borderRadius: '20px',
            padding: '3rem',
            border: '1px solid rgba(57, 255, 20, 0.2)',
            boxShadow: '0 8px 32px rgba(57, 255, 20, 0.1)',
            backdropFilter: 'blur(10px)'
          }}>
            {/* Title */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#39ff14',
                fontFamily: 'JetBrains Mono, monospace',
                fontWeight: 600
              }}>
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: 'rgba(57, 255, 20, 0.05)',
                  border: '1px solid rgba(57, 255, 20, 0.3)',
                  borderRadius: '8px',
                  color: '#ffffff',
                  fontSize: '1rem',
                  fontFamily: 'Inter, sans-serif',
                  transition: 'all 0.3s ease'
                }}
                onFocus={e => {
                  e.target.style.borderColor = '#39ff14';
                  e.target.style.boxShadow = '0 0 0 2px rgba(57, 255, 20, 0.2)';
                }}
                onBlur={e => {
                  e.target.style.borderColor = 'rgba(57, 255, 20, 0.3)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Description */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#39ff14',
                fontFamily: 'JetBrains Mono, monospace',
                fontWeight: 600
              }}>
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={3}
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: 'rgba(57, 255, 20, 0.05)',
                  border: '1px solid rgba(57, 255, 20, 0.3)',
                  borderRadius: '8px',
                  color: '#ffffff',
                  fontSize: '1rem',
                  fontFamily: 'Inter, sans-serif',
                  resize: 'vertical',
                  transition: 'all 0.3s ease'
                }}
                onFocus={e => {
                  e.target.style.borderColor = '#39ff14';
                  e.target.style.boxShadow = '0 0 0 2px rgba(57, 255, 20, 0.2)';
                }}
                onBlur={e => {
                  e.target.style.borderColor = 'rgba(57, 255, 20, 0.3)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Image Upload */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#39ff14',
                fontFamily: 'JetBrains Mono, monospace',
                fontWeight: 600
              }}>
                Featured Image
              </label>
              <div style={{
                border: '2px dashed rgba(57, 255, 20, 0.3)',
                borderRadius: '8px',
                padding: '2rem',
                textAlign: 'center',
                background: 'rgba(57, 255, 20, 0.05)',
                transition: 'all 0.3s ease'
              }}>
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
                    padding: '0.75rem 1.5rem',
                    background: 'rgba(57, 255, 20, 0.1)',
                    border: '1px solid rgba(57, 255, 20, 0.3)',
                    borderRadius: '8px',
                    color: '#39ff14',
                    cursor: 'pointer',
                    fontFamily: 'JetBrains Mono, monospace',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Upload size={16} />
                  {imagePreview ? 'Change Image' : 'Choose Image'}
                </label>
                {imagePreview && (
                  <div style={{ marginTop: '1rem' }}>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{
                        maxWidth: '200px',
                        maxHeight: '200px',
                        borderRadius: '8px',
                        border: '1px solid rgba(57, 255, 20, 0.3)',
                        display: 'block',
                        margin: '0 auto'
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleEditExistingImage}
                      style={{
                        marginTop: '0.5rem',
                        padding: '0.5rem 1rem',
                        background: 'rgba(0, 255, 231, 0.1)',
                        border: '1px solid rgba(0, 255, 231, 0.3)',
                        borderRadius: '6px',
                        color: '#00ffe7',
                        cursor: 'pointer',
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        margin: '0.5rem auto 0',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseOver={e => {
                        e.target.style.background = 'rgba(0, 255, 231, 0.2)';
                        e.target.style.transform = 'translateY(-1px)';
                      }}
                      onMouseOut={e => {
                        e.target.style.background = 'rgba(0, 255, 231, 0.1)';
                        e.target.style.transform = 'translateY(0)';
                      }}
                    >
                      <Edit size={14} />
                      Edit Image
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Content Editor */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#39ff14',
                fontFamily: 'JetBrains Mono, monospace',
                fontWeight: 600
              }}>
                Content
              </label>
              <div style={{
                border: '1px solid rgba(57, 255, 20, 0.3)',
                borderRadius: '8px',
                overflow: 'hidden'
              }}>
                <QuillWithImageEditor
                  value={formData.content}
                  onChange={handleContentChange}
                  placeholder="Edit your blog post content here..."
                  style={{
                    background: 'rgba(57, 255, 20, 0.05)',
                    color: '#ffffff'
                  }}
                />
              </div>
            </div>

            {/* Burmese Content Editor */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#00ffe7',
                fontFamily: 'JetBrains Mono, monospace',
                fontWeight: 600
              }}>
                Content For Burmese
              </label>
              <div style={{
                border: '1px solid rgba(0, 255, 231, 0.3)',
                borderRadius: '8px',
                overflow: 'hidden'
              }}>
                <QuillWithImageEditor
                  value={formData.content_burmese}
                  onChange={handleBurmeseContentChange}
                  placeholder="Translate your blog post content to Burmese here..."
                  style={{
                    background: 'rgba(0, 255, 231, 0.05)',
                    color: '#ffffff'
                  }}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'flex-end',
              flexWrap: 'wrap'
            }}>
              <button
                type="button"
                onClick={handleCancel}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: 'rgba(139, 148, 158, 0.1)',
                  border: '1px solid rgba(139, 148, 158, 0.3)',
                  borderRadius: '8px',
                  color: '#8b949e',
                  cursor: 'pointer',
                  fontFamily: 'JetBrains Mono, monospace',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={e => {
                  e.target.style.background = 'rgba(139, 148, 158, 0.2)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={e => {
                  e.target.style.background = 'rgba(139, 148, 158, 0.1)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                <X size={16} />
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={loading}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: loading ? 'rgba(57, 255, 20, 0.3)' : 'linear-gradient(135deg, #39ff14 0%, #00ffe7 100%)',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#000000',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={e => {
                  if (!loading) {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 8px 25px rgba(57, 255, 20, 0.3)';
                  }
                }}
                onMouseOut={e => {
                  if (!loading) {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }
                }}
              >
                <Save size={16} />
                {loading ? 'Updating...' : 'Update Post'}
              </button>
            </div>
          </div>
        </form>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .ql-toolbar {
          background: rgba(57, 255, 20, 0.05) !important;
          border-color: rgba(57, 255, 20, 0.3) !important;
        }
        
        .ql-container {
          background: rgba(57, 255, 20, 0.05) !important;
          border-color: rgba(57, 255, 20, 0.3) !important;
          color: #ffffff !important;
        }
        
        .ql-editor {
          color: #ffffff !important;
          min-height: 200px;
        }
        
        .ql-snow .ql-stroke {
          stroke: #39ff14 !important;
        }
        
        .ql-snow .ql-fill {
          fill: #39ff14 !important;
        }
        
        @media (max-width: 768px) {
          .form-actions {
            flex-direction: column !important;
          }
          
          .form-actions button {
            width: 100% !important;
            justify-content: center !important;
          }
        }
      `}</style>
      
      {/* Image Editor Modal */}
      {showImageEditor && (
        <ImageEditor
          src={originalImageUrl}
          onSave={handleImageEditSave}
          onCancel={handleImageEditCancel}
        />
      )}
    </div>
  );
};

export default EditPost;
