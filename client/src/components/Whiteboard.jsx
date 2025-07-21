import React, { useState, useEffect } from 'react';
import DrawingCanvas from './DrawingCanvas';
import Toolbar from './Toolbar';
import UserCursors from './UserCursors';
import { socket, connectSocket, disconnectSocket } from '../utils/socket';

export default function Whiteboard({ roomId, initialDrawingData, onLeaveRoom }) {
  const [activeUsers, setActiveUsers] = useState(1);
  const [cursors, setCursors] = useState({});
  const [conn, setConn] = useState('connecting');
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [strokeColor, setStrokeColor] = useState('#000000');

  useEffect(() => {
    connectSocket();
    socket.emit('join-room', { roomId });
    socket.on('connect',()=>setConn('connected'));
    socket.on('disconnect',()=>setConn('disconnected'));
    socket.on('user-joined', d=>setActiveUsers(d.activeUsers));
    socket.on('user-left', d=>{ setActiveUsers(d.activeUsers); setCursors(curs=>{let c={...curs}; delete c[d.userId]; return c}) });
    socket.on('cursor-update', d=>setCursors(prev=>({...prev, [d.userId]: {x:d.x, y:d.y, color:d.color}})));
    return () => disconnectSocket();
  }, [roomId]);
  
  const handleCursorMove = (x, y) => socket.emit('cursor-move', { x, y, color: strokeColor });

  return (
    <div className="w-full h-[88vh] flex flex-col bg-white rounded-xl shadow-lg border border-gray-200 max-w-5xl">
      <div className="flex items-center justify-between px-5 py-3 border-b">
        <div>
          <div className="text-indigo-800 font-bold">Room: {roomId}</div>
          <div className="text-xs text-gray-500 flex items-center gap-3 mt-1">
            <span className={{
              connected:'text-green-500',
              connecting:'text-yellow-500',
              disconnected:'text-red-600'
            }[conn || 'disconnected'] + ' font-bold'}>● {conn}</span>
            <span>👥 {activeUsers} user{activeUsers!==1?'s':''}</span>
          </div>
        </div>
        <button onClick={onLeaveRoom}
          className="px-5 py-2 bg-red-500 hover:bg-red-700 text-white rounded-lg font-bold">Leave Room</button>
      </div>
      <Toolbar strokeWidth={strokeWidth} strokeColor={strokeColor}
        onStrokeWidthChange={setStrokeWidth} onStrokeColorChange={setStrokeColor} />
      <div className="flex-1 relative bg-gray-50 rounded-b-xl p-0">
        <DrawingCanvas roomId={roomId} initialDrawingData={initialDrawingData}
          strokeWidth={strokeWidth} strokeColor={strokeColor}
          onCursorMove={handleCursorMove}
        />
        <UserCursors cursors={cursors} />
      </div>
    </div>
  );
}
