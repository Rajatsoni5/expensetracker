import "../../styles/Auth.css";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useContextProvider } from "../../context/ContextProvider";
import { login } from "../../reduxStore/slices/authSlice";

const Signup = () => {
    const auth = getAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { toggleForm } = useContextProvider();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        dispatch(login({ user: user, userID: user.uid, bearerToken: user.accessToken }));

        setEmail('');
        setPassword('');
        setConfirmPassword('');
        navigate("/dashboard");

        } catch (err) {
            setError("Something went Wrong, please try again");
        }
    };

    return (
        <div className="auth-container">
            <h2 className="auth-title">Sign Up</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
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
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className={`btn btn-primary auth-button`}>Sign Up</button>
            </form>
            <p className="mt-3 text-center">
                Already have an account? <button className="btn btn-link" onClick={toggleForm}>Login</button>
            </p>
        </div>
    );
};

export default Signup;
