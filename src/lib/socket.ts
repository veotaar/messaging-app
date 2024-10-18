import { io, Socket } from 'socket.io-client';
import { NewMessageResponse } from '@/api/sendMessage';

const URL = 'http://localhost:1337';

interface ServerToClientEvents {
  newMessage: (message: NewMessageResponse) => void;
  testing: (text: string) => void;
}

interface ClientToServerEvents {
  sendMessage: (message: NewMessageResponse) => void;
  joinChat: (chatId: string) => void;
  join: (userId: string | null) => void;
}

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(URL, {
  autoConnect: false,
});
