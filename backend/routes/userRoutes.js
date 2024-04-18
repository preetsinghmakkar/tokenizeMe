import express from "express";
import {
  signupUser,
  signInUser,
  logoutUser,
  UpdateUser,
  getProfileUser,
  UpdatePassword,
  UploadImage,
} from "../controllers/userController.js";
import { protectedRoutes } from "../middlewares/protectedRoutes.js";
import { checkPassword } from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/signin", signInUser);
router.post("/logout", logoutUser);
router.get("/profile", protectedRoutes, getProfileUser);
router.put("/profile/settings/:userId", protectedRoutes, UpdateUser);
router.post(
  "/profile/settings/:username/checkPassword",
  protectedRoutes,
  checkPassword
);
router.post(
  "/profile/settings/:username/changepassword",
  protectedRoutes,
  UpdatePassword
);
router.post("/profile/profileImage/:userId", protectedRoutes, UploadImage);
export default router;
