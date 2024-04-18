import express from "express";
import { protectedRoutes } from "../middlewares/protectedRoutes.js";

const router = express.Router();

router.post("/CreateToken", protectedRoutes);
router.get("/AllTokens", protectedRoutes);
router.post("/MyTokens", protectedRoutes);

export default router;
