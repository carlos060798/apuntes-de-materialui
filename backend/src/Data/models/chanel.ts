import  moongose  from 'mongoose';
import  {v4 as uiid} from 'uuid';

const  channelSchema  =  new  moongose.Schema({  
    isActivated:  { type:  Boolean, default:  false },
    title:  { type:  String, },
    description:  { type:  String, },
    avatarUrl: { type: String, },
    streamKey: { type: String, default: uiid() },
    user: { type:moongose.Schema.Types.ObjectId, ref:"User"},
    menssages: {
        type:[{ type: moongose.Schema.Types.ObjectId, ref: 'Message' }],
        default: []
}})


export default moongose.model('Channel', channelSchema);