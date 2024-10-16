import axios from "axios";

const commentApi = axios.create({
    baseURL: "http://localhost:3000/api/comments",
});

interface Comment {
    channelId: string,
    content: string,
}

export const createComment = async (commentData: Comment) => {
    const token = localStorage.getItem("token");
    try{
        const {data}=await commentApi.post("/", commentData, {headers: {Authorization: `Bearer ${token}`}});
        return data;}
    catch(error){
        console.error("Error during comment creation", error);
        throw error;
    }
}

export const updateComment = async ({ commentId, commentData }: { commentId: string, commentData: Comment }) => {
   const token = localStorage.getItem("token");
    try{
       const {data}= await commentApi.put(`/${commentId}`, commentData, {headers: {Authorization: `Bearer ${token}`}});
        return data;
} catch(error){
    console.error("Error during comment update", error);
        throw error;
    
}}

export const deleteComment = async (commentId: string) => {
    const token = localStorage.getItem("token");

    try{
    const {data}= await commentApi.delete(`/${commentId}`, {headers: {Authorization: `Bearer ${token}`}});
    return data;

} catch(error){
        console.error("Error during comment deletion", error);
        throw error;
 
    }
}

export const getComments = async (Channelid:string) => {
try{
    const {data}=await commentApi.get(`/${Channelid}`);
    return data;

} catch(error){
    console.error("Error during comment retrieval", error);
        throw error;
 }
}

export const deleteAllComments = async (channelId: string) => {
    try{
    const {data}= await commentApi.delete(`/${channelId}`);
    return data;
} catch(error){
    console.error("Error during all comments deletion", error);
        throw error;
}
}