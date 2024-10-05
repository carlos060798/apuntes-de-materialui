
import axios  from "axios";
import { IUserPassword } from "../interface/user-interface";


const api = axios.create({
  baseURL: "http://localhost:3000/api/setting",
});

 
  export const changePassword = async (dataPassword:IUserPassword) => {


  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found in localStorage");
    return;
  }
  try {
    const { data } = await api.patch("/password",dataPassword,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error during changePassword", error);
    throw error;
  }
}