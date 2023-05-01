import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
    token:{
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
      },
      expiresAt: {
        type: Date,
        required: true,
      },
  },{timestamps: true, versionKey: false}
  );

  export default mongoose.model("Token", UserSchema)