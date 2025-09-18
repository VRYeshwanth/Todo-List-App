import pool from "../db.js";

export const getTasks = async(req, res) => {
    try {
        const result = await pool.query("SELECT * from tasks ORDER BY id");
        res.json(result.rows);
    }
    catch(e) {
        res.status(500).json({error: "Failed to fetch tasks"})
    }
}

export const createTask = async(req, res) => {
    try {
        const title = req.body.title;
        const result = await pool.query("INSERT INTO tasks (title) VALUES ($1) RETURNING *", [title]);
        res.status(201).json(result.rows[0]);
    }
    catch(e) {
        res.status(500).json({error: "Failed to create task"})
    }
}

export const updateTask = async(req, res) => {
    try {
        const id = req.params.id;
        const title = req.body.title;
        const completed = req.body.completed;
        const result = await pool.query("UPDATE tasks SET title = $1, completed = $2 WHERE id = $3 RETURNING *", [title, completed, id]);
        res.status(201).json(result.rows[0]);
    }
    catch (e) {
        res.status(500).json({error: "Error Updating task"});
    }
}

export const deleteTask = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await pool.query("DELETE FROM tasks WHERE id = $1 RETURNING *", [id])
        res.status(201).json(result.rows);
    }
    catch(e) {
        res.status(500).json({error: "Failed to delete task"})
    }
}