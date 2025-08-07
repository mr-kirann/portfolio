import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Eye, ArrowLeft, Share2 } from 'lucide-react';
import { blogAPI } from '../services/api';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState('english'); // 'english' or 'burmese'

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await blogAPI.getPostBySlug(slug);
      if (response.data) {
        setPost(response.data);
      } else {
        setError('Post not found');
      }
    } catch (err) {
      setError('Failed to fetch blog post');
      console.error('Error fetching post:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const sharePost = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'english' ? 'burmese' : 'english');
  };

  const getCurrentContent = () => {
    if (language === 'burmese' && post.content_burmese && post.content_burmese.trim() !== '') {
      return post.content_burmese;
    }
    return post.description; // English content from description field
  };

  const hasBurmeseContent = () => {
    return post && post.content_burmese && post.content_burmese.trim() !== '';
  };

  if (loading) {
    return (
      <div className="blog-post-loading">
        <div className="container">
          <div className="terminal">
            <div className="terminal-header">Loading post...</div>
            <div className="terminal-content">
              <span className="pulse">█</span> cat /blog/posts/{slug}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="blog-post-error">
        <div className="container">
          <div className="terminal">
            <div className="terminal-header">Error 404</div>
            <div className="terminal-content" style={{ color: 'var(--accent-red)' }}>
              {error || 'Post not found'}
            </div>
          </div>
          <Link to="/blog" className="btn" style={{ marginTop: '2rem' }}>
            <ArrowLeft size={16} />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-post">
      <div className="container">
        {/* Navigation */}
        <motion.div 
          className="post-navigation"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/blog" className="back-link">
            <ArrowLeft size={16} />
            Back to Blog
          </Link>
        </motion.div>

        {/* Post Header */}
        <motion.header 
          className="post-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="terminal">
            <div className="terminal-header">root@security-blog:~$</div>
            <div className="terminal-content">
              <span className="pulse">█</span> cat {post.slug}.md
            </div>
          </div>

          <h1 className="post-title">{post.title}</h1>
          
          <div className="post-meta">
            <div className="meta-item">
              <Calendar size={16} />
              <span>{formatDate(post.created_at)}</span>
            </div>
            <div className="meta-item">
              <Eye size={16} />
              <span>{post.views} views</span>
            </div>
            <button className="share-btn" onClick={sharePost}>
              <Share2 size={16} />
              <span>Share</span>
            </button>
          </div>
        </motion.header>

        {/* Featured Image */}
        {post.image && (
          <motion.div 
            className="post-featured-image"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <img 
              src={`http://sheinhtutoo-backend.infinityfree.me/serve-image.php?file=${post.image}`} 
              alt={post.title}
              onError={(e) => {
                e.target.parentElement.style.display = 'none';
              }}
            />
          </motion.div>
        )}

        {/* Language Toggle Button */}
        {hasBurmeseContent() && (
          <motion.div 
            className="language-toggle-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
          >
            <button 
              className="language-toggle-btn"
              onClick={toggleLanguage}
            >
              🔄 {language === 'english' ? 'Convert to Burmese' : 'Back to English'}
            </button>
          </motion.div>
        )}

        {/* Post Content */}
        <motion.article 
          className="post-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div 
            className="content-html"
            dangerouslySetInnerHTML={{ __html: getCurrentContent() }}
          />
        </motion.article>

        {/* Post Footer */}
        <motion.footer 
          className="post-footer"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="terminal">
            <div className="terminal-header">End of file</div>
            <div className="terminal-content">
              <span className="pulse">█</span> Thanks for reading!
            </div>
          </div>
          
          <div className="post-actions">
            <button className="btn" onClick={sharePost}>
              <Share2 size={16} />
              Share Post
            </button>
            <Link to="/blog" className="btn">
              <ArrowLeft size={16} />
              More Posts
            </Link>
          </div>
        </motion.footer>
      </div>

      <style jsx>{`
        .blog-post {
          padding: 2rem 0 4rem 0;
          min-height: 100vh;
        }

        .post-navigation {
          margin-bottom: 2rem;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--accent-cyan);
          font-family: 'Fira Code', monospace;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: all 0.3s ease;
        }

        .back-link:hover {
          color: var(--text-primary);
          transform: translateX(-5px);
        }

        .post-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .post-title {
          margin: 2rem 0 1.5rem 0;
          font-size: 3rem;
          line-height: 1.2;
        }

        .post-meta {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-muted);
          font-family: 'Fira Code', monospace;
          font-size: 0.9rem;
        }

        .share-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: transparent;
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          padding: 0.5rem 1rem;
          border-radius: 4px;
          font-family: 'Fira Code', monospace;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .share-btn:hover {
          border-color: var(--text-primary);
          color: var(--text-primary);
        }

        .language-toggle-section {
          text-align: center;
          margin-bottom: 2rem;
        }

        .language-toggle-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #00ffe7 0%, #39ff14 100%);
          border: none;
          border-radius: 8px;
          color: #000000;
          font-family: 'JetBrains Mono', monospace;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .language-toggle-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 255, 231, 0.3);
        }

        .post-featured-image {
          margin-bottom: 3rem;
        }

        .post-featured-image img {
          width: 60%;
          max-width: 600px;
          height: auto;
          display: block;
          margin: 0 auto;
        }

        .post-content {
          max-width: 800px;
          margin: 0 auto 4rem auto;
        }

        .content-html {
          line-height: 1.8;
          font-size: 1.4rem;
          font-family: 'Noto Sans Myanmar', 'Padauk', 'Myanmar3', 'JetBrains Mono', monospace;
          word-spacing: 0.1em;
        }

        .content-html h1,
        .content-html h2,
        .content-html h3,
        .content-html h4,
        .content-html h5,
        .content-html h6 {
          margin: 2rem 0 1rem 0;
          color: var(--text-primary);
        }

        .content-html p {
          margin-bottom: 1.5rem;
          color: var(--text-secondary);
          font-size: 1.4rem;
        }

        .content-html ul,
        .content-html ol {
          margin: 1rem 0 1.5rem 2rem;
          color: var(--text-secondary);
          font-size: 1.2rem;
        }

        .content-html li {
          margin-bottom: 0.5rem;
          font-size: 1.2rem;
        }

        .content-html code {
          background: var(--bg-tertiary);
          color: var(--accent-cyan);
          padding: 0.2rem 0.4rem;
          border-radius: 4px;
          font-family: 'Fira Code', monospace;
          font-size: 0.9em;
        }

        .content-html pre {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 1.5rem;
          overflow-x: auto;
          margin: 1.5rem 0;
        }

        .content-html pre code {
          background: none;
          padding: 0;
          color: var(--text-primary);
        }

        .content-html blockquote {
          border-left: 4px solid var(--text-primary);
          padding-left: 1.5rem;
          margin: 1.5rem 0;
          font-style: italic;
          color: var(--text-muted);
        }

        .content-html a {
          color: var(--accent-cyan);
          text-decoration: underline;
        }

        .content-html a:hover {
          color: var(--text-primary);
        }

        .post-footer {
          text-align: center;
          border-top: 1px solid var(--border-color);
          padding-top: 2rem;
        }

        .post-actions {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-top: 2rem;
          flex-wrap: wrap;
        }

        .post-actions .btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .blog-post-loading,
        .blog-post-error {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          min-height: 50vh;
          text-align: center;
        }

        @media (max-width: 768px) {
          .post-title {
            font-size: 2rem;
          }

          .post-meta {
            gap: 1rem;
          }

          .content-html {
            font-size: 1.2rem;
          }

          .post-actions {
            flex-direction: column;
            align-items: center;
          }
        }

        @media (max-width: 480px) {
          .blog-post {
            padding: 1rem 0 2rem 0;
          }

          .post-title {
            font-size: 1.8rem;
          }

          .post-meta {
            flex-direction: column;
            gap: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default BlogPost;
