import { Request, Response } from "express";
import Channel from "../Data/models/chanel";
import User from "../Data/models/user";

class ChannelController {
  public static async getChannel(req: Request, res: Response) {
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
      return res.send(followedChannels);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ msg: "Error al obtener los canales seguidos", error });
    }
  }



}


export default ChannelController;
