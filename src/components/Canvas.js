import React from 'react';
import { useLocation } from 'react-router-dom';
import * as fabric from 'fabric';

const Canvas = () => {
  const { state } = useLocation();
  const { imageUrl, text } = state || {};

  React.useEffect(() => {
    const canvas = new fabric.Canvas('canvas');
    if (imageUrl) {
      fabric.Image.fromURL(imageUrl, (img) => {
        img.set({
          left: 0,
          top: 0,
          selectable: false,
          evented: false,
        });
        canvas.setWidth(img.width);
        canvas.setHeight(img.height);
        canvas.add(img);

        if (text) {
          const textObj = new fabric.Textbox(text, {
            left: img.width / 2,
            top: img.height / 2,
            width: img.width * 0.9,
            fontSize: 40,
            fill: '#ffffff',
            originX: 'center',
            originY: 'center',
            textAlign: 'center',
            editable: true,
            hasControls: true,
            hasBorders: true,
          });

          canvas.add(textObj);
          canvas.setActiveObject(textObj);
        }
      });
    }
  }, [imageUrl, text]);

  return (
    <div className="min-h-screen bg-gray-100">
      <canvas id="canvas" className="border-2 border-white"></canvas>
    </div>
  );
};

export default Canvas;
