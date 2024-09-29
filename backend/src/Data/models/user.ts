import mongoose from "mongoose"; 
import chanel from "./chanel";

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
    } 
    
})


export default mongoose.model("User", userSchema);