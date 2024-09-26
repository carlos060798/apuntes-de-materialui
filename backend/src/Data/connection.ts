import mongoose from "mongoose";
import { exit } from "node:process";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.DB_URL  as string


export const conectarBD = async () => {
  try {
   const conectar= await mongoose.connect(url);
    console.log("Conectado a la base de datos");
  } catch (error) {
    console.log("Error al conectar a la base de datos", error);
    exit(1);
  }
};