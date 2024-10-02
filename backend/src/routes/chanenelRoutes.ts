import  {Router } from 'express';
import ChannelController from '../controllers/channel.controller';

import { authenticate } from '../midlewares/auth/autheticate';


const  router = Router();

// GET /api/channel

router.get('/', ChannelController.getChanels);
router.get('/:idchannel',ChannelController.getChannel);
router.get('/follow/channels',authenticate,ChannelController.channelsLikes);
router.post('/follow',authenticate,ChannelController.followChannel); 
router.patch('/unfollow-channel',authenticate,ChannelController.unfollowChannel);


const ChannelRoutes = router;



export default  ChannelRoutes;