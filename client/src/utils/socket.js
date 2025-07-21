import { io } from 'socket.io-client';


const URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export let socket = null;

export const connectSocket = () => {
  if (!socket) {
    
    socket = io(URL, { transports: ['websocket'], upgrade: true });
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
