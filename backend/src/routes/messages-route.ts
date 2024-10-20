import { Router } from 'express';
import { getDirectMessages, sendDirectMessage, deleteDirectMessage } from '../controllers/directMessageController';
import { authenticate } from '../midlewares/auth/autheticate';
const router = Router();

// Obtener los mensajes directos entre dos usuarios
router.get('/:userId2',authenticate,getDirectMessages);

// Enviar un mensaje directo entre dos usuarios
router.post('/:userId2',authenticate, sendDirectMessage);

// Eliminar un mensaje directo (solo si es el propietario)
router.delete('/:messageId', deleteDirectMessage);

export default router;
