import React from 'react';
import "../../styles/Dashboard.css"

function Dashboard() {

  const HandleProfile = () => {
    console.log("button clicked")
  }
  return (
  <>
        <div className='dashboard-container'>
      <h4>Welcome to Expense Tracker!!!</h4>
      <p>Your Profile is incomplete. <button onClick={HandleProfile}> Complete now</button></p>
      </div>
      <hr />
  </>
  )
}

export default Dashboard