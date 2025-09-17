import axios from "axios";
import { useState } from "react";

export default function Form({handleTaskAdded}) {

    const [text, setText] = useState("");

    const handleSave = async() => {
        try {
            const response = await axios.post("http://localhost:3000/tasks", {
                title: text,
                completed: false
            })

            handleTaskAdded(response.data);

            setText("")
        }
        catch(e) {
            console.log("Error saving task : " +e)
        }
    }

    return (
        <div className="form">
            <input type="text" value={text} placeholder="Enter your task :" onChange={(e) => setText(e.target.value)}/>
            <button onClick={handleSave}>Save</button>
        </div>
    )
}