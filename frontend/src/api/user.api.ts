
import axios from "axios";
import { IUserLogin,IUser, IUserUpdate } from "../interface/user-interface";

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

export const  updateUserData = async (dataUser:IUserUpdate) => {
    const  token = localStorage.getItem("token");
    if (!token) {
        console.error("No token found in localStorage");
        return;
    }
    try {
        
        const {data} = await api.put("/user", dataUser, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return data;
    } catch (error) {
        console.error("Error during update user data", error);
        throw error;
    }
} 


export const  getUserData = async () => {
    const  token = localStorage.getItem("token");
    if (!token) {
        console.error("No token found in localStorage");
        return;
    }
    try {
        const {data} = await api.get("/userdetails", {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log("User data:", data);
        return data;
    } catch (error) {
        console.error("Error during getUserData", error);
        throw error;
    }
} 

export const  getUsers = async () => {
    try {
        const {data} = await api.get("/users");
        console.log("Users:", data);
        return data;
    } catch (error) {
        console.error("Error during getUsers", error);
        throw error;
    }
}

export const  unfollowUser = async (userId:string) => {
    const  token = localStorage.getItem("token");
    if (!token) {
        console.error("No token found in localStorage");
        return;
    }
    try {
        const {data} = await api.delete(`/follow/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return data;
    } catch (error) {
        console.error("Error during unfollow user", error);
        throw error;
    }
}

export const  followUser = async (userId:string) => {
    const  token = localStorage.getItem("token");
    if (!token) {
        console.error("No token found in localStorage");
        return;
    }
    try {
        const {data} = await api.post("/follow", { userId }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return data;
    } catch (error) {
        console.error("Error during follow user", error);
        throw error;
    }
}