import React, { useRef, useState, useEffect } from 'react';
import { Brush, Pencil, Eraser, Square, Circle, Minus, Trash2 } from 'lucide-react';

const tools = [
  { id: 'brush', icon: Brush, label: 'Brush' },
  { id: 'pencil', icon: Pencil, label: 'Pencil' },
  { id: 'eraser', icon: Eraser, label: 'Eraser' },
  { id: 'rectangle', icon: Square, label: 'Rectangle' },
  { id: 'circle', icon: Circle, label: 'Circle' },
  { id: 'line', icon: Minus, label: 'Line' },
];

const brushSizes = [1, 3, 5, 8, 12, 16, 20];

const basicColors = [
  '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF',
  '#800000', '#808080', '#800080', '#008000', '#000080', '#808000', '#C0C0C0', '#FF8000',
  '#FFC0CB', '#FFE4E1', '#FFFACD', '#E0FFFF', '#F0E68C', '#DDA0DD', '#87CEEB', '#98FB98',
];

const DrawingApp = () => {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [tool, setTool] = useState('brush');
  const [size, setSize] = useState(5);
  const [color, setColor] = useState('#000000');
  const [startPos, setStartPos] = useState(null);

  const getCtx = () => canvasRef.current.getContext('2d');

  const clearCanvas = () => {
    const ctx = getCtx();
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  };

  const handleMouseDown = (e) => {
    setDrawing(true);
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setStartPos({ x, y });
    if (tool === 'brush' || tool === 'pencil' || tool === 'eraser') {
      draw(x, y, x, y);
    }
  };

  const handleMouseMove = (e) => {
    if (!drawing) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (tool === 'brush' || tool === 'pencil' || tool === 'eraser') {
      draw(startPos.x, startPos.y, x, y);
      setStartPos({ x, y });
    }
  };

  const handleMouseUp = (e) => {
    if (!drawing) return;
    setDrawing(false);
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (tool === 'rectangle' || tool === 'circle' || tool === 'line') {
      draw(startPos.x, startPos.y, x, y);
    }
  };

  const draw = (x1, y1, x2, y2) => {
    const ctx = getCtx();
    ctx.lineWidth = size;
    ctx.strokeStyle = tool === 'eraser' ? '#FFFFFF' : color;
    ctx.fillStyle = color;

    if (tool === 'brush' || tool === 'pencil' || tool === 'eraser' || tool === 'line') {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    } else if (tool === 'rectangle') {
      ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
    } else if (tool === 'circle') {
      const radius = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
      ctx.beginPath();
      ctx.arc(x1, y1, radius, 0, Math.PI * 2);
      ctx.stroke();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="bg-white border-b border-gray-300 shadow-sm px-4 py-3">
        <div className="flex items-center gap-6 mb-3">
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium text-gray-700 mr-3">Tools</span>
            {tools.map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setTool(id)}
                className={`p-2 rounded-lg border-2 transition-all hover:bg-gray-50 ${
                  tool === id ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-300 text-gray-600'
                }`}
                title={label}
              >
                <Icon size={20} />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700">Size</span>
            <div className="flex items-center gap-1">
              {brushSizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all hover:bg-gray-50 ${
                    size === s ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                  }`}
                >
                  <div
                    className="rounded-full bg-gray-600"
                    style={{ width: Math.min(s, 16), height: Math.min(s, 16) }}
                  />
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 ml-4">
              <input
                type="range"
                min="1"
                max="50"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-sm text-gray-600 w-8">{size}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={clearCanvas}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <Trash2 size={16} /> Clear
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-700">Colors</span>
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 border-2 border-gray-400 rounded"
              style={{ backgroundColor: color }}
            />
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
            />
          </div>
          <div className="flex gap-1">
            {basicColors.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`w-6 h-6 rounded border-2 hover:scale-110 transition-transform ${
                  color === c ? 'border-gray-800' : 'border-gray-400'
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 bg-gray-50 p-4 overflow-auto">
        <div className="bg-white border-2 border-gray-300 rounded-lg shadow-sm inline-block">
          <canvas
            ref={canvasRef}
            width={800}
            height={600}
            className="block cursor-crosshair"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          />
        </div>
      </div>

      <div className="bg-gray-200 border-t border-gray-300 px-4 py-2 text-sm text-gray-600">
        <div className="flex items-center justify-between">
          <span>Canvas: 800 × 600 pixels</span>
          <span>Tool: {tool} | Size: {size}px | Color: {color}</span>
        </div>
      </div>
    </div>
  );
};

export default DrawingApp;
