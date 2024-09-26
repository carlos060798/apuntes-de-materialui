import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth-route';
import { conectarBD } from './Data/connection';


dotenv.config();
conectarBD();
const app = express();
const port = process.env.PORT


app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`SERVIDOR ONLINE ${port}`);
});
