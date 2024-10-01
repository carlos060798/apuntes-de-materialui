import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../../Data/models/user';



interface IUser {
    _id: string;
    username?: string;
    email?: string;
    
}
declare global {
    namespace Express {
        interface Request {
            user?: IUser;
        }
    }

}

export const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const barerToken = req.headers.authorization;
    if (!barerToken) return res.status(401).json({ error: "Token no encontrado"});

    const token = barerToken.split(" ")[1];
    if (!token) 
        return res.status(401).json({ error: "Token no valido"});

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY as string);

        if (typeof decoded === "object" && decoded.id) {
            const user= await User.findById(decoded.id).select('_id name email')

            if (user) {
                req.user = user;
            } else {
                return res.status(401).json({ error: "Usuario no encontrado" });

            }
        }


        next();
    } catch (error) {
        return res.status(401).json({ error: "Token no valido" });



    }
}