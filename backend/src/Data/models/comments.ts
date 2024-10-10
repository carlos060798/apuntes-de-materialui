import mongoose from 'mongoose';


const commentSchema = new mongoose.Schema({
    author: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    content: { 
        type: String, 
        required: true 
    },

    channel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chanel',
        required: true
    },
    date: { 
        type: Date, 
        default: Date.now 
    }
});

export default mongoose.model('Comment', commentSchema);
