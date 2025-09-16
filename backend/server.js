import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import taskRoutes from "./Routes/TaskRoutes.js"

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("API Running");
})

app.use("/tasks", taskRoutes);

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`)
})