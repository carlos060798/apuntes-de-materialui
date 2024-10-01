import { Request,Response } from "express";
import user from "../Data/models/user";
import { title } from "process";
import chanel from "../Data/models/chanel";
class  settingController {
    public static async getSettings(req:Request,res:Response){
      const  userid = req.user?._id 
     try{
      const  userData = await  user.findById(userid,{
        channel:1,
        username:1,
      }).populate('channel');
       console.log(userData);
      
       const resposeData={
        id:userData?._id,
        username:userData?.username,
        title:userData?.channel?.title ,
        description:userData?.channel?.description,
        avatarUrl:userData?.channel?.avatarUrl,
        streamKey:userData?.channel?.streamKey,

       }
      res.json({message: 'Hola desde el API', resposeData});

      }catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error en el servidor' });
      }
      
    }

   
    public static async updateSettings(req: Request, res: Response) {
      try {
          const userid = req.user?._id; // Obtener el _id del usuario desde req.user
          const { username, description, title, avatarUrl } = req.body;
  
          // Buscar el usuario por ID
          const userdata = await user.findById(userid, { username: 1, channel: 1 });
  
          // Si no encuentra al usuario, retornar un error 404
          if (!userdata) {
              return res.status(404).json({ message: 'Usuario no encontrado' });
          }
           console.log(userdata.channel);
          // Actualizar los datos del canal del usuario usando el ID del canal directamente
          const chaneldata = await chanel.findByIdAndUpdate(
            {
              _id: userdata.channel
            },  {
                  title,
                  description,
                  avatarUrl,
                  isActivated: true,
              },
              { new: true } // Opcional: devuelve los datos actualizados
          );
  
          // Si no se encontró el canal, retornar un error 404
          if (!chaneldata) {
              return res.status(404).json({ message: 'Canal no encontrado' });
          }
  
          // Responder con los datos actualizados
          return res.status(200).json({ message: 'Ajustes actualizados', chaneldata });
      } catch (error) {
          // Manejo de errores generales
          return res.status(500).json({ message: 'Error en el servidor', error: error.message });
      }
  }
      


      
    
}

export default settingController;