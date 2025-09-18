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

    
    return (
        <div>
            <ul>
                {tasks.map(task => (
                    task.id === editId ? (
                        <li key={task.id}>
                            <input type="text" value={editText} autoFocus onChange={(e) => {
                                setEditText(e.target.value)
                            }}></input>
                            <button onClick={() => handleEdit(task.id, task.completed)}>Save</button>
                            <button onClick={() => {
                                setEditId(null);
                                setEditText("");
                            }}>Cancel</button>
                        </li>
                    ) : (
                        <li key={task.id}>
                            {task.title}
                            <button onClick={() => {
                                setEditId(task.id);
                                setEditText(task.title);
                            }}>Edit</button>
                            <button onClick={() => handleDelete(task.id)}>Delete</button>
                        </li>
                    )
                ))}
            </ul>
        </div>
    );
}