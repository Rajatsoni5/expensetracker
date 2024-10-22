import React, { useState, useEffect } from 'react';
import "../../styles/ProfileModal.css"

const ProfileModal = ({ isOpen, onClose, onUpdate, user }) => {
  const [fullName, setFullName] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  const handleUpdate = () => {
    onUpdate(fullName, photoURL);
    setFullName('');
    setPhotoURL('');
  };

  useEffect(() => {
    setFullName(user?.displayName);
    setPhotoURL(user?.photoURL)
  }, [user])

  if (!isOpen) return null;

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
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default ProfileModal;
