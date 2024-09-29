import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const URL = 'http://localhost:1337';

const useSocket = (userId: string | null) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketInstance = io(URL);

    socketInstance.emit('join', userId);

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [userId]);

  return socket;
};

export default useSocket;
