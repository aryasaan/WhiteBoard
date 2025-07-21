
# WhiteBoard Client

This is the frontend for the collaborative WhiteBoard app, built with React and Vite.

## Features
- Join or create a whiteboard room with a code
- Real-time drawing and cursor sharing
- See active users in the room
- Modern, responsive UI

## Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- npm

### Install dependencies
```bash
npm install
```

### Start the development server
```bash
npm run dev
```
- The app will run at [http://localhost:5173](http://localhost:5173) by default.

### Build for production
```bash
npm run build
```
- Output will be in the `dist/` folder.

## Environment Variables
- Usually not required for the client, but you can add `.env` for custom Vite settings if needed.

## Project Structure
- `src/` — React components, utils, and styles
- `public/` — Static assets

## Usage
1. Start the backend server (see `/server/README.md`).
2. Start the client as above.
3. Open [http://localhost:5173](http://localhost:5173) in your browser.
4. Enter or generate a room code to join a whiteboard.
5. Share the code with others to collaborate in real time.

---

**For backend setup and API details, see the `/server/README.md`.**


# WhiteBoard Server

This is the backend for the collaborative WhiteBoard app, built with Node.js, Express, Socket.io, and MongoDB.

## Features
- Create or join whiteboard rooms
- Real-time drawing and cursor sync via websockets
- Room data and drawing history stored in MongoDB
- Tracks active users per room

## Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- npm
- MongoDB database (local or cloud)

### Install dependencies
```bash
npm install
```

### Environment Variables
Create a `.env` file in the `/server` directory:
```
PORT=5000
CORS_ORIGIN=http://localhost:5173
MONGODB_URI=your_mongodb_uri
```
- `PORT`: Port for the backend server (default: 5000)
- `CORS_ORIGIN`: Frontend URL (default: http://localhost:5173)
- `MONGODB_URI`: Your MongoDB connection string

### Start the server
```bash
npm run dev
```
- The server will run at [http://localhost:5000](http://localhost:5000) by default.

## API Endpoints
- `POST /api/rooms/join` — Join or create a room (body: `{ roomId }`)
- `GET /api/rooms/:roomId` — Get room info

## WebSocket Events
- `join-room` — Join a socket room
- `draw-start`, `draw-move`, `draw-end` — Drawing events
- `cursor-move` — Cursor sharing
- `clear-canvas` — Clear the whiteboard
- `user-joined`, `user-left` — User presence events
- `drawing-data` — Initial drawing data for new joiners
- `canvas-cleared` — Canvas clear event

## Project Structure
- `server.js` — Main server entry point
- `routes/` — REST API routes
- `socket/` — Socket.io event handlers
- `models/` — Mongoose models
- `utils/` — Utility functions

## Usage
1. Make sure MongoDB is running and `.env` is configured.
2. Start the backend as above.
3. Start the frontend (see `/client/README.md`).
4. Open the app in your browser and join a room to collaborate.

---

**For frontend setup, see the `/client/README.md`.** 
