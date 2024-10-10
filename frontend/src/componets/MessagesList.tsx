
/*
import React from 'react';

interface Message {
  username: string;
  text: string;
}

interface MessagesListProps {
  messages: Message[];
}

const MessagesList: React.FC<MessagesListProps> = ({ messages }) => {
  const randomColor = () => {
    const colors = ['text-primary', 'text-danger', 'text-warning', 'text-success', 'text-info'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="messages-list">
    <p>
      prueba
    </p>
    </div>
  );
};

export default MessagesList;
*/

import React from 'react';

const MessagesList = ({ messages = [] }) => {
  return (
    <div className="list-group overflow-auto" style={{ height: '70vh' }}>
      {messages.length > 0 ? (
        messages.map((message, index) => (
          <div key={index} className="list-group-item">
            <strong>{message.user}:</strong> {message.text}
          </div>
        ))
      ) : (
        <div className="list-group-item">No messages available</div>
      )}
    </div>
  );
};

export default MessagesList;

