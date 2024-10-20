import { Request, Response } from "express";
import DirectMessage from "../Data/models/PrivateMessage";
import Message from "../Data/models/mesagge";

// Obtener mensajes directos entre usuarios
export const getDirectMessages = async (req: Request, res: Response) => {
  const userId1 = req.user?._id;
  const {  userId2 } = req.params;

  try {
    const directMessages = await DirectMessage.find({
      users: { $all: [userId1, userId2] },
    }).populate("messages");

    res.status(200).json(directMessages);
  } catch (error) {
    res.status(500).json({ error: "Error fetching direct messages" });
  }
};

// Enviar mensaje directo entre dos usuarios
export const sendDirectMessage = async (req: Request, res: Response) => {
    const userId1 = req.user?._id;
  const { userId2 } = req.params;
  const { author, content } = req.body;

  try {
    const newMessage = new Message({ author, content });
    await newMessage.save();

    let directMessage = await DirectMessage.findOne({
      users: { $all: [userId1, userId2] },
    });

    if (!directMessage) {
      directMessage = new DirectMessage({
        users: [userId1, userId2],
        messages: [newMessage._id],
      });
    } else {
      directMessage.messages.push(newMessage._id );
    }

    await directMessage.save();

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: "Error sending direct message" });
  }
};


export const deleteDirectMessage = async (req: Request, res: Response) => {
    const { messageId } = req.params;

    try {
        const message = await Message.findById(messageId);

        if (!message) {
            return res.status(404).json({ error: "Message not found" });
        }

        await message.deleteOne();

        await DirectMessage.updateMany(
            { messages: messageId },
            { $pull: { messages: messageId } }
        );

        res.status(200).json({ message: "Message deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting message" });
    }
};