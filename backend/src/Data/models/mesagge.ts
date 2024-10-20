import mongoose from "mongoose";

export interface IMessage extends mongoose.Document {
    author: string;
    message: string;
    date: Date;
}

const messageSchema = new mongoose.Schema({
    author: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

export default mongoose.model("Message", messageSchema);
