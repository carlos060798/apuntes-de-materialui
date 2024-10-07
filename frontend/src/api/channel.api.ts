import axios from "axios";
import {  IChannelUpdate } from "../interface/channel-interface";

const api = axios.create({
    baseURL: "http://localhost:3000/api/channel"
});


export const createChannel = async (dataChanel:IChannelUpdate) => {
    const token = localStorage.getItem("token");
    console.log("Token:", token);

    if (!token) {
        console.error("No token found in localStorage");
        return;
    }

    try {
        const {data} = await api.post("/create",  dataChanel , {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log("Channel created:", data);
        return data;
    } catch (error) {
        console.error("Error during createChannel", error);
        throw error;
    }
}

export const getChannelsfollows = async () => {
    const token = localStorage.getItem("token");
    console.log("Token:", token);

    if (!token) {
        console.error("No token found in localStorage");
        return;
    }

    try {
        const {data}= await api.get("/follow/channels", {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log("Channels:", data);
        return data;
    } catch (error) {
        console.error("Error during getChannels", error);
        throw error;
    }
};

export const getChannelsById = async (id:string) => {

   

    const {data}= await api.get(`/${id}`);

    console.log("Channels:", data);
    return data;

} 

export const getChannels = async () => {

    const  {data}= await api.get("/");
    console.log("Channels:", data);

    return data;
     
} 

export const followChannel = async (id:string) => {
    console.log("Siguiendo canal con ID:", id);

    const token = localStorage.getItem("token");
    console.log("Token:", token);
    if (!token) {
        console.error("No token found in localStorage");
        return;
    }

    const {data}= await api.post("/follow", {channelid:id}, {
        headers: { Authorization: `Bearer ${token}` }
    });
    console.log("Canal seguido:", data);
    return data;
}

export const unfollowChannel = async (id:string) => {
    console.log("Después de dejar de seguir canal con ID:", id);
    const token = localStorage.getItem("token");
    console.log("Token:", token);
    if (!token) {
        console.error("No token found in localStorage");
        return;
    }

    const {data}= await api.patch("/unfollow-channel", {channelid:id}, {
        headers: { Authorization: `Bearer ${token}` }
    });
    console.log("Canal  ya no seguido:", data);
    return data;
}

export const updateChannel = async (dataupdate:any) => {
    const {id, dataChannel} = dataupdate;

    const token = localStorage.getItem("token");
    console.log("Token:", token);

    if (!token) {
        console.error("No token found in localStorage");
        return;
    }
    try{
        const {data}= await api.put(`/update/${id}`, dataChannel, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log("Canal actualizado:", data);
        return data;  // Retornamos la data actualizada para que la use el componente que la consume.  // Si no retornamos, la función devolvería undefined.  // Este retorno es importante para que el componente pueda actualizar su estado según sea necesario.  // En este caso, el componente ChannelDetail es el que consume este API.  // Este componente es el que se encarga de renderizar los detalles del canal y de permitir la actualización.  // La actualización del canal se hace en el componente ChannelDetail, que llama a esta función.  // La función updateChannel es llamada cuando se hace clic en el botón de actualizar en el
    } catch (error) {
        console.error("Error during updateChannel", error);
        throw error;
    }
};