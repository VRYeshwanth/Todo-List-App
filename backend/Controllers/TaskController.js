import pool from "../db.js";

export const getTasks = async(req, res) => {
    const result = await pool.query("SELECT * from tasks ORDER BY id");
    res.json(result.rows);
}

export const createTask = async(req, res) => {
    try {
        const title = req.body.title;
        console.log(title);
        const result = await pool.query("INSERT INTO tasks (title) VALUES ($1) RETURNING *", [title]);
        res.status(201).json(result.rows);
    }
    catch(e) {
        res.status(500).json({error: "Failed to create task"})
    }
}