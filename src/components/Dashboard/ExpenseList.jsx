import React from 'react';

const ExpenseList = ({ expenseData }) => {
    console.log(expenseData)
  return (
    <div>
      {expenseData?.map((item, index) => (
        <div key={index}>
          <p>Amount: {item.amount}</p>
          <p>Description: {item.desc}</p>
          <p>Category: {item.category}</p>
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
