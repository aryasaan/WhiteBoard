require('dotenv').config();
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const socketHandler = require('./socket/socketHandler');
const roomRoutes = require('./routes/rooms');

const app = express();
const server = http.createServer(app);

const io = require('socket.io')(server, {
  cors: { origin: process.env.CORS_ORIGIN, methods: ["GET", "POST"] }
});

app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());
app.use('/api/rooms', roomRoutes);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

socketHandler(io);

app.get('/health', (_, res) => res.json({ status: 'ok' }));



server.listen(process.env.PORT, () =>
  console.log('Server running on', process.env.PORT)
);
