import AuthPage from "./AuthPage";
import TodoPage from "./TodoPage";
import { useState , useEffect } from "react";

export default function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token) {
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <div className="container">
            {
                isLoggedIn ? <TodoPage /> : <AuthPage loginSuccess={() => setIsLoggedIn(true)}/>
            }
        </div>
    )
}