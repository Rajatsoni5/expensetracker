import React, { createContext, useContext, useState } from "react";
// import {getAuth} from "firebase/auth";
// import { app } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

const Context = createContext();
// const auth = getAuth(app);

export const ContextProvider = ({ children }) => {
  const navigate = useNavigate();
  // const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);

  // Listen for authentication state changes
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     if (currentUser) {
  //       setUser(currentUser);
  //     } else {
  //       setUser(null);
  //     }
  //   });
  //   return () => unsubscribe(); 
  // }, []);

  // Toggle between login and signup forms
  const toggleForm = () => {
    setIsLogin(!isLogin);
    isLogin ? navigate("/") : navigate("/signup");
  };

  // Toggle to password reset page
  const togglePassword = () => {
    setIsLogin(!isLogin);
    isLogin ? navigate("/") : navigate("/reset");
  };

  // // Function for user registration
  // const register = async (email, password) => {
  //   try {
  //     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  //     setUser(userCredential.user);
  //     toast.success("User registered successfully!", { position: "top-center" });
  //     navigate("/dashboard");
  //   } catch (error) {
  //     console.error(error.message);
  //     toast.error(error.message, { position: "top-center" });
  //   }
  // };

  // // Function for user login
  // const login = async (email, password) => {
  //   try {
  //     const userCredential = await signInWithEmailAndPassword(auth, email, password);
  //     setUser(userCredential.user);
  //     toast.success("User logged in successfully!", { position: "top-center" });
  //     console.log(userCredential.user)
  //     navigate("/dashboard");
  //   } catch (error) {
  //     console.error(error.message);
  //     toast.error(error.message, { position: "top-center" });
  //   }
  // };

  // // Function for user logout
  // const logout = async () => {
  //   try {
  //     await signOut(auth);
  //     setUser(null);
  //     toast.success("User logged out successfully!", { position: "top-center" });
  //     navigate("/");
  //   } catch (error) {
  //     console.error("Error during logout:", error.message);
  //     toast.error(error.message, { position: "top-center" });
  //   }
  // };

  return (
    <Context.Provider
      value={{
        // user,
        toggleForm,
        togglePassword,
        // register,
        // login,
        // logout,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useContextProvider = () => {
  return useContext(Context);
};
