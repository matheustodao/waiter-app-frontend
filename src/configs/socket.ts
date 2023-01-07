import socketIo from 'socket.io-client';
import { API_URL } from './env';

export const socket = socketIo(API_URL, {
  transports: ['websocket'],
});
