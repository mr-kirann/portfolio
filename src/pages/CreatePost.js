import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, X, Upload, ArrowLeft } from 'lucide-react';
import { blogAPI } from '../services/api';
import QuillWithImageEditor from '../components/QuillWithImageEditor';

const CreatePost = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    content_burmese: '',
    image: ''
  });
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

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

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file.');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB.');
      return;
    }

    const formDataUpload = new FormData();
    formDataUpload.append('image', file);

    try {
      setUploadingImage(true);
      console.log('Uploading image directly...');
      const response = await blogAPI.uploadImage(formDataUpload);
      console.log('Upload response:', response);
      
      if (response.data && response.data.filename) {
        const imageUrl = `http://sheinhtutoo-backend.infinityfree.me/uploads/${response.data.filename}`;
        console.log('Setting image URL:', imageUrl);
        setFormData(prev => ({
          ...prev,
          image: imageUrl
        }));
        setImagePreview(imageUrl);
        console.log('Image upload successful!');
      } else {
        console.error('Invalid response format:', response);
        alert('Invalid response from server. Please try again.');
      }
    } catch (error) {
      console.error('Image upload failed:', error);
      if (error.response?.status === 401) {
        alert('Please log in first to upload images.');
      } else {
        alert('Failed to upload image. Please try again.');
      }
    } finally {
      setUploadingImage(false);
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
        title: formData.title,
        slug: slug,
        description: formData.content || formData.description, // Use rich content as description
        content_burmese: formData.content_burmese,
        image: formData.image
      };

      await blogAPI.createPost(postData);
      alert('Post created successfully!');
      navigate('/admin');
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin');
  };



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
            Create New Post
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
                    background: uploadingImage ? 'rgba(57, 255, 20, 0.3)' : 'rgba(57, 255, 20, 0.1)',
                    border: '1px solid rgba(57, 255, 20, 0.3)',
                    borderRadius: '8px',
                    color: '#39ff14',
                    cursor: uploadingImage ? 'not-allowed' : 'pointer',
                    fontFamily: 'JetBrains Mono, monospace',
                    transition: 'all 0.3s ease',
                    opacity: uploadingImage ? 0.7 : 1
                  }}
                >
                  <Upload size={16} />
                  {uploadingImage ? 'Uploading...' : 'Choose Image'}
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
                    <p style={{
                      textAlign: 'center',
                      marginTop: '0.5rem',
                      color: '#8b949e',
                      fontSize: '0.9rem',
                      fontFamily: 'JetBrains Mono, monospace'
                    }}>
                      Image uploaded successfully
                    </p>
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
                  placeholder="Write your blog post content here..."
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
                {loading ? 'Creating...' : 'Create Post'}
              </button>
            </div>
          </div>
        </form>
      </div>

      <style jsx>{`
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
    </div>
  );
};

export default CreatePost;
