import { io } from 'socket.io-client';
export let socket = null;
export const connectSocket = () => {
  
if (!socket) socket = io('https://whiteboard-t6uc.onrender.com', { transports: ['websocket'], upgrade: true });
  return socket;
}
export const disconnectSocket = () => {
  if (socket) socket.disconnect(), socket = null;
}
