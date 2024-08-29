import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import * as fabric from 'fabric';
const Canvas = () => {
  const { state } = useLocation();
  const { imageUrl, text } = state || {};
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current);

    const loadImage = (url) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous'; // To avoid CORS issues
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = url;
      });
    };

    const initCanvas = async () => {
      if (imageUrl) {
        try {
          const imgElement = await loadImage(imageUrl);

          const fabricImg = new fabric.Image(imgElement, {
            left: 0,
            top: 0,
            selectable: false,
            evented: false,
          });

          // Set canvas size to match image
          canvas.setWidth(imgElement.width);
          canvas.setHeight(imgElement.height);

          canvas.add(fabricImg);

          if (text) {
            const textObj = new fabric.Textbox(text, {
              left: canvas.width / 2,
              top: canvas.height / 2,
              width: canvas.width * 0.9,
              fontSize: 40,
              fill: '#ffffff',
              originX: 'center',
              originY: 'center',
              textAlign: 'center',
              editable: true,
              hasControls: true,
              hasBorders: true,
              wordWrap: true,
              padding: 10,
              cornerSize: 20,
            });

            canvas.add(textObj);
            canvas.setActiveObject(textObj);

            // Adjust text size if needed
            const adjustTextSize = () => {
              while (textObj.width > canvas.width * 0.9 || textObj.height > canvas.height * 0.9) {
                textObj.set({ fontSize: textObj.fontSize - 1 });
                canvas.renderAll();
              }
            };

            adjustTextSize();
          }
        } catch (error) {
          console.error('Failed to load image:', error);
        }
      }
    };

    initCanvas();

    return () => {
      canvas.dispose();
    };
  }, [imageUrl, text]);

  const handleDownload = () => {
    if (canvasRef.current) {
      const dataURL = canvasRef.current.toDataURL({
        format: 'png',
        quality: 1,
      });
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'image-with-text.png';
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 relative">
      <canvas ref={canvasRef} className="border-2 border-white"></canvas>
      <div className="absolute bottom-4 right-4">
        <button
          className="bg-white border-none px-4 py-2 cursor-pointer z-10 rounded"
          onClick={handleDownload}
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default Canvas;
