import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api/channel"
});




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

export const getChannelsById = async () => {

    const token = localStorage.getItem("token");
    console.log("Token:", token);
    if (!token) {
        console.error("No token found in localStorage");
        return;
    }

    const {data}= await api.get("/follow/channels", {
        headers: { Authorization: `Bearer ${token}` }
    });

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
