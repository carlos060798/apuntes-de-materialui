import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth-route';
import channelRoutes from './routes/chanenelRoutes';
import settingRoutes from './routes/settingRoutes';
import { conectarBD } from './Data/connection';


dotenv.config();
conectarBD();
const app = express();
const port = process.env.PORT

app.use(cors({
  origin: 'http://localhost:5173', 
  //methods: ['GET', 'POST', 'PUT', 'DELETE'],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Métodos permitidos

}));
app.use(express.json());
app.use("/api", authRoutes);
app.use("/api/channel", channelRoutes);
app.use("/api/setting", settingRoutes);

app.listen(port, () => {
  console.log(`SERVIDOR ONLINE ${port}`);
});
