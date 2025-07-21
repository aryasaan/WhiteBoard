
const {
  addUserToRoom,
  removeUserFromRoom,
  saveDrawingCommand,
  clearDrawingData,
  getDrawingData
} = require('../utils/roomUtils');

const userRoomMap = new Map(); 

module.exports = function(io) {
  io.on('connection', socket => {
    // Join room
    socket.on('join-room', async ({ roomId }) => {
      socket.join(roomId);
      userRoomMap.set(socket.id, roomId);
      const room = await addUserToRoom(roomId);
      // Send current drawing data to new user
      const drawingData = await getDrawingData(roomId);
      socket.emit('drawing-data', drawingData);
      // Notify others
      io.to(roomId).emit('user-joined', { activeUsers: room.activeUsers, userId: socket.id });
    });

    // Cursor move
    socket.on('cursor-move', (data) => {
      const roomId = userRoomMap.get(socket.id);
      if (roomId) {
        data.userId = socket.id;
        io.to(roomId).emit('cursor-update', data);
      }
    });

    // Drawing events
    socket.on('draw-start', async (data) => {
      const roomId = userRoomMap.get(socket.id);
      if (roomId) {
        io.to(roomId).emit('draw-start', data);
        await saveDrawingCommand(roomId, { type: 'stroke', data: { ...data, action: 'start' } });
      }
    });
    socket.on('draw-move', async (data) => {
      const roomId = userRoomMap.get(socket.id);
      if (roomId) {
        io.to(roomId).emit('draw-move', data);
        await saveDrawingCommand(roomId, { type: 'stroke', data: { ...data, action: 'move' } });
      }
    });
    socket.on('draw-end', async () => {
      const roomId = userRoomMap.get(socket.id);
      if (roomId) {
        io.to(roomId).emit('draw-end');
        await saveDrawingCommand(roomId, { type: 'stroke', data: { action: 'end' } });
      }
    });
    socket.on('clear-canvas', async () => {
      const roomId = userRoomMap.get(socket.id);
      if (roomId) {
        io.to(roomId).emit('canvas-cleared');
        await clearDrawingData(roomId);
        await saveDrawingCommand(roomId, { type: 'clear', data: {} });
      }
    });

    // Disconnect
    socket.on('disconnect', async () => {
      const roomId = userRoomMap.get(socket.id);
      if (roomId) {
        const room = await removeUserFromRoom(roomId);
        io.to(roomId).emit('user-left', { activeUsers: room ? room.activeUsers : 0, userId: socket.id });
        userRoomMap.delete(socket.id);
      }
    });
  });
}
