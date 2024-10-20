import '../src/styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';

const App = () => {
  
    const [isLogin, setIsLogin] = useState(true);

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    return (

        <div className="container">
            <h1>Welcome to Expense Tracker</h1>
             {isLogin ? <Login toggleForm={toggleForm} /> : <Signup toggleForm={toggleForm} />}
        </div>

    );
};

export default App;

