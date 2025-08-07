import { blogAPI } from '../services/api';

class QuillImageHandler {
  constructor(quill, options = {}) {
    this.quill = quill;
    this.options = options;
    this.onImageEdit = options.onImageEdit || (() => {});
    this.currentRange = null;
    
    // Create file input
    this.fileInput = document.createElement('input');
    this.fileInput.setAttribute('type', 'file');
    this.fileInput.setAttribute('accept', 'image/*');
    this.fileInput.style.display = 'none';
    document.body.appendChild(this.fileInput);
    
    // Bind event handlers
    this.fileInput.addEventListener('change', this.handleFileSelect.bind(this));
    
    // Override the default image handler
    const toolbar = quill.getModule('toolbar');
    if (toolbar) {
      toolbar.addHandler('image', this.imageHandler.bind(this));
    }
  }
  
  imageHandler(e) {
    // Prevent any default behavior and form submission
    if (e) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
    }
    
    // Store current selection
    this.currentRange = this.quill.getSelection(true);
    
    // Use setTimeout to ensure we don't interfere with form events
    setTimeout(() => {
      this.fileInput.click();
    }, 10);
    
    return false; // Prevent any default handling
  }
  
  handleFileSelect(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file.');
      return;
    }
    
    // Create preview URL for editing
    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target.result;
      
      // Call the image edit callback with the image data
      this.onImageEdit({
        file: file,
        imageUrl: imageUrl,
        onImageProcessed: this.insertImage.bind(this)
      });
    };
    reader.readAsDataURL(file);
    
    // Reset file input
    this.fileInput.value = '';
  }
  
  async insertImage(editedImageBlob) {
    try {
      // Use stored range or get current selection
      const range = this.currentRange || this.quill.getSelection(true) || { index: this.quill.getLength() };
      
      console.log('Inserting image at range:', range);
      
      // Show loading placeholder
      const loadingText = '[📷 Uploading image...]';
      this.quill.insertText(range.index, loadingText, 'user');
      this.quill.setSelection(range.index + loadingText.length);
      
      // Upload the edited image
      const formData = new FormData();
      formData.append('image', editedImageBlob, `content-image-${Date.now()}.jpg`);
      
      console.log('Uploading image...');
      const response = await blogAPI.uploadImage(formData);
      console.log('Upload response:', response);
      
      if (response.data && response.data.filename) {
        const imageUrl = `http://sheinhtutoo-backend.infinityfree.me/uploads/${response.data.filename}`;
        
        // Remove loading text
        this.quill.deleteText(range.index, loadingText.length);
        
        // Insert image
        this.quill.insertEmbed(range.index, 'image', imageUrl, 'user');
        
        // Add a line break after the image
        this.quill.insertText(range.index + 1, '\n', 'user');
        
        // Set cursor after the image
        this.quill.setSelection(range.index + 2);
        
        console.log('Image inserted successfully:', imageUrl);
      } else {
        // Remove loading text on error
        this.quill.deleteText(range.index, loadingText.length);
        console.error('Upload failed - no filename in response:', response);
        alert('Failed to upload image. Please try again.');
      }
    } catch (error) {
      console.error('Image upload failed:', error);
      
      // Try to remove loading text if it exists
      try {
        const range = this.currentRange || this.quill.getSelection(true);
        if (range) {
          const text = this.quill.getText(range.index, 25);
          if (text.includes('[📷 Uploading image...]')) {
            this.quill.deleteText(range.index, '[📷 Uploading image...]'.length);
          }
        }
      } catch (cleanupError) {
        console.error('Error cleaning up loading text:', cleanupError);
      }
      
      alert('Failed to upload image. Please check your connection and try again.');
    } finally {
      // Clear stored range
      this.currentRange = null;
    }
  }
  
  destroy() {
    if (this.fileInput && this.fileInput.parentNode) {
      this.fileInput.parentNode.removeChild(this.fileInput);
    }
  }
}

export default QuillImageHandler;
