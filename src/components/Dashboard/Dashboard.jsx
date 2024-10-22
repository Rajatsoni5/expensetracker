import React, { useState } from 'react';
import Modal from './ProfileModal'; 
import { getAuth } from 'firebase/auth'; 
import "../../styles/Dashboard.css";
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAY-wgqIt319Lx0cjS2LywB4qq26m-FMAI`;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const auth = getAuth(); 
  const navigate = useNavigate();

  const handleProfile = () => {
    setIsModalOpen(true);
  };

  const user = auth.currentUser; 

  console.log("user", user);

  

  const handleUpdateProfile = async (fullName, photoURL) => {
    if (user) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            idToken: user.accessToken,
            displayName: fullName,
            photoUrl: photoURL,
            returnSecureToken: true,
          }),
        });
      
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error.message);
        }
        console.log("data", data);
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
    if (user) {
      try {
        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAY-wgqIt319Lx0cjS2LywB4qq26m-FMAI`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: user.accessToken,
          }),
        });
      
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error.message);
        }
        console.log("data", data);
        console.log("Link send for verification");
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    } else {
      console.log("No user is currently logged in.");
    }
  }

  const logout = async () => {
   await  auth.signOut().then(() => console.log('User signed out!'));
navigate("/");
  }
  return (
    <>
      <div className='dashboard-container'>
        <h4>Welcome to Expense Tracker!!!</h4>
        <p>Your Profile is incomplete. <button onClick={handleProfile}> Complete now</button></p>
        {!user?.emailVerified && (
          <button onClick={verifyEmail}>Verify Email</button>)}
          <button onClick={logout}>Logout</button>
      </div>
      <hr />
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onUpdate={handleUpdateProfile}
        user={user}
      />
    </>
  );
}

export default Dashboard;
