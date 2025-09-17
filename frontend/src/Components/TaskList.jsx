import { useState, useEffect } from "react";
import axios from "axios";

export default function TaskList({refresh}) {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/tasks").then(res => setTasks(res.data)).catch(err => console.error(err))
    }, [refresh])

    
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