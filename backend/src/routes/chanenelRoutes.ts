import  {Router } from 'express';
import ChannelController from '../controllers/channel.controller';

import { authenticate } from '../midlewares/auth/autheticate';
import { validateRequest } from '../midlewares/auth/validator';

import { channelShema, channelUpdateSchema } from '../interface/shemas';


const  router = Router();

// GET /api/channel

router.get('/',authenticate,ChannelController.getAllChannels);
router.get('/userchannels', authenticate, ChannelController.getUserChannels);
router.get('/:idchannel',ChannelController.getChannel);
router.get('/follow/channels',authenticate,ChannelController.channelsLikes);
router.post('/create',authenticate,validateRequest(channelShema),ChannelController.createChannel);
router.post('/follow',authenticate,ChannelController.followChannel); 
router.patch('/unfollow-channel',authenticate,ChannelController.unfollowChannel);
router.put('/update/:idchannel',authenticate,validateRequest(channelUpdateSchema),ChannelController.updateChannel);

// mensajes del canal


// Obtener los mensajes de un canal
router.get('/:channelId',ChannelController.getChannelMessages);

// Enviar un mensaje a un canal
router.post('/:channelId',ChannelController.sendChannelMessage);

// Eliminar un mensaje de un canal (solo si es el propietario)
router.delete('/:channelId/:messageId',ChannelController.deleteChannelMessage);

// Comentarios del canal
const ChannelRoutes = router;



export default  ChannelRoutes;