import express from "express";
import { getTasks } from "../Controllers/TaskController.js";

const router = express.Router();

router.get("/", getTasks);

export default router;