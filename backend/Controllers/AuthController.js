import pool from "../db.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

export const registerUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const saltRounds = parseInt(process.env.SALT_ROUNDS);
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const response = await pool.query("INSERT INTO todousers (email, password) VALUES ($1, $2) RETURNING *", [email, hashedPassword]);
        res.status(201).json(response.rows[0]);
    }
    catch (e) {
        res.status(500).json({error: "Error Registering User"});
    }
}