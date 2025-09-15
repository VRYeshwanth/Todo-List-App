import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("API Running");
})

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`)
})