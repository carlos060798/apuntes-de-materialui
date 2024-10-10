import mongoose from 'mongoose';
const privateMessageSchema = new mongoose.Schema({
    participants: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User' 
        }
    ],
    messages: {
        type: [{
            author: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'User', 
                required: true 
            },
            content: { 
                type: String, 
                required: true 
            },
            date: { 
                type: Date, 
                default: Date.now 
            }
        }],
        default: []
    }
});

export default mongoose.model('PrivateMessage', privateMessageSchema);
