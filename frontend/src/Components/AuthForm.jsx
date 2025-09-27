import { useState } from "react"
import axios from "axios";

export default function AuthForm(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const prettyTitle = props.type.charAt(0).toUpperCase() + props.type.slice(1);

    function handleSubmit() {
        if(props.type === "register") {
            axios.post("http://localhost:3000/auth/register", {
                email: email,
                password: password
            })
            alert("Registration Successful! You can now login.")
            props.onSuccess();
        }
    }

    return (
        <form className={`${props.type}-form`} onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Enter your E-mail Address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">
                {prettyTitle}
            </button>
        </form>
    )
}