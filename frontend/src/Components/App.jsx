import TaskList from "./TaskList.jsx";
import Form from "./Form.jsx";
import { useState } from "react";

export default function App() {

    const [refresh, setRefresh] = useState(0);

    const handleTaskAdded = () => {
        setRefresh((prev) => prev + 1)
    }

    const handleTaskDeleted = () => {
        setRefresh((prev) => prev + 1)
    }

    return (
        <div className="container">
            <h1>ToDo App</h1>
            <Form handleTaskAdded={handleTaskAdded}/>
            <TaskList refresh={refresh} handleTaskDeleted={handleTaskDeleted}/>
        </div>
    );
}