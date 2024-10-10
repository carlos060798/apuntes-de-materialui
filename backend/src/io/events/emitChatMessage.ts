import Channel from '../../Data/models/chanel';
import Message from '../../Data/models/mesagge';
import { dataMesagge } from '../interface/interfaces';

import { Server } from'socket.io';



export const emitChatMessage = async (io:Server,messageData:dataMesagge) => {
    try {
        // Simulate a database call to save the message
        const channel = await Channel.findById(messageData.toChannel) 
        if(channel){
            const newMessage = new Message({
                content: messageData.message,
                author: messageData.author,
                date: new Date()
            })
            await newMessage.save()

            channel.menssages.push(newMessage._id) 

            await channel.save() 
            io.to(messageData.toChannel).emit('chat-message',newMessage)

        }
    }catch(error){
      console.error("Error emitting chat message", error);
    }
}