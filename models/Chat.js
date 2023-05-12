import mongoose from 'mongoose';

const ChatSchema = new mongoose.Schema({
    chatName: { 
        type: String, 
        trim: true 
    },
    isGroupChat: { 
        type: Boolean, 
        default: false 
    },
    users: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"
    }],
    latestMessage: {
      type: {},
      ref: "User",
    },
    groupAdmin: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
    },
  },{timestamps: true}
  );

  export default mongoose.model("Chat", ChatSchema)