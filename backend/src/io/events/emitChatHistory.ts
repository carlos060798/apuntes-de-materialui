import SocketIO from 'socket.io';
import Channel from '../../Data/models/chanel';


export const emitChatHistory = async (socket: SocketIO.Socket, channelId: string) => { 
    try {
        // Simulate a database call to fetch the chat history
        const channel = await Channel.findById(channelId).populate('menssages');

        if (channel) {
            // Emitir la historia del chat si se encuentra el canal
            const messages = channel.menssages.map((message) => ({
                author: message.author,
                content: message.content,
            }));
            return socket.emit("chat-history", {
                channelId,
                messages,
            });
        } else {
            // Emitir error si el canal no se encuentra
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
