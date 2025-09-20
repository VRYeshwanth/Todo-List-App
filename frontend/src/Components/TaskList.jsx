import { useState } from "react";
import axios from "axios";

export default function TaskList({tasks, setTasks}) {

    const [editId, setEditId] = useState(null);
    const [editText, setEditText] = useState("");

    const handleDelete = async (id) => {
        try {
            await axios.delete("http://localhost:3000/tasks/" +id)
            setTasks(prev => prev.filter(task => task.id !== id));
        }
        catch(e) {
            console.log("Failed to delete task : " +e);
        }
    }

    const handleEdit = async (id, completed) => {
        try {
            const response = await axios.patch("http://localhost:3000/tasks/" +id, { title: editText , completed: completed})

            setTasks((prev) => prev.map((task) => task.id === id ? response.data : task))
            setEditId(null);
            setEditText("");
        }
        catch (e) {
            console.log("Error updating task : " +e);
        }
    }

    const handleCheck = async(id, title, completed) => {
        try {
            const response = await axios.patch("http://localhost:3000/tasks/" +id, { title: title , completed: !completed });

            setTasks((prev) => prev.map((task) => task.id === id ? response.data : task))
        }
        catch (e) {
            console.log("Error updating task : " +e)
        }
    }

    
    return (
        <div className="taskbox">
            <ul>
                {tasks.map(task => (
                    task.id === editId ? (
                        <li key={task.id}>
                            <input type="text" className="edit-input" value={editText} autoFocus onChange={(e) => {
                                setEditText(e.target.value)
                            }}></input>
                            <div className="em-btns">
                                <button onClick={() => handleEdit(task.id, task.completed)}><i class='bx bx-save'></i></button>
                                <button onClick={() => {
                                    setEditId(null);
                                    setEditText("");
                                }}><i class='bx bx-x'></i></button>
                            </div>
                        </li>
                    ) : (
                        <li key={task.id}>
                            <div className="task-data">
                                <input type="checkbox" checked={task.completed} onChange={() => handleCheck(task.id, task.title, task.completed)} />
                                <span className={`task-title ${task.completed ? "checked" : ""}`}>{task.title}</span>
                            </div>
                            <div className="buttons">
                                <button onClick={() => {
                                    setEditId(task.id);
                                    setEditText(task.title);
                                }}><i class='bx bx-edit'></i></button>
                                <button onClick={() => handleDelete(task.id)}><i class='bx bx-trash'></i></button>
                            </div>
                        </li>
                    )
                ))}
            </ul>
        </div>
    );
}