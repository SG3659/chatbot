import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   username: {
      type: String,
      required: true,
      default: "sahil gupta"
   },
   email: {
      type: String,
      required: true,
      unique: true,
      default: "teamredplayer2@gmail.com"
   },
   phoneNo: {
      type: String,
      required: true,
      unique: true,
      default: "1234567890"
   },
}, { timestamps: true });
export default mongoose.model("User", userSchema);