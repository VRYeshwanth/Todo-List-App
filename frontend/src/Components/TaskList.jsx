import { useState, useEffect } from "react";
import axios from "axios";

export default function TaskList({refresh, handleTaskDeleted}) {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/tasks").then(res => setTasks(res.data)).catch(err => console.error(err))
    }, [refresh])

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete("http://localhost:3000/tasks/"+id)
            handleTaskDeleted();
        }
        catch(e) {
            console.log("Failed to delete task : " +e);
        }
    }

    
    return (
        <div>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        {task.title}
                        <button onClick={() => handleDelete(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}