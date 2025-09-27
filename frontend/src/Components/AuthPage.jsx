import { useState } from "react";
import TodoPage from "./TodoPage";
import Register from "./Register";
import Login from "./Login";

export default function AuthPage() {

    const [authMode, setAuthMode] =  useState(null);

    return (
        <div className="auth-container">
            <h1>Todo App</h1>

            {
                (authMode === null) && (
                    <div className="auth-btns">
                        <button onClick={() => setAuthMode("register")}>Register</button>
                        <button onClick={() => setAuthMode("login")}>Login</button>
                    </div>
                )
            }

            {authMode === "register" && <Register />}
            {authMode === "login" && <Login />}
        </div>
    )
}