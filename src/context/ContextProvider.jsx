import React, { createContext, useContext, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { app } from "../firebase/firebaseConfig";
import { useNavigate } from 'react-router-dom';

const Context = createContext();
const auth = getAuth(app);

export const ContextProvider = ({ children }) => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [isLogin, setIsLogin] = useState(true);

    const register = async (email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
            console.log("User has successfully signed up.");
        } catch (error) {
            console.log(error.message); // Handle error appropriately
        }
    };

    const login = async (email, password) => {
      try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          setUser(userCredential.user);
          console.log("User has successfully logged in.");
          navigate("/dashboard"); 
      } catch (error) {
          console.log(error.message); 
      }
  };
  

    const logout = async () => {
        await signOut(auth);
        setUser(null);
        navigate("/login"); // Redirect to login after logout
    };

    const toggleForm = () => {
        setIsLogin(!isLogin); // Toggle the state
        isLogin ? navigate("/signup") : navigate("/"); // Use absolute paths
    };

    return (
        <Context.Provider value={{ user, register, login, logout, toggleForm }}>
            {children}
        </Context.Provider>
    );
};

export const useContextProvider = () => {
    return useContext(Context);
};
