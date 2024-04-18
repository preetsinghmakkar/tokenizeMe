import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/createJsonWebToken.js";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
dotenv.config();

//Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const signupUser = async (req, res) => {
  try {
    const { fullname, username, email, profileimage, bio } = req.body;

    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      res.status(400).json({ error: "User Already Exist" });
    }
    let { password } = req.body;
    const salt = await bcrypt.genSalt(10);

    let hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullname: fullname,
      username: username,
      email: email,
      password: hashPassword,
      profileimage: profileimage,
      bio: bio,
    });

    await newUser.save();

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);

      res.status(201).json({ message: "Signup Successfull" });
    } else {
      res.status(400).json({ error: "Invalid User Inputs" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error in Signing Up" });
    console.log("Error in Signup : ", error);
  }
};

const signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid Username or Password" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      console.log("Check Password is Wrong");
      return res.status(400).json({ error: "Invalid Username or Password" });
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({ message: "Signin Successfull" });
  } catch (error) {
    res.status(500).json({ error: "Error in SignIn User" });
    console.log("Error in SignIn User : ", error);
  }
};

const logoutUser = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: "Unable to Logged Out" });
    console.log("Unable to Logged Out : ", error);
  }
};

const getProfileUser = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(400).json({ error: "User not Found" });
    }
    res.status(200).json({
      name: user.fullname,
      email: user.email,
      password: user.password,
      username: user.username,
      bio: user.bio,
      profileimage: user.profileimage,
    });
  } catch (error) {
    res.status(500).json({ error: "Error in Fetching Profile" });
    console.log("Error in Profile : ", error);
  }
};

const UpdateUser = async (req, res) => {
  try {
    const { name, username, email, bio } = req.body;
    let { profileImage } = req.body;
    const userId = req.user._id;
    const user = await User.findOne({ _id: userId });

    user.fullname = name || user.fullname;
    user.username = username || user.username;
    user.email = email || user.email;
    user.bio = bio || user.bio;

    if (profileImage) {
      if (user.profileimage) {
        await cloudinary.uploader.destroy(
          user.profileimage.split("/").pop().split(".")[0]
        );
        const uploadedResponse = await cloudinary.uploader.upload(profileImage);
        profileImage = uploadedResponse.secure_url;
        user.profileimage = profileImage || "";
      }
    } else {
      user.profileimage = user.profileimage;
    }

    await user.save();

    res.status(200).json({ message: "Profile Updated Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error in Updating User" });
    console.log("Error in Updating : ", error);
  }
};

const checkPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const userId = req.user._id;
    const user = await User.findOne({ _id: userId });

    if (!user) {
      console.log("Unable to Fetch User");
    }

    const check = await bcrypt.compare(password, user.password);

    if (check) {
      res.status(200).json({ check });
    } else {
      res.status(400).json({ error: "Password is incorrect" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error in Checking Password" });
    console.log("Error in Checking Password", error);
  }
};

const UpdatePassword = async (req, res) => {
  try {
    const userId = req.user._id;
    let { Pass } = req.body;
    const salt = await bcrypt.genSalt(10);

    let hashPassword = await bcrypt.hash(Pass, salt);

    const user = await User.findOneAndUpdate(
      { _id: userId },
      { password: hashPassword }, // Use secure_url to ensure HTTPS
      { new: true }
    );

    await user.save();

    res.status(200).json({ message: "Password Updated" });
  } catch (error) {
    res.status(500).json({ error: "Error in Storing Password" });
    console.log("Error in Updating Password", error);
  }
};
const UploadImage = async (req, res) => {
  try {
    const userId = req.user._id;
    let { profilePic, bio } = req.body;
    const user = await User.findOne({ _id: userId });

    const defaultImageURL =
      "https://res.cloudinary.com/do5krinsp/image/upload/v1713189992/dgl4kbrpnwyclyniz2hl.jpg";

    if (profilePic) {
      if (user.profileimage) {
        await cloudinary.uploader.destroy(
          user.profileimage.split("/").pop().split(".")[0]
        );

        const uploadedResponse = await cloudinary.uploader.upload(profilePic);
        profilePic = uploadedResponse.secure_url;
        user.profileimage = profilePic || "";
      } else {
        const result = await cloudinary.uploader.upload(profilePic, {
          resource_type: "image",
        });
        user.profileimage = result.secure_url || "";
      }

      user.bio = bio || "";

      await user.save();

      res.status(200).json({ success: "Image uploaded successfully", user });
    } else {
      const user = await User.findOne({ _id: userId });

      user.profileimage = defaultImageURL || "";
      user.bio = bio || "";

      await user.save();

      res.status(200).json({
        messgae: "Default image saved successfully",
      });
    }
  } catch (error) {
    console.error("Error in uploading image:", error);
    res.status(500).json({ error: "Unable to upload image" });
  }
};

export {
  signupUser,
  signInUser,
  logoutUser,
  getProfileUser,
  UpdateUser,
  checkPassword,
  UpdatePassword,
  UploadImage,
};
