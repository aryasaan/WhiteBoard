// Room utility functions for managing users and drawing data
const Room = require('../models/Room');

// Add a user to a room (increase activeUsers)
async function addUserToRoom(roomId) {
  const room = await Room.findOneAndUpdate(
    { roomId },
    { $inc: { activeUsers: 1 }, $set: { lastActivity: new Date() } },
    { new: true }
  );
  return room;
}

// Remove a user from a room (decrease activeUsers)
async function removeUserFromRoom(roomId) {
  const room = await Room.findOneAndUpdate(
    { roomId, activeUsers: { $gt: 0 } },
    { $inc: { activeUsers: -1 }, $set: { lastActivity: new Date() } },
    { new: true }
  );
  return room;
}

// Save a drawing command to the room
async function saveDrawingCommand(roomId, command) {
  await Room.findOneAndUpdate(
    { roomId },
    { $push: { drawingData: command }, $set: { lastActivity: new Date() } }
  );
}

// Clear the drawing data for a room
async function clearDrawingData(roomId) {
  await Room.findOneAndUpdate(
    { roomId },
    { $set: { drawingData: [], lastActivity: new Date() } }
  );
}

// Get the current drawing data for a room
async function getDrawingData(roomId) {
  const room = await Room.findOne({ roomId });
  return room ? room.drawingData : [];
}

module.exports = {
  addUserToRoom,
  removeUserFromRoom,
  saveDrawingCommand,
  clearDrawingData,
  getDrawingData
}; 