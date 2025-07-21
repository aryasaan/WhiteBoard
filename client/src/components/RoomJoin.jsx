import React, { useState } from 'react';

export default function RoomJoin({ onRoomJoin }) {
  const [roomId, setRoomId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const joinRoom = async (e) => {
    e.preventDefault();
    setError('');
    if (!roomId || roomId.length < 4 || roomId.length > 8) {
      setError('Room code must be 4-8 characters.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('https://whiteboard-2-tjht.onrender.com/api/rooms/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomId: roomId.trim().toUpperCase() }),
      });
      const data = await res.json();
      if (!data.success) setError(data.error || 'Error joining room');
      else onRoomJoin(data);
    } catch {
      setError('Network error');
    } finally { setLoading(false); }
  };

  const randomCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i=0;i<6;i++) code += chars[Math.floor(Math.random()*chars.length)];
    setRoomId(code);
  };

  return (
    <form onSubmit={joinRoom}
      className="bg-white p-7 rounded-xl shadow-lg w-full max-w-md space-y-5 flex flex-col items-center">
      <h2 className="text-xl font-bold text-gray-800 mb-1">Join a Whiteboard</h2>
      <input className="w-64 px-4 py-2 border-2 border-gray-300 rounded-lg uppercase tracking-widest text-lg focus:border-indigo-400 text-center"
        type="text" placeholder="Room code (e.g., ABC123)" maxLength={8} autoFocus
        value={roomId} onChange={e=>setRoomId(e.target.value.toUpperCase())}
        disabled={loading}
      />
      <button type="button"
        className="px-4 py-2 bg-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-300"
        disabled={loading} onClick={randomCode}>Generate</button>
      {error && <div className="text-red-600">{error}</div>}
      <button type="submit"
        className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg mt-3
          hover:scale-105 transition-all disabled:opacity-60"
        disabled={loading || roomId.length<4}>{loading ? "Joining..." : "Join Room"}</button>
      <div className="bg-gray-50 rounded mt-6 px-4 py-3 text-[0.98em] text-gray-600 w-full">
        <b>How to use:</b>
        <ul className="list-disc ml-6 mt-1">
          <li>Enter an existing code to join others</li>
          <li>Or generate/enter a new code to create a board</li>
          <li>Share code to collaborate in real time</li>
        </ul>
      </div>
    </form>
  );
}
