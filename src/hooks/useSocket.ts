import { useEffect, useState } from 'react';
import { socket } from '@/lib/socket';
import { NewMessageResponse } from '@/api/sendMessage';

const useSocket = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [liveMessages, setLiveMessages] = useState<null | NewMessageResponse[]>(null);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onNewMessage(message: NewMessageResponse) {
      if (liveMessages) {
        setLiveMessages([...liveMessages, message]);
      } else {
        setLiveMessages([message]);
      }
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('newMessage', onNewMessage);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('newMessage', onNewMessage);
    };
  }, [liveMessages]);

  return {
    isConnected,
    liveMessages,
  };
};

export default useSocket;
