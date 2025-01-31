import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Dashboard from "./components/Dashboard/Dashboard";
import PasswordChange from './components/Auth/PasswordChange';
// import { useSelector } from "react-redux";

const App = () => {
    // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    return (
        <div >
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/reset" element={<PasswordChange />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    </div>
    );
};

export default App;
