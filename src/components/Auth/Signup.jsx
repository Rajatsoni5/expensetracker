import React, { useState } from 'react';
import { useContextProvider } from '../../context/ContextProvider';
import "../../styles/Auth.css";

const Signup = () => {
    const { register, toggleForm } = useContextProvider();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password || !confirmPassword) {
            setError('All fields are mandatory.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            await register(email, password);
            console.log('User has successfully signed up.');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        } catch (err) {
            setError(err.message);
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
