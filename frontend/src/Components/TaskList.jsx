import { useState, useEffect, use } from "react";
import axios from "axios";

export default function TaskList() {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/tasks").then(res => setTasks(res.data)).catch(err => console.error(err))
    }, [])

    
    return (
        <div>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        {task.title} {task.completed ? '✅' : '❌'}
                    </li>
                ))}
            </ul>
        </div>
    );
}