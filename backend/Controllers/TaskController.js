import pool from "../db.js";

export const getTasks = async(req, res) => {
    try {
        const userID = req.user.id;

        const result = await pool.query("SELECT * from tasks WHERE user_id=$1 ORDER BY id", [userID]);
        res.json(result.rows);
    }
    catch(e) {
        res.status(500).json({error: "Failed to fetch tasks"})
    }
}

export const createTask = async(req, res) => {
    try {
        const title = req.body.title;
        const userID = req.user.id;

        const result = await pool.query("INSERT INTO tasks (title, user_id, completed) VALUES ($1, $2, $3) RETURNING *", [title, userID, false]);
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
        const userID = req.user.id;

        const result = await pool.query("UPDATE tasks SET title = $1, completed = $2 WHERE id = $3 AND user_id = $4 RETURNING *", [title, completed, id, userID]);
        res.status(201).json(result.rows[0]);
    }
    catch (e) {
        res.status(500).json({error: "Error Updating task"});
    }
}

export const deleteTask = async (req, res) => {
    try {
        const id = req.params.id;
        const userID = req.user.id;

        const result = await pool.query("DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *", [id, userID])
        res.status(201).json(result.rows);
    }
    catch(e) {
        res.status(500).json({error: "Failed to delete task"})
    }
}