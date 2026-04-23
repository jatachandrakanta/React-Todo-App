import { useState } from "react";
import axios from "axios";

function Login({ setIsLoggedIn,setIsLogin  }) { // 🔥 props add kar
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);

      alert("Login Success ✅");

      setIsLoggedIn(true); // 🔥 VERY IMPORTANT

    } catch (err) {
      alert("Login Failed ❌");
      console.log(err);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Login 🔐</h2>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      /><br /><br />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      /><br /><br />

      <button onClick={login}>Login</button>
      <p>
  Don't have account?{" "}
  <button onClick={() => setIsLogin(false)}>Register</button>
</p>
    </div>
  );
}

export default Login;