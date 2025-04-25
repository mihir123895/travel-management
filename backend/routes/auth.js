import express from "express";
import { login, register, resetPassword, sendResetOtp } from "../controllers/authController.js";

const router=express.Router();

router.post('/register' , register);

router.post('/login',login);

router.post('/send-reset-otp',sendResetOtp)

router.post('/reset-password',resetPassword)

export default router
