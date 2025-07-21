const mongoose = require('mongoose');

const drawingCommandSchema = new mongoose.Schema({
  type: { type: String, required: true, enum: ['stroke', 'clear'] },
  data: mongoose.Schema.Types.Mixed,
  timestamp: { type: Date, default: Date.now }
});

const roomSchema = new mongoose.Schema({
  roomId: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  lastActivity: { type: Date, default: Date.now },
  drawingData: [drawingCommandSchema],
  activeUsers: { type: Number, default: 0 }
});
roomSchema.index({ lastActivity: 1 }, { expireAfterSeconds: 86400 }); // 24hr TTL

module.exports = mongoose.model('Room', roomSchema);
