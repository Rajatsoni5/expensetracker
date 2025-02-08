import "../../styles/Dashboard.css";
import { useState } from 'react';
import { getAuth, signOut } from "firebase/auth"; 
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import ExpenseForm from "./ExpenseForm";
import Modal from './ProfileModal'; 
import { logout } from "../../reduxStore/slices/authSlice";
import { toggleTheme, activatePremium } from "../../reduxStore/slices/themeSlice";


function Dashboard() {
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const isPremium = useSelector((state) => state.theme.isPremium); // Access premium status
  const expenseData = useSelector((state) => state.expenses.items);

  const totalExpenses = expenseData.reduce((sum, item) => sum + Number(item.amount), 0);

  const { user } = useSelector((state) => state.auth || { user: null });
  
  console.log("Redux User:", user );
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentUser = auth.currentUser; 

  if (!user) {
    return <div>Loading user information...</div>; 
  }

  console.log("User Logged in with:", currentUser.email);

  const handleProfile = () => {
    setIsModalOpen(true); 
  };

  const handleUpdateProfile = async (fullName, photoURL) => {
    if (currentUser) {
      try {
        const idToken = await currentUser.getIdToken();
        const response = await fetch(
          `${process.env.REACT_APP_FIREBASE_API}/accounts:update?key=${process.env.REACT_APP_FIREBASE_API_KEY}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              idToken: idToken,
              displayName: fullName,
              photoUrl: photoURL,
              returnSecureToken: true,
            }),
          }
        );
        
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error.message);
        }

        console.log("Profile updated successfully:", data);
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    } else {
      console.log("No user is currently logged in.");
    }

    setIsModalOpen(false); 
  };

  const verifyEmail = async () => {
    if (currentUser) {
      try {
        const idToken = await currentUser.getIdToken();

        const response = await fetch(
          `${process.env.REACT_APP_FIREBASE_API}/accounts:sendOobCode?key=${process.env.REACT_APP_FIREBASE_API_KEY}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              requestType: "VERIFY_EMAIL",
              idToken: idToken,
            }),
          }
        );

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error.message);
        }

        console.log("Verification email sent successfully.");
      } catch (error) {
        console.error("Error sending verification email:", error);
      }
    } else {
      console.log("No user is currently logged in.");
    }
  };
  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
      navigate("/");
      console.log("User signed out successfully.");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleActivatePremium = () => {
    if (totalExpenses > 10000) {
      dispatch(activatePremium()); // Activate premium status
    }
  };

  return (
    <>
      <div className='dashboard-container'>
        <h4>Welcome to Expense Tracker!!!</h4>

        {/* ✅ Show "Activate Premium" Button if total expense > ₹10,000 */}
        {totalExpenses > 10000 && !isPremium && (
          <button className="premium-button" onClick={handleActivatePremium}>
            Activate Premium
          </button>
        )}

        <p>Your Profile is incomplete. <button onClick={handleProfile}> Complete now</button></p>
        {!currentUser?.emailVerified && (
          <button onClick={verifyEmail}>Verify Email</button>
        )}

        {/* ✅ Show Dark Mode Toggle only if Premium is Activated */}
        {isPremium && totalExpenses > 10000 && (
          <button onClick={() => dispatch(toggleTheme())}>
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
        )}

        <button onClick={handleLogout}>Logout</button>
      </div>
      <hr />
      <ExpenseForm />
      <Modal 
        isModalOpen={isModalOpen} 
        setIsModalOpen={setIsModalOpen} 
        onUpdate={handleUpdateProfile}
        currentUser={currentUser}
      />
    </>
  );
}

export default Dashboard;
