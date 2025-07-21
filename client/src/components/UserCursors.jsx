import React from 'react';

export default function UserCursors({ cursors }) {
  return (
    <div className="absolute inset-0 pointer-events-none z-30">
      {Object.entries(cursors).map(([userId, cursor]) => (
        <div key={userId}
          className="absolute w-5 h-5 -translate-x-1/2 -translate-y-1/2 transition-all"
          style={{ left: cursor.x, top: cursor.y }}>
          <div
            className="w-3 h-3 rounded-full border-2 border-white shadow-lg"
            style={{ backgroundColor: cursor.color || '#111' }}
          />
        </div>
      ))}
    </div>
  );
}
