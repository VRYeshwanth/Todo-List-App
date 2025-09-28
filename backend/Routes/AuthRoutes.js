import express from "express";
import { registerUser, loginUser } from "../Controllers/AuthController.js";
import { AuthenticateToken } from "../Middleware/Auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.post("/verify", AuthenticateToken, (req, res) => {
    res.json({success: true, user: req.user});
});

export default router;