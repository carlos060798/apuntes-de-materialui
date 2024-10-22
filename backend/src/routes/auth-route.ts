import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import { validateRequest } from "../midlewares/auth/validator";
import { registerSchema, loginSchema, updateUserSchema, useridShema } from "../interface/shemas";
import { authenticate } from "../midlewares/auth/autheticate";

const router = Router();
router.get('/userdetails', authenticate, AuthController.getUser);
router.get('/users', authenticate, AuthController.getUsers);
router.get('/user/:id', AuthController.getUserById);
router.post('/register', validateRequest(registerSchema), AuthController.register); 
router.post('/login', validateRequest(loginSchema), AuthController.login);
router.put('/user', authenticate, validateRequest(updateUserSchema), AuthController.uptdateUser);
router.post('/follow', authenticate, validateRequest(useridShema), AuthController.followUser);
router.post('/unfollow', authenticate, validateRequest(useridShema), AuthController.unfollowUser);


const authRoutes = router;

export default authRoutes;

