/* eslint-disable react/prop-types */
import React from 'react';

export const MessagesList = ({ messages }) => (
  <ul>
    {messages.map(message => (
      <li key={message.id}>{message.text}</li>
    ))}
  </ul>
);
