import mongoose from "mongoose"; 

const userSchema = new mongoose.Schema({
 email: {
    type: String,
    required: true,
    unique: true,
 },
    password: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },

    channel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Channel"
     
    },
    followedChannels: {
        type: [{type:mongoose.Schema.Types.ObjectId ,ref: "Channel"}],
    } ,
    
    followers: { 
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], 
        default: [] 
    },
    following: { 
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], 
        default: [] 
    }
})


export default mongoose.model("User", userSchema);