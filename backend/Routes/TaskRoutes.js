import express from "express";
import { getTasks , createTask , updateTask ,deleteTask } from "../Controllers/TaskController.js";
import { AuthenticateToken } from "../Middleware/Auth.js";

const router = express.Router();

router.get("/", AuthenticateToken, getTasks);
router.post("/", AuthenticateToken, createTask);
router.patch("/:id", AuthenticateToken, updateTask);
router.delete("/:id", AuthenticateToken, deleteTask);

export default router;