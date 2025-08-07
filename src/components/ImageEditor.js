import React, { useState, useRef, useCallback } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Save, X, RotateCw, Maximize2, Minimize2 } from 'lucide-react';

const ImageEditor = ({ src, onSave, onCancel }) => {
  const [crop, setCrop] = useState({
    unit: '%',
    width: 90,
    height: 90,
    x: 5,
    y: 5
  });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);

  const onImageLoad = useCallback((e) => {
    imgRef.current = e.currentTarget;
  }, []);

  const generateDownload = useCallback(async () => {
    if (!previewCanvasRef.current || !imgRef.current) {
      console.error('Missing canvas or image reference');
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    // Use completedCrop if available, otherwise use the current crop
    const cropToUse = completedCrop || crop;
    
    if (!cropToUse || cropToUse.width === 0 || cropToUse.height === 0) {
      console.error('Invalid crop dimensions');
      return;
    }

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');
    const pixelRatio = window.devicePixelRatio;

    canvas.width = cropToUse.width * pixelRatio * scaleX;
    canvas.height = cropToUse.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      cropToUse.x * scaleX,
      cropToUse.y * scaleY,
      cropToUse.width * scaleX,
      cropToUse.height * scaleY,
      0,
      0,
      cropToUse.width * scaleX,
      cropToUse.height * scaleY,
    );

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          resolve(blob);
        },
        'image/jpeg',
        0.9
      );
    });
  }, [completedCrop, crop]);

  const handleSave = async () => {
    console.log('ImageEditor: Starting save process...');
    console.log('ImageEditor: completedCrop:', completedCrop);
    console.log('ImageEditor: imgRef.current:', imgRef.current);
    console.log('ImageEditor: previewCanvasRef.current:', previewCanvasRef.current);
    
    const croppedImageBlob = await generateDownload();
    console.log('ImageEditor: Generated blob:', croppedImageBlob);
    
    if (croppedImageBlob) {
      console.log('ImageEditor: Calling onSave with blob');
      onSave(croppedImageBlob);
    } else {
      console.error('ImageEditor: Failed to generate cropped image blob');
      alert('Failed to process image. Please try again.');
    }
  };

  const handleRotate = () => {
    setRotate((prev) => (prev + 90) % 360);
  };

  const handleScaleChange = (e) => {
    setScale(parseFloat(e.target.value));
  };

  const resetCrop = () => {
    setCrop({
      unit: '%',
      width: 90,
      height: 90,
      x: 5,
      y: 5
    });
  };

  const fitToScreen = () => {
    setCrop({
      unit: '%',
      width: 100,
      height: 100,
      x: 0,
      y: 0
    });
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.95)',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{
        background: 'linear-gradient(145deg, rgba(24, 28, 31, 0.95) 0%, rgba(17, 20, 23, 0.95) 100%)',
        borderRadius: '20px',
        padding: '2rem',
        border: '1px solid rgba(57, 255, 20, 0.3)',
        boxShadow: '0 8px 32px rgba(57, 255, 20, 0.2)',
        backdropFilter: 'blur(10px)',
        maxWidth: '90vw',
        maxHeight: '90vh',
        overflow: 'auto'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem'
        }}>
          <h2 style={{
            color: '#39ff14',
            fontFamily: 'JetBrains Mono, monospace',
            margin: 0
          }}>
            Edit Image
          </h2>
          <button
            onClick={onCancel}
            style={{
              background: 'none',
              border: 'none',
              color: '#8b949e',
              cursor: 'pointer',
              padding: '0.5rem'
            }}
          >
            <X size={24} />
          </button>
        </div>

        {/* Controls */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <label style={{ color: '#8b949e', fontSize: '0.9rem' }}>Scale:</label>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.1"
              value={scale}
              onChange={handleScaleChange}
              style={{
                width: '100px',
                accentColor: '#39ff14'
              }}
            />
            <span style={{ color: '#39ff14', fontSize: '0.9rem' }}>
              {Math.round(scale * 100)}%
            </span>
          </div>

          <button
            onClick={handleRotate}
            style={{
              padding: '0.5rem 1rem',
              background: 'rgba(57, 255, 20, 0.1)',
              border: '1px solid rgba(57, 255, 20, 0.3)',
              borderRadius: '6px',
              color: '#39ff14',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.9rem'
            }}
          >
            <RotateCw size={16} />
            Rotate
          </button>

          <button
            onClick={resetCrop}
            style={{
              padding: '0.5rem 1rem',
              background: 'rgba(0, 255, 231, 0.1)',
              border: '1px solid rgba(0, 255, 231, 0.3)',
              borderRadius: '6px',
              color: '#00ffe7',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.9rem'
            }}
          >
            <Minimize2 size={16} />
            Reset
          </button>

          <button
            onClick={fitToScreen}
            style={{
              padding: '0.5rem 1rem',
              background: 'rgba(186, 255, 201, 0.1)',
              border: '1px solid rgba(186, 255, 201, 0.3)',
              borderRadius: '6px',
              color: '#baffc9',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.9rem'
            }}
          >
            <Maximize2 size={16} />
            Fit
          </button>
        </div>

        {/* Image Crop Area */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '1.5rem',
          maxHeight: '60vh',
          overflow: 'auto'
        }}>
          <ReactCrop
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={undefined}
            style={{
              maxWidth: '100%',
              maxHeight: '100%'
            }}
          >
            <img
              ref={imgRef}
              alt="Crop me"
              src={src}
              style={{
                transform: `scale(${scale}) rotate(${rotate}deg)`,
                maxWidth: '100%',
                maxHeight: '50vh'
              }}
              onLoad={onImageLoad}
            />
          </ReactCrop>
        </div>

        {/* Preview Canvas (hidden) */}
        <canvas
          ref={previewCanvasRef}
          style={{
            display: 'none'
          }}
        />

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'flex-end'
        }}>
          <button
            onClick={onCancel}
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
              gap: '0.5rem'
            }}
          >
            <X size={16} />
            Cancel
          </button>
          
          <button
            onClick={handleSave}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'linear-gradient(135deg, #39ff14 0%, #00ffe7 100%)',
              border: 'none',
              borderRadius: '8px',
              color: '#000000',
              cursor: 'pointer',
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <Save size={16} />
            Apply Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;
