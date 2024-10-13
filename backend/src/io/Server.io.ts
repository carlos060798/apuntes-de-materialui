import { Server } from 'socket.io';
import Channel from '../Data/models/chanel';
import Message,{IMessage} from '../Data/models/mesagge';
import http from 'http';


let io: Server;

interface dataMesagge{
    toChannel: string;
    message: string;
    author: string;
}

export const registerSocketServer = (server: http.Server) => {
    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        console.log("A user connected", socket.id);

        socket.on("join-channel", (channelId) => {
            socket.join(channelId);
            emitChatHistory(socket, channelId);
        });

        socket.on("chat-message", (data) => {
            emitChatMessage(io, {
                toChannel: data.channelId,
                message: data.message,
                author: data.author,
            });
        });

        socket.on("private-message", (data) => {
            emitPrivateMessage(io, data);
        });

        socket.on("disconnect", () => {
            console.log("A user disconnected", socket.id);
        });
    });
}; 

export const emitDirectMessage = (message: IMessage, userId1: string, userId2: string) => {
    const io = global.io as Server;
    io.to(userId1).emit("direct-message", message);
    io.to(userId2).emit("direct-message", message);
};

export const emitChatHistory = async (socket: SocketIO.Socket, channelId: string) => {
    try {
        const channel = await Channel.findById(channelId).populate('messages');

        if (channel) {
            const messages = channel.messages.map((message:IMessage) => ({
                author: message.author,
                content: message.content,
                date: message.date,
            }));
            socket.emit("chat-history", {
                channelId,
                messages,
            });
        } else {
            socket.emit("chat-history", {
                errorOccurred: true,
                message: "Channel not found",
            });
        }
    } catch (error) {
        console.error("Error emitting chat history", error);
        socket.emit("chat-history", {
            errorOccurred: true,
            message: "Error fetching chat history",
        });
    }
};

export const emitChatMessage = async (io: Server, messageData: dataMesagge) => {
    try {
        const channel = await Channel.findById(messageData.toChannel);
        if (channel) {
            const newMessage = new Message({
                content: messageData.message,
                author: messageData.author,
                date: new Date(),
            });
            await newMessage.save();

            channel.messages.push(newMessage._id);
            await channel.save();

            io.to(messageData.toChannel).emit('chat-message', newMessage);
        }
    } catch (error) {
        console.error("Error emitting chat message", error);
    }
};

export const emitPrivateMessage = async (io: Server, data: { toUserId: string; message: string; author: string }) => {
    try {
        io.to(data.toUserId).emit('private-message', {
            author: data.author,
            content: data.message,
            date: new Date(),
        });
    } catch (error) {
        console.error("Error emitting private message", error);
    }
};
