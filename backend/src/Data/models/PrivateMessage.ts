import mongoose, { Schema, Document } from "mongoose";
import { IMessage } from "./mesagge";

export interface IDirectMessage extends Document {
    users: string[];
    messages: IMessage[];
}

const directMessageSchema: Schema = new mongoose.Schema({
    users: [{ type: String, required: true }],
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
});

export default mongoose.model<IDirectMessage>("DirectMessage", directMessageSchema);
