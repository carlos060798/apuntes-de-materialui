import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth-route';
import channelRoutes from './routes/chanenelRoutes';
import settingRoutes from './routes/settingRoutes';
import { conectarBD } from './Data/connection';
import http from 'http'; // Importa http para crear el servidor
import { registerSocketServer } from './io/Server.io';
import commentRoutes from './routes/comment-Routes';

dotenv.config();
conectarBD();

const app = express();
const port = process.env.PORT || 3000;

// Configura CORS para el frontend
app.use(cors({
  origin: 'http://localhost:5173', // Asegúrate de que esta es la URL del frontend
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}));

// Middlewares
app.use(express.json());

// Rutas
app.use("/api", authRoutes);
app.use("/api/channel", channelRoutes);
app.use("/api/setting", settingRoutes);
app.use("/api/comments", commentRoutes);

// Crea un servidor HTTP usando Express
// Crea el servidor HTTP utilizando el servidor Express
const server = http.createServer(app);

// Registra el servidor de Socket.IO con el servidor HTTP
registerSocketServer(server);

// Inicia el servidor HTTP
server.listen(port, () => {
  console.log(`SERVIDOR ONLINE en el puerto ${port}`);
});

