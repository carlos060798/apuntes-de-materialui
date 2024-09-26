import jtw from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

class Jwt {
 

    public static generateToken(payload: any) {
    return jtw.sign(payload, process.env.SECRET_KEY as string, {
    expiresIn: "1d",
    });
    }

    public static verifyToken(token: string) {
    return jtw.verify(token, process.env.SECRET_KEY as string);
    }

}

export default Jwt;
 