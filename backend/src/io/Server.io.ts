import { Server } from "socket.io";
import Channel from "../Data/models/chanel";
import Message from "../Data/models/mesagge";
import User from "../Data/models/user";
import DirectMessage from "../Data/models/PrivateMessage";
import http from "http";

let io: Server;

interface MessageData {
  channelId: string;
  content: string;
  author: string;
}

interface DirectMessageData {
  toUserId: string;
  message: string;
  author: string;
}

export const registerSocketServer = (server: http.Server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST","DELETE"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected", socket.id);
    
  
  
    
    // Unirse a un canal
    socket.on("joinChannel", (channelId) => {
      socket.join(channelId);
      emitChatHistory(socket, channelId);
    });

    // Enviar mensaje en el canal
    socket.on("sendChannelMessage", async (data: MessageData) => {
      console.log(data);
      await emitChatMessage(io, data);
    });

    // Unirse a chat directo
    socket.on("joinDirectChat", (roomId) => {
      socket.join(roomId);
    });

    // Enviar mensaje directo
    socket.on("sendDirectMessage", async (data: DirectMessageData) => {
      await emitDirectMessage(io, data);
    });

    // Eliminar mensaje en el canal
    socket.on("deleteChannelMessage", async ({channelid, messageId, author}) => {
      console.log("delete message", channelid, messageId, author);
      await handleDeleteMessage(io, channelid, messageId, author);
    });

    // Cerrar chat del canal
    socket.on("closeChannelChat", async ({ channelId, ownerId }) => {
      await handleCloseChat(io, channelId, ownerId);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected", socket.id);
    });
  });
};

// Emitir historial de chat del canal
const emitChatHistory = async (socket, channelId) => {
  try {
    const channel = await Channel.findById(channelId).populate("messages");
    if (channel) {
      const messages = channel.messages.map((msg) => ({
        id: msg.id,
        author: msg.author,
        content: msg.content, // Asegúrate de usar 'message' aquí también
        date: msg.date,
      }));
      console.log("soy el historial de chat", messages)
      socket.emit("chatHistory", { channelId, messages }
    
      );
  
    }
  } catch (error) {
    console.error("Error emitting chat history", error);
  }
};

// Emitir nuevo mensaje en el canal
const emitChatMessage = async (io, { channelId, content, author }: MessageData) => {
  try {
    const newMessage = new Message({ author, content }); // Asegúrate de que aquí usas el campo 'message'
    await newMessage.save();
    console.log("soy el nuevo mensaje", newMessage);
    const channel = await Channel.findById(channelId);
    if (channel) {
      channel.messages.push(newMessage._id);
      await channel.save();

      // Emitir el nuevo mensaje a todos los usuarios en el canal
      io.to(channelId).emit("newChannelMessage", {
        author: newMessage.author,
        content: newMessage.message, // Asegúrate de que aquí también se use 'content'
        date: newMessage.date,
      });

      console.log(newMessage);
    }
  } catch (error) {
    console.error("Error sending chat message", error);
  }
};

// Emitir nuevo mensaje directo
const emitDirectMessage = async (io, { toUserId, message, author }: DirectMessageData) => {
  try {
    const newMessage = new Message({ author, content: message });
    await newMessage.save();

    let directMessage = await DirectMessage.findOne({
      users: { $all: [author, toUserId] },
    });

    if (!directMessage) {
      directMessage = new DirectMessage({
        users: [author, toUserId],
        messages: [newMessage._id],
      });
    } else {
      directMessage.messages.push(newMessage._id);
    }

    await directMessage.save();

    const roomId = [author, toUserId].sort().join("-");
    io.to(roomId).emit("newDirectMessage", {
      author: newMessage.author,
      content: newMessage.message,
      date: newMessage.date,
    });
  } catch (error) {
    console.error("Error sending direct message", error);
  }
};

// Eliminar mensaje
const handleDeleteMessage = async (io, channelId, messageId, author) => {
  console.log("Attempting to delete message", { channelId, messageId, author });

  try {
  

 

    // Buscar el mensaje por ID
    const message = await Message.findById(messageId);
    if (!message) {
      io.to(channelId).emit("error", { message: "Message not found" });
      return;
    }

    console.log("Message found:", message);

    // Verificar si el autor del mensaje es el mismo que está intentando eliminarlo
    if (message.author !== author) {
      io.to(channelId).emit("error", { message: "No permission to delete this message" });
      return;
    }

    // Eliminar el mensaje
    await message.deleteOne();
    console.log("Message successfully deleted");

    // Buscar el canal y actualizar la lista de mensajes
    const channel = await Channel.findById(channelId);
    if (!channel) {
      io.to(channelId).emit("error", { message: "Channel not found" });
      return;
    }

    console.log("Channel found:", channel);

    // Filtrar la lista de mensajes del canal
    const newMessages = channel.messages.filter(
      (msgId) => msgId.toString() !== messageId.toString()
    );

    if (newMessages.length === channel.messages.length) {
      console.log("Message not found in the channel messages list");
    }

    channel.messages = newMessages;
    await channel.save();
    console.log("Channel updated after message deletion");

    // Emitir evento de que el mensaje ha sido eliminado
    io.to(channelId).emit("messageDeleted", { messageId });
  } catch (error) {
    console.error("Error deleting message", error);
    io.to(channelId).emit("error", { message: "An error occurred while deleting the message" });
  }
};


// Cerrar el chat del canal
const handleCloseChat = async (io, channelId, ownerId) => {
  try {
    const channel = await Channel.findById(channelId);
    if (!channel || channel.user.toString() !== ownerId) {
      io.to(channelId).emit("error", { message: "No permission to close this chat" });
      return;
    }

    channel.isChatClosed = true;
    await channel.save();
    io.to(channelId).emit("channelChatClosed", { message: "El chat ha sido cerrado." });
  } catch (error) {
    console.error("Error closing chat", error);
  }
};
