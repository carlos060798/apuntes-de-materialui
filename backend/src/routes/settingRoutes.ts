import { Router } from "express"; 
import { authenticate } from "../midlewares/auth/autheticate";
import settingController from "../controllers/settings.controller";
import { validateRequest } from "../midlewares/auth/validator";
import {  passwordUpdateShema } from "../interface/shemas";


const route= Router();


route.patch('/password',authenticate,validateRequest(passwordUpdateShema), settingController.updatePassword);

const settingRoutes = route

export default settingRoutes;