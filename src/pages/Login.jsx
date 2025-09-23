import React, { useState } from "react";
import { useLogin } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const {loginUser, isLoggedIn } = useLogin();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    setError("");

    if(name.trim() === "" || password.trim() === ""){
        setError("Please enter both username and password.")
        return;
    }

    const success = loginUser(name, password);

    if(success){
        navigate("/");
    } else {
        setError("Login failed. Please check your credntials.")
    }
};

    if (isLoggedIn) {
        navigate("/")
        return null;
    }

    return (
       <div className="App container py-5">
        <h2 className="mb-4">Login</h2>
        <form onSubmit={handleLoginSubmit} className="login-form">
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Username:</label>
                <input type="text"
                id="name"
                className="form-control"
                value={name}
                onChange={(e)=> setName(e.target.value)} 
                />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password:</label>
                <input type="text"
                id="password"
                className="form-control"
                value={password}
                onChange={(e)=> setPassword(e.target.value)} 
                />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <button type="submit" className="btn btn-primary">Login</button>
        </form>
       </div>
    )
};