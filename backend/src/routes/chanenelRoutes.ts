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
router.delete('/:idchannel',authenticate,ChannelController.deleteChannel);


// Comentarios del canal
const ChannelRoutes = router;



export default  ChannelRoutes;