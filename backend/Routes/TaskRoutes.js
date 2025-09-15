import express from "express";
import { getTasks , createTask } from "../Controllers/TaskController.js";

const router = express.Router();

router.get("/", getTasks);
router.post("/", createTask);

export default router;