/*import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "../sockets-client/socketCors";

const ChatRoom = () => {
  const { id: channelId } = useParams<{ id: string }>();
  const { messages, sendMessage, deleteMessage } = useSocket(channelId!); // Usar el cliente de Socket.IO
  const [message, setMessage] = useState("");
  const username = localStorage.getItem("username") || "Anon";

  // Función para manejar el envío de mensajes
  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(message, username);
      setMessage(""); // Limpiar el campo de entrada
    }
  };

  // Función para manejar la eliminación de mensajes
  const handleDeleteMessage = (messageId: string,author:string) => {
    
    deleteMessage(channelId as string,messageId,author); // Eliminar mensaje
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Sala de Chat - Canal {channelId}</h2>

      <div className="chat-window border rounded p-3 mb-3" style={{ height: "400px", overflowY: "scroll" }}>
        {messages.map((msg, index) => (
          console.log("soy el historial de chat", messages),
          <div key={index} className="mb-2">
            <strong>{msg.author}</strong>: {msg.content}
            <span className="text-muted d-block" style={{ fontSize: "0.8rem" }}>
              {new Date(msg.date).toLocaleTimeString()}
            </span>
            {msg.author === username && (
              <button className="btn btn-danger btn-sm" onClick={() => handleDeleteMessage(msg.id,msg.author)}>
                Eliminar
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Escribe tu mensaje..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button className="btn btn-primary" onClick={handleSendMessage}>
          Enviar
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
*/
/*
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "../sockets-client/socketCors";

const ChatRoom = () => {
  const { id: channelId ,owner:ownerId} = useParams<{ id: string }>();
  const { messages, sendMessage, deleteMessage, closeChannelChat } = useSocket(channelId!);
  const [message, setMessage] = useState("");
  const username = localStorage.getItem("username") || "Anon";
  


  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(message, username);
      setMessage(""); // Limpiar el campo de entrada
    }
  };

  const handleDeleteMessage = (messageId: string, author: string) => {
    deleteMessage(channelId as string, messageId, author); // Llamar a la función para eliminar
  };

  const handleCloseChat = () => {
    if (ownerId) {
      closeChannelChat(channelId as string, ownerId);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Sala de Chat - Canal {channelId}</h2>

      <div className="chat-window border rounded p-3 mb-3" style={{ height: "400px", overflowY: "scroll" }}>
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <strong>{msg.author}</strong>: {msg.content}
            <span className="text-muted d-block" style={{ fontSize: "0.8rem" }}>
              {new Date(msg.date).toLocaleTimeString()}
            </span>
            {msg.author === username && (
              <button className="btn btn-danger btn-sm" onClick={() => handleDeleteMessage(msg.id, msg.author)}>
                Eliminar
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Escribe tu mensaje..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button className="btn btn-primary" onClick={handleSendMessage}>
          Enviar
        </button>
      </div>

      {ownerId && (
        <button className="btn btn-warning mt-3" onClick={handleCloseChat}>
          Cerrar Chat
        </button>
      )}
    </div>
  );
};

export default ChatRoom;

*/

import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "../sockets-client/socketCors";

const ChatRoom = () => {
  const { id: channelId } = useParams<{ id: string }>();
  const { messages, sendMessage, deleteMessage, disconnectFromChannel } = useSocket(channelId!);
  const [message, setMessage] = useState("");
  const username = localStorage.getItem("username") || "Anon";

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(message, username);
      setMessage("");
    }
  };

  const handleDeleteMessage = (messageId: string, author: string) => {
    deleteMessage(messageId, author);
  };

  const handleDisconnect = () => {
    disconnectFromChannel();
  };
return(
<div className="container mt-4">
  <h2 className="mb-4 text-center">Sala de Chat - Canal {channelId}</h2>

  <div className="chat-box p-3 mb-3" style={{ height: '400px', overflowY: 'scroll', backgroundColor: '#f5f5f5', borderRadius: '10px' }}>
    {messages.length > 0 ? (
      messages.map((msg) => (
        <div key={msg.id} className="message-box mb-2 p-2" style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
          <strong className="text-primary">{msg.author}</strong>: {msg.content}
          {msg.author === username && (
            <button
              className="btn btn-danger btn-sm float-end"
              onClick={() => handleDeleteMessage(msg.id, msg.author)}
              style={{ marginLeft: '10px' }}
            >
              <i className="bi bi-trash"></i>
            </button>
          )}
        </div>
      ))
    ) : (
      <div className="text-center text-muted">No hay mensajes aún.</div>
    )}
  </div>

  <div className="message-input d-flex">
    <input
      type="text"
      className="form-control"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      placeholder="Escribe un mensaje..."
      style={{ flex: 1, borderRadius: '20px', padding: '10px' }}
    />
    <button
      className="btn btn-primary ms-2"
      onClick={handleSendMessage}
      style={{ borderRadius: '20px' }}
    >
      Enviar
    </button>
    <button
      className="btn btn-secondary ms-2"
      onClick={handleDisconnect}
      style={{ borderRadius: '20px' }}
    >
      Desconectar
    </button>
  </div>
</div>
)
/*
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Sala de Chat - Canal {channelId}</h2>
      <div className="chat-box">
        {messages.map((msg) => (
          <div key={msg.id} className="message-box">
            <strong>{msg.author}</strong>: {msg.content}
            {msg.author === username && (
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDeleteMessage(msg.id, msg.author)}
              >
                Eliminar
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          className="form-control"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="btn btn-primary mt-2" onClick={handleSendMessage}>
          Enviar
        </button>
        <button className="btn btn-secondary mt-2" onClick={handleDisconnect}>
          Desconectar
        </button>
      </div>
    </div>
  );*/
};

export default ChatRoom;
