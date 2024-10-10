import { useEffect, useState } from "react";
import { closeChatSubscription, getChatHistory, sendChatMessage } from '../socketCors';

export const useChatHistory = (channelId: string) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchChatHistory = async () => {
            const chatHistory = await getChatHistory(channelId);
            setMessages(chatHistory);
        };
        
        fetchChatHistory();
        
        return () => {
           closeChatSubscription(channelId);
        };
    }, [channelId]);

    const sendMessage = (message) => {
        sendChatMessage(channelId, {
            author: localStorage.getItem('username'),
            content: message,
        });
    };

    return {
        messages,
        sendMessage,
    };
};
