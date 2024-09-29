import { Request, Response } from 'express';
import User from '../Data/models/user';
import bcrypt from 'bcryptjs';
import Jwt from '../midlewares/auth/jwt';
import Channel from '../Data/models/chanel';

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
                username:user.username
            });
        } catch (error) {
            return res.status(500).send({ message: "Error al iniciar sesión", error });
        }

    }

    public static async register(req: Request, res: Response) {

        const  {email} = req.body;
        const userExist = await User.exists({email});

        if(userExist) {
            return res.status(400).send({
                message: "El correo ya está en uso",
            });
        }

        try {

            const chanel=  await Channel.create({})

            const user = await User.create({
                channel: chanel._id,
                ...req.body
            });

            user.password = await bcrypt.hash(user.password, 10);

            Promise.all([user.save(), chanel.save()])
            const token = Jwt.generateToken({ id: user._id });

            return res.send({
                message: "Usuario creado correctamente",
                token
               
            });
        } catch (error) {
            return res.status(500).send({ message: "Error al crear el usuario", error });
        }
    }
}

export default AuthController;