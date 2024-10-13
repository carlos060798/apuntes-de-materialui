import { Request, Response } from "express";
import  DirectMessage from "../Data/models/PrivateMessage";
import { emitDirectMessage } from '../io/Server.io';
import Message from "../Data/models/mesagge";

// Obtener historial de mensajes directos
export const getDirectMessages = async (req: Request, res: Response) => {
    const { userId1, userId2 } = req.params;
    try {
        const conversation = await DirectMessage.findOne({ users: { $all: [userId1, userId2] } }).populate('messages');
        if (!conversation) {
            return res.status(404).json({ error: "No conversation found" });
        }
        return res.json({ messages: conversation.messages });
    } catch (error) {
        console.error("Error fetching direct messages", error);
        return res.status(500).json({ error: "Error fetching direct messages" });
    }
};

// Enviar un mensaje directo
export const sendDirectMessage = async (req: Request, res: Response) => {
    const { userId1, userId2 } = req.params;
    const { content, author } = req.body;

    try {
        let conversation = await DirectMessage.findOne({ users: { $all: [userId1, userId2] } });
        if (!conversation) {
            conversation = new DirectMessage({ users: [userId1, userId2], messages: [] });
        }

        const newMessage = new Message({ content, author });
        await newMessage.save();

        conversation.messages.push(newMessage._id);
        await conversation.save();

        emitDirectMessage(newMessage, userId1, userId2);
        return res.status(201).json(newMessage);
    } catch (error) {
        console.error("Error sending direct message", error);
        return res.status(500).json({ error: "Error sending direct message" });
    }
};