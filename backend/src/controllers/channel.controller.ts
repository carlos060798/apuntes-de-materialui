import { Request, Response } from "express";
import Channel from "../Data/models/chanel";
import User from "../Data/models/user";
import ChannelRoutes from '../routes/chanenelRoutes';

class ChannelController {
  public static async getChannel(req:Request,res: Response) {
    const channelId = req.params.idchannel;

    // Simulate a database call to fetch the channel data
    try {
      const channelData = await Channel.findById(channelId);

      if (!channelData) {
        return res.status(404).json({ error: "Channel not found" });
      }

      const userchanel = await User.findOne(
        { channel: channelId },
        { username: 1 }
      );
      const isOnline = false;
      const streamUrl = "http";
      return res.status(200).send({
        id: channelData._id,
        title: channelData.title,
        description: channelData.description,
        username: userchanel ? userchanel.username : "Unknown",
        isOnline,
        streamUrl,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve channel" });
    }
  }



  public static async getChanels(req: Request, res: Response) {
    try {
      // Consulta todos los canales y llena el campo de usuario con sus datos relacionados
      const canales = await Channel.find().populate("user", "username email");

      // Formatea los canales según la estructura requerida
      const canalesFormateados = canales.map((canal) => {
        return {
          id: canal._id,
          title: canal.title,
          avatarUrl: canal.avatarUrl,
          username: canal.user?.username || "Unknown",
          isOnline: false, 
        };
      });

      return res.send(canalesFormateados);
    } catch (error) {
      return res.status(500).send({ msg: "Error al obtener los canales", error });
    }
  }


  }


export default ChannelController;
