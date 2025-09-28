import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const AuthenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.status(400).json({error: "No token provided !!"});
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if(err) {
            res.status(400).json({error: "Expired or Invalid JWT Token !!"})
        }
        req.user = decoded;
        next();
    });
};