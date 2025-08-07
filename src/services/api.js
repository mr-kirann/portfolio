import axios from 'axios';

// Backend URL configuration
// Production server: http://sheinhtutoo-backend.infinityfree.me
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://sheinhtutoo-backend.infinityfree.me';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Include cookies in requests
});

// Add request interceptor for debugging and auth
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url, config.data);
    
    // Always add auth token for protected endpoints
    const protectedEndpoints = ['/api/posts/create.php', '/api/posts/update.php', '/api/posts/delete.php', '/api/upload.php', '/api/auth/verify.php'];
    const isProtectedEndpoint = protectedEndpoints.some(endpoint => config.url?.includes(endpoint));
    
    if (isProtectedEndpoint) {
      const token = localStorage.getItem('auth_token');
      console.log('Token from localStorage:', token ? 'Found' : 'Not found');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('Authorization header added');
      } else {
        console.warn('No token available for protected endpoint:', config.url);
      }
    }
    
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.status, error.response?.data || error.message);
    return Promise.reject(error);
  }
);



// Blog Posts API
export const blogAPI = {
  // Get all posts
  getAllPosts: async () => {
    try {
      console.log('Fetching posts from:', `${API_BASE_URL}/api/posts/read.php`);
      
      // Try with direct fetch first
      const directResponse = await fetch(`${API_BASE_URL}/api/posts/read.php`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });
      
      if (!directResponse.ok) {
        throw new Error(`HTTP error! status: ${directResponse.status}`);
      }
      
      const data = await directResponse.json();
      console.log('Posts API response:', data);
      
      // Return in axios-like format
      return { data };
    } catch (error) {
      console.error('Failed to fetch posts:', error.message);
      throw error;
    }
  },

  // Get single post by slug
  getPostBySlug: async (slug) => {
    try {
      console.log('Fetching single post:', slug);
      const response = await api.get(`/api/posts/read_single.php?slug=${slug}`);
      console.log('Single post response:', response.data);
      return response;
    } catch (error) {
      console.error('Failed to fetch single post:', error.response?.data || error.message);
      throw error;
    }
  },

  // Create new post
  createPost: async (postData) => {
    try {
      return await api.post('/api/posts/create.php', postData);
    } catch (error) {
      console.error('Failed to create post:', error.response?.data || error.message);
      if (error.response?.status === 401) {
        alert('Authentication failed. Please log in again.');
      } else {
        alert('Failed to create post. Please try again.');
      }
      throw error;
    }
  },

  // Update post
  updatePost: async (postData) => {
    try {
      return await api.post('/api/posts/update.php', postData);
    } catch (error) {
      console.error('Failed to update post:', error.response?.data || error.message);
      if (error.response?.status === 401) {
        alert('Authentication failed. Please log in again.');
      } else {
        alert('Failed to update post. Please try again.');
      }
      throw error;
    }
  },

  // Delete post
  deletePost: async (id) => {
    try {
      return await api.post('/api/posts/delete.php', { id });
    } catch (error) {
      console.error('Failed to delete post:', error.response?.data || error.message);
      if (error.response?.status === 401) {
        alert('Authentication failed. Please log in again.');
      } else {
        alert('Failed to delete post. Please try again.');
      }
      throw error;
    }
  },
  
  // Upload image
  uploadImage: async (formData) => {
    try {
      return await api.post('/api/upload.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      console.error('Image upload failed:', error.response?.data || error.message);
      alert('Failed to upload image. Please make sure you are logged in.');
      throw error;
    }
  },
};

// Authentication API
export const authAPI = {
  // Login with token
  login: async (formData) => {
    try {
      console.log('Attempting login with token:', formData.token);
      console.log('API Base URL:', API_BASE_URL);
      const response = await api.post('/api/auth/login.php', { token: formData.token });
      console.log('Login successful:', response.data);
      return response;
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      throw error;
    }
  },

  // Verify token
  verify: async () => {
    try {
      return await api.get('/api/auth/verify.php');
    } catch (error) {
      console.error('Token verification error:', error.message);
      throw error;
    }
  },

  // Logout
  logout: async () => {
    try {
      return await api.post('/api/auth/logout.php');
    } catch (error) {
      console.error('Logout error:', error.message);
      throw error;
    }
  },
};

export default api;
