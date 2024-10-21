import '../src/styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Dashboard from "./components/Dashboard/Dashboard"
const App = () => {
  
    return (
      <Router>
          <div className="container">
              <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
          </div>
  </Router>

    );
};

export default App;

