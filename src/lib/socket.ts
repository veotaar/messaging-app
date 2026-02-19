import { io, type Socket } from "socket.io-client";
import type { NewMessageResponse } from "@/api/sendMessage";

const DEFAULT_SOCKET_URL = "http://localhost:1337";

function getSocketUrl() {
  if (import.meta.env.VITE_SOCKET_URL) {
    return import.meta.env.VITE_SOCKET_URL;
  }

  if (import.meta.env.VITE_BASE_URL) {
    try {
      return new URL(import.meta.env.VITE_BASE_URL).origin;
    } catch {
      return DEFAULT_SOCKET_URL;
    }
  }

  return DEFAULT_SOCKET_URL;
}

interface ServerToClientEvents {
  newMessage: (message: NewMessageResponse) => void;
  testing: (text: string) => void;
}

interface ClientToServerEvents {
  sendMessage: (message: NewMessageResponse) => void;
  joinChat: (chatId: string) => void;
  join: (userId: string | null) => void;
}

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  getSocketUrl(),
  {
    autoConnect: false,
  },
);
