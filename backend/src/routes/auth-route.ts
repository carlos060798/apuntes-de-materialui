import { Router } from "express"; 
import AuthController from "../controllers/auth.controller";
import { validateRequest } from "../midlewares/auth/validator";
import { registerSchema,loginSchema } from "../interface/shemas";

const  router = Router();

router.post('/register',validateRequest( registerSchema), AuthController.register);
router.post('/login',validateRequest( loginSchema ), AuthController.login);

// Add other routes here...
router.get('/',()=>{
    console.log('Hola mundo')
})

const authRoutes = router;

export default authRoutes;

