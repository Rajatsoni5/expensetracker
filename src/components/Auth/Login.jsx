import "../../styles/Auth.css";
import React, { useState } from "react";
import { useContextProvider } from "../../context/ContextProvider";

const Login = () => {
  const { login, toggleForm, togglePassword } = useContextProvider();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Login</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={`btn btn-primary auth-button`}>
          Login
        </button>
      </form>
      <p className="mt-3 text-center">
        <button className="btn btn-link" onClick={togglePassword}>
          Forgot Password
        </button>
      </p>
      <p className="mt-3 text-center">
        New user?{" "}
        <button className="btn btn-link" onClick={toggleForm}>
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default Login;
