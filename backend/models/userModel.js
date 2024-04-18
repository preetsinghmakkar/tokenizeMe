import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    profileimage: {
      type: String,
      default:
        "https://res.cloudinary.com/do5krinsp/image/upload/v1713189992/dgl4kbrpnwyclyniz2hl.jpg",
    },
    bio: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const User = new mongoose.model("User", userSchema);

export default User;
