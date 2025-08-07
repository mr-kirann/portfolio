import React, { useRef, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './QuillEditor.css';
import QuillImageHandler from './QuillImageHandler';
import ImageEditor from './ImageEditor';

const QuillWithImageEditor = ({ value, onChange, placeholder, style, fontSize = 14 }) => {
  const quillRef = useRef(null);
  const imageHandlerRef = useRef(null);
  const [showImageEditor, setShowImageEditor] = useState(false);
  const [currentImageData, setCurrentImageData] = useState(null);

  const handleImageEdit = (imageData) => {
    console.log('Image edit requested:', imageData);
    setCurrentImageData(imageData);
    setShowImageEditor(true);
  };

  const handleImageEditSave = async (editedImageBlob) => {
    console.log('Image edit save requested:', editedImageBlob);
    try {
      if (currentImageData && currentImageData.onImageProcessed) {
        await currentImageData.onImageProcessed(editedImageBlob);
      }
    } catch (error) {
      console.error('Error processing edited image:', error);
    } finally {
      setShowImageEditor(false);
      setCurrentImageData(null);
    }
  };

  const handleImageEditCancel = () => {
    console.log('Image edit cancelled');
    setShowImageEditor(false);
    setCurrentImageData(null);
  };

  useEffect(() => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      
      // Initialize custom image handler
      imageHandlerRef.current = new QuillImageHandler(quill, {
        onImageEdit: handleImageEdit
      });
      
      // Add event listeners to prevent form submission
      const toolbar = quill.getModule('toolbar');
      if (toolbar && toolbar.container) {
        const imageButton = toolbar.container.querySelector('.ql-image');
        if (imageButton) {
          imageButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
          }, true);
        }
      }
    }

    // Cleanup on unmount
    return () => {
      if (imageHandlerRef.current) {
        imageHandlerRef.current.destroy();
      }
    };
  }, []);

  const modules = {
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'align': [] }],
        ['link', 'image'],
        ['blockquote', 'code-block'],
        ['clean']
      ]
    }
  };

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'color', 'background', 'align',
    'link', 'image', 'blockquote', 'code-block'
  ];

  // Prevent form submission when clicking toolbar buttons
  const handleToolbarClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div onClick={handleToolbarClick}>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        modules={modules}
        formats={formats}
        style={{
          ...style,
          fontSize: `${fontSize}px`
        }}
      />
      
      {/* Dynamic font size styling */}
      <style jsx>{`
        .ql-editor {
          font-size: ${fontSize}px !important;
        }
        .ql-editor p {
          font-size: ${fontSize}px !important;
        }
        .ql-editor * {
          font-size: inherit !important;
        }
      `}</style>
      
      {/* Image Editor Modal */}
      {showImageEditor && currentImageData && (
        <ImageEditor
          src={currentImageData.imageUrl}
          onSave={handleImageEditSave}
          onCancel={handleImageEditCancel}
        />
      )}
    </div>
  );
};

export default QuillWithImageEditor;
