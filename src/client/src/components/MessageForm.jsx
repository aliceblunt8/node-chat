import React, { useState, useEffect, useCallback } from 'react';
import { useSocket } from '../hooks/useSocket';

export const MessageForm = ({ setMessages }) => {
  const socket = useSocket();
  const [text, setText] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    socket.send(JSON.stringify({ text }));

    setText('');
  };

  const onMessage = useCallback((event) => {
    const message = JSON.parse(event?.data);

    setMessages(current => [...current, message]);
  }, []);

  useEffect(() => {
    socket.addEventListener('message', onMessage);

    return () => {
      socket.removeEventListener('message', onMessage);
    };
  }, [socket, onMessage]);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={event => setText(event.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
};
