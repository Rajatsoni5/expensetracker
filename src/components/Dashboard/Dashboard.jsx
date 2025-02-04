import "../../styles/Dashboard.css";
import { useState } from 'react';
import Modal from './ProfileModal'; 
import { getAuth } from 'firebase/auth'; 
import { useContextProvider } from "../../context/ContextProvider";
import ExpenseForm from "./ExpenseForm";


function Dashboard() {
  const { user, logout } = useContextProvider();
  const auth = getAuth(); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentUser = auth.currentUser; 

  if (!user) {
    return <div>Loading user information...</div>; 
  }

  console.log("User Logged in with ", currentUser.email);

  const handleProfile = () => {
    setIsModalOpen(true); 
  };


  const handleUpdateProfile = async (fullName, photoURL) => {
    if (currentUser) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_FIREBASE_API}/accounts:update?key=${process.env.REACT_APP_FIREBASE_API_KEY}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              idToken: currentUser.accessToken,
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
        console.log("Profile updated successfully!");
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
        const response = await fetch(
          `${process.env.REACT_APP_FIREBASE_API}/accounts:sendOobCode?key=${process.env.REACT_APP_FIREBASE_API_KEY}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              requestType: "VERIFY_EMAIL",
              idToken: currentUser.accessToken,
            }),
          }
        );

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error.message);
        }
        const token = localStorage.setItem("user");
        console.log("Link sent for verification");
      } catch (error) {
        console.error("Error sending verification email:", error);
      }
    } else {
      console.log("No user is currently logged in.");
    }
  }

  return (
    <>
      <div className='dashboard-container'>
        <h4>Welcome to Expense Tracker!!!</h4>
        <p>Your Profile is incomplete. <button onClick={handleProfile}> Complete now</button></p>
        {!currentUser?.emailVerified && (
          <button onClick={verifyEmail}>Verify Email</button>)}
        <button onClick={logout}>Logout</button>
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
