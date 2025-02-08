import "../../styles/Auth.css";
import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

import { useContextProvider } from "../../context/ContextProvider";

const PasswordChange = () => {
    const {toggleForm} = useContextProvider();

    const [resetEmail, setResetEmail ] = useState("");
    const [error, setError] = useState("")
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if(!resetEmail) return;

        try {
          await sendPasswordResetEmail(getAuth(), resetEmail);
          console.log('Password reset email sent');
        } catch (error) {
          console.error('Error sending password reset email:',error.message);
        }
    }
  return (
    <div className="auth-container" >
    <h5 className="auth-title">Enter the email with which you're register.</h5>

    {error && <div className="alert alert-danger">{error}</div>}

    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={resetEmail}
          onChange={(e) => setResetEmail(e.target.value)}
          required
        />
      </div>
      
      <button type="submit" className={`btn btn-primary auth-button`}>
        Send Link
      </button>
    </form>
    <p className="mt-3 text-center">
      Already a user?{" "}
      <button className="btn btn-link" onClick={toggleForm}>
        Log in
      </button>
    </p>
  </div>
  )
}

export default PasswordChange