import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const protectedRoutes = async (req, res, next) => {
  try {
    const token = await req.cookies.jwt;

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET);

    const user = await User.findById(decoded.userId).select("-password");

    req.user = user;

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in Protecting Routes : ", error.message);
  }
};
export { protectedRoutes };
