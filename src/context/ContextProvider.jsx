import React, { createContext, useContext, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Context = createContext();
const auth = getAuth(app);

export const ContextProvider = ({ children }) => {

  const navigate = useNavigate();

  const [user, setUser] = useState();
  const [isLogin, setIsLogin] = useState(true); 

  // - Initially this toggle form help the user to shift to form, according to his visit (already user or new).
  const toggleForm = () => {
    setIsLogin(!isLogin);
    isLogin ? navigate("/signup") : navigate("/");
  };
  // - Incase, User forgot password, this function will help user to reach password reset page and get reset email.
  const togglePassword = () => {
    setIsLogin(!isLogin);
    isLogin ? navigate("/reset") : navigate("/");
  }
  // - this function settle here for new user to sign up.
  const register = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      toast.success("User has successfully signed up.", {
        position: "top-center",
      });
      navigate("/dashboard");
    } catch (error) {
      console.log(error.message);
      toast.success(error.message, { position: "top-center" });
    }
  };

  // - this function settle here for existing user to log in.
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      toast.success("User has successfully logged in.", {
        position: "top-center",
      });

      navigate("/dashboard");
    } catch (error) {
      console.log(error.message);
      toast.success(error.message, { position: "top-center" });
    }
  };

  //- this function settle here to logout.
  const logout = async () => {
    await auth.signOut().then(() => console.log("User signed out!"));
    navigate("/");
  };

  return (
    <Context.Provider
      value={{
        user,
        toggleForm,
        togglePassword,
        register,
        login,
        logout,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useContextProvider = () => {
  return useContext(Context);
};
