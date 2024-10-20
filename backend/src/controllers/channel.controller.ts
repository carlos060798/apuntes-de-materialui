

import { Request, Response } from "express";
import Channel from "../Data/models/chanel";
import User from "../Data/models/user";
import Message from "../Data/models/mesagge";
class ChannelController {
  public static async  createChannel(req: Request, res: Response) {
    const user = req.user?._id;
    console.log("data", req.body);
    const { title, description,avatarUrl} = req.body;
    try{
    const newChannel = await Channel.create({ title, description, user,avatarUrl });
    await newChannel.save();
    res.status(201).send({ msg: "Canal creado correctamente", newChannel });
    } catch (error) {
      res.status(500).send({ msg: "Error al crear el canal", error });
    }
  }
  public static async getChannel(req: Request, res: Response) {
    const channelId = req.params.idchannel;

    // Simulate a database call to fetch the channel data
    try {
      const canal= await Channel.findById(channelId).populate("user", "username");

      if (!canal) {
        return res.status(404).json({ error: "Channel not found" });
      }

     
      return res.status(200).send({
        id: canal?._id,
        isActivated: canal?.isActivated,
        title: canal?.title,
        description: canal?.description,
        avatarUrl: canal?.avatarUrl,
        user: canal?.user?.username // Solo devuelve el username
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve channel" });
    }
  }

  public static async updateChannel(req: Request, res: Response) {
      const userid= req.user?._id;
      const channelId = req.params.idchannel;
      const { title, description, avatarUrl} = req.body;
      try {
        const channelData = await Channel.findById(channelId);
        if (!channelData) {
          return res.status(404).json({ error: "Channel not found" });
        }
        console.log("channelData",channelData.user)
        console.log("userid",userid);
        if (channelData.user?.toString() !== userid?.toString()) {
          return res.status(401).json({ error: "You are not the owner of this channel" });
        }

        const updatedChannel = {
           title: title || channelData.title,
           description: description || channelData.description,
           avatarUrl: avatarUrl || channelData.avatarUrl,
        }

        await channelData.updateOne(updatedChannel)
        return res.status(200).send(channelData);
        } catch (error) {
          return res.status(500).json({ error: "Failed to update channel" });
        }
  }

 
  public static async getAllChannels(req: Request, res: Response) {
    try {
      const userId = req.user?._id; // Verifica que el usuario esté autenticado
  
      if (!userId) {
        return res.status(401).send({ msg: "Usuario no autenticado" });
      }
  
      // Consulta todos los canales, excluyendo aquellos cuyo propietario sea el usuario autenticado
      const canales = await Channel.find({ user: { $ne: userId } })
        .populate("user", "username"); // Poblar solo el campo "username" del usuario
  
      // Mapeo para devolver solo los campos solicitados
      const canalesFormat = canales.map((canal) => ({
        id: canal._id,
        isActivated: canal.isActivated,
        title: canal.title,
        description: canal.description,
        avatarUrl: canal.avatarUrl,
        user: canal.user.username, // Solo devuelve el username
      }));
  
      return res.status(200).send(canalesFormat);
    } catch (error) {
      console.error("Error al obtener los canales:", error);
      return res.status(500).send({ msg: "Error al obtener los canales", error });
    }
  }
  // Método para obtener los canales donde el usuario solicitante sea el propietario
  public static async getUserChannels(req: Request, res: Response) {
    try {
      const userId = req.user?._id; // Asumiendo que el ID del usuario está disponible en req.user

      // Consulta los canales donde el campo "user" coincida con el usuario solicitante
      const canales = await Channel.find({ user: userId }).populate("user", "username");

      // Mapeo para devolver solo los campos solicitados
      const canalesFormat = canales.map((canal) => ({
        isActivated: canal.isActivated,
        id: canal._id,
        title: canal.title,
        description: canal.description,
        avatarUrl: canal.avatarUrl,
        user: canal.user.username, // Solo devuelve el username
      }));

      return res.send(canalesFormat);
    } catch (error) {
      return res.status(500).send({ msg: "Error al obtener los canales del usuario", error });
    }
  }

  public static async followChannel(req: Request, res: Response) {
    const userid = req.user?._id
    const { channelid } = req.body;
    try {
      const userData = await User.findById(userid, { followedChannels: 1 });

      if (userData?.followedChannels.includes(channelid)) {
        return res.status(400).send({ msg: "Ya sigues a este canal" })
      }

      userData?.followedChannels.push(channelid);
      await userData?.save();


      return res.send({ msg: "Canal seguido correctamente" })
    } catch (error) {
      return res.status(500).send({ msg: "Error al seguir el canal", error });


    }
  }
  public static async unfollowChannel(req: Request, res: Response) {
    const userid = req.user?._id;
    const { channelid } = req.body;

    try {
      const userData = await User.findById(userid, { followedChannels: 1 });

      if (!userData) {
        return res.status(404).send({ msg: "Usuario no encontrado" });
      }

      if (!userData.followedChannels.includes(channelid)) {
        return res.status(400).send({ msg: "No sigues a este canal" });
      }

      // Filtrar el canal que el usuario quiere dejar de seguir
      userData.followedChannels = userData.followedChannels.filter(id => id.toString() !== channelid);

      await userData.save();

      return res.send({ msg: "Dejaste de seguir el canal correctamente" });
    } catch (error) {
      return res.status(500).send({ msg: "Error al dejar de seguir el canal", error });
    }
  }

  // Método para listar los canales que sigue el usuario
  public static async channelsLikes(req: Request, res: Response) {

    const userid = req.user?._id;

    try {
      // Obtener el usuario con los canales que sigue y hacer populate para obtener más información de los canales
      const userData = await User.findById(userid).populate("followedChannels", "title avatarUrl description");

      if (!userData) {
        return res.status(404).send({ msg: "Usuario no encontrado" });
      }
      const { followedChannels } = userData;

      console.log(followedChannels);
      return res.send(followedChannels);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ msg: "Error al obtener los canales seguidos", error });
    }
  }

