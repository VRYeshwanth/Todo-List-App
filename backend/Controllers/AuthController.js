import pool from "../db.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

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
        return res.status(500).json({error: "Error Registering User"});
    }
}

export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        const existingUser = await pool.query("SELECT * FROM todousers WHERE email = $1", [email]);
        if(existingUser.rows.length === 0) {
            return res.status(400).json({error: "Please register before logging in !!"})
        }

        const user = existingUser.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).json({error: "Password not matching !!"})
        }
        else {
            const payload = {
                id: user.id,
                email: user.email
            }
            const token = await jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "1d"});
            res.status(200).json({token: token});
        }
    }
    catch(e) {
        return res.status(500).json({error: "Error Logging User in !!"})
    }
}