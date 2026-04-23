import { useState } from "react";
import axios from "axios";

function Register({ setIsLogin }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const register = async () => {
        try {
            await axios.post("http://localhost:5000/api/auth/register", {
                username,
                email,
                password
            });

            alert("Register Success ✅");
            setIsLogin(true); // login page ku feriba
        } catch (err) {
            alert("Register Failed ❌");
            console.log(err);
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
            <h2>Register 📝</h2>

            <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} /><br /><br />
            <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} /><br /><br />
            <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} /><br /><br />

            <button onClick={register}>Register</button>

            <p>
                Already have account?{" "}
                <button onClick={() => setIsLogin(true)}>Login</button>
            </p>
        </div>
    );
}

export default Register;