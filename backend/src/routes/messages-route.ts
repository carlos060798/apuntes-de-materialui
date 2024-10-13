import { Router } from 'express';
import { getDirectMessages, sendDirectMessage } from '../controllers/directMessageController';
import { authenticate } from '../midlewares/auth/autheticate';

const router = Router();

// Ruta para obtener mensajes directos entre dos usuarios
router.get('/:userId1/:userId2', authenticate, getDirectMessages);

// Ruta para enviar un mensaje directo entre dos usuarios
router.post('/:userId1/:userId2', authenticate, sendDirectMessage);

const directMessageRoutes = router;

export default directMessageRoutes;
