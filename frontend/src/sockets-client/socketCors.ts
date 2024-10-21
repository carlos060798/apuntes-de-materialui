/*
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const socketURL = "http://localhost:3000"; // Cambia esto a tu URL de Socket.IO

export const useSocket = (channelId: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const newSocket = io(socketURL, {
      query: { channelId }, // Pasar el ID del canal como parte de la conexión
    });
    setSocket(newSocket);

    // Manejar la recepción de mensajes
    newSocket.on("newChannelMessage", (message: any) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Manejar la recepción de mensajes eliminados
    newSocket.on("messageDeleted", (messageId: string) => {
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg._id !== messageId)
      );
    });

    // Cargar el historial de mensajes al unirse al canal
    newSocket.emit("joinChannel",  channelId ); // Petición para obtener historial
    newSocket.on("chatHistory", (data) => {
      setMessages(data.messages);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [channelId]);

  // Enviar un mensaje
  const sendMessage = (content: string, author: string) => {
    if (socket) {
      const message = {
        content,
        author,
        channelId, // Asegúrate de incluir el ID del canal
        date: new Date().toISOString(),
      };
      socket.emit("sendChannelMessage", message); // Asegúrate de que coincida con el nombre del evento del backend
    }
  };

  // Eliminar un mensaje
  const deleteMessage = (channelid:string,messageId: string, author: string,) => {
    console.log("delete message", channelid, messageId, author);
    if (socket) {
      socket.emit("deleteChannelMessage", { channelid,messageId,author }); // Coincide con el backend
    }
  };

  return { socket, messages, sendMessage, deleteMessage };
};



import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const socketURL = "http://localhost:3000";

export const useSocket = (channelId: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const newSocket = io(socketURL, {
      query: { channelId },
    });
    setSocket(newSocket);

    // Manejar la recepción de nuevos mensajes
    newSocket.on("newChannelMessage", (message: any) => {

      setMessages((prevMessages) => [...prevMessages, message]); // Actualizar el estado inmediatamente
    });

    // Manejar la recepción de mensajes eliminados
    newSocket.on("messageDeleted", ({ messageId }: { messageId: string }) => {
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.id !== messageId) // Filtrar el mensaje eliminado
      );
    });

    // Cargar el historial de mensajes al unirse al canal
    newSocket.emit("joinChannel", channelId); 
    newSocket.on("chatHistory", (data) => {
      setMessages(data.messages); // Cargar historial de mensajes
    });

    // Manejar el cierre del chat
    newSocket.on("channelChatClosed", ({ message }) => {
      alert(message); // Mostrar que el chat ha sido cerrado
      setMessages([]); // Limpiar los mensajes si el chat se cierra
    });

    return () => {
      newSocket.disconnect();
    };
  }, [channelId]);

  const sendMessage = (content: string, author: string) => {
    if (socket) {
      const message = {
        content,
        author,
        channelId,
        date: new Date().toISOString(),
      };
      socket.emit("sendChannelMessage", message);
    }
  };

  const deleteMessage = (channelId: string, messageId: string, author: string) => {
    if (socket) {
      socket.emit("deleteChannelMessage", { channelId, messageId, author });
    }
  };

  const closeChannelChat = (channelId: string, ownerId: string) => {
    if (socket) {
      socket.emit("closeChannelChat", { channelId, ownerId });
    }
  };

  return { socket, messages, sendMessage, deleteMessage, closeChannelChat };
};

*/

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const socketURL = "http://localhost:3000";

export const useSocket = (channelId: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const newSocket = io(socketURL, {
      query: { channelId },
    });
    setSocket(newSocket);

    // Cargar historial de mensajes
    newSocket.emit("joinChannel", channelId);
    newSocket.on("chatHistory", (data) => {
      setMessages(data.messages);
    });

    // Recibir nuevos mensajes
    newSocket.on("newChannelMessage", (message: any) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Recibir mensajes eliminados
    newSocket.on("messageDeleted", ({ messageId }: { messageId: string }) => {
      setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== messageId));
    });

    return () => {
      newSocket.disconnect();
    };
  }, [channelId]);

  // Enviar mensaje
  const sendMessage = (content: string, author: string) => {
    if (socket) {
      const message = { content, author, channelId };
      socket.emit("sendChannelMessage", message);
    }
  };

  // Eliminar mensaje
  const deleteMessage = (messageId: string, author: string) => {
    if (socket) {
      socket.emit("deleteChannelMessage", { channelId, messageId, author });
    }
  };

  // Desconectar del canal
  const disconnectFromChannel = () => {
    if (socket) {
      socket.emit("disconnectFromChat", { channelId });
      socket.disconnect();
    }
  };

  return { messages, sendMessage, deleteMessage, disconnectFromChannel };
};
