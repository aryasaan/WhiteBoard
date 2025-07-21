const express = require('express');
const Room = require('../models/Room');
const router = express.Router();

router.post('/join', async (req, res) => {
  const { roomId } = req.body;
  if (!roomId || roomId.length < 4 || roomId.length > 8)
    return res.status(400).json({ error: 'Room ID must be 4-8 chars' });

  let room = await Room.findOne({ roomId });
  if (!room) room = await Room.create({ roomId, drawingData: [] });
  else room.lastActivity = new Date(), await room.save();

  res.json({ success: true, roomId, drawingData: room.drawingData });
});

router.get('/:roomId', async (req, res) => {
  const room = await Room.findOne({ roomId: req.params.roomId });
  if (!room) return res.status(404).json({ error: 'Not found' });
  res.json({
    roomId: room.roomId,
    activeUsers: room.activeUsers,
    drawingData: room.drawingData,
    createdAt: room.createdAt
  });
});

module.exports = router;
