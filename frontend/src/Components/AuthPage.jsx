import { useState } from "react";
import TodoPage from "./TodoPage";
import AuthForm from "./AuthForm";

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

            {authMode === "register" && <AuthForm type="register" onSuccess={() => setAuthMode(null)}/>}
            {authMode === "login" && <AuthForm type="login" />}
        </div>
    )
}