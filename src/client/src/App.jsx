import React, { useState, useEffect } from 'react';
import './App.css';
import { MessageForm } from './components/MessageForm';
import { MessagesList } from './components/MessagesList';
import * as messageApi from './api/api';

function App() {
  const [messages, setMessages] = useState([]);

  const loadAllMessages = async () => {
    const messagesFromServer = await messageApi.getMessages();

    setMessages(messagesFromServer);
  };

  useEffect(() => {
    loadAllMessages();
  },
  []);

  return (
    <div className="App">
      <h1>Chat application</h1>
      <MessageForm setMessages={setMessages} />
      <MessagesList messages={messages} />
    </div>
  );
}

export default App;
