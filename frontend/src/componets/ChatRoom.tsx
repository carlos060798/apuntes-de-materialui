import { useState } from "react";
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
