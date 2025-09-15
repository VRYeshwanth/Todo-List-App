import pool from "../db.js";

export const getTasks = async(req, res) => {
    const result = await pool.query("SELECT * from tasks ORDER BY id");
    res.json(result.rows);
}