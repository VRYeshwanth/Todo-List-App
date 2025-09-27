import TaskList from "./TaskList.jsx";
import Form from "./Form.jsx";
import { useState , useEffect } from "react";
import axios from "axios";

export default function TodoPage() {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/tasks").then(res => setTasks(res.data)).catch(err => console.error(err))
    }, [])

    return (
        <div className="todo-container">
            <h1>ToDo App</h1>
            <Form tasks={tasks} setTasks={setTasks}/>
            <TaskList tasks={tasks} setTasks={setTasks}/>
        </div>
    );
}