 // metodos para chat en los canales

// Enviar mensaje en un canal
public  static async  sendChannelMessage  (req: Request, res: Response)  {
  const author = req.user?._id;
  const { channelId } = req.params;
  const {  content } = req.body;

  try {
    const channel = await Channel.findById(channelId);
    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    // Verificar si el chat está cerrado
    if (channel.isChatClosed) {
      return res.status(403).json({ message: "The chat is closed by the channel owner" });
    }

    const newMessage = new Message({ author, content });
    await newMessage.save();

    channel.messages.push(newMessage._id);
    await channel.save();

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: "Error sending message" });
  }
};

// Obtener mensajes del canal
public static async  getChannelMessages (req: Request, res: Response) {
  const { channelId } = req.params;

  try {
    const channel = await Channel.findById(channelId).populate("messages");
    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    res.status(200).json(channel.messages);
  } catch (error) {
    res.status(500).json({ error: "Error fetching messages" });
  }
};

// Eliminar mensaje del canal
public  static async deleteChannelMessage (req: Request, res: Response) {
  const authorId = req.user?._id;
  const { messageId, channelId } = req.params;

  try {
    const message = await Message.findById(messageId);
    if (!message || message.author !== authorId) {
      return res.status(403).json({ message: "No permission to delete this message" });
    }

    await message.deleteOne();

    const channel = await Channel.findById(channelId);
    if (channel) {
      channel.messages = channel.messages.filter(
        (msgId) => msgId.toString() !== messageId
      );
      await channel.save();
    }

    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting message" });
  }
};

// Cerrar el chat del canal
 public static  async  closeChannelChat  (req: Request, res: Response) {
 const  ownerId = req.user?._id;
  const { channelId } = req.params;

  try {
    const channel = await Channel.findById(channelId);
    if (!channel || channel.user.toString() !== ownerId) {
      return res.status(403).json({ message: "No permission to close this chat" });
    }

    channel.isChatClosed = true;
    await channel.save();
   
    return res.send({ message: "Chat closed successfully" });
  } catch (error) {
     return res.send({ messaggerror: "Error closing chat", error });
  }
};



}

export default ChannelController;
