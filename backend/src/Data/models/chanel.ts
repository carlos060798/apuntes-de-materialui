import mongoose from 'mongoose';
import  {v4 as uiid} from 'uuid';

const channelSchema = new mongoose.Schema({  
    isActivated: { 
        type: Boolean, 
        default: true 
    },
    title: { 
        type: String 
    },
    description: { 
        type: String 
    },
    avatarUrl: { 
        type: String 
    },
    streamKey: { 
        type: String, 
        default: uiid() 
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
    },
    messages: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }], default: [] },

    comments: { 
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }], 
        default: [] 
    },
    isChatClosed: { type: Boolean, default: false }, // Indica si el chat del canal está cerrado

});

export default mongoose.model('Channel', channelSchema);
