import React from 'react';
import "../../styles/expenseList.css"

const ExpenseList = ({ expenseData }) => {

  return (
    <div className='expense-container'>
      {expenseData?.map((item, index) => (
        <div key={index} className='expense-item'>
          <p>Amount: {item.amount}</p>
          <p>Description: {item.desc}</p>
          <p>Category: {item.category}</p>
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
