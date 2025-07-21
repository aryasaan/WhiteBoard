import React from 'react';

export default function Toolbar({ strokeWidth, strokeColor, onStrokeWidthChange, onStrokeColorChange }) {
  const colors = ['#000000', '#EF4444', '#10B981', '#3B82F6', '#F59E0B', '#8B5CF6', '#EC4899', '#6B7280'];
  return (
    <div className="flex flex-wrap items-center gap-6 px-6 py-3 border-b bg-white">
      {/* Brush Size */}
      <div className="flex items-center gap-3">
        <label className="text-sm font-medium text-gray-700">Size:</label>
        <input
          type="range"
          min="1"
          max="20"
          value={strokeWidth}
          onChange={e=>onStrokeWidthChange(parseInt(e.target.value))}
          className="w-20 h-2 accent-indigo-500"
        />
        <span className="text-sm text-gray-600 font-mono">{strokeWidth}px</span>
      </div>
      {/* Palette */}
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">Colors:</label>
        <div className="flex gap-1.5">
          {colors.map(color=>(
            <button
              key={color}
              className={`w-7 h-7 rounded-lg border-2 transition-all hover:scale-110
                ${strokeColor===color ? 'border-indigo-700 ring-2 ring-indigo-200 scale-110' : 'border-gray-300'}
              `}
              style={{backgroundColor: color}}
              onClick={()=>onStrokeColorChange(color)}
            />
          ))}
        </div>
      </div>
      {/* Color Picker */}
      <input type="color" value={strokeColor}
        onChange={e=>onStrokeColorChange(e.target.value)}
        className="border border-gray-300 w-10 h-7 rounded shadow-sm"
      />
    </div>
  );
}
