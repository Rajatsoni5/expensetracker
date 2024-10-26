import React, { useState, useEffect } from 'react';
import "../../styles/ProfileModal.css"
import { useContextProvider } from '../../context/ContextProvider';

const ProfileModal = ({ currentUser, isModalOpen, setIsModalOpen }) => {

  const { handleUpdateProfile} = useContextProvider();

  const [fullName, setFullName] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  const handleUpdate = () => {
    handleUpdateProfile(fullName, photoURL);
    setFullName('');
    setPhotoURL('');
  };

  useEffect(() => {
    setFullName(currentUser?.displayName);
    setPhotoURL(currentUser?.photoURL)
  }, [currentUser])

  if (!isModalOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Update Profile</h2>
        <label>
          Full Name:
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </label>
        <label>
          Profile Photo URL:
          <input
            type="text"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
          />
        </label>
        <button onClick={handleUpdate}>Update</button>
        <button onClick={setIsModalOpen}>Cancel</button>
      </div>
    </div>
  );
};

export default ProfileModal;
