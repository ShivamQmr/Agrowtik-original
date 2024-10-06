import express from "express";
const router = express.Router();
import { signUp, login } from "../controller/user.controller.js";

router.post("/signup", signUp);
router.post("/login", login);

export default router;
