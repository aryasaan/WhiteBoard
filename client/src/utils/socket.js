import { io } from 'socket.io-client';
export let socket = null;
export const connectSocket = () => {
  // Use backend URL directly for socket connection
  if (!socket) socket = io('http://localhost:5000', { transports: ['websocket'], upgrade: true });
  return socket;
}
export const disconnectSocket = () => {
  if (socket) socket.disconnect(), socket = null;
}
