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
