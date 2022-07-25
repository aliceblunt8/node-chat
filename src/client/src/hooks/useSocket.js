import { useState, useEffect } from 'react';

const SOCKET_URL = 'ws://localhost:8080';

export const useSocket = () => {
  const [ws, setWs] = useState(new WebSocket(SOCKET_URL));

  useEffect(() => {
    const onClose = () => {
      setTimeout(() => {
        setWs(new WebSocket(SOCKET_URL));
      }, 3000);
    };

    ws.addEventListener('close', onClose);

    return () => {
      ws.removeEventListener('close', onClose);
    };
  }, [ws, setWs]);

  useEffect(() => () => {
    ws.close();
  }, []);

  return ws;
};
