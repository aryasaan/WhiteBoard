require('dotenv').config();
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const socketHandler = require('./socket/socketHandler');
const roomRoutes = require('./routes/rooms');

const app = express();
const server = http.createServer(app);


const corsOptions = {
  origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  methods: ["GET", "POST"]
};


app.use(cors(corsOptions));


const io = require('socket.io')(server, {
  cors: corsOptions
});

app.use(express.json());
app.use('/api/rooms', roomRoutes);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

socketHandler(io);

app.get('/health', (_, res) => res.json({ status: 'ok' }));


const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log('Server running on port', PORT)
);
