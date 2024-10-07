import { Request, Response } from "express";
import user from "../Data/models/user";
import chanel from "../Data/models/chanel";
import bcrypt from 'bcryptjs';
class settingController {
  


  public static async updatePassword(req: Request, res: Response) {
    const userid = req.user?._id; // Obtener el _id del usuario desde req.user
    const {
      password,
      newPassword,
    } = req.body;

     try{
      // Validar que la contraseña actual coincida con la del usuario
      const userdata = await user.findById(userid);
      if (!bcrypt.compareSync(password, userdata.password)) {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
      }
      
      // Hashear la nueva contraseña
      const hashedPassword = bcrypt.hashSync(newPassword, 10);
      // Actualizar la contraseña del usuario
      const updatedUser = await user.findByIdAndUpdate(userid, { password: hashedPassword }, { new: true });
      
      if (!updatedUser) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      
      return res.status(200).json({ message: 'Contraseña actualizada' });

     }


    catch (error) {
      return res.status(500).json({ message: 'Error en el servidor', error });

    }


  }




}

export default settingController;