export default function TaskList() {
    const tasks = [
        {id: 1, title: "1234567890", completed: false},
        {id: 2, title: "4561237890", completed: true},
        {id: 3, title: "9067384512", completed: false}
    ]
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