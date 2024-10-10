/*
import  { useState } from 'react';
interface MessageInputProps {
  sendMessage: (text: string) => void;
}

function MessageInput(sendMessage : MessageInputProps) {
  const [inputValue, setInputValue] = useState('');
  
  const handleSend = () => {
    if (inputValue.trim()) {
      //sendMessage(inputValue); // Enviar el mensaje al propio componente
      setInputValue(''); // Limpiar el input después de enviar el mensaje
    }
  };
  return (
    <div className="input-group">
      <input
        type="text"
        className="form-control"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Escribe tu mensaje"
      />
      <button onClick={handleSend} className="btn btn-primary">
        Enviar
      </button>
    </div>
  );
};

export default MessageInput;
*/

// Este código es una versión simplificada del componente MessageInput.
import React, { useState } from 'react';

// Este componente recibe una función onSendMessage como prop.

const MessageInput = ( sendMessage) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage(''); // Limpiar el input después de enviar
    }
  };

  return (
    <div className="input-group mt-3">
      <input
        type="text"
        className="form-control"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
      />
      <button className="btn btn-primary" onClick={handleSend}>
        Send
      </button>
    </div>
  );
};

export default MessageInput;

