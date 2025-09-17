import axios from "axios";

export default function TaskList({tasks, setTasks}) {

    const handleDelete = async (id) => {
        try {
            await axios.delete("http://localhost:3000/tasks/" +id)
            setTasks(prev => prev.filter(task => task.id !== id));
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