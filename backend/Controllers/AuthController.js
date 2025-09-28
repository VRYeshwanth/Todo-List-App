import pool from "../db.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

export const registerUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(400).json({error: "Please provide all the fields"})
        }
        
        if(password.length < 6) {
            return res.status(400).json({error: "Password must be atleast 6 characters long !!"});
        }

        const existingUser = await pool.query("SELECT * FROM todousers WHERE email = $1", [email]);
        if(existingUser.rows.length > 0) {
            return res.status(400).json({error: "User already exists !!"})
        }
        
        const saltRounds = parseInt(process.env.SALT_ROUNDS);
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const response = await pool.query("INSERT INTO todousers (email, password) VALUES ($1, $2) RETURNING *", [email, hashedPassword]);
        res.status(201).json(response.rows[0]);
    }
    catch (e) {
        res.status(500).json({error: "Error Registering User"});
    }
}