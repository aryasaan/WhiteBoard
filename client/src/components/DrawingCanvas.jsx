import React, { useRef, useEffect, useState, useCallback } from 'react';
import { socket } from '../utils/socket';

export default function DrawingCanvas({ roomId, initialDrawingData, strokeWidth, strokeColor, onCursorMove }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState(null);

  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth || 800;
    canvas.height = canvas.offsetHeight || 550;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    setContext(ctx);
    if (initialDrawingData && initialDrawingData.length) redrawCanvas(ctx, initialDrawingData);
  }, [initialDrawingData]);

  // Socket handlers
  useEffect(() => {
    if (!context) return;
    socket.on('draw-start', d => startDrawing(context, d.x, d.y, d.color, d.width, false));
    socket.on('draw-move',  d => draw(context, d.x, d.y, d.color, d.width, false));
    socket.on('draw-end',   () => stopDrawing(context, false));
    socket.on('canvas-cleared', () => clearCanvas(context, false));
    socket.on('drawing-data', data => redrawCanvas(context, data));
    return () => {
      socket.off('draw-start'); socket.off('draw-move');
      socket.off('draw-end'); socket.off('canvas-cleared');
      socket.off('drawing-data');
    };
  }, [context]);

  // Drawing ops
  function redrawCanvas(ctx, drawingData) {
    ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height);
    let current = null;
    drawingData.forEach(command=>{
      const { type, data } = command;
      if (type === 'clear') ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height);
      else if (type === 'stroke') {
        let { action, x, y, color, width } = data;
        if (action==='start') ctx.beginPath(), ctx.moveTo(x,y), ctx.strokeStyle=color, ctx.lineWidth=width;
        else if (action==='move') ctx.lineTo(x,y), ctx.stroke();
        else if (action==='end') {}
      }
    });
  }
  const startDrawing = useCallback((ctx, x, y, color, width, emit=true) => {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = color; ctx.lineWidth = width;
    if (emit) { setIsDrawing(true); socket.emit('draw-start',{x,y,color,width}); }
  }, []);
  const draw = useCallback((ctx, x, y, color, width, emit=true) => {
    ctx.lineTo(x, y);
    ctx.stroke();
    if (emit) socket.emit('draw-move',{x,y,color,width});
  }, []);
  const stopDrawing = useCallback((ctx, emit=true) => {
    if (emit) setIsDrawing(false), socket.emit('draw-end', {});
  }, []);
  const clearCanvas = useCallback((ctx, emit=true) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    if (emit) socket.emit('clear-canvas');
  }, []);

  // Mouse handlers
  function pos(e) {
    const rect = canvasRef.current.getBoundingClientRect();
    let x = (e.touches ? e.touches[0] : e).clientX - rect.left;
    let y = (e.touches ? e.touches[0] : e).clientY - rect.top;
    return {x, y};
  }
  function handleDown(e) {
    const {x, y} = pos(e);
    startDrawing(context, x, y, strokeColor, strokeWidth, true);
  }
  function handleMove(e) {
    const {x, y} = pos(e);
    onCursorMove(x, y);
    if (isDrawing) draw(context, x, y, strokeColor, strokeWidth, true);
  }
  function handleUp() { if (isDrawing) stopDrawing(context, true); }
  function handleClear() { clearCanvas(context, true); }

  
  return (
    <div className="w-full h-full relative select-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full bg-white rounded-b-lg touch-none"
        style={{minHeight:400, minWidth:600}}
        onMouseDown={handleDown} onMouseMove={handleMove} onMouseUp={handleUp} onMouseLeave={handleUp}
        onTouchStart={handleDown} onTouchMove={handleMove} onTouchEnd={handleUp}
      />
      <button onClick={handleClear}
        className="absolute top-4 right-4 z-10 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow">
        Clear Canvas
      </button>
    </div>
  );
}
