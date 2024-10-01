import  {Router } from 'express';
import ChannelController from '../controllers/channel.controller';


const  router = Router();

// GET /api/channel

router.get('/', ChannelController.getChanels);

router.get('/:idchannel',ChannelController.getChannel);

const ChannelRoutes = router;



export default  ChannelRoutes;