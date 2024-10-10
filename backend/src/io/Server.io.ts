import { Server } from 'socket.io';
import http from 'http';
import { emitChatHistory } from './events/emitChatHistory';
import { emitChatMessage } from './events/emitChatMessage';
import Channel from '../../../frontend/src/componets/Channel';

let io: Server;

export const registerSocketServer = (server: http.Server) => { // Asegura que el tipo sea http.Server
    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            
        },
    });

    io.on("connection", (socket) => {
        console.log("A user connected");
        console.log(socket.id);

        socket.on("chat-history", (channelId) => {
            socket.join(channelId);
            emitChatHistory(socket,channelId);
        });

        socket.on("chat-message", (data) => {
            emitChatMessage(io,{toChannel: data.channelId, message: data.message});
        });

        socket.on("chat-unsubscribe", (Channelid) => {
            console.log("A user disconnected");
            socket.leave(Channelid);
        });
    });
};