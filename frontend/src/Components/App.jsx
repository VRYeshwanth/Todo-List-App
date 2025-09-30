import AuthPage from "./AuthPage";
import TodoPage from "./TodoPage";
import { useState , useEffect } from "react";
import axios from "axios";

export default function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [loading, setLoading] = useState(true); // add this line

    const verifyToken = async () => {
        if (!token) {
            setLoading(false);
            return;
        }
        try {
            await axios.post("http://localhost:3000/auth/verify", {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setIsLoggedIn(true);
        } catch (e) {
            localStorage.removeItem("token");
            setToken(null);
            setIsLoggedIn(false);
        }
        setLoading(false);
    };

    useEffect(() => { verifyToken(); }, [token]);

    const handleLogin = (newToken) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
        setIsLoggedIn(true);
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setIsLoggedIn(false);
    }

    return (
        <div className="container">
            {loading ? (
                <p>Loading...</p>
            ) : (
                isLoggedIn ? <TodoPage token={token} onLogOut={handleLogout}/> : <AuthPage loginSuccess={handleLogin}/>
            )}
        </div>
    );
}