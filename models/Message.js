import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
    content: { 
        type: String, 
        trim: true 
    },
    sender: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
    },
    chat: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Chat" 
    },
    readBy: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
    }],
  },{timestamps: true}
  );

  export default mongoose.model("Message", MessageSchema)