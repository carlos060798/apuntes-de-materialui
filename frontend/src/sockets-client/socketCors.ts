import io  from  "socket.io-client";

let socket: any;

export  const  connectwithSocketServer =  () => {
    socket = io("http://localhost:3000");

    socket.on("connect", () => {
        console.log("Connected to the socket server");
        console.log(socket.id);
    });

    socket.on("chat-history", (chatHistory:any) => {
        console.log(chatHistory);
        console.log("Chat history received:", );
    });

    socket.on("chat-message", (chatmessage:any) => {
        console.log("Chat message received:", chatmessage);
    });
}

export  const  getChatHistory =  (channelId: string) => {
    socket.emit("chat-history", channelId);
}

export const  sendChatMessage =  (channelId: string, message: string) => {
    socket.emit("send-message", {
        channelId,
        message,
    });
}

export const closeChatSubscription = (channelId: string) => {
    socket.emit("chat-unsubscribe", channelId);
}