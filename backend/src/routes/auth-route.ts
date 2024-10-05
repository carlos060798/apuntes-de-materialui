import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import { validateRequest } from "../midlewares/auth/validator";
import { registerSchema, loginSchema, updateUserSchema } from "../interface/shemas";
import { authenticate } from "../midlewares/auth/autheticate";

const router = Router();

router.post('/register', validateRequest(registerSchema), AuthController.register);
router.post('/login', validateRequest(loginSchema), AuthController.login);

router.put('/user',authenticate, validateRequest(updateUserSchema), AuthController.uptdateUser);


const authRoutes = router;

export default authRoutes;

