import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/App.css"
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from "react-redux";

import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Dashboard from "./components/Dashboard/Dashboard";
import PasswordChange from './components/Auth/PasswordChange';

const App = () => {
    const isDarkMode = useSelector((state) => state.theme.isDarkMode); // Get dark mode state

    return (
        <div className={isDarkMode ? "dark-theme" : "light-theme"}>
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
