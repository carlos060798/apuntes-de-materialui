import { Request, Response } from 'express';
import User from '../Data/models/user';
import bcrypt from 'bcryptjs';
import Jwt from '../midlewares/auth/jwt';
import mongoose from 'mongoose';

class AuthController {

    constructor() { }

    public static async login(req: Request, res: Response) {

        const { email, password } = req.body;

        const user = await User.findOne({ email });
        try {
            if (!user) {
                return res.status(404).send({
                    message: "El correo no existe",
                });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(400).send({
                    message: "La contraseña es incorrecta",
                });
            }

            const token = Jwt.generateToken({ id: user._id });

            return res.send({
                message: "Inicio de sesión correcto",
                token,
                username: user.username
            });
        } catch (error) {
            return res.status(500).send({ message: "Error al iniciar sesión", error });
        }

    }

    public static async register(req: Request, res: Response) {

        const { email } = req.body;
        const userExist = await User.exists({ email });

        if (userExist) {
            return res.status(400).send({
                message: "El correo ya está en uso",
            });
        }

        try {



            const user = await User.create({

                ...req.body
            });

            user.password = await bcrypt.hash(user.password, 10);
            await user.save();
            const token = Jwt.generateToken({ id: user._id });

            return res.send({
                message: "Usuario creado correctamente",
                token

            });
        } catch (error) {
            return res.status(500).send({ message: "Error al crear el usuario", error });
        }
    }

    public static async uptdateUser(req: Request, res: Response) {
        const userid = req.user?._id
        const { email, username } = req.body;

        const user = await User.exists({ email });
        if (user) {
            return res.status(400).send({
                message: "El correo ya está en uso",
            });
        }

        try {

            const userupdate = await User.findByIdAndUpdate(userid, { email, username }, { new: true });

            return res.send({ msg: "Usuario actualizado correctamente" });
        }

        catch (error) {
            return res.status(500).send({ message: "Error al actualizar el usuario", error });
        }
    }

    public static async followUser(req: Request, res: Response) {
        const userid = req.user?._id;
        const { userfollow } = req.body;
    
        if (!userid || !userfollow) {
            return res.status(400).json({ success: false, message: 'Faltan parámetros' });
        }
    
        const session = await mongoose.startSession();
        session.startTransaction();
    
        try {
            const currentUser = await User.findById(userid).session(session);
            const targetUser = await User.findById(userfollow).session(session);
    
            if (!currentUser || !targetUser) {
                await session.abortTransaction();
                return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
            }
    
            // Verificar si ya sigue al usuario
            const alreadyFollowing = currentUser.following.includes(userfollow);
            const alreadyFollowedBy = targetUser.followers.includes(userid);
    
            if (!alreadyFollowing) {
                currentUser.following.push(userfollow);
            }
    
            if (!alreadyFollowedBy) {
                targetUser.followers.push(userid);
            }
    
            if (!alreadyFollowing || !alreadyFollowedBy) {
                await currentUser.save({ session });
                await targetUser.save({ session });
            }
    
            await session.commitTransaction();
            return res.status(200).json({ success: true, message: 'Usuario seguido correctamente' });
    
        } catch (error) {
            await session.abortTransaction();
            console.error(error);
            return res.status(500).json({ success: false, message: 'Error al seguir al usuario' });
        } finally {
            session.endSession();
        }
    }
    

 
public static async unfollowUser(req: Request, res: Response) {
    const userid = req.user?._id;
    const { userfollow } = req.body;

    if (!userid || !userfollow) {
        return res.status(400).json({ success: false, message: 'Faltan parámetros' });
    }

    try {
        // Buscar los usuarios en la base de datos
        const [currentUser, targetUser] = await Promise.all([
            User.findById(userid),
            User.findById(userfollow)
        ]);

        if (!currentUser || !targetUser) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }

        // Eliminar de la lista de seguidos
        if (currentUser.following.includes(userfollow)) {
            currentUser.following = currentUser.following.filter(id => id.toString() !== userfollow);
            await currentUser.save();
        }

        // Eliminar de la lista de seguidores del usuario objetivo
        if (targetUser.followers.includes(userid)) {
            targetUser.followers = targetUser.followers.filter(id => id.toString() !== userid.toString());
            await targetUser.save();
        }

        return res.status(200).json({ success: true, message: 'Usuario dejado de seguir correctamente' });

    } catch (error) {
        console.error('Error en unfollowUser:', error);
        return res.status(500).json({ success: false, message: 'Error al dejar de seguir al usuario' });
    }
}

public  static async getUsers(req: Request, res: Response) {
      
try{
    const users = await User.find().populate('channel').populate('followedChannels').populate('followers').populate('following');
    return res.send({
        msg: "Usuarios obtenidos correctamente",
        users
    })

} catch (error) {
    return  res.status(500).send({ message: "Error al obtener el usuario", error });
}

}

public static async getUser(req: Request, res: Response) {
    const userid = req.user?._id;
    try {
        const user = await User.findById( userid ).populate
        return res.send({
            msg: "Usuario obtenido correctamente",
            user
        })
    } catch (error) {
        return res.status(500).send({ message: "Error al obtener el usuario", error });
    }
}
}

export default AuthController;