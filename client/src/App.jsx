import React, { useState, useEffect } from 'react';
import RoomJoin from './components/RoomJoin';
import Whiteboard from './components/Whiteboard';

function App() {
  const [room, setRoom] = useState(null);
  const [drawingData, setDrawingData] = useState([]);

  useEffect(() => {
    if (!room) {
      window.scrollTo(0, 0);
    }
    console.log('Current room:', room);
  }, [room]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-gradient-to-r from-indigo-500 to-purple-600 py-4 shadow text-center text-white text-2xl font-semibold">
        🎨  Whiteboard
      </header>
      <main className="flex-1 flex items-center justify-center">
        {!room
          ? <RoomJoin onRoomJoin={({roomId, drawingData}) => { setRoom(roomId); setDrawingData(drawingData||[]); }} />
          : <Whiteboard
              roomId={room}
              initialDrawingData={drawingData}
              onLeaveRoom={() => {
                setRoom(null);
                setDrawingData([]);
                
              }}
            />}
      </main>
    </div>
  );
}

export default App;
