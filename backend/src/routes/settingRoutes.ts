import { Router } from "express"; 
import { authenticate } from "../midlewares/auth/autheticate";
import settingController from "../controllers/settings.controller";
import { validateRequest } from "../midlewares/auth/validator";
import { channelUpdateSchema } from "../interface/shemas";


const route= Router();

route.get('/',authenticate,settingController.getSettings);
route.put('/',authenticate,validateRequest(channelUpdateSchema),settingController.updateSettings);

const settingRoutes = route

export default settingRoutes;