
import axios from "axios";
import { IUserLogin,IUser } from "../interface/user-interface";

const api = axios.create({
    baseURL: "http://localhost:3000/api",
  
});

export const  loginUser= async (dataLogin:IUserLogin) => {
    try {
        const {data}= await api.post("/login", dataLogin);
        console.log(data);
        localStorage.setItem('token', data.token);

        return data;
    } catch (error) {
        console.error("Error during login", error);
        throw error;
    }
}

export const  createAcount = async (dataRegister:IUser) => {
    console.log(dataRegister);
    try {
        const {data} = await api.post("/register", dataRegister);
        return data;
    } catch (error) {
        console.error("Error during register", error);
        throw error;
    }
}