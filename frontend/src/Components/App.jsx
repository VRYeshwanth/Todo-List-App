import AuthPage from "./AuthPage";
import TodoPage from "./TodoPage";
import { useState , useEffect } from "react";

export default function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const verifyToken = async () => {
        const token = localStorage.getItem("token");
        if(!token) {
            return ;
        }

        try {
            await axios.post("http://localhost:3000/auth/verify", {}, {
                headers: {Authorization : `Bearer ${token}`}
            });
            setIsLoggedIn(true);
        }
        catch(e) {
            localStorage.removeItem("token");
            setIsLoggedIn(false);
        }
    }

    useEffect(() => { verifyToken(); }, []);

    return (
        <div className="container">
            {
                isLoggedIn ? <TodoPage /> : <AuthPage loginSuccess={() => setIsLoggedIn(true)}/>
            }
        </div>
    )
}